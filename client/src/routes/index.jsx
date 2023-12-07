import MainLayout from '@layouts/MainLayout';
import DetailEvent from '@pages/DetailEvent';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
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
    protected: false,
    component: DetailEvent,
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
