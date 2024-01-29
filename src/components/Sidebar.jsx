import { NavLink } from 'react-router-dom';
import { VStack, StackDivider, Text, Link } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { useGroupContext } from '../context/GroupContext';

import GroupItem from './GroupItem';

function Sidebar({ type = 'groups' }) {
  const { auth } = useAuth();
  const { _id: userId } = auth.user;
  const { isLoading: isLoadingGroups, data: groups } = useGroups(userId);
  const headerText = type === 'groups' ? 'Communities' : 'Members';
  const {
    selectedGroupId,
    setSelectedGroupId,
    setSelectedMemberId,
    setGroupAdmins,
  } = useGroupContext();

  let sideBarItems = [];

  if (type === 'groups') sideBarItems = groups || [];

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" minW="200" />}
      color="black"
    >
      <Text fontWeight="400" as="h3" fontSize="22" mb="0">
        {headerText}
      </Text>
      <VStack divider={<StackDivider borderColor="gray.200" minW="200" />}>
        {type === 'groups' && isLoadingGroups && <div>Loading...</div>}
        {type === 'groups' &&
          sideBarItems.map((group) => (
            <Link
              as={NavLink}
              key={group._id}
              variant="unstyled"
              _last={{ marginBottom: 2 }}
              _hover={{ textDecoration: 'none' }}
            >
              <GroupItem group={group} />
            </Link>
          ))}
      </VStack>
    </VStack>
  );
}

export default Sidebar;
