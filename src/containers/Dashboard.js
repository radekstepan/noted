import React from 'react';

import Searchbar from '../components/Searchbar';
import Results from '../components/Results';
import DocModal from '../components/DocModal';

const Dashboard = props => (
  <div id="main">
    <DocModal />
    <Searchbar />
    <Results />
  </div>
);

export default Dashboard;
