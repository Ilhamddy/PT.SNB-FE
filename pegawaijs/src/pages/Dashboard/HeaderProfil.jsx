import GbrDokterSementara from './dokter.png'
import './HeaderProfil.scss'
import ButtonDM from 'daftarmandiri/src/Components/ButtonDM/ButtonDM'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'frontendjs/src/store/actions'
import { useSelectorRoot } from '../../store/reducers'

const HeaderProfil = () => {
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    dispatch(logoutUser())
  }
  return (
    <div className="header-profil-pegawaijs">
      <img alt="gbr-dokter" src={GbrDokterSementara} className="gbr-dokter" />
      <div className="isi-dokter">
        <p className="nama-dokter">Dokter boyke</p>
        <p className="deskripsi-dokter">Dokter legendaris</p>
      </div>
      <ButtonDM fixedWidth={30} isFullyRounded onClick={handleLogout}>
        L
      </ButtonDM>
    </div>
  )
}

export default HeaderProfil
