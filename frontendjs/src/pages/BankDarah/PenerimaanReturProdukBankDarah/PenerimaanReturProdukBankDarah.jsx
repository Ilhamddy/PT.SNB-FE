import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { dateLocal, onChangeStrNbr, strToNumber } from '../../../utils/format'
import { comboPenerimaanBarangGet } from '../../../store/master/action'
import {
  kemasanFromProdukGet,
  penerimaanSaveOrUpdate,
  penerimaanQueryGet,
  getPemesanan,
  upsertReturBarang,
  getRetur,
} from '../../../store/gudang/action'
import {
  InputUmumTerima,
  ListAfterRetur,
  ListBeforeRetur,
  useCalculatePenerimaan,
  useFillInitialInput,
  useGetData,
  useGetKemasan,
  useSetNorecPenerimaan,
  InputProdukDetailRetur,
  useCalculateRetur,
} from './PenerimaanReturProdukKomponenBankDarah'

const PenerimaanReturProdukBankDarah = ({ isLogistik, isRetur = true }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { norecpenerimaan, norecpesan } = useParams()
  const isPesan = !!norecpesan

  const [dateNow] = useState(() => new Date().toISOString())

  const { detailPemesanan, detailPemesananPenerimaan } = useSelector(
    (state) => ({
      detailPemesanan: state.Gudang.getPemesanan.data?.detailPemesanan || [],
      detailPemesananPenerimaan:
        state.Gudang.penerimaanQueryGet.data?.detailPemesanan || [],
    }),
    shallowEqual
  )

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialData(dateNow, isLogistik),
    validationSchema: Yup.object(validationData()),
    onSubmit: (values) => {
      /**
       * @type {typeof values}
       */
      const newVal = JSON.parse(JSON.stringify(values))
      newVal.detail = newVal.detail.map((valDetail) => {
        const newValDetail = { ...valDetail }
        newValDetail.subtotalproduk = strToNumber(newValDetail.subtotalproduk)
        newValDetail.totalproduk = strToNumber(newValDetail.totalproduk)
        newValDetail.diskonrupiah = strToNumber(newValDetail.diskonrupiah)
        newValDetail.ppnrupiahproduk = strToNumber(newValDetail.ppnrupiahproduk)
        newValDetail.hargasatuankecil = strToNumber(
          newValDetail.hargasatuankecil
        )
        newValDetail.hargasatuanterima = strToNumber(
          newValDetail.hargasatuanterima
        )
        newValDetail.diskonpersen = strToNumber(newValDetail.diskonpersen)
        newValDetail.ppnpersenproduk = strToNumber(newValDetail.ppnpersenproduk)
        newValDetail.konversisatuan = strToNumber(newValDetail.konversisatuan)
        newValDetail.jumlahterima = strToNumber(newValDetail.jumlahterima)
        return newValDetail
      })
      newVal.retur = newVal.retur.map((valDetail) => {
        const newValDetail = { ...valDetail }
        newValDetail.subtotalproduk = strToNumber(newValDetail.subtotalproduk)
        newValDetail.totalproduk = strToNumber(newValDetail.totalproduk)
        newValDetail.diskonrupiah = strToNumber(newValDetail.diskonrupiah)
        newValDetail.ppnrupiahproduk = strToNumber(newValDetail.ppnrupiahproduk)
        newValDetail.hargasatuankecil = strToNumber(
          newValDetail.hargasatuankecil
        )
        newValDetail.hargasatuanterima = strToNumber(
          newValDetail.hargasatuanterima
        )
        newValDetail.diskonpersen = strToNumber(newValDetail.diskonpersen)
        newValDetail.ppnpersenproduk = strToNumber(newValDetail.ppnpersenproduk)
        newValDetail.konversisatuan = strToNumber(newValDetail.konversisatuan)
        newValDetail.jumlahterima = strToNumber(newValDetail.jumlahterima)
        newValDetail.jumlahretur = strToNumber(newValDetail.jumlahretur)
        return newValDetail
      })

      newVal.penerimaan.norecpenerimaan = norecpenerimaan || ''
      newVal.penerimaan.subtotal = strToNumber(newVal.penerimaan.subtotal)
      newVal.penerimaan.total = strToNumber(newVal.penerimaan.total)
      newVal.penerimaan.diskonrupiah = strToNumber(
        newVal.penerimaan.diskonrupiah
      )
      newVal.penerimaan.ppnrupiah = strToNumber(newVal.penerimaan.ppnrupiah)
      dispatch(
        upsertReturBarang(newVal, (data) => {
          navigate(
            `/farmasi/gudang/penerimaan-produk-retur/${norecpenerimaan}/${data?.upsertedRetur?.norec}`
          )
          dispatch(penerimaanQueryGet({ norecpenerimaan: norecpenerimaan }))
          dispatch(getRetur({ norecretur: data?.upsertedRetur?.norec }))
        })
      )
    },
  })

  const vDetail = useFormik({
    enableReinitialize: true,
    initialValues: initialDetail(dateNow),
    validationSchema: Yup.object(validationDetail),
    onSubmit: (values, { resetForm }) => {
      const newDetailValues = [...validation.values.detail]
      const newValues = { ...values }
      const findSameProduk = newDetailValues.find(
        (val) =>
          val.produk.idproduk === newValues.produk.idproduk &&
          val.nobatch === newValues.nobatch
      )
      const existSameProduk = !!findSameProduk
      const isEdit = newValues.indexDetail !== ''
      if (existSameProduk) {
        toast.error('Produk dengan batch sama sudah ada')
        return
      }
      if (isEdit) {
        // edit
        newDetailValues[values.indexDetail] = newValues
      } else {
        newValues.indexDetail = newDetailValues.length
        newDetailValues.push(newValues)
      }
      resetForm()
      validation.setFieldValue('detail', newDetailValues)
    },
  })

  const vDetailRetur = useFormik({
    initialValues: {
      ...initialDetailRetur(dateNow),
    },
    validationSchema: Yup.object({
      produk: Yup.object().shape({
        idproduk: Yup.string().required('Produk harus diisi'),
        satuanjual: Yup.string().required('Satuan jual harus diisi'),
      }),
      jumlahretur: Yup.string().required('Jumlah retur harus diisi'),
      alasanretur: Yup.string().required('Alasan retur harus diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newReturValues = [...validation.values.retur]
      const newValues = { ...values }
      const findSameProduk = newReturValues.find(
        (val) =>
          val.produk.idproduk === newValues.produk.idproduk &&
          val.nobatch === newValues.nobatch
      )
      const existSameProduk = !!findSameProduk
      const isEdit = newValues.indexRetur !== ''
      if (isEdit) {
        // edit
        newReturValues[values.indexRetur] = newValues
      } else {
        if (existSameProduk) {
          toast.error('Produk dengan batch sama sudah ada')
          return
        }
        newValues.indexRetur = newReturValues.length
        newReturValues.push(newValues)
      }
      resetForm()
      validation.setFieldValue('retur', newReturValues)
    },
  })

  const detail = vDetail.values
  const detailTouched = vDetail.touched
  const detailErr = vDetail.errors

  const penerimaan = validation.values.penerimaan
  const penerimaanTouched = validation.touched.penerimaan
  const penerimaanErr = validation.errors.penerimaan

  const handleChangePenerimaan = useCallback(
    (field, newVal) => {
      const setFF = validation.setFieldValue
      setFF('penerimaan', {
        ...penerimaan,
        [field]: newVal,
      })
    },
    [validation.setFieldValue, penerimaan]
  )

  const handleChangeDetail = useCallback(
    (field, newVal) => {
      const setFF = vDetail.setFieldValue
      setFF(field, newVal)
    },
    [vDetail.setFieldValue]
  )

  const handleChangeJumlahTerima = (e) => {
    const newVal = onChangeStrNbr(e.target.value, detail.jumlahterima)
    handleChangeDetail('jumlahterima', newVal)
  }

  // all side effect is here
  const refSatuanTerima = useGetKemasan(vDetail, detail)
  useGetData(isLogistik)
  useFillInitialInput(validation)
  useCalculatePenerimaan(vDetail)
  useCalculateRetur(vDetailRetur, validation.values.detail)
  useSetNorecPenerimaan(validation)

  return (
    <div className="page-content page-penerimaan-barang">
      <Container fluid>
        <BreadCrumb title={'Retur barang'} pageTitle="Gudang" />
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
          className="gy-4"
          id="form-input-penerimaan"
        >
          <PenerimaanContext.Provider
            value={{
              penerimaan: penerimaan,
              penerimaanTouched: penerimaanTouched,
              penerimaanErr: penerimaanErr,
              handleChangePenerimaan: handleChangePenerimaan,
              vDetail: vDetail,
              detail: detail,
              detailErr: detailErr,
              detailTouched: detailTouched,
              handleChangeDetail: handleChangeDetail,
              handleChangeJumlahTerima: handleChangeJumlahTerima,
              refSatuanTerima: refSatuanTerima,
              detailPemesanan: detailPemesanan,
              detailPemesananPenerimaan: detailPemesananPenerimaan,
              validation: validation,
              isLogistik: isLogistik,
              vDetailRetur: vDetailRetur,
            }}
          >
            <InputUmumTerima />
            <ListBeforeRetur />
            <InputProdukDetailRetur />
            <ListAfterRetur />
            {/*  ) : (
               <>
                 <InputUmumTerima />
                 {isShowPesan && <ListPesan />}
                 <InputProdukDetail />
                 <ListDetail />
               </>
             )} */}
          </PenerimaanContext.Provider>
        </Form>
      </Container>
    </div>
  )
}

const initialData = (dateNow, isLogistik) => ({
  norecretur: '',
  norecpenerimaan: '',
  norecpemesanan: '',
  penerimaan: {
    nomorterima: '',
    tanggalterima: dateNow,
    namasupplier: '',
    nomorpo: '',
    tanggalpesan: dateNow,
    unitpesan: '',
    tanggaljatuhtempo: dateNow,
    sumberdana: '',
    keterangan: '',
    subtotal: '',
    ppnrupiah: '',
    diskonrupiah: '',
    total: '',
    nomorretur: '',
  },
  detail: [],
  retur: [],
  islogistik: !!isLogistik,
  isRetur: true,
})

const validationData = () => ({
  penerimaan: Yup.object().shape({
    nomorterima: Yup.string().required('No Terima harus diisi'),
    tanggalterima: Yup.string().required('Tanggal Terima harus diisi'),
    namasupplier: Yup.string().required('Nama Supplier harus diisi'),
    nomorpo: Yup.string().required('No PO harus diisi'),
    tanggalpesan: Yup.string().required('Tanggal Pesan harus diisi'),
    unitpesan: Yup.string().required('Unit Pesan harus diisi'),
    tanggaljatuhtempo: Yup.string().required('Tanggal Jatuh Tempo harus diisi'),
    sumberdana: Yup.string().required('Sumber Dana harus diisi'),
    keterangan: Yup.string().required('Keterangan harus diisi'),
    nomorretur: Yup.string().required('Retur harus diisi'),
  }),
  detail: Yup.array(),
})

export const PenerimaanContext = createContext({
  penerimaan: null,
  penerimaanTouched: null,
  penerimaanErr: null,
  handleChangePenerimaan: null,
  vDetail: null,
  detail: null,
  detailErr: null,
  detailTouched: null,
  handleChangeDetail: null,
  handleChangeJumlahTerima: null,
  refSatuanTerima: null,
  detailPemesanan: null,
  detailPemesananPenerimaan: null,
  norecpesan: null,
  validation: null,
  total: null,
  ppn: null,
  subtotal: null,
  diskon: null,
  isLogistik: null,
  vDetailRetur: null,
})

export const initialDetail = (dateNow) => ({
  indexDetail: '',
  norecdetailpenerimaan: '',
  produk: {
    idproduk: '',
    namaproduk: '',
    satuanjual: '',
    namasatuanjual: '',
  },
  satuanterima: '',
  namasatuanterima: '',
  konversisatuan: '',
  jumlahterima: '',
  checkedharga: '0',
  hargasatuankecil: '',
  hargasatuanterima: '',
  checkeddiskon: '0',
  diskonpersen: '',
  diskonrupiah: '',
  ppnrupiahproduk: '',
  ppnpersenproduk: '',
  tanggaled: dateNow,
  nobatch: '',
  subtotalproduk: '',
  totalproduk: '',
})

export const initialDetailRetur = (dateNow) => ({
  ...initialDetail(dateNow),
  indexRetur: '',
  norecdetailretur: '',
  jumlahretur: '',
  alasanretur: '',
})

export const validationDetail = {
  produk: Yup.object().shape({
    idproduk: Yup.string().required('Produk harus diisi'),
    satuanjual: Yup.string().required('Satuan jual harus diisi'),
  }),
  satuanterima: Yup.string().required('Satuan Terima harus diisi'),
  konversisatuan: Yup.string().required('Konversi Satuan harus diisi'),
  jumlahterima: Yup.string().required('Jumlah Terima harus diisi'),
  hargasatuankecil: Yup.string().when('checkedharga', {
    is: (val) => val === '0',
    then: () => Yup.string().required('Harga satuan kecil harus diisi'),
  }),
  hargasatuanterima: Yup.string().required('Harga satuan terima harus diisi'),
  diskonpersen: Yup.string().when('checkeddiskon', {
    is: (val) => val === '0',
    then: () => Yup.string().required('Diskon harus diisi'),
  }),
  diskonrupiah: Yup.string().required('Diskon harus diisi'),
  ppnrupiahproduk: Yup.string().required('PPN Rupiah harus diisi'),
  ppnpersenproduk: Yup.string().required('PPN Persen harus diisi'),
  tanggaled: Yup.string().required('Tanggal ED harus diisi'),
  nobatch: Yup.string().required('No Batch harus diisi'),
  subtotalproduk: Yup.string().required('Subtotal harus diisi'),
  totalproduk: Yup.string().required('Total harus diisi'),
}

export default PenerimaanReturProdukBankDarah
