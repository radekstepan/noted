import React from 'react';
import {connect} from 'react-redux';

import Tags from '../components/Tags';

class Dashboard extends React.Component {

  render() {
    return <Tags />;
  };
}

export default connect(null, null)(Dashboard);
