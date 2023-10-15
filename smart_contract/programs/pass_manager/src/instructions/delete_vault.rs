use crate::{Vault, User};
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

    #[account(mut)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<DeleteVault>
) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let user = &mut ctx.accounts.user;

    user.vault_count = user.vault_count - 1;

    emit!(VaultEventDelete {
        id: vault.key(),
    });

    Ok(())
}