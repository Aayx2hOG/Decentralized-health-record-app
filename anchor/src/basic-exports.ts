import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import BasicIDL from '../target/idl/health_anchor.json'
import type { HealthAnchor } from '../target/types/health_anchor'

export { HealthAnchor as Basic, BasicIDL }

export const BASIC_PROGRAM_ID = new PublicKey(BasicIDL.address)

export function getBasicProgram(provider: AnchorProvider, address?: PublicKey): Program<HealthAnchor> {
  return new Program({ ...BasicIDL, address: address ? address.toBase58() : BasicIDL.address } as HealthAnchor, provider)
}

export function getBasicProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return new PublicKey('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'mainnet-beta':
    default:
      return BASIC_PROGRAM_ID
  }
}
