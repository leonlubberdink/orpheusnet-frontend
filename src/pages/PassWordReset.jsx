import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Image,
  Heading,
  VStack,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useResetPassword } from '../hooks/useResetPassword';

function PassWordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { resetToken = '' } = useParams();
  const passwordRef = useRef();
  const { resetPassword, isLoading } = useResetPassword(resetToken);
  const navigate = useNavigate();

  useEffect(function () {
    passwordRef.current.focus();
  }, []);

  function handlePasswordReset(e) {
    e.preventDefault();

    const formData = {
      password: newPassword,
      passwordConfirm: confirmNewPassword,
    };

    resetPassword(formData, {
      onSettled: () => {
        setNewPassword('');
        setConfirmNewPassword('');
      },
      onSuccess: () => {
        navigate('/login');
      },
    });
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
              Create a new password for your Orpheusnet account
            </Heading>
          </VStack>

          <Card bg="brandGray.50" borderColor="brand.700" minW="24rem">
            <CardBody padding="8">
              <form onSubmit={handlePasswordReset}>
                <Stack spacing="8">
                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="brandGray.900"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                    >
                      New password:
                    </FormLabel>
                    <Input
                      ref={passwordRef}
                      type="password"
                      borderColor="brand.200"
                      size="sm"
                      borderRadius="6px"
                      focusBorderColor="brand.600"
                      placeholder="Type your new password here..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      size="sm"
                      color="brandGray.900"
                      fontSize="1rem"
                      fontWeight="300"
                      bg="brandGray.50"
                    >
                      Confirm new password:
                    </FormLabel>
                    <Input
                      type="password"
                      borderColor="brand.200"
                      size="sm"
                      borderRadius="6px"
                      focusBorderColor="brand.600"
                      placeholder="Confirm new password here..."
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                    Save new password
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}

export default PassWordReset;
