import MainLayout from '@layouts/MainLayout';
import BecomeEventOrganizer from '@pages/BecomeEventOrganizer';
import Categories from '@pages/Dashboard/Categories';
import Locations from '@pages/Dashboard/Locations';
import MyEvents from '@pages/Dashboard/MyEvents';
import Orders from '@pages/Dashboard/Orders';
import Profile from '@pages/Dashboard/Profile';
import Users from '@pages/Dashboard/Users';
import DetailEvent from '@pages/DetailEvent';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import HomeBeforeLogin from '@pages/HomeBeforeLogin';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';
import Streaming from '@pages/Streaming';

const routes = [
  {
    path: '/',
    name: 'Main',
    protected: false,
    component: HomeBeforeLogin,
    layout: MainLayout,
  },
  {
    path: '/home',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    protected: false,
    component: ForgotPassword,
  },
  {
    path: '/detail/:eventId',
    name: 'Detail Event',
    protected: true,
    component: DetailEvent,
    layout: MainLayout,
  },
  {
    path: '/become-event-organizer',
    name: 'Register As Event Organizer',
    protected: true,
    component: BecomeEventOrganizer,
    layout: MainLayout,
  },
  {
    path: '/streaming',
    name: 'Streaming',
    protected: true,
    component: Streaming,
    layout: MainLayout,
  },
  {
    path: '/dashboard',
    name: 'Profile Page',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: 'dashboard/my-events',
    name: 'My Events Page',
    protected: true,
    component: MyEvents,
    layout: MainLayout,
  },
  {
    path: 'dashboard/my-orders',
    name: 'My Orders Page',
    protected: true,
    component: Orders,
    layout: MainLayout,
  },
  {
    path: '/dashboard/locations',
    name: 'Locations Page',
    protected: true,
    component: Locations,
    layout: MainLayout,
  },
  {
    path: '/dashboard/categories',
    name: 'Categories Page',
    protected: true,
    component: Categories,
    layout: MainLayout,
  },
  {
    path: '/dashboard/users',
    name: 'Userd Admin Page',
    protected: true,
    component: Users,
    layout: MainLayout,
  },
  {
    path: '/:token/reset-password',
    name: 'Reset Password',
    protected: false,
    component: ResetPassword,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
