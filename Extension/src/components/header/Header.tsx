import { HStack, Image, Text, IconButton, Modal, ModalOverlay, ModalContent, 
         ModalHeader, ModalBody, ModalFooter, Button, Input, VStack, 
         useDisclosure } from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import Settings from '../settings/Settings';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <Settings onClose={onClose} />
                </ModalContent>
            </Modal>
        </HStack>
    );
};

export default Header;