import React from 'react';
import {connect} from 'react-redux';

import Searchbar from '../components/Searchbar';
import Results from '../components/Results';
import DocModal from '../components/DocModal';
import FileUpload from '../components/FileUpload';

class Dashboard extends React.Component {

  closeModals = () => {
    this.props.closeDoc();
    this.props.closeFileUpload();
  };

  render() {
    return (
      <div id="main" onKeyDown={e => e.key === 'Escape' && this.closeModals()}>
        <FileUpload />
        <DocModal />
        <Searchbar />
        <Results />
      </div>
    );
  };
}

const mapDispatch = dispatch => ({
  closeDoc: dispatch.elastic.closeDoc,
  closeFileUpload: dispatch.files.closeModal
});

export default connect(null, mapDispatch)(Dashboard);
