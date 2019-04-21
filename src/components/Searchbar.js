import React from 'react';
import {connect} from 'react-redux';
import cls from 'classnames';
import debounce from 'debounce';
import {diff} from 'deep-diff';

class Searchbar extends React.Component {
  input = React.createRef();

  // Change URL on user input.
  onSearch = debounce(() =>
    this.props.navigate(`/${encodeURIComponent(this.input.current.value)}`)
  , 500);

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
      <div id="searchbar" className={cls({white: this.props.doc})}>
        <div className="container">
          <div className="title" onClick={() => this.props.navigate('/')}>Noted</div>
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

const mapState = state => ({
  query: state.router.params,
  doc: state.elastic.doc
});

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate,
  search: dispatch.elastic.search
});

export default connect(mapState, mapDispatch)(Searchbar);
