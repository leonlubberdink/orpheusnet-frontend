import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default AppLayout;
