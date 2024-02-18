import { useState } from 'react';
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
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useForgotPassword } from '../hooks/useForgotPassword';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading } = useForgotPassword();

  function handleForgotPassword(e) {
    e.preventDefault();
    forgotPassword(
      { email },
      {
        onSettled: () => {
          setEmail('');
          onClose();
        },
      }
    );
  }

  return (
    <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Password reset</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel
              size="sm"
              color="black"
              fontSize="1rem"
              fontWeight="300"
              bg="brandGray.50"
              mb="1"
            >
              Your email address:
            </FormLabel>
            <Input
              type="text"
              borderColor="brand.200"
              size="sm"
              borderRadius="6px"
              focusBorderColor="brand.600"
              placeholder="Email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" colorScheme="brand" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            size="sm"
            colorScheme="buttonOrange"
            onClick={handleForgotPassword}
            isDisabled={isLoading}
          >
            Send password reset mail
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ForgotPasswordModal;
