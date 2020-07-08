import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { iconsList } from './IconsList';

const Icon = ({
  alt,
  name,
  className,
  ...restProps
}) => (
  <img
   className={classnames('Icon',className)}
   src={iconsList[name]}
   alt={alt || name}
   {...restProps}
  />
);

Icon.propTypes = {
  alt: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  name: 'logo',
};

export default Icon;
