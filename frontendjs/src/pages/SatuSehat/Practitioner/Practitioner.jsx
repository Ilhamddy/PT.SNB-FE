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
  getListPractitioner,
  upsertPractitioner,
} from '../../../store/satuSehat/action'

const Practitioner = () => {
  document.title = 'Map Practitioner Satu Sehat'
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => ({
    data: state.SatuSehat.getListPractitioner.data || [],
    loading: state.SatuSehat.getListPractitioner.loading,
  }))
  useEffect(() => {
    dispatch(getListPractitioner())
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
      name: <span className="font-weight-bold fs-13">IHS ID</span>,
      selector: (row) => row.ihs_id,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      // wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">NIK</span>,
      selector: (row) => row.noidentitas,
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
  const handleClickUpdate = (row) => {
    if (row.ihs_id !== null) {
      toast.error('IHS Ditabel Masih Ada', { autoClose: 3000 })
      return
    } else if (row.noidentitas === null) {
      toast.error('No. Identitas Dokter Belum Ada, Silahkan Isi Dahulu', {
        autoClose: 3000,
      })
      return
    }
    let values = {
      id: row.value,
      label: row.label,
      noidentitas: row.noidentitas,
    }
    dispatch(
      upsertPractitioner(values, () => {
        dispatch(getListPractitioner())
      })
    )
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Map Practitioner Satu Sehat" pageTitle="Forms" />
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>
                Map Practitioner
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
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(Practitioner)
