import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import classnames from 'classnames'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { onChangeStrNbr, onChangeStrNbrNeg } from '../../../utils/format'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import {
  sdmResetForm,
  saveBiodataPegawai,
  getComboSDM,
  getPegawaiById,
  getUserRoleById,
  saveSignupUserRole,
  updateResetPassword,
} from '../../../store/actions'
import { desaGet } from '../../../store/master/action'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import CustomInput from '../../../Components/Common/CustomInput/CustomInput'
import FormBiodata from './FormBiodata'
import FormAlamat from './FormAlamat'
import FormStatusPegawai from './FormStatusPegawai'
import { useSelectorRoot } from '../../../store/reducers'

const BiodataPegawai = () => {
  document.title = 'Biodata Pegawai'
  const dispatch = useDispatch()
  const { idPegawai } = useParams()
  const { dataCombo, newData, success, dataUserRole, loadingUserRole } =
    useSelectorRoot((state) => ({
      dataCombo: state.sumberDayaManusia.getComboSDM.data,
      newData: state.sumberDayaManusia.saveBiodataPegawai.data,
      success: state.sumberDayaManusia.saveBiodataPegawai.success,
      dataUserRole: state.sumberDayaManusia.getUserRoleById.data,
      loadingUserRole: state.sumberDayaManusia.getUserRoleById.loading,
    }))

  const vSetValidationUserName = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 4,
      statusEnabled: '',
      username: '',
      roles: '',
      idUser: '',
      idpegawai: '',
      password: '',
      accesUnit: '',
    },
    validationSchema: Yup.object({
      statusEnabled: Yup.string().required('Status Enabled wajib diisi'),
      username: Yup.string().required('User Name wajib diisi'),
      roles: Yup.string().required('Role Applikasi wajib diisi'),
      accesUnit: Yup.array().required('Acces Unit Applikasi wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values)
      values.password = values.username + `@123`
      if (values.idpegawai === '') {
        toast.error('ID Pegawai Tidak Ada, Silahkan Kembali, dan masuk lagi', {
          autoClose: 3000,
        })
        return
      }
      dispatch(
        saveSignupUserRole(values, () => {
          resetForm()
          dispatch(getUserRoleById({ idPegawai: idPegawai }))
        })
      )
    },
  })
  useEffect(() => {
    return () => {
      dispatch(sdmResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getComboSDM())
    dispatch(desaGet(''))
  }, [dispatch])
  const [activeTab, setActiveTab] = useState('1')
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      //   let filteredOrders = orders;
      if (type !== 'all') {
        // filteredOrders = orders.filter((order) => order.status === type);
      }
    }
  }
  const taskBiodata = [
    {
      id: 1,
      label: 'Biodata Pegawai',
    },
    {
      id: 2,
      label: 'Alamat',
    },
    {
      id: 3,
      label: 'Status Pegawai',
    },
    {
      id: 4,
      label: 'User Name',
    },
  ]
  const dataStatusEnabled = [
    {
      value: 1,
      label: 'Aktif',
    },
    {
      value: 2,
      label: 'Non Aktif',
    },
  ]
  // Pills
  const [pillsTab, setpillsTab] = useState('1')
  const pillsToggleBilling = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab)
    }
  }
  useEffect(() => {
    const setFF4 = vSetValidationUserName.setFieldValue
    if (newData !== null) {
      if (newData?.pegawai?.id !== undefined) {
        setFF4('idpegawai', newData.pegawai.id)
      }
    }
  }, [newData, success, vSetValidationUserName.setFieldValue])

  useEffect(() => {
    if (idPegawai !== undefined) {
      const setFF4 = vSetValidationUserName.setFieldValue
      setFF4('idpegawai', parseFloat(idPegawai))
      dispatch(getPegawaiById({ idPegawai: idPegawai }))
      dispatch(getUserRoleById({ idPegawai: idPegawai }))
    }
  }, [idPegawai, dispatch, vSetValidationUserName.setFieldValue])

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status Enabled</span>,
      selector: (row) => row.status,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">User Name</span>,
      selector: (row) => row.username,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Modul</span>,
      selector: (row) => row.reportdisplay,
      sortable: true,
      width: '150px',
    },
  ]
  const [disabledUsername, setdisabledUsername] = useState(false)
  const handleClick = (e) => {
    vSetValidationUserName.setFieldValue('statusEnabled', 2)
    if (e.status === 'AKTIF') {
      vSetValidationUserName.setFieldValue('statusEnabled', 1)
    }
    setdisabledUsername(true)
    vSetValidationUserName.setFieldValue('username', e.username)
    vSetValidationUserName.setFieldValue('roles', e.idmodule)
    vSetValidationUserName.setFieldValue('idUser', e.id)
    console.log(e)
    vSetValidationUserName.setFieldValue('accesUnit', e.listunit)
  }
  const handleClickBatal = (e) => {
    setdisabledUsername(false)
    vSetValidationUserName.setFieldValue('statusEnabled', '')
    vSetValidationUserName.setFieldValue('username', '')
    vSetValidationUserName.setFieldValue('roles', '')
    vSetValidationUserName.setFieldValue('idUser', '')
  }
  const handleClickResetPassword = (e) => {
    if (vSetValidationUserName.values.idUser === '') {
      toast.error('Role Pasien Belum Dipilih', { autoClose: 3000 })
      return
    }
    const values = {
      idUser: vSetValidationUserName.values.idUser,
      password: vSetValidationUserName.values.username + `@123`,
    }
    dispatch(
      updateResetPassword(values, () => {
        // resetForm()
      })
    )
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tambah / Edit Pegawai" pageTitle="Forms" />
          <Card>
            <CardBody className="pt-0">
              <div>
                <Nav
                  className="nav-tabs nav-tabs-custom nav-success"
                  role="tablist"
                >
                  {taskBiodata.map((item, key) => (
                    <NavItem key={key}>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames(
                          { active: pillsTab === `${item.id}` },
                          'fw-semibold'
                        )}
                        onClick={() => {
                          pillsToggleBilling(`${item.id}`)
                        }}
                      >
                        {' '}
                        {item.label}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="1" id="ttv-1">
                    <FormBiodata />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="2" id="ttv-1">
                    <FormAlamat />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="3" id="ttv-1">
                    <FormStatusPegawai />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={pillsTab} className="text-muted">
                  <TabPane tabId="4" id="ttv-1">
                    <Card>
                      <CardBody>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault()
                            vSetValidationUserName.handleSubmit()
                            return false
                          }}
                          className="gy-4"
                          action="#"
                        >
                          <Row>
                            <Col lg={6}>
                              <div id="table-gridjs">
                                <DataTable
                                  fixedHeader
                                  fixedHeaderScrollHeight="330px"
                                  columns={columns}
                                  pagination
                                  data={dataUserRole}
                                  progressPending={loadingUserRole}
                                  customStyles={tableCustomStyles}
                                  progressComponent={<LoadingTable />}
                                  onRowClicked={(row) => handleClick(row)}
                                  pointerOnHover
                                  highlightOnHover
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <Row className="gy-2">
                                <Col lg={4}>
                                  <div className="mt-2">
                                    <Label
                                      style={{ color: 'black' }}
                                      htmlFor="unitlast"
                                      className="form-label"
                                    >
                                      Status Enabled
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomSelect
                                    id="statusEnabled"
                                    name="statusEnabled"
                                    options={dataStatusEnabled}
                                    isClearEmpty
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'statusEnabled',
                                        e?.value || ''
                                      )
                                    }}
                                    value={
                                      vSetValidationUserName.values
                                        .statusEnabled
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationUserName?.errors
                                        .statusEnabled
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationUserName.touched
                                    .statusEnabled &&
                                    !!vSetValidationUserName.errors
                                      .statusEnabled && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationUserName.errors
                                              .statusEnabled
                                          }
                                        </div>
                                      </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={4}>
                                  <div className="mt-2">
                                    <Label
                                      style={{ color: 'black' }}
                                      htmlFor="unitlast"
                                      className="form-label"
                                    >
                                      User Name
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={
                                      vSetValidationUserName.values.username
                                    }
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'username',
                                        e.target.value
                                      )
                                    }}
                                    invalid={
                                      vSetValidationUserName.touched
                                        ?.username &&
                                      !!vSetValidationUserName.errors?.username
                                    }
                                    disabled={disabledUsername}
                                  />
                                  {vSetValidationUserName.touched?.username &&
                                    !!vSetValidationUserName.errors
                                      .username && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationUserName.errors
                                              .username
                                          }
                                        </div>
                                      </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={4}>
                                  <div className="mt-2">
                                    <Label
                                      style={{ color: 'black' }}
                                      htmlFor="unitlast"
                                      className="form-label"
                                    >
                                      Modul
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomSelect
                                    id="roles"
                                    name="roles"
                                    options={dataCombo.roles}
                                    isClearEmpty
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'roles',
                                        e?.value || ''
                                      )
                                    }}
                                    value={vSetValidationUserName.values.roles}
                                    className={`input row-header ${
                                      !!vSetValidationUserName?.errors.roles
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                  />
                                  {vSetValidationUserName.touched.roles &&
                                    !!vSetValidationUserName.errors.roles && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {vSetValidationUserName.errors.roles}
                                        </div>
                                      </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={4}>
                                  <div className="mt-2">
                                    <Label
                                      style={{ color: 'black' }}
                                      htmlFor="unitlast"
                                      className="form-label"
                                    >
                                      Acces Unit
                                    </Label>
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <CustomSelect
                                    id="accesUnit"
                                    name="accesUnit"
                                    options={dataCombo.unit || []}
                                    onChange={(e) => {
                                      vSetValidationUserName.setFieldValue(
                                        'accesUnit',
                                        e
                                      )
                                    }}
                                    value={
                                      vSetValidationUserName.values.accesUnit ||
                                      []
                                    }
                                    className={`input row-header ${
                                      !!vSetValidationUserName?.errors.accesUnit
                                        ? 'is-invalid'
                                        : ''
                                    }`}
                                    isMulti
                                  />
                                  {vSetValidationUserName.touched.accesUnit &&
                                    !!vSetValidationUserName.errors
                                      .accesUnit && (
                                      <FormFeedback type="invalid">
                                        <div>
                                          {
                                            vSetValidationUserName.errors
                                              .accesUnit
                                          }
                                        </div>
                                      </FormFeedback>
                                    )}
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={12} className="mr-3 me-3 mt-2">
                              <div className="d-flex flex-wrap justify-content-end gap-2">
                                <Button type="submit" color="success">
                                  Simpan
                                </Button>
                                <Button
                                  type="button"
                                  color="danger"
                                  onClick={() => {
                                    handleClickBatal()
                                  }}
                                >
                                  Batal
                                </Button>
                                <Button
                                  type="button"
                                  color="warning"
                                  onClick={() => {
                                    handleClickResetPassword()
                                  }}
                                >
                                  Reset Password
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default BiodataPegawai
