import React from 'react';
import {connect} from 'react-redux';
import Scroll from 'react-perfect-scrollbar';

import Today from '../components/Today';
import Tags from '../components/Tags';
import DocPreview from '../components/DocPreview';

class Dashboard extends React.Component {
  state = {visited: {}};

  div = React.createRef();

  onViewDoc = id => () => {
    this.setState({visited: {...this.state.visited, [id]: true}});
    this.props.getDoc(id);
  };

  componentDidMount() {
    this.props.getDashboard();
  }

  componentDidUpdate() {
    // Viewing the full document.
    if (this.props.doc) {
      this.div.current.focus();
    }
  }

  render() {
    const {error, today, tags} = this.props;

    return (
      <div id="results">
        <Scroll>
          <div className="container" ref={this.div} tabIndex="0">
            {error && <div className="message error">{error}</div>}
            {today && <Today docs={today}>{doc => (
              <div key={doc.id} onClick={this.onViewDoc(doc.id)}>
                <DocPreview {...doc} visited={this.state.visited[doc.id]} />
              </div>
            )}</Today>}
            {tags && <Tags tags={tags}>{doc => (
              <div key={doc.id} onClick={this.onViewDoc(doc.id)}>
                <DocPreview {...doc} visited={this.state.visited[doc.id]} />
              </div>
            )}</Tags>}
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
  getDashboard: dispatch.elastic.getDashboard,
  getDoc: dispatch.elastic.getDoc
});

export default connect(mapState, mapDispatch)(Dashboard);
