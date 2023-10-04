import { Image, Text } from "@chakra-ui/react";

const OrderNotFoundPanel = () => {
    return <>
        <Text color='gray.600'>Hmm... such emptyness...</Text>
        <Image src="/assets/trade-not-found.png" />
        <Text color='gray.500' fontSize='md'>Fire up a TradingView chart and let's hustle!</Text>
    </>
};

export default OrderNotFoundPanel;