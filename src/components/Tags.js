import React from 'react';
import {lower} from 'to-case';

const Tags = props => (
  <div className="section">
    <div className="category">Bookmarks</div>
    {props.tags.map(([tag, docs]) => (
      <div key={tag}>
        <div className="sub" onClick={() => props.search(lower(tag))}>#{tag}</div>
        <div className="grid">
          {docs.map(props.children)}
        </div>
      </div>
    ))}
  </div>
);

export default Tags;
