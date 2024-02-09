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

const tabStyles = {
  background: 'brandOrange.00',
  color: 'brandOrange.400',
  fontWeight: '500',
  backgroundColor: 'brandGray.0',
  borderBottom: '2px solid',
  borderBottomColor: 'brandOrange.400',
};

function SearchShareComponent() {
  const { searchValue, setSearchValue } = useSearchContext();

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

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
          <TabPanel>
            <FormControl>
              <Flex flexDir="row" alignItems="center" gap="4">
                <Text>Search</Text>
                <Input
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </Flex>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <p>Share</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default SearchShareComponent;
