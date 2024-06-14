import React, { useEffect } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { setAuthorization } from 'frontendjs/src/helpers/api_helper'
import { useDispatch } from 'react-redux'

import { useProfile } from 'frontendjs/src/Components/Hooks/UserHooks'

import { logoutUser } from 'frontendjs/src/store/actions'
const AuthProtected = (props) => {
  const { userProfile, token } = useProfile()

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && !token) {
    return (
      <Navigate
        to={{ pathname: '/login', state: { from: props.location } }}
      />
    )
  }

  return <>{props.children}</>
}

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {' '}
            <Component {...props} />{' '}
          </>
        )
      }}
    />
  )
}

export { AuthProtected, AccessRoute }
