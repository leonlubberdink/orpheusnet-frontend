import { Link } from 'react-router-dom';
import {
  Flex,
  Image,
  Icon,
  Text,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Spinner,
} from '@chakra-ui/react';
import { HiCog8Tooth } from 'react-icons/hi2';
import { MdNotifications } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { ImCross, ImCheckmark } from 'react-icons/im';

import { useSignout } from '../hooks/useSignout';
import { useRespondToInvite } from '../hooks/useRespondToInvite';
import { useAuth } from '../hooks/useAuth';
import { useInvites } from '../hooks/useInvites';

import { useUserContext } from '../context/UserContext';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const imgUrl = `${baseUrl}/user-img`;

function NavAuth() {
  const { auth } = useAuth();
  const { signout } = useSignout();
  const { data: invites, isLoading: isLoadingInvites } = useInvites(
    auth?.user?._id
  );
  const { respondToInvite } = useRespondToInvite();
  const { userInfo } = useUserContext();

  function handleLogout() {
    signout();
  }

  function handleRespondToInvite(hasAcceptedInvite, groupId) {
    respondToInvite({ hasAcceptedInvite, userId: auth?.user?._id, groupId });
  }

  return (
    <Flex as="nav" gap="8" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="12"
        src={`${imgUrl}/${userInfo.userImage}`}
        alt="Your user image"
        boxShadow="base"
      />
      <Text fontSize="28" fontWeight="400" color="brandGray.800">
        {userInfo.userName}
      </Text>
      {invites?.length > 0 && (
        <Box position="relative">
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  aria-label="Invites"
                  title="Invites"
                  height="45px"
                  width="45px"
                  icon={<Icon fontSize="43" as={MdNotifications} />}
                  variant="unstyled"
                  color="brandGray.800"
                  _hover={{ color: 'brand.600' }}
                  isActive={isOpen}
                />
                <Flex
                  position="absolute"
                  top="-0.3"
                  right="-0.3"
                  backgroundColor="brandOrange.500"
                  width="5"
                  height="5"
                  borderRadius="100"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    as="span"
                    borderRadius="100"
                    fontWeight="600"
                    fontSize="14"
                  >
                    {invites?.length}
                  </Text>
                </Flex>
                <MenuList color="brandGray.900">
                  <MenuGroup title="Invites" fontSize="20">
                    <MenuDivider />
                    {isLoadingInvites ? (
                      <Spinner size="xs" color="brandOrange.500" />
                    ) : (
                      invites?.map((invite) => (
                        <MenuItem
                          key={invite.groupId}
                          fontWeight="400"
                          fontSize="18"
                          _active={{ backgroundColor: 'none' }}
                        >
                          <Flex
                            width="100%"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text>{`${invite.groupName}`}</Text>
                            <Flex ml="8" gap="2" alignItems="center">
                              <Icon
                                fontSize={15}
                                as={ImCheckmark}
                                aria-label="Accept invite"
                                title="Accept invite"
                                variant="unstyled"
                                color="brandGray.500"
                                _hover={{ color: 'green' }}
                                onClick={() =>
                                  handleRespondToInvite(true, invite.groupId)
                                }
                              />
                              <Icon
                                fontSize={12}
                                as={ImCross}
                                aria-label="Decline invite"
                                title="Decline invite"
                                variant="unstyled"
                                color="brandGray.500"
                                _hover={{ color: 'brandOrange.500' }}
                                onClick={() =>
                                  handleRespondToInvite(false, invite.groupId)
                                }
                              />
                            </Flex>
                          </Flex>
                        </MenuItem>
                      ))
                    )}
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      )}
      <Link to="user">
        <Flex alignItems="center">
          <IconButton
            title="User settings"
            aria-label="User settings"
            height="45px"
            width="45px"
            icon={<Icon fontSize="43" as={HiCog8Tooth} />}
            variant="unstyled"
            color="brandGray.800"
            _hover={{ color: 'brand.600' }}
          />
        </Flex>
      </Link>

      <IconButton
        aria-label="Log out"
        title="Log out"
        height="45px"
        width="45px"
        icon={<Icon fontSize="43" as={TbLogout} />}
        variant="unstyled"
        color="brandOrange.500"
        _hover={{ color: 'brandOrange.600' }}
        onClick={handleLogout}
      />
    </Flex>
  );
}

export default NavAuth;
