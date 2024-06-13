import './Login.scss'
import { useEffect, useRef, useState } from 'react'
import { Circle } from 'rc-progress'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { rgxAllNumber } from 'frontendjs/src/utils/regexcommon'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, testEncryption } from 'frontendjs/src/store/actions'
import InputDM from 'daftarmandiri/src/Components/InputDM/InputDM'
import KontainerPage from 'daftarmandiri/src/Components/KontainerPage/KontainerPage'

import { useNavigate } from 'react-router'

const Login = () => {
  const refKontainer = useRef(null)
  const { errorMsg, loading, error, activationKey } = useSelector((state) => ({
    errorMsg: state.Login.errorMsg,
    loading: state.Login.loading,
    error: state.Login.error,
    activationKey: state.Login.activationKey,
  }))
  const dispatch = useDispatch()

  const [passwordShow, setPasswordShow] = useState(false)
  const navigate = useNavigate()

  const validation = useFormik({
    initialValues: {
      first_name: '',
      password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('Please Enter Your User Name'),
      password: Yup.string().required('Please Enter Your Password'),
    }),
    onSubmit: (values) => {
      const actionLogin = loginUser(values, navigate)
      if (!activationKey) {
        const actionEncryption = testEncryption(values, () => {
          dispatch(actionLogin)
        })
        dispatch(actionEncryption)
      } else {
        dispatch(actionLogin)
      }
    },
  })
  return (
    <KontainerPage top={0} ref={refKontainer} className="kontainer-coba">
      <InputDM
        onChange={(e) => {
          validation.setFieldValue('first_name', e.target.value)
        }}
      />
    </KontainerPage>
  )
}

export const InputGroup = ({ label, children }) => {
  return (
    <div className="input-group-login">
      <label className="label-login">{label}</label>
      {children}
    </div>
  )
}

export default Login
