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
    case 'close':
      return (
        <svg className="icon close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16.043,11.667L22.609,5.1c0.963-0.963,0.963-2.539,0-3.502l-0.875-0.875c-0.963-0.964-2.539-0.964-3.502,0L11.666,7.29  L5.099,0.723c-0.962-0.963-2.538-0.963-3.501,0L0.722,1.598c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.539,0,3.501l0.876,0.875c0.963,0.963,2.539,0.963,3.501,0l6.567-6.565l6.566,6.565  c0.963,0.963,2.539,0.963,3.502,0l0.875-0.875c0.963-0.963,0.963-2.539,0-3.501L16.043,11.667z"/>
        </svg>
      );
    case 'upload':
      return (
        <svg className="icon upload" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <path d="M16,6 L12.75,9.25 L12,8.5 L16.5,4 L21,8.5 L20.25,9.25 L17,6 L17,17 L16,17 L16,6 L16,6 Z M18,12 L23.4000244,12 L27.7750244,19 L21,19 L21,21.0020869 C21,22.1017394 20.1057373,23 19.0026083,23 L13.9973917,23 C12.8958578,23 12,22.1055038 12,21.0020869 L12,19 L5.22497559,19 L9.59997559,12 L15,12 L15,11 L9,11 L4,19 L4,19.5 L4,28 L29,28 L29,19.5 L29,19 L24,11 L18,11 L18,12 L18,12 L18,12 Z M22,20 L28,20 L28,27 L5,27 L5,20 L11,20 L11,21.5 C11,22.8807119 12.1152735,24 13.4960703,24 L19.5039297,24 C20.8824713,24 22,22.8903379 22,21.5 L22,20 L22,20 L22,20 Z"/>
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
