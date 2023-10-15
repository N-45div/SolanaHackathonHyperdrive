export interface VaultItem {
    website: string;
    username: string;
    password: string;
  }

export interface Vault {
    authority: string;
    salt: string;
    size: number;
    vault: VaultItem[];

}