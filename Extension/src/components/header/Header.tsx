import { HStack, Image, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <HStack>
            <Image src="/assets/logo-410.png" alt='Logo' boxSize='60px' />
            <Text fontSize='2xl' color='orange.500'>Neo </Text>
            <Text fontSize='2xl'>Trader</Text>
        </HStack>
    );
};

export default Header;