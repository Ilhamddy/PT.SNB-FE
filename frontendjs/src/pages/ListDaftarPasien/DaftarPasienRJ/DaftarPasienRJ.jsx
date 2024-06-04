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
  FormFeedback,
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import withRouter from '../../../Components/Common/withRouter'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CountUp from 'react-countup'

import {
  daftarPasienRJGet,
  widgetdaftarPasienRJGet,
  updateTaskId,
  saveDokumenRekammedis,
  kendaliDokumenResetForm,
  upsertEncounter,
} from '../../../store/actions'

//import images
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'

import KonsulModal from '../../../Components/Common/KonsulModal'
import { comboRegistrasiGet } from '../../../store/master/action'
import StatusPulangModal from '../../../Components/Common/StatusPulangModal'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import './DaftarPasienRJ.scss'
import LoadingTable from '../../../Components/Table/LoadingTable'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { dateTimeLocal } from '../../../utils/format'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { getUserAccessUnit } from '../../../helpers/parse_menu'
import CustomInput from '../../../Components/Common/CustomInput/CustomInput'
import SearchInput from '../../../Components/Common/CustomInput/SearchInput'
AOS.init({
  easing: 'ease-out-back',
  duration: 3000,
  anchorPlacement: 'top-bottom',
})
const DaftarPasienRJ = () => {
  document.title = 'Daftar Pasien Rawat Jalan'
  const dispatch = useDispatch()
  const history = useNavigate()

  const {
    data,
    datawidget,
    loading,
    error,
    dataCombo,
    loadingCombo,
    errorCombo,
    successUpdateTaskId,
    newDataDokumen,
    successDokumen,
  } = useSelector((state) => ({
    data: state.DaftarPasien.daftarPasienRJGet.data,
    datawidget: state.DaftarPasien.widgetdaftarPasienRJGet.data,
    loading: state.DaftarPasien.daftarPasienRJGet.loading,
    error: state.DaftarPasien.daftarPasienRJGet.error,
    dataCombo: state.Master.comboRegistrasiGet.data,
    loadingCombo: state.Master.comboRegistrasiGet.loading,
    errorCombo: state.Master.comboRegistrasiGet.error,
    successUpdateTaskId: state.Emr.updateTaskId.success,
    newDataDokumen: state.KendaliDokumen.saveDokumenRekammedis.newData,
    successDokumen: state.KendaliDokumen.saveDokumenRekammedis.success,
  }))
  const vSetValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      unitFilter: [],
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      console.log(values)
    },
  })
  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const current = new Date()
  const [dateStart, setdateStart] = useState(
    `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  )
  const [dateEnd, setdateEnd] = useState(
    `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  )
  const [search, setSearch] = useState('')
  useEffect(() => {
    return () => {
      dispatch(kendaliDokumenResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(comboRegistrasiGet())
    let temp = getUserAccessUnit()
    setdataUnit(temp)
    const setFF = vSetValidation.setFieldValue
    setFF('unitFilter', temp)
  }, [dispatch, vSetValidation.setFieldValue])

  const clickCheckBox = (e) => {
    let tempValue = {
      idpencarian: 4,
      norectrm: e.norectrm,
      ihs_id: e.ihs_id,
      ihs_id_daftarpasien: e.ihs_id_daftarpasien,
      ihs_dpjp: e.ihs_dpjp,
      noregistrasi: e.noregistrasi,
      namapasien: e.namapasien,
      namadokter: e.namadokter,
      tglregistrasi_ihs: e.tglregistrasi_ihs,
      tglpulang_ihs: e.tglpulang_ihs,
      ihs_unit: e.ihs_unit,
      namaunit: e.namaunit,
      status: 'in-progress',
      norec: e.norecdp,
    }
    dispatch(saveDokumenRekammedis(tempValue))
  }
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      width: '100px',
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            {data.objectstatuskendalirmfkap === 1 ? (
              <>
                <Link
                  to="#"
                  onClick={() => {
                    clickCheckBox(data)
                  }}
                  className="text-danger fs-15"
                  id="tooltipTopDokumen"
                >
                  <i className="bx bx-check-circle"></i>
                </Link>
                <UncontrolledTooltip placement="top" target="tooltipTopDokumen">
                  {' '}
                  Belum Diterima{' '}
                </UncontrolledTooltip>
              </>
            ) : (
              <>
                <Link
                  to={`/emr-pasien/${data.norecdp}/${data.norecta}/rawat-jalan`}
                  className="link-success fs-15"
                  id="tooltipTop"
                >
                  <i className="ri-edit-2-line"></i>
                </Link>
                <UncontrolledTooltip placement="top" target="tooltipTop">
                  Pengkajian Pasien
                </UncontrolledTooltip>
              </>
            )}
            <UncontrolledDropdown className="dropdown d-inline-block">
              <DropdownToggle
                className="btn btn-soft-secondary btn-sm"
                tag="button"
                id="tooltipTop2"
              >
                <i className="ri-apps-2-line"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="#!" onClick={() => handleClickKonsul(data)}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Konsul Antar Unit
                </DropdownItem>
                <DropdownItem
                  href="#!"
                  onClick={() => handleClickPanggil(data)}
                >
                  <i className="ri-volume-up-fill align-bottom me-2 text-muted"></i>
                  Panggil
                </DropdownItem>
                <DropdownItem href="#!" onClick={() => handleClickPulang(data)}>
                  <i className="ri-run-line align-bottom me-2 text-muted"></i>
                  Pulang
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledTooltip placement="top" target="tooltipTop2">
              {' '}
              Menu{' '}
            </UncontrolledTooltip>
          </div>
        )
      },
    },
    {
      name: <span className="font-weight-bold fs-13">No Antrean</span>,
      selector: (row) => row.noantrian,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      selector: (row) => dateTimeLocal(row.tglregistrasi),
      sortable: true,
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      // selector: row => row.noregistrasi,
      sortable: true,
      selector: (row) => row.noregistrasi,
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
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Pasien</span>,
      selector: (row) => row.jenispenjamin,
      sortable: true,
      width: '120px',
    },
  ]

  const handleClickRM = (row) => {
    setUserChosen({
      nama: row.namapasien,
      id: row.noidentitas,
      profile: row.profile,
    })
  }
  const [idPencarian, setidPencarian] = useState(1)
  const [namaPencarian, setnamaPencarian] = useState('Belum Diperiksa')
  const handleClickCard = (e) => {
    setidPencarian(e.id)
    setnamaPencarian(e.label)
    if (e.id === 1) {
      dispatch(
        daftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=1&unit=${vSetValidation.values.unitFilter}`
        )
      )
      dispatch(
        widgetdaftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=1&unit=${vSetValidation.values.unitFilter}`
        )
      )
    } else if (e.id === 2) {
      dispatch(
        daftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=2&unit=${vSetValidation.values.unitFilter}`
        )
      )
      dispatch(
        widgetdaftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=2&unit=${vSetValidation.values.unitFilter}`
        )
      )
    } else if (e.id === 3) {
      dispatch(
        daftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=3&unit=${vSetValidation.values.unitFilter}`
        )
      )
      dispatch(
        widgetdaftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=3&unit=${vSetValidation.values.unitFilter}`
        )
      )
    }
  }

  const DisplayData = data.map((info, i) => {
    return (
      <tr key={i}>
        <td>{info.tglregistrasi}</td>
        <td>{info.noregistrasi}</td>
        <td>{info.nocm}</td>
        <td>{info.namapasien}</td>
        <td>{info.namaunit}</td>
        <td>{info.namadokter}</td>
        <td>{info.jenispenjamin}</td>
        <td>
          <div className="hstack gap-3 flex-wrap">
            <Link to="#" className="link-success fs-15">
              <i className="ri-edit-2-line"></i>
            </Link>
            <Link to="#" className="link-danger fs-15">
              <i className="ri-delete-bin-line"></i>
            </Link>
          </div>
        </td>
      </tr>
    )
  })
  const handleBeginOnChangeStart = (newBeginValue) => {
    var dateString = new Date(newBeginValue).toISOString()
    setdateStart(dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    var dateString = new Date(newBeginValue).toISOString()
    setdateEnd(dateString)
  }

  const handleClickCari = () => {
    let temp = vSetValidation.values.unitFilter
      .map((item) => item.value)
      .join(',')
    dispatch(
      daftarPasienRJGet(
        `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${temp}`
      )
    )
    dispatch(
      widgetdaftarPasienRJGet(
        `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${temp}`
      )
    )
  }

  const handleFilter = (e) => {
    if (e.keyCode === 13) {
      // console.log(search)
      // useEffect(() => {
      dispatch(
        daftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${vSetValidation.values.unitFilter}`
        )
      )
      dispatch(
        widgetdaftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${vSetValidation.values.unitFilter}`
        )
      )
      // }, [dispatch]);
    }
  }
  const [konsulModal, setkonsulModal] = useState(false)
  const [dataUnit, setdataUnit] = useState([])
  const [dataDokter, setdataDokter] = useState([])
  const [tempNorecAp, settempNorecAp] = useState('')
  const [tempNorecDp, settempNorecDp] = useState('')
  const handleClickKonsul = (e) => {
    setkonsulModal(true)
    // console.log(dataCombo.unit)
    var newArray = dataCombo.unit.filter(function (el) {
      return el.objectinstalasifk === 1
    })
    setdataUnit(newArray)
    setdataDokter(dataCombo.pegawai)
    settempNorecAp(e.norecta)
  }
  const handleClickPanggil = (e) => {
    let temp = {
      norec: e.norecta,
      taskid: 4,
      objectstatuspanggilfk: 2,
    }
    let tempx = vSetValidation.values.unitFilter
      .map((item) => item.value)
      .join(',')
    dispatch(
      updateTaskId(temp, () => {
        dispatch(
          daftarPasienRJGet(
            `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${tempx}`
          )
        )
        dispatch(
          widgetdaftarPasienRJGet(
            `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${tempx}`
          )
        )
      })
    )
  }
  const handleClickPulang = (e) => {
    setstatusPulangModal(true)
    settempNorecDp(e.norecdp)
    settempNorecAp(e.norecta)
  }
  const [statusPulangModal, setstatusPulangModal] = useState(false)
  const handleSimpanKonsul = () => {
    let tempx = vSetValidation.values.unitFilter
      .map((item) => item.value)
      .join(',')
    setkonsulModal(false)
    dispatch(
      daftarPasienRJGet(
        `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${tempx}`
      )
    )
    dispatch(
      widgetdaftarPasienRJGet(
        `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${tempx}`
      )
    )
  }
  useEffect(() => {
    let tempx = vSetValidation.values.unitFilter
      .map((item) => item.value)
      .join(',')
    if (newDataDokumen !== null) {
      dispatch(
        daftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${tempx}`
        )
      )
      dispatch(
        widgetdaftarPasienRJGet(
          `${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}&unit=${tempx}`
        )
      )
    }
  }, [
    newDataDokumen,
    search,
    dateStart,
    dateEnd,
    idPencarian,
    vSetValidation.values.unitFilter,
    dispatch,
  ])

  useEffect(() => {
    handleClickCari()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputUnit = (characterEntered) => {
    if (characterEntered.length > 3) {
      var newArray = dataCombo.unit.filter(function (el) {
        return el.objectinstalasifk === 1
      })
      setdataUnit(newArray)
    }
  }
  return (
    <React.Fragment>
      <KonsulModal
        show={konsulModal}
        onSimpanClick={handleSimpanKonsul}
        onCloseClick={() => setkonsulModal(false)}
        tempNorecAp={tempNorecAp}
        dataUnit={dataUnit}
        dataDokter={dataDokter}
      />
      <StatusPulangModal
        show={statusPulangModal}
        // onSimpanClick={handleSimpanKonsul}
        onCloseClick={() => setstatusPulangModal(false)}
        tempNorecDp={tempNorecDp}
        dataStatusPulang={dataCombo.statuspulang}
        tempNorecAp={tempNorecAp}
      />
      <UiContent />
      <div className="page-content daftar-pasien-rawat-jalan">
        <Container fluid>
          <BreadCrumb title="Daftar Pasien Rawat Jalan" pageTitle="Forms" />
          <Row>
            {datawidget.map((item, key) => (
              <Col xxl={4} sm={6} key={key}>
                <div data-aos="fade-up">
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
                              <img
                                src={item.icon}
                                alt=""
                                className="avatar-md"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                    <div
                      className="card-footer p-2"
                      style={{
                        backgroundColor: '#17a2b8',
                        borderRadius: '20px',
                      }}
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
                </div>
              </Col>
            ))}

            <Col lg={3}>
              <div data-aos="fade-up">
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
              </div>
            </Col>
            <Col lg={9}>
              <div data-aos="fade-up">
                <Card className="card-snb">
                  <CardHeader className="card-header-snb ">
                    <h4 className="card-title mb-0" style={{ color: 'black' }}>
                      Daftar Pasien Rawat Jalan{' '}
                      <span style={{ color: '#FFFFFF' }}>{namaPencarian}</span>
                    </h4>
                  </CardHeader>

                  <CardBody>
                    <div className="mb-2">
                      <Row className="g-3">
                        <Col lg={12}>
                          <Row>
                            <Col sm={3}>
                              <KontainerFlatpickr
                                options={{
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
                              <h4 className="mt-2 text-center">s/d</h4>
                            </Col>
                            <Col sm={3}>
                              <KontainerFlatpickr
                                isError={false}
                                options={{
                                  dateFormat: 'Y-m-d',
                                  defaultDate: 'today',
                                }}
                                value={dateEnd}
                                onChange={([dateEnd]) => {
                                  handleBeginOnChangeEnd(dateEnd)
                                }}
                              />
                            </Col>
                            <Col lg={4}>
                              <SearchInput
                                id="search"
                                name="search"
                                type="search"
                                value={search}
                                placeholder="Search..."
                                onChange={(e) => {
                                  setSearch(e.target.value)
                                }}
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
                            <Col sm={7} className="mt-2">
                              <CustomSelect
                                id="unitFilter"
                                name="unitFilter"
                                options={dataUnit || []}
                                onChange={(e) => {
                                  vSetValidation.setFieldValue(
                                    'unitFilter',
                                    e || ''
                                  )
                                }}
                                value={vSetValidation.values.unitFilter || []}
                                className={`input row-header ${
                                  !!vSetValidation?.errors.unitFilter
                                    ? 'is-invalid'
                                    : ''
                                }`}
                                onInputChange={handleInputUnit}
                                isMulti
                              />
                              {vSetValidation.touched.unitFilter &&
                                !!vSetValidation.errors.unitFilter && (
                                  <FormFeedback type="invalid">
                                    <div>
                                      {vSetValidation.errors.unitFilter}
                                    </div>
                                  </FormFeedback>
                                )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>

                    <div id="table-gridjs">
                      <DataTable
                        fixedHeader
                        fixedHeaderScrollHeight="700px"
                        columns={columns}
                        pagination
                        data={data}
                        progressPending={loading}
                        onRowClicked={(row) => handleClickRM(row)}
                        progressComponent={<LoadingTable />}
                        customStyles={tableCustomStyles}
                        pointerOnHover
                        highlightOnHover
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(DaftarPasienRJ)
