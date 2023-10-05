import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

//Layouts
// import NonAuthLayout from '../Layouts/NonAuthLayout'

//routes
import { publicRoutes, protectedRoutes } from './allRoutes.js'
import { ToastContainer } from 'react-toastify'
import { setAuthorization } from '../helpers/api_helper.js'
import { getUserLogin } from '../store/actions.js'
import { useDispatch } from 'react-redux'
import { AuthProtected } from './AuthProtected.js'

const Index = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('authUserMandiri')
      ? JSON.parse(localStorage.getItem('authUserMandiri'))?.accessToken
      : null

    dispatch(getUserLogin())
    setAuthorization(token)
  }, [dispatch, location])
  return (
    <React.Fragment>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
        <Route>
          {protectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<AuthProtected>{route.component}</AuthProtected>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default Index
