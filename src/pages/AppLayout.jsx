import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Header from '../components/Header';

function AppLayout() {
  return (
    <Flex as="main" flexDir="column" minHeight="100vh" width="100vw">
      <Header />
      <Outlet />
    </Flex>
  );
}

export default AppLayout;
