import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Label,
  Input,
  Table,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  FormFeedback,
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import withRouter from '../../../Components/Common/withRouter'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CountUp from 'react-countup'
import {
  daftarPasienResetForm,
  daftarPasienRegistrasiGet,
  widgetdaftarPasienRegistrasiGet,
} from '../../../store/actions'
import { comboRegistrasiGet } from '../../../store/master/action'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import './DaftarPasienRegistrasi.scss'
import LoadingTable from '../../../Components/Table/LoadingTable'
import BatalRegistrasi from '../../../Components/Common/BatalRegistrasi'
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import MergeNoRegistrasi from '../../../Components/Common/MergeNoRegistrasi'
import PenunjangModal from './PenunjangModal'
import { useSelectorRoot } from '../../../store/reducers'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ColLabelInput from '../../../Components/ColLabelInput/ColLabelInput'
import daftarPasienAPI from 'sharedjs/src/daftarPasien/daftarPasienAPI'
import {
  getComboDaftarPasienRegistrasi,
  getDaftarPasienRegistrasi,
} from '../../../store/daftarPasien/daftarPasienSlice'
import SearchInput from '../../../Components/Common/CustomInput/SearchInput'

const DaftarPasienRegistrasi = () => {
  document.title = 'Daftar Pasien Rawat Jalan'
  const dispatch = useDispatch()
  const history = useNavigate()
  const { data, loading, datawidget } = useSelectorRoot((state) => ({
    data: state.daftarPasienSlice.getDaftarPasienRegistrasi.data.pasien,
    datawidget: state.DaftarPasien.widgetdaftarPasienRegistrasiGet.data,
    loading: state.daftarPasienSlice.getDaftarPasienRegistrasi.loading,
  }))

  const { instalasi, unit, statuspulang, statuspulangri } = useSelectorRoot(
    (state) => state.daftarPasienSlice.getComboDaftarPasienRegistrasi.data
  )

  const refPenunjangModal = useRef()

  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const [dateNow] = useState(() => new Date().toISOString())
  const vSearch = useFormik({
    initialValues: daftarPasienAPI.qGetDaftarPasienRegistrasi(dateNow),
    onSubmit: (values) => {
      dispatch(getDaftarPasienRegistrasi(values))
    },
  })

  const [search, setSearch] = useState('')

  const handleBeginOnChangeStart = (newBeginValue) => {
    let dateString = newBeginValue?.toISOString() || ''
    vSearch.setFieldValue('start', dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    let dateString = newBeginValue?.toISOString() || ''
    vSearch.setFieldValue('end', dateString)
  }
  const handleClickCari = () => {
    vSearch.handleSubmit()
  }
  const handleFilter = (e) => {
    if (e.keyCode === 13) {
      vSearch.handleSubmit()
    }
  }

  const handleClickRM = (row) => {
    setUserChosen({
      nama: row.namapasien,
      id: row.noidentitas,
      profile: row.profile,
    })
  }
  const [tempNorecDp, settempNorecDp] = useState('')
  const [tempNorecDpMerge, settempNorecDpMerge] = useState({
    norec: '',
    noregistrasi: '',
  })

  const [batalModal, setbatalModal] = useState(false)
  const handleToCancel = async (norecdp) => {
    settempNorecDp(norecdp)
    setbatalModal(true)
  }
  const handleToCloseBatalModal = async () => {
    setbatalModal(false)
    handleClickCari()
  }
  const handleToMergeNoregistrasi = async (row) => {
    settempNorecDpMerge({
      norec: row.norecdp,
      noregistrasi: row.noregistrasi,
    })
  }
  const handleOpenPenunjang = (row) => {
    refPenunjangModal.current && refPenunjangModal.current.changeDp(row.norecdp)
  }

  useEffect(() => {
    dispatch(widgetdaftarPasienRegistrasiGet(''))
    const submit = vSearch.handleSubmit
    submit()
  }, [dispatch, vSearch.handleSubmit])
  useEffect(() => {
    dispatch(getComboDaftarPasienRegistrasi())
    return () => {
      dispatch(daftarPasienResetForm())
    }
  }, [dispatch])

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (row) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledTooltip placement="top" target="tooltipTop2">
              {' '}
              Pengkajian Pasien{' '}
            </UncontrolledTooltip>
            <UncontrolledDropdown className="dropdown d-inline-block">
              <DropdownToggle
                className="btn btn-soft-secondary btn-sm"
                tag="button"
                id="tooltipTop2"
              >
                <i className="ri-apps-2-line"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem onClick={() => handleToCancel(row.norecdp)}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Batal Registrasi
                </DropdownItem>
                <DropdownItem onClick={() => handleToMergeNoregistrasi(row)}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Merge No. Registrasi
                </DropdownItem>

                <Link
                  to={`/registrasi/pasien-ruangan/${row.idpasien}/${row.norecdp}`}
                >
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Edit Registrasi
                  </DropdownItem>
                </Link>
                <DropdownItem onClick={() => handleOpenPenunjang(row)}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Antrean Penunjang
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      },
      width: '70px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      selector: (row) => row.tglregistrasi,
      sortable: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      // selector: row => row.noregistrasi,
      sortable: true,
      selector: (row) => (
        <button
          className="btn btn-sm btn-soft-info"
          onClick={() => handleClickRM(row)}
        >
          {row.noregistrasi}
        </button>
      ),
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. RM</span>,
      selector: (row) => row.nocm,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">DPJP Tujuan</span>,
      selector: (row) => row.namadokter,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Pasien</span>,
      selector: (row) => row.jenispenjamin,
      sortable: true,
    },
  ]
  return (
    <React.Fragment>
      <PenunjangModal ref={refPenunjangModal} />
      <BatalRegistrasi
        show={batalModal}
        onSimpanClick={() => setbatalModal(false)}
        onCloseClick={() => handleToCloseBatalModal()}
        tempNorecDp={tempNorecDp}
      />
      <MergeNoRegistrasi
        show={!!tempNorecDpMerge.norec}
        onCloseClick={() =>
          settempNorecDpMerge({
            norec: '',
            noregistrasi: '',
          })
        }
        tempNorecDp={tempNorecDpMerge}
      />
      <UiContent />
      <div className="page-content daftar-pasien-registrasi">
        <Container fluid>
          <BreadCrumb title="Daftar Pasien Registrasi" pageTitle="Forms" />

          <Row>
            {datawidget.map((item, key) => (
              <Col xxl={4} sm={6} key={key}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">
                          Total Pasien {item.label}
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
                            <img src={item.icon} alt="" className="avatar-md" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
            <Col lg={3}>
              <Card>
                <CardBody>
                  <h5 className="card-title mb-5">Profile Pasien</h5>
                  <div className="text-center">
                    {userChosen?.profile === 'baby' ? (
                      <img
                        src={baby}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'dewasalaki' ? (
                      <img
                        src={pria}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'anaklaki' ? (
                      <img
                        src={anaklaki}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'anakperempuan' ? (
                      <img
                        src={anakperempuan}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'dewasaperempuan' ? (
                      <img
                        src={dewasaperempuan}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'kakek' ? (
                      <img
                        src={kakek}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'nenek' ? (
                      <img
                        src={nenek}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : (
                      // Render when none of the conditions are met
                      <p>No profile image available</p>
                    )}
                    <h5 className="fs-17 mb-1">{userChosen.nama}</h5>
                    <p className="text-muted mb-0">{userChosen.id}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>
                    Daftar Pasien Registrasi
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="mb-2">
                    <Row className="g-3">
                      <Col lg={12}>
                        <Row>
                          <Col lg={4}>
                            <KontainerFlatpickr
                              options={{
                                dateFormat: 'Y-m-d',
                                defaultDate: 'today',
                              }}
                              value={vSearch.values.start}
                              onChange={([dateStart]) => {
                                handleBeginOnChangeStart(dateStart)
                              }}
                            />
                          </Col>
                          <Col
                            lg={1}
                            className="text-center align-items-center"
                          >
                            <h6 className="mt-2">S/D</h6>
                          </Col>
                          <Col lg={4}>
                            <KontainerFlatpickr
                              options={{
                                dateFormat: 'Y-m-d',
                                defaultDate: 'today',
                              }}
                              value={vSearch.values.end}
                              onChange={([dateEnd]) => {
                                handleBeginOnChangeEnd(dateEnd)
                              }}
                            />
                          </Col>
                          <Col lg={3}>
                            <CustomSelect
                              id="instalasi"
                              name="instalasi"
                              placeholder="Instalasi"
                              options={instalasi}
                              onChange={(e) => {
                                vSearch.setFieldValue(
                                  'instalasi',
                                  e?.value || null
                                )
                              }}
                              value={vSearch.values.instalasi}
                              onBlur={vSearch.handleBlur}
                              className={`input row-header ${
                                !!vSearch?.errors.instalasi ? 'is-invalid' : ''
                              }`}
                              isClearEmpty
                            />
                            {vSearch.touched.instalasi &&
                              !!vSearch.errors.instalasi && (
                                <FormFeedback type="invalid">
                                  <div>{vSearch.errors.instalasi}</div>
                                </FormFeedback>
                              )}
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col lg={3}>
                            <CustomSelect
                              id="unit"
                              name="unit"
                              placeholder="Unit"
                              options={unit.filter(
                                (u) =>
                                  u.objectinstalasifk ===
                                  vSearch.values.instalasi
                              )}
                              onChange={(e) => {
                                vSearch.setFieldValue('unit', e?.value || null)
                              }}
                              value={vSearch.values.unit}
                              onBlur={vSearch.handleBlur}
                              className={`input row-header ${
                                !!vSearch?.errors.unit ? 'is-invalid' : ''
                              }`}
                              isClearEmpty
                            />
                            {vSearch.touched.unit && !!vSearch.errors.unit && (
                              <FormFeedback type="invalid">
                                <div>{vSearch.errors.unit}</div>
                              </FormFeedback>
                            )}
                          </Col>
                          <Col lg={3}>
                            <CustomSelect
                              id="statuspulang"
                              name="statuspulang"
                              placeholder="Status Pulang"
                              options={
                                vSearch.values.instalasi === null
                                  ? []
                                  : vSearch.values.instalasi === 2
                                  ? statuspulangri
                                  : statuspulang
                              }
                              onChange={(e) => {
                                vSearch.setFieldValue(
                                  'statuspulang',
                                  e?.value || null
                                )
                              }}
                              value={vSearch.values.statuspulang}
                              onBlur={vSearch.handleBlur}
                              className={`input row-header ${
                                !!vSearch?.errors.statuspulang
                                  ? 'is-invalid'
                                  : ''
                              }`}
                              isClearEmpty
                            />
                            {vSearch.touched.statuspulang &&
                              !!vSearch.errors.statuspulang && (
                                <FormFeedback type="invalid">
                                  <div>{vSearch.errors.statuspulang}</div>
                                </FormFeedback>
                              )}
                          </Col>
                          <Col label="Cari" lg={3}>
                            <SearchInput
                              type="text"
                              className="form-control search"
                              placeholder="No RM/Nama pasien..."
                              value={vSearch.values.noregistrasi}
                              onChange={(event) =>
                                vSearch.setFieldValue(
                                  'noregistrasi',
                                  event.target.value
                                )
                              }
                              onKeyDown={handleFilter}
                            />
                          </Col>
                          <Col lg={'auto'} label="">
                            <Button
                              type="button"
                              color="info"
                              placement="top"
                              id="tooltipTopPencarian"
                              onClick={handleClickCari}
                            >
                              CARI
                            </Button>
                            <UncontrolledTooltip
                              placement="top"
                              target="tooltipTopPencarian"
                            >
                              {' '}
                              Pencarian{' '}
                            </UncontrolledTooltip>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="700px"
                      progressComponent={<LoadingTable />}
                      columns={columns}
                      pagination
                      data={data}
                      progressPending={loading}
                      customStyles={tableCustomStyles}
                    />
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

export default withRouter(DaftarPasienRegistrasi)
