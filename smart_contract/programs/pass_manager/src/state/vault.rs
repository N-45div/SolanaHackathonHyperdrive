use anchor_lang::prelude::*;
use std::cell::{RefMut, Ref};

use crate::errors::PasswordError;

#[account]
pub struct Vault {

    pub authority: Pubkey,

    //pub root: Pubkey,

    pub wallet: Pubkey,
    pub size: u32,
    pub salt: Pubkey,

    
    // Going to add data manually in append_data function
    // pub data: Vec<u8>
}

impl Vault {
    pub const BASE_SIZE: usize = 8 + 32 + 32 + 4 + 32; // no need for vector padding as we write bytes directly onto the account

    pub fn get_size(&self) -> usize {
        Vault::BASE_SIZE + self.size as usize
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

    pub fn get_data_length(
        current_data: Ref<&mut [u8]>
    ) -> Result<u32> {
        Ok(u32::try_from_slice(&current_data[72..76])?)
    }

    // pub fn write_root(
    //     mut current_data: RefMut<&mut [u8]>,
    //     root: &Pubkey) -> Result<()> {
    //     let current_position_slice: &mut [u8] = &mut current_data[40..72];
    //     current_position_slice.copy_from_slice(root.as_ref()); 
    //     Ok(())
    // }


    pub fn write_data_length_max(
        mut current_data: RefMut<&mut [u8]>,
        max_data_length: u32) -> Result<()> {
        let max_length_slice: &mut [u8] = &mut current_data[72..76];
        max_length_slice.copy_from_slice(&max_data_length.to_le_bytes()); 
        Ok(())
    }

    pub fn write_data(
        mut current_data: RefMut<&mut [u8]>,
        data_to_add: &Vec<u8>,
        start_pos: u32
    ) -> Result<()> {

        let data_length_max = u32::from_le_bytes(current_data[72..76].try_into().unwrap());

        // msg!("{} {} {} ", start_pos,  data_to_add.len(),  data_length_max);
        if start_pos + data_to_add.len() as u32 > data_length_max {
            return Err(PasswordError::MaxSizeExceeded.into());
        }
        // msg!("LENGTH: {:?}", data_to_add.len());
       
        let current_index = Vault::BASE_SIZE + start_pos as usize;
        // msg!("current_index: {:?}", current_index);
        let data_slice: &mut [u8] = &mut current_data[current_index..current_index 
        + data_to_add.len()];
        data_slice.copy_from_slice(data_to_add);

        Ok(())
    }
}

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub enum VaultEventType {
    Create,
    Update,
    Resize
}


#[event]
pub struct VaultEvent {
    pub id: Pubkey,
    pub event_type: VaultEventType
}