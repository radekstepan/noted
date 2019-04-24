import React from 'react';

const Tags = props => (
  <div className="section">
    <div className="category">Bookmarks</div>
    {props.tags.map(([tag, docs]) => (
      <div key={tag}>
        <div className="sub">#{tag}</div>
        <div className="grid">
          {docs.map(props.children)}
        </div>
      </div>
    ))}
  </div>
);

export default Tags;
