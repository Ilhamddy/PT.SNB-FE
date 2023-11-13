import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UiContent from '../../../../Components/Common/UiContent';
import { Button, Card, Col, Container, Form, FormFeedback, Row, UncontrolledTooltip } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../../Components/Table/LoadingTable';
import {
  getLaporanRl_3_4, kendaliDokumenResetForm
} from '../../../../store/actions';
import { Grid, _ } from 'gridjs-react';
import { BaseExample } from '../../../../pages/Tables/GridTables/GridTablesData';

const RL3_4 = () => {
  document.title = "Laporan RL3.4";
  const dispatch = useDispatch();
  const { dataGrid, loadingGrid } = useSelector((state) => ({
    dataGrid: state.KendaliDokumen.getLaporanRl_3_4.data,
    loadingGrid: state.KendaliDokumen.getLaporanRl_3_4.loading,
  }));
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
      dispatch(getLaporanRl_3_4({
        start: values.start || dateNow,
        end: values.end || dateNow
      }));
    },
  })
  const columns = [
    {
      id: 'no',
      formatter: (cell) => _(<span>{cell}</span>),
      name: 'No'
    },
    {
      id: 'label',
      name: 'Jenis Kegiatan'
      // formatter: (cell) => _(<a href="/#"> {cell} </a>)
    },
    {
      name: 'Rujukan Medis',
      columns: [{
        name: 'Rumah Sakit',
        id: 'medis_rumahsakit'
      }, {
        name: 'Bidan',
        id: 'medis_bidan'
      }, {
        name: 'Puskesmas',
        id: 'medis_puskesmas'
      }, {
        name: 'Faskes Lainnya',
        id: 'medis_faskeslain'
      }, {
        name: 'Hidup',
        id: 'medis_hidup'
      }, {
        name: 'Mati',
        id: 'medis_mati'
      }, {
        name: 'Jumlah Total',
        id: 'medis_jml'
      }]
    },
    {
      name: 'Rujukan Non Medis',
      columns: [{
        name: 'Hidup',
      }, {
        name: 'Mati',
      }, {
        name: 'Jumlah Total',
      }]
    },
    {
      name: 'Non Rujukan',
      columns: [{
        name: 'Hidup',
        id: 'nonrujukan_hidup'
      }, {
        name: 'Mati',
        id: 'nonrujukan_mati'
      }, {
        name: 'Jumlah Total',
        id: 'nonrujukan_jml'
      }]
    },
    {
      name: 'Dirujuk',
      id: 'rujuk'
    },
  ]
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.4" pageTitle="Forms" />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              vSetValidation.handleSubmit();
              return false;
            }}
            className="gy-4"
            action="#">
            <Card className="p-5">
              <Row>
                <Col lg={3}>
                  <KontainerFlatpickr
                    isError={vSetValidation.touched?.start &&
                      !!vSetValidation.errors?.start}
                    id="start"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vSetValidation.values.start || dateNow}
                    onChange={([newDate]) => {
                      vSetValidation.setFieldValue('start', newDate.toISOString())
                    }}
                  />
                  {vSetValidation.touched?.start
                    && !!vSetValidation.errors.start && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.start}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col sm={3}>
                  <KontainerFlatpickr
                    isError={vSetValidation.touched?.end &&
                      !!vSetValidation.errors?.end}
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
                  {vSetValidation.touched?.end
                    && !!vSetValidation.errors.end && (
                      <FormFeedback type="invalid">
                        <div>{vSetValidation.errors.end}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <Button type="submit" placement="top" id="tooltipTopPencarian" >
                    CARI
                  </Button>
                  <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                </Col>
                <Col lg={12}>

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
              enabled: true, limit: 20, summary: false
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

export default RL3_4