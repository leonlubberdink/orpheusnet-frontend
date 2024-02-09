import {
  Flex,
  Input,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';

const tabStyles = {
  background: 'brandOrange.00',
  color: 'brandOrange.400',
  fontWeight: '500',
  backgroundColor: 'brandGray.0',
  borderBottom: '2px solid',
  borderBottomColor: 'brandOrange.400',
};

function SearchShareComponent() {
  const [searchValue, setSearchValue] = useState('');

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <Flex w="100%" pl="10" pr="10" mt="4">
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
              <Input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
              />
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
