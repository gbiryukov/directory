import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import 'styles/base.css';
import { Employees } from 'pages/Employees/Employees';
import { ROUTE } from 'utils/routes';
import { createClient } from 'utils/client';

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={createClient()}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={ROUTE.employees} component={Employees} />
          <Redirect path="*" to={ROUTE.employees} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
