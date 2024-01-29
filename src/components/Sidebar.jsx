import { useNavigate } from 'react-router-dom';
import { VStack, StackDivider, Text } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import GroupItem from './GroupItem';
import { useEffect } from 'react';

function Sidebar({ type = 'groups' }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { _id: userId } = auth.user;
  const {
    isLoading: isLoadingGroups,
    data: groups,
    isError,
  } = useGroups(userId);
  const headerText = type === 'groups' ? 'Communities' : 'Members';

  let sideBarItems = [];

  if (type === 'groups') sideBarItems = groups || [];

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" minW="200" />}
      color="black"
    >
      <Text fontWeight="400" as="h3" fontSize="22">
        {headerText}
      </Text>
      {type === 'groups' && isLoadingGroups && <div>Loading...</div>}
      {type === 'groups' &&
        sideBarItems.map((group) => (
          <GroupItem group={group} key={group._id} />
        ))}
    </VStack>
  );
}

export default Sidebar;
