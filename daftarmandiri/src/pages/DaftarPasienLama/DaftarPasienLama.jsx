import { Circle } from 'rc-progress'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { useEffect, useRef, useState } from 'react'
import './DaftarPasienLama.scss'
import InputGroupDM from '../../Components/InputGroupDM/InputGroupDM'
import InputDM from '../../Components/InputDM/InputDM'
import SelectDM from '../../Components/SelectDM/SelectDM'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComboDaftar,
  getDokterPasien,
  getPasienLama,
} from '../../store/actions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import FlatpickrDM from '../../Components/FlatpickrDM/FlatpickrDM'

const DaftarPasienLama = () => {
  const { poliklinik, dokter, penjamin, pasien, dokterTerpilih } = useSelector(
    (state) => ({
      poliklinik: state.DaftarPasienLama.getComboDaftar?.data?.poliklinik || [],
      dokter: state.DaftarPasienLama.getComboDaftar?.data?.dokter || [],
      penjamin: state.DaftarPasienLama.getComboDaftar?.data?.penjamin || [],
      pasien: state.DaftarPasienLama.getPasienLama?.data?.pasien || [],
      dokterTerpilih: state.DaftarPasienLama.getDokter?.data?.dokter || [],
    })
  )
  const [dateNow] = useState(() => new Date().toISOString())
  const vDaftar = useFormik({
    initialValues: {
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
      norm: Yup.string().required('No RM harus diisi'),
      namapasien: Yup.string().required('Nama Pasien harus diisi'),
      poliklinik: Yup.string().required('Poliklinik harus diisi'),
      dokter: Yup.string().required('Dokter harus diisi'),
      penjamin: Yup.string().required('Penjamin harus diisi'),
      noasuransi: Yup.string().required('No Asuransi harus diisi'),
      jadwal: Yup.string().required('Jadwal harus diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
      if (step === 1) {
        toast.success('Pendaftaran Berhasil')
      } else {
        setStep(1)
      }
    },
  })
  const refKontainer = useRef(null)
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
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
    if (pasien.nocm && pasien.namapasien) {
      setFF('norm', pasien.nocm)
      setFF('namapasien', pasien.namapasien)
    }
  }, [pasien.nocm, pasien.namapasien, vDaftar.setFieldValue])
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
        {step === 0 && (
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
                isError={
                  vDaftar.touched.namapasien && vDaftar.errors.namapasien
                }
                onChange={vDaftar.handleChange}
              />
            </InputGroupDM>
            <InputGroupDM label="Poliklinik">
              <SelectDM
                className="input-pasien-lama"
                id="poliklinik"
                name="poliklinik"
                options={poliklinik}
                isError={
                  vDaftar.touched.poliklinik && vDaftar.errors.poliklinik
                }
                errorMsg={vDaftar.errors.poliklinik}
                value={vDaftar.values.poliklinik}
                onChange={(e) => {
                  vDaftar.setFieldValue('poliklinik', e.value)
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
                  vDaftar.setFieldValue('dokter', e.value)
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
                  vDaftar.setFieldValue('penjamin', e.value)
                }}
              />
            </InputGroupDM>
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
            <InputGroupDM label="Pilih Rujukan">
              <SelectDM className="input-pasien-lama" />
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
                isError={
                  vDaftar.touched.namapasien && vDaftar.errors.namapasien
                }
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
                isError={
                  vDaftar.touched.poliklinik && vDaftar.errors.poliklinik
                }
                errorMsg={vDaftar.errors.poliklinik}
                value={vDaftar.values.poliklinik}
                onChange={(e) => {
                  vDaftar.setFieldValue('poliklinik', e.value)
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
                  vDaftar.setFieldValue('dokter', e.value)
                }}
                isDisabled
              />
            </InputGroupDM>
            <InputGroupDM label="rencana kunjungan">
              <FlatpickrDM
                className="input-daftar"
                name="jadwal"
                placeholder="Pilih Jadwal"
                value={vDaftar.values.jadwal}
                onChange={([newDate]) => {
                  vDaftar.setFieldValue('jadwal', newDate.toISOString() || '')
                }}
                errorMsg={vDaftar.errors.jadwal}
                isError={vDaftar.errors.jadwal && vDaftar.touched.jadwal}
                disabled
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
                  vDaftar.setFieldValue('penjamin', e.value)
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
              >
                Selesai
              </ButtonDM>
            </div>
          </>
        )}
      </div>
    </KontainerPage>
  )
}

export default DaftarPasienLama
