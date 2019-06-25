import React from 'react';
import Home from './components/Home';
import NotFound from './components/NotFound'
import CharacterDetails from './containers/CharacterDetails';
import FirstPage from './components/firsPage'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

function AppContainer() {
  return (
    <HashRouter>
      <Switch>
        <Route
            exact
            path="/"
            render={() => (
                <Redirect to="/" />
            )}
        />
        <Route exact path="/Employees" component={FirstPage}/>
        <Route exact path="/Achievements" component={NotFound}/>
        <Route exact path="/prizes" component={Home} />
        <Route exact path="/prizes/:id" component={CharacterDetails} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
}

export default AppContainer;
