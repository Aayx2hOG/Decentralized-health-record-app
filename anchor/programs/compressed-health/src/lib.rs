use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash::hash;

declare_id!("73bxU5B3qZV1UwnMPj4EZQJehSa2ka8vz7DE8WDwA8Lp");

#[program]
pub mod compressed_health {
    use super::*;

    pub fn initialize_config(ctx: Context<InitializeConfig>) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.owner = ctx.accounts.owner.key();
        config.record_count = 0;
        config.deleted_count = 0;
        config.daily_record_count = 0;
        config.last_update_timestamp = 0;
        config.bump = ctx.bumps.config;
        Ok(())
    }

    pub fn batch_create_records(
        ctx: Context<BatchCreateRecords>,
        batch: Vec<RecordData>,
    ) -> Result<()> {
        require!(batch.len() <= MAX_BATCH_SIZE, ErrorCode::BatchTooLarge);

        for record_data in batch.iter() {
            require!(record_data.cid.len() <= MAX_CID_LEN, ErrorCode::CidTooLong);
            require!(
                record_data.title.len() <= MAX_TITLE_LEN,
                ErrorCode::TitleTooLong
            );
            require!(
                record_data.owner == ctx.accounts.owner.key(),
                ErrorCode::UnauthorizedRecordOwner
            );
        }

        let config = &mut ctx.accounts.config;
        let current_time = Clock::get()?.unix_timestamp;
        let start_index = config.record_count;

        if current_time - config.last_update_timestamp > SECONDS_PER_DAY as i64 {
            config.daily_record_count = 0;
        }
        require!(
            config.daily_record_count + batch.len() as u64 <= MAX_RECORDS_PER_DAY,
            ErrorCode::DailyLimitExceeded
        );

        config.daily_record_count += batch.len() as u64;
        config.last_update_timestamp = current_time;

        for (i, record_data) in batch.iter().enumerate() {
            let data_to_hash = format!(
                "{}{}{}",
                record_data.owner,
                record_data.cid,
                record_data.title
            );
            let record_hash = hash(data_to_hash.as_bytes()).to_bytes();

            emit!(RecordCreated {
                owner: record_data.owner,
                record_hash,
                record_index: start_index + i as u64,
                timestamp: current_time,
            });
        }

        config.record_count = config
            .record_count
            .checked_add(batch.len() as u64)
            .ok_or(ErrorCode::Overflow)?;

        Ok(())
    }

    pub fn delete_record(
        ctx: Context<DeleteRecord>,
        record_index: u64,
    ) -> Result<()> {
        let config = &mut ctx.accounts.config;
        
        emit!(RecordDeleted {
            owner: ctx.accounts.owner.key(),
            record_index,
            timestamp: Clock::get()?.unix_timestamp,
        });

        config.deleted_count = config
            .deleted_count
            .checked_add(1)
            .ok_or(ErrorCode::Overflow)?;

        Ok(())
    }

    pub fn get_record_count(ctx: Context<GetRecordCount>) -> Result<u64> {
        Ok(ctx.accounts.config.record_count)
    }
}

const MAX_CID_LEN: usize = 64;
const MAX_TITLE_LEN: usize = 64;
const MAX_BATCH_SIZE: usize = 100;
const MAX_RECORDS_PER_DAY: u64 = 100000;
const SECONDS_PER_DAY: u64 = 86400;

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + Config::INIT_SPACE,
        seeds = [b"config"],
        bump,
    )]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BatchCreateRecords<'info> {
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,

    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteRecord<'info> {
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,

    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetRecordCount<'info> {
    #[account(
        seeds = [b"config"],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,
}

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub owner: Pubkey,
    pub record_count: u64,
    pub deleted_count: u64,
    pub daily_record_count: u64,
    pub last_update_timestamp: i64,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct RecordData {
    pub owner: Pubkey,
    pub cid: String,
    pub title: String,
}

#[event]
pub struct RecordCreated {
    pub owner: Pubkey,
    pub record_hash: [u8; 32],
    pub record_index: u64,
    pub timestamp: i64,
}

#[event]
pub struct RecordDeleted {
    pub owner: Pubkey,
    pub record_index: u64,
    pub timestamp: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("CID too long")]
    CidTooLong,
    #[msg("Title too long")]
    TitleTooLong,
    #[msg("Batch size exceeds maximum")]
    BatchTooLarge,
    #[msg("Numeric overflow")]
    Overflow,
    #[msg("Unauthorized: record owner must match signer")]
    UnauthorizedRecordOwner,
    #[msg("Daily record limit exceeded")]
    DailyLimitExceeded,
}