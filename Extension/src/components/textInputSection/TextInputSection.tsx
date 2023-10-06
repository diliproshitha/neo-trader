import { Text, Input } from "@chakra-ui/react";
import "./TextInputSection.css";
import { useEffect, useState, FC } from "react";

export type TextInputSectionProps = {
    label: string,
    inputValue: string,
    inputOnChangeFn: any
}

const TextInputSection: FC<TextInputSectionProps> = ({label, inputValue, inputOnChangeFn}) => {
    return (
        <div className="TextInputWrapper">
            <Text colorScheme="orange" fontSize='xs' mb='6px'>{label}</Text>
            <Input
                colorScheme="orange"
                value={inputValue}
                onChange={(evt) => inputOnChangeFn(evt.target.value)}
                size='xs' />
        </div>
    );
};

export default TextInputSection;