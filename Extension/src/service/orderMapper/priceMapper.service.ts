import { TradeInfo } from "../../models/commonModels";
import { InstrumentMapping } from "../../models/settings";

export class PriceMapperService {

    static mapPrices(tradeInfo: TradeInfo, instrumentMapping?: InstrumentMapping): TradeInfo {
        const priceCorrection = instrumentMapping?.priceCorrection || 0;
        return {
            ...tradeInfo,
            entryPrice: this.mapPrice(tradeInfo.entryPrice, priceCorrection),
            stopLossPrice: this.mapPrice(tradeInfo.stopLossPrice, priceCorrection),
            takeProfitPrice: this.mapPrice(tradeInfo.takeProfitPrice, priceCorrection),
        };
    }

    private static mapPrice(price: string, priceCorrection: number): string {
        const precision = price.split(".")[1].length;
        return (Number(price) + priceCorrection).toFixed(precision) + "";
    }

}