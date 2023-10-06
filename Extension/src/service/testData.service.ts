import { TradingViewTradeInfo, TradeType } from "../models/commonModels";

export const getTradingViewTradeInfoTestData = (): TradingViewTradeInfo => {
    return {
        entryPrice: "1.00022",
        instrument: "GBPUSD",
        stopLossPrice: "1.00023",
        takeProfitPrice: "1.000365",
        type: TradeType.LONG
    };
};