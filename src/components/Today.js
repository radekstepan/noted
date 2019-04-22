import React from 'react';

import DocPreview from './DocPreview';

const Today = ({docs}) => (
  <div className="section">
    <div className="category">On this day &hellip;</div>
    {docs.map(doc =>
      <DocPreview key={doc.id} {...doc} visited={false} />
    )}
  </div>
);

export default Today;
