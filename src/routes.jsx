import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import AdminLayout from './layouts/dashboard/AdminLayout';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RequireAuth from './HOC/RequireAuth';
import RequireGuest from './HOC/RequireGuest';
import Unauthorized from './pages/Unauthorized';
import useAuth from './hooks/useAuth';
import { CourseList } from './pages/CoursePages';
import TrainerCourseList from './pages/TrainerRolePages/TrainerCourseList';
import TrainerProfile from './pages/TrainerRolePages/TrainerProfile';
import { CourseCategoryList } from './pages/CourseCategoryPages';
import { TopicList } from './pages/TopicPages';

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
      // { path: '*', element: <Navigate to="/404" /> },
      { path: '*', element: <Page404 /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]

const guestRoutes = [
  {
    element: <RequireAuth />,
    children: [
      { element: <Navigate to="/login" />, index: true },
    ]
  },
  ...commonRoutes
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
          { path: 'user', element: <CourseList /> },
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
          { path: 'trainee', element: <CourseList /> },
          { path: 'trainer', element: <CourseList /> },
          { path: 'topic', element: <TopicList /> },
          { path: 'course', element: <CourseList /> },
          { path: 'courseCategory', element: <CourseCategoryList /> },
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
          { path: '/', element: <Navigate to={'/course'} /> },
          { path: '/course', element: <TrainerCourseList /> },
          { path: '/profile', element: <TrainerProfile /> },
        ]
      }
    ]
  },
  ...commonRoutes
]

const findRouter = (role) => {
  switch (role) {
    case "admin":
      return adminRoutes
    case "staff":
      return staffRoutes
    case "trainer":
      return trainerRoutes
    default:
      return guestRoutes
  }
}

export default function Router() {
  const { user } = useAuth();
  const routes = useRoutes(findRouter(user?.role));

  return routes;
}
