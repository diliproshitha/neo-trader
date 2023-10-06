import { PendingOrderType, TradeExecutionType } from "../models/commonModels";

 export const TRADE_EXECUTION_TYPE_OPTIONS = [
    {key: TradeExecutionType.MARKET_ORDER, value: 'Market Order'}, 
    {key: TradeExecutionType.PENDING_ORDER, value: 'Pending Order'}
];

export const PENDING_SELL_OPTIONS = [
    {key: PendingOrderType.AUTO, value: 'Auto'}, 
    {key: PendingOrderType.SELL_LIMIT, value: 'Sell Limit'}, 
    {key: PendingOrderType.SELL_STOP, value: 'Sell Stop'}
];

export const PENDING_BUY_OPTIONS = [
    {key: PendingOrderType.AUTO, value: 'Auto'}, 
    {key: PendingOrderType.BUY_LIMIT, value: 'Buy Limit'}, 
    {key: PendingOrderType.BUY_STOP, value: 'Buy Stop'}
];