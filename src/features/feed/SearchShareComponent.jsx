import {
  Flex,
  Input,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  FormControl,
  Text,
} from '@chakra-ui/react';

import { useSearchContext } from '../../context/SearchContext';

import SharePanel from './SharePanel';
import SearchPanel from './SearchPanel';

const tabStyles = {
  background: 'brandOrange.00',
  color: 'brandOrange.400',
  fontWeight: '500',
  backgroundColor: 'brandGray.0',
  borderBottom: '2px solid',
  borderBottomColor: 'brandOrange.400',
};

function SearchShareComponent() {
  return (
    <Flex flexGrow="1" pl="10" pr="10" mt="4">
      <Tabs
        isFitted
        variant="enclosed-colored"
        w="100%"
        colorScheme="brandTabOrange"
      >
        <TabList>
          <Tab bg="brandGray.50" _selected={tabStyles}>
            Search / Filter
          </Tab>
          <Tab bg="brandGray.50" _selected={tabStyles}>
            Share
          </Tab>
        </TabList>
        <TabPanels>
          <SearchPanel />
          <SharePanel />
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default SearchShareComponent;
