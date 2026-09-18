import React from 'react';

export const Card = ({
  children,
  className = '',
  _elevation = 'surface', // 'surface' | 'container' | 'low'
  ...props
}) => {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`.trim()} {...props}>
    {children}
  </div>
);
