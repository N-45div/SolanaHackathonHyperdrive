use anchor_lang::prelude::*;
use std::cell::{RefMut, Ref};

#[account]
#[derive(Default)] 
pub struct User {

    pub authority: Pubkey,
    pub vault_count: u32,

}

impl User {
    pub const BASE_SIZE: usize = 8 + 32 + 4; // no need for vector padding as we write bytes directly onto the account

    pub fn get_vault_count(&self) -> u32 {
        self.vault_count
    }

    pub fn write_authority(
        mut current_data: RefMut<&mut [u8]>,
        authority: &Pubkey) -> Result<()> {
        let current_position_slice: &mut [u8] = &mut current_data[8..40];
        current_position_slice.copy_from_slice(authority.as_ref()); 
        Ok(())
    }

    pub fn get_authority(
        current_data: Ref<&mut [u8]>
    ) -> Result<Pubkey> {
        Ok(Pubkey::try_from_slice(&current_data[8..40])?)
    }
}
