import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { noop } from 'utils';

import './index.scss';

const Button = ({
  children,
  className,
  ...restProps
}) => (
  <button
    className={classnames('Button', className)}
    {...restProps}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  onClick: noop,
  children: null,
};

export default Button;
