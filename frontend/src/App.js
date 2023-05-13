import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './components/Navbar';
import AllRoutes from './Router/AllRoutes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <AllRoutes />
    </ChakraProvider>
  );
}

export default App;
