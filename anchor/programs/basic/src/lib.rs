use anchor_lang::prelude::*;

declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

#[program]
pub mod health_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.admin = ctx.accounts.admin.key();
        config.bump = ctx.bumps.config;
        Ok(())
    }

    pub fn create_record(
        ctx: Context<CreateRecord>,
        cid: String,
        title: String,
        recipients: Vec<Pubkey>,
        encrypted_keys: Vec<Vec<u8>>,
    ) -> Result<()> {
        let record = &mut ctx.accounts.record;
        let owner = &ctx.accounts.owner;

        require!(
            recipients.len() == encrypted_keys.len(),
            ErrorCode::RecipientsKeysMismatch
        );
        require!(cid.len() <= MAX_CID_LEN, ErrorCode::CidTooLong);
        require!(title.len() <= MAX_TITLE_LEN, ErrorCode::TitleTooLong);
        require!(
            recipients.len() <= MAX_RECIPIENTS,
            ErrorCode::TooManyRecipients
        );

        record.owner = owner.key();
        record.cid = cid;
        record.title = title;
        record.created_at = Clock::get()?.unix_timestamp;
        record.access_entries = Vec::with_capacity(recipients.len());

        for (recipient, enc_key) in recipients.into_iter().zip(encrypted_keys.into_iter()) {
            require!(
                enc_key.len() <= MAX_ENC_KEY_LEN,
                ErrorCode::EncryptedKeyTooLarge
            );
            record.access_entries.push(AccessEntry {
                recipient,
                encrypted_key: enc_key,
                revoked: false,
            });
        }

        Ok(())
    }

    pub fn grant_access(
        ctx: Context<GrantAccess>,
        recipient: Pubkey,
        encrypted_key: Vec<u8>,
    ) -> Result<()> {
        let record = &mut ctx.accounts.record;
        require!(
            ctx.accounts.owner.key() == record.owner,
            ErrorCode::Unauthorized
        );
        require!(
            encrypted_key.len() <= MAX_ENC_KEY_LEN,
            ErrorCode::EncryptedKeyTooLarge
        );
        require!(
            record.access_entries.len() < MAX_RECIPIENTS,
            ErrorCode::TooManyRecipients
        );

        if let Some(entry) = record
            .access_entries
            .iter_mut()
            .find(|e| e.recipient == recipient)
        {
            entry.encrypted_key = encrypted_key;
            entry.revoked = false;
        } else {
            record.access_entries.push(AccessEntry {
                recipient,
                encrypted_key,
                revoked: false,
            });
        }
        Ok(())
    }

    pub fn revoke_access(ctx: Context<RevokeAccess>, recipient: Pubkey) -> Result<()> {
        let record = &mut ctx.accounts.record;
        require!(
            ctx.accounts.owner.key() == record.owner,
            ErrorCode::Unauthorized
        );
        if let Some(entry) = record
            .access_entries
            .iter_mut()
            .find(|e| e.recipient == recipient)
        {
            entry.revoked = true;
            Ok(())
        } else {
            Err(error!(ErrorCode::RecipientNotFound))
        }
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + Config::INIT_SPACE,
        seeds = [b"config"],
        bump,
    )]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub admin: Signer<'info>,

    pub system_program: Program<'info, System>,
}

const MAX_CID_LEN: usize = 64;
const MAX_TITLE_LEN: usize = 64;
const MAX_ENC_KEY_LEN: usize = 512;
const MAX_RECIPIENTS: usize = 10;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub admin: Pubkey,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Record {
    pub owner: Pubkey,
    #[max_len(MAX_CID_LEN)]
    pub cid: String,
    #[max_len(MAX_TITLE_LEN)]
    pub title: String,
    pub created_at: i64,
    #[max_len(MAX_RECIPIENTS)]
    pub access_entries: Vec<AccessEntry>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, InitSpace)]
pub struct AccessEntry {
    pub recipient: Pubkey,
    #[max_len(MAX_ENC_KEY_LEN)]
    pub encrypted_key: Vec<u8>,
    pub revoked: bool,
}

#[derive(Accounts)]
pub struct CreateRecord<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + Record::INIT_SPACE,
    )]
    pub record: Account<'info, Record>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GrantAccess<'info> {
    #[account(mut)]
    pub record: Account<'info, Record>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct RevokeAccess<'info> {
    #[account(mut)]
    pub record: Account<'info, Record>,
    pub owner: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Recipients and encrypted keys arrays length mismatch")]
    RecipientsKeysMismatch,
    #[msg("Too many recipients")]
    TooManyRecipients,
    #[msg("CID too long")]
    CidTooLong,
    #[msg("Title too long")]
    TitleTooLong,
    #[msg("Encrypted symmetric key too large")]
    EncryptedKeyTooLarge,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Recipient not found")]
    RecipientNotFound,
}
