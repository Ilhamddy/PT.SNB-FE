import { useDate } from '../../utils/format'
import './Viewer.scss'
import logoSNB from './logo-snb.svg'

const Viewer = () => {
  const isiLoket = [
    {
      loketNumber: 1,
      isi: 'S04',
    },
    {
      loketNumber: 2,
      isi: 'D02',
    },
    {
      loketNumber: 3,
      isi: 'A12',
    },
    {
      loketNumber: 4,
      isi: 'C02',
    },
  ]
  const { tanggal, waktu } = useDate()
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
            <p className="nomor">S09</p>
            <p className="loket">Loket 2</p>
          </div>
          <div className="kontainer-video"></div>
        </div>
        <div className="kontainer-loket">
          {isiLoket.map((item, index) => (
            <LoketAvailable
              key={index}
              loketNumber={item.loketNumber}
              isi={item.isi}
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
      <p className="number">Loket {loketNumber}</p>
      <p className="isi">{isi}</p>
    </div>
  )
}

export default Viewer
