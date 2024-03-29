import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();

  useEffect(function () {
    let isMounted = true;

    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Spinner size="xl" color="brandOrange.500" />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistLogin;
