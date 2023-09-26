import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../hooks/user";

import { logoutUser } from "../store/actions";
import { useCheckActivity } from "../utils/auth";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useProfile();

  useCheckActivity();

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && !loading) {
    return (
      <Navigate to={{ pathname: "/login-based", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };