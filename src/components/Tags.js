import React from 'react';

import DocPreview from './DocPreview';

const Tags = ({tags}) => (
  <div className="section">
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
);

export default Tags;
