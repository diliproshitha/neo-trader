import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTradeInfoFirefox } from "../../service/tradingViewTradeInfo.service";
import { TradingViewTradeInfo, MainContentPanelState } from "../../models/commonModels";
import TradeInfoPanel from "../tradeInfoPanel/TradeInfoPanel";
import OrderNotFoundPanel from "../orderNotFoundPanel/OrderNotFoundPanel";
import OrderSuccessPanel from "../orderSuccessPanel/OrderSuccessPanel";
import ErrorPanel from "../errorPanel/ErrorPanel";

const MainContentPanel = () => {

    const [tradeInfo, setTradeInfo] = useState<TradingViewTradeInfo | null>(null);
    const [panelState, setPanelState] = useState<MainContentPanelState>(MainContentPanelState.TRADE_NOT_FOUND);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        getTradeInfoFirefox()
            .then(res => {
                if (res.length > 0 && res[0]) {
                    setTradeInfo(res[0]);
                    setPanelState(MainContentPanelState.TRADE_FOUND);
                } else {
                    setPanelState(MainContentPanelState.TRADE_NOT_FOUND);
                }
            })
            .catch(error => {
                setPanelState(MainContentPanelState.TRADE_NOT_FOUND);
                console.error(error)
            });
    }, []);

    const getContent = () => {
        switch (panelState) {
            case MainContentPanelState.TRADE_FOUND:
                return tradeInfo && 
                    <TradeInfoPanel 
                        setStatusCallback={setPanelState} 
                        errorMessageCallback={setErrorMessage} 
                        tradingViewTradeInfo={tradeInfo} 
                    />;
            case MainContentPanelState.TRADE_PLACED_SUCCESSFULLY:
                return <OrderSuccessPanel />
            case MainContentPanelState.ERROR_PLACING_TRADE:
                return <ErrorPanel errorMessage={errorMessage} />;
            default:
                return <OrderNotFoundPanel />
        }
        
    }

    return (
        <VStack spacing={2} width='60%'>
            {getContent()}
        </VStack>
    );
};

export default MainContentPanel;