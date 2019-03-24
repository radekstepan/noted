import React from 'react';

import Searchbar from '../components/Searchbar';
import Results from '../components/Results';
import DocModal from '../components/DocModal';
import FileUpload from '../components/FileUpload';

const Dashboard = props => (
  <div id="main">
    <FileUpload />
    <DocModal />
    <Searchbar />
    <Results />
  </div>
);

export default Dashboard;
