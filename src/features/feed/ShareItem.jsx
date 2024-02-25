import { ExternalLinkIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Text, Image, Link } from '@chakra-ui/react';
import { GiAudioCassette } from 'react-icons/gi';
import { PiVinylRecordFill } from 'react-icons/pi';
import { MdOutlineQueueMusic, MdLibraryMusic } from 'react-icons/md';

import useAuth from '../../hooks/useAuth';
import { useDeleteShare } from '../../hooks/useDeleteShare';

const baseUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function shortenSoundCloudTilte(title) {
  const lastIndex = title.lastIndexOf(' by');

  return lastIndex !== -1 ? title.slice(0, lastIndex) : title;
}

function ShareItem({ share }) {
  const {
    shareUrl,
    publisher,
    title,
    platform,
    format,
    user,
    _id: shareId,
  } = share;
  const { deleteShare, isLoading } = useDeleteShare();
  const {
    auth: {
      user: { _id: loggedInUserId },
    },
  } = useAuth();

  const type = format === 'track' ? 'song' : format;

  const shortTitle =
    platform === 'SoundCloud' ? shortenSoundCloudTilte(title) : title;

  function handleDeleteShare() {
    deleteShare(shareId);
  }

  return (
    <Box
      key={shareId}
      borderWidth="1px"
      minWidth="100%"
      bg="brandGray.0"
      boxShadow="sm"
      pl="4"
      pr="4"
    >
      <Flex flexDir="row" alignItems="center" gap="3" minHeight="20">
        <Flex minWidth="16" justifyContent="center">
          {type.toLowerCase() === 'mix' && (
            <Flex position="relative">
              <Icon as={GiAudioCassette} color="brandOrange.400" boxSize={12} />
            </Flex>
          )}
          {type.toLowerCase() === 'ep' && (
            <Flex position="relative">
              <Icon as={MdLibraryMusic} color="brandOrange.400" boxSize={12} />
            </Flex>
          )}
          {type.toLowerCase() === 'album' && (
            <Flex position="relative">
              <Icon
                as={PiVinylRecordFill}
                color="brandOrange.400"
                boxSize={12}
              />
            </Flex>
          )}
          {type.toLowerCase() === 'song' && (
            <Flex position="relative">
              <Icon
                as={MdOutlineQueueMusic}
                color="brandOrange.400"
                boxSize={12}
              />
            </Flex>
          )}
        </Flex>
        <Flex
          flexDir="column"
          gap="2"
          borderLeft="1px solid"
          borderLeftColor="brandGray.200"
          borderRight="1px solid"
          borderRightColor="brandGray.200"
          pl="6"
          flexGrow="1"
        >
          <Link
            href={
              platform === 'SoundCloud'
                ? `${shareUrl}?autoplay=false`
                : shareUrl
            }
            target="blank"
            _hover={{ textDecoration: 'none', color: 'brandOrange.600' }}
          >
            <Flex flexDir="row" alignItems="center" textDecor="none">
              <Text
                as="h2"
                fontSize="20"
                fontWeight="400"
                color="brand.600"
                _hover={{ color: 'brandOrange.600' }}
              >
                {publisher} - {shortTitle}
                <ExternalLinkIcon boxSize="4" ml="2" mb="1px" />
              </Text>
            </Flex>
          </Link>
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="12" fontWeight="400" color="brandGray.500">
              Shared by: {user.userName}
            </Text>
            <Image
              borderRadius="full"
              mr="4"
              ml="2"
              boxSize="3"
              src={`${imgUrl}/${user.userImage}`}
              alt={`Group image of ${user.userName}`}
            />
          </Flex>
        </Flex>
        {loggedInUserId === user._id && (
          <DeleteIcon
            boxSize="6"
            color={isLoading ? 'brandGray.200' : 'brandGray.500'}
            ml="4"
            mr="3"
            _hover={isLoading ? {} : { color: 'brandOrange.600' }}
            onClick={isLoading ? undefined : handleDeleteShare}
          />
        )}
        {loggedInUserId !== user._id && (
          <DeleteIcon boxSize="6" color="brandGray.200" ml="4" mr="3" />
        )}
      </Flex>
    </Box>
  );
}

export default ShareItem;
