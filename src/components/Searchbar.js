import React from 'react';
import {connect} from 'react-redux';
import cls from 'classnames';
import debounce from 'debounce';

class Searchbar extends React.Component {
  input = React.createRef();

  onSearch = debounce(evt =>
    this.props.search({q: this.input.current.value})
  , 500);

  componentDidMount() {
    const {query} = this.props;

    // Persist search through URL.
    this.props.search(query);
  }

  render() {
    return (
      <div id="searchbar" className={cls({white: this.props.doc})}>
        <div className="container">
          <div className="title" onClick={() => this.props.search()}>Noted</div>
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
  query: state.router.query,
  doc: state.elastic.doc
});

const mapDispatch = dispatch => ({
  search: dispatch.elastic.search
});

export default connect(mapState, mapDispatch)(Searchbar);
