import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
// import { sliceIntoChunks } from "@utils/slice-into-chunks"
// import { sleep } from "@utils/sleep"

export type TxSendData = {
  confirmed: boolean;
  txsSignature: string[];
  message?: any;
};

type Input = {
  signedTxs: string[];
  v0: boolean;
};

const { RPC: network } = process.env;
const connection = new Connection(network || "http://localhost:8899");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TxSendData>
) {
  if (req.method === "POST") {
    const txsSignature: string[] = [];
    const { signedTxs, v0 = false }: Input = req.body;
    const txs = v0 ? signedTxs.map((signedTx) => VersionedTransaction.deserialize(Buffer.from(signedTx, "base64"))) : signedTxs.map((signedTx) =>
      Transaction.from(Buffer.from(signedTx, "base64"))
    );
    try {
      await Promise.all(
        txs.map(async (tx) => {
          const id = await connection.sendRawTransaction(tx.serialize());
          txsSignature.push(id);
        })
      );
      // txsSignature.map(async (id) => {
      //     let isDone = false;
      //     let SLEEP = 500;
      //     while (!isDone) {
      //         if (await connection.getTransaction(id)) {
      //             isDone = true;
      //         } else {
      //             sleep(SLEEP);
      //         }
      //     }
      // });
      res
        .status(200)
        .json({ confirmed: true, message: "saved to chain", txsSignature });
    } catch (error) {
      console.log(error);
      res
        .status(200)
        .json({ confirmed: false, txsSignature: [""], message: error });
    }
  } else {
    res.status(405).json({ confirmed: false, txsSignature: [""] });
  }
}