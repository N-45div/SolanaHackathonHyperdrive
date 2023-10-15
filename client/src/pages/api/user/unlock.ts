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

export type UnlockUserData = {
  confirmed: boolean;
  message?: string;
  vaults?: string[];
  salts?: string[];
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<UnlockUserData>) {
  try {
    if(req.method === "GET") {
      res.status(400).json({ confirmed:false, message: "Invalid method" });
      return;
    }
    else if(req.method === "POST") {
      const { user_wallet } = req.body as Input;

      const vaults: string[] = [];
    const salts: string[] = [];

      res.status(200).json({
        confirmed: true,
        message: "User unlocked",
        salts: salts,
        vaults: vaults,
      });
    }

  } catch (e) {
    console.log(e, "error loading idl");
    process.exit(1);
  }
}
