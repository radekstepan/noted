import React from 'react';

import Dashboard from './containers/Dashboard';
import Search from './containers/Search';

const search = store => {
  document.title = `${decodeURIComponent(store.router.params.q)} - Noted`;
  return <Search />;
};

const routes = [
  {path: '/', render: () => <Dashboard />},
  {path: '/:q', render: search},
  {path: '/:q/:page', render: search}
];

export default routes;
