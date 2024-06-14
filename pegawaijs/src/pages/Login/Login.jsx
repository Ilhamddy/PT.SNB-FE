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
import InputGroupDM from 'daftarmandiri/src/Components/InputGroupDM/InputGroupDM'
import ButtonDM from 'daftarmandiri/src/Components/ButtonDM/ButtonDM'
import { useValidationKey } from 'frontendjs/src/pages/Authentication/LoginBased'
import { useSelectorRoot } from '../../store/reducers'

const Login = () => {
  const refKontainer = useRef(null)
  const { activationKey } = useSelectorRoot((state) => ({
    activationKey: state.Login.activationKey,
  }))
  const validation = useValidationKey()

  return (
    <KontainerPage top={0} ref={refKontainer} className="kontainer-login">
      <InputGroupDM label={'Nama Pengguna '}>
        <InputDM
          name="first_name"
          type="string"
          value={validation.values.first_name}
          errorMsg={validation.errors.first_name}
          isError={
            validation.touched.first_name && validation.errors.first_name
          }
          onChange={(e) => {
            validation.setFieldValue('first_name', e.target.value)
          }}
        />
      </InputGroupDM>
      <InputGroupDM label={'Password'}>
        <InputDM
          name="password"
          type="password"
          value={validation.values.password}
          errorMsg={validation.errors.password}
          isError={validation.touched.password && validation.errors.password}
          onChange={(e) => {
            validation.setFieldValue('password', e.target.value)
          }}
        />
      </InputGroupDM>
      {!activationKey && (
        <InputGroupDM label={'Kode Aktivasi'}>
          <InputDM
            className="input-login"
            name="activationKey"
            type="text"
            placeholder="Enter Kode Aktivasi"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.activationKey || ''}
            isError={
              validation.touched.activationKey &&
              validation.errors.activationKey
            }
            errorMsg={validation.errors.activationKey}
          />
        </InputGroupDM>
      )}
      <ButtonDM
        onClick={() => {
          console.log(validation.errors)
          validation.handleSubmit()
        }}
      >
        Login
      </ButtonDM>
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
