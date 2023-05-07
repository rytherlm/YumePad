import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const LoginRegister = () => {
  const { url } = useRouteMatch();

  return (
    <div>
      <h1>Welcome to My Website</h1>
      <nav>
        <ul>
          <li>
            <Link to={`${url}/login`}>Login</Link>
          </li>
          <li>
            <Link to={`${url}/register`}>Register</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path={url}>
          <p>Please select Login or Register above.</p>
        </Route>
        <Route path={`${url}/login`}>
          <LoginForm />
        </Route>
        <Route path={`${url}/register`}>
          <RegistrationForm />
        </Route>
      </Switch>
    </div>
  );
};

export default LoginRegister;
