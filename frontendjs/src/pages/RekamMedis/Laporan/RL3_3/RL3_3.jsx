import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../../Components/Common/UiContent'
import { Card, Col, Container, FormFeedback, Row } from 'reactstrap'
import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import Flatpickr from 'react-flatpickr'
import { useFormik } from 'formik'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../../../Components/Table/NoDataTable'
import LoadingTable from '../../../../Components/Table/LoadingTable'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr'

const RL3_3 = () => {
  const [dateNow] = useState(() => new Date().toISOString())

  const vRL3_3 = useFormik({
    initialValues: {
      start: dateNow,
      end: dateNow,
    },
    validationSchema: Yup.object({
      start: Yup.string().required('Tanggal Awal harus diisi'),
      end: Yup.string().required('Tanggal Akhir harus diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

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
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '60px',
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
          <Card>
            <Row>
              <Col lg={3}>
                <KontainerFlatpickr
                  isError={vRL3_3.touched?.start && !!vRL3_3.errors?.start}
                  id="start"
                  options={{
                    dateFormat: 'Y-m-d',
                    defaultDate: 'today',
                  }}
                  value={vRL3_3.values.start}
                  onChange={([newDate]) => {
                    vRL3_3.setFieldValue('start', newDate.toISOString())
                  }}
                />
                {vRL3_3.touched?.start && !!vRL3_3.errors?.start && (
                  <FormFeedback type="invalid">
                    <div>{vRL3_3.errors?.start}</div>
                  </FormFeedback>
                )}
              </Col>
              <Col sm={3}>
                <KontainerFlatpickr
                  isError={vRL3_3.touched?.end && !!vRL3_3.errors?.end}
                  id="end"
                  options={{
                    dateFormat: 'Y-m-d',
                    defaultDate: 'today',
                  }}
                  value={vRL3_3.values.end}
                  onChange={([newDate]) => {
                    vRL3_3.setFieldValue('end', newDate.toISOString())
                  }}
                />
                {vRL3_3.touched?.end && !!vRL3_3.errors.end && (
                  <FormFeedback type="invalid">
                    <div>{'Mencoba'}</div>
                  </FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="700px"
                  columns={columnsRL3_3}
                  data={[]}
                  progressPending={false}
                  progressComponent={<LoadingTable />}
                  customStyles={tableCustomStyles}
                  noDataComponent={<NoDataTable />}
                />
              </Col>
            </Row>
          </Card>
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
