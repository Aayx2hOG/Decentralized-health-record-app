import { Connection, PublicKey } from '@solana/web3.js';
import { CompressedRecordClient } from '../../anchor/src/compressed-client';

export async function estimateCosts(
    connection: Connection,
    recordsPerDay: number
): Promise<{
    uncompressed: {
        solPerDay: number;
        solPerYear: number;
        usdPerDay: number;
        usdPerYear: number;
    };
    compressed: {
        solPerDay: number;
        solPerYear: number;
        usdPerDay: number;
        usdPerYear: number;
    };
    savings: {
        solPerDay: number;
        solPerYear: number;
        usdPerDay: number;
        usdPerYear: number;
        percentageSaved: number;
    };
}> {
    const SOL_PRICE_USD = 200;

    const uncompressedCostPerRecord = 0.0035;
    const uncompressedSolPerDay = recordsPerDay * uncompressedCostPerRecord;
    const uncompressedSolPerYear = uncompressedSolPerDay * 365;

    const compressedEstimate = await CompressedRecordClient.getCostEstimate(
        connection,
        recordsPerDay,
        100
    );

    const compressedSolPerDay = compressedEstimate.totalCost;
    const compressedSolPerYear = compressedSolPerDay * 365;

    return {
        uncompressed: {
            solPerDay: uncompressedSolPerDay,
            solPerYear: uncompressedSolPerYear,
            usdPerDay: uncompressedSolPerDay * SOL_PRICE_USD,
            usdPerYear: uncompressedSolPerYear * SOL_PRICE_USD,
        },
        compressed: {
            solPerDay: compressedSolPerDay,
            solPerYear: compressedSolPerYear,
            usdPerDay: compressedSolPerDay * SOL_PRICE_USD,
            usdPerYear: compressedSolPerYear * SOL_PRICE_USD,
        },
        savings: {
            solPerDay: uncompressedSolPerDay - compressedSolPerDay,
            solPerYear: uncompressedSolPerYear - compressedSolPerYear,
            usdPerDay: (uncompressedSolPerDay - compressedSolPerDay) * SOL_PRICE_USD,
            usdPerYear: (uncompressedSolPerYear - compressedSolPerYear) * SOL_PRICE_USD,
            percentageSaved: ((uncompressedSolPerDay - compressedSolPerDay) / uncompressedSolPerDay) * 100,
        },
    };
}

export function formatCostComparison(costs: Awaited<ReturnType<typeof estimateCosts>>): string {
    return `
Cost Comparison

Uncompressed:
  Daily:   ${costs.uncompressed.solPerDay.toFixed(4)} SOL ($${costs.uncompressed.usdPerDay.toFixed(2)})
  Yearly:  ${costs.uncompressed.solPerYear.toFixed(2)} SOL ($${costs.uncompressed.usdPerYear.toFixed(2)})

Compressed:
  Daily:   ${costs.compressed.solPerDay.toFixed(4)} SOL ($${costs.compressed.usdPerDay.toFixed(2)})
  Yearly:  ${costs.compressed.solPerYear.toFixed(2)} SOL ($${costs.compressed.usdPerYear.toFixed(2)})

Savings:
  Daily:   ${costs.savings.solPerDay.toFixed(4)} SOL ($${costs.savings.usdPerDay.toFixed(2)})
  Yearly:  ${costs.savings.solPerYear.toFixed(2)} SOL ($${costs.savings.usdPerYear.toFixed(2)})
  Percentage: ${costs.savings.percentageSaved.toFixed(2)}%
  `;
}
