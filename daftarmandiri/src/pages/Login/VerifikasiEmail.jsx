import { useNavigate } from 'react-router-dom'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './VerifikasiEmail.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { getVerifUser, verifUserEmail } from '../../store/actions'
import * as Yup from 'yup'
import { InputGroup } from './FormPasienBaru'
import InputDM from '../../Components/InputDM/InputDM'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { useEffect, useRef } from 'react'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import { rgxAllNumber } from 'frontendjs/src/utils/regexcommon'

const VerifikasiEmail = ({ handleToHome }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const refKontainer = useRef()
  const pesanKirim = useSelector(
    (state) => state.UserPasien.getVerifUser.data?.pesanKirim || ''
  )
  const loading = useSelector(
    (state) => state.UserPasien.getVerifUser.loading || false
  )
  const vVerif = useFormik({
    initialValues: {
      verifcode: '',
    },
    validationSchema: Yup.object({
      verifcode: Yup.string().required('Kode verifikasi wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        verifUserEmail(values, () => {
          navigate('/login/selesai')
        })
      )
    },
  })

  const handleKirimVerifUser = () => {
    dispatch(
      getVerifUser({}, (data) => {
        data.isAlreadyVerified && navigate('/')
      })
    )
  }

  return (
    <KontainerPage top={0} ref={refKontainer} className="berita-page">
      <BackKomponen text={'Verifikasi E-Mail'} refKontainer={refKontainer} />
      <div className="kontainer-konten verifikasi-email">
        <InputGroup label={'Kode Verifikasi'}>
          <InputDM
            id="verifcode"
            name="verifcode"
            type="string"
            className="input-login"
            value={vVerif.values.verifcode}
            errorMsg={vVerif.errors.verifcode}
            isError={vVerif.touched.namaibu && vVerif.errors.verifcode}
            onChange={(e) => {
              rgxAllNumber.test(e.target.value) &&
                e.target.value.length <= 6 &&
                vVerif.handleChange(e)
            }}
          />
        </InputGroup>
        <p>{pesanKirim}</p>
        <div className="kontainer-btn-verif">
          <ButtonDM
            className="btn-lama btn-verif"
            onClick={() => {
              handleKirimVerifUser()
            }}
            buttonType="secondary"
            disabled={loading}
          >
            Kirim Kode
          </ButtonDM>
          <ButtonDM
            className="btn-lama"
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
              vVerif.handleSubmit()
            }}
          >
            Verifikasi
          </ButtonDM>
        </div>
      </div>
    </KontainerPage>
  )
}

export default VerifikasiEmail
