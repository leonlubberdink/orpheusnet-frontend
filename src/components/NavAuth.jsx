import { Link } from 'react-router-dom';
import { Flex, Image, Icon, Text, IconButton } from '@chakra-ui/react';
import { HiCog8Tooth } from 'react-icons/hi2';
import { TbLogout } from 'react-icons/tb';

function NavAuth({ user }) {
  function handleLogout() {
    console.log('handleLogout');
  }
  return (
    <Flex as="nav" gap="8" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="12"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Text fontSize="28" fontWeight="400" color="brandGray.800">
        {user.userName}
      </Text>
      <Link to="user">
        <Flex alignItems="center">
          <Icon color="brandGray.900" fontSize="45" as={HiCog8Tooth} />
        </Flex>
      </Link>
      <IconButton
        colorScheme="buttonBlack"
        variant="link"
        aria-label="Log out"
        icon={<Icon fontSize="45" as={TbLogout} />}
      />
    </Flex>
  );
}

export default NavAuth;
