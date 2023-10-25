import { ToastContainer } from 'react-toastify'
import { Button, Card, Container, FormFeedback, Input, Row } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useEffect } from 'react'
import { getAllKamar, getComboDaftarKamar } from '../../store/sysadmin/action'
import { useDispatch, useSelector } from 'react-redux'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import DataTable from 'react-data-table-component'

const DaftarKamar = () => {
  const { dataKamar, comboDaftarKamar } = useSelector((state) => ({
    dataKamar: state.Sysadmin.getAllKamar.data?.kamar || [],
    comboDaftarKamar: state.Sysadmin.getComboDaftarKamar?.data || null,
  }))
  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      kelas: '',
      unit: '',
      kamar: '',
    },
    onSubmit: (values) => {
      dispatch(getAllKamar(values))
    },
  })
  useEffect(() => {
    dispatch(getAllKamar(vFilter.initialValues))
    dispatch(getComboDaftarKamar())
  }, [dispatch, vFilter.initialValues])
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Id Kamar</span>,
      selector: (row) => row.idkamar,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kelas</span>,
      selector: (row) => row.namakelas,
      sortable: true,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Kamar</span>,
      selector: (row) => row.namakamar,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status Enabled</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Tidak Aktif'),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aksi</span>,
      cell: (row) => (
        <Button color="info" onClick={() => {}}>
          Edit
        </Button>
      ),
      sortable: false,
      width: '150px',
    },
  ]
  return (
    <div className="page-content page-daftar-kamar">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Daftar Kamar" pageTitle="Kamar" />
        <Card className="p-5">
          <Row>
            <ColLabelInput lg={3} label={'Kelas'} inputId={'kelas'}>
              <CustomSelect
                id="kelas"
                name="kelas"
                options={comboDaftarKamar?.kelas || []}
                onChange={(e) => {
                  vFilter.setFieldValue('kelas', e?.value || '')
                }}
                value={vFilter.values.kelas}
                className={`input row-header ${
                  !!vFilter?.errors.kelas ? 'is-invalid' : ''
                }`}
              />
              {vFilter.touched.kelas && !!vFilter.errors.kelas && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.kelas}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={3} label={'Unit'} inputId={'unit'}>
              <CustomSelect
                id="unit"
                name="unit"
                options={comboDaftarKamar?.unit || []}
                onChange={(e) => {
                  vFilter.setFieldValue('unit', e?.value || '')
                }}
                value={vFilter.values.unit}
                className={`input row-header ${
                  !!vFilter?.errors.unit ? 'is-invalid' : ''
                }`}
              />
              {vFilter.touched.unit && !!vFilter.errors.unit && (
                <FormFeedback type="invalid">
                  <div>{vFilter.errors.unit}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput lg={3} label={'kamar'} inputId={'kamar'}>
              <div className="search-box ms-2">
                <Input
                  className="search"
                  id="kamar"
                  name="kamar"
                  type="text"
                  value={vFilter.values.kamar}
                  placeholder="Search..."
                  onChange={(e) => {
                    vFilter.setFieldValue('kamar', e.target.value)
                  }}
                  invalid={vFilter.touched?.kamar && !!vFilter.errors?.kamar}
                />
                {vFilter.touched?.kamar && !!vFilter.errors.kamar && (
                  <FormFeedback type="invalid">
                    <div>{vFilter.errors.kamar}</div>
                  </FormFeedback>
                )}
                <i className="ri-search-line search-icon"></i>
              </div>
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button
                color="info"
                onClick={() => {
                  vFilter.handleSubmit()
                }}
              >
                Cari
              </Button>
            </ColLabelInput>
            <ColLabelInput lg="auto">
              <Button color="info">Tambah</Button>
            </ColLabelInput>
          </Row>
          <Row>
            <DataTable
              className="mt-4"
              columns={columns}
              pagination
              data={dataKamar}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'unit'} />}
            />
          </Row>
        </Card>
      </Container>
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

export default DaftarKamar
