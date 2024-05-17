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
  FormFeedback,
  Form,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import Flatpickr from 'react-flatpickr'
import CustomSelect from '../../Select/Select'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import CountUp from 'react-countup'
import {
  widgetdaftarOrderRadiologiGet,
  radiologiResetForm,
  listdaftarOrderRadiologiGet,
  deleteOrderPelayanan,
} from '../../../store/actions'
import userDummy from '../../../assets/images/users/user-dummy-img.jpg'
import DetailOrderModalPatologi from '../DetailOrderPatologiModal/DetailOrderPatologiModal'
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom'
import LoadingTable from '../../../Components/Table/LoadingTable'
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'

const DaftarOrderPatologi = () => {
  document.title = 'Daftar Order Radiologi'
  const dispatch = useDispatch()
  const {
    data,
    datawidget,
    loading,
    error,
    deleteOrder,
    successOrder,
    loadingOrder,
  } = useSelector((state) => ({
    data: state.Radiologi.listdaftarOrderRadiologiGet.data,
    loading: state.Radiologi.listdaftarOrderRadiologiGet.loading,
    error: state.Radiologi.listdaftarOrderRadiologiGet.error,
    datawidget: state.Radiologi.widgetdaftarOrderRadiologiGet.data,
    deleteOrder: state.Radiologi.deleteOrderPelayanan.newData,
    successOrder: state.Radiologi.deleteOrderPelayanan.success,
    loadingOrder: state.Radiologi.deleteOrderPelayanan.loading,
  }))
  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(widgetdaftarOrderRadiologiGet(''))
    dispatch(listdaftarOrderRadiologiGet(''))
  }, [dispatch])
  const handleClickCard = (e) => {
    setidPencarian(e.id)
    setnamaPencarian(e.label)
    if (e.id === 1) {
      dispatch(
        listdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=1`
        )
      )
      dispatch(
        widgetdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=1`
        )
      )
    } else if (e.id === 2) {
      dispatch(
        listdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=2`
        )
      )
      dispatch(
        widgetdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=2`
        )
      )
    } else if (e.id === 3) {
      dispatch(
        listdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=3`
        )
      )
      dispatch(
        widgetdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=3`
        )
      )
    }
  }
  const current = new Date()
  const [dateStart, setdateStart] = useState(
    `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  )
  const [dateEnd, setdateEnd] = useState(
    `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  )
  const [search, setSearch] = useState('')
  const handleBeginOnChangeStart = (newBeginValue) => {
    var dateString = new Date(
      newBeginValue.getTime() - newBeginValue.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0]
    setdateStart(dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    var dateString = new Date(
      newBeginValue.getTime() - newBeginValue.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0]
    setdateEnd(dateString)
  }
  const [idPencarian, setidPencarian] = useState(1)
  const [namaPencarian, setnamaPencarian] = useState('Belum Verif')
  const handleClickCari = () => {
    dispatch(
      listdaftarOrderRadiologiGet(
        `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`
      )
    )
    dispatch(
      widgetdaftarOrderRadiologiGet(
        `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`
      )
    )
  }
  const handleFilter = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        listdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`
        )
      )
      dispatch(
        widgetdaftarOrderRadiologiGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`
        )
      )
    }
  }
  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const handleClick = (e) => {
    setUserChosen({
      profile: e.profile,
      nama: e.namapasien,
    })
  }

  const [detailModal, setdetailModal] = useState(false)
  const [tempNorecOrder, settempNorecOrder] = useState('')
  const clickDetail = (e) => {
    // let tempValue = {
    //     idpencarian: 4,
    //     norectrm: e.norectrm
    // }
    // console.log(tempValue)
    if (e.statusverif === 'DIVERIF') {
      toast.error('Order Sudah Diverifikasi', { autoClose: 3000 })
      return
    } else if (e.statusverif === 'DITOLAK') {
      toast.error('Order Sudah Ditolak', { autoClose: 3000 })
      return
    }
    settempNorecOrder(e.norec)
    setdetailModal(true)
  }
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <Link
              to="#"
              onClick={() => {
                clickDetail(data)
              }}
              className="text-danger fs-15"
            >
              <i className="ri-apps-2-line"></i>
            </Link>
          </div>
        )
      },
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Order</span>,
      selector: (row) => row.tglinput,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Dokter Order</span>,
      selector: (row) => row.namalengkap,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Keterangan</span>,
      selector: (row) => row.keterangan,
      sortable: true,
      // width: "250px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) => row.statusverif,
      sortable: true,
      // width: "250px",
    },
  ]
  const handleSimpan = () => {
    // if (product) {
    setdetailModal(false)
    // }
  }
  const [deleteModal, setDeleteModal] = useState(false)

  const handleTolak = () => {
    // if (product) {
    setdetailModal(false)
    setDeleteModal(true)
    // }
  }
  const handleDeleteOrder = () => {
    if (tempNorecOrder) {
      let tempValue = {
        norec: tempNorecOrder,
      }
      dispatch(deleteOrderPelayanan(tempValue))
      setDeleteModal(false)
    }
  }
  return (
    <React.Fragment>
      <DetailOrderModalPatologi
        show={detailModal}
        onSimpanClick={handleSimpan}
        onCloseClick={() => setdetailModal(false)}
        tempNorec={tempNorecOrder}
        onTolakClick={handleTolak}
      />
      <DeleteModalCustom
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
        msgHDelete="Apa Kamu Yakin ?"
        msgBDelete="Yakin ingin menolak Order Ini?"
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daftar Order Radiologi" pageTitle="Forms" />
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
                              // suffix={item.suffix}
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
                  <div
                    className="card-footer p-2"
                    style={{ backgroundColor: '#FFCB46' }}
                  >
                    <div className="text-center">
                      <Link
                        to="#"
                        className="link-light"
                        onClick={() => handleClickCard(item)}
                      >
                        View{' '}
                        <i className="ri-arrow-right-s-line align-middle lh-1"></i>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}

            <Col lg={3}>
              <Card>
                <CardBody>
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
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardHeader
                  style={{
                    backgroundColor: '#FFCB46',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    padding: '10px 15px',
                  }}
                >
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>
                    Daftar Order Radiologi
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="mb-2">
                    <Row>
                      <Col sm={4}>
                        <KontainerFlatpickr
                          options={{
                            // mode: "range",
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={dateStart}
                          onChange={([dateStart]) => {
                            handleBeginOnChangeStart(dateStart)
                          }}
                        />
                      </Col>
                      <Col lg={1}>
                        <h4 className="mt-2">s/d</h4>
                      </Col>
                      <Col sm={4}>
                        <KontainerFlatpickr
                          options={{
                            // mode: "range",
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={dateEnd}
                          onChange={([dateEnd]) => {
                            handleBeginOnChangeEnd(dateEnd)
                          }}
                        />
                      </Col>
                      <Col lg={2}>
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                              onChange={(event) =>
                                setSearch(event.target.value)
                              }
                              onKeyDown={handleFilter}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}>
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
                  </div>

                  <div id="table-gridjs">
                    {/* <Col className="col-sm">
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col> */}
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="700px"
                      columns={columns}
                      pagination
                      data={data}
                      progressPending={loading}
                      customStyles={tableCustomStyles}
                      onRowClicked={(row) => handleClick(row)}
                      pointerOnHover
                      highlightOnHover
                      progressComponent={<LoadingTable />}
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

export default DaftarOrderPatologi
