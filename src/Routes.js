import React from 'react';
import { Switch, Route, AppliedRoute, appProps } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
export default function Routes() {
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />

      </Switch>
    );
  }