import React from 'react';

import {
  Icon,
  Button,
  TextField,
} from 'components';

import './index.scss';

const Login = () => {
  return (
    <div className="Login flexible vertical aCenter">
      <Icon width={130} name="logoWithTitle"/>
      <div className="title">Manager Login</div>
      <div className="form-group">
        <TextField
          label="Email"
          autoComplete="off"
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="off"
          withShowPassIcon
        />
        <Button>Login</Button>
      </div>
    </div>
  )
};

export default Login;
