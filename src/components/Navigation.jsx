import { useAuth } from '../hooks/useAuth';
import NavNonAuth from './NavNonAuth';
import NavAuth from './NavAuth';

function Navigation() {
  const { auth } = useAuth();
  return auth?.user && auth?.user?.emailVerified ? <NavAuth /> : <NavNonAuth />;
}

export default Navigation;
