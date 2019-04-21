import React from 'react';
import {connect} from 'react-redux';

import Results from '../components/Results';

class Search extends React.Component {

  render() {
    return <Results />;
  };
}

export default connect(null, null)(Search);
