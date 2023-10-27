import { ToastContainer } from 'react-toastify'
import { useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getAllBed, getJadwalOperasi } from '../../store/actions'
import './ViewerBed.scss'
import { Carousel } from 'react-responsive-carousel'

const ViewerBed = () => {
  const { waktu, tanggal } = useDate()
  const dispatch = useDispatch()
  const [intervalVal, setIntervalVal] = useState(null)
  let { kamar, kelas } = useSelector(
    (state) => ({
      kamar: state.Viewer.getAllBed.data?.kamar || [],
      kelas: state.Viewer.getAllBed.data?.kelas || [],
    }),
    shallowEqual
  )
  useEffect(() => {
    dispatch(getAllBed({}))
  }, [dispatch])
  useEffect(() => {
    intervalVal && clearTimeout(intervalVal)
    dispatch(getAllBed({}))
    const interval = setInterval(() => {
      dispatch(getAllBed({}))
    }, 11000)
    setIntervalVal(interval)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  kamar = groupArray(kamar, 10)
  const kelasGrup = groupArray(kelas, 4)
  return (
    <div className="viewer-bed">
      <ToastContainer />
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="kontainer-konten">
        <h1 className="judul-viewer-bed">
          Informasi Ketersediaan Tempat Tidur
        </h1>
        <div className="kontainer-data">
          <div className="kontainer-tabel-informasi">
            <div className="tabel-informasi">
              <div className="head-table">
                <div className="row-bed">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  {kelas.map((item, index) => (
                    <div
                      className="kontainer-data-kelas-table"
                      style={{ width: `calc(80% / ${kelas.length})` }}
                      key={index}
                    >
                      <p>{item.namakelas}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="body-table">
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
                  {kamar.map((itemKamar, indexKamar) => (
                    <div
                      className="batch-kontainer-data-kelas-table"
                      key={indexKamar}
                    >
                      {itemKamar.map((item, index) => (
                        <div
                          className={`row-bed ${
                            index % 2 === 0 ? 'bg-genap' : ''
                          }`}
                          key={index}
                        >
                          <div className="kontainer-data-ruangan">
                            <p className="ruangan">{item.namakamar}</p>
                          </div>
                          {item.kelas.map((itemKel, indexKel) => (
                            <div
                              className={'kontainer-data-kelas-table'}
                              style={{
                                width: `calc(80% / ${item.kelas.length})`,
                              }}
                              key={indexKel}
                            >
                              <p>{itemKel.totalisi}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="legend">
              <div className="legend-jumlah">
                <div className="jumlah-tersedia"></div>
                <p>Jumlah Bed</p>
              </div>
              <div className="legend-jumlah">
                <div className="bed-tersedia"></div>
                <p>Bed Tersedia</p>
              </div>
            </div>
          </div>
          <div className="kelas">
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
              {kelasGrup.map((itemKelas, indexKelas) => (
                <div className="kontainer-isi-kelas" key={indexKelas}>
                  {itemKelas.map((item, index) => (
                    <div className="kontainer-kelas" key={index}>
                      <p className="judul-kelas">{item.namakelas}</p>
                      <div className="bed">
                        <div className="kontainer-bed">
                          <p className="jumlah-bed">{item.totalbed}</p>
                        </div>
                        <div className="kontainer-sisa">
                          <p className="tersisa">{item.totalkosong}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

function groupArray(array, size) {
  // Create an empty array to store the result
  let result = []
  // Loop through the array with a step of size
  for (let i = 0; i < array.length; i += size) {
    // Slice a subarray from the original array and push it to the result
    let subarray = array.slice(i, i + size)
    result.push(subarray)
  }
  // Return the result
  return result
}

export default ViewerBed
