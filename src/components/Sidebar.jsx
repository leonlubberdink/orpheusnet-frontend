import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Box, Flex, VStack, Text, Link, Spinner } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { useGroup } from '../hooks/useGroup';

import { useGroupContext } from '../context/GroupContext';

import GroupItem from './GroupItem';
import UserItem from './UserItem';

const scrollBarStyle = {
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { width: '6px' },
  '&::-webkit-scrollbar-thumb': {
    background: 'brandGray.400',
    borderRadius: '24px',
  },
};

function Sidebar({ type = 'groups' }) {
  const { auth } = useAuth();
  const { _id: userId } = auth.user;
  const {
    selectedGroupId,
    setSelectedGroupId,
    selectedMemberId,
    setSelectedMemberId,
  } = useGroupContext();
  const { isLoading: isLoadingGroups, data: groups } = useGroups(userId);
  const { isLoading: isLoadingGroup, data: group } = useGroup(selectedGroupId);
  const [searchParams, setSearchParams] = useSearchParams();

  const headerText = useMemo(() => {
    return type === 'groups' ? 'Communities' : 'Members';
  }, [type]);

  const isLoading = useMemo(() => {
    return type === 'groups' ? isLoadingGroups : isLoadingGroup;
  }, [type, isLoadingGroups, isLoadingGroup]);

  const sideBarItems = useMemo(() => {
    return type === 'groups' ? groups || [] : group?.members || [];
  }, [type, groups, group?.members]);

  function handleSelectGroup(id) {
    selectedGroupId === id ? setSelectedGroupId('') : setSelectedGroupId(id);
  }

  function handleSelectUser(id) {
    if (selectedMemberId === id) {
      setSelectedMemberId('');
      searchParams.delete('user');
      setSearchParams(searchParams);
    }

    if (selectedMemberId !== id) {
      setSelectedMemberId(id);
      searchParams.set('user', id);
      setSearchParams(searchParams);
    }
  }

  const ItemComponent = type === 'groups' ? GroupItem : UserItem;

  const sidebarStyle = isLoading ? {} : scrollBarStyle;

  return (
    <VStack color="black" gap="0" width="200px">
      <Box borderBottom="solid 2px" w="100%" borderBottomColor="brandGray.200">
        <Text fontWeight="400" as="h3" fontSize="22" align="center">
          {headerText}
        </Text>
      </Box>
      <VStack
        gap="0"
        maxHeight="80vh"
        overflowY={isLoading ? 'none' : 'auto'}
        sx={sidebarStyle}
      >
        {isLoading && (
          <Flex>
            <Spinner size="lg" color="brandOrange.500" mt="2" mb="2" />
          </Flex>
        )}
        {!isLoading &&
          sideBarItems.map((item) => (
            <Box
              key={item._id}
              bg={
                type === 'groups'
                  ? selectedGroupId === item._id
                    ? 'brandGray.100'
                    : 'brandGray.0'
                  : selectedMemberId === item._id
                  ? 'brandGray.100'
                  : 'brandGray.0'
              }
              borderBottom="solid 1px"
              w="100%"
              borderBottomColor="brandGray.200"
              fontWeight="500"
            >
              <Link
                as={type === 'groups' ? NavLink : undefined}
                variant="unstyled"
                _last={{ marginBottom: 2 }}
                _hover={{ textDecoration: 'none' }}
                onClick={() =>
                  type === 'groups'
                    ? handleSelectGroup(item._id)
                    : handleSelectUser(item._id)
                }
                to={type === 'groups' ? `/app/feed/${item._id}` : undefined}
              >
                {type === 'groups' ? (
                  <ItemComponent group={item} />
                ) : (
                  <ItemComponent user={item} group={group} />
                )}
              </Link>
            </Box>
          ))}
      </VStack>
    </VStack>
  );
}

export default Sidebar;
