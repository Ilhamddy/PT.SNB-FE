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
  getLaporanRl_3_13,
  kendaliDokumenResetForm,
} from '../../../../store/actions'
import { tableCustomStyles } from '../../../../Components/Table/tableCustomStyles'

const RL3_13 = () => {
  document.title = 'Laporan RL3.11'
  const dispatch = useDispatch()
  const { dataGrid, loadingGrid } = useSelector((state) => ({
    dataGrid: state.KendaliDokumen.getLaporanRl_3_13.data.rowLaporan || [],
    loadingGrid: state.KendaliDokumen.getLaporanRl_3_13.loading,
  }))
  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    initialValues: {
      start: '',
      end: '',
    },
    onSubmit: (values) => {
      console.log(values)
      dispatch(
        getLaporanRl_3_13({
          start: values.start || dateNow,
          end: values.end || dateNow,
        })
      )
    },
  })
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '60px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Golongan Obat</span>,
      selector: (row) => row.label,
      sortable: true,
      width: '200px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Item Obat</span>,
      selector: (row) => row.jumlahItemObat,
      sortable: true,
      width: '200px',
      wrap: true,
    },
    {
      name: (
        <span className="font-weight-bold fs-13">
          Jumlah Item Obat Yang Tersedia di Rumah Sakit
        </span>
      ),
      selector: (row) => row.jumlahItemObatTersedia,
      sortable: true,
      width: '200px',
      wrap: true,
    },
    {
      name: (
        <span className="font-weight-bold fs-13">
          Jumlah Item Obat Formulatorium Yang Tersedia di Rumah Sakit
        </span>
      ),
      selector: (row) => row.jumlahItemObatTersediaFormularium,
      sortable: true,
      width: '200px',
      wrap: true,
    },
  ]
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Laporan RL3.11" pageTitle="Forms" />
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
                <Col lg={12}>
                  <div id="table-gridjs">
                    <DataTable
                      className="mt-3"
                      fixedHeader
                      fixedHeaderScrollHeight="330px"
                      columns={columns}
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

export default RL3_13