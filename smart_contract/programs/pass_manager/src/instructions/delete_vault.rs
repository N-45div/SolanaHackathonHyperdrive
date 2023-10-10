use crate::Vault;
use anchor_lang::prelude::*;


#[event]
pub struct VaultEventDelete {
    pub id: Pubkey
}

#[derive(Accounts)]
pub struct DeleteVault<'info> {
    #[account(mut,
        constraint = vault.authority == payer.key())]
    pub payer: Signer<'info>,

    /// CHECK: validated in logic
    #[account(mut, close = payer)]
    pub vault: Account<'info, Vault>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<DeleteVault>
) -> Result<()> {
    let vault = &mut ctx.accounts.vault;

    emit!(VaultEventDelete {
        id: vault.key(),
    });

    Ok(())
}