import { PendingOrderType, TradeExecutionType, TradeInfo, TradeType } from "../models/commonModels";

export const buildOrderSubmitUrl = (tradeInfo: TradeInfo) => {
    let url = `http://localhost:23456/submit-trade?` +
    `symbol=${tradeInfo.instrument}` +
    `&type=${mapTradeTypes(tradeInfo.type, tradeInfo.tradeExecutionType, tradeInfo.pendingOrderType)}` +
    `&entryPrice=${tradeInfo.entryPrice}` +
    `&stopLossPrice=${tradeInfo.stopLossPrice}` +
    `&takeProfitPrice=${tradeInfo.takeProfitPrice}` +
    `&riskPercentage=${tradeInfo.riskPercentage}`;
    return url;
};

const mapTradeTypes = (tradeType: TradeType, executionType: TradeExecutionType, pendingOrderType: PendingOrderType | undefined) => {
    return mapTradeType(tradeType) + mapTradeExecutionType(executionType) + mapPendingOrderType(pendingOrderType);

}

const mapTradeType = (tradeType: TradeType): number => {
    switch (tradeType) {
        case TradeType.LONG:
            return 1000;
        default:
            return 2000;
    }
}

const mapTradeExecutionType = (executionType: TradeExecutionType): number => {
    switch (executionType) {
        case TradeExecutionType.MARKET_ORDER:
            return 100;
        default:
            return 200;
    }
}

const mapPendingOrderType = (pendingOrderType: PendingOrderType | undefined): number => {
    let value = 0;
    switch (pendingOrderType) {
        case PendingOrderType.AUTO_PENDING_BUY:
            value =  1;
            break;
        case PendingOrderType.BUY_LIMIT:
            value =  2;
            break;
        case PendingOrderType.BUY_STOP:
            value =  3;
            break;
        case PendingOrderType.AUTO_PENDING_SELL:
            value =  4;
            break;
        case PendingOrderType.SELL_LIMIT:
            value =  5;
            break;
        case PendingOrderType.SELL_STOP:
            value =  6;
            break;
    }
    return value;
}

export const getOrderSubmitRequestHeaders = () => {
    return {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}};
}