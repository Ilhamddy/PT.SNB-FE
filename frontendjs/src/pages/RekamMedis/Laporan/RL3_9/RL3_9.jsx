import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UiContent from '../../../../Components/Common/UiContent';
import { Button, Card, Col, Container, Form, FormFeedback, Row, UncontrolledTooltip } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import {
  getLaporanRl_3_9, kendaliDokumenResetForm
} from '../../../../store/actions';
import { Grid, _ } from 'gridjs-react';
import * as XLSX from 'xlsx';

const RL3_9 = () => {
  document.title = "Laporan RL3.9";
  const dispatch = useDispatch();
  const { dataGrid, loadingGrid } = useSelector((state) => ({
    dataGrid: state.KendaliDokumen.getLaporanRl_3_9.data || [],
    loadingGrid: state.KendaliDokumen.getLaporanRl_3_9.loading,
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
      // console.log(values)
      dispatch(getLaporanRl_3_9({
        start: values.start || dateNow,
        end: values.end || dateNow
      }));
    },
  })
  const columns = [
    {
      id: 'kodeexternal',
      formatter: (cell) => _(<span>{cell}</span>),
      name: 'NO'
    },
    {
      id: 'reportdisplay',
      name: 'JENIS KEGIATAN',
    },
    {
      id: 'jml',
      name: 'JUMLAH',
    },
  ]
  const handleExport = () => {
    const formattedData = dataGrid.map(item => Object.values(item));
    const firstObject = dataGrid[0];
    const header = Object.keys(firstObject);
    const sheetData = [header, ...formattedData];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, 'laporan_rl3_7.xlsx');
  };
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.9" pageTitle="Forms" />
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
                <Col lg={2}>
                  <Button type="button" placement="top" id="tooltipTopPencarian" onClick={handleExport}>
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
              enabled: true, limit: 10, summary: false
            }}
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

export default RL3_9