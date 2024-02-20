import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Spinner,
  Button,
  Image,
  Icon,
} from '@chakra-ui/react';
import { MdOutlineUploadFile } from 'react-icons/md';

import { useGetMe } from '../../hooks/useGetMe';
import { usePassword } from '../../hooks/usePassword';
import { useSettings } from '../../hooks/useSettings';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function UserSettings() {
  const { data, isLoading: isLoadingData } = useGetMe();
  const { updateMe, isLoading: isUpdatingData } = useSettings();
  const { updatePassword, isLoading: isUpdatingPassword } = usePassword();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userName: data?.data.data.doc.userName || '',
    email: data?.data.data.doc.email || '',
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
    userImage: '',
  });

  useEffect(
    function () {
      // Check if `data` exists before trying to update `userInfo`
      if (data?.data.data.doc) {
        setUserInfo({
          userName: data.data.data.doc.userName || '',
          email: data.data.data.doc.email || '',
          userImage: data.data.data.doc.userImage || '',
          password: '',
          passwordConfirm: '',
        });
      }
    },
    [data]
  );

  function handleStateChange(e) {
    const { name, value } = e.target;

    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleUpdatePassword(e) {
    e.preventDefault();

    if (
      userInfo.password === '' ||
      userInfo.passwordConfirm === '' ||
      userInfo.passwordCurrent === ''
    )
      return;

    updatePassword({
      passwordCurrent: userInfo.passwordCurrent,
      password: userInfo.password,
      passwordConfirm: userInfo.passwordConfirm,
    });
  }

  function handleUpdateMail(e) {
    e.preventDefault();
    if (userInfo.email === '') return;
    updateMe({ email: userInfo.email });
  }

  return (
    <Center width="100%">
      <VStack
        width="1200px"
        alignItems="flex-start"
        backgroundColor="brandGray.10"
        p="50"
        mt="-4"
        height="2000"
        shadow="base"
      >
        <Button colorScheme="brandGray" variant="solid" mr="auto" mb="5">
          &#8592; Back to feed
        </Button>
        <Heading as="h3" mt="5" mb="4" size="md">
          Account info:
        </Heading>

        {isLoadingData ? (
          <Spinner size="xl" color="brandOrange.500" />
        ) : (
          <Flex flexDir="row" gap="20">
            <FormControl>
              <VStack alignItems="flex-start" width="400px">
                <Flex flexDir="row" alignItems="center">
                  <FormLabel
                    htmlFor="userName"
                    mt="1"
                    width="56"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Username:
                  </FormLabel>
                  <Input
                    focusBorderColor="brandOrange.300"
                    id="userName"
                    shadow="sm"
                    type="text"
                    size="sm"
                    defaultValue={userInfo?.userName}
                    onChange={handleStateChange}
                    disabled
                  />
                </Flex>
                <Flex flexDir="row" alignItems="center">
                  <FormLabel
                    mt="1"
                    width="56"
                    sx={{ whiteSpace: 'nowrap' }}
                    htmlFor="email"
                  >
                    E-mail address:
                  </FormLabel>
                  <Input
                    focusBorderColor="brandOrange.300"
                    name="email"
                    id="email"
                    shadow="sm"
                    type="email"
                    size="sm"
                    value={userInfo?.email}
                    onChange={handleStateChange}
                    isDisabled={isUpdatingData}
                  />
                </Flex>
                <Button
                  colorScheme="brand"
                  variant="solid"
                  mt="2"
                  onClick={handleUpdateMail}
                  isDisabled={isUpdatingPassword}
                >
                  Save
                </Button>
                <Flex flexDir="column" mt="6">
                  <Heading as="h3" mt="5" mb="6" size="md">
                    Change your password:
                  </Heading>
                  <Flex flexDir="row">
                    <FormLabel
                      htmlFor="pwCur"
                      mt="1"
                      width="56"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Current password:
                    </FormLabel>
                    <Input
                      focusBorderColor="brandOrange.300"
                      name="passwordCurrent"
                      id="pwCur"
                      shadow="sm"
                      type="password"
                      size="sm"
                      onChange={handleStateChange}
                    />
                  </Flex>
                  <Flex flexDir="row">
                    <FormLabel
                      htmlFor="pw"
                      mt="1"
                      width="56"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      New password:
                    </FormLabel>
                    <Input
                      focusBorderColor="brandOrange.300"
                      name="password"
                      id="pw"
                      shadow="sm"
                      type="password"
                      size="sm"
                      onChange={handleStateChange}
                    />
                  </Flex>
                  <Flex flexDir="row">
                    <FormLabel
                      htmlFor="pwConfirm"
                      mt="1"
                      width="56"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Password confirm:
                    </FormLabel>
                    <Input
                      focusBorderColor="brandOrange.300"
                      name="passwordConfirm"
                      id="pwConfirm"
                      shadow="sm"
                      type="password"
                      size="sm"
                      onChange={handleStateChange}
                    />
                  </Flex>
                </Flex>
                <Button
                  colorScheme="brand"
                  variant="solid"
                  mt="2"
                  isDisabled={isUpdatingPassword}
                  onClick={handleUpdatePassword}
                >
                  Save
                </Button>
              </VStack>
            </FormControl>

            {isLoadingData ? (
              <Spinner size="xl" />
            ) : (
              <Flex alignSelf="flex-start" flexDir="row">
                <Flex flexDir="column" gap="2" alignItems="center">
                  <Image
                    borderRadius="full"
                    boxSize="100"
                    src={`${imgUrl}/${userInfo?.userImage || 'default.jpg'}`}
                    alt="Your user image"
                    boxShadow="base"
                  />
                  <Button
                    size="xs"
                    leftIcon={<Icon as={MdOutlineUploadFile} />}
                    colorScheme="brandGray"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Image
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        )}
      </VStack>
    </Center>
  );
}

export default UserSettings;
