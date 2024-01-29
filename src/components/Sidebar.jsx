import { useParams } from 'react-router-dom';
import { VStack, Box, StackDivider, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';

function Sidebar({ type = 'groups' }) {
  const { groupId } = useParams();
  const { auth } = useAuth();

  const { _id: userId } = auth.user;
  const { data: groups, isLoading: isLoadingGroups } = useGroups(userId);

  console.log(userId, groups);

  const headerText = type === 'groups' ? 'Communities' : 'Members';

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" minW="200" />}
      color="black"
    >
      <Text fontWeight="300" as="h3" fontSize="22">
        {headerText}
      </Text>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
    </VStack>
  );
}

export default Sidebar;
