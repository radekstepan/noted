import React from 'react';
import {connect} from 'react-redux';

import history from './history';
import routes from './routes';

import FileUpload from './components/FileUpload';
import DocModal from './components/DocModal';
import Searchbar from './components/Searchbar';

class App extends React.Component {

  closeModals = () => {
    this.props.closeDoc();
    this.props.closeFileUpload();
  };

  componentDidMount() {
    // Watch route changes (allows back-button etc.).
    history.listen(location => this.props.route(location));
  }

  render() {
    return (
      <div id="main" onKeyDown={e => e.key === 'Escape' && this.closeModals()}>
        <FileUpload />
        <DocModal />
        <Searchbar />
        {this.props.render(this.props.state)}
      </div>
    );
  }
}

const mapState = state => ({
  state,
  render: routes[state.router.index].render
});

const mapDispatch = dispatch => ({
  route: dispatch.router.route,
  closeDoc: dispatch.elastic.closeDoc,
  closeFileUpload: dispatch.files.closeModal
});

export default connect(mapState, mapDispatch)(App);
