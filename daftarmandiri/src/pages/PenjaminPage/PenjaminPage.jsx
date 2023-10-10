import { useEffect, useRef, useState } from 'react'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import DataNotFound from './data-notfound.png'
import './PenjaminPage.scss'
import { Modal } from 'reactstrap'
import InputDM from '../../Components/InputDM/InputDM'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComboPenjamin,
  getPasienAkun,
  getPenjaminPasien,
  upsertPenjamin,
} from '../../store/actions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SelectDM from '../../Components/SelectDM/SelectDM'
import GbrBPJS from './gbr-bpjs.svg'
import GbrDropDown from './drop-down.svg'
import GbrDropUp from './drop-up.svg'

const PenjaminPage = () => {
  const refKontainer = useRef(null)
  let { penjamin, penjaminPasien, pasienAkun } = useSelector((state) => ({
    penjamin: state.UserPasien.getComboPenjamin.data?.penjamin || [],
    penjaminPasien: state.UserPasien.getPenjaminPasien.data?.penjamin || [],
    pasienAkun: state.UserPasien.getPasienAkun.data?.pasienAkun || null,
  }))
  const [showPilih, setShowPilih] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPasienAkun())
    dispatch(getComboPenjamin())
    dispatch(getPenjaminPasien())
  }, [dispatch])
  const vPenjamin = useFormik({
    initialValues: {
      idpenjamin: '',
      penjamin: '',
      nokartu: '',
    },
    validationSchema: Yup.object({
      penjamin: Yup.string().required('Penjamin harus diisi'),
      nokartu: Yup.string().required('No. Kartu harus diisi'),
    }),
    onSubmit: (values) => {
      dispatch(
        upsertPenjamin(values, () => {
          dispatch(getPasienAkun())
          dispatch(getPenjaminPasien())
          setShowPilih(false)
        })
      )
    },
  })
  penjamin = penjamin.filter((val) => val.value !== 3)
  if (pasienAkun && pasienAkun.nobpjs) {
    penjaminPasien = [
      {
        nokartu: pasienAkun.nobpjs,
        rekanan: 1,
        namarekanan: 'BPJS Kesehatan',
      },
      ...penjaminPasien,
    ]
  }
  const handleOpen = () => {
    vPenjamin.resetForm()
    setShowPilih(true)
  }
  return (
    <KontainerPage top={'0'} className="penjamin-page" ref={refKontainer}>
      <Modal
        isOpen={showPilih}
        toggle={() => setShowPilih(false)}
        centered={true}
        size="sm"
        className="modal-pilih-penjamin"
      >
        <div className="konten-modal">
          <h2>Pilih Penjamin</h2>
          <InputGroup text={'Penjamin'}>
            <SelectDM
              className="input-pasien-lama"
              id="penjamin"
              name="penjamin"
              options={penjamin}
              isError={vPenjamin.touched.penjamin && vPenjamin.errors.penjamin}
              errorMsg={vPenjamin.errors.penjamin}
              value={vPenjamin.values.penjamin}
              onChange={(e) => {
                vPenjamin.setFieldValue('penjamin', e.value)
              }}
            />
          </InputGroup>
          <InputGroup text={'No. Kartu'}>
            <InputDM
              id="nokartu"
              name="nokartu"
              type="string"
              className="input-login"
              value={vPenjamin.values.nokartu}
              errorMsg={vPenjamin.errors.nokartu}
              isError={vPenjamin.touched.nokartu && vPenjamin.errors.nokartu}
              onChange={(e) => {
                vPenjamin.handleChange(e)
              }}
            />
          </InputGroup>
          <div className="button-group-penjamin">
            <ButtonDM
              className="isi-button"
              type="button"
              onClick={() => {
                setShowPilih(false)
              }}
            >
              Batal
            </ButtonDM>
            <ButtonDM
              className="isi-button"
              type="button"
              onClick={() => vPenjamin.handleSubmit()}
            >
              Simpan
            </ButtonDM>
          </div>
        </div>
      </Modal>
      <div className="penjamin-konten">
        <BackKomponen refKontainer={refKontainer} text={'penjamin pasien'} />
        {penjaminPasien.length === 0 && (
          <div className="konten-kosong">
            <img className="img-not-found" alt="" src={DataNotFound} />
            <p className="not-found">Data Tidak Ditemukan</p>
            <p className="silakan">Silakan Tambahkan Penjamin Anda</p>
            <ButtonDM
              onClick={() => {
                handleOpen()
              }}
              className="tbl-tambah-data"
            >
              Tambah Data
            </ButtonDM>
          </div>
        )}
        {penjaminPasien.length !== 0 && (
          <div className="konten-isi">
            <ul className="penjamin-pasien">
              {penjaminPasien.map((val, idx) => (
                <IsiListPenjamin
                  key={idx}
                  data={val}
                  onEdit={() => {
                    handleOpen()
                    vPenjamin.setFieldValue('idpenjamin', val.id)
                    vPenjamin.setFieldValue('penjamin', val.rekanan)
                    vPenjamin.setFieldValue('nokartu', val.nokartu)
                  }}
                />
              ))}
            </ul>
            <ButtonDM
              onClick={() => {
                handleOpen()
              }}
              className="tbl-tambah-data"
            >
              Tambah Data
            </ButtonDM>
          </div>
        )}
      </div>
    </KontainerPage>
  )
}

const IsiListPenjamin = ({ data, onEdit, ...rest }) => {
  const [open, setOpen] = useState(false)
  return (
    <li className="isi-list-penjamin" {...rest}>
      <div className="utama" onClick={() => setOpen(!open)}>
        <img alt="" src={GbrBPJS} className="gbr-penjamin" />
        <div className="teks-rekanan">
          <p>{data.namarekanan}</p>
          <p>{data.nokartu}</p>
        </div>
        {open ? (
          <img className="dropdown" alt="drop-down" src={GbrDropUp} />
        ) : (
          <img className="dropdown" alt="drop-down" src={GbrDropDown} />
        )}
      </div>
      <div
        className="menu"
        style={
          open ? { height: 88 } : { height: '0', padding: 0, border: 'none' }
        }
      >
        <div className="tbl">
          <ButtonDM className="isi-tbl">Hapus</ButtonDM>
          <ButtonDM className="isi-tbl" onClick={() => onEdit()}>
            Edit Data
          </ButtonDM>
        </div>
      </div>
    </li>
  )
}

const InputGroup = ({ text, children }) => {
  return (
    <div className="input-group-penjamin">
      <label>{text}</label>
      {children}
    </div>
  )
}

export default PenjaminPage
