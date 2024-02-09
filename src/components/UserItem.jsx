import { memo } from 'react';
import { Box, Flex, Text, Image, Tag } from '@chakra-ui/react';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function UserItem({ user, groupAdmins }) {
  return (
    <Flex
      width="200px"
      align="center"
      justify="space-between"
      fontWeight="300"
      fontSize="14"
      mt="2"
      mb="2"
    >
      <Image
        borderRadius="full"
        mr="4"
        ml="2"
        boxSize="12"
        src={`${imgUrl}/${user.userImage}`}
        alt={`Group image of ${user.userName}`}
      />

      <Flex flexDir="column" mr="auto">
        <Text>{user.userName}</Text>
        <Flex align="center">
          <Box mr="2">
            <Flex alignItems="center">1</Flex>
          </Box>
          {groupAdmins.includes(user._id) && (
            <Flex justify="center">
              |
              <Tag variant="outline" size="sm" colorScheme="brandOrange" ml="3">
                admin
              </Tag>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(UserItem);
