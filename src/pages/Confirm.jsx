import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Center, Image, Heading, VStack, Stack } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';

function Confirm() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(
    function () {
      auth?.user?.emailVerified && navigate('/app/feed/');
    },
    [auth, navigate]
  );

  return (
    <Box
      bgImage="url('/public/img/home-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      left={0}
      right={0}
      minH="100vh"
      width="100vw"
      maxWidth="100%"
    >
      <Center>
        <Stack alignItems="center" spacing="8">
          <VStack as="header" spacing="6" mt="16">
            <Link to={auth?.user?.emailVerified ? '/app/feed' : '/'}>
              <Image
                src="/public/img/logo-header.png"
                alt="Orpheusnet Logo"
                height="70px"
                style={{ filter: 'invert(.9)' }}
              />
            </Link>
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="24px"
              color="brandGray.50"
            >
              To complete your account setup, please click on the verification
              link we&lsquo;ve just emailed to you.
            </Heading>
          </VStack>
        </Stack>
      </Center>
    </Box>
  );
}

export default Confirm;
