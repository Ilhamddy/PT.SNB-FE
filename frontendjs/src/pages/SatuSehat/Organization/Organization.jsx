import React, { useEffect, useRef, useState } from 'react'
import withRouter from '../../../Components/Common/withRouter'
import { ToastContainer } from 'react-toastify'
import UiContent from '../../../Components/Common/UiContent'
import { Button, Card, CardBody, CardHeader, Col, Container } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import {
  getListInstalasi,
  upsertOrganizationInstalasi,
} from '../../../store/satuSehat/action'
import { useDispatch, useSelector } from 'react-redux'

const Organization = () => {
  document.title = 'Map Organization Satu Sehat'
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => ({
    data: state.SatuSehat.getListInstalasi.data || [],
    loading: state.SatuSehat.getListInstalasi.loading,
  }))
  useEffect(() => {
    dispatch(getListInstalasi())
    // dispatch(getMapRolePermissions(''))
  }, [dispatch])
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">ID</span>,
      selector: (row) => row.value,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Instalasi</span>,
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
    let values = {
      id: row.value,
      label: row.label,
    }
    dispatch(
      upsertOrganizationInstalasi(values, () => {
        dispatch(getListInstalasi())
      })
    )
  }
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Map Organization Satu Sehat" pageTitle="Forms" />
          <Card>
            <CardHeader className="card-header-snb ">
              <h4 className="card-title mb-0" style={{ color: 'black' }}>
                Map Organization Instalasi
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
export default withRouter(Organization)
