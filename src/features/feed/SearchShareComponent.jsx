import { Flex, TabList, Tab, Tabs, TabPanels } from '@chakra-ui/react';

import { useSearchContext } from '../../context/SearchContext';

import SearchSharePanel from './SearchSharePanel';

const tabStyles = {
  background: 'brandOrange.00',
  color: 'brandOrange.400',
  fontWeight: '500',
  backgroundColor: 'brandGray.0',
  borderBottom: '2px solid',
  borderBottomColor: 'brandOrange.400',
};

function SearchShareComponent() {
  const { setSearchValue, setShareUrl } = useSearchContext();

  function handleSwitch() {
    setSearchValue('');
    setShareUrl('');
  }

  return (
    <Flex flexGrow="1" pl="10" pr="10" mt="4" height="170px">
      <Tabs
        isFitted
        variant="enclosed-colored"
        w="100%"
        colorScheme="brandTabOrange"
      >
        <TabList>
          <Tab bg="brandGray.50" _selected={tabStyles} onClick={handleSwitch}>
            Search / Filter
          </Tab>
          <Tab bg="brandGray.50" _selected={tabStyles} onClick={handleSwitch}>
            Share
          </Tab>
        </TabList>
        <TabPanels>
          <SearchSharePanel panelType="search" />
          <SearchSharePanel panelType="share" />
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default SearchShareComponent;
