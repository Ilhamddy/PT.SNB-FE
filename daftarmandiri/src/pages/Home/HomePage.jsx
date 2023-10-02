import { useRef, useState } from 'react'
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
import dokter from './dokter.png'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const refKontainer = useRef(null)
  const navigate = useNavigate()
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
  return (
    <div className="home-page">
      <KontainerPage
        top={'490px'}
        ref={refKontainer}
        header={
          <div className="home-header">
            <div className="menu-header-home">
              <button className="tbl-masuk" onClick={handleToLogin}>
                <img src={loginImg} alt="login-img" />
                <p>Masuk/Daftar</p>
              </button>
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
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
              <IsiKontenHeader gbr={waitImg} text={'Pendaftaran Pasien'} />
            </div>
          </div>
        }
      >
        <div className="home-konten">
          <div className="navigasi-poliklinik">
            <div className="navigasi">
              <img src={arrowKiriImg} alt="navigasi" />
            </div>
            <div className="poliklinik-terpilih" onClick={handleToJadwal}>
              <p className="judul-poliklinik">Poliklinik Kebidanan</p>
              <p className="jadwal-poliklinik">Senin, 9 September 2023</p>
            </div>
            <div className="navigasi">
              <img src={arrowKananImg} alt="navigasi" />
            </div>
          </div>
          <div className="jadwal-dokter">
            <JadwalDokter
              imgDokter={dokter}
              namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
              jadwal={'Senin, 9 September 2023'}
            />
            <JadwalDokter
              imgDokter={dokter}
              namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
              jadwal={'Senin, 9 September 2023'}
            />
            <JadwalDokter
              imgDokter={dokter}
              namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
              jadwal={'Senin, 9 September 2023'}
            />
            <JadwalDokter
              imgDokter={dokter}
              namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
              jadwal={'Senin, 9 September 2023'}
            />
            <JadwalDokter
              imgDokter={dokter}
              namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
              jadwal={'Senin, 9 September 2023'}
            />
          </div>
        </div>
      </KontainerPage>
    </div>
  )
}

const IsiKontenHeader = ({ gbr, text }) => {
  return (
    <div className="isi-konten-header">
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
