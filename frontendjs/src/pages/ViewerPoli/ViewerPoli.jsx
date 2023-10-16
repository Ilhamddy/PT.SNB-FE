import { useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { ToastContainer, toast } from 'react-toastify'
import './ViewerPoli.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJadwalDokter } from '../../store/viewer/action'

const ViewerPoli = () => {
  const { tanggal, waktu } = useDate()
  const dispatch = useDispatch()

  const { jadwalDokter } = useSelector((state) => ({
    jadwalDokter: state.Viewer.getJadwalDokter.data.jadwal || [],
  }))

  useEffect(() => {
    dispatch(getJadwalDokter())
  }, [dispatch])

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
          {jadwalDokter.map((item, key) => (
            <div className="ruang-available" key={key}>
              <div className="isi-konten">
                <p className="nama-poliklinik">{item.namaunit}</p>
                <p className="nama-dokter">{item.namadokter}</p>
                <p className="nomor-antrean">MK01</p>
              </div>
              <p className="nama-ruang">{item.namakamar}</p>
            </div>
          ))}
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
