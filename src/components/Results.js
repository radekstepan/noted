import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-paginating';
import cls from 'classnames';

import Icon from '../components/Icon';
import Doc from '../components/Doc';

// TODO animate the results and remove spinner (flash of content)

class Results extends React.Component {
  componentDidUpdate() {
    if (this.props.doc) {
      this.refs.div.focus();
    }
  }

  render() {
    const {error, results, q, search, closeDoc} = this.props;

    return (
      <div id="results" ref="div" tabIndex="0" onKeyDown={e => e.key === 'Escape' && closeDoc()}>
        <div className="container">
          {error && <div className="message error">{error}</div>}
          {results && <div className="message success">{results.total} results found</div>}
          {results && results.hits.map((doc, index) => <Doc
            {...doc}
            index={index}
            key={doc.id}
          />)}
          {results && results.pages > 1 && <Pagination
            total={results.total}
            limit={results.limit}
            pageCount="7"
            currentPage={results.page}
          >{d => (
            <div className="pagination">
              <div
                className={cls('page', {disabled: !d.hasPreviousPage})}
                onClick={() => d.hasPreviousPage && search({q, page: d.currentPage - 1})}
              >
                <Icon name="left" />
              </div>
              {d.pages.map(page =>
                <div
                  key={page}
                  className={cls('page', {active: page === d.currentPage})}
                  onClick={() => page !== d.currentPage && search({q, page})}
                >{page}</div>)
              }
              <div
                className={cls('page', {disabled: !d.hasNextPage})}
                onClick={() => d.hasNextPage && search({q, page: d.currentPage + 1})}
              >
                <Icon name="right" />
              </div>
            </div>
          )}</Pagination>}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return state.elastic;
};

const mapDispatch = dispatch => ({
  search: dispatch.elastic.search,
  closeDoc: dispatch.elastic.closeDoc
});

export default connect(mapState, mapDispatch)(Results);
