import { useSearchParams } from 'react-router-dom';
import {
  Checkbox,
  Flex,
  Input,
  TabPanel,
  FormControl,
  Text,
} from '@chakra-ui/react';

import { useSearchContext } from '../../context/SearchContext';

function SearchPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue, setSearchValue } = useSearchContext();

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  function handleCheckBoxes(e, type) {
    if (e.target.checked) {
      searchParams.set(type, e.target.checked);
      setSearchParams(searchParams);
    }

    if (!e.target.checked) {
      searchParams.delete(type);
      setSearchParams(searchParams);
    }
  }

  return (
    <TabPanel>
      <FormControl>
        <Flex flexDir="column" gap="2">
          <Flex flexDir="row" alignItems="center" gap="4">
            <Text>Search</Text>
            <Input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
            />
          </Flex>

          <Flex direction="row" gap="5">
            <Checkbox
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'album')}
            >
              Album
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'ep')}
            >
              EP
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'song')}
            >
              Song
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'mix')}
            >
              Mix
            </Checkbox>
          </Flex>
        </Flex>
      </FormControl>
    </TabPanel>
  );
}

export default SearchPanel;
