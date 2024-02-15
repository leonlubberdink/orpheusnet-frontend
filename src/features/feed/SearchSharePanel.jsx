import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Flex,
  Input,
  TabPanel,
  FormControl,
  Text,
} from '@chakra-ui/react';

import { useSearchContext } from '../../context/SearchContext';
import { useShareMusic } from '../../hooks/useShareMusic';
import { useGroupContext } from '../../context/GroupContext';

function SearchPanel({ panelType }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedGroupId } = useGroupContext();
  const { shareMusic, isLoading } = useShareMusic(resetStates);

  const [albumChecked, setAlbumChecked] = useState(false);
  const [epChecked, setEpChecked] = useState(false);
  const [songChecked, setSongChecked] = useState(false);
  const [mixChecked, setMixChecked] = useState(false);

  const {
    searchValue,
    setSearchValue,
    shareUrl,
    setShareUrl,
    shareType,
    setShareType,
  } = useSearchContext();

  function handleSearchInputChange(e) {
    setSearchValue(e.target.value);
  }

  function handleShareInputChange(e) {
    setShareUrl(e.target.value);
  }

  function handleSetShareType(type) {
    setShareType((prev) => {
      if (prev === '') return type;
      return '';
    });
  }

  function handleCheckBoxes(e, type) {
    if (panelType === 'share') {
      if (type === 'album') {
        handleSetShareType(type);
        setAlbumChecked((checkedStatus) => !checkedStatus);
        setEpChecked(false);
        setSongChecked(false);
        setMixChecked(false);
      }

      if (type === 'ep') {
        handleSetShareType(type);
        setEpChecked((checkedStatus) => !checkedStatus);
        setAlbumChecked(false);
        setSongChecked(false);
        setMixChecked(false);
      }

      if (type === 'song') {
        handleSetShareType(type);
        setSongChecked((checkedStatus) => !checkedStatus);
        setEpChecked(false);
        setAlbumChecked(false);
        setMixChecked(false);
      }

      if (type === 'mix') {
        handleSetShareType(type);
        setMixChecked((checkedStatus) => !checkedStatus);
        setEpChecked(false);
        setSongChecked(false);
        setAlbumChecked(false);
      }

      return;
    }

    // If panel type is "Search"
    if (e.target.checked) {
      searchParams.set(type, e.target.checked);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(type);
      setSearchParams(searchParams);
    }

    type === 'album' && setAlbumChecked((prev) => !prev);
    type === 'ep' && setEpChecked((prev) => !prev);
    type === 'song' && setSongChecked((prev) => !prev);
    type === 'mix' && setMixChecked((prev) => !prev);
  }

  function resetStates() {
    setShareUrl('');
    setShareType('');
    setAlbumChecked(false);
    setEpChecked(false);
    setSongChecked(false);
    setMixChecked(false);
  }

  function handleShareNow() {
    shareMusic({
      selectedGroupId,
      formData: {
        url: shareUrl,
        format: shareType,
      },
    });
  }

  return (
    <TabPanel>
      <FormControl>
        <Flex flexDir="column" gap="5">
          <Flex flexDir="row" alignItems="center" gap="4">
            <Text width="36">
              {panelType === 'search' ? 'Search Music:' : 'Share Music:'}
            </Text>
            <Input
              type="text"
              placeholder={
                panelType === 'search'
                  ? 'What do you want to find?'
                  : 'SoundCloud or Spotify url...'
              }
              value={panelType === 'search' ? searchValue : shareUrl}
              onChange={
                panelType === 'search'
                  ? (e) => handleSearchInputChange(e)
                  : (e) => handleShareInputChange(e)
              }
            />
          </Flex>
          <Flex direction="row" gap="5" alignItems="center" height="9">
            <Checkbox
              isChecked={albumChecked}
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'album')}
            >
              Album
            </Checkbox>
            <Checkbox
              isChecked={epChecked}
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'ep')}
            >
              EP
            </Checkbox>
            <Checkbox
              isChecked={songChecked}
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'song')}
            >
              Song
            </Checkbox>
            <Checkbox
              isChecked={mixChecked}
              size="md"
              colorScheme="brandOrange"
              onChange={(e) => handleCheckBoxes(e, 'mix')}
            >
              Mix
            </Checkbox>
            {panelType === 'share' && (
              <Button
                size="sm"
                colorScheme="buttonOrange"
                ml="auto"
                onClick={handleShareNow}
                isDisabled={isLoading}
              >
                Share now
              </Button>
            )}
          </Flex>
        </Flex>
      </FormControl>
    </TabPanel>
  );
}

export default SearchPanel;
