import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PassManager } from "../../../../../smart_contract/target/types/pass_manager";

export async function anchorProvider() {
  try {
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.PassManager as Program<PassManager>;


  } catch (e) {
    console.log(e, "error loading idl");
    process.exit(1);
  }
}
