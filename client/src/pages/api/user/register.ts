//Check if user account exists on-chain and call Login or Register accordingly to create or fetch the account

import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { IDL as ProgramIDL} from "@idl/pass_manager";
import { getBlockhashWithRetries } from "@utils/get-blockhash-with-retries";
import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "@utils/use-data-fetcher";
import { TxCreateVaultData } from "../vault/create";
import { generateSalt } from "@utils/genSalt";

export type RegisterUserData = {
  confirmed: boolean;
  message?: string;
  txs?: [string];
  vault?: string;
  salt?: string;
};

type Input = {
  user_wallet: PublicKey;
};

const {
  PROGRAM_ID: programId,
  RPC: network,
} = process.env;

const connection = new Connection(network || "http://localhost:8899");

const program = new anchor.Program(ProgramIDL, programId || "2gbAD17RAJLvRG4zTEgLezpJcqKudWoRzr42yj6fGHsJ", {
  connection,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === "POST") {
      res.status(400).json({ message: "Invalid method" });
      return;
    }
    else if(req.method === "GET") {
      const { user_wallet } = req.body as Input;

      let createUserTx = new Transaction();

      const { tx, vault } = await fetcher<TxCreateVaultData>(
        `/api/vault/create`,
        { method: "POST" }
      );

      if (!tx) throw new Error(`Error: ${tx}`);

      const createVaultTx = Transaction.from(Buffer.from(tx, "base64"));

      createUserTx.recentBlockhash = (
        await getBlockhashWithRetries(connection)
      ).blockhash;
      createUserTx.feePayer = user_wallet;

      createVaultTx.recentBlockhash = (
        await getBlockhashWithRetries(connection)
      ).blockhash;
      createVaultTx.feePayer = user_wallet;

      const txs = [createUserTx, createVaultTx];
      
      const serializedTransactionsBase64 = txs.map((transaction) =>
      transaction
        .serialize({
          requireAllSignatures: false,
          verifySignatures: true,
        })
        .toString("base64")
      );

      const salt = generateSalt();

      res.status(200).json({
        confirmed: true,
        txs: serializedTransactionsBase64,
        salt: salt,
        vault: vault,
      });
    }

  } catch (e) {
    console.log(e, "error loading idl");
    process.exit(1);
  }
}
