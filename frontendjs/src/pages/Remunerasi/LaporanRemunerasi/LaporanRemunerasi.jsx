import React, { useEffect, useState } from 'react'
import withRouter from '../../../Components/Common/withRouter'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Label,
  Row,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../Select/Select'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { getDaftarSudahVerifikasiRemunerasi } from '../../../store/actions'
import { comboRegistrasiGet } from '../../../store/master/action'
import * as XLSX from 'xlsx'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'

const LaporanRemunerasi = () => {
  document.title = 'Laporan Remunerasi'
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { dataGrid, loadingGrid, data } = useSelector((state) => ({
    dataGrid: state.Payment.getDaftarSudahVerifikasiRemunerasi.data,
    loadingGrid: state.Payment.getDaftarSudahVerifikasiRemunerasi.loading,
    data: state.Master.comboRegistrasiGet.data || [],
  }))
  const vSetValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      instalasi: '',
      unit: '',
      penjamin: '',
      tglAwal: '',
      tglAkhir: '',
    },
    validationSchema: Yup.object({
      // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
    }),
    onSubmit: (values) => {
      dispatch(
        getDaftarSudahVerifikasiRemunerasi({
          tglAwal: values.tglAwal || dateNow,
          tglAkhir: values.tglAkhir || dateNow,
          instalasi: values.instalasi || '',
          unit: values.unit || '',
          penjamin: values.penjamin || '',
        })
      )
    },
  })

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. RM</span>,
      selector: (row) => row.nocm,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl. Tindakan</span>,
      selector: (row) => row.tglinput,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tindakan</span>,
      selector: (row) => row.namaproduk,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Pelaksana</span>,
      selector: (row) => row.jenispelaksana,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">Nakes</span>,
      selector: (row) => row.petugas,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">Total Harga</span>,
      selector: (row) => row.total,
      sortable: true,
      width: '50',
    },
    {
      name: <span className="font-weight-bold fs-13">DPJP</span>,
      selector: (row) => row.dpjp,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">J Perawat</span>,
      selector: (row) => row.komperawat,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">J RS</span>,
      selector: (row) => row.komjasars,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">J Dok Anastesi</span>,
      selector: (row) => row.komdokanastesi,
      sortable: true,
      width: '100',
    },
    {
      name: <span className="font-weight-bold fs-13">J DPJP</span>,
      selector: (row) => row.komdokdpjp,
      sortable: true,
      width: '100',
    },
  ]
  useEffect(() => {
    dispatch(comboRegistrasiGet())
  }, [dispatch])
  const handleExport = () => {
    const formattedData = dataGrid.map((row) =>
      columns.map((col) => col.selector(row))
    )
    const header = columns.map((col) => col.name.props.children)
    const sheetData = [header, ...formattedData]
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    XLSX.writeFile(workbook, 'laporan_remunerasi.xlsx')
  }
  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Laporan Remunerasi" pageTitle="Forms" />
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              vSetValidation.handleSubmit()
              return false
            }}
            className="gy-4"
            action="#"
          >
            <Card>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <Row className="gy-2">
                      <Col lg={2}>
                        <div className="mt-2">
                          <Label
                            style={{ color: 'black' }}
                            htmlFor="unitlast"
                            className="form-label"
                          >
                            Instalasi
                          </Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <CustomSelect
                          id="instalasi"
                          name="instalasi"
                          options={data.instalasi || []}
                          onChange={(e) => {
                            vSetValidation.setFieldValue(
                              'instalasi',
                              e?.value || ''
                            )
                          }}
                          value={vSetValidation.values.instalasi}
                          className={`input row-header ${
                            !!vSetValidation?.errors.instalasi
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        {vSetValidation.touched.instalasi &&
                          !!vSetValidation.errors.instalasi && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.instalasi}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={2}>
                        <div className="mt-2">
                          <Label
                            style={{ color: 'black' }}
                            htmlFor="unitlast"
                            className="form-label"
                          >
                            Unit
                          </Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <CustomSelect
                          id="unit"
                          name="unit"
                          options={data.unit || []}
                          onChange={(e) => {
                            vSetValidation.setFieldValue('unit', e?.value || '')
                          }}
                          value={vSetValidation.values.unit}
                          className={`input row-header ${
                            !!vSetValidation?.errors.unit ? 'is-invalid' : ''
                          }`}
                        />
                        {vSetValidation.touched.unit &&
                          !!vSetValidation.errors.unit && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.unit}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={2}>
                        <div className="mt-2">
                          <Label
                            style={{ color: 'black' }}
                            htmlFor="unitlast"
                            className="form-label"
                          >
                            Penjamin
                          </Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <CustomSelect
                          id="penjamin"
                          name="penjamin"
                          options={data.rekanan || []}
                          onChange={(e) => {
                            vSetValidation.setFieldValue(
                              'penjamin',
                              e?.value || ''
                            )
                          }}
                          value={vSetValidation.values.penjamin}
                          className={`input row-header ${
                            !!vSetValidation?.errors.penjamin
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        {vSetValidation.touched.penjamin &&
                          !!vSetValidation.errors.penjamin && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.penjamin}</div>
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <Row className="gy-2">
                      <Col lg={3}>
                        <div className="mt-0">
                          <Label
                            style={{ color: 'black' }}
                            htmlFor="unitlast"
                            className="form-label"
                          >
                            Tanggal Pulang Pasien
                          </Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <KontainerFlatpickr
                          isError={
                            vSetValidation.touched?.tglAwal &&
                            !!vSetValidation.errors?.tglAwal
                          }
                          id="tglAwal"
                          options={{
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={vSetValidation.values.tglAwal || dateNow}
                          onChange={([newDate]) => {
                            vSetValidation.setFieldValue(
                              'tglAwal',
                              newDate.toISOString()
                            )
                          }}
                        />
                        {vSetValidation.touched?.tglAwal &&
                          !!vSetValidation.errors.tglAwal && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.tglAwal}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={1}>
                        <div className="mt-2">
                          <Label
                            style={{ color: 'black' }}
                            htmlFor="unitlast"
                            className="form-label"
                          >
                            S/D
                          </Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <KontainerFlatpickr
                          isError={
                            vSetValidation.touched?.tglAkhir &&
                            !!vSetValidation.errors?.tglAkhir
                          }
                          id="tglAkhir"
                          options={{
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={vSetValidation.values.tglAkhir || dateNow}
                          onChange={([newDate]) => {
                            vSetValidation.setFieldValue(
                              'tglAkhir',
                              newDate.toISOString()
                            )
                          }}
                        />
                        {vSetValidation.touched?.tglAkhir &&
                          !!vSetValidation.errors.tglAkhir && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.tglAkhir}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={12} className="mr-3 me-3 mt-2">
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                          <Button
                            type="submit"
                            color="info"
                            style={{ width: '20%' }}
                          >
                            Cari
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Button
                  color="info"
                  type="button"
                  placement="top"
                  id="tooltipTopPencarian"
                  onClick={handleExport}
                >
                  Export to Excel
                </Button>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={columns}
                    pagination
                    data={dataGrid}
                    progressPending={loadingGrid}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    // onRowClicked={(row) => handleClick(row)}
                    pointerOnHover
                    highlightOnHover
                  />
                </div>
              </CardBody>
            </Card>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(LaporanRemunerasi)
