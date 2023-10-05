import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch, useSelector } from "react-redux";


const AuthProtected = (props) => {
  const {userid} = useSelector((state) => ({
    userid: state.Login.loginUser?.data?.id || null,
  }))

  if (!userid) {
    return (
      <Navigate to={{ pathname: "/login/pasien-lama"}} />
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