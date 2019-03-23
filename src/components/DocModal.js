import React from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';

const DocModal = props => {
  if (!props.doc) return false;

  return (
    <div id="modal" onClick={props.closeDoc}>
      <div className="overlay">
        <div className="container">
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="header">
              <div className="title">{props.doc.path}</div>
              <div className="button" onClick={props.closeDoc}>
                <Icon name="close" />
              </div>
            </div>
            <div className="body" dangerouslySetInnerHTML={{__html: props.doc.body[0]}} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  doc: state.elastic.doc
});

const mapDispatch = dispatch => ({
  closeDoc: dispatch.elastic.closeDoc
});

export default connect(mapState, mapDispatch)(DocModal);
