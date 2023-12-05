
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
  getListUnit, upsertLocationUnit
} from '../../../store/satuSehat/action'

const Location = () => {
  document.title = 'Map Location Satu Sehat'
  const dispatch = useDispatch()
  const {
    data,
    loading,
  } = useSelector((state) => ({
    data: state.SatuSehat.getListUnit.data || [],
    loading: state.SatuSehat.getListUnit.loading,
  }))
  useEffect(() => {
    dispatch(
      getListUnit()
    )
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
      name: "Action",
      sortable: true,
      selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClickUpdate(row)}>Update</button>),
    },
  ]
  const handleClickUpdate = (row) => {
    if (row.ihs_instalasi === null || row.ihs_instalasi === '') {
      toast.error('IHS Instalasi Belum Terdaftar', { autoClose: 3000 })
      return
    }
    let values = {
      id: row.value,
      label: row.label,
      description: row.description,
      ihs_instalasi: row.ihs_instalasi
    }
    dispatch(
      upsertLocationUnit(values, () => {
        dispatch(
          getListUnit()
        )
      })
    )
  };
  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Map Location Satu Sehat" pageTitle="Forms" />
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>Map Location Unit</h4>
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
export default withRouter(Location)