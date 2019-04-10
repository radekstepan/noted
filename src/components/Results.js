import React from 'react';
import {connect} from 'react-redux';
import posed, {PoseGroup} from 'react-pose';
import Pagination from 'react-paginating';
import Scroll from 'react-perfect-scrollbar';
import cls from 'classnames';

import Icon from '../components/Icon';
import DocPreview from './DocPreview';

const Animation = posed.div({
  enter: {
    opacity: 1,
    transition: {
      ease: 'easeIn',
      duration: 100
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 50
    }
  }
});

class Results extends React.Component {
  state = {visited: {}};

  div = React.createRef();

  onViewDoc = (id, index) => {
    this.setState({visited: {...this.state.visited, [id]: true}});
    this.props.searchDoc(index + 1);
  };

  componentDidUpdate(prevProps) {
    // Search has changed.
    if (prevProps.q !== this.props.q) {
      this.setState({visited: {}});
    }

    // Page has changed.
    if (prevProps.page !== this.props.page) {
      this.div.current.scrollIntoView();
    }

    // Viewing the full document.
    if (this.props.doc) {
      this.div.current.focus();
    }
  }

  render() {
    const {error, results, q, date, search} = this.props;

    // Success message.
    let message;
    if (results) {
      if (results.total === 1) {
        message = '1 result'
      } else {
        if (results.page !== 1) {
          message = `Page ${results.page} of ${results.total} results`;
        } else {
          message = `${results.total} results`;
        }
      }
    }

    return (
      <div id="results">
        <Scroll>
          <div className="container" ref={this.div} tabIndex="0">
            {error && <div className="message error">{error}</div>}
            {message && <div className={cls('message', {success: message[0] !== '0'})}>{message}</div>}
            <PoseGroup>{results && results.hits.map((doc, index) =>
              <Animation key={doc.id}>
                <div onClick={() => this.onViewDoc(doc.id, index)}>
                  <DocPreview {...doc} visited={this.state.visited[doc.id]} />
                </div>
              </Animation>)}
            </PoseGroup>
            {results && results.pages > 1 && <Pagination
              total={results.total}
              limit={results.limit}
              pageCount="7"
              currentPage={results.page}
            >{d => (
              <div className="pagination">
                <div
                  className={cls('page', {disabled: !d.hasPreviousPage})}
                  onClick={() => d.hasPreviousPage && search({q, date, page: d.currentPage - 1})}
                >
                  <Icon name="left" />
                </div>
                {d.pages.map(page =>
                  <div
                    key={page}
                    className={cls('page', {active: page === d.currentPage})}
                    onClick={() => page !== d.currentPage && search({q, date, page})}
                  >{page}</div>)
                }
                <div
                  className={cls('page', {disabled: !d.hasNextPage})}
                  onClick={() => d.hasNextPage && search({q, date, page: d.currentPage + 1})}
                >
                  <Icon name="right" />
                </div>
              </div>
            )}</Pagination>}
          </div>
        </Scroll>
      </div>
    )
  }
}

const mapState = state => {
  return state.elastic;
};

const mapDispatch = dispatch => ({
  search: dispatch.elastic.search,
  searchDoc: dispatch.elastic.searchDoc,
  closeDoc: dispatch.elastic.closeDoc,
  closeFileUpload: dispatch.files.closeModal
});

export default connect(mapState, mapDispatch)(Results);
