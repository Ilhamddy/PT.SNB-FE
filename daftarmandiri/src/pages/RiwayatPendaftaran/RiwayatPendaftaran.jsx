import { useEffect, useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './RiwayatPendaftaran.scss'
import { useDispatch, useSelector } from 'react-redux'
import { batalRegis, getRiwayatRegistrasi } from '../../store/actions'
import LoadingDM from '../../Components/LoadingDM/LoadingDM'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Modal } from 'reactstrap'
import InputGroupDM from '../../Components/InputGroupDM/InputGroupDM'
import InputDM from '../../Components/InputDM/InputDM'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'

const RiwayatPendaftaran = () => {
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  const vBatal = useFormik({
    initialValues: {
      norec: '',
      alasan: '',
    },
    validationSchema: Yup.object({
      alasan: Yup.string()
        .required('Alasan harus diisi')
        .max(50, 'Maksimal 50 karakter'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        batalRegis(values, () => {
          dispatch(getRiwayatRegistrasi())
          resetForm()
        })
      )
    },
  })

  const { riwayat, riwayatToday, loadingRiwayat, riwayatMendatang } =
    useSelector((state) => ({
      riwayat: state.UserPasien.getRiwayatRegistrasi.data?.riwayat || [],
      riwayatToday:
        state.UserPasien.getRiwayatRegistrasi.data?.riwayatToday || [],
      loadingRiwayat: state.UserPasien.getRiwayatRegistrasi.loading,
      riwayatMendatang:
        state.UserPasien.getRiwayatRegistrasi.data?.riwayatMendatang || [],
    }))
  useEffect(() => {
    dispatch(getRiwayatRegistrasi())
  }, [dispatch])
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="riwayat-pendaftaran">
      <div className="page-riwayat-pendaftaran">
        <BackKomponen refKontainer={refKontainer} text="Pilih Jadwal" />
        <Modal
          isOpen={vBatal.values.norec !== ''}
          toggle={() => {
            vBatal.resetForm()
          }}
          centered
        >
          <div className="modal-batal-riwayat-pendaftaran">
            <h3>Pembatalan Daftar Online</h3>
            <InputGroupDM label={'Alasan Pembatalan'}>
              <InputDM
                id="alasan"
                name="alasan"
                type="string"
                className="input-alasan w-100"
                value={vBatal.values.alasan}
                errorMsg={vBatal.errors.alasan}
                isError={vBatal.touched.alasan && vBatal.errors.alasan}
                onChange={(e) => {
                  vBatal.handleChange(e)
                }}
              />
            </InputGroupDM>
            <div className="button-group">
              <ButtonDM
                buttonType="secondary"
                onClick={() => {
                  vBatal.resetForm()
                }}
              >
                Tutup
              </ButtonDM>
              <ButtonDM
                type="button"
                onClick={() => {
                  vBatal.handleSubmit()
                }}
              >
                Batalkan
              </ButtonDM>
            </div>
          </div>
        </Modal>
        {loadingRiwayat ? (
          <LoadingDM />
        ) : (
          <>
            <h2 className="judul-hari-ini">Mendatang</h2>
            {riwayatMendatang.length === 0 && (
              <p>Tidak ada riwayat pendaftaran mendatang</p>
            )}
            {riwayatMendatang.map((data) => (
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
                  <ButtonDM className="p-2">
                    {!data.nocm ? 'Verifikasi' : 'Terdaftar'}
                  </ButtonDM>
                  <ButtonDM
                    buttonType="secondary"
                    className="p-2"
                    onClick={() => {
                      vBatal.setFieldValue('norec', data.norec)
                    }}
                  >
                    X
                  </ButtonDM>
                </div>
              </div>
            ))}
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
                  <ButtonDM className="p-2">
                    {!data.nocm ? 'Verifikasi' : 'Terdaftar'}
                  </ButtonDM>
                  <ButtonDM
                    buttonType="secondary"
                    className="p-2"
                    onClick={() => {
                      vBatal.setFieldValue('norec', data.norec)
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
