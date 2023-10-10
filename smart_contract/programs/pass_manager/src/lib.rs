use anchor_lang::prelude::*;

declare_id!("3ctQK81JTmfdGivAM3kaioHxmf4naGcSkzFFy9i1vaec");

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;
pub use state::*;
pub use errors::*;

#[program]
pub mod pass_manager {

    use super::*;

    pub fn create_vault(
        ctx: Context<CreateVault>,
        vault_input: CreateVaultInput,
    ) -> Result<()> {
        instructions::create_vault::handler(
            ctx,
            vault_input
        )
    }

    pub fn delete_vault(
        ctx: Context<DeleteVault>
    ) -> Result<()> {
        instructions::delete_vault::handler(
            ctx
        )
    }

    pub fn resize_vault(
        ctx: Context<ResizeVault>,
        input: ResizeVaultInput,
    ) -> Result<()> {
        instructions::resize_vault::handler(
            ctx,
            input
        )
    }


    pub fn write_to_vault(
        ctx: Context<WriteToVault>,
        input: WriteToVaultInput,
    ) -> Result<()> {
        instructions::write_to_vault::handler(
            ctx,
            input
        )
    }
}
