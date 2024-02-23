import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import { useGroupContext } from '../context/GroupContext';

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
    </Flex>
  );
}

export default AppLayout;
