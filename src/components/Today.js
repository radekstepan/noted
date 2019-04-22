import React from 'react';

const Today = ({docs, children}) => (
  <div className="section">
    <div className="category">On this day &hellip;</div>
    <div className="grid">
      {docs.map(children)}
    </div>
  </div>
);

export default Today;
