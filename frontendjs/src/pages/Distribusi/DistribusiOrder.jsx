import { ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
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
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Flatpickr from 'react-flatpickr'
import CustomSelect from '../Select/Select'
import { onChangeStrNbr, strToNumber } from '../../utils/format'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  createOrUpdateOrderbarang,
  getOrderStokBatch,
  getStokBatch,
  getUnitUser,
  kemasanFromProdukGet,
} from '../../store/actions'
import { APIClient } from '../../helpers/api_helper'
import { comboDistribusiOrderGet } from '../../store/master/action'
import { useParams, useNavigate } from 'react-router-dom'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'

const DistribusiOrder = ({ isUnit, isLogistik = false }) => {
  const dispatch = useDispatch()
  const [tglSekarang] = useState(() => new Date().toISOString())
  const { norecorder } = useParams()
  const navigate = useNavigate()

  let { stokBatch, satuan, unit, unitUser, jenisorderbarang, orderStokBatch } =
    useSelector((state) => ({
      stokBatch: state.Distribusi.getStokBatch?.data || [],
      satuan: state.Gudang.kemasanFromProdukGet || null,
      unit: state.Master.comboDistribusiOrderGet.data?.unit || [],
      unitUser: state.Master.comboDistribusiOrderGet.data?.unitUser || [],
      jenisorderbarang:
        state.Master.comboDistribusiOrderGet.data?.jenisorderbarang || [],
      orderStokBatch: state.Distribusi.getOrderStokBatch.data || null,
    }))

  const refSatuan = useRef(null)
  const refProduk = useRef(null)

  const vOrder = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecorder: '',
      tanggalorder: tglSekarang,
      noorder: '',
      jenisorder: '',
      unitorder: '',
      unittujuan: '',
      keterangan: '',
      /**@type {import("../../../../backendjs/app/queries/gudang/distribusi.queries").ListOrderStokUnit} */
      isiproduk: [],
      islogistik: !!isLogistik,
    },
    validationSchema: Yup.object({
      tanggalorder: Yup.string().required('Tanggal Order harus diisi'),
      noorder: Yup.string().required('No Order harus diisi'),
      jenisorder: Yup.string().required('Jenis Order harus diisi'),
      unitorder: Yup.string().required('Unit Order harus diisi'),
      unittujuan: Yup.string().required('Unit Tujuan harus diisi'),
      keterangan: Yup.string().required('Keterangan Order harus diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        createOrUpdateOrderbarang(values, (response) => {
          resetForm()
          navigate(
            `/${isLogistik ? 'logistik' : 'farmasi'}/gudang/distribusi-order/${
              response.data.createdOrUpdatedPenerimaan.norec
            }`
          )
        })
      )
    },
  })

  const vProduk = useFormik({
    enableReinitialize: true,
    initialValues: {
      produk: '',
      namaproduk: '',
      satuan: '',
      namasatuan: '',
      konversi: '',
      jumlah: '0',
      /**@type {typeof vOrder.values.isiproduk} */
      batch: [],
    },
    validationSchema: Yup.object({
      produk: Yup.string().required('Produk harus diisi'),
      satuan: Yup.string().required('Satuan harus diisi'),
      jumlah: Yup.string()
        .notOneOf(['0'], 'Jumlah harus lebih dari 0')
        .required('Jumlah harus diisi'),
      // validation jumlah harus lebih kecil dari stok sudah ada di handleJmlSatuanChange
    }),
    onSubmit: (values, { resetForm }) => {
      // prioritaskan batch yang pertama kalin masuk
      // kurangkan jumlahKonversi setiap ada qyout
      const isiProduk = vOrder.values.isiproduk.filter(
        (batch) => batch.produkid === values.produk
      )
      let batchInputAsc = [...values.batch].sort((a, b) => {
        return new Date(a.tglinput) - new Date(b.tglinput)
      })
      const jmlBefore = isiProduk.reduce((a, b) => a + b.qtyout, 0)
      const jmlStok = batchInputAsc.reduce((a, b) => a + b.qty, 0)
      let jumlahKonversi =
        strToNumber(values.jumlah) * strToNumber(values.konversi)
      jumlahKonversi = jmlBefore + jumlahKonversi

      if (!batchInputAsc[0]) {
        console.error('batchInputAsc[0] is undefined')
        return
      }
      let firstBatchInputAsc = { ...batchInputAsc[0] }
      firstBatchInputAsc.namasatuan = values.namasatuan
      firstBatchInputAsc.satuan = values.satuan
      firstBatchInputAsc.qty = jmlStok
      firstBatchInputAsc.qtyout = jumlahKonversi
      const newBatchKirim = [...vOrder.values.isiproduk, firstBatchInputAsc]
      vOrder.setFieldValue('isiproduk', newBatchKirim)
      resetForm()
      refProduk.current?.clearValue()
    },
  })

  useEffect(() => {
    const setFF = vOrder.setFieldValue
    let batchInputAsc = []
    const itemOrders = orderStokBatch.itemorders || []
    const itemKirims = orderStokBatch.itemkirims || []
    if (itemKirims.length === 0 && itemOrders.length !== 0) {
      itemOrders.forEach((data) => {
        data.batchproduk.forEach((batch) => {
          const newBatch = { ...batch }
          batchInputAsc.push(newBatch)
        })
      })
    } else if (itemKirims.length !== 0) {
      batchInputAsc = [...itemKirims]
    } else {
      batchInputAsc = []
    }
    batchInputAsc = batchInputAsc.filter((batch) => batch.qtykirim > 0)
    setFF('isiproduk', batchInputAsc)
  }, [orderStokBatch, vOrder.setFieldValue])

  useEffect(() => {
    const setFF = vOrder.setFieldValue
    const resetV = vOrder.resetForm
    const dataOrder = orderStokBatch?.order
    if (dataOrder) {
      setFF('norecorder', dataOrder?.norecorder || '')
      setFF('unittujuan', dataOrder?.unittujuan || '')
      setFF('unitorder', dataOrder?.unitasal || '')
      setFF('tanggalorder', dataOrder?.tglorder || '')
      setFF('noorder', dataOrder?.noorder || '')
      setFF('keterangan', dataOrder?.keterangan || '')
      setFF('jenisorder', dataOrder?.jenisorder || '')
    } else {
      resetV()
    }
  }, [orderStokBatch, vOrder.setFieldValue, vOrder.resetForm])

  useEffect(() => {
    dispatch(
      getOrderStokBatch({
        norecorder: norecorder || '',
        noreckirim: '',
      })
    )
  }, [dispatch, norecorder])

  useEffect(() => {
    const setFF = vProduk.setFieldValue
    const onGetSatuanSuccess = (data) => {
      // reset value jika ada array satuan baru
      if (Array.isArray(data) && data.length === 0) {
        refSatuan.current?.clearValue()
        return
      }
      const newData = [...data.satuan]
      const dataSatuan = newData.find(
        (val) => val.value === vProduk.values.satuan
      )
      if (!dataSatuan) {
        refSatuan.current?.clearValue()
        return
      }
      setFF('satuan', dataSatuan?.value || '')
      setFF('namasatuan', dataSatuan?.label || '')
      setFF('konversisatuan', dataSatuan?.nilaikonversi || '')
    }
    vProduk.values.produk &&
      dispatch(
        kemasanFromProdukGet(
          { idproduk: vProduk.values.produk },
          onGetSatuanSuccess
        )
      )
  }, [
    dispatch,
    vProduk.values.produk,
    vProduk.setFieldValue,
    vProduk.values.satuan,
  ])

  let jumlahStokProduk = vProduk.values.batch.reduce((total, batch) => {
    return total + batch.qty
  }, 0)

  let jumlahOut = vOrder.values.isiproduk.reduce((total, batch) => {
    const out = batch.produkid === vProduk.values.produk ? batch.qtyout : 0
    return total + out
  }, 0)

  jumlahStokProduk = jumlahStokProduk - jumlahOut

  const handleJmlSatuanChange = (jmlInput, konversi) => {
    let jumlahKonversi = strToNumber(jmlInput) * strToNumber(konversi)
    let jumlah = strToNumber(jmlInput)
    if (jumlahKonversi > jumlahStokProduk) {
      jumlah = Math.floor(jumlahStokProduk / konversi)
    }
    const jmlStr = onChangeStrNbr(jumlah, vProduk.values.jumlah)
    vProduk.setFieldValue('jumlah', jmlStr)
  }

  const jumlahTotal =
    strToNumber(vProduk.values.jumlah) * strToNumber(vProduk.values.konversi)
  const newStokBatch = stokBatch.filter((batch) => {
    const isiProduk = vOrder.values.isiproduk.find((batchOrder) => {
      return batchOrder.value === batch.value
    })
    const produkNotFound = !isiProduk
    return produkNotFound
  })

  useEffect(() => {
    dispatch(comboDistribusiOrderGet())
  }, [dispatch])

  const handleEditColumn = async (row) => {
    const api = new APIClient()

    vProduk.setFieldValue('produk', row.value)
    vProduk.setFieldValue('namaproduk', row.label)
    vProduk.setFieldValue('satuan', row.satuan)
    vProduk.setFieldValue('namasatuan', row.namasatuan)
    const kemasan = await api.get(
      '/transaksi/gudang/distribusi/get-kemasan-by-id',
      { idkemasan: row.satuan }
    )
    const konversi = kemasan.data.kemasan.nilaikonversi
    vProduk.setFieldValue('konversi', konversi)
    // hitung jumlahnya dahulu
    let produk = vOrder.values.isiproduk.find((batch) => {
      return batch.value === row.value
    })
    if (!produk) return console.error('produk is undefined')
    produk = { ...produk }
    const jmlAllProduk = produk.qtyout / konversi

    vProduk.setFieldValue('jumlah', jmlAllProduk)
    const newIsiProduk = stokBatch.find((batch) => {
      return batch.value === row.value
    })
    // lalu maasukkan batchnya didapatkan dari stokBatch
    vProduk.setFieldValue('batch', newIsiProduk?.isiproduk || [])
    const otherProduk = vOrder.values.isiproduk.filter((batch) => {
      return batch.value !== row.value
    })
    vOrder.setFieldValue('isiproduk', [...otherProduk])
  }

  const handleHapusProduk = (row) => {
    const otherProduk = vOrder.values.isiproduk.filter((batch) => {
      return batch.value !== row.value
    })
    vOrder.setFieldValue('isiproduk', [...otherProduk])
  }

  /**
   * @type {import("react-data-table-component").TableColumn<typeof vOrder.values.isiproduk[0]>[]}
   */
  const columnsProduk = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => handleEditColumn(row)}>
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit Produk
              </DropdownItem>
              <DropdownItem onClick={() => handleHapusProduk(row)}>
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Hapus produk
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Id Produk</span>,
      sortable: true,
      selector: (row) => row.value,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.label,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Satuan</span>,
      selector: (row) => row.namasatuan,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Stok</span>,
      sortable: true,
      selector: (row) => `${row.qty}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah</span>,
      sortable: true,
      selector: (row) => `${row.qtyout}`,
      width: '100px',
    },
  ]

  const OrderBarang = (
    <Card className="p-5">
      <Row className="mb-2">
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`tanggalorder`}
            className="form-label mt-2"
          >
            Tgl order
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <KontainerFlatpickr
            isError={
              vOrder.touched?.tanggalorder && !!vOrder.touched?.tanggalorder
            }
            id="tanggalorder"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            disabled={!!norecorder}
            onChange={([newDate]) => {
              vOrder.setFieldValue('tanggalorder', newDate.toISOString())
            }}
          />
          {vOrder.touched?.tanggalorder && !!vOrder.touched?.tanggalorder && (
            <FormFeedback type="invalid">
              <div>{vOrder.touched?.tanggalorder}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`noorder`}
            className="form-label mt-2"
          >
            No Order
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <Input
            id={`noorder`}
            name={`noorder`}
            type="text"
            value={vOrder.values.noorder}
            disabled={!!norecorder}
            onChange={vOrder.handleChange}
            invalid={vOrder.touched?.noorder && !!vOrder?.errors?.noorder}
          />
          {vOrder.touched?.noorder && !!vOrder.errors?.noorder && (
            <FormFeedback type="invalid">
              <div>{vOrder.errors?.noorder}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`jenisorder`}
            className="form-label mt-2"
          >
            Jenis Order
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <CustomSelect
            id="jenisorder"
            name="jenisorder"
            options={jenisorderbarang}
            value={vOrder.values?.jenisorder}
            isDisabled={!!norecorder}
            onChange={(val) => {
              vOrder.setFieldValue('jenisorder', val?.value || '')
            }}
            isClearEmpty
            className={`input 
                            ${vOrder.errors?.jenisorder ? 'is-invalid' : ''}`}
          />
          {vOrder.touched?.jenisorder && !!vOrder.errors?.jenisorder && (
            <FormFeedback type="invalid">
              <div>{vOrder.errors?.jenisorder}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`unitorder`}
            className="form-label mt-2"
          >
            Unit Order
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <CustomSelect
            id="unitorder"
            name="unitorder"
            options={isUnit ? unitUser : unit}
            value={vOrder.values?.unitorder}
            isDisabled={!!norecorder}
            onChange={(val) => {
              vOrder.setFieldValue('unitorder', val?.value || '')
            }}
            isClearEmpty
            className={`input 
                            ${vOrder.errors?.unitorder ? 'is-invalid' : ''}`}
          />
          {vOrder.touched?.unitorder && !!vOrder.errors?.unitorder && (
            <FormFeedback type="invalid">
              <div>{vOrder.errors?.unitorder}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`unittujuan`}
            className="form-label mt-2"
          >
            Unit Tujuan
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <CustomSelect
            id="unittujuan"
            name="unittujuan"
            options={unit}
            isDisabled={!!norecorder}
            onChange={(val) => {
              vOrder.setFieldValue('unittujuan', val?.value || '')
              dispatch(
                getStokBatch({
                  idunit: val?.value || '',
                  islogistik: isLogistik,
                })
              )
            }}
            value={vOrder.values?.unittujuan}
            isClearEmpty
            className={`input 
                            ${vOrder.errors?.unittujuan ? 'is-invalid' : ''}`}
          />
          {vOrder.touched?.unittujuan && !!vOrder.errors?.unittujuan && (
            <FormFeedback type="invalid">
              <div>{vOrder.errors?.unittujuan}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`keterangan`}
            className="form-label"
          >
            Keterangan Order
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <Input
            id={`keterangan`}
            name={`keterangan`}
            type="text"
            disabled={!!norecorder}
            value={vOrder.values.keterangan}
            onChange={vOrder.handleChange}
            invalid={vOrder.touched?.keterangan && !!vOrder?.errors?.keterangan}
          />
          {vOrder.touched?.keterangan && !!vOrder.touched?.keterangan && (
            <FormFeedback type="invalid">
              <div>{vOrder.errors?.keterangan}</div>
            </FormFeedback>
          )}
        </Col>
      </Row>
    </Card>
  )

  const TambahItem = (
    <Card className="p-5">
      <Row className="mb-2">
        <Col xl={4} lg={6}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`produk`}
            className="form-label mb-1"
          >
            Nama Produk
          </Label>
          <CustomSelect
            id="produk"
            name="produk"
            options={newStokBatch}
            value={vProduk.values?.produk || ''}
            isDisabled={!vOrder.values.unittujuan}
            onChange={(e) => {
              vProduk.resetForm()
              refSatuan.current.clearValue()
              vProduk.setFieldValue('produk', e?.value || '')
              vProduk.setFieldValue('namaproduk', e?.label || '')
              vProduk.setFieldValue('batch', e?.batchproduk || [])
            }}
            className={`input mb-2
                            ${vProduk.errors?.produk ? 'is-invalid' : ''}`}
            ref={refProduk}
          />
          {vProduk.touched?.produk && !!vProduk.errors?.produk && (
            <FormFeedback type="invalid">
              <div>{vProduk.errors?.produk}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={2} lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`produkid`}
            className="form-label mb-1"
          >
            Id produk
          </Label>
          <Input
            className="mb-2"
            id={`produkid`}
            name={`produkid`}
            type="text"
            disabled
            value={vProduk.values.produk}
            invalid={vProduk.touched?.produk && !!vProduk?.errors?.produk}
          />
          {vProduk.touched?.produk && !!vProduk.errors?.produk && (
            <FormFeedback type="invalid">
              <div>{vProduk.errors?.produk}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={2} lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`stok`}
            className="form-label mb-1"
          >
            Stok
          </Label>
          <Input
            className="mb-2"
            id={`stok`}
            name={`stok`}
            type="text"
            disabled
            value={jumlahStokProduk}
            invalid={vProduk.touched?.produk && jumlahStokProduk === 0}
          />
          {vProduk.touched?.produk && jumlahStokProduk === 0 && (
            <FormFeedback type="invalid">
              <div>{vProduk.errors?.produk}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={2} lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`satuan`}
            className="form-label mb-1"
          >
            Satuan
          </Label>
          <CustomSelect
            ref={refSatuan}
            id="satuan"
            name="satuan"
            options={satuan?.data?.satuan || []}
            value={vProduk.values?.satuan}
            onChange={(val) => {
              vProduk.setFieldValue('satuan', val?.value || '')
              vProduk.setFieldValue('konversi', val?.nilaikonversi || '')
              vProduk.setFieldValue('namasatuan', val?.label || '')
              handleJmlSatuanChange(
                vProduk.values.jumlah,
                val?.nilaikonversi || 0
              )
            }}
            isDisabled={!vProduk.values.namaproduk}
            className={`input mb-2 ${
              vProduk.errors?.satuan ? 'is-invalid' : ''
            }`}
          />
          {vProduk.touched?.satuan && !!vProduk.errors?.satuan && (
            <FormFeedback type="invalid">
              <div>{vProduk.errors?.satuan}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={2} lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`konversi`}
            className="form-label mb-1"
          >
            Konversi
          </Label>
          <Input
            id={`konversi`}
            name={`konversi`}
            type="text"
            disabled
            value={vProduk.values.konversi}
            invalid={vProduk.touched?.konversi && !!vProduk?.errors?.konversi}
          />
          {vProduk.touched?.konversi && !!vProduk.errors?.konversi && (
            <FormFeedback type="invalid">
              <div>{vProduk.errors?.konversi}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={2} lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`jumlah`}
            className="form-label mb-1"
          >
            Jumlah
          </Label>
          <Input
            id={`jumlah`}
            name={`jumlah`}
            type="text"
            onChange={(e) => {
              handleJmlSatuanChange(e.target.value, vProduk.values.konversi)
            }}
            value={vProduk.values.jumlah}
            invalid={vProduk.touched?.jumlah && !!vProduk?.errors?.jumlah}
          />
          {vProduk.touched?.jumlah && !!vProduk.errors?.jumlah && (
            <FormFeedback type="invalid">
              <div>{vProduk.errors?.jumlah}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={2} lg={3}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`jumlahtotal`}
            className="form-label mb-1"
          >
            Jumlah
          </Label>
          <Input
            id={`jumlahtotal`}
            name={`jumlahtotal`}
            type="text"
            disabled
            value={jumlahTotal}
          />
        </Col>
      </Row>
      <Row className="flex-row-reverse">
        <Col lg={2} className="d-flex flex-row-reverse">
          <Button type="button" color="danger">
            Batal
          </Button>
        </Col>
        <Col lg={2} className="d-flex flex-row-reverse">
          <Button
            type="button"
            color="success"
            onClick={() => {
              console.log('errors', vProduk.errors)
              vProduk.handleSubmit()
            }}
            disabled={!!norecorder}
          >
            Tambah
          </Button>
        </Col>
      </Row>
    </Card>
  )

  const TableProduk = (
    <Card className="p-5">
      <DataTable
        fixedHeader
        columns={columnsProduk}
        pagination
        data={vOrder.values.isiproduk || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'produk'} />}
      />
      <Col
        lg={12}
        className="d-flex justify-content-around align-items-end mt-5"
      >
        <Button
          type="submit"
          color="success"
          placement="top"
          formTarget="form-input-penerimaan"
          disabled={!!norecorder}
        >
          Simpan
        </Button>
        <Button type="button" className="btn" color="danger">
          Batal
        </Button>
      </Col>
    </Card>
  )

  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Order Barang" pageTitle="Gudang" />
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(vOrder.errors)
            vOrder.handleSubmit()
            return false
          }}
          className="gy-4"
          id="form-input-penerimaan"
        >
          {OrderBarang}
          {TambahItem}
          {TableProduk}
        </Form>
      </Container>
    </div>
  )
}

export default DistribusiOrder