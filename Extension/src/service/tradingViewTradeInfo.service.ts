import { TradingViewTradeInfo } from "../models/commonModels";
import { isDevMode } from "./configuration.service";
import { getTradingViewTradeInfoTestData } from "./testData.service";

const getTradeInfoFirefox = async (): Promise<TradingViewTradeInfo[]>  =>  {
    let result: TradingViewTradeInfo[] = [];
    try {
        result = await browser.tabs.executeScript({ file: "/content_scripts/fetchTradeInfo.js" });
    } catch (err) {
        if (isDevMode()) {
            result = [getTradingViewTradeInfoTestData()];
        } else {
            console.error(err);
        }
    }
    console.log(result);
    return result;
};


export {getTradeInfoFirefox};