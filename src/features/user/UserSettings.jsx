import { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';

import { useGetMe } from '../../hooks/useGetMe';
import { useSettings } from '../../hooks/useSettings';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function UserSettings() {
  const { data, isLoading: isLoadingData } = useGetMe();
  const { updateMe, isLoading: isUpdatingData } = useSettings();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userName: data?.data.data.doc.userName || '',
    email: data?.data.data.doc.email || '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(
    function () {
      console.log(data?.data.data.doc);
    },
    [data]
  );

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

  function handleChange(e) {
    const { name, value } = e.target;

    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleChangeInfoToFeed(e) {
    e.preventDefault();
    updateMe();
    navigate('/app/feed');
  }

  function handleChangeInfo(e) {
    e.preventDefault();
    updateMe();
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
        <Heading mt="10" mb="10">
          Change your user info
        </Heading>

        {isLoadingData ? (
          <Spinner size="xl" color="brandOrange.500" />
        ) : (
          <Flex flexDir="row" gap="24">
            <FormControl>
              <VStack>
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
                    value={userInfo?.userName}
                    disabled
                  />
                </Flex>
                <Flex flexDir="row" mb="10">
                  <FormLabel
                    mt="1"
                    width="56"
                    sx={{ whiteSpace: 'nowrap' }}
                    htmlFor="email"
                  >
                    Email address:
                  </FormLabel>
                  <Input
                    focusBorderColor="brandOrange.300"
                    name="email"
                    id="email"
                    shadow="sm"
                    type="email"
                    size="sm"
                    value={userInfo?.email}
                    onChange={handleChange}
                  />
                </Flex>
                <Flex flexDir="row">
                  <FormLabel
                    htmlFor="pw"
                    mt="1"
                    width="56"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    New Password:
                  </FormLabel>
                  <Input
                    focusBorderColor="brandOrange.300"
                    name="password"
                    id="pw"
                    shadow="sm"
                    type="password"
                    size="sm"
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Flex>
                <Flex flexDir="row" gap="2" mt="10" alignSelf="flex-end">
                  <Button
                    colorScheme="brand"
                    variant="solid"
                    onClick={handleChangeInfo}
                  >
                    Save
                  </Button>
                  <Button
                    colorScheme="brandOrange"
                    variant="solid"
                    onClick={handleChangeInfoToFeed}
                  >
                    Save and back to feed
                  </Button>
                </Flex>
              </VStack>
            </FormControl>
            <Image
              borderRadius="full"
              boxSize="100"
              src={`${imgUrl}/${userInfo?.userImage}`}
              alt="Your user image"
              boxShadow="base"
            />
          </Flex>
        )}
      </VStack>
    </Center>
  );
}

export default UserSettings;
