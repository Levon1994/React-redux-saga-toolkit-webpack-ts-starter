import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const Image = ({
  path,
  width,
  height,
  className,
  ...restProps
}) => {
  <img
    src={path}
    width={width}
    height={height}
    className={classnames('Image', className)}
    {...restProps}
  />
};

Image.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  path: '',
  width: 230,
  height: 230,
  className: '',
};

export default Image;
