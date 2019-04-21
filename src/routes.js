import React from 'react';

import Dashboard from './containers/Dashboard';
import Search from './containers/Search';

const routes = [
  {path: '/', render: () => <Dashboard />},
  {path: '/:q', render: () => <Search />},
  {path: '/:q/:page', render: () => <Search />}
];

export default routes;
