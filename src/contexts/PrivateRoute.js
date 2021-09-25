import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...rest} render={() => children} />;
}
