import React from 'react';
import {connect} from 'react-redux';
import debounce from 'debounce';

class Searchbar extends React.Component {
  input = React.createRef();

  onSearch = debounce(evt =>
    this.props.search({q: this.input.current.value})
  , 500);

  goHome = () => {
    this.props.search({q: this.props.query.q, page: 1});
  };

  componentDidMount() {
    // Persist search through URL.
    this.props.search(this.props.query);
  }

  render() {
    return (
      <div id="searchbar">
        <div className="container">
          <div className="title" onClick={this.goHome}>Noted<span>.</span></div>
          <input className="input"
            type="text"
            ref={this.input}
            defaultValue={this.props.query.q}
            onChange={this.onSearch}
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
