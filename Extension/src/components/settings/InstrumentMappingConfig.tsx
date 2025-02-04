import React from 'react';
import {
  VStack,
  HStack,
  Input,
  IconButton,
  Button,
  Checkbox,
  Box,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { InstrumentMapping } from '../../models/settings';

interface InstrumentMappingConfigProps {
  instrumentMappings: InstrumentMapping[];
  onChange: (mappings: InstrumentMapping[]) => void;
}

const InstrumentMappingConfig: React.FC<InstrumentMappingConfigProps> = ({
  instrumentMappings = [],
  onChange,
}) => {
  const addMapping = () => {
    const newMapping: InstrumentMapping = {
      id: crypto.randomUUID(),
      active: true,
      tradingviewSymbol: '',
      terminalSymbol: '',
      priceCorrection: 0,
    };
    onChange([...instrumentMappings, newMapping]);
  };

  const deleteMapping = (id: string) => {
    onChange(instrumentMappings.filter(m => m.id !== id));
  };

  const updateMapping = (id: string, updates: Partial<InstrumentMapping>) => {
    onChange(instrumentMappings.map(m => 
      m.id === id ? { ...m, ...updates } : m
    ));
  };

  return (
    <Box>
      <VStack spacing={2} align="stretch">
        {instrumentMappings.map((mapping) => (
          <HStack key={mapping.id} spacing={4}>
            <Checkbox
              isChecked={mapping.active}
              onChange={(e) => updateMapping(mapping.id, { active: e.target.checked })}
            />
            <Tooltip label="TradingView Symbol">
              <Input
                placeholder="TradingView Symbol"
                value={mapping.tradingviewSymbol}
                onChange={(e) => updateMapping(mapping.id, { tradingviewSymbol: e.target.value })}
                width="200px"
              />
            </Tooltip>
            <Tooltip label="Trading terminal symbol">
              <Input
                placeholder="Terminal Symbol"
                value={mapping.terminalSymbol}
                onChange={(e) => updateMapping(mapping.id, { terminalSymbol: e.target.value })}
                width="200px"
              />
            </Tooltip>
            <Tooltip label="Price correction. If the price in TradingView is different from the price in the terminal, enter the difference here. So when you submit an order, the price will be corrected by this amount.">
              <Input
                placeholder="Price Correction"
                type="number"
                value={mapping.priceCorrection !== undefined ? mapping.priceCorrection : ''}
                onChange={(e) => {
                  updateMapping(mapping.id, { 
                    priceCorrection: e.target.value === '' ? 0 : Number(e.target.value)
                  })
                }}
                width="150px"
              />
            </Tooltip>
            <IconButton
              aria-label="Delete mapping"
              icon={<DeleteIcon />}
              onClick={() => deleteMapping(mapping.id)}
              colorScheme="red"
              size="sm"
            />
          </HStack>
        ))}
        <Button
          leftIcon={<AddIcon />}
          onClick={addMapping}
          size="sm"
          alignSelf="flex-start"
        >
          Add Mapping
        </Button>
      </VStack>
    </Box>
  );
};

export default InstrumentMappingConfig; 