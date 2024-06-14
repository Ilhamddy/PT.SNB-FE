import { createContext, useContext, useEffect, useRef, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBeritaHome,
  getComboJadwal,
  getJadwalDokter,
  getPasienLama,
  logoutUser,
} from '../../store/actions'
import { useFormik } from 'formik'
import { JadwalDokterKomponen } from '../JadwalDokter/JadwalDokter'
import JadwalDokterImg from './jadwal-dokter.svg'
import LiveAntreanImg from './live-antrean.svg'
import PendaftaranPasienImg from './pendaftaran-pasien.svg'
import RiwayatPendaftaranImg from './riwayat-pendaftaran.svg'
import ModalKodeAntrian from '../../Components/ModalKodeAntrian/ModalKodeAntrian'

const HomePage = () => {
  const refKontainer = useRef(null)
  const { showPopUp } = useParams()
  let { hariOpt, unitOpt, dokter, user, berita } = useSelector((state) => ({
    hariOpt: state.Home.getComboJadwal?.data?.hari || [],
    unitOpt: state.Home.getComboJadwal?.data?.unit || [],
    dokter: state.Home.getJadwalDokter?.data?.dokter || [],
    user: Array.isArray(state.UserPasien.loginUser?.data)
      ? null
      : state.UserPasien.loginUser?.data,
    berita: state.Home.getBeritaHome?.data?.berita || [],
  }))
  const [dateToday] = useState(() => new Date())
  unitOpt = [{ value: '', label: 'Semua Poliklinik' }, ...unitOpt]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showKodeAntrian, setShowKodeAntrian] = useState(false)
  const handleNextPage = (link) => {
    refKontainer.current?.handleToNextPage(() => {
      navigate(link)
    })
  }

  const handleToAntrean = () => {
    // refKontainer.current?.handleToNextPage(() => {
    //   navigate('/akun/antrean-online')
    // })
    setShowKodeAntrian(true)
  }
  const handleToLogin = () => {
    handleNextPage('/login/pasien-lama')
  }

  const handleToAntreanManual = (value) => {
    handleNextPage(`/antrean-online-dokter-farmasi/${value.value}`)
  }
  const handleToJadwal = () => {
    handleNextPage('/jadwal-dokter')
  }
  const handleToTempatTidur = () => {
    handleNextPage('/bed')
  }
  const handleToRiwayat = () => {
    handleNextPage('/riwayat-daftar')
  }
  const handleToDaftar = () => {
    handleNextPage('/daftar/pasien-lama/0')
  }
  const handleToAkun = () => {
    handleNextPage('/akun')
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
    dispatch(getBeritaHome())
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
  const date = new Date()
  const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format
  const bulan = monthName(date)
  useEffect(() => {
    if (showPopUp) {
      setShowKodeAntrian(true)
    }
  }, [showPopUp])
  return (
    <KontainerPage
      top={'410px'}
      ref={refKontainer}
      className="home-page"
      header={
        <div className="home-header">
          <div className="menu-header-home">
            {user ? (
              <p className="nama-pasien" onClick={() => handleToAkun()}>
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
            {berita.map((item, index) => (
              <div
                className="kontainer-image"
                onClick={() => {
                  refKontainer.current?.handleToNextPage(() => {
                    navigate(`/berita/${item.norec}`)
                  })
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_MEDIA_UPLOAD_URL + `/${item.gambar}`
                  }
                  alt="pram"
                />
              </div>
            ))}
          </Carousel>
          <KontenMenuDasbor jumlahMenu={5}>
            <IsiKontenDasbor
              gbr={PendaftaranPasienImg}
              text={'Pendaftaran Pasien'}
              onClick={() => {
                handleToDaftar()
              }}
            />
            <IsiKontenDasbor
              gbr={JadwalDokterImg}
              text={'Jadwal Dokter'}
              onClick={() => handleToJadwal()}
            />
            <IsiKontenDasbor
              gbr={LiveAntreanImg}
              text={'Antrean Online'}
              onClick={handleToAntrean}
            />
            <IsiKontenDasbor
              gbr={RiwayatPendaftaranImg}
              text={'Riwayat Pendaftaran'}
              onClick={() => handleToRiwayat()}
            />
            <IsiKontenDasbor
              gbr={RiwayatPendaftaranImg}
              text={'Tempat Tidur'}
              onClick={() => handleToTempatTidur()}
            />
          </KontenMenuDasbor>
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
            <p className="jadwal-poliklinik">
              {hari[date.getDay()]}, {date.getDate()} {bulan}{' '}
              {date.getFullYear()}
            </p>
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
      <ModalKodeAntrian
        onClickSelanjutnya={(value) => {
          setShowKodeAntrian(false)
          handleToAntreanManual(value)
        }}
        isOpen={showKodeAntrian}
        toggle={() => setShowKodeAntrian(false)}
        centered={true}
        size="sm"
        backdrop={'static'}
      />
    </KontainerPage>
  )
}

const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export const KontenMenuDasbor = ({ children, jumlahMenu = 1, ...rest }) => {
  return (
    <div className="konten-menu-dasbor" {...rest}>
      <JumlahMenuContext.Provider value={jumlahMenu}>
        {children}
      </JumlahMenuContext.Provider>
    </div>
  )
}

export const IsiKontenDasbor = ({ gbr, text, ...rest }) => {
  const jumlahMenu = useContext(JumlahMenuContext)
  return (
    <div
      className="isi-konten"
      style={{ width: `calc((100% / ${jumlahMenu}) - 10px)` }}
      {...rest}
    >
      <img src={gbr} alt={text} />
      <p>{text}</p>
    </div>
  )
}

const JumlahMenuContext = createContext(1)

export default HomePage
