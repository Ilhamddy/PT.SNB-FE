import { useEffect, useRef, useState } from 'react'
import { JadwalDokterKomponen } from '../JadwalDokter/JadwalDokter'
import dokterImg from './dokter.png'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { useDispatch, useSelector } from 'react-redux'
import { BackKomponen } from '../../Components/BackKomponen/BackKomponen'
import { getJadwalDokterDaftar } from '../../store/actions'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './DokterPage.scss'
import FlatpickrDM from '../../Components/FlatpickrDM/FlatpickrDM'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getDateStartEndNull } from '../../utils/dateutils'

const DokterPage = () => {
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idDokter } = useParams()
  const { dokter, jadwalCuti } = useSelector((state) => ({
    dokter: state.DaftarPasienLama.getJadwalDokter?.data?.dokter || [],
    jadwalCuti: state.DaftarPasienLama.getJadwalDokter?.data?.jadwalCuti || [],
  }))
  const jadwalCutiDate = jadwalCuti.map((jadwal) => jadwal.tgllibur)

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
          `/daftar/pasien-lama/0?jadwal=${encodeURIComponent(
            values.jadwal
          )}&iddokter=${idDokter}`
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

  const disableJadwal = (date) => {
    const foundDay = dokterDate.find((item) => {
      return item.hariid === date.getDay()
    })
    return !foundDay
  }
  const disableBeforeToday = (date) => {
    return date <= new Date(dateNow - 24 * 60 * 60 * 1000)
  }
  console.log(jadwalCutiDate)
  const disableCuti = (date) => {
    for (let i = 0; i < jadwalCutiDate.length; i++) {
      const dateCuti = jadwalCutiDate[i]
      let { todayStart: todayCuti } = getDateStartEndNull(dateCuti)
      let { todayStart: todayDate } = getDateStartEndNull(date.toISOString())
      todayCuti = todayCuti.toISOString()
      todayDate = todayDate.toISOString()
      if (todayCuti === todayDate) {
        return true
      }
    }
    return false
  }
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="dokter-page">
      <BackKomponen text={'Profil Dokter'} refKontainer={refKontainer} />
      <div className="dokter-page-komponen">
        <JadwalDokterKomponen
          dokters={dokter}
          imgDokter={dokterImg}
          refKontainer={refKontainer}
          canClick={false}
        />
        <div className="input-group">
          <label>Pilih Jadwal</label>
          <FlatpickrDM
            className="input-daftar"
            name="jadwal"
            placeholder="Pilih Jadwal"
            value={vJadwal.values.jadwal}
            options={{
              disable: [disableJadwal, disableBeforeToday, disableCuti],
            }}
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
