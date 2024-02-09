import { Spinner } from '@chakra-ui/react';
import { useShares } from '../../hooks/useShares';
import { useGroupContext } from '../../context/GroupContext';

function Shares() {
  const { selectedGroupId } = useGroupContext();
  const { isLoading, isError, data, error } = useShares(selectedGroupId);

  return <Spinner size="lg" color="brandOrange.500" />;
}

export default Shares;
