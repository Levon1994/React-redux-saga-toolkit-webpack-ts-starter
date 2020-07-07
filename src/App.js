import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

import {
  Login,
  QRCode,
  Scanner,
} from 'containers';

import './index.scss';

const App = () => {
  return (
    <main className="App flexible vertical grow">
      <div className="flexible vertical aCenter grow jCenter">
        <Switch>
            <Route exact path="/scanner" component={Scanner} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/qr-code" component={QRCode} />
            <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </main>
  )
};

export default withRouter(App);
