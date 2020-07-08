import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const Image = ({
  alt,
  path,
  width,
  height,
  className,
  ...restProps
}) => (
  <img
    alt={alt}
    src={path}
    width={width}
    height={height}
    className={classnames('Image', className)}
    {...restProps}
  />
);

Image.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  alt: '',
  path: '',
  width: 230,
  height: 230,
  className: '',
};

export default Image;
