import { useFormik } from 'formik'
import userDummy from '../../assets/images/users/user-dummy-img.jpg'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
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
  paymentPiutangPasienGet,
  paymentPiutangPasienGetReset,
} from '../../store/payment/action'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
import './BayarPiutang.scss'
import { useNavigate, useParams } from 'react-router-dom'
import {
  rgxAllNumber,
  rgxAllPeriods,
  rgxValidNumber,
} from '../../utils/regexcommon'
import CustomInput from '../../Components/Common/CustomInput/CustomInput'

const initPayment = (dateNow) => ({
  metodebayar: '',
  nontunai: '',
  pjpasien: '',
  approvalcode: '',
  nominalbayar: '',
  tglbayar: dateNow,
  rekeningrs: '',
})

const BayarPiutang = () => {
  const { norecpiutang, norecnota, norecbayar } = useParams()
  let {
    dataPasienPlg,
    comboboxReg,
    listPelayanan,
    paymentPiutangPasien,
    norecdp,
    comboboxpayment,
    nota,
    kepesertaan,
    bayarBefore,
  } = useSelector((state) => ({
    dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
    comboboxReg: state.Master.comboRegistrasiGet.data || {},
    listPelayanan: state.Payment.pelayananFromVerifGet.data?.pelayanan || [],
    comboboxpayment: state.Master.comboPaymentGet.data,
    nota: state.Payment.pelayananFromVerifGet.data?.nota || [],
    kepesertaan: state.Payment.pelayananFromVerifGet.data?.kepesertaan || [],
    paymentPiutangPasien: state.Payment.paymentPiutangPasienGet.data || null,
    bayarBefore: state.Payment.paymentPiutangPasienGet.data?.buktiBayar || null,
  }))

  const [dateStart] = useState(() => new Date().toISOString())
  const [dateEnd] = useState(() => new Date().toISOString())

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      objectjenispembayaranfk: 2,
      totaltagihan: '',
      diskon: 0,
      // non wajib
      deposit: 0,
      nobukti: `B${dateStart.slice(2, 4)}${
        dateStart.slice(5, 7) + 1
      }${dateStart.slice(8, 10)}${dateStart.slice(11, 13)}${dateStart.slice(
        14,
        16
      )}${dateStart.slice(17, 19)}`,
      pegawai: '',
      norecpiutang: '',
      norecnota: '',
      klaim: '',
      norecdp: '',
      pjpasien: '',
      keterangan: '',
      nodeposit: '',
      payment: [
        {
          ...initPayment(dateStart),
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
      keterangan: Yup.string().required('Keterangan wajib diisi'),
      nobukti: Yup.string().required('No Bukti harus diisi'),
      pegawai: Yup.string().required('Pegawai harus diisi'),
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
        buktiBayarCreate(valuesSent, (data) => {
          navigate(
            `/payment/bayar-piutang/${norecpiutang}/${norecnota}/${data.buktiBayar.norec}`,
            {
              replace: true,
            }
          )
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

  const addPayment = () => {
    let newPayments = [...validation.values.payment]
    newPayments.push({
      metodebayar: '',
      nontunai: '',
      pjpasien: '',
      nominalbayar: '',
      tglbayar: dateStart,
      rekeningrs: '',
      approvalcode: '',
    })
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
    dispatch(daftarPasienPulangGet(dateStart, dateEnd))
  }
  const handleClickCari = () => {
    dispatch(
      daftarPasienPulangGet({ dateStart, dateEnd, instalasi, unit: '', search })
    )
  }
  let totalTagihan =
    (paymentPiutangPasien?.piutang?.totalnota || 0) -
    (paymentPiutangPasien?.klaim || 0)
  let grandTotal = paymentPiutangPasien?.piutang?.totalpiutang || 0
  let klaim = paymentPiutangPasien?.klaim || 0
  let buktiBayar = paymentPiutangPasien?.buktibayarsebelum || []
  let totalSudahBayar = buktiBayar.reduce(
    (prev, bb) => prev + (bb.totalbayar || 0),
    0
  )
  let totalBayar = validation.values.payment.reduce((total, payment) => {
    return total + strToNumber(payment.nominalbayar)
  }, 0)
  const totalFinal = grandTotal - totalBayar

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Tgl Pelayanan</span>,
      selector: (row) => dateTimeLocal(new Date(row.tglbayar)),
      sortable: true,
      width: '160px',
      wrap: true,
    },
  ]

  useEffect(() => {
    dispatch(comboPaymentGet())
  }, [dispatch])

  useEffect(() => {
    const setFF = validation.setFieldValue
    grandTotal && setFF('totaltagihan', grandTotal)
    setFF('diskon', 0)
    setFF('klaim', 0)
  }, [dispatch, validation.setFieldValue, grandTotal])

  useEffect(() => {
    const setFF = validation.setFieldValue
    nota.namapasien && setFF('pjpasien', nota.namapasien)
    nota.idpegawai && setFF('pegawai', nota.idpegawai)
    nota.norecdp && setFF('norecdp', nota.norecdp)
  }, [nota, validation.setFieldValue])

  useEffect(() => {
    const setFF = validation.setFieldValue
    norecpiutang && setFF('norecpiutang', norecpiutang)
    norecpiutang &&
      dispatch(
        paymentPiutangPasienGet({
          norecpiutang: norecpiutang,
          norecbayar: norecbayar || '',
        })
      )
    norecnota && setFF('norecnota', norecnota)
    norecnota && dispatch(pelayananFromVerifGet({ norecnota: norecnota }))
    return () => {
      dispatch(paymentPiutangPasienGetReset())
    }
  }, [dispatch, norecpiutang, norecbayar, validation.setFieldValue, norecnota])

  useEffect(() => {
    const payment = initPayment(dateStart)
    const setFF = validation.setFieldValue
    if (bayarBefore) {
      const caraBayarBefore = bayarBefore.carabayar.map((caraBayar) => ({
        ...initPayment(dateStart),
        ...caraBayar,
      }))
      setFF('payment', caraBayarBefore)
    } else {
      setFF('payment', [payment])
    }
  }, [dateStart, bayarBefore, validation.setFieldValue])

  const filterRekeningRs = (rekeningRs, nontunaiV) => {
    return rekeningRs?.filter((rekening) => rekening.objectbankfk === nontunaiV)
  }

  return (
    <div className="page-content page-bayar-piutang">
      <Container fluid>
        <BreadCrumb title="Pembayaran" pageTitle="Pembayaran" />
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
                {validation.values.payment.map((itemPayment, iPayment) => (
                  <Row key={iPayment} className="mb-5">
                    <Row className="mb-2">
                      <Col lg={6}>
                        <Label
                          style={{ color: 'black' }}
                          htmlFor={`metodebayar${iPayment}`}
                          className="form-label"
                        >
                          Metode Pembayaran {iPayment + 1}
                        </Label>
                        <div>
                          <CustomSelect
                            id={`metodebayar${iPayment}`}
                            name={`metodebayar${iPayment}`}
                            options={comboboxpayment?.metodeBayar || []}
                            onChange={(e) =>
                              changePayment('metodebayar', iPayment, e?.value)
                            }
                            isDisabled={!!bayarBefore}
                            value={itemPayment.metodebayar || ''}
                            className={`input ${
                              validation.errors.payment?.[iPayment]?.metodebayar
                                ? 'is-invalid'
                                : ''
                            }`}
                          />
                          {validation.touched.payment?.[iPayment]
                            ?.metodebayar &&
                            validation.errors.payment?.[iPayment]
                              ?.metodebayar && (
                              <FormFeedback type="invalid">
                                <div>
                                  {
                                    validation.errors.payment?.[iPayment]
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
                                      <CustomInput
                                        className="form-check-input"
                                        type="radio"
                                        id={`radio-payment-${key}-${iPayment}`}
                                        checked={
                                          itemPayment.nontunai === data.value
                                        }
                                        disabled={!!bayarBefore}
                                        readOnly
                                        onClick={(e) => {
                                          changePayment(
                                            'nontunai',
                                            iPayment,
                                            data.value
                                          )
                                        }}
                                      />
                                      <Label
                                        className="form-check-label ms-2"
                                        htmlFor={`radio-payment-${key}-${iPayment}`}
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
                            htmlFor={`approvalcode${iPayment}`}
                            className="form-label"
                          >
                            Reference Code
                          </Label>
                          <div>
                            <CustomInput
                              id={`approvalcode${iPayment}`}
                              name={`approvalcode${iPayment}`}
                              type="string"
                              placeholder="Masukkan reference code"
                              disabled={!!bayarBefore}
                              value={itemPayment.approvalcode || ''}
                              onChange={(e) => {
                                rgxAllNumber.test(e.target.value) &&
                                  changePayment(
                                    'approvalcode',
                                    iPayment,
                                    e.target.value
                                  )
                              }}
                              invalid={
                                validation.touched.payment?.[iPayment]
                                  ?.approvalcode &&
                                !!validation.errors.payment?.[iPayment]
                                  ?.approvalcode
                              }
                            />
                            {validation.touched.payment?.[iPayment]
                              ?.approvalcode &&
                            validation.errors.payment?.[iPayment]
                              ?.approvalcode ? (
                              <FormFeedback type="invalid">
                                <div>
                                  {
                                    validation.errors.payment?.[iPayment]
                                      ?.approvalcode
                                  }
                                </div>
                              </FormFeedback>
                            ) : null}
                          </div>
                        </>
                      )}
                      <Label
                        style={{ color: 'black' }}
                        htmlFor={`nominalbayar${iPayment}`}
                        className="form-label mt-2"
                      >
                        Nominal bayar
                      </Label>
                      <div>
                        <CustomInput
                          id={`nominalbayar${iPayment}`}
                          name={`nominalbayar${iPayment}`}
                          type="string"
                          placeholder="Masukkan nominal bayar"
                          className="form-control"
                          disabled={!!bayarBefore}
                          onChange={(e) =>
                            handleChangeNominal(e, iPayment, itemPayment)
                          }
                          invalid={
                            validation.touched.payment?.[iPayment]
                              ?.nominalbayar &&
                            !!validation.errors.payment?.[iPayment]
                              ?.nominalbayar
                          }
                          value={itemPayment.nominalbayar || ''}
                        />
                        {validation.touched.payment?.[iPayment]?.nominalbayar &&
                        validation.errors.payment?.[iPayment]?.nominalbayar ? (
                          <FormFeedback type="invalid">
                            <div>
                              {
                                validation.errors.payment?.[iPayment]
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
                            htmlFor="keterangan"
                            className="form-label"
                          >
                            Rekening RS
                          </Label>
                          <div>
                            <CustomSelect
                              id={`rekeningrs${iPayment}}`}
                              name={`rekeningrs${iPayment}`}
                              isDisabled={!!bayarBefore}
                              options={filterRekeningRs(
                                comboboxpayment?.rekeningRs || [],
                                itemPayment.nontunai
                              )}
                              onChange={(e) => {
                                changePayment('rekeningrs', iPayment, e?.value)
                              }}
                              className={`input mt-2 ${
                                validation.errors.payment?.[iPayment]
                                  ?.rekeningrs
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            {validation.touched.payment?.[iPayment]
                              ?.rekeningrs &&
                            validation.errors.payment?.[iPayment]
                              ?.rekeningrs ? (
                              <FormFeedback type="invalid">
                                <div>
                                  {
                                    validation.errors.payment?.[iPayment]
                                      ?.rekeningrs
                                  }
                                </div>
                              </FormFeedback>
                            ) : null}
                          </div>
                        </>
                      )}
                    </Row>
                    {iPayment === validation.values.payment.length - 1 && (
                      <div className="d-flex flex-column align-items-center">
                        <Row>
                          <Col lg={5}>
                            <Button
                              type="button"
                              color="info"
                              placement="top"
                              onClick={() => addPayment()}
                              disabled={!!bayarBefore}
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
                    <CustomInput
                      id={`pjpasien`}
                      name={`pjpasien`}
                      type="text"
                      value={validation.values.pjpasien || ''}
                      invalid={
                        validation.touched.pjpasien &&
                        !!validation.errors.pjpasien
                      }
                      onChange={validation.handleChange}
                      disabled={!!bayarBefore}
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
                    <CustomInput
                      id={`keterangan`}
                      name={`keterangan`}
                      type="text"
                      value={validation.values.keterangan || ''}
                      onChange={validation.handleChange}
                      invalid={
                        validation.touched.keterangan &&
                        !!validation.errors.keterangan
                      }
                      disabled={!!bayarBefore}
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
                <Label style={{ color: 'black' }} className="form-label">
                  Detail Pembayaran
                </Label>
                <table className="table-bayar ">
                  <tbody>
                    <tr>
                      <td>Total Tagihan</td>
                      <td>Rp{totalTagihan?.toLocaleString('id-ID') || ''}</td>
                    </tr>
                    <tr>
                      <td>Klaim asuransi</td>
                      <td>Rp{klaim?.toLocaleString('id-ID') || ''}</td>
                    </tr>
                    <tr>
                      <td>Total sudah bayar</td>
                      <td>
                        Rp{totalSudahBayar?.toLocaleString('id-ID') || ''}
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="total-tagihan">
                    <tr>
                      <td>Total Piutang</td>
                      <td>Rp{grandTotal?.toLocaleString('id-ID') || ''}</td>
                    </tr>
                    <tr>
                      <td>Total Bayar</td>
                      <td>Rp{totalBayar?.toLocaleString('id-ID') || ''}</td>
                    </tr>
                    <tr>
                      <td>Sisa piutang</td>
                      <td>Rp{totalFinal?.toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={13}>
              <Card className="p-3">
                {/* <Row>
                                        <Label style={{ color: "black" }} className="form-label">
                                            Riwayat Pembayaran
                                        </Label>
                                    </Row>
                                    <Row>
                                        <DataTable
                                            fixedHeader
                                            columns={columns}
                                            pagination
                                            data={[]}
                                            progressPending={false}
                                            customStyles={tableCustomStyles}
                                        />
                                    </Row> */}
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
                    <CustomInput
                      id="keterangan"
                      name="keterangan"
                      type="keterangan"
                      placeholder="Isi Keterangan"
                      disabled
                      style={{ height: '200px' }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={nota?.keterangan || ''}
                    />
                    {validation.touched.keterangan &&
                    validation.errors.keterangan ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.keterangan}</div>
                      </FormFeedback>
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <Button
                      type="submit"
                      color="success"
                      placement="top"
                      id="tooltipTop"
                      disabled={!!bayarBefore}
                    >
                      SIMPAN
                    </Button>
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
    </div>
  )
}

export default BayarPiutang
