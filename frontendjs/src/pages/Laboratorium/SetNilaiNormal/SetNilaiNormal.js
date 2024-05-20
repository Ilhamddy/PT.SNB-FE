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
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect';
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    listSetNilaiNormalGet, listSetNilaiNormalDetailGet, laboratoriumResetForm,
    saveSetMasterNilaiNormalLab
} from '../../../store/actions';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const SetNilaiNormal = () => {
    const { idproduk, layanan, kodeexternal, detailjenis } = useParams();
    document.title = "Set Nilai Normal";
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    const { data, loading, error, dataDetail, loadingDetail,
        newDataSave, loadingSave, successSave } = useSelector((state) => ({
            data: state.Laboratorium.listSetNilaiNormalGet.data,
            loading: state.Laboratorium.listSetNilaiNormalGet.loading,
            newDataSave: state.Laboratorium.saveSetMasterNilaiNormalLab.newData,
            successSave: state.Laboratorium.saveSetMasterNilaiNormalLab.success,
            loadingSave: state.Laboratorium.saveSetMasterNilaiNormalLab.loading,
            dataDetail: state.Laboratorium.listSetNilaiNormalDetailGet.data,
            loadingDetail: state.Laboratorium.listSetNilaiNormalDetailGet.loading,
        }));
        const [stateButtonSimpan, setstateButtonSimpan] = useState(false)
    const handleClickSelected = (row) => {
        setRowsL([])
        setRowsP([])
        dispatch(listSetNilaiNormalDetailGet(`${row.id}&kelompokumur=${row.objectkelompokumurfk}`));
        setstateButtonSimpan(true)
        vSetHeaderNilaiNormal.setFieldValue('namaPemeriksaan', row.reportdisplay)
        vSetHeaderNilaiNormal.setFieldValue('idnamaPemeriksaan', row.id)
    };
    const columns = [

        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kode</span>,
            selector: row => row.kodeexternal,
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Pemeriksaan</span>,
            // selector: row => row.label,
            selector: row => (<button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClickSelected(row)}>{row.reportdisplay}</button>),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan</span>,
            selector: row => row.satuan,
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kelompok Umur</span>,
            selector: row => row.kelompokumur,
            sortable: true,
            width: "150px"
        },
    ];
    
    useEffect(() => {
        dispatch(listSetNilaiNormalGet(idproduk));
    }, [idproduk, dispatch])

    const vSetHeaderNilaiNormal = useFormik({
        enableReinitialize: true,
        initialValues: {
            metode: "",
            tipedata: "",
            namaPemeriksaan:'',
            idnamaPemeriksaan:''
        },
        validationSchema: Yup.object({
            metode: Yup.string().required("Metode harus diisi"),
            tipedata: Yup.string().required("Tipe Data harus diisi")
        }),
        onSubmit: (values) => {
            // console.log(values);
            handleClickSimpan(values)
            // dispatch(saveSetMasterNilaiNormalLab(values, () => {
            //     // dispatch(lainLainGet())
            // }));

        }
    })
    const handleClickSimpan = (temp) => {
        let tempValue = {
            header: temp,
            datal: rowsL,
            datap: rowsP
        }
        dispatch(saveSetMasterNilaiNormalLab(tempValue));
    }
    const listTipeData = [
        { label: "Integer", value: 1 },
        { label: "String", value: 2 }
    ];
    const reftipedata = useRef(null);
    const [rowsL, setRowsL] = useState([]);
    const [rowsP, setRowsP] = useState([]);
    useEffect(() => {
        if(dataDetail!== undefined){
            setRowsL(dataDetail.datal)
            setRowsP(dataDetail.datap)
        }
    }, [dataDetail,dispatch])
    const handleInputChange = (id, nama, value) => {
        const updatedRows = rowsL.map((row) =>
            row.id === id ? { ...row, [nama]: value } : row
        );
        setRowsL(updatedRows);
        console.log(rowsL)
    };
    const handleInputChangeP = (id, nama, value) => {
        const updatedRows = rowsP.map((row) =>
            row.id === id ? { ...row, [nama]: value } : row
        );
        setRowsP(updatedRows);
        // console.log(rowsL)
    };
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Set Nilai Normal" pageTitle="Forms" />
                    <Row className="gy-3">
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <div className="live-preview">
                                    <Row>
                                        <Col>
                                            <h4 className="card-title mb-0 flex-grow-1 mb-3">Set Nilai Normal <span style={{ color: '#FFCB46' }}> </span></h4>
                                        </Col>
                                    </Row>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className='mb-2'>
                                    <Row>
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
                                        <Col lg={5}>
                                            <div id="table-gridjs">
                                                <DataTable
                                                    fixedHeader
                                                    columns={columns}
                                                    pagination
                                                    data={data}
                                                    progressPending={loading}
                                                    customStyles={tableCustomStyles}
                                                    progressComponent={<LoadingTable />}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={7}>
                                            <Card>
                                                <CardHeader className="align-items-center d-flex">
                                                    <div className="live-preview">
                                                        <Row>
                                                            <Col>
                                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Pemeriksaan : {layanan} <span style={{ color: '#FFCB46' }}> </span></h4>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </CardHeader>
                                                <CardBody>
                                                    <Form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            vSetHeaderNilaiNormal.handleSubmit();
                                                            return false;
                                                        }}
                                                        className="gy-4"
                                                        action="#">
                                                        <Col lg={12}>

                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Label className="form-label mt-2"
                                                                        htmlFor="satuan"
                                                                        style={{ color: "black" }}
                                                                    >
                                                                        Jenis Kelamin : Laki-Laki
                                                                    </Label>
                                                                </Col>
                                                                <Col lg={2}>
                                                                    <Label className="form-label mt-2"
                                                                        htmlFor="satuan"
                                                                        style={{ color: "black" }}
                                                                    >
                                                                        Metode
                                                                    </Label>
                                                                </Col>
                                                                <Col lg={2} className="mb-2">
                                                                    <Input
                                                                        id="metode"
                                                                        name="metode"
                                                                        type="string"
                                                                        placeholder="Metode"
                                                                        onChange={vSetHeaderNilaiNormal.handleChange}
                                                                        onBlur={vSetHeaderNilaiNormal.handleBlur}
                                                                        value={vSetHeaderNilaiNormal.values.metode || ""}
                                                                        invalid={
                                                                            vSetHeaderNilaiNormal.touched.metode && vSetHeaderNilaiNormal.errors.metode ? true : false
                                                                        }
                                                                    />
                                                                    {vSetHeaderNilaiNormal.touched.metode && vSetHeaderNilaiNormal.errors.metode ? (
                                                                        <FormFeedback type="invalid"><div>{vSetHeaderNilaiNormal.errors.metode}</div></FormFeedback>
                                                                    ) : null}
                                                                </Col>
                                                                <Col lg={2}>
                                                                    <Label className="form-label mt-2"
                                                                        htmlFor="satuan"
                                                                        style={{ color: "black" }}
                                                                    >
                                                                        Tipe Data
                                                                    </Label>
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <CustomSelect
                                                                        id="tipedata"
                                                                        name="tipedata"
                                                                        options={listTipeData}
                                                                        value={vSetHeaderNilaiNormal.values.tipedata || ""}
                                                                        className={`input ${vSetHeaderNilaiNormal.errors.tipedata ? "is-invalid" : ""}`}
                                                                        onChange={value => {
                                                                            vSetHeaderNilaiNormal.setFieldValue('tipedata', value?.value || "")
                                                                        }}
                                                                        ref={reftipedata}
                                                                    />
                                                                    {vSetHeaderNilaiNormal.touched.tipedata && vSetHeaderNilaiNormal.errors.tipedata ? (
                                                                        <FormFeedback type="invalid"><div>{vSetHeaderNilaiNormal.errors.tipedata}</div></FormFeedback>
                                                                    ) : null}
                                                                </Col>
                                                            </Row>

                                                            <Table className="table-sm table-borderless mb-0" id="tab_logic">
                                                                <thead style={{ backgroundColor: '#FFCB46' }}>
                                                                    <tr>
                                                                        <th className="text-center">Detail Kelompok Umur</th>
                                                                        <th className="text-center">Nilai Min</th>
                                                                        <th className="text-center">Nilai max</th>
                                                                        <th className="text-center">Nilai Text</th>
                                                                        <th className="text-center">Nilai Kritis</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(rowsL || []).map((row) => (
                                                                        <tr key={row.id} className="text-center">
                                                                            <td>
                                                                                {row.detailkelompokumur}
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaimin"
                                                                                    value={row.nilaimin}
                                                                                    placeholder="Nilai Min"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChange(row.id, 'nilaimin', e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaimax"
                                                                                    value={row.nilaimax}
                                                                                    placeholder="Nilai Max"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChange(row.id, 'nilaimax', e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaitext"
                                                                                    value={row.nilaitext}
                                                                                    placeholder="Nilai Text"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChange(row.id, 'nilaitext', e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaikritis"
                                                                                    value={row.nilaikritis}
                                                                                    placeholder="Nilai Kritis"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChange(row.id, 'nilaikritis', e.target.value)}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Col>
                                                        <Col lg={12} className="mb-2">
                                                            <Col lg={3}>
                                                                <Label className="form-label mt-2"
                                                                    htmlFor="satuan"
                                                                    style={{ color: "black" }}
                                                                >
                                                                    Jenis Kelamin : Perempuan
                                                                </Label>
                                                            </Col>
                                                            <Table className="table-sm table-borderless mb-0" id="tab_logic">
                                                                <thead style={{ backgroundColor: '#FFCB46' }}>
                                                                    <tr>
                                                                        <th className="text-center">Detail Kelompok Umur</th>
                                                                        <th className="text-center">Nilai Min</th>
                                                                        <th className="text-center">Nilai max</th>
                                                                        <th className="text-center">Nilai Teks</th>
                                                                        <th className="text-center">Nilai Kritis</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(rowsP || []).map((row) => (
                                                                        <tr key={row.id} className="text-center">
                                                                            <td>
                                                                                {row.detailkelompokumur}
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaimin"
                                                                                    value={row.nilaimin}
                                                                                    placeholder="Nilai Min"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChangeP(row.id, 'nilaimin', e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaimax"
                                                                                    value={row.nilaimax}
                                                                                    placeholder="Nilai Max"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChangeP(row.id, 'nilaimax', e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaitext"
                                                                                    value={row.nilaitext}
                                                                                    placeholder="Nilai Text"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChangeP(row.id, 'nilaitext', e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    name="nilaikritis"
                                                                                    value={row.nilaikritis}
                                                                                    placeholder="Nilai Kritis"
                                                                                    className="form-control"
                                                                                // disabled={row.statusDisable}
                                                                                onChange={(e) => handleInputChangeP(row.id, 'nilaikritis', e.target.value)}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Col>
                                                        {stateButtonSimpan?(
                                                        <Col lg={2}>
                                                            <Button type="submit" style={{ backgroundColor: '#192a56', textAlign: 'right' }} color="info" placement="top">
                                                                Simpan
                                                            </Button>
                                                        </Col>
                                                        ):null}
                                                    </Form>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (SetNilaiNormal)