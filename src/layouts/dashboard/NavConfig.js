// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22}  />;

const navConfig = [
  {
    title: 'User',
    path: '/dashboard/user',
    // icon: getIcon('eva:pie-chart-2-fill'),
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Event',
    path: '/dashboard/event',
    icon: getIcon('material-symbols:event'),
  },
  {
    title: 'Jobs',
    path: '/dashboard/jobs',
    icon: getIcon('pajamas:work'),
  },
  // {
  //   title: 'Report Job',
  //   path: '/dashboard/profile',
  //   icon: getIcon('healthicons:ui-user-profile'),
  // },
  
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
