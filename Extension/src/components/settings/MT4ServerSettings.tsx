import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Collapse,
  Box,
  HStack,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import InstrumentLotSizeConfig from './InstrumentLotSizeConfig';
import InstrumentMappingConfig from './InstrumentMappingConfig';
import { InstrumentLotSizeConfig as IInstrumentLotSizeConfig, InstrumentMapping } from '../../models/settings';

interface MT4ServerSettingsProps {
  name: string;
  address: string;
  accountSize?: number;
  instrumentLotSizeConfigs: IInstrumentLotSizeConfig[];
  instrumentMappings?: InstrumentMapping[];
  onChange: (values: { 
    name: string; 
    address: string;
    accountSize?: number;
    instrumentLotSizeConfigs: IInstrumentLotSizeConfig[];
    instrumentMappings?: InstrumentMapping[];
  }) => void;
}

const MT4ServerSettings: React.FC<MT4ServerSettingsProps> = ({ 
  name, 
  address, 
  accountSize,
  instrumentLotSizeConfigs = [],
  instrumentMappings = [],
  onChange 
}) => {
  const [isLotSizeOpen, setIsLotSizeOpen] = useState(false);
  const [isMappingsOpen, setIsMappingsOpen] = useState(false);

  const addMapping = () => {
    const newMapping: InstrumentMapping = {
      id: crypto.randomUUID(),
      active: true,
      tradingviewSymbol: '',
      terminalSymbol: '',
    };
    onChange({
      name,
      address,
      accountSize,
      instrumentLotSizeConfigs,
      instrumentMappings: [...instrumentMappings, newMapping]
    });
  };

  const deleteMapping = (id: string) => {
    onChange({
      name,
      address,
      accountSize,
      instrumentLotSizeConfigs,
      instrumentMappings: instrumentMappings.filter(m => m.id !== id)
    });
  };

  const updateMapping = (id: string, updates: Partial<InstrumentMapping>) => {
    onChange({
      name,
      address,
      accountSize,
      instrumentLotSizeConfigs,
      instrumentMappings: instrumentMappings.map(m => 
        m.id === id ? { ...m, ...updates } : m
      )
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel htmlFor="name">Server Name</FormLabel>
        <Input
          id="name"
          value={name}
          onChange={(e) => onChange({ 
            name: e.target.value, 
            address, 
            accountSize, 
            instrumentLotSizeConfigs 
          })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="address">Server Address</FormLabel>
        <Input
          id="address"
          value={address}
          onChange={(e) => onChange({ 
            name, 
            address: e.target.value, 
            accountSize, 
            instrumentLotSizeConfigs 
          })}
          isRequired
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="accountSize">Account Size</FormLabel>
        <Input
          id="accountSize"
          type="number"
          value={accountSize ?? ''}
          onChange={(e) => onChange({ 
            name, 
            address, 
            accountSize: e.target.value ? Number(e.target.value) : undefined,
            instrumentLotSizeConfigs 
          })}
          isRequired
        />
      </FormControl>

      <Button onClick={() => setIsMappingsOpen(!isMappingsOpen)} size="sm" variant="outline">
        {isMappingsOpen ? 'Hide' : 'Show'} Instrument Mappings
      </Button>

      <Collapse in={isMappingsOpen} animateOpacity>
        <Box pt={2}>
          <InstrumentMappingConfig
            instrumentMappings={instrumentMappings}
            onChange={(newMappings) => {
                onChange({
                    name,
                    address,
                    accountSize,
                    instrumentLotSizeConfigs,
                    instrumentMappings: newMappings
                  })
            }}
          />
        </Box>
      </Collapse>

      <Button onClick={() => setIsLotSizeOpen(!isLotSizeOpen)} size="sm" variant="outline">
        {isLotSizeOpen ? 'Hide' : 'Show'} Lot Size Settings
      </Button>

      <Collapse in={isLotSizeOpen} animateOpacity>
        <Box pt={2}>
          <InstrumentLotSizeConfig
            instrumentConfigs={instrumentLotSizeConfigs}
            onChange={(newConfigs) => onChange({
              name,
              address,
              accountSize,
              instrumentLotSizeConfigs: newConfigs
            })}
          />
        </Box>
      </Collapse>
    </VStack>
  );
};

export default MT4ServerSettings;
