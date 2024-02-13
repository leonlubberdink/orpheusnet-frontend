import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Feed from './features/feed/Feed';
import UserSettings from './features/user/UserSettings';
import RequireAuth from './components/RequireAuth';
import Confirm from './pages/Confirm';
import IsConfirmed from './pages/IsConfirmed';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/:groupId" element={<Signup />} />
      <Route path="/isconfirmed" element={<IsConfirmed />} />

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="feed" />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:groupId" element={<Feed />} />
          <Route path="user" element={<UserSettings />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
