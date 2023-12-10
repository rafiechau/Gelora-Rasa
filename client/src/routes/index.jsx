import MainLayout from '@layouts/MainLayout';
import BecomeEventOrganizer from '@pages/BecomeEventOrganizer';
import DetailEvent from '@pages/DetailEvent';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
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
    path: 'Profile',
    name: 'Profile Page',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  // {
  //   path: '/:token/reset-password',
  //   name: 'Reset Password',
  //   protected: false,
  //   component: ResetPassword,
  // },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
