import React from 'react';
import {connect} from 'react-redux';

import Searchbar from '../components/Searchbar';
import Results from '../components/Results';
import DocModal from '../components/DocModal';

const Dashboard = props => (
  <div id="main">
    <Searchbar />
    <Results />
    {props.doc && <DocModal doc={props.doc} />}
  </div>
);

const mapState = state => {
  return state.elastic;
};

export default connect(mapState, null)(Dashboard);
