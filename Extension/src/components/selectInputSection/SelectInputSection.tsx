import { Select, Text, } from "@chakra-ui/react";
import "./SelectInputSection.css";
import { FC } from "react";

export type SelectInputSectionProps = {
    label: string,
    defaultValue?: string,
    options: {key: string, value: string}[],
    onChangeFn: any
}

const SelectInputSection: FC<SelectInputSectionProps> = ({label, defaultValue, options, onChangeFn}) => {
    return (
        <div className="SelectInputWrapper">
            <Text colorScheme="orange" fontSize='xs' mb='6px'>{label}</Text>
            <Select colorScheme="orange" size='xs' onChange={(evt) => onChangeFn(evt.target.value)}>
                {options.map(({key, value}) => <option value={key} selected={key === defaultValue}>{value}</option>)}
            </Select>
        </div>
    );
};

export default SelectInputSection;