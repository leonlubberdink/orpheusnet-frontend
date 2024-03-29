import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Checkbox,
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
  useDisclosure,
} from '@chakra-ui/react';

import { useLogin } from '../hooks/useLogin';
import useAuth from '../hooks/useAuth';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import LogoDesignBy from '../components/LogoDesignBy';

function Login() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const userRef = useRef();

  const { login, isLoading } = useLogin();
  const { auth, persist, setPersist } = useAuth();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(function () {
    if (auth.user && auth.user?.emailVerified && persist)
      return navigate('/app/feed', { replace: true });
    userRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function () {
      localStorage.setItem('persist', persist);
    },
    [persist]
  );

  function togglePersist() {
    setPersist((prev) => !prev);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!userName || !password) return;

    login(
      { userName, password },
      {
        onSettled: () => {
          setUserName('');
          setPassword('');
        },
      }
    );
  }

  return (
    <>
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
        display="flex"
        flexDir="column"
        justifyContent="space-between"
      >
        <Center>
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
                Sign in to Orpheusnet
              </Heading>
            </VStack>

            <Card bg="brandGray.50" borderColor="brand.700" minW="24rem">
              <CardBody padding="8">
                <form onSubmit={handleLogin}>
                  <Stack spacing="8">
                    <FormControl>
                      <FormLabel
                        size="sm"
                        color="brandGray.900"
                        fontSize="1rem"
                        fontWeight="300"
                        bg="brandGray.50"
                      >
                        Username or email address
                      </FormLabel>
                      <Input
                        ref={userRef}
                        type="text"
                        borderColor="brand.200"
                        size="sm"
                        borderRadius="6px"
                        focusBorderColor="brand.600"
                        placeholder="Your username or e-mail..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <HStack justifyContent="space-between">
                        <FormLabel
                          size="sm"
                          color="brandGray.900"
                          fontSize="1rem"
                          fontWeight="300"
                          bg="brandGray.50"
                        >
                          Password
                        </FormLabel>
                        <Button
                          as="a"
                          href="#"
                          variant="link"
                          size="xs"
                          color="brand.600"
                          onClick={onOpen}
                        >
                          Forgot password?
                        </Button>
                      </HStack>
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
                    <Button
                      isLoading={isLoading}
                      loadingText="Logging you in..."
                      colorScheme="brand"
                      size="sm"
                      type="submit"
                    >
                      Login
                    </Button>
                    <Checkbox
                      colorScheme="brandOrange"
                      size="sm"
                      mt="-3"
                      onChange={togglePersist}
                      isChecked={persist}
                    >
                      <Text as="span" fontSize="12">
                        Remember me
                      </Text>
                    </Checkbox>
                  </Stack>
                </form>
              </CardBody>
            </Card>

            <Card bg="brandGray.50" borderColor="brandGray.500" minW="24rem">
              <CardBody>
                <HStack
                  fontSize="sm"
                  spacing="1"
                  gap="2"
                  justifyContent="center"
                >
                  <Text>Don‘t have an account?</Text>
                  <Link to="/signup">
                    <Text fontWeight="500" color="brandOrange.500">
                      Create an account.
                    </Text>
                  </Link>
                </HStack>
              </CardBody>
            </Card>
          </Stack>
        </Center>
        <LogoDesignBy />
      </Box>
      <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Login;
