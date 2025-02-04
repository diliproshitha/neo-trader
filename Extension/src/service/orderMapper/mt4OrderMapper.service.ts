import { InstrumentLotSizeConfig, InstrumentMapping, TerminalType } from "../../models/settings";

import { TradeInfo } from "../../models/commonModels";
import { ServerSettings } from "../../models/settings";
import { getOrderSubmitRequestHeaders } from "../requestHelper.service";
import { buildOrderSubmitUrl } from "../requestHelper.service";
import { PriceMapperService } from "./priceMapper.service";
import { InstrumentMapperService } from "./instrumentMapper.service";
import { LotSizeCalculatorService } from "../lotSize/lotSizeCalculator.service";

export class Mt4OrderMapperService {

    static mapOrder(order: TradeInfo, serverSettings: ServerSettings): Promise<any> {

        const instrumentMapping = this.filterInstrumentMappings(serverSettings.instrumentMappings, order.instrument);
        // const instrumentLotSizeConfig = this.filterInstrumentLotSizeConfigs(serverSettings.instrumentLotSizeConfigs, order.instrument);

        // const lotSize = LotSizeCalculatorService.calculateLotSize(order, serverSettings.accountSize, instrumentLotSizeConfig);
        const instrumentMappedTradeInfo = InstrumentMapperService.mapInstrument(order, instrumentMapping);
        // const priceMappedTradeInfo = PriceMapperService.mapPrices(instrumentMappedTradeInfo, instrumentMapping);
        const url = buildOrderSubmitUrl(instrumentMappedTradeInfo, serverSettings.address);
        return fetch(url, getOrderSubmitRequestHeaders());
    }

    private static filterInstrumentMappings(instrumentMappings: InstrumentMapping[], instrument: string): InstrumentMapping | undefined {
        return instrumentMappings.find(mapping => mapping.tradingviewSymbol === instrument);
    }

    private static filterInstrumentLotSizeConfigs(instrumentLotSizeConfigs: InstrumentLotSizeConfig[], instrument: string): InstrumentLotSizeConfig | undefined {
        return instrumentLotSizeConfigs.find(config => config.instrumentName === instrument);
    }

}