import React from 'react';
import {connect} from 'react-redux';
import Scroll from 'react-perfect-scrollbar';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import Icon from '../components/Icon';

TimeAgo.addLocale(en);
// const ta = new TimeAgo('en-US');

class DocModal extends React.Component {
  div = React.createRef();

  onPrevent = e => e.preventDefault();

  componentDidMount() {
    this.div.current.addEventListener('mousewheel', this.onPrevent);
  }

  componentWillUnmount() {
    this.div.current.removeEventListener('mouswheel', this.onPrevent);
  }

  render() {
    const {doc, closeDoc} = this.props;

    return (
      <div ref={this.div}>
        {doc && <div id="modal" onMouseDown={closeDoc}>
          <div className="overlay">
            <div className="container">
              <div className="modal" onMouseDown={e => e.stopPropagation()}>
                <div className="header">
                  <div className="title">{doc.filename}</div>
                  <div className="button" onClick={closeDoc}>
                    <Icon name="close" />
                  </div>
                </div>
                <Scroll className="body">
                  <div dangerouslySetInnerHTML={{__html: doc.body[0]}} />
                </Scroll>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

const mapState = state => ({
  doc: state.elastic.doc
});

const mapDispatch = dispatch => ({
  closeDoc: dispatch.elastic.closeDoc
});

export default connect(mapState, mapDispatch)(DocModal);
