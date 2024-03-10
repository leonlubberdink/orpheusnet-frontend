import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import useAuth from '../hooks/useAuth';
import { useGroupContext } from '../context/GroupContext';

import Header from '../components/Header';
import LogoDesignBy from '../components/LogoDesignBy';

function AppLayout() {
  const { groupId = '' } = useParams();
  const { setSelectedGroupId } = useGroupContext();
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

  useEffect(
    function () {
      setSelectedGroupId(groupId);
    },
    [setSelectedGroupId, groupId]
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
      <LogoDesignBy variant="dark" />
    </Flex>
  );
}

export default AppLayout;
