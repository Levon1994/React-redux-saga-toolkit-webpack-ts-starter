import React from 'react';
import {
  Route,
  Switch,
  NavLink,
  Redirect,
  withRouter,
} from 'react-router-dom';

import {
  Main,
  Login,
  QRCode,
} from 'containers';

import { Button, TextField, Icon } from 'components';

import './index.scss';

const App = () => {
  return (
    <main className="App flexible vertical grow">
      <div className="flexible aCenter" style={{ padding: 20 }}>
        <NavLink to="/main" style={{ marginRight: 15 }}>
          <Button>Main</Button>
        </NavLink>
        <NavLink to="/login" style={{ marginRight: 15 }}>
          <Button>Login</Button>
        </NavLink>
        <NavLink to="/qr-code">
          <Button>QR Code</Button>
        </NavLink>
      </div>
      <div className="flexible vertical aCenter grow jCenter">
        <Switch>
            <Route exact path="/main" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/qr-code" component={QRCode} />
            <Redirect from="/" to="/main" />
        </Switch>
      </div>
    </main>
  )
};

export default withRouter(App);
