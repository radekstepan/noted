import React from 'react';
import {connect} from 'react-redux';
import cls from 'classnames';
import Dropzone from 'react-dropzone';

import Icon from '../components/Icon';

class FileUpload extends React.Component {

  state = {show: false};

  onShow = () => this.setState({show: true});

  onHide = () => this.setState({show: false});

  componentDidMount() {
    window.addEventListener('dragenter', this.onShow);
  }

  componentWillUnmount() {
    window.removeEventListener('dragenter', this.onShow);
  }

  render() {
    const {count, error, uploading} = this.props;

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
      <div id="upload" className={cls({show: this.state.show})}>
        <Dropzone onDrop={this.props.upload}>
          {({getRootProps}) => (
            <div className="overlay">
              <div className="modal" {...getRootProps()}>
                <div className="button" onClick={this.onHide}>
                  <Icon name="close" />
                </div>
                <div className="body">
                  <Icon name="upload" />
                  <div className={cls('message', {error})}>{message}</div>
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
  upload: dispatch.files.upload
});

export default connect(mapState, mapDispatch)(FileUpload);
