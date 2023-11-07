import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../../Components/Common/UiContent'
import { Button, Card, Col, Container, Form, FormFeedback, Row, UncontrolledTooltip } from 'reactstrap'
import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import Flatpickr from 'react-flatpickr'
import { useFormik } from 'formik'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../../../Components/Table/NoDataTable'
import LoadingTable from '../../../../Components/Table/LoadingTable'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import {
  getLaporanRl_3_3, kendaliDokumenResetForm
} from '../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux'

const RL3_3 = () => {
  document.title = "Laporan RL3.3";
  const dispatch = useDispatch();
  const [dateNow] = useState(() => new Date().toISOString())
  const { dataGrid, loadingGrid } = useSelector((state) => ({
    dataGrid: state.KendaliDokumen.getLaporanRl_3_3.data,
    loadingGrid: state.KendaliDokumen.getLaporanRl_3_3.loading,
  }));
  const vRL3_3 = useFormik({
    initialValues: {
      start: '',
      end: '',
    },
    validationSchema: Yup.object({
      start: Yup.string().required('Tanggal Awal harus diisi'),
      end: Yup.string().required('Tanggal Akhir harus diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
      dispatch(getLaporanRl_3_3({
        start: values.start || dateNow,
        end: values.end || dateNow
      }));
    },
  })
  useEffect(() => {
    return () => {
      dispatch(kendaliDokumenResetForm());
    }
  }, [dispatch])
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsRL3_3 = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '60px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Kegiatan</span>,
      selector: (row) => row.reportdisplay,
      sortable: true,
      // width: '60px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah</span>,
      selector: (row) => row.jml,
      sortable: true,
      // width: '60px',
      wrap: true,
    },
  ]

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content laporan-rl3-3">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.3" pageTitle="Forms" />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              vRL3_3.handleSubmit();
              return false;
            }}
            className="gy-4"
            action="#">
            <Card className="p-5">
              <Row>
                <Col lg={3}>
                  <KontainerFlatpickr
                    isError={vRL3_3.touched?.start &&
                      !!vRL3_3.errors?.start}
                    id="start"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vRL3_3.values.start || dateNow}
                    onChange={([newDate]) => {
                      vRL3_3.setFieldValue('start', newDate.toISOString())
                    }}
                  />
                  {vRL3_3.touched?.start
                    && !!vRL3_3.errors.start && (
                      <FormFeedback type="invalid">
                        <div>{vRL3_3.errors.start}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col sm={3}>
                  <KontainerFlatpickr
                    isError={vRL3_3.touched?.end &&
                      !!vRL3_3.errors?.end}
                    id="end"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vRL3_3.values.end || dateNow}
                    onChange={([newDate]) => {
                      vRL3_3.setFieldValue('end', newDate.toISOString())
                    }}
                  />
                  {vRL3_3.touched?.end
                    && !!vRL3_3.errors.end && (
                      <FormFeedback type="invalid">
                        <div>{vRL3_3.errors.end}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <Button type="submit" placement="top" id="tooltipTopPencarian" >
                    CARI
                  </Button>
                  <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12}>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="330px"
                      columns={columnsRL3_3}
                      pagination
                      data={dataGrid || []}
                      progressPending={loadingGrid}
                      customStyles={tableCustomStyles}
                      progressComponent={<LoadingTable />}
                      // onRowClicked={(row) => handleClick(row)}
                      pointerOnHover
                      highlightOnHover
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

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#e67e22',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default RL3_3
