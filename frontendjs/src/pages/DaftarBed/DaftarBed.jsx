import { ToastContainer } from 'react-toastify'
import {
  Container,
  Card,
  Col,
  CardBody,
  Row,
  Button,
  FormFeedback,
  Modal,
  Input,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import CountUp from 'react-countup'
import { siapPakai, totalTempatRusak, totalTempatTerisi } from './icon'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComboTempatTidur,
  getTempatTidur,
  getUnitTempatTidur,
  upsertTempatTidur,
} from '../../store/sysadmin/action'
import { Link, useNavigate } from 'react-router-dom'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import * as Yup from 'yup'

const DaftarBed = () => {
  const dispatch = useDispatch()
  const { tempatTidur, unitBed, unit, kelas, kamar, statusBed } = useSelector(
    (state) => ({
      tempatTidur: state.Sysadmin.getTempatTidur.data || null,
      unitBed: state.Sysadmin.getUnitTempatTidur.data?.kamars || [],
      unit: state.Sysadmin.getComboTempatTidur.data?.unit || [],
      kelas: state.Sysadmin.getComboTempatTidur.data?.kelas || [],
      kamar: state.Sysadmin.getComboTempatTidur.data?.kamar || [],
      statusBed: state.Sysadmin.getComboTempatTidur.data?.statusBed || [],
    })
  )

  const vFilter = useFormik({
    initialValues: {
      unit: '',
      kelas: '',
    },
    onSubmit: (values) => {
      dispatch(getUnitTempatTidur(values))
    },
  })

  const vTempatTidur = useFormik({
    initialValues: {
      open: false,
      id: '',
      kamar: '',
      kelas: '',
      nobed: '',
      status: '',
    },
    validationSchema: Yup.object({
      kamar: Yup.string().required('Kamar harus diisi!'),
      kelas: Yup.string().required('Kelas harus diisi!'),
      nobed: Yup.string().required('No bed harus diisi!'),
      status: Yup.string().required('Status harus diisi!'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertTempatTidur(values, () => {
          resetForm()
          dispatch(getUnitTempatTidur(values))
        })
      )
    },
  })

  const datawidget = [
    {
      label: 'Total Tempat Tidur Kosong',
      counter: tempatTidur?.statusRusak || 0,
      decimals: 0,
      icon: siapPakai,
      iconClass: 'primary',
    },
    {
      label: 'Total Tempat Tidur Terisi',
      counter: tempatTidur?.statusIsi || 0,
      decimals: 0,
      icon: totalTempatTerisi,
      iconClass: 'primary',
    },
    {
      label: 'Total Tempat Tidur Rusak',
      counter: tempatTidur?.statusKosong || 0,
      decimals: 0,
      icon: totalTempatRusak,
      iconClass: 'primary',
    },
  ]
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Bed</span>,
      selector: (row) => row.totalbed,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '140px',
    },
    {
      name: <span className="font-weight-bold fs-13">Bed Siap Pakai</span>,
      selector: (row) => row.totalkosong,
      sortable: true,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Bed Terisi</span>,
      selector: (row) => row.totalisi,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Bed rusak</span>,
      selector: (row) => row.totalrusak,
      sortable: true,
      width: '150px',
    },
  ]
  const columnsBed = [
    {
      name: <span className="font-weight-bold fs-13">Nama Bed</span>,
      selector: (row) => row.namatt,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kamar</span>,
      selector: (row) => row.namakamar,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kelas</span>,
      selector: (row) => row.kelas,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Bed</span>,
      selector: (row) => row.nobed,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status Bed</span>,
      selector: (row) => row.namastatus,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aksi</span>,
      cell: (row) => (
        <Button
          color="info"
          onClick={() => {
            vTempatTidur.setFieldValue('id', row.id)
            vTempatTidur.setFieldValue('open', true)
            vTempatTidur.setFieldValue('kamar', row.kamarid)
            vTempatTidur.setFieldValue('kelas', row.kelasid)
            vTempatTidur.setFieldValue('nobed', row.nobed)
            vTempatTidur.setFieldValue('status', row.status)
          }}
        >
          Edit
        </Button>
      ),
      sortable: true,
      width: '150px',
    },
  ]
  useEffect(() => {
    dispatch(getTempatTidur())
    dispatch(getUnitTempatTidur(vFilter.initialValues))
    dispatch(getComboTempatTidur())
  }, [dispatch, vFilter.initialValues])
  return (
    <div className="page-content page-daftar-kamar">
      <ToastContainer closeButton={false} />
      <Modal
        isOpen={vTempatTidur.values.open}
        toggle={() => vTempatTidur.resetForm()}
        centered
      >
        <Card className="p-3">
          <Row>
            <ColLabelInput
              className="mt-2"
              lg={6}
              label={'Kamar'}
              inputId={'Kamar'}
            >
              <CustomSelect
                id="kamar"
                name="kamar"
                options={kamar}
                onChange={(e) => {
                  vTempatTidur.setFieldValue('kamar', e?.value || '')
                }}
                value={vTempatTidur.values.kamar}
                className={`input row-header ${!!vTempatTidur?.errors.kamar ? 'is-invalid' : ''
                  }`}
                isDisabled
              />
              {vTempatTidur.touched.kamar && !!vTempatTidur.errors.kamar && (
                <FormFeedback type="invalid">
                  <div>{vTempatTidur.errors.kamar}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mt-2"
              lg={6}
              label={'Kelas'}
              inputId={'Kelas'}
            >
              <CustomSelect
                id="kelas"
                name="kelas"
                options={kelas}
                onChange={(e) => {
                  vTempatTidur.setFieldValue('kelas', e?.value || '')
                }}
                value={vTempatTidur.values.kelas}
                className={`input row-header ${!!vTempatTidur?.errors.kelas ? 'is-invalid' : ''
                  }`}
                isDisabled
              />
              {vTempatTidur.touched.kelas && !!vTempatTidur.errors.kelas && (
                <FormFeedback type="invalid">
                  <div>{vTempatTidur.errors.kelas}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mt-2"
              lg={6}
              label={'No Bed'}
              inputId={'no-bed'}
            >
              <Input
                id="nobed"
                name="nobed"
                type="text"
                value={vTempatTidur.values.nobed}
                onChange={(e) => {
                  vTempatTidur.setFieldValue('nobed', e.target.value)
                }}
                invalid={
                  vTempatTidur.touched?.nobed && !!vTempatTidur.errors?.nobed
                }
                disabled
              />
              {vTempatTidur.touched?.nobed && !!vTempatTidur.errors.nobed && (
                <FormFeedback type="invalid">
                  <div>{vTempatTidur.errors.nobed}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput
              className="mt-2"
              lg={6}
              label={'Status'}
              inputId={'status-bed'}
            >
              <CustomSelect
                id="status-bed"
                name="status"
                options={statusBed}
                onChange={(e) => {
                  vTempatTidur.setFieldValue('status', e?.value || '')
                }}
                value={vTempatTidur.values.status}
                className={`input row-header ${!!vTempatTidur?.errors.status ? 'is-invalid' : ''
                  }`}
              />
              {vTempatTidur.touched.status && !!vTempatTidur.errors.status && (
                <FormFeedback type="invalid">
                  <div>{vTempatTidur.errors.status}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
          </Row>
          <Row className="p-4">
            <ColLabelInput lg={'auto'} label={''} inputId={'btn-cari'}>
              <Button
                id="btn-cari"
                color="success"
                onClick={() => {
                  vTempatTidur.handleSubmit()
                }}
              >
                Edit
              </Button>
            </ColLabelInput>
            <ColLabelInput lg={'auto'} label={''} inputId={'btn-cari'}>
              <Button
                id="btn-cari"
                color="danger"
                onClick={() => vTempatTidur.resetForm()}
              >
                Batal
              </Button>
            </ColLabelInput>
          </Row>
        </Card>
      </Modal>
      <Container fluid>
        <BreadCrumb title="Daftar Kasur" pageTitle="Kasur" />
        <Row>
          {datawidget.map((item, key) => (
            <Col lg={4} sm={12} key={key}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="fw-medium text-muted mb-0">{item.label}</p>
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
                <div
                  className="card-footer p-2"
                  style={{ backgroundColor: '#FFCB46' }}
                >
                  <div className="text-center">
                    <Link to="#" className="link-light" onClick={() => { }}>
                      View{' '}
                      <i className="ri-arrow-right-s-line align-middle lh-1"></i>
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Card className="p-5">
          <Row>
            <ColLabelInput lg={3} label={'Unit'} inputId={'unit'}>
              <CustomSelect
                id="unit"
                name="unit"
                options={unit}
                onChange={(e) => {
                  vFilter.setFieldValue('unit', e?.value || '')
                }}
                value={vFilter.values.unit}
                className={`input row-header ${!!vFilter?.errors.unit ? 'is-invalid' : ''
                  }`}
              />
              {vFilter.touched.unit && !!vFilter.errors.unit && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.unit}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={3} label={'Kelas'} inputId={'kelas'}>
              <CustomSelect
                id="kelas"
                name="kelas"
                options={kelas}
                onChange={(e) => {
                  vFilter.setFieldValue('kelas', e?.value || '')
                }}
                value={vFilter.values.kelas}
                className={`input row-header ${!!vFilter?.errors.kelas ? 'is-invalid' : ''
                  }`}
              />
              {vFilter.touched.kelas && !!vFilter.errors.kelas && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.kelas}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={'auto'} label={''} inputId={'btn-cari'}>
              <Button color="info" onClick={() => vFilter.handleSubmit()}>
                Cari
              </Button>
            </ColLabelInput>
          </Row>
          <Row>
            <DataTable
              className="mt-4"
              columns={columns}
              pagination
              data={unitBed}
              expandableRows
              expandableRowsComponent={({ data }) => (
                <DataTable
                  columns={columnsBed}
                  data={data.tempattidur}
                  progressPending={false}
                  customStyles={subTableCustomStyles}
                  progressComponent={<LoadingTable />}
                  noDataComponent={<NoDataTable dataName={'kamar'} />}
                />
              )}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'kamar'} />}
            />
          </Row>
        </Card>
      </Container>
    </div>
  )
}

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#FFCB46',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

const subTableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#FFC727',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default DaftarBed
