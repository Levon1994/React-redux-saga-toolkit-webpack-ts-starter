import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from 'components';

import { noop } from 'utils';

import './index.scss';

const textFieldTypeEnum = {
  textType: 'text',
  passwordType: 'password',
};

const TextField = ({
  type,
  value,
  label,
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
  const { textType, passwordType } = textFieldTypeEnum;
  const [fieldType, setFieldType] = useState(type);

  const onToggleType = () => {
    const newType = fieldType === textType ? passwordType : textType;
    setFieldType(newType);
  };

  return (
    <div className={classnames('TextField', className)}>
      {label && <div className="label">{label}</div>}
      {withShowPassIcon && type === passwordType &&
        <Icon
          name="showPass"
          onClick={onToggleType}
        />
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
               className={classnames('textfield-holder', {
                 'show-pass': withShowPassIcon && type === passwordType
               })}
               type={fieldType}
               onChange={onChange}
               {...restProps}
             />
        }
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
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
