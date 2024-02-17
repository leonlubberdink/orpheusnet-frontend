import { useRef, useState } from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useCreateGroup } from '../hooks/useCreateGroup';

function CreateGroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState('');
  const [groupImageName, setGroupImageName] = useState('');
  const [groupImage, setGroupImage] = useState(undefined);

  const { createGroup, isLoading } = useCreateGroup();

  const communityNameRef = useRef();
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setGroupImageName(file.name);
    setGroupImage(file);
  }

  function handleCreateGroup(e) {
    e.preventDefault();

    if (!groupName) return;

    createGroup(
      { groupName, groupImage },
      {
        onSettled: () => {
          setGroupName('');
          setGroupImageName('');
          setGroupImage(undefined);
          onClose();
        },
      }
    );
  }

  return (
    <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new community</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            <FormControl>
              <FormLabel
                size="sm"
                color="black"
                fontSize="1rem"
                fontWeight="300"
                bg="brandGray.50"
                mb="1"
              >
                Community name
              </FormLabel>
              <Input
                ref={communityNameRef}
                type="text"
                borderColor="brand.200"
                size="sm"
                borderRadius="6px"
                focusBorderColor="brand.600"
                placeholder="Your community name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel
                size="sm"
                color="black"
                fontSize="1rem"
                fontWeight="300"
                bg="brandGray.50"
                mb="1"
              >
                User image (optional)
              </FormLabel>
              <Input
                style={{ display: 'none' }}
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Flex flexDir="row" gap="2" alignItems="center">
                <Button
                  size="xs"
                  leftIcon={<Icon as={MdOutlineUploadFile} />}
                  colorScheme="brandGray"
                  onClick={() => fileInputRef.current.click()}
                  isDisabled={isLoading}
                >
                  Choose Image
                </Button>
                <Text color="brandGray.500" fontSize="12">
                  ...{groupImageName?.slice(-25)}
                </Text>
              </Flex>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button size="sm" colorScheme="brand" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            size="sm"
            colorScheme="buttonOrange"
            onClick={handleCreateGroup}
            isDisabled={isLoading}
          >
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateGroupModal;
