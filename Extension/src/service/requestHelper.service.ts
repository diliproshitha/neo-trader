import { TradeInfo } from "../models/commonModels";

export const buildOrderSubmitUrl = (tradeInfo: TradeInfo) => {
    return `http://localhost:23456/submit-trade?` +
    `symbol=${tradeInfo.instrument}` +
    `&type=${tradeInfo.type}` +
    `&entryPrice=${tradeInfo.entryPrice}` +
    `&stopLossPrice=${tradeInfo.stopLossPrice}` +
    `&takeProfitPrice=${tradeInfo.takeProfitPrice}` +
    `&riskPercentage=${tradeInfo.riskPercentage}` +
    `&tradeExecutionType=${tradeInfo.tradeExecutionType}` +
    `&pendingOrderType=${tradeInfo.pendingOrderType}`;
};

export const getOrderSubmitRequestHeaders = () => {
    return {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}};
}