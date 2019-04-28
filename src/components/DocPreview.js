import React from 'react';
import cls from 'classnames';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const ta = new TimeAgo('en-US');

const score = score => score ? parseInt(score, 10) : null;

const DocPreview = props => (
  <div className={cls('doc', {visited: props.visited})}>
    <div className="date" title={props.date.substr(0, 10)}>{ta.format(new Date(props.date))}</div>
    <div className="header">
      <div className="title">{props.title}</div>
      <div className={cls('score', {high: props.score >= 20})}>{score(props.score)}</div>
    </div>
    <div className="body" dangerouslySetInnerHTML={{__html: props.body}} />
  </div>
);

export default DocPreview;
