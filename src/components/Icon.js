import React from 'react';

const Icon = props => {
  switch (props.name) {
    case 'search':
      return (
        <svg className="icon search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M22.4,19.6l-4.8-4.8c0.9-1.4,1.4-3,1.4-4.8c0-5-4-9-9-9s-9,4-9,9s4,9,9,9c1.8,0,3.4-0.5,4.8-1.4l4.8,4.8   c0.4,0.4,0.9,0.6,1.4,0.6c1.1,0,2-0.9,2-2C23,20.4,22.8,19.9,22.4,19.6z M5,10c0-2.8,2.2-5,5-5s5,2.2,5,5s-2.2,5-5,5S5,12.8,5,10z"></path>
        </svg>
      );
    case 'spinner':
      return (
        <svg className="icon spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" stroke="#000" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" transform="rotate(323.713 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform>
          </circle>
        </svg>
      );
    case 'left':
      return (
        <svg className="icon left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z"/>
          <path d="M0-.5h48v48h-48z" fill="none"/>
        </svg>
      );
    case 'right':
      return (
        <svg className="icon left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"/>
          <path d="M0-.25h48v48h-48z" fill="none"/>
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
