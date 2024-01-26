import { Center, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
function Feed() {
  return (
    <Center>
      <Flex maxWidth="1800">
        <Sidebar />
        <Flex flexDirection="column" minWidth="1200" alignItems="center">
          MAIN FEED
        </Flex>
        <Sidebar type="users" />
      </Flex>
    </Center>
  );
}

export default Feed;
