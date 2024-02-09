import { Link } from 'react-router-dom';
import { Flex, Image, Icon, Text, IconButton } from '@chakra-ui/react';
import { HiCog8Tooth } from 'react-icons/hi2';
import { TbLogout } from 'react-icons/tb';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function NavAuth({ user }) {
  function handleLogout() {
    console.log('handleLogout');
  }

  return (
    <Flex as="nav" gap="8" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="12"
        src={`${imgUrl}/${user.userImage}`}
        alt="Your user image"
        boxShadow="base"
      />
      <Text fontSize="28" fontWeight="400" color="brandGray.800">
        {user.userName}
      </Text>
      <Link to="user">
        <Flex alignItems="center">
          <IconButton
            title="User settings"
            aria-label="User settings"
            height="45px"
            width="45px"
            icon={<Icon fontSize="43" as={HiCog8Tooth} />}
            variant="unstyled"
            color="brandGray.800"
            _hover={{ color: 'brand.600' }}
          />
        </Flex>
      </Link>
      <IconButton
        aria-label="Log out"
        title="Log out"
        height="45px"
        width="45px"
        icon={<Icon fontSize="43" as={TbLogout} />}
        variant="unstyled"
        color="brandOrange.500"
        _hover={{ color: 'brandOrange.600' }}
      />
    </Flex>
  );
}

export default NavAuth;
