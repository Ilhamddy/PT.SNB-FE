import React, { useEffect, useState, useCallback } from 'react'
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
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import withRouter from '../../Components/Common/withRouter'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import UiContent from '../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CountUp from 'react-countup'
import userDummy from '../../assets/images/users/user-dummy-img.jpg'
import {
  daftarPasienResetForm,
  daftarPasienRegistrasiGet,
  widgetdaftarPasienRegistrasiGet,
} from '../../store/actions'
import { comboRegistrasiGet } from '../../store/master/action'
import CustomSelect from '../Select/Select'
import './AddObatFarmasi.scss'
import LoadingTable from '../../Components/Table/LoadingTable'
import BatalRegistrasi from '../../Components/Common/BatalRegistrasi'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import pria from '../../assets/images/svg/pria.svg'
import baby from '../../assets/images/svg/baby.svg'
import anaklaki from '../../assets/images/svg/anaklaki.svg'
import kakek from '../../assets/images/svg/kakek.svg'
import nenek from '../../assets/images/svg/nenek.svg'
import anakperempuan from '../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../assets/images/svg/dewasaperempuan.svg'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const AddObatFarmasi = () => {
  document.title = 'Daftar Pasien Farmasi'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, loading, error, dataCombo, loadingCombo, errorCombo } =
    useSelector((state) => ({
      data: state.DaftarPasien.daftarPasienRegistrasiGet.data,
      loading: state.DaftarPasien.daftarPasienRegistrasiGet.loading,
    }))

  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const current = new Date()
  const [dateNow] = useState(() => new Date().toISOString())
  const [dateStart, setdateStart] = useState(() => new Date().toISOString())
  const [dateEnd, setdateEnd] = useState(() => new Date().toISOString())

  const [search, setSearch] = useState('')
  const handleBeginOnChangeStart = (newBeginValue) => {
    let dateString = newBeginValue.toISOString()
    setdateStart(dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    let dateString = newBeginValue.toISOString()
    setdateEnd(dateString)
  }
  const handleClickCari = () => {
    dispatch(
      daftarPasienRegistrasiGet(`${search}&start=${dateStart}&end=${dateEnd}`)
    )
  }
  const handleFilter = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        daftarPasienRegistrasiGet(`${search}&start=${dateStart}&end=${dateEnd}`)
      )
    }
  }
  useEffect(() => {
    dispatch(daftarPasienRegistrasiGet(`${''}&start=${dateNow}&end=${dateNow}`))
  }, [dispatch, dateNow])
  useEffect(() => {
    return () => {
      dispatch(daftarPasienResetForm())
    }
  }, [dispatch])
  const handleClickRM = (row) => {
    setUserChosen({
      nama: row.namapasien,
      id: row.noidentitas,
      profile: row.profile,
    })
  }
  const [tempNorecDp, settempNorecDp] = useState('')
  const [batalModal, setbatalModal] = useState(false)
  const handleToAddObat = async (norecdp) => {
    navigate(`/farmasi/list-verif-obat/${norecdp}`)
  }
  const handleToCloseBatalModal = async () => {
    setbatalModal(false)
    handleClickCari()
  }
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
                <DropdownItem onClick={() => handleToAddObat(row.norecdp)}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Tambahkan Obat
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
      // cell: (data) => {
      //     return (
      //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
      //         <button className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>View</button>
      //     );
      // },
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
      <ToastContainer closeButton={false} />
      <BatalRegistrasi
        show={batalModal}
        onSimpanClick={() => setbatalModal(false)}
        onCloseClick={() => handleToCloseBatalModal()}
        tempNorecDp={tempNorecDp}
      />
      <UiContent />
      <div className="page-content daftar-pasien-registrasi">
        <Container fluid>
          <BreadCrumb title="Daftar Pasien Farmasi" pageTitle="Forms" />
          <Row>
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
                    <p className="text-muted mb-0">{userChosen.id}</p>
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
                    Daftar Pasien Farmasi
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="mb-2">
                    <Row className="g-3">
                      <Col lg={12}>
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
                            <h4 className="mt-1">s/d</h4>
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
                              placement="top"
                              id="tooltipTopPencarian"
                              onClick={handleClickCari}
                              color="info"
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

export default withRouter(AddObatFarmasi)
