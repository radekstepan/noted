import React from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';

const Searchbar = props => (
  <div id="searchbar">
    <div className="container">
      <div className="title">Noted<span>.</span></div>
      <input className="input"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
      <div className="button">
        <div className="icon">
          <Icon name="search" />
        </div>
      </div>
    </div>
  </div>
);

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(null, mapDispatch)(Searchbar);
