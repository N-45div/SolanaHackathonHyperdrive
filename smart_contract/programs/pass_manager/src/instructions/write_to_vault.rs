use anchor_lang::prelude::*;
use crate::errors::PasswordError;

use crate::Vault;

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub struct WriteToVaultInput {
    pub data: Vec<u8>,
    pub start_pos: u32,
}

#[event]
pub struct VaultWriteEvent {
    pub id: Pubkey
}

#[derive(Accounts)]
#[instruction(vault_input: WriteToVaultInput)]
pub struct WriteToVault<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    /// CHECK: Authority checked in logic
    #[account(mut)]
    pub vault: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<WriteToVault>,
    vault_input: WriteToVaultInput,
) -> Result<()> {
    let vault = &mut ctx.accounts.vault;

    let signer = &ctx.accounts.signer;

    let vault_account_info = vault.to_account_info();
    // check that the authority matches

    let authority = Vault::get_authority(vault_account_info.data.borrow())?;

    if authority != signer.key() {
        return Err(PasswordError::BadAuthority.into());
    }

    Vault::write_data(
        vault_account_info.data.borrow_mut(),
        &vault_input.data,
        vault_input.start_pos,
    )?;

    emit!(VaultWriteEvent {
        id: vault.key(),
    });
    
    Ok(())
}