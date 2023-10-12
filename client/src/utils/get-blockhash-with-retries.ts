import { Connection } from "@solana/web3.js";

export const getBlockhashWithRetries = async (connection: Connection) => {
  let tries = 0;
  while (tries < 5) {
    try {
      return await connection.getLatestBlockhash();
    } catch (e) {
      console.error(e);
      tries++;
    }
  }
  throw new Error("Too many retries trying to get blockhash!");
};