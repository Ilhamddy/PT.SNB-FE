import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch, useSelector } from "react-redux";


const AuthProtected = (props) => {
  const {userid} = useSelector((state) =>  {
    const user = localStorage.getItem('authUserMandiri')
      ? JSON.parse(localStorage.getItem('authUserMandiri'))
      : null
    
    return {
      userid: state.UserPasien.loginUser?.data?.id || user || null,
    }
  })


  if (!userid) {
    return (
      <Navigate to={{ pathname: "/login/pasien-lama"}} replace/>
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