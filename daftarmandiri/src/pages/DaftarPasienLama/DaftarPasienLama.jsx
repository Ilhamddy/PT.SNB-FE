import { Circle } from 'rc-progress'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { useEffect, useRef, useState } from 'react'
import './DaftarPasienLama.scss'
import InputGroupDM from '../../Components/InputGroupDM/InputGroupDM'
import InputDM from '../../Components/InputDM/InputDM'
import SelectDM from '../../Components/SelectDM/SelectDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import LoadingDM from '../../Components/LoadingDM/LoadingDM'
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComboDaftar,
  getDokterPasien,
  getJadwalDokterDaftar,
  getPasienLama,
  savePasienMandiri,
} from '../../store/actions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import FlatpickrDM from '../../Components/FlatpickrDM/FlatpickrDM'
import { getDateStartEndNull } from 'backendjs/app/utils/dateutils'

const DaftarPasienLama = () => {
  const {
    poliklinik,
    dokter,
    penjamin,
    pasien,
    loadingPasien,
    dokterTerpilih,
    isNotPasienSementara,
    loadingSubmit,
    dokterDate,
    jadwalCuti,
  } = useSelector((state) => ({
    poliklinik: state.DaftarPasienLama.getComboDaftar?.data?.poliklinik || [],
    dokter: state.DaftarPasienLama.getComboDaftar?.data?.dokter || [],
    penjamin: state.DaftarPasienLama.getComboDaftar?.data?.penjamin || [],
    pasien: state.DaftarPasienLama.getPasienLama?.data?.pasien || [],
    isNotPasienSementara:
      state.DaftarPasienLama.getPasienLama?.data?.isNotPasienSementara || false,
    loadingPasien: state.DaftarPasienLama.getPasienLama.loading || false,
    dokterTerpilih: state.DaftarPasienLama.getDokter?.data?.dokter || [],
    loadingSubmit: state.DaftarPasienLama.savePasienMandiri.loading || false,
    dokterDate: state.DaftarPasienLama.getJadwalDokter?.data?.dokter || [],
    jadwalCuti: state.DaftarPasienLama.getJadwalDokter?.data?.jadwalCuti || [],
  }))
  const jadwalCutiDate = jadwalCuti.map((jadwal) => jadwal.tgllibur)

  const dDate = dokterDate?.[0]?.values || []
  let { step } = useParams()
  const [searchParams] = useSearchParams()
  step = Number(step)
  const [dateNow] = useState(() => new Date().toISOString())
  const vDaftar = useFormik({
    initialValues: {
      nocmfk: '',
      norm: '',
      namapasien: '',
      poliklinik: '',
      dokter: '',
      penjamin: '',
      noasuransi: '',
      rujukan: '',
      jadwal: dateNow,
    },
    validationSchema: Yup.object({
      nocmfk: Yup.string().required('No RM harus diisi'),
      norm: Yup.string().required('No RM harus diisi'),
      namapasien: Yup.string().required('Nama Pasien harus diisi'),
      poliklinik: Yup.string().required('Poliklinik harus diisi'),
      dokter: Yup.string().required('Dokter harus diisi'),
      jenispenjamin: Yup.string().required('Jenis Penjamin kosong'),
      penjamin: Yup.string().required('Penjamin harus diisi'),
      jadwal: Yup.string().required('Jadwal harus diisi'),
      noasuransi: Yup.string().when('penjamin', {
        is: (val) => val !== '3',
        then: () => Yup.string().required('No Asuransi Harus Diisi'),
      }),
      rujukan: Yup.string().when('penjamin', {
        is: (val) => val === '1',
        then: () => Yup.string().required('Rujukan Harus Diisi'),
      }),
    }),
    onSubmit: (values) => {
      if (step === 1) {
        dispatch(
          savePasienMandiri(values, () => {
            refKontainer.current?.handleToNextPage(() => {
              navigate('/riwayat-daftar')
            })
          })
        )
      } else {
        navigate(`/daftar/pasien-lama/1?${createSearchParams(searchParams)}`)
      }
    },
  })
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const headerName = ['Pengisian Data Kunjugan', 'Konfirmasi Data Kunjungan']
  const handleKembali = () => {
    refKontainer.current.handleToNextPage(() => {
      navigate(-1)
    })
  }
  useEffect(() => {
    const setFF = vDaftar.setFieldValue
    if (pasien.namapasien) {
      setFF('nocmfk', pasien.nocmfk)
      setFF('norm', pasien.nocm || pasien.nocmtemp || '')
      setFF('namapasien', pasien.namapasien)
    }
  }, [
    pasien.nocm,
    pasien.namapasien,
    pasien.nocmfk,
    pasien.nocmtemp,
    vDaftar.setFieldValue,
  ])
  useEffect(() => {
    const setFF = vDaftar.setFieldValue
    if (dokterTerpilih.iddokter && dokterTerpilih.idunit) {
      console.log('masuk')
      setFF('dokter', dokterTerpilih.iddokter)
      setFF('poliklinik', dokterTerpilih.idunit)
    }
  }, [dokterTerpilih.iddokter, dokterTerpilih.idunit, vDaftar.setFieldValue])
  const id = searchParams.get('iddokter')
  const jadwal = searchParams.get('jadwal')
  useEffect(() => {
    const setFF = vDaftar.setFieldValue
    dispatch(getPasienLama())
    dispatch(getDokterPasien({ iddokter: id }))
    dispatch(getComboDaftar())
    setFF('jadwal', decodeURIComponent(jadwal))
  }, [dispatch, id, jadwal, vDaftar.setFieldValue])

  useEffect(() => {
    dispatch(
      getJadwalDokterDaftar({
        unitid: undefined,
        hariid: undefined,
        dokterid: vDaftar.values.dokter,
      })
    )
  }, [vDaftar.values.dokter, dispatch])

  const disableJadwal = (date) => {
    const foundDay = dDate.find((item) => {
      return item.hariid === date.getDay()
    })
    return !foundDay
  }
  const disableBeforeToday = (date) => {
    console.log(date)
    let dateNowDate = new Date(dateNow)
    return date <= new Date(dateNowDate - 24 * 60 * 60 * 1000)
  }
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

  const kontenLogin = (
    <>
      {step === 0 && (
        <>
          <InputGroupDM label="No. RM">
            <InputDM
              id="norm"
              name="norm"
              type="string"
              className="input-pasien-lama"
              disabled
              value={vDaftar.values.norm}
              errorMsg={vDaftar.errors.norm}
              isError={vDaftar.touched.norm && vDaftar.errors.norm}
              onChange={vDaftar.handleChange}
            />
          </InputGroupDM>
          <InputGroupDM label="Nama Pasien">
            <InputDM
              id="namapasien"
              name="norm"
              disabled
              type="string"
              className="input-pasien-lama"
              value={vDaftar.values.namapasien}
              errorMsg={vDaftar.errors.namapasien}
              isError={vDaftar.touched.namapasien && vDaftar.errors.namapasien}
              onChange={vDaftar.handleChange}
            />
          </InputGroupDM>
          <InputGroupDM label="Poliklinik">
            <SelectDM
              className="input-pasien-lama"
              id="poliklinik"
              name="poliklinik"
              options={poliklinik}
              isError={vDaftar.touched.poliklinik && vDaftar.errors.poliklinik}
              errorMsg={vDaftar.errors.poliklinik}
              value={vDaftar.values.poliklinik}
              onChange={(e) => {
                vDaftar.setFieldValue('poliklinik', e?.value)
              }}
            />
          </InputGroupDM>
          <InputGroupDM label="Dokter Tujuan">
            <SelectDM
              className="input-pasien-lama"
              id="dokter"
              name="dokter"
              options={dokter}
              isError={vDaftar.touched.dokter && vDaftar.errors.dokter}
              errorMsg={vDaftar.errors.dokter}
              value={vDaftar.values.dokter}
              onChange={(e) => {
                vDaftar.setFieldValue('dokter', e?.value)
              }}
            />
          </InputGroupDM>
          <InputGroupDM label="Penjamin">
            <SelectDM
              className="input-pasien-lama"
              id="penjamin"
              name="penjamin"
              options={penjamin}
              isError={vDaftar.touched.penjamin && vDaftar.errors.penjamin}
              errorMsg={vDaftar.errors.penjamin}
              value={vDaftar.values.penjamin}
              onChange={(e) => {
                vDaftar.setFieldValue('penjamin', e?.value)
                vDaftar.setFieldValue('jenispenjamin', e.objectjenispenjaminfk)
              }}
            />
          </InputGroupDM>
          {vDaftar.values.penjamin !== 3 && (
            <InputGroupDM label="No Asuransi">
              <InputDM
                id="noasuransi"
                name="noasuransi"
                type="string"
                className="input-pasien-lama"
                value={vDaftar.values.noasuransi}
                errorMsg={vDaftar.errors.noasuransi}
                isError={
                  vDaftar.touched.noasuransi && vDaftar.errors.noasuransi
                }
                onChange={vDaftar.handleChange}
              />
            </InputGroupDM>
          )}
          {vDaftar.values.penjamin === 1 && (
            <InputGroupDM label="Pilih Rujukan">
              <SelectDM className="input-pasien-lama" />
            </InputGroupDM>
          )}
          <div className="buttons-done">
            <ButtonDM className="button" onClick={handleKembali}>
              Kembali
            </ButtonDM>
            <ButtonDM
              className="button"
              type="button"
              onClick={() => {
                vDaftar.handleSubmit()
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                })
              }}
              isLoading={loadingSubmit}
            >
              Daftar
            </ButtonDM>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <InputGroupDM label="No. RM">
            <InputDM
              id="norm"
              name="norm"
              type="string"
              className="input-pasien-lama"
              value={vDaftar.values.norm}
              errorMsg={vDaftar.errors.norm}
              isError={vDaftar.touched.norm && vDaftar.errors.norm}
              onChange={vDaftar.handleChange}
              disabled
            />
          </InputGroupDM>
          <InputGroupDM label="Nama Pasien">
            <InputDM
              id="namapasien"
              name="norm"
              type="string"
              className="input-pasien-lama"
              value={vDaftar.values.namapasien}
              errorMsg={vDaftar.errors.namapasien}
              isError={vDaftar.touched.namapasien && vDaftar.errors.namapasien}
              disabled
              onChange={vDaftar.handleChange}
            />
          </InputGroupDM>
          <InputGroupDM label="Poliklinik">
            <SelectDM
              className="input-pasien-lama"
              id="poliklinik"
              name="poliklinik"
              options={poliklinik}
              isError={vDaftar.touched.poliklinik && vDaftar.errors.poliklinik}
              errorMsg={vDaftar.errors.poliklinik}
              value={vDaftar.values.poliklinik}
              onChange={(e) => {
                vDaftar.setFieldValue('poliklinik', e?.value)
              }}
              isDisabled
            />
          </InputGroupDM>
          <InputGroupDM label="Dokter Tujuan">
            <SelectDM
              className="input-pasien-lama"
              id="dokter"
              name="dokter"
              options={dokter}
              isError={vDaftar.touched.dokter && vDaftar.errors.dokter}
              errorMsg={vDaftar.errors.dokter}
              value={vDaftar.values.dokter}
              onChange={(e) => {
                vDaftar.setFieldValue('dokter', e?.value)
              }}
              isDisabled
            />
          </InputGroupDM>
          <InputGroupDM label="Rencana Kunjungan">
            <FlatpickrDM
              className="input-daftar"
              name="jadwal"
              placeholder="Pilih Jadwal"
              value={vDaftar.values.jadwal}
              options={{
                disable: [disableJadwal, disableBeforeToday, disableCuti],
              }}
              onChange={([newDate]) => {
                vDaftar.setFieldValue('jadwal', newDate.toISOString() || '')
              }}
              errorMsg={vDaftar.errors.jadwal}
              isError={vDaftar.errors.jadwal && vDaftar.touched.jadwal}
            />
          </InputGroupDM>
          <InputGroupDM label="Penjamin">
            <SelectDM
              className="input-pasien-lama"
              id="penjamin"
              name="penjamin"
              options={penjamin}
              isError={vDaftar.touched.penjamin && vDaftar.errors.penjamin}
              errorMsg={vDaftar.errors.penjamin}
              value={vDaftar.values.penjamin}
              onChange={(e) => {
                vDaftar.setFieldValue('penjamin', e?.value)
              }}
              isDisabled
            />
          </InputGroupDM>
          <div className="buttons-done">
            <ButtonDM className="button" onClick={handleKembali}>
              Kembali
            </ButtonDM>
            <ButtonDM
              className="button"
              type="button"
              onClick={() => {
                vDaftar.handleSubmit()
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                })
              }}
              isLoading={loadingSubmit}
            >
              Selesai
            </ButtonDM>
          </div>
        </>
      )}
    </>
  )

  return (
    <KontainerPage
      top={'120px'}
      ref={refKontainer}
      className="daftar-pasien-lama-page"
      header={
        <div className="header-daftar-pasien-lama">
          <div className="kontainer-progress-bar">
            <Circle
              className="progress-bar"
              percent={((step + 1) / headerName.length) * 100}
              strokeWidth={10}
              trailWidth={10}
              strokeColor="#715A06"
              trailColor="#F0E2B3"
            />
            <p className="teks">
              {step + 1}/{headerName.length}
            </p>
          </div>
          <div className="kontainer-header">
            <h2>{headerName[step]}</h2>
            <h3>
              Selanjutnya : {headerName[step + 1] || 'Pendaftaran Baru Selesai'}
            </h3>
          </div>
        </div>
      }
    >
      <div className="body-daftar-pasien-lama">
        {loadingPasien ? <LoadingDM /> : kontenLogin}
      </div>
    </KontainerPage>
  )
}

export default DaftarPasienLama
