import { PendingOrderType, TradeExecutionType, TradeType } from "../models/commonModels"

export const getDefaultTradeExecutionType = (): TradeExecutionType => {
    return process.env.REACT_APP_DEFAULT_TRADE_EXECUTION_TYPE
        ? process.env.REACT_APP_DEFAULT_TRADE_EXECUTION_TYPE as TradeExecutionType
        : TradeExecutionType.PENDING_ORDER;
}

export const getDefaultRiskPercentage = (): string => {
    return process.env.REACT_APP_DEFAULT_RISK_PERCENTAGE
        ? process.env.REACT_APP_DEFAULT_RISK_PERCENTAGE
        : "1";
}

export const getDefaultPendingOrderType = (tradeType: TradeType): PendingOrderType => {
    return PendingOrderType.AUTO;
}

export const isDevMode = (): boolean => {
    return process.env.REACT_APP_DEV_MODE === 'true';
}