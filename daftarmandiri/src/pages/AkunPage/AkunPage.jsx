import { useDispatch } from 'react-redux'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import { logoutUser } from '../../store/actions'
import { useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import './AkunPage.scss'
import ExpandRight from './expand-right.svg'

const AkunPage = () => {
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  return (
    <KontainerPage
      top={'0'}
      ref={refKontainer}
      className="akun-page"
      classNameKonten="konten-akun"
    >
      <div className="akun-kontainer">
        <div className="opsi-akun">
          <ButtonOpsi>Edit Data Pasien</ButtonOpsi>
          <ButtonOpsi>Penjamin Pasien</ButtonOpsi>
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
