import { Box, Flex } from '@chakra-ui/react';

import Sidebar from '../../components/Sidebar';
import SearchShareComponent from './SearchShareComponent';
import Shares from './Shares';

function Feed() {
  return (
    <Flex flexGrow="1" justify="center" overflow="hidden">
      <Flex flexGrow="1" maxWidth="1400px" width="100%">
        <Sidebar />
        <Flex
          flexDirection="column"
          flexGrow="1"
          alignItems="center"
          bgColor="brandGray.10"
          ml="2"
          mr="2"
        >
          <Box flexGrow="1" width="100%" maxHeight="100%">
            <SearchShareComponent />
            <Shares />
          </Box>
        </Flex>
        <Sidebar type="users" />
      </Flex>
    </Flex>
  );
}

export default Feed;
