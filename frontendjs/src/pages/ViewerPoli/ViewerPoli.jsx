import { useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { ToastContainer, toast } from 'react-toastify'
import './ViewerPoli.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const ViewerPoli = () => {
  const { tanggal, waktu } = useDate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch()
  }, [])

  return (
    <div className="viewer-poli">
      <ToastContainer />
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="konten-viewer">
        <div className="ruang-group">
          <div className="ruang-available">
            <div className="isi-konten">
              <p className="nama-poliklinik">Poliklinik Bedah Tulang</p>
              <p className="nama-dokter">dr. Meiningsih Kusumawati, Sp.Rad</p>
              <p className="nomor-antrean">MK01</p>
            </div>
            <p className="nama-ruang">Ruang 1</p>
          </div>
          <div className="ruang-available">
            <div className="isi-konten">
              <p className="nama-poliklinik">Poliklinik Bedah Tulang</p>
              <p className="nama-dokter">dr. Meiningsih Kusumawati, Sp.Rad</p>
              <p className="nomor-antrean">MK01</p>
            </div>
            <p className="nama-ruang">Ruang 2</p>
          </div>
          <div className="ruang-available">
            <div className="isi-konten">
              <p className="nama-poliklinik">Poliklinik Bedah Tulang</p>
              <p className="nama-dokter">dr. Meiningsih Kusumawati, Sp.Rad</p>
              <p className="nomor-antrean">MK01</p>
            </div>
            <p className="nama-ruang">Ruang 3</p>
          </div>
        </div>
      </div>
      <p className="running-text-viewer">
        Teks yang sangat panjang dan super duper panjang kdjfsa Teks yang sangat
        panjang dan super duper panjang kdjfsa
      </p>
    </div>
  )
}

export default ViewerPoli
