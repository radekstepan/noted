import React from 'react';
import {connect} from 'react-redux';
import debounce from 'debounce';

class Searchbar extends React.Component {
  onSearch = debounce(evt => {
    const {target: {value: q}} = evt;
    this.props.search({q});
  }, 500);

  componentDidMount() {
    // Persist search through URL.
    this.props.search(this.props.query);
  }

  render() {
    return (
      <div id="searchbar">
        <div className="container">
          <div className="title">Noted<span>.</span></div>
          <input className="input"
            type="text"
            ref='input'
            placeholder={this.props.query.q}
            onChange={evt => !evt.persist() && this.onSearch(evt)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </div>
    );
  };
}

const mapState = state => {
  return state.router;
};

const mapDispatch = dispatch => ({
  search: dispatch.elastic.search
});

export default connect(mapState, mapDispatch)(Searchbar);
