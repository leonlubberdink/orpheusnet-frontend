import { NavLink } from 'react-router-dom';
import { Box, VStack, Text, Link } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { useGroup } from '../hooks/useGroup';
import { useGroupContext } from '../context/GroupContext';

import GroupItem from './GroupItem';
import { useEffect } from 'react';
import UserItem from './UserItem';

function Sidebar({ type = 'groups' }) {
  const { auth } = useAuth();
  const { _id: userId } = auth.user;
  const { isLoading: isLoadingGroups, data: groups } = useGroups(userId);
  const { selectedGroupId, setSelectedGroupId } = useGroupContext();
  const { isLoading: isLoadingGroup, data: group } = useGroup(selectedGroupId);

  useEffect(
    function () {
      console.log(group);
    },
    [group]
  );

  const headerText = type === 'groups' ? 'Communities' : 'Members';

  let sideBarItems = [];

  if (type === 'groups') sideBarItems = groups || [];
  if (type === 'users') sideBarItems = group?.members || [];

  function handleSelectGroup(id) {
    selectedGroupId === id ? setSelectedGroupId('') : setSelectedGroupId(id);
  }

  return (
    <VStack color="black" gap="0">
      <Box borderBottom="solid 2px" w="100%" borderBottomColor="brandGray.200">
        <Text fontWeight="400" as="h3" fontSize="22" align="center">
          {headerText}
        </Text>
      </Box>
      <VStack
        gap="0"
        maxHeight="80vh"
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px', // Adjust the width of the scrollbar here
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'brandGray.400',
            borderRadius: '24px',
          },
        }}
      >
        {type === 'groups' && isLoadingGroups && <div>Loading...</div>}
        {type === 'users' && isLoadingGroups && <div>Loading...</div>}
        {type === 'groups' &&
          sideBarItems.map((group) => (
            <Box
              key={group._id}
              bg={
                selectedGroupId === group._id ? 'brandGray.100' : 'brandGray.0'
              }
              borderBottom="solid 1px"
              w="100%"
              borderBottomColor="brandGray.200"
              fontWeight="500"
            >
              <Link
                as={NavLink}
                variant="unstyled"
                _last={{ marginBottom: 2 }}
                _hover={{ textDecoration: 'none' }}
                onClick={() => handleSelectGroup(group._id)}
                to={`/app/feed/${group._id}`}
              >
                <GroupItem group={group} />
              </Link>
            </Box>
          ))}
        {type === 'users' &&
          sideBarItems.map((member) => (
            <Box
              key={member._id}
              // bg={
              //   selectedGroupId === group._id ? 'brandGray.100' : 'brandGray.0'
              // }
              borderBottom="solid 1px"
              w="100%"
              borderBottomColor="brandGray.200"
              fontWeight="500"
            >
              <Link
                as={NavLink}
                variant="unstyled"
                _last={{ marginBottom: 2 }}
                _hover={{ textDecoration: 'none' }}
                // onClick={() => handleSelectGroup(group._id)}
                // to={`/app/feed/${group._id}`}
              >
                <UserItem user={member} />
              </Link>
            </Box>
          ))}
      </VStack>
    </VStack>
  );
}

export default Sidebar;
