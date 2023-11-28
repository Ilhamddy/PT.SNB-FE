import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UiContent from '../../../../Components/Common/UiContent'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormFeedback,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'
import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../../Components/Table/LoadingTable'
import {
  getLaporanRl_3_14,
  kendaliDokumenResetForm,
} from '../../../../store/actions'
import { Grid, _ } from 'gridjs-react'
import * as XLSX from 'xlsx'

const RL3_14 = () => {
  document.title = 'Laporan RL3.14'
  const dispatch = useDispatch()
  const { dataGrid, loadingGrid } = useSelector((state) => ({
    dataGrid: state.KendaliDokumen.getLaporanRl_3_14.data,
    loadingGrid: state.KendaliDokumen.getLaporanRl_3_14.loading,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    initialValues: {
      start: '',
      end: '',
    },
    validationSchema: Yup.object({
      // start: Yup.string().required('Tanggal Awal harus diisi'),
      // end: Yup.string().required('Tanggal Akhir harus diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
      dispatch(
        getLaporanRl_3_14({
          start: values.start || dateNow,
          end: values.end || dateNow,
        })
      )
    },
  })
  const columns = [
    {
      name: 'No',
      formatter: (cell) => _(<span>{cell}</span>),
      pageTitle: 'test',
    },
    {
      id: 'spesialis',
      name: 'Spesialis',
      // formatter: (cell) => _(<a href="/#"> {cell} </a>)
    },
    {
      name: 'Rujukan',
      columns: [
        {
          id: 'diterima_puskesmas',
          name: 'Diterima Puskesmas',
        },
        {
          id: 'diterima_faskeslain',
          name: 'Diterima Faskeslain',
        },
        {
          id: 'diterima_rs',
          name: 'Diterima RS',
        },
        {
          id: 'dikembalikan_kepuskesmas',
          name: 'Dikembalikan Ke Puskesmas',
        },
        {
          id: 'dikembalikan_kefaskeslain',
          name: 'Dikembalikan Ke Faskes Lain',
        },
        {
          id: 'dikembalikan_kersasal',
          name: 'Dikembalikan Ke RS Asal',
        },
        {
          id: 'diterima_faskeslain',
          name: 'Diterima Faskes Lain',
        },
      ],
    },
    {
      name: 'Di Rujuk',
      columns: [
        {
          id: 'dirujuk_pasienrujukan',
          name: 'Pasien Rujukan',
        },
        {
          id: 'dirujuk_datangsendiri',
          name: 'Datang Sendiri',
        },
        {
          id: 'dirujuk_diterimakembali',
          name: 'Diterima Kembali',
        },
      ],
    },
  ]
  const handleExport = () => {
    const formattedData = dataGrid.map((item) => Object.values(item))
    const firstObject = dataGrid[0]
    const header = Object.keys(firstObject)
    console.log(header)
    const sheetData = [header, ...formattedData]
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    XLSX.writeFile(workbook, 'laporan_rl3_14.xlsx')
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.14" pageTitle="Forms" />
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              vSetValidation.handleSubmit()
              return false
            }}
            className="gy-4"
            action="#"
          >
            <Card className="p-5">
              <Row>
                <Col lg={3}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidation.touched?.start &&
                      !!vSetValidation.errors?.start
                    }
                    id="start"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vSetValidation.values.start || dateNow}
                    onChange={([newDate]) => {
                      vSetValidation.setFieldValue(
                        'start',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSetValidation.touched?.start &&
                    !!vSetValidation.errors.start && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.start}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col sm={3}>
                  <KontainerFlatpickr
                    isError={
                      vSetValidation.touched?.end &&
                      !!vSetValidation.errors?.end
                    }
                    id="end"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vSetValidation.values.end || dateNow}
                    onChange={([newDate]) => {
                      vSetValidation.setFieldValue('end', newDate.toISOString())
                    }}
                  />
                  {vSetValidation.touched?.end &&
                    !!vSetValidation.errors.end && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.end}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <Button
                    type="submit"
                    placement="top"
                    id="tooltipTopPencarian"
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
                <Col lg={2}>
                  <Button
                    type="button"
                    placement="top"
                    id="tooltipTopPencarian"
                    onClick={handleExport}
                  >
                    Export to Excel
                  </Button>
                </Col>
                <Col lg={12} style={{ marginTop: '4px' }}>
                  <div id="table-gridjs">
                    <Grid
                      data={dataGrid}
                      columns={columns}
                      sort={true}
                      fixedHeader={true}
                      pagination={{ enabled: true, limit: 5 }}
                      style={{
                        table: {
                          border: '1px solid #ccc',
                        },
                        th: {
                          'background-color': 'rgba(255, 203, 70, 1)',
                          color: '#000',
                          'border-bottom': '1px solid #ccc',
                          'text-align': 'center',
                        },
                        td: {
                          'text-align': 'center',
                        },
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default RL3_14
