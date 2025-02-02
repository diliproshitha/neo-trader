import { TradeInfo } from "../models/commonModels";
import { ServerSettings } from "../models/settings";
import { OrderMapperService } from "./orderMapper.service";
import { buildOrderSubmitUrl, getOrderSubmitRequestHeaders } from "./requestHelper.service";

export const submitOrders = async (tradeInfo: TradeInfo): Promise<boolean> => {
    // Get server addresses from localStorage
    const serverSettingsStr = localStorage.getItem('serverSettings');
    if (!serverSettingsStr) {
        throw new Error('No server addresses found in localStorage');
    }

    const serverSettings: ServerSettings[] = JSON.parse(serverSettingsStr);
    
    // Build requests for all servers
    const requests = serverSettings.map(serverConfig => {
        return OrderMapperService.mapOrder(tradeInfo, serverConfig);
    });

    // Submit all orders concurrently
    const responses = await Promise.all(requests);
    
    // Check if all requests were successful
    const allSuccessful = responses.every(response => response.ok);
    
    if (!allSuccessful) {
        throw new Error('Some orders failed to submit');
    }

    return true;
};
