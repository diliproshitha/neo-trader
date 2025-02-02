import { TradeInfo } from "../../models/commonModels";
import { InstrumentLotSizeConfig, InstrumentType } from "../../models/settings";
import { DefaultLotSizeCalculatorService } from "./defaultLotSizeCalculator.service";
import { IndexLotSizeCalculatorService } from "./indexLotSizeCalculator.service";

export class LotSizeCalculatorService {

    static calculateLotSize(tradeInfo: TradeInfo, accountSize?: number, instrumentLotSizeConfig?: InstrumentLotSizeConfig): string | undefined {
        if (!instrumentLotSizeConfig || !accountSize) {
            return undefined;
        }

        const entryPrice = Number(tradeInfo.entryPrice);
        const stopLossPrice = Number(tradeInfo.stopLossPrice);
        const priceDiff = Math.abs(stopLossPrice - entryPrice);
        const amountOnRisk = accountSize * Number(tradeInfo.riskPercentage) / 100;

        console.log(amountOnRisk, priceDiff, instrumentLotSizeConfig.contractSize);

        return (amountOnRisk / priceDiff / (instrumentLotSizeConfig.contractSize ?? 1)).toFixed(3);
    }

}