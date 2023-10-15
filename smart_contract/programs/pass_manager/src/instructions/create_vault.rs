use crate::{Vault, VaultEvent, VaultEventType, User};
use anchor_lang::prelude::*;

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub struct CreateVaultInput {
    pub vault_count: u32,
    pub max_data_length: u32,
    pub authority: Option<Pubkey>,
}

impl CreateVaultInput {
    pub fn get_size(&self) -> u32 {
        self.max_data_length + 1 + match self.authority {
            Some(_)=>32,
            None=>0
        }
    }
}


#[derive(Accounts)]
#[instruction(vault_input: CreateVaultInput)]
pub struct CreateVault<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: validated in logic
    #[account(zero, 
    seeds = [b"vault", &vault_input.vault_count.to_le_bytes(),payer.key().as_ref()], 
    bump)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateVault>,
    vault_input: CreateVaultInput,
) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let user = &mut ctx.accounts.user;

    // let inscription_account_info = inscription.to_account_info();
    msg!("Writing authority");

    let authority = match vault_input.authority {
        Some(x) => x.to_owned(),
        None => ctx.accounts.payer.key(),
    };

    vault.authority = authority;
    vault.size = vault_input.max_data_length;
    user.vault_count = user.vault_count + 1;

    emit!(VaultEvent {
        id: vault.key(),
        event_type: VaultEventType::Create
    });

    Ok(())
}