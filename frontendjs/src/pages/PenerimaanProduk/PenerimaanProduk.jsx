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
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../Select/Select'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { dateLocal, onChangeStrNbr, strToNumber } from '../../utils/format'
import { comboPenerimaanBarangGet } from '../../store/master/action'
import {
  kemasanFromProdukGet,
  penerimaanSaveOrUpdate,
  penerimaanQueryGet,
  getPemesanan,
  upsertReturBarang,
} from '../../store/gudang/action'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import {
  InputProdukDetail,
  InputUmumTerima,
  ListAfterRetur,
  ListBeforRetur,
  ListPesan,
  useCalculatePenerimaan,
  useFillInitialInput,
  useGetData,
  useGetKemasan,
  useSetNorecPenerimaan,
  InputProdukDetailRetur,
  ListDetail,
  useCalculateRetur,
} from './PenerimaanProdukKomponen'

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
  isRetur: false,
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

const PenerimaanProduk = ({ isLogistik, isRetur }) => {
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
    initialValues: {
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
      },
      detail: [],
      retur: [],
      islogistik: !!isLogistik,
      isRetur: !!isRetur,
    },
    validationSchema: Yup.object({
      penerimaan: Yup.object().shape({
        nomorterima: Yup.string().required('No Terima harus diisi'),
        tanggalterima: Yup.string().required('Tanggal Terima harus diisi'),
        namasupplier: Yup.string().required('Nama Supplier harus diisi'),
        nomorpo: Yup.string().required('No PO harus diisi'),
        tanggalpesan: Yup.string().required('Tanggal Pesan harus diisi'),
        unitpesan: Yup.string().required('Unit Pesan harus diisi'),
        tanggaljatuhtempo: Yup.string().required(
          'Tanggal Jatuh Tempo harus diisi'
        ),
        sumberdana: Yup.string().required('Sumber Dana harus diisi'),
        keterangan: Yup.string().required('Keterangan harus diisi'),
      }),
      detail: Yup.array(),
    }),
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
      if (!isRetur) {
        dispatch(
          penerimaanSaveOrUpdate(newVal, (newNorec) => {
            navigate(`/farmasi/gudang/penerimaan-produk/${newNorec}`)
            dispatch(penerimaanQueryGet({ norecpenerimaan: norecpenerimaan }))
          })
        )
      } else {
        dispatch(
          upsertReturBarang(newVal, (newNorec) => {
            dispatch(penerimaanQueryGet({ norecpenerimaan: norecpenerimaan }))
          })
        )
      }
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
      norecdetailretur: '',
      jumlahretur: '',
      alasanretur: '',
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
      const isEdit = newValues.indexDetail !== ''
      if (existSameProduk) {
        toast.error('Produk dengan batch sama sudah ada')
        return
      }
      newValues.indexDetail = newReturValues.length
      newReturValues.push(newValues)
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

  const refSatuanTerima = useGetKemasan(vDetail, detail)
  useGetData(isLogistik)
  useFillInitialInput(validation)
  useCalculatePenerimaan(vDetail, detail)
  useCalculateRetur(vDetailRetur, validation.values.detail)
  useSetNorecPenerimaan(validation)

  const isShowPesan =
    isPesan ||
    (detailPemesananPenerimaan.length > 0 && !isPesan && !norecpenerimaan)

  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb
          title={
            isRetur
              ? 'Retur barang'
              : isLogistik
              ? 'Penerimaan Logistik'
              : 'Penerimaan Produk'
          }
          pageTitle="Gudang"
        />
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
              isRetur: isRetur,
            }}
          >
            {isRetur ? (
              <>
                <InputUmumTerima />
                <ListBeforRetur />
                <InputProdukDetailRetur />
                <ListAfterRetur />
              </>
            ) : (
              <>
                <InputUmumTerima />
                {isShowPesan && <ListPesan />}
                <InputProdukDetail />
                <ListDetail />
              </>
            )}
          </PenerimaanContext.Provider>
        </Form>
      </Container>
    </div>
  )
}

export default PenerimaanProduk
