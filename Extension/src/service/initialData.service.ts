import { PENDING_BUY_OPTIONS, PENDING_SELL_OPTIONS } from "../constants/commonConstants";
import { TradeExecutionType, TradeInfo, TradeType, TradingViewTradeInfo } from "../models/commonModels";
import { getDefaultRiskPercentage, getDefaultTradeExecutionType } from "./configuration.service";

export const getTradeInfoInitialData = (tradingViewTradeInfo: TradingViewTradeInfo): TradeInfo => {
    return {
        entryPrice: tradingViewTradeInfo.entryPrice,
        instrument: tradingViewTradeInfo.instrument,
        stopLossPrice: tradingViewTradeInfo.stopLossPrice,
        takeProfitPrice: tradingViewTradeInfo.takeProfitPrice,
        type: tradingViewTradeInfo.type,
        tradeExecutionType: getDefaultTradeExecutionType(),
        riskPercentage: getDefaultRiskPercentage()
    };
};

export const getOrderTypePendingOptions = (tradeType: TradeType): any => {
    return tradeType === TradeType.LONG
        ? PENDING_BUY_OPTIONS
        : PENDING_SELL_OPTIONS;
}
