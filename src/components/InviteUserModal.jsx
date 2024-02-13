import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Text,
  Stack,
} from '@chakra-ui/react';

import { useGroupContext } from '../context/GroupContext';

import { useGroup } from '../hooks/useGroup';
import { useInvite } from '../hooks/useInvite';

function InviteUserModal({ isOpen, onClose }) {
  const { inviteMember } = useInvite();
  const [userOrMail, setUserOrMail] = useState('');
  const { selectedGroupName, selectedGroupId, setSelectedGroupName } =
    useGroupContext();
  const { data: group } = useGroup(selectedGroupId);

  useEffect(
    function () {
      setSelectedGroupName(group?.groupName);
    },
    [setSelectedGroupName, group]
  );

  function handleSendInvite() {
    inviteMember(
      { selectedGroupId, userOrMail },
      {
        onSettled: () => {
          setUserOrMail('');
          onClose();
        },
      }
    );
  }

  return (
    <Modal isCentered={true} isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="500">
          Invite a user to{' '}
          <Text as="span" color="brandOrange.500">
            {selectedGroupName}
          </Text>
          .
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="5">
            <Text as="p" fontSize="16" fontWeight="300">
              Invite your friends to join by entering their{' '}
              <Text as="span" fontWeight="400">
                username
              </Text>{' '}
              (if they already have an account) or their{' '}
              <Text as="span" fontWeight="400">
                emil address
              </Text>
              .
            </Text>
            <Text as="p" fontSize="16" fontWeight="300">
              If the user or e-mail address exist, they&lsquo;ll receive an
              email invitation from you, which they can easily accept to start
              participating.
            </Text>
            <FormControl>
              <Input
                type="text"
                borderColor="brand.200"
                size="sm"
                fontSize="12"
                borderRadius="6px"
                focusBorderColor="brand.600"
                placeholder="Type username or e-mail address..."
                value={userOrMail}
                onChange={(e) => setUserOrMail(e.target.value)}
                required
              />
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
            onClick={handleSendInvite}
          >
            Send invite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InviteUserModal;
