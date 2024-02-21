import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(function () {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? <Spinner size="xl" color="brandOrange.500" /> : <Outlet />}
    </>
  );
}

export default PersistLogin;
