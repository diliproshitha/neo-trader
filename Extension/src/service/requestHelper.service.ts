import { PendingOrderType, TradeExecutionType, TradeInfo, TradeType } from "../models/commonModels";

export const buildOrderSubmitUrl = (tradeInfo: TradeInfo) => {
    return `http://localhost:23456/submit-trade?` +
        `symbol=${tradeInfo.instrument}` +
        `&type=${mapTradeTypes(tradeInfo.type, tradeInfo.tradeExecutionType, tradeInfo.pendingOrderType)}` +
        `&entryPrice=${tradeInfo.entryPrice}` +
        `&stopLossPrice=${tradeInfo.stopLossPrice}` +
        `&takeProfitPrice=${tradeInfo.takeProfitPrice}` +
        `&riskPercentage=${tradeInfo.riskPercentage}`;
};

/**
 * MARKET_BUY: 110
 * AUTO_PENDING_BUY: 121
 * PENDING_BUY_LIMIT: 122
 * PENDING_BUY_STOP: 123
 * MARKET_SELL: 210
 * AUTO_PENDING_SELL: 221
 * PENDING_SELL_LIMIT: 222
 * PENDING_SELL_STOP: 223
 */
const mapTradeTypes = (tradeType: TradeType, executionType: TradeExecutionType, pendingOrderType: PendingOrderType | undefined) => {
    return mapTradeType(tradeType) + mapTradeExecutionType(executionType) + mapPendingOrderType(pendingOrderType);

}

const mapTradeType = (tradeType: TradeType): number => {
    switch (tradeType) {
        case TradeType.LONG:
            return 100;
        default:
            return 200;
    }
}

const mapTradeExecutionType = (executionType: TradeExecutionType): number => {
    switch (executionType) {
        case TradeExecutionType.MARKET_ORDER:
            return 10;
        default:
            return 20;
    }
}

const mapPendingOrderType = (pendingOrderType: PendingOrderType | undefined): number => {
    let value = 0;
    switch (pendingOrderType) {
        case PendingOrderType.AUTO:
            value =  1;
            break;
        case PendingOrderType.LIMIT:
            value =  2;
            break;
        case PendingOrderType.STOP:
            value =  3;
            break;
    }
    return value;
}

export const getOrderSubmitRequestHeaders = () => {
    return {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}};
}