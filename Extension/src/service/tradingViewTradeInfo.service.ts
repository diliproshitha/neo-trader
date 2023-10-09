import { BrowserType, TradingViewTradeInfo } from "../models/commonModels";
import { getBrowserType } from "./browserUtil.service";
import { isDevMode } from "./configuration.service";
import { getTradingViewTradeInfoTestData } from "./testData.service";

export const getTradeInfo = async (): Promise<TradingViewTradeInfo | null>  =>  {
    let result: TradingViewTradeInfo | null = null;
    try {
        const browserType: BrowserType = getBrowserType();
        if (browserType == BrowserType.FIREFOX) {
            result = await getTradeFirefox();
        } else {
            result = await getTradeChrome();
        }
    } catch (err) {
        if (isDevMode()) {
            result = getTradingViewTradeInfoTestData();
        } else {
            console.error(err);
        }
    }
    console.log(result);
    return result;
};

const getTradeChrome = async (): Promise<TradingViewTradeInfo | null> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const injectionResult = await chrome.scripting.executeScript({ target: { tabId: tab.id || 0 }, files: ["/content_scripts/fetchTradeInfo.js"] });
    if (injectionResult && injectionResult.length > 0) {
        return injectionResult[0].result as TradingViewTradeInfo;
    }
    return null;
}

const getTradeFirefox = async (): Promise<TradingViewTradeInfo | null> => {
    const result = await browser.tabs.executeScript({ file: "/content_scripts/fetchTradeInfo.js" });
    if (result && result.length > 0) {
        return result[0];
    }
    return null;
}
