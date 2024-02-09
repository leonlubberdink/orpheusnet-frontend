import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Image, Link } from '@chakra-ui/react';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function shortenSoundCloudTilte(title) {
  const lastIndex = title.lastIndexOf(' by');

  return lastIndex !== -1 ? title.slice(0, lastIndex) : title;
}

function ShareItem({ share }) {
  console.log(share);
  const { shareUrl, publisher, title, platform, format, user } = share;

  const shortTitle =
    platform === 'SoundCloud' ? shortenSoundCloudTilte(title) : title;

  return (
    <Box
      key={share._id}
      borderWidth="1px"
      minWidth="100%"
      bg="brandGray.0"
      boxShadow="sm"
      pl="4"
      pr="4"
      pt="1"
      pb="1"
    >
      <Flex flexDir="row" alignItems="center" gap="4" minHeight="20">
        <Flex minWidth="16" justifyContent="center">
          {format.toUpperCase()}
        </Flex>
        <Flex flexDir="column" gap="2">
          <Text as="h2" fontSize="20" fontWeight="400" color="brand.600">
            {publisher} - {shortTitle}
          </Text>
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
        <Link ml="auto" href={`${shareUrl}?autoplay=false`} target="blank">
          <ExternalLinkIcon boxSize="10" color="brandOrange.400" />
        </Link>
      </Flex>
    </Box>
  );
}

export default ShareItem;
