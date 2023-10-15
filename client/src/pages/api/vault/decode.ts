//decode the on-chain vault data using Password and Salt

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
import { NextApiRequest, NextApiResponse } from "next";

export type TxCreateVaultData = {
  confirmed: boolean;
  message?: string;
  tx?: string;
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

      let tx = new Transaction();


    }

  } catch (e) {
    console.log(e, "error loading idl");
    process.exit(1);
  }
}
