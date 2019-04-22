import React from 'react';
import {connect} from 'react-redux';
import debounce from 'debounce';
import {diff} from 'deep-diff';

class Searchbar extends React.Component {
  input = React.createRef();

  search = () =>
    this.props.navigate(`/${encodeURIComponent(this.input.current.value)}`);

  // Change URL on user input.
  onSearch = debounce(this.search, 500);

  // Trigger search through persisted URL.
  componentDidMount() {
    const {query} = this.props;
    this.props.search(query);
  }

  // Trigger search when URL query changes (pagination or user input).
  componentWillUpdate({query}) {
    if (diff(this.props.query, query)) {
      this.props.search(query);
    }
  }

  render() {
    return (
      <div id="searchbar">
        <div className="container">
          <div className="title" onClick={() => this.props.navigate('/')}>Noted</div>
          <input className="input"
            type="text"
            ref={this.input}
            defaultValue={this.props.query.q}
            onChange={this.onSearch}
            onKeyDown={e => (e.key === 'Enter') && this.search()}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </div>
    );
  };
}

const mapState = state => ({
  query: state.router.params,
  doc: state.elastic.doc
});

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate,
  search: dispatch.elastic.search
});

export default connect(mapState, mapDispatch)(Searchbar);
