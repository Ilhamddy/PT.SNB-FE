import { ToastContainer } from 'react-toastify'
import { useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getJadwalOperasi } from '../../store/actions'

const ViewerOperasi = () => {
  const { tanggal, waktu } = useDate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJadwalOperasi())
  }, [dispatch])
  return (
    <div className="viewer-aplikasi">
      <ToastContainer />
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="konten-viewer"></div>
      <p className="running-text-viewer">
        Teks yang sangat panjang dan super duper panjang kdjfsa Teks yang sangat
        panjang dan super duper panjang kdjfsa
      </p>
    </div>
  )
}

export default ViewerOperasi
