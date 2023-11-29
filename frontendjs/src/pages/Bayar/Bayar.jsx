import { useFormik } from 'formik'
import userDummy from '../../assets/images/users/user-dummy-img.jpg'
import { ToastContainer } from 'react-toastify'
import { useEffect, useReducer, useRef, useState } from 'react'
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
  Input,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Button,
  FormFeedback,
  Label,
  CardHeader,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import * as Yup from 'yup'
import classnames from 'classnames'
import { Link } from 'feather-icons-react/build/IconComponents'
import { useDispatch, useSelector } from 'react-redux'
import { daftarPasienPulangGet } from '../../store/daftarPasien/action'
import DataTable from 'react-data-table-component'
import {
  dateTimeISOString,
  dateTimeLocal,
  onChangeStrNbr,
  strNumber,
  strToNumber,
} from '../../utils/format'
import Flatpickr from 'react-flatpickr'
import {
  comboAsuransiGet,
  comboPaymentGet,
  comboRegistrasiGet,
} from '../../store/master/action'
import {
  pelayananFromDpGet,
  notaVerifCreate,
  pelayananFromVerifGet,
  pelayananFromVerifGetReset,
  buktiBayarCreate,
  buktiBayarCreateReset,
} from '../../store/payment/action'
import CustomSelect from '../Select/Select'
import './Bayar.scss'
import { useNavigate, useParams } from 'react-router-dom'
import {
  rgxAllNumber,
  rgxAllPeriods,
  rgxValidNumber,
} from '../../utils/regexcommon'
import PrintTemplate from '../Print/PrintTemplate/PrintTemplate'
import './Bayar.scss'
import LoadingTable from '../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const initPayment = (dateNow) => ({
  metodebayar: '',
  nontunai: '',
  pjpasien: '',
  approvalcode: '',
  nominalbayar: '',
  tglbayar: dateNow,
  rekeningrs: '',
})

const Bayar = () => {
  const { norecnota } = useParams()
  const [isDeposit, setIsDeposit] = useState(false)

  let {
    dataPasienPlg,
    comboboxReg,
    listPelayanan,
    comboboxpayment,
    nota,
    kepesertaan,
    createdBuktiBayar,
    deposit,
    bayarBefore,
  } = useSelector((state) => ({
    dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
    comboboxReg: state.Master.comboRegistrasiGet.data || {},
    listPelayanan: state.Payment.pelayananFromVerifGet.data?.pelayanan || [],
    comboboxpayment: state.Master.comboPaymentGet.data,
    nota: state.Payment.pelayananFromVerifGet.data?.nota || [],
    kepesertaan: state.Payment.pelayananFromVerifGet.data?.kepesertaan || [],
    deposit: state.Payment.pelayananFromVerifGet.data?.deposit || [],
    bayarBefore: state.Payment.pelayananFromVerifGet.data?.buktiBayar || null,
    createdBuktiBayar: state.Payment.buktiBayarCreate.data || null,
  }))

  const buktiBayar =
    bayarBefore || (Array.isArray(createdBuktiBayar) ? null : createdBuktiBayar)

  const refPrintTransaksi = useRef(null)

  const handlePrintBukti = () => {
    refPrintTransaksi.current.handlePrint()
  }
  const [dateNow] = useState(() => new Date().toISOString())
  const [dateEnd] = useState(() => new Date().toISOString())
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      objectjenispembayaranfk: 1,
      totaltagihan: '',
      diskon: 0,
      // non wajib
      deposit: 0,
      nobukti: `B${dateNow.slice(2, 4)}${
        dateNow.slice(5, 7) + 1
      }${dateNow.slice(8, 10)}${dateNow.slice(11, 13)}${dateNow.slice(
        14,
        16
      )}${dateNow.slice(17, 19)}`,
      pegawai: '',
      norecnota: '',
      klaim: '',
      norecdp: '',
      pjpasien: '',
      keterangan: '',
      payment: [
        {
          ...initPayment(dateNow),
        },
      ],
    },
    validationSchema: Yup.object({
      totaltagihan: Yup.string().required('Total Tagihan harus diisi'),
      diskon: Yup.string().required('Diskon harus diisi'),
      payment: Yup.array().of(
        Yup.object().shape({
          metodebayar: Yup.string().required('Metode Pembayaran harus diisi'),
          nontunai: Yup.string().when('metodebayar', {
            is: (val) => val === '2',
            then: () => Yup.string().required('Metode non tunai harus diisi'),
          }),
          nominalbayar: Yup.string().required('Nominal Bayar harus diisi'),
          tglbayar: Yup.string().required('Tanggal Bayar harus diisi'),
          rekeningrs: Yup.string().when('metodebayar', {
            is: (val) => val === '2',
            then: () => Yup.string().required('Rekening RS harus diisi'),
          }),
          approvalcode: Yup.string().when('metodebayar', {
            is: (val) => val === '2',
            then: () => Yup.string().required('Reference Code harus diisi'),
          }),
        })
      ),
      pjpasien: Yup.string().required('Diterima Dari harus diisi'),
      // non wajib
      deposit: Yup.string().required('Deposit harus diisi'),
      nobukti: Yup.string().required('No Bukti harus diisi'),
      keterangan: Yup.string().required('Keterangan bayar wajib diisi'),
      pegawai: Yup.string().required('Pegawai harus diisi'),
      norecnota: Yup.string().required('No Rekam Medis harus diisi'),
      klaim: Yup.string().required('Klaim harus diisi'),
      norecdp: Yup.string().required('No DP harus diisi'),
    }),
    onSubmit: (values) => {
      let valuesSent = { ...values }
      valuesSent.payment = valuesSent.payment.map((payment) => {
        let newPayment = { ...payment }
        newPayment.nominalbayar = strToNumber(newPayment.nominalbayar)
        return newPayment
      })
      dispatch(
        buktiBayarCreate(valuesSent, () => {
          norecnota && dispatch(pelayananFromVerifGet(norecnota))
          handlePrintBukti()
        })
      )
    },
  })

  const changePayment = (fieldname, index, newvalue) => {
    let newPayments = [...validation.values.payment]
    let newPayment = { ...newPayments[index] }
    newPayment[fieldname] = newvalue
    newPayments[index] = newPayment
    validation.setFieldValue('payment', newPayments)
  }

  const handleChangeNominal = (e, index, itemPayment) => {
    const totalTagihan = validation.values.totaltagihan || 0
    const otherPayment = [...validation.values.payment]
    otherPayment.splice(index, 1)
    const allOtherPayment = otherPayment.reduce((prev, payment) => {
      return prev + strToNumber(payment.nominalbayar)
    }, 0)
    const sisaTagihan = totalTagihan - allOtherPayment
    let newNominal = onChangeStrNbr(e.target.value, itemPayment.nominalbayar)
    let nominal = strToNumber(newNominal)
    if (nominal > sisaTagihan) {
      newNominal = onChangeStrNbr(sisaTagihan, itemPayment.nominalbayar)
    }
    changePayment('nominalbayar', index, newNominal)
  }

  const addPayment = () => {
    let newPayments = [...validation.values.payment]
    newPayments.push({
      metodebayar: '',
      nontunai: '',
      pjpasien: '',
      nominalbayar: '',
      tglbayar: dateNow,
      rekeningrs: '',
      approvalcode: '',
    })
    validation.setFieldValue('payment', newPayments)
  }

  const deleteLastPayment = () => {
    let newPayments = [...validation.values.payment]
    newPayments.pop()
    validation.setFieldValue('payment', newPayments)
  }

  const [search, setSearch] = useState('')
  const [instalasi, setInstalasi] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFilter = () => {
    dispatch(daftarPasienPulangGet(dateNow, dateEnd))
  }
  const handleClickCari = () => {
    dispatch(
      daftarPasienPulangGet({
        dateStart: dateNow,
        dateEnd,
        instalasi,
        unit: '',
        search,
      })
    )
  }

  const filterRekeningRs = (rekeningRs, nontunaiV) => {
    return rekeningRs?.filter((rekening) => rekening.objectbankfk === nontunaiV)
  }

  const diskon = listPelayanan.reduce(
    (prev, pel) => prev + (pel.discount || 0),
    0
  )
  let totalTagihan = listPelayanan.reduce(
    (prev, pel) => prev + (pel.total || 0),
    0
  )
  const nominalklaim = kepesertaan.reduce(
    (prev, pel) => prev + (pel.nominalklaim || 0),
    0
  )
  const grandTotal =
    totalTagihan -
    validation.values.diskon -
    validation.values.klaim -
    validation.values.deposit
  let totalDeposit = deposit.reduce((prev, pel) => prev + (pel.nominal || 0), 0)
  let payment =
    validation.values.payment?.reduce(
      (prev, pel) => prev + (strToNumber(pel.nominalbayar) || 0),
      0
    ) || 0
  let sisaGrandTotal = grandTotal - payment

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Tgl Pelayanan</span>,
      selector: (row) => dateTimeLocal(new Date(row.tglinput)),
      sortable: true,
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Layanan</span>,
      // selector: row => row.noregistrasi,
      sortable: true,
      selector: (row) => row.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas</span>,
      selector: (row) => row.namapegawai,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kelas</span>,
      selector: (row) => row.namakelas,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      selector: (row) => row.harga,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      selector: (row) => row.qty,
      sortable: true,
      width: '20px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diskon</span>,
      selector: (row) => row.discount || 0,
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jasa</span>,
      selector: (row) => row.jasa || 0,
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">C</span>,
      selector: (row) => `${row.iscito ? 'v' : 'x'}`,
      sortable: true,
      width: '40px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => row.total,
      sortable: true,
      width: '140px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Verif/NBB</span>,
      selector: (row) =>
        `${
          (row.no_nota ? `${row.no_nota}/\n` : ``) +
          (row.no_bukti ? `${row.no_bukti}` : ``)
        }`,
      sortable: true,
      width: '140px',
      wrap: true,
    },
  ]

  useEffect(() => {
    dispatch(comboPaymentGet())
  }, [dispatch])

  useEffect(() => {
    const setFF = validation.setFieldValue
    grandTotal && setFF('totaltagihan', grandTotal)
    diskon && setFF('diskon', diskon)
    setFF('klaim', nominalklaim || 0)
    isDeposit ? setFF('deposit', totalDeposit || 0) : setFF('deposit', 0)
  }, [
    dispatch,
    validation.setFieldValue,
    grandTotal,
    diskon,
    nominalklaim,
    totalDeposit,
    isDeposit,
  ])

  useEffect(() => {
    const setFF = validation.setFieldValue
    nota.namapasien && setFF('pjpasien', nota.namapasien)
    nota.idpegawai && setFF('pegawai', nota.idpegawai)
    nota.norecdp && setFF('norecdp', nota.norecdp)
  }, [nota, validation.setFieldValue]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const setFF = validation.setFieldValue
    norecnota && setFF('norecnota', norecnota)
    norecnota && dispatch(pelayananFromVerifGet(norecnota))
    return () => {
      dispatch(pelayananFromVerifGetReset())
    }
  }, [dispatch, norecnota, validation.setFieldValue])

  useEffect(() => {
    return () => {
      dispatch(buktiBayarCreateReset())
    }
  }, [dispatch])

  useEffect(() => {
    const payment = initPayment(dateNow)
    const setFF = validation.setFieldValue
    if (bayarBefore) {
      const caraBayarBefore = bayarBefore.carabayar.map((caraBayar) => ({
        ...initPayment(dateNow),
        ...caraBayar,
      }))
      setFF('payment', caraBayarBefore)
    } else {
      setFF('payment', [payment])
    }
  }, [dateNow, bayarBefore, validation.setFieldValue])

  return (
    <div className="page-content page-bayar">
      <Container fluid>
        <BreadCrumb title="Bayar Pelayanan" pageTitle="Payment" />
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(validation.errors)
            validation.handleSubmit()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Row>
            <Col lg={7}>
              <Card className="p-3">
                {validation.values.payment.map((itemPayment, indexPayment) => (
                  <Row key={indexPayment} className="mb-5">
                    <Row className="mb-2">
                      <Col lg={6}>
                        <Label
                          style={{ color: 'black' }}
                          htmlFor={`metodebayar${indexPayment}`}
                          className="form-label"
                        >
                          Metode Pembayaran {indexPayment + 1}
                        </Label>
                        <div>
                          <CustomSelect
                            id={`metodebayar${indexPayment}`}
                            name={`metodebayar${indexPayment}`}
                            options={comboboxpayment?.metodeBayar || []}
                            isDisabled={!!buktiBayar}
                            onChange={(e) =>
                              changePayment(
                                'metodebayar',
                                indexPayment,
                                e.value
                              )
                            }
                            value={itemPayment.metodebayar || ''}
                            className={`input ${
                              validation.errors.payment?.[indexPayment]
                                ?.metodebayar
                                ? 'is-invalid'
                                : ''
                            }`}
                          />
                          {validation.touched.payment?.[indexPayment]
                            ?.metodebayar &&
                            validation.errors.payment?.[indexPayment]
                              ?.metodebayar && (
                              <FormFeedback type="invalid">
                                <div>
                                  {
                                    validation.errors.payment?.[indexPayment]
                                      ?.metodebayar
                                  }
                                </div>
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      {itemPayment.metodebayar === 2 && (
                        <Col xxl={6} md={6}>
                          <Card>
                            <CardHeader>Non Tunai</CardHeader>
                            <CardBody>
                              <div className="d-flex flex-column">
                                {(comboboxpayment?.nontunai || []).map(
                                  (data, key) => (
                                    <div className="d-flex flex-row" key={key}>
                                      <Input
                                        disabled={!!buktiBayar}
                                        className="form-check-input"
                                        type="radio"
                                        id={`radio-payment-${key}-${indexPayment}`}
                                        checked={
                                          itemPayment.nontunai === data.value
                                        }
                                        readOnly
                                        onClick={(e) => {
                                          changePayment(
                                            'nontunai',
                                            indexPayment,
                                            data.value
                                          )
                                        }}
                                      />
                                      <Label
                                        className="form-check-label ms-2"
                                        htmlFor={`radio-payment-${key}-${indexPayment}`}
                                        style={{ color: 'black' }}
                                      >
                                        {data.label}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      )}
                    </Row>
                    <Row className="mb-2">
                      {itemPayment.metodebayar === 2 && (
                        <>
                          <Label
                            style={{ color: 'black' }}
                            htmlFor={`approvalcode${indexPayment}`}
                            className="form-label"
                          >
                            Reference Code
                          </Label>
                          <div>
                            <Input
                              disabled={!!buktiBayar}
                              id={`approvalcode${indexPayment}`}
                              name={`approvalcode${indexPayment}`}
                              type="text"
                              value={itemPayment.approvalcode || ''}
                              onChange={(e) => {
                                rgxAllNumber.test(e.target.value) &&
                                  changePayment(
                                    'approvalcode',
                                    indexPayment,
                                    e.target.value
                                  )
                              }}
                              invalid={
                                validation.touched.payment?.[indexPayment]
                                  ?.approvalcode &&
                                !!validation.errors.payment?.[indexPayment]
                                  ?.approvalcode
                              }
                            />
                            {validation.touched.payment?.[indexPayment]
                              ?.approvalcode &&
                            validation.errors.payment?.[indexPayment]
                              ?.approvalcode ? (
                              <FormFeedback type="invalid">
                                <div>
                                  {
                                    validation.errors.payment?.[indexPayment]
                                      ?.approvalcode
                                  }
                                </div>
                              </FormFeedback>
                            ) : null}
                          </div>
                        </>
                      )}
                      <Row>
                        <Col lg={7}>
                          <Label
                            style={{ color: 'black' }}
                            htmlFor={`keterangan${indexPayment}`}
                            className="form-label mt-2"
                          >
                            Nominal bayar
                          </Label>
                        </Col>
                        {indexPayment === 0 && totalDeposit > 0 && (
                          <Col lg={5} className="d-flex flex-row-reverse">
                            <Input
                              className="form-check-input ms-3    "
                              type="checkbox"
                              id={`formcheck-deposit`}
                              checked={isDeposit}
                              onChange={(e) => {
                                setIsDeposit(!isDeposit)
                              }}
                            />
                            <Label
                              style={{ color: 'black' }}
                              htmlFor={`formcheck-deposit`}
                              className="form-check-label"
                            >
                              Gunakan Deposit
                            </Label>
                          </Col>
                        )}
                      </Row>
                      <div>
                        <Input
                          disabled={!!buktiBayar}
                          id={`nominalbayar${indexPayment}}`}
                          name={`nominalbayar${indexPayment}`}
                          type="string"
                          placeholder="Masukkan nominal bayar"
                          className="form-control mb-2"
                          onChange={(e) =>
                            handleChangeNominal(e, indexPayment, itemPayment)
                          }
                          invalid={
                            validation.touched.payment?.[indexPayment]
                              ?.nominalbayar &&
                            !!validation.errors.payment?.[indexPayment]
                              ?.nominalbayar
                          }
                          value={itemPayment.nominalbayar || ''}
                        />
                        {validation.touched.payment?.[indexPayment]
                          ?.nominalbayar &&
                        validation.errors.payment?.[indexPayment]
                          ?.nominalbayar ? (
                          <FormFeedback type="invalid">
                            <div>
                              {
                                validation.errors.payment?.[indexPayment]
                                  ?.nominalbayar
                              }
                            </div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      {itemPayment.metodebayar === 2 && (
                        <>
                          <Label
                            style={{ color: 'black' }}
                            htmlFor={`rekeningrs${indexPayment}`}
                            className="form-label"
                          >
                            Rekening RS
                          </Label>
                          <div>
                            <CustomSelect
                              isDisabled={!!buktiBayar}
                              id={`rekeningrs${indexPayment}}`}
                              name={`rekeningrs${indexPayment}`}
                              options={filterRekeningRs(
                                comboboxpayment?.rekeningRs || [],
                                itemPayment.nontunai
                              )}
                              onChange={(e) => {
                                changePayment(
                                  'rekeningrs',
                                  indexPayment,
                                  e.value
                                )
                              }}
                              className={`input mt-2 ${
                                validation.errors.payment?.[indexPayment]
                                  ?.rekeningrs
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            {validation.touched.payment?.[indexPayment]
                              ?.rekeningrs &&
                            validation.errors.payment?.[indexPayment]
                              ?.rekeningrs ? (
                              <FormFeedback type="invalid">
                                <div>
                                  {
                                    validation.errors.payment?.[indexPayment]
                                      ?.rekeningrs
                                  }
                                </div>
                              </FormFeedback>
                            ) : null}
                          </div>
                        </>
                      )}
                    </Row>
                    {indexPayment === validation.values.payment.length - 1 && (
                      <div className="d-flex flex-column align-items-center">
                        <Row>
                          <Col lg={5}>
                            <Button
                              type="button"
                              color="info"
                              placement="top"
                              onClick={() => addPayment()}
                            >
                              +
                            </Button>
                          </Col>
                          {validation.values.payment.length > 1 && (
                            <Col lg={5}>
                              <Button
                                type="button"
                                color="danger"
                                placement="top"
                                onClick={() => deleteLastPayment()}
                              >
                                -
                              </Button>
                            </Col>
                          )}
                        </Row>
                      </div>
                    )}
                  </Row>
                ))}
                <Row className="mb-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor={`pjpasien`}
                    className="form-label"
                  >
                    Sudah diterima dari
                  </Label>
                  <div>
                    <Input
                      id={`pjpasien`}
                      name={`pjpasien`}
                      type="text"
                      onChange={validation.handleChange}
                      value={validation.values.pjpasien || ''}
                      disabled={!!buktiBayar}
                      invalid={
                        validation.touched.pjpasien &&
                        !!validation.errors.pjpasien
                      }
                    />
                    {validation.touched.pjpasien &&
                    validation.errors.pjpasien ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.pjpasien}</div>
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>
                <Row className="mb-2">
                  <Label
                    style={{ color: 'black' }}
                    htmlFor={`keterangan`}
                    className="form-label"
                  >
                    Keterangan bayar
                  </Label>
                  <div>
                    <Input
                      disabled={!!buktiBayar}
                      id={`keterangan`}
                      name={`keterangan`}
                      type="text"
                      value={validation.values.keterangan || ''}
                      onChange={validation.handleChange}
                      invalid={
                        validation.touched.keterangan &&
                        !!validation.errors.keterangan
                      }
                    />
                    {validation.touched.keterangan &&
                    validation.errors.keterangan ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.keterangan}</div>
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>
              </Card>
            </Col>
            <Col lg={5}>
              <Card className="p-3">
                {totalDeposit > 0 && (
                  <Row>
                    <Label style={{ color: 'red' }} className="form-label">
                      *Pasien Ini memiliki deposit sebanyak Rp
                      {totalDeposit?.toLocaleString('id-ID') || 0}
                    </Label>
                  </Row>
                )}
                <Label style={{ color: 'black' }} className="form-label">
                  Detail Pembayaran
                </Label>
                <table className="table-bayar ">
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td>Rp{totalTagihan?.toLocaleString('id-ID') || ''}</td>
                    </tr>
                    <tr>
                      <td>Diskon</td>
                      <td>Rp{diskon}</td>
                    </tr>
                    <tr>
                      <td>Klaim Asuransi</td>
                      <td>Rp{nominalklaim?.toLocaleString('id-ID')}</td>
                    </tr>
                    {isDeposit && (
                      <tr>
                        <td>Deposit</td>
                        <td>
                          Rp{validation.values.deposit?.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tbody className="total-tagihan">
                    <tr>
                      <td>Total Tagihan</td>
                      <td>Rp{grandTotal?.toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                  <tbody className="total-tagihan">
                    <tr>
                      <td>Pembayaran</td>
                      <td>Rp{payment?.toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                  <tbody className="total-tagihan">
                    <tr>
                      <td>Sisa tagihan</td>
                      <td>Rp{sisaGrandTotal?.toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={13}>
              <Card className="p-3">
                <Row>
                  <Label style={{ color: 'black' }} className="form-label">
                    Detail Verifikasi
                  </Label>
                </Row>
                <Row>
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columns}
                    pagination
                    data={listPelayanan || []}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                  />
                </Row>
                <Row>
                  <Col lg={2}>
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="keterangan"
                      className="form-label"
                    >
                      Keterangan:
                    </Label>
                  </Col>
                  <Col lg={4}>
                    <Input
                      id="keterangan"
                      name="keterangan"
                      type="keterangan"
                      placeholder="Isi Keterangan"
                      disabled
                      style={{ height: '200px' }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={nota?.keterangan || ''}
                      invalid={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    {!buktiBayar && (
                      <Button
                        type="submit"
                        color="success"
                        placement="top"
                        id="tooltipTop"
                      >
                        SIMPAN
                      </Button>
                    )}
                    {!!buktiBayar && (
                      <Button
                        type="button"
                        onClick={() => handlePrintBukti()}
                        color="info"
                        placement="top"
                        id="tooltipTop"
                      >
                        PRINT
                      </Button>
                    )}
                    <button
                      type="button"
                      className="btn w-sm btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Batal
                    </button>
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
      <PrintTemplate
        ContentPrint={
          <div className="template-bukti-bayar-print">
            <h2 className="judul-template">
              Bukti Pembayaran pasien Rumah Sakit Solusi Nusantara Berdikari
            </h2>
            <table>
              <tr>
                <td>Nama Pasien</td>
                <td>: {buktiBayar?.namapasien}</td>
              </tr>
              <tr>
                <td>Tgl Pendaftaran</td>
                <td>: {buktiBayar?.tglregistrasi}</td>
              </tr>
              <tr>
                <td>No. Rekam Medis</td>
                <td>: {buktiBayar?.nocmfk}</td>
              </tr>
              <tr>
                <td>No Registrasi</td>
                <td>: {buktiBayar?.namapasien}</td>
              </tr>
              <tr>
                <td>Sudah diterima dari</td>
                <td>: {buktiBayar?.pjpasien}</td>
              </tr>
              {buktiBayar?.createdCaraBayar?.map((caraBayar, index) => (
                <tr key={index}>
                  <td>Metode bayar {index + 1}</td>
                  <td>
                    :{' '}
                    {`${
                      caraBayar.objectmetodebayarfk === 'Tunai' ? 'Tunai' : ''
                    }` +
                      ` ${
                        caraBayar.objectjenisnontunaifk
                          ? `${caraBayar.objectjenisnontunaifk}`
                          : ``
                      }` +
                      ` Rp${caraBayar.totalbayar.toLocaleString('id-ID')}`}
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total Bayar</td>
                <td>: {buktiBayar?.totalbayar}</td>
              </tr>
              <tr>
                <td>Untuk Pembayaran</td>
                <td>: {buktiBayar?.keterangan}</td>
              </tr>
            </table>
          </div>
        }
        testing={false}
        ref={refPrintTransaksi}
        orientation="landscape"
        format={[210, 120]}
      />
    </div>
  )
}

export default Bayar
