import { useEffect, useState } from 'react';
import { HiShare } from 'react-icons/hi';
import { Flex, Text, Image, Tag, Icon } from '@chakra-ui/react';

import { useGroupContext } from '../context/GroupContext';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function UserItem({ user, group }) {
  const { groupAdmins, shares } = group;
  const { selectedMemberId } = useGroupContext();
  const [userShares, setUserShares] = useState([]);
  const { _id: id, userName, userImage } = user;

  useEffect(
    function () {
      const allGroupShares = shares || [];

      const newUserShares = allGroupShares.filter((share) => share.user === id);
      setUserShares(newUserShares);
    },
    [shares, id]
  );

  return (
    <Flex
      width="200px"
      align="center"
      justify="space-between"
      fontSize="14"
      fontWeight={selectedMemberId === id ? '400' : '300'}
      letterSpacing={selectedMemberId === id ? 0.08 : 0.21}
      mt="2"
      mb="2"
    >
      <Image
        borderRadius="full"
        mr="4"
        ml="2"
        boxSize="12"
        src={`${imgUrl}/${userImage}`}
        alt={`Group image of ${userName}`}
      />

      <Flex flexDir="column" mr="auto" gap="1">
        <Text>{userName}</Text>
        <Flex align="center" flexDir="row">
          <Flex mr="2" flexDir="row" align="center" gap="1">
            <Icon boxSize="3" as={HiShare}></Icon>
            <Text lineHeight="1">{userShares.length}</Text>
          </Flex>
          {groupAdmins.includes(id) && (
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

export default UserItem;
