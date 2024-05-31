import { ToastContainer } from 'react-toastify'
import { groupArray, useDate } from '../../utils/format'
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
    intervalVal && clearTimeout(intervalVal)
    dispatch(getAllBed({}))
    const interval = setInterval(() => {
      dispatch(getAllBed({}))
    }, 15000)
    setIntervalVal(interval)
    return () => {
      clearInterval(interval)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className="viewer-bed">
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
              <TickScroll
                className={'kontainer-ruangan'}
                dataApi={kamar}
                dataid="kamarid"
                height="calc(100% - (100% / 11))"
                dataPerPage={10}
                warnaBgGenap="rgb(211, 211, 211)"
                timeTransition={2500}
                isiTabel={(item) => (
                  <>
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
                  </>
                )}
              />
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
            <TickScroll
              dataApi={kelas}
              dataid="kelasid"
              height="100%"
              dataPerPage={4}
              timeTransition={4000}
              isiTabel={(item, index) => (
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
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const TickScroll = ({
  className,
  dataApi,
  dataid,
  height,
  isiTabel = (item, index) => <></>,
  warnaBgGenap = '',
  dataPerPage = 10,
  timeTransition = 2500,
}) => {
  if (!height) throw Error('Height diperlukan')
  if (!dataid) throw Error('dataid diperlukan')
  const [dataScroll, setDataScroll] = useState([])
  const [tick, setTick] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    setDataScroll((dataScroll) => {
      if (!Array.isArray(dataApi)) {
        return dataScroll
      }
      if (dataScroll.length === 0) {
        let newDataApi = dataApi.map((nd, index) => ({
          ...nd,
          index: index,
        }))
        return newDataApi
      }
      // masukkan data sebelumnya
      let newDScroll = dataScroll.map((dScroll) => {
        const dataFound = dataApi.find(
          (dApi) => dApi[dataid] === dScroll[dataid]
        )
        if (dataFound) {
          dataFound._alreadyInput = true
          return JSON.parse(JSON.stringify(dataFound))
        }
        return null
      })
      // masukkan sisa data
      dataApi.forEach((api) => {
        if (!api._alreadyInput) {
          newDScroll.push(api)
        }
      })
      newDScroll.filter((nd) => nd !== null)
      newDScroll = newDScroll.map((nd, index) => ({ ...nd, index: index }))
      return newDScroll
    })
  }, [dataApi, dataid])

  useEffect(() => {
    let timeout
    const startTransition = (isImmediate = true) => {
      setTick(false)
      !hover &&
        isImmediate &&
        setDataScroll((dataScroll) => {
          if (dataScroll[0]) {
            let newData = [...dataScroll]
            const first = newData[0]
            const last = newData[newData.length - 1]
            first.index = last.index + 1
            newData.push(first)
            newData.shift()

            return [...newData]
          }
          return dataScroll
        })
      timeout = setTimeout(() => {
        !hover && setTick(true)
      }, 10)
    }
    startTransition(false)
    const interval = setInterval(startTransition, timeTransition)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [hover])
  return (
    <div
      className={`${className} body-table-kontainer-viewer`}
      style={{ height: height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      {dataScroll.map((item, index) => (
        <div
          className={`row-tick position-child `}
          style={{
            top: `calc((100% / ${dataPerPage}) * ${index - (tick ? 1 : 0)})`,
            backgroundColor: item.index % 2 === 0 ? warnaBgGenap : '',
            height: `calc(100% / ${dataPerPage})`,
            transition:
              tick || hover
                ? `all ${timeTransition / (hover ? 15 : 1)}ms linear`
                : '',
          }}
          key={index}
        >
          {isiTabel(item, index)}
        </div>
      ))}
    </div>
  )
}

export default ViewerBed
