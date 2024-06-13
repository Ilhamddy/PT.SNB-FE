import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAntreanPemeriksaanManual } from '../../store/actions'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import MenungguImg from './menunggu.png'
import antrianFarmasiImg from './antrian-farmasi.png'
import './AntreanOnlineManual.scss'
import { dateLocal } from 'frontendjs/src/utils/format'
import DokterImg from './dokter-dummy.png'
import { useParams } from 'react-router-dom'
import { Card, CardBody, Row } from 'reactstrap'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'

const AntreanOnlineManual = () => {
  const refKontainer = useRef(null)
  const { noregistrasi } = useParams()
  const { antreanPasien, antreanTerakhir, antreanFarmasi } = useSelector(
    (state) => ({
      antreanPasien: state.Home.getAntreanPemeriksaanManual.data?.antreanPasien,
      antreanTerakhir:
        state.Home.getAntreanPemeriksaanManual.data?.antreanTerakhir,
      antreanFarmasi:
        state.Home.getAntreanPemeriksaanManual.data?.antreanFarmasi,
    })
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAntreanPemeriksaanManual({ noregistrasi: noregistrasi }))
    const interval = setInterval(() => {
      dispatch(getAntreanPemeriksaanManual({ noregistrasi: noregistrasi }))
    }, 10000)
    return () => clearInterval(interval)
  }, [dispatch, noregistrasi])
  const [cardPoliklinik, setcardPoliklinik] = useState(true)
  return (
    <KontainerPage top={0} ref={refKontainer} className="antrean-online-page">
      <BackKomponen text={'Antrean'} refKontainer={refKontainer} />
      <div className="konten-antrean">
        <Card className="card-button">
          <CardBody>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {cardPoliklinik ? (
                <>
                  <ButtonDM className="card-button-poli-aktip" type="button">
                    Poliklinik
                  </ButtonDM>
                  <ButtonDM
                    className="card-button-farmasi-nonaktip"
                    type="button"
                    onClick={() => {
                      setcardPoliklinik(false)
                    }}
                  >
                    Farmasi
                  </ButtonDM>
                </>
              ) : (
                <>
                  <ButtonDM
                    className="card-button-poli-nonaktip"
                    type="button"
                    onClick={() => {
                      setcardPoliklinik(true)
                    }}
                  >
                    Poliklinik
                  </ButtonDM>
                  <ButtonDM className="card-button-farmasi-aktip" type="button">
                    Farmasi
                  </ButtonDM>
                </>
              )}
            </div>
          </CardBody>
        </Card>

        {cardPoliklinik ? (
          <>
            <img className="gbr-antrean" src={MenungguImg} alt="" />
            {!antreanPasien && (
              <p className="teks-belum-ada">
                Anda masih belum memiliki antrean. Silahkan daftar terlebih
                dahulu.
              </p>
            )}
            {!!antreanPasien && (
              <>
                <div className="kontainer-antrean-sekarang">
                  <p className="sekarang">Antrean Sekarang</p>
                  <p className="antrean">{antreanTerakhir?.kodeantrean}</p>
                </div>
                <div className="kontainer-dokter">
                  <img
                    className="foto-dokter"
                    src={DokterImg}
                    alt="foto dokter"
                  />
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
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <img className="gbr-antrean" src={antrianFarmasiImg} alt="" />
            {!antreanFarmasi && (
              <p className="teks-belum-ada">
                Anda masih belum memiliki antrean. Silahkan daftar terlebih
                dahulu.
              </p>
            )}
            {!!antreanFarmasi && (
              <>
                {antreanFarmasi.map((item, key) => (
                  <div className="kontainer-antrean-sekarang">
                    <p className="sekarang">Status Obat</p>
                    <p className="antrean">{item?.status}</p>
                    <p className="sekarang">{item?.no_order}</p>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </KontainerPage>
  )
}

export default AntreanOnlineManual
