import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAntreanPemeriksaan } from '../../store/userpasien/action'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import MenungguImg from './menunggu.png'
import './AntreanOnlinePage.scss'
import { dateLocal } from '../../utils/format'
import DokterImg from './dokter-dummy.png'

const AntreanOnlinePage = () => {
  const refKontainer = useRef(null)
  const { antreanPasien, antreanTerakhir } = useSelector((state) => ({
    antreanPasien: state.UserPasien.getAntreanPemeriksaan.data?.antreanPasien,
    antreanTerakhir:
      state.UserPasien.getAntreanPemeriksaan.data?.antreanTerakhir,
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAntreanPemeriksaan())
    const interval = setInterval(() => {
      dispatch(getAntreanPemeriksaan())
    }, 10000)
    return () => clearInterval(interval)
  }, [dispatch])
  return (
    <KontainerPage top={0} ref={refKontainer} className="antrean-online-page">
      <BackKomponen text={'Antrean'} refKontainer={refKontainer} />
      <div className="konten-antrean">
        <img className="gbr-antrean" src={MenungguImg} alt="" />
        {!antreanPasien && (
          <p className="teks-belum-ada">
            Anda masih belum memiliki antrean. Silahkan daftar terlebih dahulu.
          </p>
        )}
        {!!antreanPasien && (
          <>
            <div className="kontainer-dokter">
              <img className="foto-dokter" src={DokterImg} alt="foto dokter" />
              <div className="konten-dokter">
                <p className="nama-dokter">{antreanPasien?.namadokter}</p>
                <p className="deskripsi">{antreanPasien?.namaunit}</p>
                <p className="deskripsi">
                  {dateLocal(antreanPasien?.tglregistrasi)}
                </p>
              </div>
            </div>
            <div className="kontainer-antrean">
              <p className="sekarang">Antrean Anda</p>
              <p className="antrean">{antreanPasien?.kodeantrean}</p>
              <p className="sekarang">
                Sisa Antrean: 10 (saat ini {antreanTerakhir?.kodeantrean})
              </p>

              {/* <p className="sekarang">
                No Atrean: 
              </p> */}
            </div>
          </>
        )}
      </div>
    </KontainerPage>
  )
}

export default AntreanOnlinePage
