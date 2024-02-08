import { Center, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import SearchShareComponent from '../../components/SearchShareComponent';
function Feed() {
  return (
    <Center>
      <Flex flexGrow="1" maxWidth="1400px">
        <Sidebar />
        <Flex flexDirection="column" flexGrow="1" alignItems="center">
          <SearchShareComponent />
        </Flex>
        <Sidebar type="users" />
      </Flex>
    </Center>
  );
}

export default Feed;
