import React from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import cls from 'classnames';

import Icon from '../components/Icon';

class FileUpload extends React.Component {

  onShow = () => {
    this.props.closeDoc();
    this.props.showModal();
  };

  onHide = () => this.props.closeModal();

  componentDidMount() {
    window.addEventListener('dragenter', this.onShow);
  }

  componentWillUnmount() {
    window.removeEventListener('dragenter', this.onShow);
  }

  render() {
    const {upload, count, error, uploading, show} = this.props;

    let message;
    if (uploading) {
      message = <>Indexing &hellip;</>;
    } else {
      if (error) {
        message = error;
      } else if (count) {
        message = `Indexed ${count} document${count > 1 ? 's' : ''}`
      } else {
        message = 'Drop your documents here';
      }
    }

    return (
      <div id="upload" className={cls({show})} onMouseDown={this.onHide}>
        <Dropzone onDrop={upload}>
          {({getRootProps}) => (
            <div className="overlay">
              <div className="modal" {...getRootProps()} onMouseDown={e => e.stopPropagation()}>
                <div className="button" onClick={this.onHide}>
                  <Icon name="close" />
                </div>
                <div className={cls('body', {error, success: !!count})}>
                  <Icon name="upload" />
                  <div className="message">{message}</div>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

const mapState = state => {
  return state.files;
};

const mapDispatch = dispatch => ({
  upload: dispatch.files.upload,
  showModal: dispatch.files.showModal,
  closeModal: dispatch.files.closeModal,
  closeDoc: dispatch.elastic.closeDoc
});

export default connect(mapState, mapDispatch)(FileUpload);
