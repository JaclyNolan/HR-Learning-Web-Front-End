// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const adminNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export const staffNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Trainee',
    path: '/dashboard/trainee',
    icon: icon('ic_user'),
  },
  {
    title: 'Trainer',
    path: '/dashboard/trainer',
    icon: icon('ic_trainer'),
  },
  {
    title: 'Topic',
    path: '/dashboard/topic',
    icon: icon('ic_topic'),
  },
  {
    title: 'Course',
    path: '/dashboard/course',
    icon: icon('ic_course'),
  },
  {
    title: 'Course Category',
    path: '/dashboard/courseCategory',
    icon: icon('ic_course_category'),
  },
]
export const trainerNavConfig = [
  {
    title: 'Course',
    path: '/course',
    icon: icon('ic_course'),
  },
]