import { useDispatch, useSelector } from 'react-redux'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import { getPasienAkun, getPasienEdit, logoutUser } from '../../store/actions'
import { useEffect, useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import './AkunPage.scss'
import ExpandRight from './expand-right.svg'
import { useNavigate } from 'react-router-dom'
import UserImg from './user.svg'
import DokterTemp from './doktercuplik.png'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'

const AkunPage = () => {
  const { userAkun } = useSelector((state) => ({
    userAkun: state.UserPasien.getPasienAkun.data.pasienAkun || null,
  }))
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getPasienAkun())
  }, [dispatch])
  return (
    <KontainerPage
      top={'0'}
      ref={refKontainer}
      className="akun-page"
      classNameKonten="konten-akun"
    >
      <div className="akun-kontainer">
        <div>
          <BackKomponen text={'Akun'} refKontainer={refKontainer} toHome />
          <div className="opsi-akun">
            <div className="data-akun">
              <img className="gbr-akun" alt="" src={DokterTemp} />
              <h2 className="nama-pengguna">{userAkun?.namalengkap || '-'}</h2>
              <p className="data">{userAkun?.nocm || userAkun?.nocmtemp}</p>
              <p className="data">{userAkun?.nohp}</p>
            </div>

            <ButtonOpsi
              onClick={() => {
                refKontainer.current.handleToNextPage(() => {
                  navigate('/akun/edit')
                })
              }}
            >
              Edit Data Pasien
            </ButtonOpsi>
            <ButtonOpsi
              onClick={() => {
                refKontainer.current.handleToNextPage(() => {
                  navigate('/akun/penjamin')
                })
              }}
            >
              Penjamin Pasien
            </ButtonOpsi>
          </div>
        </div>
        <ButtonDM onClick={() => dispatch(logoutUser())}>Keluar</ButtonDM>
      </div>
    </KontainerPage>
  )
}

const ButtonOpsi = ({ children, ...rest }) => {
  return (
    <button className="button-opsi" {...rest}>
      <div className="konten-btn">{children}</div>
      <div className="kontainer-expand">
        <img src={ExpandRight} alt="" />
      </div>
    </button>
  )
}

export default AkunPage
