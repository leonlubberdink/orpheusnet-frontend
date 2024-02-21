import { useEffect } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Image,
  Heading,
  VStack,
  Stack,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import useAuth from '../hooks/useAuth';

function IsConfirmed() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(
    function () {
      auth?.user?.emailVerified && navigate('/');
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
            <ReactRouterLink to="/login">
              <Image
                src="/public/img/logo-header.png"
                alt="Orpheusnet Logo"
                height="70px"
                style={{ filter: 'invert(.9)' }}
              />
            </ReactRouterLink>
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="24px"
              color="brandGray.50"
            >
              Your account has been successfully confirmed. You can now log in
              to begin sharing music!
            </Heading>
            <ChakraLink as={ReactRouterLink} to="/login">
              <Button
                size="lg"
                colorScheme="buttonOrange"
                rightIcon={<ArrowForwardIcon />}
              >
                To login
              </Button>
            </ChakraLink>
          </VStack>
        </Stack>
      </Center>
    </Box>
  );
}

export default IsConfirmed;
