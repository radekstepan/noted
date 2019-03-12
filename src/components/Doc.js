import React from 'react';
import {connect} from 'react-redux';

class Doc extends React.Component {
  state = {visited: false};

  onViewDoc = () => {
    this.setState({visited: true});
    this.props.navigate(`/doc/${this.props.id}`)
  }

  render() {
    const {props, state} = this;

    return (
      <div className={`doc ${state.visited ? 'visited' : ''}`} onClick={this.onViewDoc}>
        <div className="header">
          <div className="title">{props.path}</div>
          <div className={`score ${props.score >= 20 && 'high'}`}>{parseInt(props.score, 10)}</div>
        </div>
        <div className="body" dangerouslySetInnerHTML={{__html: props.body.join('&hellip; ')}} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(null, mapDispatch)(Doc);
