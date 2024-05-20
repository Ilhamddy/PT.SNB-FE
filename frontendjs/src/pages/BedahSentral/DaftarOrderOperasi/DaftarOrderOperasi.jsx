import React, { useEffect, useState } from 'react'
import withRouter from '../../../Components/Common/withRouter'
import UiContent from '../../../Components/Common/UiContent'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from 'reactstrap'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import {
  bedahSentralResetForm,
  widgetOrderOperasiGet,
  getDaftarOrderOperasi,
  getComboOrderOperasi,
  updateOrderOperasi,
} from '../../../store/actions'
import { comboRegistrasiGet } from '../../../store/master/action'
import { useDispatch, useSelector } from 'react-redux'
import CountUp from 'react-countup'
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import classnames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'

const DaftarOrderOperasi = () => {
  document.title = 'Daftar Order Operasi'
  const dispatch = useDispatch()
  const { datawidget, data, dataCombo } = useSelector((state) => ({
    datawidget: state.BedahSentral.widgetOrderOperasiGet.data,
    data: state.BedahSentral.getDaftarOrderOperasi.data,
    dataCombo: state.Master.comboRegistrasiGet.data,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      dateStart: dateNow,
      dateEnd: dateNow,
      unitOrder: '',
      search: '',
    },
    validationSchema: Yup.object({
      // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
    }),
    onSubmit: (values) => {
      console.log(values)
      dispatch(
        getDaftarOrderOperasi({
          dateStart: vSetValidation.values.dateStart || dateNow,
          dateEnd: vSetValidation.values.dateEnd || dateNow,
          unitOrder: vSetValidation.values.unitOrder,
          search: vSetValidation.values.search,
          status: '',
        })
      )
    },
  })
  const handleBeginOnChangeStart = (newBeginValue) => {
    var dateString = new Date(
      newBeginValue.getTime() - newBeginValue.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0]
    vSetValidation.setFieldValue('dateStart', dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    var dateString = new Date(
      newBeginValue.getTime() - newBeginValue.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0]
    vSetValidation.setFieldValue('dateEnd', dateString)
  }
  useEffect(() => {
    return () => {
      dispatch(bedahSentralResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(
      widgetOrderOperasiGet({
        dateStart: vSetValidation.values.dateStart,
        dateEnd: vSetValidation.values.dateEnd,
      })
    )
    dispatch(
      getDaftarOrderOperasi({
        dateStart: vSetValidation.values.dateStart,
        dateEnd: vSetValidation.values.dateEnd,
        unitOrder: vSetValidation.values.unitOrder,
        status: '',
      })
    )
  }, [
    dispatch,
    vSetValidation.values.dateStart,
    vSetValidation.values.dateEnd,
    vSetValidation.values.unitOrder,
  ])
  const [datax, setDatax] = useState([])
  useEffect(() => {
    setDatax(data)
  }, [setDatax, data])
  const [selectedPasien, setselectedPasien] = useState(null)
  const handleCard = (item) => {
    setselectedPasien(item)
    const itemIndex = datax.findIndex(
      (dataItem) => dataItem.norec === item.norec
    )
    if (itemIndex !== -1) {
      const updatedData = [...datax]
      for (let i = 0; i < updatedData.length; i++) {
        if (i !== itemIndex) {
          updatedData[i].color = '#FFFFFF'
        } else {
          updatedData[i].color = '#F2E9CA'
        }
      }
      setDatax(updatedData)
    }
  }
  useEffect(() => {
    dispatch(comboRegistrasiGet())
  }, [dispatch])
  const [dataUnit, setdataUnit] = useState([])
  const handleInputUnit = (characterEntered) => {
    if (characterEntered.length > 3) {
      var newArray = dataCombo.unit.filter(function (el) {
        return el.objectinstalasifk === 1
      })
      setdataUnit(newArray)
    }
  }
  // Pills Tabs
  const [pillsTab, setpillsTab] = useState('3')
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab)
    }
  }
  const handleClickButton = (e) => {
    if (selectedPasien === null) {
      toast.error('Pasien Belum Dipilih', { autoClose: 3000 })
      return
    }

    if (e === 'Verifikasi') {
      if (selectedPasien.objectstatusoperasifk !== 1) {
        toast.error('Pasien Sudah ' + selectedPasien.statusoperasi, {
          autoClose: 300,
        })
        return
      }
      setisVerifikasiOpen(true)
    }
  }
  const [isVerifikasiOpen, setisVerifikasiOpen] = useState(false)
  return (
    <React.Fragment>
      <ModalVerifikasi
        isVerifikasiOpen={isVerifikasiOpen}
        toggle={() => setisVerifikasiOpen(!isVerifikasiOpen)}
        selectedPasien={selectedPasien}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daftar Order Operasi" pageTitle="Forms" />
          <Row>
            {datawidget.map((item, key) => (
              <Col xxl={4} sm={6} key={key}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Total Order {item.label}
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span
                            className="counter-value"
                            style={{ fontSize: '1.5rem' }}
                          >
                            <CountUp
                              start={0}
                              end={item.counter}
                              decimal={item.decimals}
                              duration={3}
                            />
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-md flex-shrink-0">
                          <span
                            className={
                              'avatar-title rounded-circle fs-4 bg-soft-' +
                              item.iconClass +
                              ' text-' +
                              item.iconClass
                            }
                          >
                            {/* <i className={item.icon}></i> */}
                            <img src={item.icon} alt="" className="avatar-md" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <div
                    className="card-footer"
                    style={{ backgroundColor: '#FFCB46' }}
                  >
                    <div className="text-center">
                      {/* <Link to="#" className="link-light" onClick={() => handleClickCard(item)}>View <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link> */}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}

            <Col lg={3}>
              <Card>
                <CardBody className="p-4 text-center">
                  <div className="mx-auto avatar-md mb-3">
                    <span
                      className={
                        'avatar-title rounded-circle fs-4 bg-soft-info'
                      }
                    >
                      <h2 className="ff-secondary fw-semibold">
                        <span
                          className="counter-value"
                          style={{ fontSize: '1.5rem' }}
                        >
                          {/* <img src={pria} alt="" className="img-fluid rounded-circle" /> */}
                          {selectedPasien?.profile === 'baby' ? (
                            <img
                              src={baby}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : selectedPasien?.profile === 'dewasalaki' ? (
                            <img
                              src={pria}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : selectedPasien?.profile === 'anaklaki' ? (
                            <img
                              src={anaklaki}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : selectedPasien?.profile === 'anakperempuan' ? (
                            <img
                              src={anakperempuan}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : selectedPasien?.profile === 'dewasaperempuan' ? (
                            <img
                              src={dewasaperempuan}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : selectedPasien?.profile === 'kakek' ? (
                            <img
                              src={kakek}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : selectedPasien?.profile === 'nenek' ? (
                            <img
                              src={nenek}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          ) : (
                            // Render when none of the conditions are met
                            <p>No profile image available</p>
                          )}
                        </span>
                      </h2>
                    </span>
                  </div>
                  <h5 className="card-title mb-1">
                    {selectedPasien && selectedPasien?.namapasien
                      ? selectedPasien.namapasien
                      : '-'}
                  </h5>
                  <p className="text-muted mb-0">
                    {selectedPasien && selectedPasien.jeniskelamin
                      ? selectedPasien.jeniskelamin
                      : '-'}
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Nav pills className="nav-success mb-3">
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({ active: pillsTab === '1' })}
                        onClick={() => {
                          pillsToggle('1')
                        }}
                      >
                        Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({ active: pillsTab === '2' })}
                        onClick={() => {
                          pillsToggle('2')
                        }}
                      >
                        Riwayat
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({ active: pillsTab === '3' })}
                        onClick={() => {
                          pillsToggle('3')
                        }}
                      >
                        Action
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={pillsTab} className="text-muted">
                    <TabPane tabId="1" id="home-1">
                      <Card>
                        <CardBody>
                          <div className="table-responsive">
                            <Table className="table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Tgl. Order :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien && selectedPasien.tglinputx
                                      ? selectedPasien.tglinputx
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Rencana Operasi :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien && selectedPasien.tglrencana
                                      ? selectedPasien.tglrencana
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Kelas :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien && selectedPasien.namakelas
                                      ? selectedPasien.namakelas
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Penjamin :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien &&
                                    selectedPasien.jenispenjamin
                                      ? selectedPasien.jenispenjamin
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Diorder Oleh :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien && selectedPasien.pengorder
                                      ? selectedPasien.pengorder
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Diagnosa :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien &&
                                    selectedPasien.kodeexternal
                                      ? selectedPasien.kodeexternal
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Keterangan :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien &&
                                    selectedPasien.catatanorder
                                      ? selectedPasien.catatanorder
                                      : '-'}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="ps-0" scope="row">
                                    Nama Operasi :
                                  </th>
                                  <td className="text-muted">
                                    {selectedPasien &&
                                    selectedPasien.namaoperasi
                                      ? selectedPasien.namaoperasi
                                      : '-'}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="2" id="home-1">
                      <Card>
                        <CardBody>
                          <div className="table-responsive"></div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="3" id="home-1">
                      <Card>
                        <CardBody>
                          <div className="live-preview">
                            <div className="d-flex flex-column gap-2">
                              <Button
                                color="info"
                                className="btn-animation"
                                data-text="Verifikasi"
                                onClick={() => handleClickButton('Verifikasi')}
                              >
                                <span>Verifikasi</span>
                              </Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardHeader>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault()
                      vSetValidation.handleSubmit()
                      return false
                    }}
                    className="gy-4"
                    action="#"
                  >
                    <Row className="gy-4">
                      <Col sm={3}>
                        <KontainerFlatpickr
                          options={{
                            // mode: "range",
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={dateNow}
                          onChange={([dateStart]) => {
                            handleBeginOnChangeStart(dateStart)
                          }}
                        />
                      </Col>
                      <Col lg={1}>
                        <h4 className="mt-2 text-center">s/d</h4>
                      </Col>
                      <Col sm={3}>
                        <KontainerFlatpickr
                          isError={false}
                          options={{
                            // mode: "range",
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={dateNow}
                          onChange={([dateEnd]) => {
                            handleBeginOnChangeEnd(dateEnd)
                          }}
                        />
                      </Col>
                      <Col lg={2}>
                        <CustomSelect
                          id="unitOrder"
                          name="unitOrder"
                          options={dataUnit}
                          onChange={(e) => {
                            vSetValidation.setFieldValue(
                              'unitOrder',
                              e?.value || ''
                            )
                          }}
                          value={vSetValidation.values.unitOrder}
                          className={`input row-header ${
                            !!vSetValidation?.errors.unitOrder
                              ? 'is-invalid'
                              : ''
                          }`}
                          onInputChange={handleInputUnit}
                        />
                        {vSetValidation.touched.unitOrder &&
                          !!vSetValidation.errors.unitOrder && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.unitOrder}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={2}>
                        <Input
                          id="search"
                          name="search"
                          type="text"
                          placeholder="Search..."
                          value={vSetValidation.values.search}
                          onChange={(e) => {
                            vSetValidation.setFieldValue(
                              'search',
                              e.target.value
                            )
                          }}
                          invalid={
                            vSetValidation.touched?.search &&
                            !!vSetValidation.errors?.search
                          }
                        />
                        {vSetValidation.touched?.search &&
                          !!vSetValidation.errors.search && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.search}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={1}>
                        <Button type="submit" color="info" placement="top">
                          CARI
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardHeader>
                <CardBody>
                  <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                    {(datax || []).map((item, key) => (
                      <React.Fragment key={key}>
                        <Card
                          className="product card-animate"
                          style={{ backgroundColor: item.color }}
                          onClick={() => {
                            handleCard(item)
                          }}
                        >
                          <CardBody>
                            <Row className="gy-3">
                              <h6 className="card-title mb-0">
                                <span
                                  className="badge align-middle fs-10"
                                  style={{
                                    backgroundColor: item.colorjenisoperasi,
                                    color: 'black',
                                  }}
                                >
                                  {item.jenisoperasi}
                                </span>
                              </h6>
                              <div className="col-sm-auto">
                                <div className="avatar-md flex-shrink-0">
                                  <span
                                    className={
                                      'avatar-title rounded-circle fs-4'
                                    }
                                    style={{
                                      backgroundColor: item.statusdarurat,
                                    }}
                                  >
                                    <h2 className="ff-secondary fw-semibold">
                                      <span
                                        className="counter-value"
                                        style={{ fontSize: '1.5rem' }}
                                      >
                                        {item.profile === 'baby' ? (
                                          <img
                                            src={baby}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : item.profile === 'dewasalaki' ? (
                                          <img
                                            src={pria}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : item.profile === 'anaklaki' ? (
                                          <img
                                            src={anaklaki}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : item.profile === 'anakperempuan' ? (
                                          <img
                                            src={anakperempuan}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : item.profile ===
                                          'dewasaperempuan' ? (
                                          <img
                                            src={dewasaperempuan}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : item.profile === 'kakek' ? (
                                          <img
                                            src={kakek}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : item.profile === 'nenek' ? (
                                          <img
                                            src={nenek}
                                            alt=""
                                            className="img-fluid rounded-circle"
                                          />
                                        ) : (
                                          // Render when none of the conditions are met
                                          <p>No profile image available</p>
                                        )}
                                      </span>
                                    </h2>
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm">
                                <h5 className="card-title mb-1">
                                  {item.nocm ? item.nocm : '-'} /{' '}
                                  {item.noregistrasi ? item.noregistrasi : '-'}
                                </h5>
                                <p className="mb-0">
                                  {item.namapasien &&
                                  item.namapasien.length > 20
                                    ? `${item.namapasien.substring(0, 20)}...`
                                    : item.namapasien}
                                </p>
                                <p className="text-muted mb-0">
                                  {item.umur ? item.umur : '-'}
                                </p>
                                <p className="text-muted mb-0">
                                  {item.statusoperasi
                                    ? item.statusoperasi
                                    : '-'}
                                </p>
                              </div>
                              <div className="col-sm">
                                <div className="text-lg-start">
                                  <p className="text-muted mb-0">
                                    Poli Order {item.namaunit}
                                  </p>
                                  <p className="text-muted mb-0">
                                    Tgl. Order{' '}
                                    {item.tglinputx ? item.tglinputx : '-'}
                                  </p>
                                  <p className="text-muted mb-0">
                                    Jadwal Operasi{' '}
                                    {item.tglrencana ? item.tglrencana : '-'}
                                  </p>
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="text-lg-start">
                                  <p className="text-muted mb-0">
                                    Operasi :{' '}
                                    {item.namaoperasi ? item.namaoperasi : '-'}
                                  </p>
                                  <p className="text-muted mb-0">
                                    dr. Operator :{' '}
                                    {item.namalengkap ? item.namalengkap : '-'}
                                  </p>
                                  <p className="text-muted mb-0">
                                    Diagnosa :{' '}
                                    {item.kodeexternal
                                      ? item.kodeexternal
                                      : '-'}
                                  </p>
                                </div>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      </React.Fragment>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const ModalVerifikasi = ({ isVerifikasiOpen, toggle, selectedPasien }) => {
  const dispatch = useDispatch()
  const [dateEnd] = useState(() => new Date().toISOString())
  const { dataComboOperasi, newData, success, loading } = useSelector(
    (state) => ({
      dataComboOperasi: state.BedahSentral.getComboOrderOperasi.data,
      newData: state.BedahSentral.updateOrderOperasi.newData,
      success: state.BedahSentral.updateOrderOperasi.success,
      loading: state.BedahSentral.updateOrderOperasi.loading,
    })
  )
  const vSetValidationModal = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecdp: '',
      norec: '',
      rencanaOperasi: '',
      nocm: '',
      namapasien: '',
      unitasal: '',
      tglorder: '',
      diagnosa: '',
      catatanorder: '',
      statusVerifikasi: '',
      formCheckCito: '',
      namaOperasi: '',
      drOperator: '',
      jenisOperasi: '',
      kamarOperasi: '',
      catatanVerifikasi: '',
      objectunitasalfk: '',
    },
    validationSchema: Yup.object({}),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      dispatch(
        updateOrderOperasi(values, () => {
          // resetForm({ values: '' })
        })
      )
    },
  })
  useEffect(() => {
    const setV = vSetValidationModal.setValues
    setV({
      ...vSetValidationModal.initialValues,
      norecdp: selectedPasien?.norecdp ?? '',
      norec: selectedPasien?.norec ?? '',
      rencanaOperasi: selectedPasien?.tglrencanax ?? '',
      nocm: selectedPasien?.nocm ?? '',
      namapasien: selectedPasien?.namapasien ?? '',
      unitasal: selectedPasien?.namaunit ?? '',
      tglorder: selectedPasien?.tglinputx ?? '',
      diagnosa: selectedPasien?.kodeexternal ?? '',
      catatanorder: selectedPasien?.catatanorder ?? '',
      statusVerifikasi: selectedPasien?.objectstatusoperasifk ?? '',
      formCheckCito: selectedPasien?.iscito ?? '',
      namaOperasi: selectedPasien?.namaoperasi ?? '',
      drOperator: selectedPasien?.objectdokteroperatorfk ?? '',
      jenisOperasi: selectedPasien?.objectjenisoperasifk ?? '',
      kamarOperasi: selectedPasien?.objectkamarfk ?? '',
      catatanVerifikasi: selectedPasien?.catatanverif ?? '',
      objectunitasalfk: selectedPasien?.objectunitasalfk ?? '',
    })
  }, [
    vSetValidationModal.setValues,
    selectedPasien,
    vSetValidationModal.initialValues,
  ])
  useEffect(() => {
    dispatch(getComboOrderOperasi())
  }, [dispatch])
  return (
    <Modal isOpen={isVerifikasiOpen} toggle={toggle} centered={true} size="xl">
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vSetValidationModal.handleSubmit()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Card>
            <CardHeader
              className="align-items-center"
              style={{ backgroundColor: '#FFCB46' }}
            >
              <h4
                className="mb-0"
                style={{ color: 'black', textAlign: 'center' }}
              >
                Verifikasi Order Operasi
              </h4>
            </CardHeader>
            <CardBody>
              <Row className="gy-3">
                <Col lg={6}>
                  <Row className="gy-3">
                    <Col lg={6}>
                      <div className="mt-2">
                        <Label className="form-label">No RM</Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Input
                        id="nocm"
                        name="nocm"
                        type="text"
                        value={vSetValidationModal.values.nocm}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'nocm',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.nocm &&
                          !!vSetValidationModal.errors?.nocm
                        }
                        disabled
                      />
                      {vSetValidationModal.touched?.nocm &&
                        !!vSetValidationModal.errors.nocm && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.nocm}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={6}>
                      <div className="mt-2">
                        <Label className="form-label">Nama Pasien</Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Input
                        id="namapasien"
                        name="namapasien"
                        type="text"
                        value={vSetValidationModal.values.namapasien}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'namapasien',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.namapasien &&
                          !!vSetValidationModal.errors?.namapasien
                        }
                        disabled
                      />
                      {vSetValidationModal.touched?.namapasien &&
                        !!vSetValidationModal.errors.namapasien && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.namapasien}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={6}>
                      <div className="mt-2">
                        <Label className="form-label">Unit Asal</Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Input
                        id="unitasal"
                        name="unitasal"
                        type="text"
                        value={vSetValidationModal.values.unitasal}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'unitasal',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.unitasal &&
                          !!vSetValidationModal.errors?.unitasal
                        }
                        disabled
                      />
                      {vSetValidationModal.touched?.unitasal &&
                        !!vSetValidationModal.errors.unitasal && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.unitasal}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={6}>
                      <div className="mt-2">
                        <Label className="form-label">Tgl. Order</Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Input
                        id="tglorder"
                        name="tglorder"
                        type="text"
                        value={vSetValidationModal.values.tglorder}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'tglorder',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.tglorder &&
                          !!vSetValidationModal.errors?.tglorder
                        }
                        disabled
                      />
                      {vSetValidationModal.touched?.tglorder &&
                        !!vSetValidationModal.errors.tglorder && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.tglorder}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={6}>
                      <div className="mt-2">
                        <Label className="form-label">Diagnosa</Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Input
                        id="diagnosa"
                        name="diagnosa"
                        type="text"
                        value={vSetValidationModal.values.diagnosa}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'diagnosa',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.diagnosa &&
                          !!vSetValidationModal.errors?.diagnosa
                        }
                        disabled
                      />
                      {vSetValidationModal.touched?.diagnosa &&
                        !!vSetValidationModal.errors.diagnosa && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.diagnosa}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={6}>
                      <div className="mt-2">
                        <Label className="form-label">Catatan Order</Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Input
                        id="catatanorder"
                        name="catatanorder"
                        type="textarea"
                        value={vSetValidationModal.values.catatanorder}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'catatanorder',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.catatanorder &&
                          !!vSetValidationModal.errors?.catatanorder
                        }
                        disabled
                      />
                      {vSetValidationModal.touched?.catatanorder &&
                        !!vSetValidationModal.errors.catatanorder && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.catatanorder}</div>
                          </FormFeedback>
                        )}
                    </Col>
                  </Row>
                </Col>
                <Col lg={6}>
                  <Row className="gy-3">
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Status Verifikasi</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <CustomSelect
                        id="statusVerifikasi"
                        name="statusVerifikasi"
                        options={dataComboOperasi.statusverifikasi}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'statusVerifikasi',
                            e?.value || ''
                          )
                        }}
                        value={vSetValidationModal.values.statusVerifikasi}
                        className={`input row-header ${
                          !!vSetValidationModal?.errors.statusVerifikasi
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {vSetValidationModal.touched.statusVerifikasi &&
                        !!vSetValidationModal.errors.statusVerifikasi && (
                          <FormFeedback type="invalid">
                            <div>
                              {vSetValidationModal.errors.statusVerifikasi}
                            </div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Rencana Operasi</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <Row>
                        <Col lg={8}>
                          <KontainerFlatpickr
                            isError={
                              vSetValidationModal.touched?.rencanaOperasi &&
                              !!vSetValidationModal.errors?.rencanaOperasi
                            }
                            id="rencanaOperasi"
                            options={{
                              dateFormat: 'Y-m-d H:i',
                              defaultDate: 'today',
                              enableTime: true,
                              time_24hr: true,
                            }}
                            value={vSetValidationModal.values.rencanaOperasi}
                            onChange={([newDate]) => {
                              vSetValidationModal.setFieldValue(
                                'rencanaOperasi',
                                newDate.toISOString()
                              )
                            }}
                          />
                          {vSetValidationModal.touched?.rencanaOperasi &&
                            !!vSetValidationModal.errors.rencanaOperasi && (
                              <FormFeedback type="invalid">
                                <div>
                                  {vSetValidationModal.errors.rencanaOperasi}
                                </div>
                              </FormFeedback>
                            )}
                        </Col>
                        <Col lg={4}>
                          <div className="form-check ms-2">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="formCheckCito"
                              onChange={(value) =>
                                vSetValidationModal.setFieldValue(
                                  'formCheckCito',
                                  value.target.checked
                                )
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="formCheckCito"
                              style={{ color: 'black' }}
                            >
                              Cito
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Nama Operasi</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <Input
                        id="namaOperasi"
                        name="namaOperasi"
                        type="text"
                        value={vSetValidationModal.values.namaOperasi}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'namaOperasi',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.namaOperasi &&
                          !!vSetValidationModal.errors?.namaOperasi
                        }
                      />
                      {vSetValidationModal.touched?.namaOperasi &&
                        !!vSetValidationModal.errors.namaOperasi && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.namaOperasi}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Dokter Operator</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <CustomSelect
                        id="drOperator"
                        name="drOperator"
                        options={dataComboOperasi.pegawai}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'drOperator',
                            e?.value || ''
                          )
                        }}
                        value={vSetValidationModal.values.drOperator}
                        className={`input row-header ${
                          !!vSetValidationModal?.errors.drOperator
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {vSetValidationModal.touched.drOperator &&
                        !!vSetValidationModal.errors.drOperator && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.drOperator}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Jenis Operasi</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <CustomSelect
                        id="jenisOperasi"
                        name="jenisOperasi"
                        options={dataComboOperasi.jenisoperasi}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'jenisOperasi',
                            e?.value || ''
                          )
                        }}
                        value={vSetValidationModal.values.jenisOperasi}
                        className={`input row-header ${
                          !!vSetValidationModal?.errors.jenisOperasi
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {vSetValidationModal.touched.jenisOperasi &&
                        !!vSetValidationModal.errors.jenisOperasi && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.jenisOperasi}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Kamar Operasi</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <CustomSelect
                        id="kamarOperasi"
                        name="kamarOperasi"
                        options={dataComboOperasi.kamaroperasi}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'kamarOperasi',
                            e?.value || ''
                          )
                        }}
                        value={vSetValidationModal.values.kamarOperasi}
                        className={`input row-header ${
                          !!vSetValidationModal?.errors.kamarOperasi
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {vSetValidationModal.touched.kamarOperasi &&
                        !!vSetValidationModal.errors.kamarOperasi && (
                          <FormFeedback type="invalid">
                            <div>{vSetValidationModal.errors.kamarOperasi}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={4}>
                      <div className="mt-2">
                        <Label className="form-label">Catatan Verifikasi</Label>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <Input
                        id="catatanVerifikasi"
                        name="catatanVerifikasi"
                        type="textarea"
                        value={vSetValidationModal.values.catatanVerifikasi}
                        onChange={(e) => {
                          vSetValidationModal.setFieldValue(
                            'catatanVerifikasi',
                            e.target.value
                          )
                        }}
                        invalid={
                          vSetValidationModal.touched?.catatanVerifikasi &&
                          !!vSetValidationModal.errors?.catatanVerifikasi
                        }
                      />
                      {vSetValidationModal.touched?.catatanVerifikasi &&
                        !!vSetValidationModal.errors.catatanVerifikasi && (
                          <FormFeedback type="invalid">
                            <div>
                              {vSetValidationModal.errors.catatanVerifikasi}
                            </div>
                          </FormFeedback>
                        )}
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} className="mr-3 me-3 mt-2">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <Button type="submit" color="success">
                      Simpan
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      onClick={() => {
                        toggle()
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default withRouter(DaftarOrderOperasi)
