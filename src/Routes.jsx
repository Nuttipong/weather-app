import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoadingScreen from './components/loading/LoadingScreen';
import WeatherScreen from './components/weather/WeatherScreen';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/loading" />
      </Route>
      <Route exact path="/loading" component={LoadingScreen} />
      <Route exact path="/weather" component={WeatherScreen} />
    </Switch>
  );
};