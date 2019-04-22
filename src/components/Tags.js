import React from 'react';

const Tags = ({tags, children}) => (
  <div className="section">
    <div className="category">Bookmarks</div>
    {tags.map(([tag, docs]) => (
      <div key={tag}>
        <div className="sub">#{tag}</div>
        <div className="flex">
          {docs.map(children)}
        </div>
      </div>
    ))}
  </div>
);

export default Tags;
