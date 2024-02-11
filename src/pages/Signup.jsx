import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Image,
  Heading,
  VStack,
  HStack,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useSignup } from '../hooks/useSignup';
import { useAuth } from '../hooks/useAuth';

function Signup() {
  const userRef = useRef();
  const { auth } = useAuth();
  const { signup, isLoading } = useSignup();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('user8');
  const [email, setEmail] = useState('user8@mail.com');
  const [password, setPassword] = useState('Test1234');
  const [passwordConfirm, setPasswordConfirm] = useState('Test1234');

  useEffect(
    function () {
      if (auth.user) return navigate('/app/feed', { replace: true });

      userRef.current.focus();
    },
    [auth, navigate]
  );

  function handleSignup(e) {
    e.preventDefault();
    if (!userName || !email || !password || !passwordConfirm) return;
    signup(
      { userName, email, password, passwordConfirm },
      {
        onSettled: () => {
          setUserName('');
          setEmail('');
          setPassword('');
          setPasswordConfirm('');
        },
      }
    );
  }

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
      <Center as="section">
        <Stack alignItems="center" spacing="8">
          <VStack as="header" spacing="6" mt="16">
            <Link to="/">
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
              Create your Orpheusnet account.
            </Heading>
          </VStack>

          <Card bg="brandGray.50" borderColor="brand.700" minW="24rem">
            <CardBody padding="8">
              <form onSubmit={handleSignup}>
                <Stack spacing="8">
                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="black"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                    >
                      Username
                    </FormLabel>
                    <Input
                      ref={userRef}
                      type="text"
                      borderColor="brand.200"
                      size="sm"
                      borderRadius="6px"
                      focusBorderColor="brand.600"
                      placeholder="Choose username..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="black"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                    >
                      E-mail address
                    </FormLabel>
                    <Input
                      type="text"
                      borderColor="brand.200"
                      size="sm"
                      borderRadius="6px"
                      focusBorderColor="brand.600"
                      placeholder="Your e-mail address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="black"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                    >
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      borderColor="brand.200"
                      size="sm"
                      borderRadius="6px"
                      focusBorderColor="brand.600"
                      placeholder="Your password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="black"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                    >
                      Confirm password
                    </FormLabel>
                    <Input
                      type="password"
                      borderColor="brand.200"
                      size="sm"
                      borderRadius="6px"
                      focusBorderColor="brand.600"
                      placeholder="Your password..."
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Button
                    isLoading={isLoading}
                    loadingText="Signing you up..."
                    colorScheme="brand"
                    size="sm"
                    type="submit"
                  >
                    Signup
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card bg="brandGray.50" borderColor="brandGray.500" minW="24rem">
            <CardBody>
              <HStack fontSize="sm" spacing="1" gap="2" justifyContent="center">
                <Text>Allready have an account?</Text>
                <Link to="/login">
                  <Text fontWeight="500" color="brandOrange.500">
                    Login.
                  </Text>
                </Link>
              </HStack>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}

export default Signup;
