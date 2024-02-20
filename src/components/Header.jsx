import { Box, Divider, Flex, Image, Spacer } from '@chakra-ui/react';

import Navigation from './Navigation';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { auth } = useAuth();
  const invertValue = auth?.user && auth?.user?.emailVerified ? '1' : '.1';

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        color="brandGray.50"
        p="4"
        borderBottom={
          auth?.user && auth?.user?.emailVerified ? '1px solid' : ''
        }
        borderBottomColor="brandGray.200"
      >
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
      {auth?.user && auth?.user?.emailVerified && <Divider mb="4" />}
    </>
  );
}

export default Header;
