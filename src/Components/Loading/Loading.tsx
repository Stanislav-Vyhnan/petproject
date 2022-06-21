import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="spinner-box">
      <div className="circle-border">
        <div className="circle-core" />
      </div>
    </div>
  );
};

export default Loading;
