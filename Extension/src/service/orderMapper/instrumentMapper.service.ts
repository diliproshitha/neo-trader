import { TradeInfo } from "../../models/commonModels";
import { InstrumentMapping } from "../../models/settings";

export class InstrumentMapperService {

    static mapInstrument(tradeInfo: TradeInfo, instrumentMapping?: InstrumentMapping): TradeInfo {
        const mappedInstrument   = instrumentMapping?.terminalSymbol || tradeInfo.instrument;
        return {
            ...tradeInfo,
            instrument: mappedInstrument,
        };
    }

}