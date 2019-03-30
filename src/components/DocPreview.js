import React from 'react';
import cls from 'classnames';

const DocPreview = props => (
  <div className={cls('doc', {visited: props.visited})}>
    <div className="header">
      <div className="title">{props.filename}</div>
      <div className={cls('score', {high: props.score >= 20})}>{parseInt(props.score, 10)}</div>
    </div>
    <div className="body" dangerouslySetInnerHTML={{__html: props.body.join('&hellip; ')}} />
  </div>
);

export default DocPreview;
