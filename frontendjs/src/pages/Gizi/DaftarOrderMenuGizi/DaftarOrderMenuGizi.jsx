import React, { useEffect, useState } from 'react'
import UiContent from '../../../Components/Common/UiContent'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import DataTable from 'react-data-table-component'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { useDispatch, useSelector } from 'react-redux'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import {
  deleteOrderGizi,
  getDaftarOrderGizi,
  getMasterGizi,
  upsertVerifikasiOrderGizi,
} from '../../../store/gizi/giziSlice'
import NoDataTable from '../../../Components/Table/NoDataTable'

const DaftarOrderMenuGizi = () => {
  document.title = 'Daftar Order Menu Gizi'
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { data, loading, dataCombo } = useSelector((state) => ({
    data: state.giziSlice.getDaftarOrderGizi?.data || [],
    dataCombo: state.giziSlice.getMasterGizi?.data || [],
  }))
  const vFilter = useFormik({
    initialValues: {
      tglOrder: dateNow,
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      dispatch(getDaftarOrderGizi({ tglorder: values.tglOrder }))
    },
  })
  useEffect(() => {
    dispatch(getDaftarOrderGizi({ tglorder: dateNow }))
    dispatch(getMasterGizi(''))
  }, [dispatch, dateNow])
  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Order</span>,
      selector: (row) => row.tglorder,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas Order</span>,
      selector: (row) => row.pegawai,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas Verifikasi</span>,
      selector: (row) => row.pegawaiverif,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13"></span>,
      selector: (row) => {
        if (row.isverif !== true) {
          return (
            <button
              className="btn btn-success"
              onClick={() => handleClickVerifikasi(row)}
            >
              Verifikasi
            </button>
          )
        } else {
          return null
        }
      },
      sortable: false,
    },
  ]
  const columnsExpand = [
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No. RM</span>,
      selector: (row) => row.nocm,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Order</span>,
      selector: (row) => row.jenisorder,
      sortable: true,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diet 1</span>,
      selector: (row) => row.diet1,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diet 2</span>,
      selector: (row) => row.diet2,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diet 3</span>,
      selector: (row) => row.diet3,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Kategori</span>,
      selector: (row) => row.kategoridiet,
      sortable: true,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">keterangan</span>,
      selector: (row) => row.keterangan,
      sortable: true,
      width: '200px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13"></span>,
      selector: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => handleButtonClickHapus(row)}
        >
          Hapus
        </button>
      ),
      sortable: false,
    },
  ]
  const handleButtonClickHapus = (e) => {
    let temp = {
      statusall: false,
      data: e,
    }
    dispatch(
      deleteOrderGizi(temp, () => {
        dispatch(getDaftarOrderGizi({ tglorder: vFilter.values.tglOrder }))
      })
    )
  }
  const handleClickVerifikasi = (e) => {
    let temp = {
      data: e,
    }
    dispatch(
      upsertVerifikasiOrderGizi(temp, () => {
        dispatch(getDaftarOrderGizi({ tglorder: vFilter.values.tglOrder }))
      })
    )
  }

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daftar Order Menu Gizi" pageTitle="Forms" />
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
                  <Row className="mb-3 gy-2">
                    <Col sm={3}>
                      <CustomSelect
                        id="unit"
                        name="unit"
                        options={dataCombo?.resultunit}
                        onChange={(e) => {
                          vFilter.setFieldValue('unit', e?.value || '')
                        }}
                        value={vFilter.values.unit}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${
                          !!vFilter?.errors.unit ? 'is-invalid' : ''
                        }`}
                        isClearEmpty
                      />
                      {vFilter.touched.unit && !!vFilter.errors.unit && (
                        <FormFeedback type="invalid">
                          <div>{vFilter.errors.unit}</div>
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm={3}>
                      <KontainerFlatpickr
                        isError={
                          vFilter.touched?.tglOrder &&
                          !!vFilter.errors?.tglOrder
                        }
                        id="tglOrder"
                        options={{
                          dateFormat: 'Y-m-d',
                          defaultDate: 'today',
                        }}
                        value={vFilter.values.tglOrder}
                        onChange={([newDate]) => {
                          vFilter.setFieldValue(
                            'tglOrder',
                            newDate.toISOString()
                          )
                        }}
                      />
                      {vFilter.touched?.tglOrder &&
                        !!vFilter.errors.tglOrder && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.tglOrder}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={3}>
                      <Button
                        type="button"
                        color="info"
                        placement="top"
                        id="tooltipTopPencarian"
                        onClick={() => {
                          vFilter.handleSubmit()
                        }}
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
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="700px"
                      columns={columns}
                      pagination
                      data={data}
                      progressPending={loading}
                      customStyles={tableCustomStyles}
                      pointerOnHover
                      highlightOnHover
                      progressComponent={<LoadingTable />}
                      expandableRows
                      expandableRowsComponent={({ data }) => (
                        <DataTable
                          columns={columnsExpand}
                          data={data?.detail}
                          progressPending={false}
                          customStyles={subTableCustomStyles}
                          progressComponent={<LoadingTable />}
                          noDataComponent={<NoDataTable dataName={'kamar'} />}
                        />
                      )}
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

export default DaftarOrderMenuGizi
