import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

function AppLayout() {
  const navigate = useNavigate();
  const {
    auth: {
      user: { emailVerified },
    },
  } = useAuth();

  useEffect(
    function () {
      !emailVerified && navigate('/confirm');
    },
    [emailVerified, navigate]
  );

  return (
    <Flex
      as="main"
      flexDir="column"
      minHeight="100vh"
      maxHeight="100vh"
      width="100vw"
      overflow="hidden"
    >
      <Header />
      <Outlet />
    </Flex>
  );
}

export default AppLayout;
