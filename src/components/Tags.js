import React from 'react';
import {connect} from 'react-redux';
import Scroll from 'react-perfect-scrollbar';

import DocPreview from './DocPreview';

class Tags extends React.Component {

  componentDidMount() {
    // Fetch tags onload.
    this.props.getTags();
  }

  render() {
    const {error, tags} = this.props;

    return (
      <div id="results">
        <Scroll>
          <div className="container">
            {error && <div className="message error">{error}</div>}
            {tags && (
              <div>
                <div className="category">Bookmarks</div>
                {tags.map(([tag, docs]) => (
                  <div key={tag}>
                    <div className="sub">#{tag}</div>
                    <div className="flex">
                      {docs.map(doc =>
                        <DocPreview key={doc.id} {...doc} visited={false} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Scroll>
      </div>
    )
  }
}

const mapState = state => ({
  tags: Object.entries(state.elastic.tags.reduce((tags, doc) => {
    doc.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(doc);
    });
    return tags;
  }, {})).sort(([a], [b]) => a < b ? -1 : 1)
});

const mapDispatch = dispatch => ({
  getTags: dispatch.elastic.getTags
});

export default connect(mapState, mapDispatch)(Tags);
