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
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import {
  daftarPasienRadiologi,
  radiologiResetForm,
} from '../../../store/actions'
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
import { useSelectorRoot } from '../../../store/reducers'
import patologiAPI from 'sharedjs/src/patologi/patologiAPI'
import { getDaftarPasienPatologi } from '../../../store/patologi/patologiSlice'
import { dateTimeLocal } from '../../../utils/format'
import SearchInput from '../../../Components/Common/CustomInput/SearchInput'

const DaftarPasienPatologi = () => {
  document.title = 'Daftar Order Patologi'
  const dispatch = useDispatch()
  const { dataPasien, loadingPasien } = useSelectorRoot((state) => ({
    dataPasien: state.patologiSlice.getDaftarPasienPatologi.data.listPasien,
    loadingPasien: state.patologiSlice.getDaftarPasienPatologi.loading,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm())
    }
  }, [dispatch])

  const vSearch = useFormik({
    initialValues: patologiAPI.qGetDaftarPasienPatologi(dateNow),
    onSubmit: (values) => {
      dispatch(getDaftarPasienPatologi(values))
    },
  })
  useEffect(() => {
    const submit = vSearch.handleSubmit
    submit()
  }, [dispatch, vSearch.handleSubmit])

  const handleBeginOnChangeStart = (newBeginValue) => {
    var dateString = new Date(newBeginValue).toISOString()
    vSearch.setFieldValue('start', dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    var dateString = new Date(newBeginValue).toISOString()
    vSearch.setFieldValue('end', dateString)
  }
  const handleClickCari = (e) => {
    vSearch.handleSubmit(e)
  }
  const handleFilter = (e) => {
    if (e.keyCode === 13) {
      vSearch.handleSubmit(e)
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

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (data) => {
        return (
          <Link
            to={`/patologi/transaksi/${data.norecdp}/${data.norecta}`}
            className="link-success fs-15"
            id="tooltipTop"
          >
            <i className="ri-edit-2-line"></i>
          </Link>
        )
      },
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      selector: (row) => dateTimeLocal(row.tglregistrasi),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Rm</span>,
      selector: (row) => row.nocm,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Asal</span>,
      selector: (row) => row.unitasal,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      selector: (row) => row.jenispenjamin,
      sortable: true,
      // width: "250px",
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Pulang</span>,
      selector: (row) => dateTimeLocal(row.tglpulang),
      sortable: true,
      // width: "250px",
    },
  ]
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daftar Pasien Patologi" pageTitle="Forms" />
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
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <KontainerFlatpickr
                        options={{
                          // mode: "range",
                          dateFormat: 'Y-m-d',
                          defaultDate: 'today',
                        }}
                        value={vSearch.values.start}
                        onChange={([dateStart]) => {
                          handleBeginOnChangeStart(dateStart)
                        }}
                      />
                    </Col>
                    <Col lg={1} className="mt-2">
                      <h4>s/d</h4>
                    </Col>
                    <Col sm={4}>
                      <KontainerFlatpickr
                        options={{
                          // mode: "range",
                          dateFormat: 'Y-m-d',
                          defaultDate: 'today',
                        }}
                        value={vSearch.values.end}
                        onChange={([dateEnd]) => {
                          handleBeginOnChangeEnd(dateEnd)
                        }}
                      />
                    </Col>
                    <Col lg={2}>
                      <SearchInput
                        type="text"
                        className="form-control search"
                        placeholder="Search..."
                        onChange={(event) =>
                          vSearch.setFieldValue(
                            'noregistrasi',
                            event.target.value
                          )
                        }
                        onKeyDown={handleFilter}
                      />
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
                  <Row>
                    <div id="table-gridjs">
                      <DataTable
                        fixedHeader
                        fixedHeaderScrollHeight="700px"
                        columns={columns}
                        pagination
                        data={dataPasien}
                        progressPending={loadingPasien}
                        customStyles={tableCustomStyles}
                        onRowClicked={(row) => handleClick(row)}
                        pointerOnHover
                        highlightOnHover
                        progressComponent={<LoadingTable />}
                      />
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DaftarPasienPatologi
