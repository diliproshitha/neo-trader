import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
} from '@chakra-ui/react';
import MT4ServerSettings from './MT4ServerSettings';
import { TerminalType, ServerSettings } from '../../models/settings';

interface AddServerProps {
  onSubmit: (serverData: ServerSettings & { active: boolean; id: string }) => void;
  onCancel: () => void;
  initialData?: ServerSettings & { active: boolean; id: string } | null;
  mode?: 'add' | 'update';
}

const AddServer: React.FC<AddServerProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  mode = 'add' 
}) => {
  const [serverData, setServerData] = useState<ServerSettings & { active: boolean }>(
    initialData || {
    id: crypto.randomUUID(),
      active: true,
      name: '',
      address: '',
      accountSize: 10000,
      terminalType: TerminalType.MT4,
      instrumentLotSizeConfigs: [],
      instrumentMappings: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...serverData, id: serverData.id || crypto.randomUUID() });
  };

  const toTerminalType = (terminalType: string): TerminalType => {
    return terminalType === 'MT4' ? TerminalType.MT4 : TerminalType.MT5;
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl display="flex" alignItems="center" gap={4}>
          <Box display="flex" alignItems="center">
            <Checkbox
              id="active"
              isChecked={serverData.active}
              onChange={(e) => setServerData({ ...serverData, active: e.target.checked })}
              mr={2}
            />
            <FormLabel htmlFor="active" mb={0}>
              Active
            </FormLabel>
          </Box>

          <FormControl flex="1" maxW="200px">
            <Select
              id="terminalType"
              value={serverData.terminalType}
              onChange={(e) => setServerData({ ...serverData, terminalType: toTerminalType(e.target.value) })}
            >
              <option value="MT4">MT4</option>
              <option value="MT5">MT5</option>
            </Select>
          </FormControl>
        </FormControl>

        {(serverData.terminalType === 'MT4' || serverData.terminalType === 'MT5') && (
          <MT4ServerSettings
            name={serverData.name}
            address={serverData.address}
            instrumentLotSizeConfigs={serverData.instrumentLotSizeConfigs}
            instrumentMappings={serverData.instrumentMappings}
            accountSize={serverData.accountSize}
            onChange={(values) => {
                setServerData({ ...serverData, ...values })
            }}
          />
        )}

        <HStack spacing={4} mb={4}>
          <Button
            type="submit"
            colorScheme="blue"
            flex="1"
          >
            {mode === 'add' ? 'Add Server' : 'Update Server'}
          </Button>
          <Button
            variant="ghost"
            flex="1"
            onClick={() => onSubmit(initialData || serverData)}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AddServer;
