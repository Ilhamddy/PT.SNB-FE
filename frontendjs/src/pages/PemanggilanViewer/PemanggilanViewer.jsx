import { useState } from 'react'
import './PemanggilanViewer.scss'
import CustomSelect from '../Select/Select'
import { useFormik } from 'formik'
import { Button, Card, Col, FormFeedback, Input, Label, Row } from 'reactstrap'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import * as Yup from 'yup'
import DataTable from 'react-data-table-component'

const PemanggilanViewer = () => {
  const vPemanggilan = useFormik({
    initialValues: {
      loket: '',
      jenis: '',
      antreansekarang: '',
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {},
  })
  const [panggilUlang, setPanggilUlang] = useState('')
  const [norm, setNoRM] = useState('')

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsPemanggilan = [
    {
      name: <span className="font-weight-bold fs-13">Jenis</span>,
      selector: (row) => row.jenis,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Antrean Sisa</span>,
      sortable: true,
      selector: (row) => `${row.antreansisa || ''}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Antrean Terakhir</span>,
      sortable: true,
      selector: (row) => `${row.antreanterakhir || ''}`,
      width: '100px',
    },
  ]
  return (
    <div className="pemanggilan-viewer">
      <h1 className="header-view">Pemanggilan Antrean Pasien</h1>
      <div className="isi-pemanggilan">
        <Row>
          <Col lg={6}>
            <Row>
              <Col sm={6}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor="loket"
                  className="form-label"
                >
                  Loket
                </Label>
                <CustomSelect
                  id="loket"
                  name="loket"
                  options={[]}
                  onChange={(e) => {
                    vPemanggilan.setFieldValue('loket', e?.value || '')
                  }}
                  value={vPemanggilan.values.loket}
                  className={`input row-header mt-2 ${
                    !!vPemanggilan?.errors.loket ? 'is-invalid' : ''
                  }`}
                />
                {vPemanggilan.touched.loket && !!vPemanggilan.errors.loket && (
                  <FormFeedback type="invalid">
                    <div>{vPemanggilan.errors.loket}</div>
                  </FormFeedback>
                )}
                <Label
                  style={{ color: 'black' }}
                  htmlFor="jenis"
                  className="form-label"
                >
                  Jenis
                </Label>
                <CustomSelect
                  id="jenis"
                  name="jenis"
                  options={[]}
                  onChange={(e) => {
                    vPemanggilan.setFieldValue('jenis', e?.value || '')
                  }}
                  value={vPemanggilan.values.jenis}
                  className={`input row-header mt-2 ${
                    !!vPemanggilan?.errors.jenis ? 'is-invalid' : ''
                  }`}
                />
                {vPemanggilan.touched.jenis && !!vPemanggilan.errors.jenis && (
                  <FormFeedback type="invalid">
                    <div>{vPemanggilan.errors.jenis}</div>
                  </FormFeedback>
                )}
                <Button color="info">Panggil Selanjutnya</Button>
              </Col>
              <Col sm={6}>
                <Card>
                  <p>Antrean sekarang</p>
                  <p>S04</p>
                  <p>Loket 1</p>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor="panggilulang"
                  className="form-label"
                >
                  Loket
                </Label>
                <Input
                  id="panggilulang"
                  name="panggilulang"
                  type="text"
                  value={panggilUlang}
                  onChange={(e) => {
                    setPanggilUlang('panggilulang')
                  }}
                  invalid={panggilUlang}
                />
                <Button color="info">Panggil Ulang Antrean</Button>
              </Col>
              <Col sm={6}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor="norm"
                  className="form-label"
                >
                  Input No. RM
                </Label>
                <Input
                  id="norm"
                  name="norm"
                  type="text"
                  value={norm}
                  onChange={(e) => {
                    setNoRM(e.target.value)
                  }}
                />
                <Button color="info">Simpan No RM</Button>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <DataTable
              fixedHeader
              fixedHeaderScrollHeight="700px"
              columns={columnsPemanggilan}
              pagination
              data={[]}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'data order'} />}
            />
          </Col>
        </Row>
      </div>
    </div>
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

export default PemanggilanViewer
