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
import { IDL as ProgramIDL} from "../../../idl/pass_manager";
import { NextApiRequest, NextApiResponse } from "next";

export type LoginUserData = {
  confirmed: boolean;
  message?: string;
  userAccount?: PublicKey;
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginUserData>) {
  try {
    if(req.method === "POST") {
      res.status(405).json({ confirmed: false, message: "Invalid method" });
      return;
    }
    else if(req.method === "GET") {
      const { user_wallet } = req.body as Input;

      let tx = new Transaction();

      res.status(200).json({
        confirmed: true,
        message: "Login successful",
        userAccount: undefined,
      });

    }

  } catch (e) {
    console.log(e, "error loading idl");
    process.exit(1);
  }
}
