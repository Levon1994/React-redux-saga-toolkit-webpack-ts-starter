import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { noop } from 'utils';

import './index.scss';

const textFieldTypeEnum = {
  passwordType: 'password',
};

const TextField = ({
  type,
  value,
  title,
  required,
  onChange,
  textarea,
  errorText,
  className,
  withRadius,
  placeholder,
  textareaRows,
  withShowPassIcon,
  ...restProps
}) => {
  const { passwordType } = textFieldTypeEnum;

  return (
    <div className={classnames('TextField', className)}>
      {title && <div className="title">{title}</div>}
      {withShowPassIcon && type === passwordType &&
        <div></div>
      }
        {
          textarea
           ? <textarea
                className="textfield-holder"
                placeholder={placeholder}
                rows={textareaRows}
                onChange={onChange}
                {...restProps}
             />
           : <input
               placeholder={placeholder}
               className="textfield-holder"
               type={type}
               onChange={onChange}
               {...restProps}
             />
        }
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  )
};

TextField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  textareaRows: PropTypes.number,
};

TextField.defaultProps = {
  value: '',
  title: null,
  type: 'text',
  className: '',
  onChange: noop,
  errorText: null,
  textareaRows: 3,
  placeholder: null,
};

export default TextField;
