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
    window.removeEventListener('dragenter', this.show);
  }

  render() {
    return (
      <div id="upload" className={cls({show: this.state.show})}>
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps}) => (
            <div className="overlay">
              <div className="modal" {...getRootProps()}>
                <div className="button" onClick={this.onHide}>
                  <Icon name="close" />
                </div>
                <Icon name="upload" />
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
