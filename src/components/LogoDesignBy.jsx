import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function LogoDesignBy({ variant }) {
  return (
    <Box ml="10px" mb="3px">
      <Text
        color="black"
        fontSize="11"
        fontWeight="400"
        as="span"
        letterSpacing=".5px"
      >
        Logo design by{' '}
        <Link
          href="https://milanvanbelle.eu/"
          isExternal="true"
          color={variant !== 'dark' && 'brandGray.50'}
          fontWeight="400"
          textShadow={variant !== 'dark' && '0px 1px 1px black'}
          _hover={{ textDecoration: 'none' }}
        >
          Milan van Belle{' '}
          <ExternalLinkIcon
            color={variant !== 'dark' && 'brandGray.50'}
            ml="2px"
            mb="3px"
          />
        </Link>
      </Text>
    </Box>
  );
}

export default LogoDesignBy;
