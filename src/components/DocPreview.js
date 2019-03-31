import React from 'react';
import cls from 'classnames';

const score = score => score ? parseInt(score, 10) : null;

const html = body => Array.isArray(body) ? body.join('&hellip; ') : body;

const DocPreview = props => (
  <div className={cls('doc', {visited: props.visited})}>
    <div className="header">
      <div className="title">{props.filename}</div>
      <div className={cls('score', {high: props.score >= 20})}>{score(props.score)}</div>
    </div>
    <div className="body" dangerouslySetInnerHTML={{__html: html(props.body)}} />
  </div>
);

export default DocPreview;
