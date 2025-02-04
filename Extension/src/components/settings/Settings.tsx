import { ModalHeader, ModalBody, ModalFooter, Button, VStack, 
         useDisclosure, HStack, Checkbox, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import AddServer from './AddServer';
import { ServerSettings, TerminalType } from '../../models/settings';

interface SettingsProps {
    onClose: () => void;
}

type ServerData = ServerSettings & { active: boolean; id: string };

const Settings = ({ onClose }: SettingsProps) => {
    const [servers, setServers] = useState<ServerData[]>([]);
    const [showAddServer, setShowAddServer] = useState(false);
    const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);

    useEffect(() => {
        const savedServers = localStorage.getItem('serverSettings');
        if (savedServers) {
            setServers(JSON.parse(savedServers));
        }
    }, []);

    const handleAddServer = () => {
        setShowAddServer(true);
    };

    const handleServerSubmit = (serverData: ServerData) => {
        if (selectedServer) {
            // Update existing server
            setServers(servers.map(server => 
                server.id === selectedServer.id ? serverData : server
            ));
            setSelectedServer(null);
        } else {
            // Add new server
            setServers([...servers, { ...serverData, id: crypto.randomUUID() }]);
        }
        setShowAddServer(false);
    };

    const handleSave = () => {
        localStorage.setItem('serverSettings', JSON.stringify(servers));
        onClose();
    };

    return (
        <>
            <ModalHeader>Settings</ModalHeader>
            <ModalBody>
                <VStack spacing={4} align="stretch">
                    {showAddServer ? (
                        <AddServer 
                            onSubmit={handleServerSubmit}
                            onCancel={() => {
                                setShowAddServer(false);
                                setSelectedServer(null);
                            }}
                            initialData={selectedServer}
                            mode={selectedServer ? 'update' : 'add'}
                        />
                    ) : (
                        <>
                            {servers.map((server, index) => (
                                <HStack key={server.id} spacing={4}>
                                    <Checkbox
                                        isChecked={server.active}
                                        onChange={(e) => {
                                            const updatedServers = [...servers];
                                            updatedServers[index] = {
                                                ...server,
                                                active: e.target.checked
                                            };
                                            setServers(updatedServers);
                                        }}
                                    />
                                    <Text flex="1">
                                        {server.name || server.address.replace(/^https?:\/\//, '').substring(0, 15)}
                                    </Text>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setSelectedServer(server);
                                            setShowAddServer(true);
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => {
                                            const updatedServers = servers.filter(s => s.id !== server.id);
                                            setServers(updatedServers);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </HStack>
                            ))}
                            <Button leftIcon={<AddIcon />} onClick={handleAddServer}>
                                Add Server
                            </Button>
                        </>
                    )}
                </VStack>
            </ModalBody>
            {!showAddServer && (
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            )}
        </>
    );
};

export default Settings;
