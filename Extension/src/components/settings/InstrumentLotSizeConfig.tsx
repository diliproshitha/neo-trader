import React from 'react';
import {
  VStack,
  FormLabel,
  HStack,
  Checkbox,
  Input,
  Select,
  IconButton,
  Button,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { InstrumentLotSizeConfig as IInstrumentLotSizeConfig, InstrumentType } from '../../models/settings';

interface InstrumentLotSizeConfigProps {
  instrumentConfigs: IInstrumentLotSizeConfig[];
  onChange: (configs: IInstrumentLotSizeConfig[]) => void;
}

const InstrumentLotSizeConfig: React.FC<InstrumentLotSizeConfigProps> = ({
  instrumentConfigs = [],
  onChange,
}) => {
  const handleInstrumentChange = (index: number, updatedInstrument: Partial<IInstrumentLotSizeConfig>) => {
    const newInstruments = [...instrumentConfigs];
    newInstruments[index] = { ...newInstruments[index], ...updatedInstrument };
    onChange(newInstruments);
  };

  const addInstrument = () => {
    const newInstrument: IInstrumentLotSizeConfig = {
      id: crypto.randomUUID(),
      active: true,
      instrumentName: '',
      instrumentType: InstrumentType.Currency,
    };
    onChange([...instrumentConfigs, newInstrument]);
  };

  const deleteInstrument = (index: number) => {
    const newInstruments = instrumentConfigs.filter((_, i) => i !== index);
    onChange(newInstruments);
  };

  return (
    <Box mt={6}>
      <FormLabel>Instruments</FormLabel>
      <VStack spacing={2} align="stretch">
        {instrumentConfigs.map((instrument, index) => (
          <HStack key={instrument.id} spacing={4}>
            <Checkbox
              isChecked={instrument.active}
              onChange={(e) => handleInstrumentChange(index, { active: e.target.checked })}
            />
            <Tooltip label="Enter the instrument symbol (e.g., EURUSD, AAPL)">
              <Input
                placeholder="Instrument"
                value={instrument.instrumentName}
                onChange={(e) => handleInstrumentChange(index, { instrumentName: e.target.value })}
                width="200px"
              />
            </Tooltip>
            <Tooltip label="Select the type of financial instrument">
              <Select
                value={instrument.instrumentType}
                onChange={(e) => handleInstrumentChange(index, { instrumentType: e.target.value as InstrumentType })}
                width="150px"
              >
                <option value="Currency">Currency</option>
                <option value="Stock">Stock</option>
                <option value="Commodity">Commodity</option>
                <option value="Index">Index</option>
                <option value="Crypto">Crypto</option>
                <option value="CFD">CFD</option>
              </Select>
            </Tooltip>
            <Tooltip label="Enter the contract size. Applicable for Index and CFD">
              <Input
                type="number"
                value={instrument.contractSize || ''}
                onChange={(e) => handleInstrumentChange(index, { 
                  contractSize: e.target.value ? Number(e.target.value) : undefined 
                })}
                width="150px"
                placeholder="Contract size"
              />
            </Tooltip>
            <Tooltip label="Remove this instrument">
              <IconButton
                aria-label="Delete instrument"
                icon={<DeleteIcon />}
                onClick={() => deleteInstrument(index)}
                colorScheme="red"
                size="sm"
              />
            </Tooltip>
          </HStack>
        ))}
        <Button
          leftIcon={<AddIcon />}
          onClick={addInstrument}
          size="sm"
          alignSelf="flex-start"
        >
          Add Instrument
        </Button>
      </VStack>
    </Box>
  );
};

export default InstrumentLotSizeConfig; 