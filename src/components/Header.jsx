import { Box, Divider, Flex, Image, Spacer } from '@chakra-ui/react';

import Navigation from '../pages/Navigation';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { auth } = useAuth();
  const invertValue = auth?.user ? '1' : '.1';
  return (
    <>
      <Flex as="header" alignItems="center" color="brandGray.50" p="4">
        <Box>
          <Image
            src="/public/img/logo-header.png"
            alt="Orpheusnet Logo"
            height="50px"
            style={{ filter: `invert(${invertValue})` }}
          />
        </Box>
        <Spacer />
        <Navigation />
      </Flex>
      {auth?.user && <Divider mb="4" />}
    </>
  );
}

export default Header;
