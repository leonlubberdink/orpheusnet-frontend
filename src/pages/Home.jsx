import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

function Home() {
  const navigate = useNavigate();
  const {
    auth: { user },
  } = useAuth();

  useEffect(
    function () {
      user?.emailVerified && navigate(`/app/feed/${user.groups[0]}`);
    },
    [user, navigate]
  );

  return (
    <Flex
      position="relative"
      direction="column"
      as="main"
      minH="100vh"
      width="100vw"
      maxWidth="100%"
      bgImage="url('/public/img/home-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      left={0}
      right={0}
    >
      <Header />
    </Flex>
  );
}

export default Home;
