import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Button = ({ className, label, children, ...otherProps }) => (
  <div className={className || ''}>
    <RaisedButton label={ label } {...otherProps}>{children}</RaisedButton>
  </div>
);

export default Button;
