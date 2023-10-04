import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Divider,
} from "@chakra-ui/react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import MainContentPanel from "./components/mainContentPanel/MainContentPanel"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" width={'400px'} height='auto'>
      <Grid p={3}>
        <VStack spacing={2}>
          <Header />
          <Divider />
          <MainContentPanel />
          <Divider mt='10px' />
          <Footer />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
