import { TradeInfo } from "../../models/commonModels";
import { InstrumentLotSizeConfig } from "../../models/settings";

export class IndexLotSizeCalculatorService {


    static calculateLotSize(tradeInfo: TradeInfo, instrumentLotSizeConfig: InstrumentLotSizeConfig, accountSize: number): string {
        const entryPrice = Number(tradeInfo.entryPrice);
        const stopLossPrice = Number(tradeInfo.stopLossPrice);
        const priceDiff = Math.abs(stopLossPrice - entryPrice);
        const amountOnRisk = accountSize * Number(tradeInfo.riskPercentage) / 100;

        return (amountOnRisk / priceDiff / (instrumentLotSizeConfig.contractSize ?? 1)).toFixed(2);
    }

}