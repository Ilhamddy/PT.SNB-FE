import React, { useEffect, useRef, useState } from 'react'
import withRouter from '../../../Components/Common/withRouter'
import { ToastContainer, toast } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
import { Card, CardBody, CardHeader, Col, Container } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
  getListUnit,
  upsertLocationUnit,
  getListKamar,
  upsertLocationKamar,
  getListTempatTidur,
  upsertLocationTempatTidur,
} from '../../../store/satuSehat/action'

const Location = () => {
  document.title = 'Map Location Satu Sehat'
  const dispatch = useDispatch()
  const {
    data,
    loading,
    dataKamar,
    loadingKamar,
    dataTempatTidur,
    loadingTempatTidur,
  } = useSelector((state) => ({
    data: state.SatuSehat.getListUnit.data || [],
    loading: state.SatuSehat.getListUnit.loading,
    dataKamar: state.SatuSehat.getListKamar.data || [],
    loadingKamar: state.SatuSehat.getListKamar.loading,
    dataTempatTidur: state.SatuSehat.getListTempatTidur.data || [],
    loadingTempatTidur: state.SatuSehat.getListTempatTidur.loading,
  }))
  useEffect(() => {
    dispatch(getListUnit())
    dispatch(getListKamar())
    dispatch(getListTempatTidur())
  }, [dispatch])
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">ID</span>,
      selector: (row) => row.value,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.label,
      sortable: true,
      // width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      sortable: true,
      // width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">IHS ID</span>,
      selector: (row) => row.ihs_id,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">IHS Instalasi</span>,
      selector: (row) => row.ihs_instalasi,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => (
        <button
          className="btn btn-sm btn-soft-info"
          onClick={() => handleClickUpdate(row)}
        >
          Update
        </button>
      ),
    },
  ]
  const columnsKamar = [
    {
      name: <span className="font-weight-bold fs-13">ID</span>,
      selector: (row) => row.id,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kamar</span>,
      selector: (row) => row.namakamar,
      sortable: true,
      // width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      sortable: true,
      // width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">IHS ID</span>,
      selector: (row) => row.ihs_id,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">IHS Ruangan</span>,
      selector: (row) => row.ihs_unit,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => (
        <button
          className="btn btn-sm btn-soft-info"
          onClick={() => handleClickUpdateKamar(row)}
        >
          Update
        </button>
      ),
    },
  ]
  const columnsTempatTidur = [
    {
      name: <span className="font-weight-bold fs-13">ID</span>,
      selector: (row) => row.id,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tempat Tidur</span>,
      selector: (row) => row.reportdisplay,
      sortable: true,
      // width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      sortable: true,
      // width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">IHS ID</span>,
      selector: (row) => row.ihs_id,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">IHS Kamar</span>,
      selector: (row) => row.ihs_kamar,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => (
        <button
          className="btn btn-sm btn-soft-info"
          onClick={() => handleClickUpdateTempatTidur(row)}
        >
          Update
        </button>
      ),
    },
  ]
  const handleClickUpdate = (row) => {
    if (row.ihs_instalasi === null || row.ihs_instalasi === '') {
      toast.error('IHS Instalasi Belum Terdaftar', { autoClose: 3000 })
      return
    }
    if (row.ihs_id !== null && row.ihs_id !== "") {
      toast.error('IHS Sudah Di Mapping', { autoClose: 3000 })
      return
    }
    let values = {
      id: row.value,
      label: row.label,
      description: row.description,
      ihs_instalasi: row.ihs_instalasi,
      objectinstalasifk: row.objectinstalasifk,
    }
    dispatch(
      upsertLocationUnit(values, () => {
        dispatch(getListUnit())
      })
    )
  }
  const handleClickUpdateKamar = (row) => {
    if (row.ihs_unit === null || row.ihs_unit === '') {
      toast.error('IHS Unit Belum Terdaftar', { autoClose: 3000 })
      return
    }
    if (row.ihs_id !== null) {
      toast.error('IHS Sudah Di Mapping', { autoClose: 3000 })
      return
    }
    let values = {
      id: row.id,
      label: row.namakamar,
      description: row.description,
      ihs_unit: row.ihs_unit,
      namaunit: row.namaunit,
      ihs_instalasi: row.ihs_instalasi,
      codekelas: row.kelas_bpjs,
      displaykelas: row.namakelas,
    }
    dispatch(
      upsertLocationKamar(values, () => {
        dispatch(getListKamar())
      })
    )
  }
  const handleClickUpdateTempatTidur = (row) => {
    if (row.ihs_kamar === null || row.ihs_kamar === '') {
      toast.error('IHS Kamar Belum Terdaftar', { autoClose: 3000 })
      return
    }
    if (row.ihs_id !== null) {
      toast.error('IHS Sudah Di Mapping', { autoClose: 3000 })
      return
    }
    let values = {
      id: row.id,
      label: row.reportdisplay,
      description: row.description,
      ihs_unit: row.ihs_unit,
      namaunit: row.namaunit,
      ihs_instalasi: row.ihs_instalasi,
      codekelas: row.kelas_bpjs,
      displaykelas: row.namakelas,
    }
    dispatch(
      upsertLocationTempatTidur(values, () => {
        dispatch(getListTempatTidur())
      })
    )
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Map Location Satu Sehat" pageTitle="Forms" />
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>
                Map Location Unit
              </h4>
            </CardHeader>
            <CardBody>
              <Col lg={12}>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={columns}
                    pagination
                    data={data}
                    progressPending={loading}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    // onRowClicked={(row) => handleClick(row)}
                    pointerOnHover
                    highlightOnHover
                  />
                </div>
              </Col>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>
                Map Location Kamar Rawat Inap
              </h4>
            </CardHeader>
            <CardBody>
              <Col lg={12}>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={columnsKamar}
                    pagination
                    data={dataKamar}
                    progressPending={loadingKamar}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    // onRowClicked={(row) => handleClick(row)}
                    pointerOnHover
                    highlightOnHover
                  />
                </div>
              </Col>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>
                Map Location Tempat Tidur Rawat Inap
              </h4>
            </CardHeader>
            <CardBody>
              <Col lg={12}>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={columnsTempatTidur}
                    pagination
                    data={dataTempatTidur}
                    progressPending={loadingTempatTidur}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    // onRowClicked={(row) => handleClick(row)}
                    pointerOnHover
                    highlightOnHover
                  />
                </div>
              </Col>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(Location)
