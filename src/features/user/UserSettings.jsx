import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Button,
  Image,
  Icon,
} from '@chakra-ui/react';
import { MdOutlineUploadFile } from 'react-icons/md';

import { usePassword } from '../../hooks/usePassword';
import { useSettings } from '../../hooks/useSettings';
import { useImage } from '../../hooks/useImage';
import { useDeleteMe } from '../../hooks/useDeleteMe';

import { useUserContext } from '../../context/UserContext';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function UserSettings() {
  const { updateMe, isLoading: isUpdatingData } = useSettings();
  const { updatePassword, isLoading: isUpdatingPassword } = usePassword();
  const { updateImage, isLoading: isUploadingImage } = useImage();
  const { deleteMe, isLoading: isDeleting } = useDeleteMe();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useUserContext();

  function handleStateChange(e) {
    const { name, value } = e.target;

    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleBackToFeed() {
    navigate(-1);
  }

  function handleUpdateMail(e) {
    e.preventDefault();
    if (userInfo.email === '') return;
    updateMe({ email: userInfo.email });
  }

  function handleUpdateImage(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

  function handleUploadImage(e) {
    const imgFile = e.target.files[0];
    if (!imgFile) return;

    updateImage(imgFile);
    e.target.value = '';
  }

  function handleUpdatePassword(e) {
    e.preventDefault();

    if (
      userInfo.password === '' ||
      userInfo.passwordConfirm === '' ||
      userInfo.passwordCurrent === ''
    )
      return;

    updatePassword(
      {
        passwordCurrent: userInfo.passwordCurrent,
        password: userInfo.password,
        passwordConfirm: userInfo.passwordConfirm,
      },
      {
        onSettled: () => {
          setUserInfo((prevState) => ({
            ...prevState,
            passwordCurrent: '',
            password: '',
            passwordConfirm: '',
          }));
        },
      }
    );
  }

  function handleDeleteAccount() {
    deleteMe();
  }

  return (
    <Center width="100%">
      <VStack
        width="1200px"
        alignItems="center"
        backgroundColor="brandGray.10"
        p="50"
        mt="-4"
        height="2000"
        shadow="base"
      >
        <Flex flexDir="row" gap="20">
          <FormControl>
            <VStack alignItems="flex-start" width="400px">
              <Button
                colorScheme="brandGray"
                variant="solid"
                mr="auto"
                mb="5"
                onClick={handleBackToFeed}
              >
                &#8592; Back to feed
              </Button>
              <Heading as="h3" mt="5" mb="4" size="md">
                Account info:
              </Heading>
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
                  defaultValue={userInfo?.userName || ''}
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
                  value={userInfo?.email || ''}
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
                    isDisabled={isUpdatingPassword}
                    value={userInfo.passwordCurrent || ''}
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
                    isDisabled={isUpdatingPassword}
                    value={userInfo.password || ''}
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
                    isDisabled={isUpdatingPassword}
                    value={userInfo.passwordConfirm || ''}
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
              <Button
                colorScheme="red"
                variant="solid"
                mt="12"
                isDisabled={isDeleting}
                onClick={handleDeleteAccount}
              >
                Delete my account
              </Button>
            </VStack>
          </FormControl>
          <Flex alignSelf="flex-start" flexDir="row" mt="95">
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
                onClick={handleUpdateImage}
                isDisabled={isUploadingImage}
              >
                Change Image
              </Button>
              <Input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleUploadImage}
              />
            </Flex>
          </Flex>
        </Flex>
      </VStack>
    </Center>
  );
}

export default UserSettings;
