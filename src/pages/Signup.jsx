import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineUploadFile } from 'react-icons/md';
import {
  Box,
  Button,
  Center,
  Icon,
  Flex,
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
import useAuth from '../hooks/useAuth';

function Signup() {
  const navigate = useNavigate();
  const { groupId = '' } = useParams(); // Destructure groupId from useParams
  const userRef = useRef();
  const fileInputRef = useRef(null);

  const { auth } = useAuth();
  const { signup, isLoading } = useSignup();

  const [userName, setUserName] = useState('user8');
  const [email, setEmail] = useState('user8@mail.com');
  const [password, setPassword] = useState('Test1234');
  const [passwordConfirm, setPasswordConfirm] = useState('Test1234');
  const [imageName, setImageName] = useState('');
  const [userImage, setUserImage] = useState(undefined);
  const [groupToSignupFor, setGroupToSignupFor] = useState('');

  useEffect(
    function () {
      if (auth?.user?.emailVerified)
        return navigate('/app/feed', { replace: true });

      userRef.current.focus();
    },
    [auth, navigate]
  );

  useEffect(() => {
    setGroupToSignupFor(groupId);
  }, [groupId]);

  function handleSignup(e) {
    e.preventDefault();
    if (!userName || !email || !password || !passwordConfirm) return;
    signup(
      {
        userName,
        email,
        password,
        passwordConfirm,
        userImage,
        groupToSignupFor,
      },
      {
        onSettled: () => {
          setUserName('');
          setEmail('');
          setPassword('');
          setPasswordConfirm('');
          setImageName('');
          setUserImage(undefined);
        },
      }
    );
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImageName(file.name);
    setUserImage(file);
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

          <Card
            bg="brandGray.50"
            borderColor="brand.700"
            minW="24rem"
            maxW="24rem"
          >
            <CardBody padding="8">
              <form onSubmit={handleSignup}>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="black"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                      mb="1"
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
                      mb="1"
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
                      mb="1"
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
                      mb="1"
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

                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="black"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                      mb="1"
                    >
                      User image (optional)
                    </FormLabel>
                    <Input
                      style={{ display: 'none' }}
                      type="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <Flex flexDir="row" gap="2" alignItems="center">
                      <Button
                        size="sm"
                        leftIcon={<Icon as={MdOutlineUploadFile} />}
                        colorScheme="brandGray"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Upload Image
                      </Button>
                      <Text color="brandGray.500" fontSize="12">
                        ...{imageName?.slice(-25)}
                      </Text>
                    </Flex>
                  </FormControl>

                  <Button
                    isLoading={isLoading}
                    // isLoading={isLoading}
                    loadingText="Submitting"
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
