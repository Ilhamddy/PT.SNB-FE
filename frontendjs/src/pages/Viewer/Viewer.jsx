import { useEffect } from 'react'
import { useDate } from '../../utils/format'
import './Viewer.scss'
import logoSNB from './logo-snb.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLoket } from '../../store/actions'

const Viewer = () => {
  const dispatch = useDispatch()
  const { loket, lastLoket, lastAntrean } = useSelector((state) => ({
    loket: state.Viewer.getAllLoket?.data?.loket || [],
    lastLoket: state.Viewer.getAllLoket?.data?.lastloket,
    lastAntrean: state.Viewer.getAllLoket?.data?.lastantrean,
  }))
  const { tanggal, waktu } = useDate()
  useEffect(() => {
    dispatch(getAllLoket())
  }, [dispatch])
  return (
    <div className="viewer-aplikasi">
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="konten-viewer">
        <div className="antrean-aktif-video">
          <div className="antrean-aktif">
            <p className="judul">Antrean Dipanggil</p>
            <p className="nomor">{lastAntrean}</p>
            <p className="loket">{lastLoket}</p>
          </div>
          <div className="kontainer-video"></div>
        </div>
        <div className="kontainer-loket">
          {loket.map((item, index) => (
            <LoketAvailable
              key={index}
              loketNumber={item.label}
              isi={item.lastAntrean}
            />
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

const LoketAvailable = ({ loketNumber, isi }) => {
  return (
    <div className="loket-available">
      <p className="number">{loketNumber}</p>
      <p className="isi">{isi || '-'}</p>
    </div>
  )
}

export default Viewer
