
import React, { useEffect, useRef, useState } from 'react'
import withRouter from '../../../Components/Common/withRouter'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'

const Location = () => {
  document.title = 'Map Location Satu Sehat'

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Map Location Satu Sehat" pageTitle="Forms" />
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>Map Location Unit</h4>
            </CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(Location)