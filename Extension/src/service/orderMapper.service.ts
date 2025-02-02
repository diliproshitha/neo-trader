import { TradeInfo } from "../models/commonModels";
import { ServerSettings, TerminalType } from "../models/settings";
import { Mt4OrderMapperService } from "./orderMapper/mt4OrderMapper.service";

export class OrderMapperService {
    
    static mapOrder(order: TradeInfo, serverSettings: ServerSettings): Promise<any> {
        const serverType = serverSettings.terminalType;
        switch (serverType) {
            case TerminalType.MT4:
                return Mt4OrderMapperService.mapOrder(order, serverSettings);
            case TerminalType.MT5:
                return Mt4OrderMapperService.mapOrder(order, serverSettings);
            default:
                return Promise.reject(new Error('Invalid server type'));
        }
    }

}