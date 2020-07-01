import React from 'react';

const WeekProgress = (props) => (
  <div className="progress-w-percent">
    <h5 className="mb-1 mt-0 ">{props.day}</h5>
    <div className="progress progress-sm">
      <div className="progress-bar bg-success" role="progressbar" style={{ width: `${props.value}%` }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" />
    </div>
    <span className="progress-value font-weight-bold">{props.value}</span>
  </div>
);

export default WeekProgress;
