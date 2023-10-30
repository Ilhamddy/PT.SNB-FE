import { ToastContainer } from 'react-toastify'
import { groupArray, useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getJadwalOperasi } from '../../store/actions'
import './ViewerOperasi.scss'
import ClockImg from './clock.svg'
import HealthImg from './health.svg'
import MedicalImg from './medical.svg'
import { Carousel } from 'react-responsive-carousel'

const ViewerOperasi = () => {
  const { tanggal, waktu } = useDate()
  const dispatch = useDispatch()
  let { jadwal } = useSelector(
    (state) => ({
      jadwal: state.Viewer.getJadwalOperasi?.data?.jadwal || [],
    }),
    shallowEqual
  )
  useEffect(() => {
    dispatch(getJadwalOperasi())
  }, [dispatch])
  const jadwalGroup = groupArray(jadwal, 8)

  return (
    <div className="viewer-operasi">
      <ToastContainer />
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="konten-viewer">
        <h1 className="judul-informasi">Informasi Jadwal Tindakan Operasi</h1>
        <Carousel
          autoFocus
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          interval={7000}
          showIndicators={false}
        >
          {jadwalGroup.map((jadwal, key) => (
            <div className="kontainer-splitter" key={key}>
              <div className="kontainer-data">
                {jadwal.map((item, index) =>
                  index % 2 === 0 ? (
                    <CardContent
                      key={index}
                      tanggal={item.tglrencana}
                      noorder={item.nomororder}
                      spesialisasi={item.spesialisasi}
                    />
                  ) : (
                    <></>
                  )
                )}
              </div>
              <div className="kontainer-data">
                {jadwal.map((item, index) =>
                  index % 2 !== 0 ? (
                    <CardContent
                      key={index}
                      tanggal={item.tglrencana}
                      noorder={item.nomororder}
                      spesialisasi={item.spesialisasi}
                    />
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

const CardContent = ({ tanggal, noorder, spesialisasi }) => {
  const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format
  let monthJadi = null
  try {
    monthJadi = month(new Date(tanggal))
  } catch (e) {
    console.log(e)
  }
  return (
    <div className="card-konten">
      <div className="kontainer-tanggal">
        <p className="tanggal">{new Date(tanggal).getDate()}</p>
        <p className="tanggal">{monthJadi}</p>
        <p className="tanggal">{new Date(tanggal).getFullYear()}</p>
      </div>
      <div className="kontainer-description">
        <Description gbr={MedicalImg} description={noorder} />
        <Description gbr={HealthImg} description={spesialisasi} />
        <Description
          gbr={ClockImg}
          description={new Date(tanggal)
            .toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace('.', ':')}
        />
      </div>
    </div>
  )
}

const Description = ({ gbr, description }) => {
  return (
    <div className="isi-description">
      <img src={gbr} alt="" />
      <p>{description}</p>
    </div>
  )
}

export default ViewerOperasi
