import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from 'reactstrap'
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth'
import './LoginBased.scss'

//redux
import { useSelector, useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

// Formik validation
import * as Yup from 'yup'
import { useFormik } from 'formik'

//Social Media Imports
// import { GoogleLogin } from 'react-google-login'
// import TwitterLogin from "react-twitter-auth"
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// actions
import {
  loginUser,
  socialLogin,
  resetLoginFlag,
  testEncryption,
} from '../../store/actions'

import logoLight from '../../assets/images/svg/login-new.svg'
import bgImage from './bg-image.svg'
import bgGradien from './bg-gradien.png'
import logoBerdikari from './logo-berdikari.svg'
import logo from '../../assets/images/svg/logo_dashboard.svg'
//Import config
import { facebook, google } from '../../config'
import withRouter from '../../Components/Common/withRouter'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomInput from '../../Components/Common/CustomInput/CustomInput'
import { useSelectorRoot } from '../../store/reducers'

const LoginBased = (props) => {
  const dispatch = useDispatch()
  const { user, errorMsg, loading, error, activationKey } = useSelector(
    (state) => ({
      user: state.Account.user,
      errorMsg: state.Login.errorMsg,
      loading: state.Login.loading,
      error: state.Login.error,
      activationKey: state.Login.activationKey,
    })
  )

  const [passwordShow, setPasswordShow] = useState(false)

  const validation = useValidationPassword()
  const signIn = (res, type) => {
    if (type === 'google' && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.router.navigate, type))
    } else if (type === 'facebook' && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.router.navigate, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = (response) => {
    signIn(response, 'google')
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = (response) => {
    signIn(response, 'facebook')
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetLoginFlag())
      }, 3000)
    }
  }, [dispatch, error])

  document.title = 'Login | HMS - SNB'
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="login-based">
          <div className="background-login-based">
            <img className="bg" src={bgGradien} alt="" />
            <img className="image-login-based" src={bgImage} alt="" />
          </div>
          <div className="login-based-core">
            {errorMsg && errorMsg ? (
              <Alert color="danger"> {errorMsg} </Alert>
            ) : null}
            <div className="p-2 mt-4">
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
                action="#"
              >
                <div className="mb-5 logo-snb">
                  <img src={logo} alt="logo-snb" />
                  {/* uji coba Dokter 15/01/2024 */}
                </div>
                <div className="mb-3">
                  <Label htmlFor="username" className="form-label">
                    Username
                  </Label>
                  <CustomInput
                    className="input-login"
                    name="first_name"
                    type="text"
                    placeholder="Enter username"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.first_name || ''}
                    invalid={
                      validation.touched.first_name &&
                      validation.errors.first_name
                    }
                  />
                  {validation.touched.first_name &&
                  validation.errors.first_name ? (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.first_name}</div>
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label" htmlFor="password-input">
                    Password
                  </Label>
                  <div className="position-relative auth-pass-inputgroup mb-3">
                    <CustomInput
                      name="password"
                      value={validation.values.password || ''}
                      type={passwordShow ? 'text' : 'password'}
                      className="form-control pe-5 input-login"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.password &&
                        validation.errors.password
                          ? true
                          : false
                      }
                    />
                    {validation.touched.password &&
                    validation.errors.password ? (
                      <FormFeedback type="invalid">
                        {validation.errors.password}
                      </FormFeedback>
                    ) : null}
                    <button
                      className="btn-pass btn btn-link position-absolute text-decoration-none text-muted"
                      type="button"
                      id="password-addon"
                      onClick={() => setPasswordShow(!passwordShow)}
                    >
                      <i className="ri-eye-fill align-middle"></i>
                    </button>
                  </div>
                </div>
                {!activationKey && (
                  <div className="mb-3">
                    <Label htmlFor="activationKey" className="form-label">
                      Kode Aktivasi
                    </Label>
                    <Input
                      className="input-login"
                      name="activationKey"
                      type="text"
                      placeholder="Enter Kode Aktivasi"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.activationKey || ''}
                      invalid={
                        validation.touched.activationKey &&
                        validation.errors.activationKey
                      }
                    />
                    {validation.touched.activationKey &&
                    validation.errors.activationKey ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.activationKey}</div>
                      </FormFeedback>
                    ) : null}
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    disabled={error ? null : loading ? true : false}
                    className="btn-signin btn w-100"
                    type="submit"
                  >
                    {error ? null : loading ? (
                      <Spinner size="sm" className="me-2">
                        {' '}
                        Loading...{' '}
                      </Spinner>
                    ) : null}
                    Masuk
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  )
}

export const useValidationPassword = () => {
  const { activationKey } = useSelectorRoot((state) => ({
    activationKey: state.Login.activationKey,
  }))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: '',
      password: '',
      activationKey: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('Please Enter Your User Name'),
      password: Yup.string().required('Please Enter Your Password'),
      activationKey: activationKey
        ? Yup.string()
        : Yup.string().required('Kode aktivasi harus ada'),
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
}

export default withRouter(LoginBased)
