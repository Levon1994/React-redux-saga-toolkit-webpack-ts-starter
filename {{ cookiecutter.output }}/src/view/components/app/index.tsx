import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, useLocation } from 'react-router-dom';

import { MainPage } from '~/view/pages/main';
import { NotFoundPage } from '~/view/pages/not-found';

import styles from './styles.scss';

export const AppComponent: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className={styles['app-wrapper']}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>
  );
};

export const App = hot(() => <AppComponent />);
