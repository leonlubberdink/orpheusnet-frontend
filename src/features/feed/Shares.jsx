import { Spinner, Box, Flex, VStack, Text, Image } from '@chakra-ui/react';
import { useShares } from '../../hooks/useShares';
import { useGroupContext } from '../../context/GroupContext';
import ShareItem from './ShareItem';

function Shares() {
  const { selectedGroupId } = useGroupContext();
  const { isLoading, isError, data, error } = useShares(selectedGroupId);

  const groupShares = data || [];

  return (
    <VStack ml="10" mr="10">
      {isLoading && <Spinner size="lg" color="brandOrange.500" />}
      {groupShares.map((share) => (
        <ShareItem share={share} key={share._id} />
      ))}
    </VStack>
  );
}

export default Shares;
