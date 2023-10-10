import { useEffect, useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './RiwayatPendaftaran.scss'
import { useDispatch, useSelector } from 'react-redux'
import { batalRegis, getRiwayatRegistrasi } from '../../store/actions'
import LoadingDM from '../../Components/LoadingDM/LoadingDM'

const RiwayatPendaftaran = () => {
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  const { riwayat, riwayatToday, loadingRiwayat } = useSelector((state) => ({
    riwayat: state.UserPasien.getRiwayatRegistrasi.data?.riwayat || [],
    riwayatToday:
      state.UserPasien.getRiwayatRegistrasi.data?.riwayatToday || [],
    loadingRiwayat: state.UserPasien.getRiwayatRegistrasi.loading,
  }))
  useEffect(() => {
    dispatch(getRiwayatRegistrasi())
  }, [dispatch])
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="riwayat-pendaftaran">
      <div className="page-riwayat-pendaftaran">
        {loadingRiwayat ? (
          <LoadingDM />
        ) : (
          <>
            <h2 className="judul-hari-ini">Hari Ini</h2>
            {riwayatToday.length === 0 && (
              <p>Tidak ada riwayat pendaftaran hari ini</p>
            )}
            {riwayatToday.map((data) => (
              <div className="card-hari-ini">
                <div className="reservasi">
                  <p className="kode">
                    Kode Reservasi: <span>{data.noreservasi}</span>
                  </p>
                  <img className="btn-placeholder" alt="" />
                </div>
                <p className="nama-dokter">{data.namadokter}</p>
                <p className="poliklinik">{data.namaunit}</p>
                <div className="btn-terdaftar">
                  <ButtonDM className="p-2">Terdaftar</ButtonDM>
                  <ButtonDM
                    buttonType="secondary"
                    className="p-2"
                    onClick={() => {
                      dispatch(
                        batalRegis({ norec: data.norec }, () => {
                          dispatch(getRiwayatRegistrasi())
                        })
                      )
                    }}
                  >
                    X
                  </ButtonDM>
                </div>
              </div>
            ))}
            <h2 className="judul-sebelumnya">Sebelumnya</h2>
            {riwayat.length === 0 && (
              <p>Tidak ada riwayat pendaftaran sebelumnya</p>
            )}
            {riwayat.map((data) => (
              <div className="card-sebelumnya">
                <div className="reservasi">
                  <p className="kode">
                    {new Date(data.tglrencana)?.toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <img className="btn-placeholder" alt="" />
                </div>
                <p className="nama-dokter">{data.namadokter}</p>
                <p className="poliklinik">{data.namaunit}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </KontainerPage>
  )
}

export default RiwayatPendaftaran
