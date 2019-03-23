import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-paginating';
import cls from 'classnames';

import Icon from '../components/Icon';
import Doc from '../components/Doc';

// TODO animate the results and remove spinner (flash of content)
const Results = props => (
  <div id="results">
    <div className="container">
      {props.error && <div className="message error">{props.error}</div>}
      {props.results && <div className="message success">{props.results.total} results found</div>}
      {props.results && props.results.hits.map((doc, index) => <Doc
        {...doc}
        index={index}
        key={doc.id}
      />)}
      {props.results && props.results.pages > 1 && <Pagination
        total={props.results.total}
        limit={props.results.limit}
        pageCount="7"
        currentPage={props.results.page}
      >{d => (
        <div className="pagination">
          <div
            className={cls('page', {disabled: !d.hasPreviousPage})}
            onClick={() => d.hasPreviousPage && props.search({q: props.q, page: d.currentPage - 1})}
          >
            <Icon name="left" />
          </div>
          {d.pages.map(page =>
            <div
              key={page}
              className={cls('page', {active: page === d.currentPage})}
              onClick={() => page !== d.currentPage && props.search({q: props.q, page})}
            >{page}</div>)
          }
          <div
            className={cls('page', {disabled: !d.hasNextPage})}
            onClick={() => d.hasNextPage && props.search({q: props.q, page: d.currentPage + 1})}
          >
            <Icon name="right" />
          </div>
        </div>
      )}</Pagination>}
    </div>
  </div>
);

const mapState = state => {
  return state.elastic;
};

const mapDispatch = dispatch => ({
  search: dispatch.elastic.search
});

export default connect(mapState, mapDispatch)(Results);
