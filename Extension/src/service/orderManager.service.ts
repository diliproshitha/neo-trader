import { TradeInfo } from "../models/commonModels";
import { buildOrderSubmitUrl, getOrderSubmitRequestHeaders } from "./requestHelper.service";

export const submitOrders = async (tradeInfo: TradeInfo): Promise<boolean> => {
    // Get server addresses from localStorage
    const serverAddressesStr = localStorage.getItem('servers');
    if (!serverAddressesStr) {
        throw new Error('No server addresses found in localStorage');
    }

    const serverAddresses: string[] = JSON.parse(serverAddressesStr);
    
    // Build requests for all servers
    const requests = serverAddresses.map(serverAddress => {
        const url = buildOrderSubmitUrl(tradeInfo, serverAddress);
        return fetch(url, getOrderSubmitRequestHeaders());
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
