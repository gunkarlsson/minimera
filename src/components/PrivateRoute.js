import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as ROUTES from "../constants/routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  //we get the component from the current route, then rename it to Component
  //...rest = then all the other properties will be there
  const { currentUser } = useAuth();

  return (
    <div>
      <Route
        //   the route takes in the rest of the props, then we define our own render
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={ROUTES.LOG_IN} />
          );
        }}
      ></Route>
    </div>
  );
}
