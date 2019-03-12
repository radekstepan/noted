import React from 'react';

import Searchbar from '../components/Searchbar';
import Results from '../components/Results';

const Dashboard = props => (
  <div id="main">
    <Searchbar />
    <Results />
  </div>
);

export default Dashboard;
