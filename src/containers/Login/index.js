import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  BusyLoader,
} from 'components';

import { loginToAdmin } from 'actions/user';
import { useTranslator } from 'utils/translator';

import './style.scss';

const mapStateToProps = ({ login }) => ({ login });

const Login = ({
  login,
  loginToAdmin,
}) => {

  const { t } = useTranslator();

  const [filter, setFilter] = useState({ email: null, password: null });
  const [isBusy, setIsBusy] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({ ...filter , [name]: value  });
  };

  const onSave = () => {
    setIsBusy(true);
    loginToAdmin(filter).then(res => {
      if(res.status >= 299) {
        setIsBusy(false);
        setErrorText(true);
      }
    });
  };

  return (
    <div className="auth-box-w animated slideInDown">
      <div className="logo-w">
        <a href="index.html"><img alt="" src="" /></a>
      </div>
      <h4 className="auth-header">
        Login To System
      </h4>
      <BusyLoader isBusy={isBusy}>
        <div className="form">
          <div className="form-group">
            <label htmlFor="">{t('_Username_')}</label>
            <input
              className="form-control"
              placeholder="Enter your username"
              type="text"
              name="email"
              onChange={handleChange}
            />
            <div className="pre-icon os-icon os-icon-user-male-circle"></div>
          </div>
          <div className="form-group">
            <label htmlFor="">{t('_Password_')}</label>
            <input
              className="form-control"
              placeholder="Enter your password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <div className="pre-icon os-icon os-icon-fingerprint"></div>
          </div>
          <div className="buttons-w flexible jBetween">
            <button className="btn btn-primary" onClick={onSave}>{t('_SignIn_')}</button>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                />
                Remember Me
             </label>
            </div>
          </div>
        </div>
      </BusyLoader>
    </div>
  )
};

export default connect(mapStateToProps, {
  loginToAdmin
})(Login);


// <Modal classNameName="Login" forLogin>
//   <BusyLoader isBusy={isBusy}>
//   </BusyLoader>
// </Modal>
