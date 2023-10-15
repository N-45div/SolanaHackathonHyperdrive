use anchor_lang::prelude::*;

use crate::User;

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub struct CreateUserInput {
    pub authority: Option<Pubkey>,
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: validated in logic
    #[account(init, 
        seeds = [b"account", payer.key().as_ref()], 
        bump, 
        payer = payer, 
        space= 8 + 32 + 4)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateUser>,
    user_input: CreateUserInput,
) -> Result<()> {
    let user = &mut ctx.accounts.user;

    // let inscription_account_info = inscription.to_account_info();
    msg!("Writing authority");

    let authority = match user_input.authority {
        Some(x) => x.to_owned(),
        None => ctx.accounts.payer.key(),
    };

    user.authority = authority;
    user.vault_count = 0;

    Ok(())
}