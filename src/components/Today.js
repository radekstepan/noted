import React from 'react';

const Today = ({docs, children}) => (
  <div className="section">
    <div className="category">On this day &hellip;</div>
    {docs.map(children)}
  </div>
);

export default Today;
