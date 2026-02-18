import { atomWithStorage } from 'jotai/utils';

export interface CreateRecordFormState {
    title: string;
    description: string;
    cid: string | null;
    anchorTx: string | null;
    packedKeys: Array<{ recipient: string; packedB64?: string; packedCid?: string }>;
    loadedRecordSymKey: string | null;
}

export interface ConsentFormState {
    recordCid: string;
    recipientPk: string;
    daysValid: number;
    anchorOnChain: boolean;
    lastResult: { cid?: string; tx?: string; error?: string } | null;
}

export const createRecordFormAtom = atomWithStorage<CreateRecordFormState>(
    'health-dapp-create-record',
    {
        title: '',
        description: '',
        cid: null,
        anchorTx: null,
        packedKeys: [],
        loadedRecordSymKey: null,
    }
);

export const consentFormAtom = atomWithStorage<ConsentFormState>(
    'health-dapp-consent-form',
    {
        recordCid: '',
        recipientPk: '',
        daysValid: 7,
        anchorOnChain: false,
        lastResult: null,
    }
);

export function clearCreateRecordForm() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('health-dapp-create-record');
    }
}

export function clearConsentForm() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('health-dapp-consent-form');
    }
}
