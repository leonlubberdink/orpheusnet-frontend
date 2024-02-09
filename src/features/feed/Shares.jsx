import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner, VStack } from '@chakra-ui/react';

import { useShares } from '../../hooks/useShares';

import { useGroupContext } from '../../context/GroupContext';
import { useSearchContext } from '../../context/SearchContext';

import ShareItem from './ShareItem';

function Shares() {
  const { selectedGroupId } = useGroupContext();
  const { searchValue } = useSearchContext();
  const { isLoading, isError, data, error } = useShares(selectedGroupId);
  const [filteredShares, setFilteredShares] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let newFilteredShares = data || [];

    newFilteredShares = newFilteredShares.filter((share) =>
      [
        share.publisher,
        share.title,
        share.shareUrl,
        share.platform,
        share.format,
        share.user.userName,
      ].some((field) => field.toLowerCase().includes(searchValue.toLowerCase()))
    );

    if (searchParams.size > 0) {
      const filterUserId = searchParams.get('user');
      newFilteredShares = newFilteredShares.filter(
        (share) => share.user._id === filterUserId
      );
    }

    setFilteredShares(newFilteredShares);
  }, [data, searchValue, searchParams]);

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
