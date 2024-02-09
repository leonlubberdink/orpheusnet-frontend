import { Spinner, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useShares } from '../../hooks/useShares';

import { useGroupContext } from '../../context/GroupContext';
import { useSearchContext } from '../../context/SearchContext';

import ShareItem from './ShareItem';

function Shares() {
  const { selectedGroupId } = useGroupContext();
  const { searchValue } = useSearchContext();
  const { isLoading, isError, data, error } = useShares(selectedGroupId);
  const [filteredShares, setFilteredShares] = useState([]);

  useEffect(() => {
    const groupShares = data || [];

    const newFilteredShares = groupShares.filter((share) =>
      [
        share.publisher,
        share.title,
        share.shareUrl,
        share.platform,
        share.format,
        share.user.userName,
      ].some((field) => field.toLowerCase().includes(searchValue.toLowerCase()))
    );

    setFilteredShares(newFilteredShares);
  }, [data, searchValue]);

  return (
    <VStack ml="10" mr="10">
      {isLoading && <Spinner size="" color="brandOrange.500" />}
      {filteredShares.map((share) => (
        <ShareItem share={share} key={share._id} />
      ))}
    </VStack>
  );
}

export default Shares;
