import { HStack, Image, Text, IconButton, Modal, ModalOverlay, ModalContent, 
         ModalHeader, ModalBody, ModalFooter, Button, Input, VStack, 
         useDisclosure } from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [servers, setServers] = useState<string[]>([]);

    useEffect(() => {
        const savedServers = localStorage.getItem('servers');
        if (savedServers) {
            setServers(JSON.parse(savedServers));
        }
    }, []);

    const handleAddServer = () => {
        setServers([...servers, '']);
    };

    const handleServerChange = (index: number, value: string) => {
        const newServers = [...servers];
        newServers[index] = value;
        setServers(newServers);
    };

    const handleSave = () => {
        localStorage.setItem('servers', JSON.stringify(servers.filter(server => server.trim() !== '')));
        onClose();
    };

    return (
        <HStack justify="space-between" width="100%" px={4}>
            <HStack>
                <Image src="/assets/logo-410.png" alt='Logo' boxSize='60px' />
                <Text fontSize='2xl' color='orange.500'>Neo </Text>
                <Text fontSize='2xl'>Trader</Text>
            </HStack>
            
            <IconButton
                aria-label="Settings"
                icon={<SettingsIcon />}
                variant="ghost"
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            {servers.map((server, index) => (
                                <Input
                                    key={index}
                                    placeholder="Enter server address"
                                    value={server}
                                    onChange={(e) => handleServerChange(index, e.target.value)}
                                />
                            ))}
                            <Button leftIcon={<AddIcon />} onClick={handleAddServer}>
                                Add Server
                            </Button>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </HStack>
    );
};

export default Header;