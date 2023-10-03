import { useEffect, useRef, useState } from 'react'
import { JadwalDokterKomponen } from '../JadwalDokter/JadwalDokter'
import dokterImg from './dokter.png'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { useDispatch, useSelector } from 'react-redux'
import { BackKomponen } from '../../Components/BackKomponen/BackKomponen'
import { getJadwalDokterDaftar } from '../../store/actions'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './DokterPage.scss'
import FlatpickrDM from '../../Components/FlatpickrDM/FlatpickrDM'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const DokterPage = () => {
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idDokter } = useParams()
  const { dokter } = useSelector((state) => ({
    dokter: state.DaftarPasienLama.getJadwalDokter?.data?.dokter || [],
  }))
  const vJadwal = useFormik({
    initialValues: {
      jadwal: '',
    },
    validationSchema: Yup.object({
      jadwal: Yup.string().required('Pilih Jadwal'),
    }),
    onSubmit: (values) => {
      refKontainer.current.handleToNextPage(() => {
        navigate(
          `/daftar/pasien-lama?tglinput=${encodeURIComponent(values.jadwal)}`
        )
      })
    },
  })
  const dokterDate = dokter?.[0]?.values || []
  const [dateNow] = useState(() => new Date())
  useEffect(() => {
    dispatch(
      getJadwalDokterDaftar({
        unitid: undefined,
        hariid: undefined,
        dokterid: idDokter,
      })
    )
  }, [dispatch, dateNow, idDokter])
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="dokter-page">
      <BackKomponen text={'Profil Dokter'} refKontainer={refKontainer} />
      <div className="dokter-page-komponen">
        <JadwalDokterKomponen
          dokters={dokter}
          imgDokter={dokterImg}
          refKontainer={refKontainer}
        />
        <div className="input-group">
          <label>Pilih Jadwal</label>
          <FlatpickrDM
            className="input-daftar"
            name="jadwal"
            placeholder="Pilih Jadwal"
            value={vJadwal.values.jadwal}
            onChange={([newDate]) => {
              vJadwal.setFieldValue('jadwal', newDate.toISOString() || '')
            }}
            errorMsg={vJadwal.errors.jadwal}
            isError={vJadwal.touched.jadwal && vJadwal.errors.jadwal}
          />
        </div>

        <ButtonDM
          className="tbl-daftar"
          onClick={() => {
            vJadwal.handleSubmit()
          }}
        >
          Daftar
        </ButtonDM>
      </div>
    </KontainerPage>
  )
}

export default DokterPage
