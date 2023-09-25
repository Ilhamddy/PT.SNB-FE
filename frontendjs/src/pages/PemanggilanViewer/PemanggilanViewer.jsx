import { useEffect, useState } from 'react'
import './PemanggilanViewer.scss'
import CustomSelect from '../Select/Select'
import { useFormik } from 'formik'
import { Button, Card, Col, FormFeedback, Input, Label, Row } from 'reactstrap'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import * as Yup from 'yup'
import DataTable from 'react-data-table-component'
import { getComboViewer } from '../../store/master/action'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTerpanggil,
  getLoketSisa,
  panggilLoket,
  panggilUlangAntrian,
} from '../../store/actions'
import { useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import SkalaNyeri from '../../Components/SkalaNyeri/SkalaNyeri'

const PemanggilanViewer = () => {
  const {
    loadingCombo,
    loket,
    jenisLoket,
    sisaLoket,
    loadingSisaLoket,
    lastPemanggilan,
    lastLoket,
    allTerpanggil,
  } = useSelector((state) => ({
    loadingCombo: state.Master.getComboViewer.loading,
    loket: state.Master.getComboViewer.data.loket,
    jenisLoket: state.Master.getComboViewer.data.jenisloket,
    sisaLoket: state.Viewer.getAntreanLoketSisa.data?.loketsisa || [],
    lastPemanggilan: state.Viewer.getAntreanLoketSisa.data?.lastpemanggilan,
    lastLoket: state.Viewer.getAntreanLoketSisa.data?.lastloket,
    loadingSisaLoket: state.Viewer.getAntreanLoketSisa.loading,
    allTerpanggil: state.Viewer.getAllTerpanggil.data?.terpanggil || [],
  }))
  const refPanggilUlang = useRef()
  const dispatch = useDispatch()
  const vPemanggilan = useFormik({
    initialValues: {
      loket: '',
      jenis: '',
      antreansekarang: '',
    },
    validationSchema: Yup.object({
      loket: Yup.string().required('Loket harus diisi!'),
      jenis: Yup.string().required('Jenis harus diisi!'),
    }),
    onSubmit: (values) => {
      dispatch(
        panggilLoket(values, () => {
          dispatch(getLoketSisa())
          dispatch(getAllTerpanggil())
          refPanggilUlang.current?.clearValue()
        })
      )
    },
  })
  const vPanggilUlang = useFormik({
    initialValues: {
      norecantrean: '',
    },
    validationSchema: Yup.object({
      norecantrean: Yup.string().required('No. Rec Antrean harus diisi!'),
    }),
    onSubmit: (values) => {
      dispatch(
        panggilUlangAntrian(values, () => {
          dispatch(getAllTerpanggil())
          dispatch(getLoketSisa())
        })
      )
    },
  })
  const [norm, setNoRM] = useState('')

  useEffect(() => {
    dispatch(getComboViewer())
    dispatch(getLoketSisa())
    dispatch(getAllTerpanggil())
  }, [dispatch])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsPemanggilan = [
    {
      name: <span className="font-weight-bold fs-13">Jenis</span>,
      selector: (row) => row.label,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Antrean Sisa</span>,
      sortable: true,
      selector: (row) => `${row.sisaantrean}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Antrean Terakhir</span>,
      sortable: true,
      selector: (row) => `${row.antreanterakhir}`,
      width: '100px',
    },
  ]
  return (
    <div className="pemanggilan-viewer">
      <ToastContainer />
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
                  options={loket}
                  onChange={(e) => {
                    vPemanggilan.setFieldValue('loket', e?.value || '')
                  }}
                  value={vPemanggilan.values.loket}
                  className={`input row-header ${
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
                  className="form-label mt-3"
                >
                  Jenis
                </Label>
                <CustomSelect
                  id="jenis"
                  name="jenis"
                  options={jenisLoket}
                  onChange={(e) => {
                    vPemanggilan.setFieldValue('jenis', e?.value || '')
                  }}
                  value={vPemanggilan.values.jenis}
                  className={`input row-header ${
                    !!vPemanggilan?.errors.jenis ? 'is-invalid' : ''
                  }`}
                />
                {vPemanggilan.touched.jenis && !!vPemanggilan.errors.jenis && (
                  <FormFeedback type="invalid">
                    <div>{vPemanggilan.errors.jenis}</div>
                  </FormFeedback>
                )}
                <Button
                  color="info"
                  className="w-100 mt-3"
                  onClick={() => vPemanggilan.handleSubmit()}
                >
                  Panggil Selanjutnya
                </Button>
              </Col>
              <Col sm={6}>
                <div className="isi-antrean">
                  <p className="judul">Antrean sekarang</p>
                  <p className="antrean">{lastPemanggilan}</p>
                  <p className="loket">{lastLoket}</p>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={6}>
                <Label
                  style={{ color: 'black' }}
                  htmlFor="panggilulang"
                  className="form-label"
                >
                  Loket
                </Label>
                <CustomSelect
                  ref={refPanggilUlang}
                  id="norecantrean"
                  name="norecantrean"
                  options={allTerpanggil}
                  onChange={(e) => {
                    vPanggilUlang.setFieldValue('norecantrean', e?.value || '')
                  }}
                  value={vPanggilUlang.values.norecantrean}
                  className={`input row-header ${
                    !!vPanggilUlang?.errors.norecantrean ? 'is-invalid' : ''
                  }`}
                />
                {vPanggilUlang.touched.norecantrean &&
                  !!vPanggilUlang.errors.norecantrean && (
                    <FormFeedback type="invalid">
                      <div>{vPanggilUlang.errors.norecantrean}</div>
                    </FormFeedback>
                  )}
                <Button
                  color="info"
                  className="w-100 mt-3"
                  onClick={() => vPanggilUlang.handleSubmit()}
                >
                  Panggil Ulang Antrean
                </Button>
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
                <Button
                  color="success"
                  className="w-100 mt-3"
                  onClick={() => {}}
                >
                  Simpan No RM
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <DataTable
              fixedHeader
              fixedHeaderScrollHeight="700px"
              columns={columnsPemanggilan}
              pagination
              data={sisaLoket}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'pemanggilan'} />}
            />
          </Col>
        </Row>
        <SkalaNyeri />
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
