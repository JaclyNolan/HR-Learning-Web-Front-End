import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import AdminLayout from './layouts/dashboard/AdminLayout';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RequireAuth from './HOC/RequireAuth';
import RequireGuest from './HOC/RequireGuest';
import Unauthorized from './pages/Unauthorized';
import useAuth from './hooks/useAuth';
import { CourseList } from './pages/CoursePages';

// ----------------------------------------------------------------------

const commonRoutes = [
  // guest routes
  {
    element: <RequireGuest />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ]
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: '404', element: <Page404 /> },
      { path: 'unauthorize', element: <Unauthorized /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]

const adminRoutes = [
  {
    element: <RequireAuth allowedRoles={['admin']} />,
    children: [
      { element: <Navigate to="/dashboard/app" />, index: true },
      {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: 'app', element: <DashboardAppPage /> },
          { path: 'user', element: <UserPage /> },
        ],
      },
    ]
  },
  ...commonRoutes
];

const staffRoutes = [
  {
    element: <RequireAuth allowedRoles={['staff']} />,
    children: [
      { element: <Navigate to="/dashboard/app" />, index: true },
      {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: 'app', element: <DashboardAppPage /> },
          { path: 'trainee', element: <UserPage /> },
          { path: 'trainer', element: <UserPage /> },
          { path: 'topic', element: <UserPage /> },
          { path: 'course', element: <CourseList /> },
          { path: 'courseCategory', element: <UserPage /> },
        ],
      },
    ]
  },
  ...commonRoutes
]

const trainerRoutes = [
  {
    element: <RequireAuth allowedRoles={['trainer']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/', element: <UserPage /> },
          { path: '/course', element: <p>Course</p> },
          { path: '/nothing', element: <></> }
        ]
      }
    ]
  },
  ...commonRoutes
]

const findRouter = (role) => {
  switch (role){
    case "admin":
      return adminRoutes
    case "staff":
      return staffRoutes
    case "trainer":
      return trainerRoutes
    default:
      return commonRoutes
  }
}

export default function Router() {
  const { user } = useAuth();
  const routes = useRoutes(findRouter(user?.role));

  return routes;
}
