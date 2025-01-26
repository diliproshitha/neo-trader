import { Button } from "@chakra-ui/react";
import TextInputSection from "../textInputSection/TextInputSection";
import SelectInputSection from "../selectInputSection/SelectInputSection";
import { useState, FC } from "react";
import { MainContentPanelState, PendingOrderType, TradeExecutionType, TradeInfo, TradeType, TradingViewTradeInfo } from "../../models/commonModels";
import { getOrderTypePendingOptions, getTradeInfoInitialData } from "../../service/initialData.service";
import { getDefaultPendingOrderType, getDefaultTradeExecutionType } from "../../service/configuration.service";
import { TRADE_EXECUTION_TYPE_OPTIONS } from "../../constants/commonConstants";
import { buildOrderSubmitUrl, getOrderSubmitRequestHeaders } from "../../service/requestHelper.service";
import { useEffect } from "react";
import { submitOrders } from "../../service/orderManager.service";

type TradeInfoPanelProps = {
    tradingViewTradeInfo: TradingViewTradeInfo,
    setStatusCallback: any,
    errorMessageCallback: any
}

const TradeInfoPanel: FC<TradeInfoPanelProps> = ({tradingViewTradeInfo, setStatusCallback, errorMessageCallback}) => {

    const [tradeInfo, setTradeInfo] = useState<TradeInfo>(getTradeInfoInitialData(tradingViewTradeInfo));
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let executionType = getDefaultTradeExecutionType();
        let pendingOrderType;
        if (executionType == TradeExecutionType.PENDING_ORDER) {
            pendingOrderType = getDefaultPendingOrderType(tradingViewTradeInfo.type);
        }

        setTradeInfo({
            ...getTradeInfoInitialData(tradingViewTradeInfo), 
            tradeExecutionType: executionType,
            pendingOrderType: pendingOrderType
        })
    }, []);

    const sendOrder = () => {
        setLoading(true);
        submitOrders(tradeInfo)
            .then(response => {
                setLoading(false);
                if (response) {
                    setStatusCallback(MainContentPanelState.TRADE_PLACED_SUCCESSFULLY);
                } else {
                    setStatusCallback(MainContentPanelState.ERROR_PLACING_TRADE);
                    errorMessageCallback('Failed to submit orders to all servers');
                }
            })
            .catch(error => {
                setLoading(false);
                setStatusCallback(MainContentPanelState.ERROR_PLACING_TRADE);
                errorMessageCallback(error.message || 'Unknown error occurred');
            });
    };

    const mapToPendingOrderType = (orderType: TradeType, executionType: TradeExecutionType): PendingOrderType | undefined => {
        let pendingOrderType;
        if (executionType === TradeExecutionType.PENDING_ORDER) {
            pendingOrderType = PendingOrderType.AUTO;
        }
        return pendingOrderType;
    }
    
    return (
        <>
            <TextInputSection 
                label="Pair" 
                inputValue={tradeInfo.instrument} 
                inputOnChangeFn={(value: string) => setTradeInfo({...tradeInfo, instrument: value})}
            />
            <TextInputSection 
                label="Type" 
                inputValue={tradeInfo.type} 
                inputOnChangeFn={(value: TradeType) => setTradeInfo({...tradeInfo, type: value})}
            />
            <TextInputSection 
                label="Entry price" 
                inputValue={tradeInfo.entryPrice} 
                inputOnChangeFn={(value: string) => setTradeInfo({...tradeInfo, entryPrice: value})}
            />
            <TextInputSection 
                label="Stop loss price" 
                inputValue={tradeInfo.stopLossPrice} 
                inputOnChangeFn={(value: string) => setTradeInfo({...tradeInfo, stopLossPrice: value})}
            />
            <TextInputSection 
                label="Take profit price" 
                inputValue={tradeInfo.takeProfitPrice} 
                inputOnChangeFn={(value: string) => setTradeInfo({...tradeInfo, takeProfitPrice: value})}
            />
            <TextInputSection 
                label="Risk percentage (%)" 
                inputValue={tradeInfo.riskPercentage} 
                inputOnChangeFn={(value: string) => setTradeInfo({...tradeInfo, riskPercentage: value})}
            />
            <SelectInputSection 
                label="Order execution type" 
                defaultValue={tradeInfo.tradeExecutionType} 
                options={TRADE_EXECUTION_TYPE_OPTIONS} 
                onChangeFn={(value: TradeExecutionType) => {
                    let pendingOrderType = mapToPendingOrderType(tradeInfo.type, value);
                    setTradeInfo({...tradeInfo, tradeExecutionType: value, pendingOrderType});
                }}
            />
            {tradeInfo.tradeExecutionType === TradeExecutionType.PENDING_ORDER && (
                <SelectInputSection 
                    label="Pending order type" 
                    defaultValue={tradeInfo.pendingOrderType} 
                    options={getOrderTypePendingOptions(tradeInfo.type)} 
                    onChangeFn={(value: PendingOrderType) => setTradeInfo({...tradeInfo, pendingOrderType: value})}
                />
            )}
            <Button 
                colorScheme='orange' 
                size='sm' 
                width='100%' 
                mt='10px' 
                isLoading={isLoading}
                onClick={sendOrder}
            >
                Send
            </Button>
        </>
    );
};

export default TradeInfoPanel;