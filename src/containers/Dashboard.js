import React from 'react';
import {connect} from 'react-redux';

import FileUpload from '../components/FileUpload';
import DocModal from '../components/DocModal';
import Searchbar from '../components/Searchbar';
import Tags from '../components/Tags';
// import Results from '../components/Results';

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
        <Tags />
        {/*<Results />*/}
      </div>
    );
  };
}

const mapDispatch = dispatch => ({
  closeDoc: dispatch.elastic.closeDoc,
  closeFileUpload: dispatch.files.closeModal
});

export default connect(null, mapDispatch)(Dashboard);
