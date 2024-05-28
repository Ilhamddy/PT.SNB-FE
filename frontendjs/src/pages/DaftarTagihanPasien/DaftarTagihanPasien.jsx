import { useFormik } from 'formik'
import userDummy from '../../assets/images/users/user-dummy-img.jpg'
import { ToastContainer, toast } from 'react-toastify'
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
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import * as Yup from 'yup'
import classnames from 'classnames'
import { Link } from 'feather-icons-react/build/IconComponents'
import { useDispatch, useSelector } from 'react-redux'
import { daftarPasienPulangGet } from '../../store/daftarPasien/action'
import DataTable from 'react-data-table-component'
import { dateTimeLocal } from '../../utils/format'
import Flatpickr from 'react-flatpickr'
import { comboAsuransiGet, comboRegistrasiGet } from '../../store/master/action'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  buktiBayarCancel,
  daftarTagihanPasienGet,
  verifNotaCancel,
} from '../../store/payment/action'
import LoadingTable from '../../Components/Table/LoadingTable'
import pria from '../../assets/images/svg/pria.svg'
import baby from '../../assets/images/svg/baby.svg'
import anaklaki from '../../assets/images/svg/anaklaki.svg'
import kakek from '../../assets/images/svg/kakek.svg'
import nenek from '../../assets/images/svg/nenek.svg'
import anakperempuan from '../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../assets/images/svg/dewasaperempuan.svg'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomInput from '../../Components/Common/CustomInput/CustomInput'

const DaftarTagihanPasien = () => {
  const { dataTagihan, comboboxReg } = useSelector((state) => ({
    dataTagihan: state.Payment.daftarTagihanPasienGet || [],
  }))

  const [dateNow] = useState(() => new Date().toISOString())
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      datestart: dateNow,
      dateend: dateNow,
      namapasien: '',
    },
    onSubmit: (values) => {
      dispatch(daftarTagihanPasienGet(values))
    },
  })

  useEffect(() => {
    dispatch(daftarTagihanPasienGet(validation.initialValues))
  }, [dispatch, validation.initialValues])

  const handleFilter = () => {
    // dispatch(daftarPasienPulangGet(dateStart, dateEnd))
  }
  const handleClickCari = (e) => {
    setSearchParams(validation.values)
    validation.handleSubmit(e)
  }
  const handleToBayar = async (norecnota) => {
    norecnota && navigate(`/payment/bayar/${norecnota}`)
  }
  const handleCancelVerif = (norecnota, norecdp) => {
    norecnota &&
      dispatch(
        verifNotaCancel(norecnota, norecdp, () =>
          dispatch(daftarTagihanPasienGet())
        )
      )
  }
  const handleCancelBayar = (row) => {
    if (row.jmlpiutangbayar > 0) {
      toast.error('Tidak bisa cancel, karena ada piutang terbayarkan', {
        autoclose: 3000,
      })
    } else {
      row.norecbukti &&
        row.norecnota &&
        dispatch(
          buktiBayarCancel(row.norecnota, row.norecbukti, () =>
            dispatch(daftarTagihanPasienGet())
          )
        )
    }
  }
  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const handleClickUser = (row) => {
    setUserChosen({
      nama: row.namapasien,
      id: row.noidentitas,
      profile: row.profile,
    })
  }

  useEffect(() => {
    const setFF = validation.setFieldValue
    const submit = validation.handleSubmit
    setFF('datestart', searchParams.get('datestart') || dateNow)
    setFF('dateend', searchParams.get('dateend') || dateNow)
    setFF('namapasien', searchParams.get('namapasien') || '')
    submit()
  }, [validation.setFieldValue, validation.handleSubmit, searchParams, dateNow])
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (row) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledTooltip placement="top" target="tooltipTop2">
              {' '}
              Detail Tagihan{' '}
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
                {!row.norecbukti && (
                  <DropdownItem onClick={() => handleToBayar(row.norecnota)}>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Bayar
                  </DropdownItem>
                )}
                {!row.norecbukti && (
                  <DropdownItem
                    onClick={() =>
                      handleCancelVerif(row.norecnota, row.norecdp)
                    }
                  >
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Batal Verif
                  </DropdownItem>
                )}
                {row.norecbukti && (
                  <>
                    <DropdownItem onClick={() => handleCancelBayar(row)}>
                      <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                      Batal Bayar
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        navigate(
                          `/payment/bayar/${row.norecnota}/${row.norecbukti}`
                        )
                      }
                    >
                      <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                      Lihat Pembayaran
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      },
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      selector: (row) => dateTimeLocal(new Date(row.tglregistrasi)),
      sortable: true,
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      // selector: row => row.noregistrasi,
      sortable: true,
      selector: (row) => (
        <button
          className="btn btn-sm btn-soft-info"
          onClick={() => handleClickUser(row)}
        >
          {row.noregistrasi}
        </button>
      ),
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. RM</span>,
      selector: (row) => row.nocmfk,
      sortable: true,
      width: '60px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '120px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      selector: (row) => row.namarekanan,
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Pulang</span>,
      selector: (row) => dateTimeLocal(new Date(row.tglpulang)),
      sortable: true,
      width: '160px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => `Rp${row.total?.toLocaleString('id-ID') || 0}`,
      sortable: true,
      width: '140px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) =>
        row.nobukti === null
          ? 'Blm Bayar'
          : row.totalbayar === row.totaltagihan
          ? 'Lunas'
          : 'Bayar Sebagian',
      sortable: true,
      width: '160px',
      wrap: true,
    },
  ]
  const [pillsTab, setpillsTab] = useState('1')
  return (
    <div className="page-content daftar-pasien-pulang">
      <Container fluid>
        <BreadCrumb
          title="Daftar Tagihan Pasien"
          pageTitle="Daftar Tagihan Pasien"
        />
        <Row>
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
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={9}>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                return false
              }}
              className="gy-4"
              action="#"
            ></Form>
            <Card>
              <CardBody>
                <Row className="row-header mb-2 ">
                  <Col sm={3}>
                    <KontainerFlatpickr
                      options={{
                        // mode: "range",
                        dateFormat: 'Y-m-d',
                        defaultDate: 'today',
                      }}
                      value={validation.values.datestart}
                      onChange={([datestart]) => {
                        validation.setFieldValue(
                          'datestart',
                          datestart.toISOString()
                        )
                      }}
                    />
                  </Col>
                  <Col sm={1}>
                    <h4 className="mt-2">s/d</h4>
                  </Col>
                  <Col sm={3}>
                    <KontainerFlatpickr
                      options={{
                        // mode: "range",
                        dateFormat: 'Y-m-d',
                        defaultDate: 'today',
                      }}
                      value={validation.values.dateend}
                      onChange={([dateend]) => {
                        validation.setFieldValue(
                          'dateend',
                          dateend.toISOString()
                        )
                      }}
                    />
                  </Col>
                  <Col sm={3}>
                    <CustomInput
                      id="namapasien"
                      name="namapasien"
                      type="text"
                      placeholder="Nama Pasien/No CM"
                      value={validation.values.namapasien}
                      onChange={(e) => {
                        validation.setFieldValue('namapasien', e.target.value)
                      }}
                      invalid={
                        validation.touched?.namapasien &&
                        !!validation.errors?.namapasien
                      }
                    />
                    {validation.touched?.namapasien &&
                      !!validation.errors.namapasien && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.namapasien}</div>
                        </FormFeedback>
                      )}
                  </Col>
                  <Col lg={1}>
                    <Button
                      type="button"
                      color="info"
                      placement="top"
                      id="tooltipTopPencarian"
                      onClick={handleClickCari}
                    >
                      Cari
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
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="700px"
                  columns={columns}
                  pagination
                  data={dataTagihan?.data || []}
                  progressPending={dataTagihan?.loading || false}
                  customStyles={tableCustomStyles}
                  progressComponent={<LoadingTable />}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DaftarTagihanPasien
