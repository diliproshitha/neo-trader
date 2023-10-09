import { BrowserType } from "../models/commonModels";

export const getBrowserType = (): BrowserType => {
    let browserType = BrowserType.UNKNOWN;
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        browserType = BrowserType.FIREFOX;
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browserType = BrowserType.CHROME;
    }
    return browserType;
}