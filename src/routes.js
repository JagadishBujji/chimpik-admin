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
import UserDetail from './Reuseable/EventDetail';
import Jobs from './pages/Jobs';
import Financial from './Reuseable/Financial';
import UserDetails from './Reuseable/UserDetails';
import JobsDetails from './Reuseable/JobsDetails';
import ReportJobs from './pages/ReportJobs';

// ----------------------------------------------------------------------

export default function Router() {
  const kangroo = JSON.parse(localStorage.getItem('kangroo'));
  console.log(kangroo);
  return useRoutes([
    {
      path: '/dashboard',
      // element: kangroo ? <DashboardLayout /> : <Navigate to="/login" />,
      element: <DashboardLayout />,
      //  :
      // <Navigate to="/login" />,
      children: [
        { path: 'user', element: <DashboardApp /> },
        { path: 'event', element: <User /> },
        // { path: 'event/:id/financial', element: <Financial /> },
        { path: 'event/:id', element: <UserDetail /> },
        { path: 'profile', element: <Profile /> },
        { path: 'jobs', element: <Jobs /> },
        { path: 'jobs/:id', element: <JobsDetails /> },
        { path: 'report-jobs', element: <ReportJobs /> },

        // { path: 'blog', element: <Blog /> },
        // { path: 'hirer/:id', element: <TeamHirer /> },
        // { path: 'freebee/:id', element: <FreeBee /> },
      ],
    },
    {
      path: 'login',
      element: kangroo ? <Navigate to="/dashboard/user" /> : <Login />,
    },
    {
      path: 'register',
      element: kangroo ? <Navigate to="/dashboard/user" /> : <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/user" /> },
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
