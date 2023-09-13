import './Viewer.scss'

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
  return (
    <div className="viewer-aplikasi">
      <div className="header-viewer">
        <img className="gbr-header" alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan"></p>
          <p className="tgl-berjalan"></p>
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
        Teks yang sangat panjang dan super duper panjang
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
