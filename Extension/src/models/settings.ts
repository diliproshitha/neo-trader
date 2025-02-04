export enum TerminalType {
    MT4 = 'MT4',
    MT5 = 'MT5'
}

export interface InstrumentLotSizeConfig {
    id: string;
    instrumentName: string;
    active: boolean;
    contractSize?: number;
    instrumentType: InstrumentType;
}

export interface InstrumentMapping {
    id: string;
    active: boolean;
    tradingviewSymbol: string;
    terminalSymbol: string;
    priceCorrection?: number;
}

export enum InstrumentType {
    Currency = 'Currency',
    Stock = 'Stock',
    Commodity = 'Commodity',
    Index = 'Index',
    Crypto = 'Crypto',
    CFD = 'CFD'
}

export interface ServerSettings {
    id: string;
    name: string;
    active: boolean;
    address: string;
    accountSize?: number;
    terminalType: TerminalType;
    instrumentLotSizeConfigs: InstrumentLotSizeConfig[];
    instrumentMappings: InstrumentMapping[];
}