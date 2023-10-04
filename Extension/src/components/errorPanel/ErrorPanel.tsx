import { Alert, AlertIcon, AlertTitle, AlertDescription, Code } from "@chakra-ui/react";
import { FC } from "react";

export type ErrorPanelProps = {
    errorMessage: string
}

const ErrorPanel: FC<ErrorPanelProps> = ({errorMessage}) => {
    return <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='md'>
            Something went wrong!
            </AlertTitle>
            <AlertDescription maxWidth='xs' fontSize='sm'>
            <Code width='100%'>{errorMessage}</Code>
            </AlertDescription>
        </Alert>
};

export default ErrorPanel;