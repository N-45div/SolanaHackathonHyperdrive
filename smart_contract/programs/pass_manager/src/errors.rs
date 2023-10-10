use anchor_lang::prelude::*;

#[error_code]
pub enum PasswordError {
    #[msg("The password is incorrect.")]
    IncorrectPassword,
    
    #[msg("Bad authority")]
    BadAuthority,

    #[msg("Max size exceeded")]
    MaxSizeExceeded,
}