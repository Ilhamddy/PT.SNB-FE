import logoSNB from './logo-snb.svg'
import logo from '../../assets/images/svg/YourLOGO.svg'//'../../assets/images/svg/logo_dashboard.svg'
import './Dashboard.scss'
import React from 'react'

const Dashboard = () => {
  document.title = "SIMRS - SNB";
  return (
    <React.Fragment>
      <div className="page-content page-dashboard">
        <img alt="Logo SNB" src={logo} />
      </div>
    </React.Fragment>
  )
}

export default Dashboard
