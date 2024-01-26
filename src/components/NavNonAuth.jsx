import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NavNonAuth() {
  return (
    <Flex as="nav" gap="8" alignItems=" center">
      <Link to="/about">
        <Button size="lg" colorScheme="buttonGray" variant="link" fontSize="28">
          About us
        </Button>
      </Link>
      <Link to="/login">
        <Button size="lg" colorScheme="buttonGray" variant="link" fontSize="28">
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          size="lg"
          colorScheme="buttonOrange"
          variant="outline"
          fontSize="28"
        >
          Signup
        </Button>
      </Link>
    </Flex>
  );
}

export default NavNonAuth;
