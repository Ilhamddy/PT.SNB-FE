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
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'
import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import {
  getLaporanRl_4,
  kendaliDokumenResetForm,
} from '../../../../store/actions'
import { Grid, _ } from 'gridjs-react'
import * as XLSX from 'xlsx'
import CustomInput from '../../../../Components/Common/CustomInput/CustomInput'

const RL4_A = () => {
  document.title = 'Laporan RL4.A'
  const dispatch = useDispatch()
  const { dataGrid, loadingGrid } = useSelector((state) => ({
    dataGrid: state.KendaliDokumen.getLaporanRl_4.data || [],
    loadingGrid: state.KendaliDokumen.getLaporanRl_4.loading,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    initialValues: {
      start: '',
      end: '',
      formCheckCito: '',
    },
    validationSchema: Yup.object({
      // start: Yup.string().required('Tanggal Awal harus diisi'),
      // end: Yup.string().required('Tanggal Akhir harus diisi'),
    }),
    onSubmit: (values) => {
      // console.log(values)
      dispatch(
        getLaporanRl_4({
          start: values.start || dateNow,
          end: values.end || dateNow,
          iskecelakaan: values.formCheckCito,
        })
      )
    },
  })
  const columns = [
    {
      id: 'no',
      formatter: (cell) => _(<span>{cell}</span>),
      name: 'No. Urut',
    },
    {
      id: 'no_dtd',
      name: 'No. DTD',
    },
    {
      id: 'no_terperinci',
      name: 'No. Daftar terperinci',
    },
    {
      id: 'sebabpenyakit',
      name: 'Golongan sebab penyakit',
    },
    {
      name: 'Jumlah Pasien Hidup dan Mati menurut Golongan Umur & Jenis Kelamin',
      columns: [
        {
          name: '0-6 hr L',
          id: 'l_1',
        },
        {
          name: '0-6 hr P',
          id: 'p_1',
        },
        {
          name: '7-28 hr L',
          id: 'l_2',
        },
        {
          name: '7-28 hr P',
          id: 'p_2',
        },
        {
          name: '28hr-<1th hr L',
          id: 'l_3',
        },
        {
          name: '28hr-<1th hr P',
          id: 'p_3',
        },
        {
          name: '1-4th hr L',
          id: 'l_4',
        },
        {
          name: '1-4th hr P',
          id: 'p_4',
        },
        {
          name: '5-14th  hr L',
          id: 'l_5',
        },
        {
          name: '5-14th  hr P',
          id: 'p_5',
        },
        {
          name: '15-24th hr L',
          id: 'l_6',
        },
        {
          name: '15-24th hr P',
          id: 'p_6',
        },
        {
          name: '25-44th hr L',
          id: 'l_7',
        },
        {
          name: '25-44th hr P',
          id: 'p_7',
        },
        {
          name: '45-64th hr L',
          id: 'l_8',
        },
        {
          name: '45-64th hr P',
          id: 'p_8',
        },
        {
          name: '> 65 hr L',
          id: 'l_9',
        },
        {
          name: '> 65 hr P',
          id: 'p_9',
        },
      ],
    },
    {
      name: 'Pasien Keluar (Hidup & Mati) Menurut Jenis Kelamin',
      columns: [
        {
          name: 'LK',
          id: 'phpm_lk',
        },
        {
          name: 'PR',
          id: 'phpm_pl',
        },
      ],
    },
    {
      name: 'Jumlah Pasien Keluar Hidup (23+24)',
      id: 'ph_total',
    },
    {
      name: 'Jumlah Pasien Keluar Mati',
      id: 'pm_total',
    },
  ]
  const handleExport = () => {
    const formattedData = dataGrid.map((item) => Object.values(item))
    const firstObject = dataGrid[0]
    const header = Object.keys(firstObject)
    const sheetData = [header, ...formattedData]
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    XLSX.writeFile(workbook, 'laporan_rl4_A.xlsx')
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Laporan RL4_A Rawat Inap" pageTitle="Forms" />
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
                <Col lg={2} md={2}>
                  <div className="form-check ms-2">
                    <CustomInput
                      className="form-check-input"
                      type="checkbox"
                      id="formCheckCito"
                      onChange={(value) =>
                        vSetValidation.setFieldValue(
                          'formCheckCito',
                          value.target.checked
                        )
                      }
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="formCheckCito"
                      style={{ color: 'black' }}
                    >
                      Kecelakaan
                    </Label>
                  </div>
                </Col>
                <Col lg={2}>
                  <Button
                    color="info"
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
                    color="info"
                    type="button"
                    placement="top"
                    id="tooltipTopPencarian"
                    onClick={handleExport}
                  >
                    Export to Excel
                  </Button>
                </Col>
              </Row>
            </Card>
          </Form>
        </Container>
        <div id="table-gridjs">
          <Grid
            data={dataGrid}
            columns={columns}
            sort={true}
            fixedHeader={true}
            pagination={{
              enabled: true,
              limit: 10,
              summary: false,
            }}
            resizable={true}
            style={{
              table: {
                border: '1px solid #ccc',
              },
              th: {
                'background-color': 'rgb(255,203,70,1)',
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
      </div>
    </React.Fragment>
  )
}

export default RL4_A
