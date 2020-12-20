import React from 'react';

export default function Spinner() {
    return (<span className="spinner">
    <svg  style ={{margin: 'auto', opacity: 1,  display: 'block', shapeRendering: 'auto'}} width="50px" height="50px"
         viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#d88c51" strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none" strokeLinecap="round">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1"
                    values="0 50 50;360 50 50"/>
</circle></svg> </span>);
}

