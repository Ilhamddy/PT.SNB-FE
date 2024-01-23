import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UiContent from '../../../Components/Common/UiContent';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const MasterHasilLab = () => {
  const { idproduk, layanan, kodeexternal, detailjenis } = useParams();
  document.title = "Master Hasil Lab";

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Kode</span>,
      sortable: true,
      selector: (row) => row.no,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pemeriksaan</span>,
      sortable: true,
      selector: (row) => row.id,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Satuan</span>,
      selector: (row) => row.label,
      sortable: true,
      //   width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tipe Hasil Lab</span>,
      selector: (row) => row.display,
      sortable: true,
      //   width: '150px',
      wrap: true,
    },
  ]

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Master Hasil Lab" pageTitle="Forms" />
          <Row className="gy-2">
            <Col lg={6}>
              <Card>
                <CardBody>
                  <Table className="table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0" scope="row">
                          <li>Nama Layanan</li>
                        </th>
                        <td>: {layanan}</td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          <li>Kode Pemeriksaan</li>
                        </th>
                        <td>: {kodeexternal}</td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          <li>Detail Jenis Produk</li>
                        </th>
                        <td>: {detailjenis}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columns}
                    pagination
                    data={[]}
                    // progressPending={loading}
                    progressComponent={<LoadingTable />}
                    customStyles={tableCustomStyles}
                    pointerOnHover
                    highlightOnHover
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <p><i>* note :
                    Master Hasil Lab ini hanya untuk pemeriksaan yg menggunakan Tipe Hasil Lab : Nominal atau Ordinal</i></p>
                  <Table className="table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0" scope="row">
                          <li>Pemeriksaan</li>
                        </th>
                        <td>: {layanan}</td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          <li>Pilihan Hasil Pemeriksaan</li>
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default (MasterHasilLab)