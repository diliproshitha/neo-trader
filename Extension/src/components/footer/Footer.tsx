import { Button, Text } from '@chakra-ui/react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="FooterWrapper">
            <Text fontSize='sm'>Need help with Neo Trader?</Text>
            <Button bgColor='orange.100' size='xs' onClick={() => window.open('https://github.com/diliproshitha', "_blank")}>GET HELP</Button>
        </div>
    );
};

export default Footer;