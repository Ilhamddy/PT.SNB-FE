import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

//routes
import { protectedRoutes, publicRoutes } from './allRoutes'
import { AuthProtected } from './AuthProtected'
import { ToastContainer } from 'react-toastify'

const Index = () => {
  return (
    <React.Fragment>
      <ToastContainer autoClose={3000} closeButton={false} />
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
