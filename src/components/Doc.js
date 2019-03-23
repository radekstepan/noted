import React from 'react';
import {connect} from 'react-redux';
import cls from 'classnames';

class Doc extends React.Component {
  state = {visited: false};

  onViewDoc = () => {
    this.setState({visited: true});
    this.props.searchDoc(this.props.index);
  }

  render() {
    const {props, state} = this;

    return (
      <div className={cls('doc', {visited: state.visited})} onClick={this.onViewDoc}>
        <div className="header">
          <div className="title">{props.path}</div>
          <div className={cls('score', {high: props.score >= 20})}>{parseInt(props.score, 10)}</div>
        </div>
        <div className="body" dangerouslySetInnerHTML={{__html: props.body.join('&hellip; ')}} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  searchDoc: dispatch.elastic.searchDoc
});

export default connect(null, mapDispatch)(Doc);
