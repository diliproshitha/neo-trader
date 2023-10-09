export type TradingViewTradeInfo = {
    entryPrice: string;
    instrument: string;
    stopLossPrice: string;
    takeProfitPrice: string;
    type: TradeType;
};

export type TradeInfo = {
    entryPrice: string;
    instrument: string;
    stopLossPrice: string;
    takeProfitPrice: string;
    type: TradeType;
    tradeExecutionType: TradeExecutionType;
    pendingOrderType?: PendingOrderType;
    riskPercentage: string;
};

export enum TradeType {
    LONG = 'LONG',
    SHORT = 'SHORT'
}

export enum TradeExecutionType {
    MARKET_ORDER = 'MARKET_ORDER',
    PENDING_ORDER = 'PENDING_ORDER'
}

export enum PendingOrderType {
    AUTO = 'AUTO',
    LIMIT = 'LIMIT',
    STOP = 'STOP',
}

export enum MainContentPanelState {
    TRADE_NOT_FOUND = 'TRADE_NOT_FOUND',
    TRADE_FOUND = 'TRADE_FOUND',
    TRADE_PLACED_SUCCESSFULLY = 'TRADE_PLACED_SUCCESSFULLY',
    ERROR_PLACING_TRADE = 'ERROR_PLACING_TRADE'
}

export enum BrowserType {
    FIREFOX = 'FIREFOX',
    CHROME = 'CHROME',
    UNKNOWN = 'UNKNOWN'
}