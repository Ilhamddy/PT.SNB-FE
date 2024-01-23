import { useEffect, useRef } from 'react'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import BgPendaftaran from './bg-pendaftaran.png'
import './DetailPendaftaran.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRegistrasiNorec } from '../../store/actions'
import { dateLocal } from 'frontendjs/src/utils/format'

const DetailPendaftaran = () => {
  const refKontainer = useRef(null)
  const { norec } = useParams()
  const dispatch = useDispatch()
  const { dataRegistrasi } = useSelector((state) => ({
    dataRegistrasi:
      state.UserPasien.getRegistrasiNorec.data?.registrasi || null,
  }))
  useEffect(() => {
    dispatch(getRegistrasiNorec({ norec: norec }))
  }, [norec, dispatch])
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="detail-pendaftaran">
      <div className="page-detail-pendaftaran">
        <BackKomponen refKontainer={refKontainer} text="Pilih Jadwal" />
        <img alt="" src={BgPendaftaran} className="bg-pendaftaran" />
        <div className="kontainer-pasien-baru">
          <h3 className="judul-pasien">
            {!dataRegistrasi?.nocm ? (
              <>
                Anda terdaftar sebagai <b>PASIEN BARU</b> di rumah sakit
                SNBerdikari.
              </>
            ) : (
              <>Terima kasih telah mendaftar di rumah sakit SNberdikari.</>
            )}
          </h3>
          <table className="table-reservasi">
            <tbody>
              <tr>
                <td>No Reservasi</td>
                <td>: {dataRegistrasi?.noreservasi}</td>
              </tr>
              <tr>
                <td>No RM temp</td>
                <td>: {dataRegistrasi?.nocmtemp}</td>
              </tr>
              <tr>
                <td>Tujuan Kunjungan</td>
                <td>: {dataRegistrasi?.namaunit}</td>
              </tr>
              <tr>
                <td>Tanggal Kunjungan</td>
                <td>: {dateLocal(dataRegistrasi?.tglrencana)}</td>
              </tr>
              <tr>
                <td>Penjamin</td>
                <td>: {dataRegistrasi?.namarekanan}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="kontainer-loket">
          <p className="teks-loket">
            {!dataRegistrasi?.nocm ? (
              <>
                Silakan datang ke Loket 9 untuk melakukan verifikasi data diri &
                kunjungan dengan petugas kami
              </>
            ) : dataRegistrasi.rekanan === 3 ? (
              <>
                Silakan datang ke Kasir untuk melakukan pembayaran pendaftaran
                sebelum menuju poliklinik
              </>
            ) : (
              <>
                Silakan datang ke Loket 9 untuk melakukan verifikasi data
                Asuransi dengan petugas kami
              </>
            )}
          </p>
        </div>
      </div>
    </KontainerPage>
  )
}

export default DetailPendaftaran
