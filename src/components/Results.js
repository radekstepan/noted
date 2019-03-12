import React from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';
import Doc from '../components/Doc';

const Results = props => (
  <div id="results">
    <div className="container">
      {props.loading && <Icon name="spinner" />}
      {props.error && <div className="message error">{props.error}.</div>}
      {props.results && <div className="message success">{props.results.total} results found.</div>}
      {props.results && props.results.hits.map(doc => <Doc
        {...doc}
        key={doc.id}
      />)}
      <div className="pagination">
        <div className="page disabled"><Icon name="left" /></div>
        <div className="page">1</div>
        <div className="page active">2</div>
        <div className="page">3</div>
        <div className="page">4</div>
        <div className="page">5</div>
        <div className="page"><Icon name="right" /></div>
      </div>
    </div>
  </div>
);

const mapState = state => {
  const {elastic: {results}} = state;
  return {results};
};

export default connect(mapState, null)(Results);
