import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import withRouter from '../../../Components/Common/withRouter'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { Container } from 'reactstrap'

const PasienBaruBayi = () => {
  document.title = 'Profile Pasien Baru Bayi'

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Registrasi Pasien Baru Bayi"
          pageTitle="Registrasi Pasien Baru Bayi"
        />

      </Container>
    </div>
  )
}
export default withRouter(PasienBaruBayi)