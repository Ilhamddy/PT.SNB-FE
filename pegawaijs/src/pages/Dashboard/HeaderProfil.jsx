import GbrDokterSementara from './dokter.png'
import './HeaderProfil.scss'
import ButtonDM from 'daftarmandiri/src/Components/ButtonDM/ButtonDM'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'frontendjs/src/store/actions'
import { useNavigate } from 'react-router'
import {
  IsiKontenDasbor,
  KontenMenuDasbor,
} from 'daftarmandiri/src/pages/Home/HomePage'
import { useHandleNextPage } from 'daftarmandiri/src/utils/ui'
import GbrRiwayat from './riwayat-pendaftaran.svg'

const HeaderProfil = ({ handleToNextPage }) => {
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    dispatch(logoutUser())
  }

  return (
    <div className="header-profil-pegawaijs">
      <div className="kontainer-profil-dokter">
        <div className="isi-dokter">
          <p className="nama-dokter">dr. H. Boyke Dian , SpOG MARS</p>
          <p className="deskripsi-dokter">Deskripsi dokter</p>
        </div>
        <img alt="gbr-dokter" src={GbrDokterSementara} className="gbr-dokter" />
        {/* 
        <ButtonDM fixedWidth={30} isFullyRounded onClick={handleLogout}>
          L
        </ButtonDM> */}
      </div>
      <KontenMenuDasbor jumlahMenu={4}>
        <IsiKontenDasbor
          gbr={GbrRiwayat}
          text={'Presensi'}
          onClick={() => handleToNextPage('/absen')}
        />
      </KontenMenuDasbor>
    </div>
  )
}

export default HeaderProfil
