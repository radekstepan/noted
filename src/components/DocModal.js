import React from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';

// TODO fix scroll issue when modal shows up
class DocModal extends React.Component {
  componentDidMount() {
    this.refs.div.focus();
  }

  render() {
    const {doc} = this.props;

    return (
      <div
        ref="div"
        tabIndex="0"
        id="modal"
        onClick={this.props.closeModal}
        onKeyDown={e => e.key === 'Escape' && this.props.closeModal()}
      >
        <div className="overlay">
          <div className="container">
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="header">
                <div className="title">{doc.path}</div>
                <div className="button">
                  <Icon name="close" />
                </div>
              </div>
              <div className="body" dangerouslySetInnerHTML={{__html: doc.body[0]}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  closeModal: () => dispatch.elastic.set({doc: null})
});

export default connect(null, mapDispatch)(DocModal);
