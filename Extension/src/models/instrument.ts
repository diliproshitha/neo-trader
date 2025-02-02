export interface Instrument {
    name: string;
    type: 'CURRENCY' | 'METAL' | 'CFD';
}

export interface InstrumentsData {
    instruments: Instrument[];
}