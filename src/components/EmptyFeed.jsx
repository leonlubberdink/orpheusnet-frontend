import { VStack, Text, Heading } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

function EmptyFeed() {
  const {
    auth: {
      user: { userName },
    },
  } = useAuth();

  console.log(userName);

  return (
    <VStack>
      <Heading as="h2">Welcome {userName}!</Heading>

      <Text as="p" alignSelf="left">
        To start sharing music with your friends, first create a community with
        the &ldquo;Create community&ldquo; button on your left.
      </Text>
      <Text as="p" alignSelf="left">
        After you created your first cummunity, you can invite some with the
        &ldquo;Invite member&ldquo; button on your right.
      </Text>
    </VStack>
  );
}

export default EmptyFeed;
