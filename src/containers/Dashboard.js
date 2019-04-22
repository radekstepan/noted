import React from 'react';
import {connect} from 'react-redux';
import Scroll from 'react-perfect-scrollbar';

import Today from '../components/Today';
import Tags from '../components/Tags';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getDashboard();
  }

  render() {
    const {error, today, tags} = this.props;

    return (
      <div id="results">
        <Scroll>
          {error && <div className="message error">{error}</div>}
          <div className="container">
            {today && <Today docs={today} />}
            {tags && <Tags tags={tags} />}
          </div>
        </Scroll>
      </div>
    );
  };
}

const mapState = state => ({
  error: state.elastic.error,
  today: state.elastic.today,
  tags: state.elastic.tags
});

const mapDispatch = dispatch => ({
  getDashboard: dispatch.elastic.getDashboard
});

export default connect(mapState, mapDispatch)(Dashboard);
