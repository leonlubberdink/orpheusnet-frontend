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
      const filterAlbums = searchParams.get('album');
      const filterEps = searchParams.get('ep');
      const filterSongs = searchParams.get('song');
      const filterMixes = searchParams.get('mix');
      const filterUserId = searchParams.get('user');

      if (filterUserId)
        newFilteredShares = newFilteredShares.filter(
          (share) => share.user._id === filterUserId
        );

      if (filterAlbums || filterEps || filterSongs || filterMixes)
        newFilteredShares = newFilteredShares.filter((share) => {
          if (filterAlbums && share.format.toLowerCase() === 'album')
            return true;
          if (filterEps && share.format.toLowerCase() === 'ep') return true;
          if (filterSongs && share.format.toLowerCase() === 'song') return true;
          if (filterMixes && share.format.toLowerCase() === 'mix') return true;
          return false;
        });
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
