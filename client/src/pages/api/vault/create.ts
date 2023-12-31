//Create a new on-chain vault

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

export type TxCreateVaultData = {
  confirmed: boolean;
  message?: string;
  tx?: string;
  vault?: string;
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<TxCreateVaultData>) {
  try {
    if(req.method === "GET") {
      res.status(405).json({ confirmed: false, message: "Invalid method" });
      return;
    }
    else if(req.method === "POST") {
      const { user_wallet } = req.body as Input;

      let tx = new Transaction();

      const vault = anchor.web3.Keypair.generate();

      res.status(200).json({
        confirmed: true,
        tx: tx.serialize().toString("base64"),
        vault: vault.publicKey.toString(),
      });
    }

  } catch (e) {
    console.log(e, "error loading idl");
    process.exit(1);
  }
}
