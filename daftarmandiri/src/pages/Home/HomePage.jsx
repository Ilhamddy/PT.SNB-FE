import { useEffect, useRef, useState } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import './HomePage.scss'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import prambanan from './prambanan.png'
import waitImg from './wait.png'
import helpImg from './help.png'
import loginImg from './login.png'
import arrowKiriImg from './arrow-kiri.svg'
import arrowKananImg from './arrow-kanan.svg'
import dokterImg from './dokter.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComboJadwal,
  getJadwalDokter,
  getPasienLama,
  logoutUser,
} from '../../store/actions'
import { useFormik } from 'formik'
import { JadwalDokterKomponen } from '../JadwalDokter/JadwalDokter'

const HomePage = () => {
  const refKontainer = useRef(null)
  let { hariOpt, unitOpt, dokter, user } = useSelector((state) => ({
    hariOpt: state.Home.getComboJadwal?.data?.hari || [],
    unitOpt: state.Home.getComboJadwal?.data?.unit || [],
    dokter: state.Home.getJadwalDokter?.data?.dokter || [],
    user: Array.isArray(state.Login.loginUser?.data)
      ? null
      : state.Login.loginUser?.data,
  }))
  const [dateToday] = useState(() => new Date())
  unitOpt = [{ value: '', label: 'Semua Poliklinik' }, ...unitOpt]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleToLogin = () => {
    refKontainer.current.handleToNextPage(() => {
      navigate('/login/pasien-lama')
    })
  }
  const handleToJadwal = () => {
    refKontainer.current?.handleToNextPage(() => {
      navigate('/jadwal-dokter')
    })
  }
  const handleToRiwayat = () => {
    refKontainer.current?.handleToNextPage(() => {
      navigate('/riwayat-daftar')
    })
  }
  const handleToDaftar = () => {
    refKontainer.current?.handleToNextPage(() => {
      navigate('/daftar/pasien-lama/0')
    })
  }
  const vHome = useFormik({
    initialValues: {
      chosenAr: 0,
      unitid: '',
      unitlabel: 'Semua Poliklinik',
    },
    onSubmit: (values) => {
      dispatch(
        getJadwalDokter({
          unitid: values.unitid,
          hariid: dateToday.getDay(),
          dokterid: undefined,
        })
      )
    },
  })
  useEffect(() => {
    dispatch(
      getJadwalDokter({
        unitid: undefined,
        hariid: dateToday.getDay(),
        dokterid: undefined,
      })
    )
    dispatch(getComboJadwal())
    dispatch(getPasienLama())
  }, [dispatch, dateToday])
  const handlePickUnit = (action) => {
    let chosenAr = 0
    if (action === 'next') {
      chosenAr =
        vHome.values.chosenAr + 1 >= unitOpt.length
          ? 0
          : vHome.values.chosenAr + 1
    } else {
      chosenAr =
        vHome.values.chosenAr - 1 < 0
          ? unitOpt.length - 1
          : vHome.values.chosenAr - 1
    }

    vHome.setFieldValue('chosenAr', chosenAr)
    vHome.setFieldValue('unitid', unitOpt[chosenAr]?.value)
    vHome.setFieldValue('unitlabel', unitOpt[chosenAr]?.label)
    vHome.handleSubmit()
  }
  return (
    <div className="home-page">
      <KontainerPage
        top={'400px'}
        ref={refKontainer}
        header={
          <div className="home-header">
            <div className="menu-header-home">
              {user ? (
                <p
                  className="nama-pasien"
                  onClick={() => dispatch(logoutUser())}
                >
                  Hi, {user?.namapasien}
                </p>
              ) : (
                <button className="tbl-masuk" onClick={handleToLogin}>
                  <img src={loginImg} alt="login-img" />
                  <p>Masuk/Daftar</p>
                </button>
              )}
              <div className="button-right">
                <img src={helpImg} alt="help" />
              </div>
            </div>
            <Carousel
              autoPlay
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              className="carousel-home"
              infiniteLoop
            >
              <div>
                <img src={prambanan} alt="pram" />
              </div>
              <div>
                <img src={prambanan} alt="pram" />
              </div>
              <div>
                <img src={prambanan} alt="pram" />
              </div>
            </Carousel>
            <div className="konten-header">
              <IsiKontenHeader
                gbr={waitImg}
                text={'Pendaftaran Pasien'}
                onClick={() => {
                  handleToDaftar()
                }}
              />
              <IsiKontenHeader
                gbr={waitImg}
                text={'Jadwal Dokter'}
                onClick={() => handleToJadwal()}
              />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader
                gbr={waitImg}
                text={'Riwayat Pendaftaran'}
                onClick={() => handleToRiwayat()}
              />
            </div>
          </div>
        }
      >
        <div className="home-konten">
          <div className="navigasi-poliklinik">
            <div className="navigasi" onClick={() => handlePickUnit('before')}>
              <img src={arrowKiriImg} alt="navigasi" />
            </div>
            <div className="poliklinik-terpilih" onClick={handleToJadwal}>
              <p className="judul-poliklinik">{vHome.values.unitlabel}</p>
              <p className="jadwal-poliklinik">Senin, 10 Oktober 2023</p>
            </div>
            <div className="navigasi" onClick={() => handlePickUnit('next')}>
              <img src={arrowKananImg} alt="navigasi" />
            </div>
          </div>
          <JadwalDokterKomponen
            imgDokter={dokterImg}
            dokters={dokter}
            refKontainer={refKontainer}
          />
        </div>
      </KontainerPage>
    </div>
  )
}

const IsiKontenHeader = ({ gbr, text, ...rest }) => {
  return (
    <div className="isi-konten-header" {...rest}>
      <img className="gbr-konten" src={gbr} alt={text} />
      <p className="isi-konten">{text}</p>
    </div>
  )
}

const JadwalDokter = ({ imgDokter, namaDokter, jadwal }) => {
  return (
    <div className="isi-jadwal-dokter">
      <img src={imgDokter} alt={namaDokter} />
      <div className="jabar">
        <p className="nama">{namaDokter}</p>
        <p className="jadwal">{jadwal}</p>
      </div>
    </div>
  )
}

export default HomePage
