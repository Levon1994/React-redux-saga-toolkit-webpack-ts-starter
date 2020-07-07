import React from 'react';

import { Button, TextField, Icon } from 'components';

import './index.scss';

const App = () => {
  return (
    <main className="App">
      <Button style={{ marginBottom: 30 }}>
        Login
      </Button>
      <TextField
        label="hello"
        type="password"
        withShowPassIcon
      />
      <Icon name="logo"/>
    </main>
  )
};

export default App;
