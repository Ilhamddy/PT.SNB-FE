import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip, ListGroup, ListGroupItem
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import CustomSelect from '../../Select/Select';
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    comboLaboratoriumGet, saveNilaiNormalLaboratorium,laboratoriumResetForm,
    listMasterDetailLayLab
} from '../../../store/actions';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import LoadingTable from '../../../Components/Table/LoadingTable';
import ColLabelInput from '../../../Components/ColLabelInput/ColLabelInput';
import TableContainer from '../../../Components/Common/TableContainer';

const MasterNilaiNormal = () => {
    const { idproduk, layanan, kodeexternal, detailjenis } = useParams();
    document.title = "Master Detail Layanan Lab";
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    const { data, loading, error,
        newDataNilai, loadingDataNilai, successDataNilai, errorDataNilai,
        dataLayLab } = useSelector((state) => ({
            data: state.Laboratorium.comboLaboratoriumGet.data,
            loading: state.Laboratorium.comboLaboratoriumGet.loading,
            newDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.newData,
            loadingDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.loading,
            successDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.success,
            errorDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.error,
            dataLayLab: state.Laboratorium.listMasterDetailLayLab.data,
        }));
        useEffect(() => {
            dispatch(comboLaboratoriumGet(''));
        }, [dispatch])
    const [rows, setRows] = useState([{
        id: 1, kode: `1`, nama: `${layanan}`, kodesatusehat: '', satuan: '', kelompokumur: '', aksi: '', statusDisable: true,
        level: 1, urutan: 1, lastUrutan: 1, lastTombol: false, lastId: 1, objectinduk: 1
    }]);
    const handleDeleteRow = (id, eObjectInduk) => {
        let filteredRows = rows.filter((row) => row.id !== id);
        let filteredData = filteredRows.filter((item) => item.objectinduk === eObjectInduk);
        const maxId = filteredData.reduce((max, item) => (item.id > max ? item.id : max), 0);
        filteredRows = filteredRows.map((row) =>
            // ({ ...row, lastTombol: (row.id === tempId) })
            row.id === eObjectInduk ? { ...row, lastId: maxId, lastUrutan: filteredData.length } : row
        );
        filteredRows = filteredRows.map((row) =>
            // ({ ...row, lastTombol: (row.id === tempId) })
            row.id === maxId ? { ...row, lastTombol: true } : row
        );
        setRows(filteredRows);
    };

    const handleAddRow = (eId, eLevel, eUrutan, eLUrutan) => {
        console.log(rows)
        if (eLevel === 1) {
            let tempId = '';

            let updatedRows = rows.map((row) =>
                row.id === eId ? {
                    ...row,
                    lastUrutan: eLUrutan + 1,
                    lastId: rows.length + 1
                } : row
            );
            const newRow = {
                id: rows.length + 1,
                kode: `1.` + (parseFloat(eLUrutan) + 1),
                nama: ``, kodesatusehat: '',satuan: '',
                kelompokumur: '',
                aksi: '',
                statusDisable: false,
                level: eLevel + 1, urutan: parseFloat(eLUrutan) + 1, lastUrutan: 0, lastTombol: true,
                lastId: 1,
                objectinduk: eId
            };
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === eId) {
                    tempId = rows[i].lastId;
                }
            }
            updatedRows = [...updatedRows, newRow]
            // setRows([...updatedRows, newRow]);
            if (rows.length > 1) {
                updatedRows = updatedRows.map((row) =>
                    // ({ ...row, lastTombol: (row.id === tempId) })
                    row.id === tempId ? { ...row, lastTombol: false } : row
                );
            }
            setRows([...updatedRows]);
            // console.log(rows)
        } else if (eLevel === 2) {
            let tempId = '';

            let updatedRows = rows.map((row) =>
                row.id === eId ? {
                    ...row,
                    lastUrutan: eLUrutan + 1,
                    lastId: rows.length + 1,
                    lastTombol: false
                } : row
            );
            const newRow = {
                id: rows.length + 1,
                kode: `1.${eUrutan}.` + (parseFloat(eLUrutan) + 1),
                nama: ``, kodesatusehat: '',satuan: '',
                kelompokumur: '',
                aksi: '',
                statusDisable: false,
                level: eLevel + 1, urutan: parseFloat(eLUrutan) + 1, lastUrutan: 0, lastTombol: true,
                lastId: 1,
                objectinduk: eId
            };
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === eId) {
                    tempId = rows[i].lastId;
                }
            }
            updatedRows = [...updatedRows, newRow]
            // setRows([...updatedRows, newRow]);

            if (rows.length > 1) {
                updatedRows = updatedRows.map((row) =>
                    // ({ ...row, lastTombol: (row.id === tempId) })
                    row.id === tempId ? { ...row, lastTombol: false } : row
                );
            }
            setRows([...updatedRows]);
            // console.log(updatedRows)

        }
    };

    const handleInputChange = (id, nama, value) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, [nama]: value } : row
        );
        setRows(updatedRows);
    };
    const handleBack = () => {
        history("/laboratorium/masterlayananlab");
    };
    const handleClickSimpan = () => {
        let tempValue = {
            data: rows,
            objectproduk: idproduk
        }
        dispatch(saveNilaiNormalLaboratorium(tempValue));
    }
    const handleSelectSatuan = (eValue, eId, eNama) => {
        const updatedRows = rows.map((row) =>
            row.id === eId ? { ...row, [eNama]: eValue } : row
        );
        setRows(updatedRows);
    };

    rows.sort((a, b) => {
        // Convert the "kode" strings into arrays of numbers to compare the segments
        const kodeA = a.kode.split('.').map(Number);
        const kodeB = b.kode.split('.').map(Number);

        // Compare each segment of the "kode" arrays
        for (let i = 0; i < Math.max(kodeA.length, kodeB.length); i++) {
            const segmentA = kodeA[i] || 0; // If a segment is missing, consider it as 0
            const segmentB = kodeB[i] || 0;

            if (segmentA !== segmentB) {
                return segmentA - segmentB; // Compare segments and return the result
            }
        }

        return 0; // Return 0 if the two objects have the same "kode"
    });
    const [pillsTab, setpillsTab] = useState("1");
    const taskWidgets = [
        {
            id:1,
            label: "Kode Satusehat",
        },
        {
            id:2,
            label: "Spesimen",
        },
    ];
    const tabToggle = (newTab) => {
        if (pillsTab !== newTab) {
            setpillsTab(newTab);
        }
    };
    const columns = [
        {
          name: <span className="font-weight-bold fs-13">No.</span>,
          sortable: true,
          selector: (row) => row.no,
          width: '100px',
        },
        {
            name: <span className="font-weight-bold fs-13">ID</span>,
            sortable: true,
            selector: (row) => row.id,
            width: '100px',
          },
        {
          name: <span className="font-weight-bold fs-13">Nama Pemeriksaan</span>,
          selector: (row) => row.label,
          sortable: true,
        //   width: '100px',
            wrap: true,
        },
        {
          name: <span className="font-weight-bold fs-13">Nama Pemeriksaan (International)</span>,
          selector: (row) => row.display,
          sortable: true,
        //   width: '150px',
            wrap: true,
        },
        {
          name: <span className="font-weight-bold fs-13">Kode Satusehat</span>,
          selector: (row) => row.code,
          sortable: true,
        //   width: '150px',
        },
    ]
    const columnsSpesimen = [
        {
          name: <span className="font-weight-bold fs-13">No.</span>,
          sortable: true,
          selector: (row) => row.no,
          width: '100px',
        },
        {
          name: <span className="font-weight-bold fs-13">Spesimen</span>,
          selector: (row) => row.label,
          sortable: true,
        //   width: '100px',
            wrap: true,
        },
        {
          name: <span className="font-weight-bold fs-13">Kode Spesimen</span>,
          selector: (row) => row.code,
          sortable: true,
        //   width: '150px',
        },
    ]
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Master Detail Layanan Lab" pageTitle="Forms" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Master Detail Layanan Lab <span style={{ color: '#FFCB46' }}> </span></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={4}>
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
                                            </Col>
                                            <Col lg={8}></Col>
                                            <Col lg={12}>
                                                <Table className="table-sm table-borderless mb-0" id="tab_logic">
                                                    <thead>
                                                        <tr>
                                                            {/* <th className="text-center">No</th> */}
                                                            <th className="text-center">Kode</th>
                                                            <th className="text-center">Nama Pemeriksaan</th>
                                                            <th className="text-center">Kode Satusehat</th>
                                                            <th className="text-center">Satuan</th>
                                                            <th className="text-center">Kelompok Umur</th>
                                                            <th className="text-center">Aksi</th>
                                                            {/* <th className="text-center">test</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row) => (
                                                            <tr key={row.id} className="text-center">
                                                                {/* <td>{row.id}</td> */}
                                                                <td>
                                                                    {row.kode}
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        name="nama"
                                                                        value={row.nama}
                                                                        placeholder="Enter nama"
                                                                        className="form-control"
                                                                        // disabled={row.statusDisable}
                                                                        onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CustomSelect
                                                                        id="kodesatusehat"
                                                                        name="kodesatusehat"
                                                                        options={data.kodesatusehat}
                                                                        value={row.kodesatusehat}
                                                                        onChange={value => handleSelectSatuan(value.value, row.id, 'kodesatusehat')}
                                                                    // onInputChange={handleDiagnosaix}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CustomSelect
                                                                        id="satuan"
                                                                        name="satuan"
                                                                        options={data.datasatuan}
                                                                        value={row.satuan}
                                                                        onChange={value => handleSelectSatuan(value.value, row.id, 'satuan')}
                                                                    // onInputChange={handleDiagnosaix}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CustomSelect
                                                                        id="kelompokumur"
                                                                        name="kelompokumur"
                                                                        options={data.datakelumur}
                                                                        value={row.kelompokumur}
                                                                        onChange={value => handleSelectSatuan(value.value, row.id, 'kelompokumur')}
                                                                    // onInputChange={handleDiagnosaix}
                                                                    />
                                                                </td>
                                                                {/* <td>
                                                                    {row.lastUrutan}
                                                                </td> */}
                                                                <td>
                                                                    {row.statusDisable ? (
                                                                        <Button type="button" style={{ backgroundColor: 'green' }} color='info' placement="top"
                                                                            onClick={(e) => handleAddRow(row.id, row.level, row.urutan, row.lastUrutan)}>
                                                                            Tambah Sub
                                                                        </Button>
                                                                    ) :
                                                                        <>
                                                                            {row.level < 3 ? (
                                                                                <Button type="button" style={{ backgroundColor: 'green' }} color='info' placement="top"
                                                                                    onClick={(e) => handleAddRow(row.id, row.level, row.urutan, row.lastUrutan)}>
                                                                                    Tambah Sub
                                                                                </Button>
                                                                            ) :
                                                                                null
                                                                            }
                                                                        </>

                                                                    }
                                                                </td>
                                                                {row.id > 1 && row.lastTombol ? (
                                                                    <td>
                                                                        <Button type="button" style={{ backgroundColor: 'red' }} color='info' placement="top"
                                                                            onClick={() => handleDeleteRow(row.id, row.objectinduk)}>
                                                                            Hapus
                                                                        </Button>
                                                                    </td>
                                                                ) : null}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col>
                                                <Button type="button" color='info' placement="top" id="tooltipTopPencarian"
                                                    onClick={handleClickSimpan}
                                                >
                                                    Simpan
                                                </Button>
                                                <Button type="button" color='danger' placement="top" onClick={handleBack}>
                                                    Back
                                                </Button>

                                            </Col>
                                        </Row>
                                    </div>
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
                                                                    <input type="text" className="form-control search"
                                                                        placeholder="Nama / Kode Pemeriksaan" 
                                                                        // onChange={event => setSearch(event.target.value)}
                                                                        // onKeyDown={handleFilter} 
                                                                        />
                                                                    <i className="ri-search-line search-icon"></i>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="700px"
                                                        columns={columns}
                                                        pagination
                                                        data={data?.kodesatusehat}
                                                        progressPending={loading}
                                                        progressComponent={<LoadingTable />}
                                                        customStyles={tableCustomStyles}
                                                        pointerOnHover
                                                        highlightOnHover
                                                    />
                                                    {/* <TableContainer
                                                    columns={columns}
                                                    data={(data?.kodesatusehat || [])}
                                                    isGlobalFilter={true}
                                                    isAddUserList={false}
                                                    customPageSize={10}
                                                    divClass="table-responsive mb-1"
                                                    tableClass="mb-0 align-middle table-borderless"
                                                    theadClass="table-light text-muted"
                                                    isProductsFilter={true}
                                                    SearchPlaceholder="Search Product..."
                                                    /> */}
                                                    </CardBody>
                                                </Card>
                                            </TabPane>
                                        </TabContent>
                                        <TabContent activeTab={pillsTab} className="text-muted">
                                            <TabPane tabId="2">
                                                <Card>
                                                    <CardBody>
                                                    <Col lg={"auto"} className='mb-2'>
                                                            <div className="d-flex justify-content-sm-end">
                                                                <div className="search-box ms-2">
                                                                    <input type="text" className="form-control search"
                                                                        placeholder="Nama / Kode Spesimen" 
                                                                        // onChange={event => setSearch(event.target.value)}
                                                                        // onKeyDown={handleFilter} 
                                                                        />
                                                                    <i className="ri-search-line search-icon"></i>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="700px"
                                                        columns={columnsSpesimen}
                                                        pagination
                                                        data={data?.spesimen}
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
const LazyTabPane = ({activeTab, children, ...rest}) => {
    if (activeTab === undefined || activeTab === null) throw new Error("activeTab harus diisi")
    return (
        <TabPane {...rest}>
            {rest.tabId === activeTab && 
                children
            }                   
        </TabPane>
    )
}
export default withRouter(MasterNilaiNormal)