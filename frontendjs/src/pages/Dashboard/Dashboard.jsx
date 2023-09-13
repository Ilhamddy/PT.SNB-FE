import logoSNB from './logo-snb.svg'
import './Dashboard.scss'
import React from 'react'

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content page-dashboard">
        <img alt="Logo SNB" src={logoSNB} />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
