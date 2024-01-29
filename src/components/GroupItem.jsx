import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { MdPeople } from 'react-icons/md';

import { useGroupContext } from '../context/GroupContext';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/group-img`;

function GroupItem({ group }) {
  const { id, groupName, groupImage, members, shares = [] } = group;

  const {
    selectedGroupId,
    setSelectedGroupId,
    setSelectedMemberId,
    setGroupAdmins,
  } = useGroupContext();

  return (
    <Flex
      width="200px"
      align="center"
      justify="space-between"
      fontWeight="300"
      fontSize="14"
    >
      <Image
        mr="4"
        ml="2"
        boxSize="12"
        src={`${imgUrl}/${groupImage}`}
        alt={`Group image of ${groupName}`}
      />

      <Flex flexDir="column" mr="auto">
        <Text>{groupName}</Text>
        <Flex align="center">
          <Box mr="2">
            <Flex alignItems="center">{shares.length}</Flex>
          </Box>
          |
          <Box ml="2">
            <Flex align="center">
              <MdPeople />
              {members.length}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default GroupItem;
