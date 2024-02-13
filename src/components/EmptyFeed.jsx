import { VStack, Stack, Text, Heading } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

function EmptyFeed() {
  const {
    auth: {
      user: { userName },
    },
  } = useAuth();

  return (
    <VStack>
      <Heading as="h2" mb="4" mr="auto">
        Welcome to your account,{' '}
        <Text as="span" color="brand.500">
          {userName}
        </Text>
        !
      </Heading>
      <Stack spacing={3}>
        <Text as="p" alignSelf="left" align="left">
          To begin sharing music with your friends, first start a community by
          clicking the{' '}
          <Text as="span" color="brandOrange.500">
            Create community
          </Text>{' '}
          button located on your left.
        </Text>
        <Text as="p" alignSelf="left">
          Once you&lsquo;ve set up your initial community, you can invite others
          by using the{' '}
          <Text as="span" color="brandOrange.500">
            Invite member
          </Text>{' '}
          button on your right.
        </Text>
      </Stack>
    </VStack>
  );
}

export default EmptyFeed;
