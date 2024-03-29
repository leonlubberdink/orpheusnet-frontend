import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner, VStack } from '@chakra-ui/react';

import { useShares } from '../../hooks/useShares';
import { useGroupContext } from '../../context/GroupContext';
import { useSearchContext } from '../../context/SearchContext';
import ShareItem from './ShareItem';
import EmptyFeed from '../../components/EmptyFeed';

const scrollBarStyle = {
  '&::-webkit-scrollbar': { width: '4px' },
  '&::-webkit-scrollbar-track': { width: '6px' },
  '&::-webkit-scrollbar-thumb': {
    background: 'brandGray.400',
    borderRadius: '24px',
  },
  height: 'calc(100vh - 290px)',
};

function Shares() {
  const { selectedGroupId } = useGroupContext();
  const { searchValue } = useSearchContext();
  const { isLoading, data } = useShares(selectedGroupId);
  const [searchParams] = useSearchParams();

  const sidebarStyle = isLoading ? {} : scrollBarStyle;

  const filteredShares = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const searchFilters = ['album', 'ep', 'track', 'mix'];
    const filterUserId = searchParams.get('user');
    const activeFilters = searchFilters.reduce((acc, filter) => {
      const value = searchParams.get(filter);
      if (value) acc[filter] = value.toLowerCase();
      return acc;
    }, {});

    return data
      .filter((share) => {
        const textMatch = [
          share.publisher,
          share.title,
          share.shareUrl,
          share.platform,
          share.format,
          share.user.userName,
        ].some((field) =>
          field.toLowerCase().includes(searchValue.toLowerCase())
        );
        const userMatch = filterUserId ? share.user._id === filterUserId : true;
        const formatMatch =
          Object.keys(activeFilters).length === 0 ||
          Object.keys(activeFilters).some(
            (filter) => share.format.toLowerCase() === filter
          );

        return textMatch && userMatch && formatMatch;
      })
      .reverse();
  }, [data, searchValue, searchParams]);

  return (
    <VStack ml="10" mr="10" overflowY="auto" sx={sidebarStyle}>
      {isLoading && <Spinner size="xl" color="brandOrange.500" />}
      {!selectedGroupId && <EmptyFeed></EmptyFeed>}
      {selectedGroupId &&
        filteredShares.map((share) => (
          <ShareItem share={share} key={share._id} />
        ))}
    </VStack>
  );
}

export default Shares;
