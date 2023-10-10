use std::cmp::{self};

use crate::Vault;
use anchor_lang::prelude::*;

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub enum Change {
    Reduce {
        amount: u32
    },
    Increase {
        amount: u32
    }
}


/*
  inscription size changes are limited by the maximum increase per call.
  hence, inscription sizes need to be chunked and this means for large 
  increases you require multiple calls. 

  We have two different events as it helps keep the client logic tidy. 
  Typically you would only be interested in InscriptionResizeFinalEvent although
  you could use the interim InscriptionResizeEvent for progress monitoring etc.
*/ 

// fired whenever inscription size is changed, whether it hits the target or not.
#[event]
pub struct VaultResizeEvent {
    id: Pubkey,
    size: u32
}


// fired when inscription size hits the target (i.e. this is the final increase / decrease)
#[event]
pub struct VaultResizeFinal {
    id: Pubkey,
    size: u32
}

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub struct ResizeVaultInput {
    pub change: Change,
    /* 
        This only exists to show solana
        that each of the resize inputs is 
        in fact a separate transaction
    */
    pub expected_start_size: u32, 
    /*
        target size is specified
        to make sure that multiple resizes
        executed concurrently never increase / decrease
        the size beyond target size
    */
    pub target_size: u32,
}

#[derive(Accounts)]
#[instruction(update_input: ResizeVaultInput)]
pub struct ResizeVault<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: validated in logic
    #[account(mut,
        constraint = vault.authority == authority.key(),

        realloc = Vault::BASE_SIZE + match update_input.change {
                Change::Increase {amount} => cmp::min(vault.size + amount, update_input.target_size) as usize,
                Change::Reduce {amount} => cmp::max(vault.size - amount, update_input.target_size) as usize
        
        },
        realloc::payer = authority,
        realloc::zero = false)]
    pub vault: Account<'info, Vault>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<ResizeVault>,
    vault_input: ResizeVaultInput,
) -> Result<()> {
    let vault = &mut ctx.accounts.vault;

    vault.size = match vault_input.change {
        Change::Increase {amount} => cmp::min(vault.size + amount, vault_input.target_size),
        Change::Reduce {amount} => cmp::max(vault.size - amount, vault_input.target_size) ,
    };
    
  
    if vault.size == vault_input.target_size {
        emit!(VaultResizeFinal {
            id: vault.key(),
            size: vault_input.target_size,
        });
    } else {
        emit!(VaultResizeEvent {
            id: vault.key(),
            size: vault.size,
        });
    }

    Ok(())
}