import { VStack, Box, StackDivider, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';

function Sidebar({ type = 'groups' }) {
  const { auth } = useAuth();
  const { _id: userId } = auth.user;
  const { isLoading: isLoadingGroups, data: groups } = useGroups(userId);
  const headerText = type === 'groups' ? 'Communities' : 'Members';

  let sideBarItems = [];

  if (type === 'groups') sideBarItems = groups || [];

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" minW="200" />}
      color="black"
    >
      <Text fontWeight="300" as="h3" fontSize="22">
        {headerText}
      </Text>
      {type === 'groups' && isLoadingGroups && <div>Loading...</div>}
      {type === 'groups' &&
        sideBarItems.map((group) => (
          <Box key={group._id}>{group.groupName}</Box>
        ))}
    </VStack>
  );
}

export default Sidebar;
