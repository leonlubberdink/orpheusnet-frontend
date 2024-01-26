import { useAuth } from '../hooks/useAuth';
import NavNonAuth from '../components/NavNonAuth';
import NavAuth from '../components/NavAuth';

function Navigation() {
  const { auth } = useAuth();
  return auth?.user ? <NavAuth user={auth.user} /> : <NavNonAuth />;
}

export default Navigation;
