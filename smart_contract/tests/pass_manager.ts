import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PassManager } from "../target/types/pass_manager";

describe("pass_manager", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PassManager as Program<PassManager>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.createVault(
      
    ).rpc();
    console.log("Your transaction signature", tx);
  });
});
