import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UiContent from '../../../Components/Common/UiContent';
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import {
  listSetNilaiNormalGet, laboratoriumResetForm, comboLaboratoriumGet, listMasterDetailLayLab
} from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import classnames from "classnames";

const MasterHasilLab = () => {
  const { idproduk, layanan, kodeexternal, detailjenis } = useParams();
  document.title = "Master Hasil Lab";
  const dispatch = useDispatch();
  const { data, loading, error, dataDetail, loadingDetail,
    newDataSave, loadingSave, successSave,
    dataCombo, loadingCombo, dataLayLab } = useSelector((state) => ({
      data: state.Laboratorium.listSetNilaiNormalGet.data,
      loading: state.Laboratorium.listSetNilaiNormalGet.loading,
      dataCombo: state.Laboratorium.comboLaboratoriumGet.data,
      loadingCombo: state.Laboratorium.comboLaboratoriumGet.loading,
      dataLayLab: state.Laboratorium.listMasterDetailLayLab.data,
    }));
  useEffect(() => {
    dispatch(listSetNilaiNormalGet(idproduk));
    dispatch(comboLaboratoriumGet(''));
  }, [idproduk, dispatch])
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Kode</span>,
      sortable: true,
      selector: (row) => row.kodeexternal,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pemeriksaan</span>,
      sortable: true,
      selector: (row) => row.reportdisplay,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Satuan</span>,
      selector: (row) => row.satuan,
      sortable: true,
      //   width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tipe Hasil Lab</span>,
      selector: (row) => row.jenishasillab,
      sortable: true,
      wrap: true,
    },
  ]
  const columnsHasil = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      sortable: true,
      selector: (row) => row.no,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pemeriksaan</span>,
      sortable: true,
      selector: (row) => row.label,
      // width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kode Hasil Lab</span>,
      selector: (row) => row.code,
      sortable: true,
      //   width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Hasil Lab</span>,
      selector: (row) => row.display,
      sortable: true,
      wrap: true,
    },
  ]
  const columnsMapHasil = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      sortable: true,
      selector: (row) => row.no,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pemeriksaan</span>,
      sortable: true,
      selector: (row) => row.label,
      // width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kode Hasil Lab</span>,
      selector: (row) => row.code,
      sortable: true,
      //   width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Hasil Lab</span>,
      selector: (row) => row.display,
      sortable: true,
      wrap: true,
    },
  ]
  const [layananPemeriksaan, setlayananPemeriksaan] = useState({
    nama: "",
    id: ''
  })
  const handleClickRow = (row) => {
    setlayananPemeriksaan({
      nama: row.reportdisplay,
      id: row.id
    })
    dispatch(listMasterDetailLayLab({ id: row.id }));
  }
  const [pillsTab, setpillsTab] = useState("1");
  const taskWidgets = [
    {
      id: 1,
      label: "Loinc Hasil Lab",
    },
  ];
  const tabToggle = (newTab) => {
    if (pillsTab !== newTab) {
      setpillsTab(newTab);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = dataCombo?.loinchasillab
    ? dataCombo.loinchasillab.filter((item) => {
      const valuesToSearch = [item.label, item.code];
      return valuesToSearch.some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    : [];
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
                    onRowClicked={(row) => handleClickRow(row)}
                    data={data || []}
                    progressPending={loading}
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
                          <li>Pemeriksaan :</li>
                        </th>
                        <td>{layananPemeriksaan.nama}</td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          <li>Pilihan Hasil Pemeriksaan</li>
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columnsMapHasil}
                    pagination
                    data={dataLayLab || []}
                    progressPending={loading}
                    progressComponent={<LoadingTable />}
                    customStyles={tableCustomStyles}
                    pointerOnHover
                    highlightOnHover
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="card-header align-items-center d-flex">
                    <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                      {taskWidgets.map((item, key) => (
                        <NavItem key={key}>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({ active: pillsTab === `${item.id}`, })}
                            onClick={() => { tabToggle(`${item.id}`); }}>
                            <span className="fw-semibold">
                              {item.label}
                            </span>
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </div>
                  <TabContent activeTab={pillsTab} className="text-muted">
                    <TabPane tabId="1">
                      <Card>
                        <CardBody>
                          <Col lg={"auto"} className='mb-2'>
                            <div className="d-flex justify-content-sm-end">
                              <div className="search-box ms-2">
                                <input
                                  type="text"
                                  className="form-control search"
                                  placeholder="Nama / Kode Pemeriksaan"
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <i className="ri-search-line search-icon"></i>
                              </div>
                            </div>
                          </Col>
                          <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="700px"
                            columns={columnsHasil}
                            pagination
                            data={filteredData || []}
                            progressPending={loading}
                            progressComponent={<LoadingTable />}
                            customStyles={tableCustomStyles}
                            pointerOnHover
                            highlightOnHover
                          />
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
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