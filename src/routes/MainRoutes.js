import React, { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const Agents = Loadable(lazy(() => import('../views/Agents/Agent')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,

  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    { path: '/agents', element: <Agents/> },
    { path: '/sample-page', element: <SamplePage /> }
  ]
};

export default MainRoutes;
