import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DashboardApp from './pages/DashboardApp';
import TeamHirer from './Reuseable/TeamHirer';
import FreeBee from './Reuseable/FreeBee';
import UserDetail from './Reuseable/UserDetail';
import Payment from './pages/Payment';
import Financial from './Reuseable/Financial';

// ----------------------------------------------------------------------

export default function Router() {
  const kangroo = JSON.parse(localStorage.getItem('kangroo'));
  console.log(kangroo);
  return useRoutes([
    {
      path: '/dashboard',
      // element: kangroo ? <DashboardLayout /> : <Navigate to="/login" />,
      element: kangroo ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'user/:id/financial', element: <Financial /> },
        { path: 'user/:id', element: <UserDetail /> },
        { path: 'profile', element: <Profile /> },
        { path: 'payment', element: <Payment /> },
        { path: 'blog', element: <Blog /> },
        { path: 'hirer/:id', element: <TeamHirer /> },
        { path: 'freebee/:id', element: <FreeBee /> },
      ],
    },
    {
      path: 'login',
      element: kangroo ? <Navigate to="/dashboard/app" /> : <Login />,
    },
    {
      path: 'register',
      element: kangroo ? <Navigate to="/dashboard/app" /> : <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
