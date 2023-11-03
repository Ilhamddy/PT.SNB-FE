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
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  createOrUpdateKirimBarang,
  createOrUpdateOrderbarang,
  getOrderStokBatch,
  getStokBatch,
  kemasanFromProdukGet,
  verifyKirim,
} from '../../store/actions'
import { APIClient } from '../../helpers/api_helper'
import { comboDistribusiOrderGet } from '../../store/master/action'
import { Link, useParams } from 'react-router-dom'

const DistribusiKirim = ({ isVerif }) => {
  const dispatch = useDispatch()
  const { norecorder, noreckirim } = useParams()
  const [tglSekarang] = useState(() => new Date().toISOString())
  const isPesanLangsung = !norecorder

  let { stokBatch, orderStokBatch, satuan, unit, jenisorderbarang } =
    useSelector(
      (state) => ({
        stokBatch: state.Distribusi.getStokBatch?.data || [],
        orderStokBatch: state.Distribusi.getOrderStokBatch.data || null,
        satuan: state.Gudang.kemasanFromProdukGet || null,
        unit: state.Master.comboDistribusiOrderGet.data?.unit || [],
        jenisorderbarang:
          state.Master.comboDistribusiOrderGet.data?.jenisorderbarang || [],
      }),
      shallowEqual
    )

  const refSatuan = useRef(null)
  const refProduk = useRef(null)

  const vKirim = useFormik({
    enableReinitialize: true,
    initialValues: {
      noreckirim: '',
      norecorder: '',
      tanggalkirim: tglSekarang,
      nokirim: '',
      unitpengirim: '',
      unitpenerima: '',
      tanggalpermintaan: tglSekarang,
      noorder: '',
      jeniskirim: '',
      keteranganorder: '',
      keterangankirim: '',
      isverif: false,
      /**@type {import("../../../../backendjs/app/queries/gudang/distribusi.queries").ListStokUnit} */
      batchproduk: [],
    },
    validationSchema: Yup.object({
      tanggalkirim: Yup.string().required('Tanggal Order harus diisi'),
      nokirim: Yup.string().required('No Order harus diisi'),
      unitpengirim: Yup.string().required('Unit Pengirim harus diisi'),
      unitpenerima: Yup.string().required('Unit Penerima harus diisi'),
      jeniskirim: Yup.string().required('Jenis Kirim harus diisi'),
      keterangankirim: Yup.string().required('Keterangan Kirim harus diisi'),
    }),
    onSubmit: (values) => {
      if (!isVerif) {
        dispatch(
          createOrUpdateKirimBarang(values, () => {
            dispatch(
              getOrderStokBatch({
                norecorder: norecorder || '',
                noreckirim: noreckirim || '',
              })
            )
          })
        )
      } else {
        dispatch(
          verifyKirim({ noreckirim: values.noreckirim }, () =>
            dispatch(
              getOrderStokBatch({
                norecorder: norecorder || '',
                noreckirim: noreckirim || '',
              })
            )
          )
        )
      }
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
      /**@type {typeof vKirim.values.batchproduk} */
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
      const batchProduk = vKirim.values.batchproduk.filter(
        (batch) => batch.produkid === values.produk
      )
      const jmlBefore = batchProduk.reduce((a, b) => a + b.qtykirim, 0)
      let jumlahKonversi =
        strToNumber(values.jumlah) * strToNumber(values.konversi)
      jumlahKonversi = jmlBefore + jumlahKonversi

      let batchInputAsc = [...values.batch].sort((a, b) => {
        return new Date(a.tglinput) - new Date(b.tglinput)
      })
      batchInputAsc = batchInputAsc.map((batch) => {
        const newBatch = { ...batch }
        newBatch.satuan = values.satuan
        newBatch.namasatuan = values.namasatuan
        const maxQtyTerkirim =
          newBatch.qtyout > newBatch.qty || isPesanLangsung
            ? newBatch.qty
            : newBatch.qtyout
        if (jumlahKonversi >= maxQtyTerkirim) {
          newBatch.qtykirim = maxQtyTerkirim
          // jumlah hanya untuk pelengkap di db, operasi perhitungan harus menggunakan
          // qty dan konversisatuan
          newBatch.jumlah = maxQtyTerkirim / strToNumber(values.konversi)
          jumlahKonversi -= maxQtyTerkirim
        } else {
          newBatch.qtykirim = jumlahKonversi
          jumlahKonversi = 0
        }
        return newBatch
      })
      batchInputAsc = batchInputAsc.filter((batch) => batch.qtykirim > 0)
      const newBatchKirim = [...vKirim.values.batchproduk, ...batchInputAsc]
      vKirim.setFieldValue('batchproduk', newBatchKirim)
      resetForm()
      refProduk.current?.clearValue()
    },
  })

  let jumlahStokProduk = vProduk.values.batch.reduce((total, batch) => {
    return total + batch.qty
  }, 0)

  let jumlahKirim = vKirim.values.batchproduk.reduce((total, batch) => {
    const out = batch.produkid === vProduk.values.produk ? batch.qtykirim : 0
    return total + out
  }, 0)

  let jumlahOrder = vProduk.values.batch[0]?.qtyout || 0

  jumlahStokProduk = jumlahStokProduk - jumlahKirim

  const handleJmlSatuanChange = (jmlInput, konversi) => {
    let jumlahKonversi = strToNumber(jmlInput) * strToNumber(konversi)
    let jumlah = strToNumber(jmlInput)
    let maxValue =
      jumlahStokProduk < jumlahOrder || isPesanLangsung
        ? jumlahStokProduk
        : jumlahOrder
    if (jumlahKonversi > maxValue) {
      jumlah = Math.floor(maxValue / konversi)
    }
    const jmlStr = onChangeStrNbr(jumlah, vProduk.values.jumlah)
    vProduk.setFieldValue('jumlah', jmlStr)
  }

  const jumlahTotal =
    strToNumber(vProduk.values.jumlah) * strToNumber(vProduk.values.konversi)

  const newStokBatch = (orderStokBatch.itemorders || []).filter((batch) => {
    const batchProduk = vKirim.values.batchproduk.find((batchOrder) => {
      return batchOrder.value === batch.value
    })
    const produkNotFound = !batchProduk
    return produkNotFound
  })

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
    const allProduk = vKirim.values.batchproduk.filter((batch) => {
      return batch.value === row.value
    })
    const jmlAllProduk = allProduk.reduce((total, batch) => {
      return total + batch.qtykirim / konversi
    }, 0)

    vProduk.setFieldValue('jumlah', jmlAllProduk)
    const itemOrders = orderStokBatch.itemorders || []
    const newBatch = itemOrders.find((batch) => {
      return batch.value === row.value
    })
    // lalu maasukkan batchnya didapatkan dari stokBatch
    vProduk.setFieldValue('batch', newBatch?.batchproduk || [])
    const otherProduk = vKirim.values.batchproduk.filter((batch) => {
      return batch.value !== row.value
    })
    vKirim.setFieldValue('batchproduk', [...otherProduk])
  }

  const handleHapusProduk = (row) => {
    const otherProduk = vKirim.values.batchproduk.filter((batch) => {
      return batch.value !== row.value
    })
    vKirim.setFieldValue('batchproduk', [...otherProduk])
  }

  useEffect(() => {
    // inisialisasi data order
    const setFF = vProduk.setFieldValue
    const onGetSatuanSuccess = (data) => {
      // reset value jika ada array satuan baru dari produk baru
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
      setFF('satuanterima', dataSatuan?.value || '')
      setFF('namasatuanterima', dataSatuan?.label || '')
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

  useEffect(() => {
    vKirim.values.unitpengirim &&
      dispatch(getStokBatch({ idunit: vKirim.values.unitpengirim }))
  }, [vKirim.values.unitpengirim, dispatch])

  useEffect(() => {
    const setFF = vKirim.setFieldValue
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
    setFF('batchproduk', batchInputAsc)
  }, [orderStokBatch, vKirim.setFieldValue])

  useEffect(() => {
    dispatch(comboDistribusiOrderGet())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getOrderStokBatch({
        norecorder: norecorder || '',
        noreckirim: noreckirim || '',
      })
    )
  }, [dispatch, norecorder, noreckirim, vKirim.setFieldValue])

  useEffect(() => {
    const setFF = vKirim.setFieldValue
    const dataOrder = orderStokBatch?.order
    console.log(dataOrder)
    dataOrder?.isverif !== undefined &&
      setFF('isverif', dataOrder.isverif || '')
    dataOrder?.noreckirim && setFF('noreckirim', dataOrder?.noreckirim || '')
    dataOrder?.tglkirim && setFF('tanggalkirim', dataOrder?.tglkirim || '')
    dataOrder?.nokirim && setFF('nokirim', dataOrder?.nokirim || '')
    dataOrder?.keterangankirim &&
      setFF('keterangankirim', dataOrder?.keterangankirim || '')
    setFF('unitpengirim', dataOrder?.unittujuan || '')
    setFF('unitpenerima', dataOrder?.unitasal || '')
    setFF('tanggalpermintaan', dataOrder?.tglorder || '')
    setFF('noorder', dataOrder?.noorder || '')
    setFF('keteranganorder', dataOrder?.keterangan || '')
    setFF('norecorder', dataOrder?.norecorder || '')
    setFF('jeniskirim', dataOrder?.jenisorder || '')
  }, [orderStokBatch, vKirim.setFieldValue])

  /**
   * @type {import("react-data-table-component").TableColumn<typeof vKirim.values.batchproduk[0]>[]}
   */
  const columnsKirim = [
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
      selector: (row) => row.produkid,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Batch</span>,
      sortable: true,
      selector: (row) => row.nobatch,
      width: '150px',
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
      selector: (row) => `${row.qtykirim}`,
      width: '100px',
    },
  ]

  const OrderBarang = (
    <Card className="p-5">
      <Row className="mb-2">
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`tanggalkirim`}
            className="form-label"
          >
            Tanggal Kirim
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <Flatpickr
            // value={penerimaan.tglregistrasi || ""}
            className="form-control"
            id="tanggalkirim"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            onChange={([newDate]) => {
              vKirim.setFieldValue('tanggalkirim', newDate.toISOString())
            }}
          />
          {vKirim.touched?.tanggalkirim && !!vKirim.touched?.tanggalkirim && (
            <FormFeedback type="invalid">
              <div>{vKirim.touched?.tanggalkirim}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`nokirim`}
            className="form-label mt-2"
          >
            No Kirim
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <Input
            id={`nokirim`}
            name={`nokirim`}
            type="text"
            value={vKirim.values.nokirim}
            onChange={vKirim.handleChange}
            invalid={vKirim.touched?.nokirim && !!vKirim?.errors?.nokirim}
          />
          {vKirim.touched?.nokirim && !!vKirim.errors?.nokirim && (
            <FormFeedback type="invalid">
              <div>{vKirim.errors?.nokirim}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`unitpengirim`}
            className="form-label"
          >
            Unit Pengirim
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <CustomSelect
            id="unitpengirim"
            name="unitpengirim"
            options={unit}
            value={vKirim.values?.unitpengirim}
            isDisabled={!isPesanLangsung}
            onChange={(val) => {
              vKirim.setFieldValue('unitpengirim', val.value)
            }}
            className={`input ${
              vKirim.errors?.unitpengirim ? 'is-invalid' : ''
            }`}
          />
          {vKirim.touched?.unitpengirim && !!vKirim.errors?.unitpengirim && (
            <FormFeedback type="invalid">
              <div>{vKirim.errors?.unitpengirim}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`tanggalpermintaan`}
            className="form-label"
          >
            Tanggal Permintaan
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <Flatpickr
            // value={penerimaan.tglregistrasi || ""}
            className="form-control"
            id="tanggalpermintaan"
            options={{
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }}
            disabled={!isPesanLangsung}
            value={vKirim.values.tanggalpermintaan}
            onChange={([newDate]) => {
              vKirim.setFieldValue('tanggalpermintaan', newDate.toISOString())
            }}
          />
          {vKirim.touched?.tanggalpermintaan &&
            !!vKirim.touched?.tanggalpermintaan && (
              <FormFeedback type="invalid">
                <div>{vKirim.touched?.tanggalpermintaan}</div>
              </FormFeedback>
            )}
        </Col>
        {!isPesanLangsung && (
          <>
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
                disabled
                value={vKirim.values.noorder}
                onChange={vKirim.handleChange}
                invalid={vKirim.touched?.noorder && !!vKirim?.errors?.noorder}
              />
            </Col>
          </>
        )}
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`unitpenerima`}
            className="form-label"
          >
            Unit Penerima
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <CustomSelect
            id="unitpenerima"
            name="unitpenerima"
            options={unit}
            isDisabled={!isPesanLangsung}
            value={vKirim.values?.unitpenerima}
            onChange={(val) => {
              vKirim.setFieldValue('unitpenerima', val.value)
            }}
            className={`input ${
              vKirim.errors?.unitpenerima ? 'is-invalid' : ''
            }`}
          />
          {vKirim.touched?.unitpenerima && !!vKirim.errors?.unitpenerima && (
            <FormFeedback type="invalid">
              <div>{vKirim.errors?.unitpenerima}</div>
            </FormFeedback>
          )}
        </Col>
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`jeniskirim`}
            className="form-label mt-2"
          >
            Jenis Kirim
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <CustomSelect
            id="jeniskirim"
            name="jeniskirim"
            options={jenisorderbarang}
            value={vKirim.values?.jeniskirim}
            onChange={(val) => {
              vKirim.setFieldValue('jeniskirim', val.value)
            }}
            isDisabled={!isPesanLangsung}
            className={`input ${vKirim.errors?.jeniskirim ? 'is-invalid' : ''}`}
          />
          {vKirim.touched?.jeniskirim && !!vKirim.errors?.jeniskirim && (
            <FormFeedback type="invalid">
              <div>{vKirim.errors?.jeniskirim}</div>
            </FormFeedback>
          )}
        </Col>
        {!isPesanLangsung && (
          <>
            <Col xl={1} lg={2}>
              <Label
                style={{ color: 'black' }}
                htmlFor={`keteranganorder`}
                className="form-label"
              >
                Keterangan Order
              </Label>
            </Col>
            <Col xl={3} lg={4} className="mb-2">
              <Input
                id={`keteranganorder`}
                name={`keteranganorder`}
                type="text"
                disabled
                value={vKirim.values.keteranganorder}
                onChange={vKirim.handleChange}
                invalid={
                  vKirim.touched?.keteranganorder &&
                  !!vKirim?.errors?.keteranganorder
                }
              />
            </Col>
          </>
        )}
        <Col xl={1} lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`keterangankirim`}
            className="form-label "
          >
            Keterangan kirim
          </Label>
        </Col>
        <Col xl={3} lg={4} className="mb-2">
          <Input
            id={`keterangankirim`}
            name={`keterangankirim`}
            type="text"
            value={vKirim.values.keterangankirim}
            onChange={vKirim.handleChange}
            invalid={
              vKirim.touched?.keterangankirim &&
              !!vKirim?.errors?.keterangankirim
            }
          />
          {vKirim.touched?.keterangankirim &&
            !!vKirim.errors?.keterangankirim && (
              <FormFeedback type="invalid">
                <div>{vKirim.errors?.keterangankirim}</div>
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
            options={isPesanLangsung ? stokBatch : newStokBatch}
            value={vProduk.values?.produk || ''}
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
        {!isPesanLangsung && (
          <Col xl={2} lg={3}>
            <Label
              style={{ color: 'black' }}
              htmlFor={`jumlahorder`}
              className="form-label mb-1"
            >
              Jumlah Order
            </Label>
            <Input
              className="mb-2"
              id={`jumlahorder`}
              name={`stok`}
              type="text"
              disabled
              value={jumlahOrder}
            />
          </Col>
        )}
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
            Jumlah Total
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
        columns={columnsKirim}
        pagination
        data={vKirim.values.batchproduk || []}
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
          disabled={
            (!!vKirim.values.noreckirim && !isVerif) ||
            (isVerif && !!vKirim.values.isverif)
          }
        >
          {isVerif ? 'Verifikasi' : 'Simpan'}
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
        <BreadCrumb title="Kirim Barang" pageTitle="Gudang" />
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vKirim.handleSubmit()
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

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#e67e22',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default DistribusiKirim
