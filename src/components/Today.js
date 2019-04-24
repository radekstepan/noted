import React from 'react';

const Today = props => (
  <div className="section">
    <div className="category">On this day &hellip;</div>
    <div className="grid">
      {props.docs.map(props.children)}
    </div>
  </div>
);

export default Today;
