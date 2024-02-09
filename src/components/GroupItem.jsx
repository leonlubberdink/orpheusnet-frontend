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
  const { selectedGroupId } = useGroupContext();

  return (
    <Flex
      width="200px"
      align="center"
      justify="space-between"
      fontWeight={selectedGroupId === id ? '400' : '300'}
      fontSize="14"
      letterSpacing={selectedGroupId === id ? 0.08 : 0.21}
      mt="2"
      mb="2"
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
        <Flex flexDir="row" align="center">
          <Box mr="2">
            <Flex alignItems="center">{shares.length}</Flex>
          </Box>
          |
          <Flex ml="2" align="center">
            <Flex align="center" justify="center" gap="1">
              <MdPeople fontSize="15" />
              {members.length}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default GroupItem;
