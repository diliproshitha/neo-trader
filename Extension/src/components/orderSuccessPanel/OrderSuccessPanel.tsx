import { Image, Text } from "@chakra-ui/react";

const OrderSuccessPanel = () => {
    return <>
        <Text color='gray.600'>Voila!</Text>
        <Image src="/assets/trade-placed-successfully.png" />
        <Text color='gray.500' fontSize='md'>Your trade has been placed successfully!</Text>
    </>
};

export default OrderSuccessPanel;