import { VStack, Box, StackDivider, Text } from '@chakra-ui/react';
function Sidebar({ type = 'groups' }) {
  const headerText = type === 'groups' ? 'Communities' : 'Members';

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} color="black">
      <Text fontWeight="300" as="h3" size="xs">
        {headerText}
      </Text>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
      <Box>Stackbox</Box>
    </VStack>
  );
}

export default Sidebar;
