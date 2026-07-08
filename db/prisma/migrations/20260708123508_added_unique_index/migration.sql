-- RenameIndex
ALTER INDEX "merkle_leaves_owner_record_key" RENAME TO "merkle_leaves_ownerPubkey_recordCid_key";

-- RenameIndex
ALTER INDEX "merkle_root_snapshots_owner_root_count_key" RENAME TO "merkle_root_snapshots_ownerPubkey_rootHex_leafCount_key";
