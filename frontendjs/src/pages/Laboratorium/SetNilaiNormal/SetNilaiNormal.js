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
    listSetNilaiNormalGet, listSetNilaiNormalDetailGet
} from '../../../store/actions';

const SetNilaiNormal = () => {
    const { idproduk, layanan, kodeexternal, detailjenis } = useParams();
    document.title = "Set Nilai Normal";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error, dataDetail, loadingDetail,
        newDataSave, loadingSave, successSave } = useSelector((state) => ({
            data: state.Laboratorium.listSetNilaiNormalGet.data,
            loading: state.Laboratorium.listSetNilaiNormalGet.loading,
            newDataSave: state.Laboratorium.saveMasterKelUmurLaboratorium.newData,
            successSave: state.Laboratorium.saveMasterKelUmurLaboratorium.success,
            loadingSave: state.Laboratorium.saveMasterKelUmurLaboratorium.loading,
            dataDetail: state.Laboratorium.listSetNilaiNormalDetailGet.data,
            loadingDetail: state.Laboratorium.listSetNilaiNormalDetailGet.loading,
        }));
    const handleClickSelected = (row) => {
        dispatch(listSetNilaiNormalDetailGet(`${row.id}&kelompokumur=${row.objectkelompokumurfk}`));
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
    const tableCustomStyles = {
        headRow: {
            style: {
                color: '#ffffff',
                backgroundColor: '#e67e22',
            },
        },
        rows: {
            style: {
                color: "black",
                backgroundColor: "#f1f2f6"
            },

        }
    }
    useEffect(() => {
        dispatch(listSetNilaiNormalGet(idproduk));
    }, [idproduk, dispatch])
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Set Nilai Normal" pageTitle="Forms" />
                    <Row className="g-3">
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <div className="live-preview">
                                    <Row>
                                        <Col>
                                            <h4 className="card-title mb-0 flex-grow-1 mb-3">Set Nilai Normal <span style={{ color: '#e67e22' }}> </span></h4>
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
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={7}>
                                            <Card>
                                                <CardHeader className="align-items-center d-flex">
                                                    <div className="live-preview">
                                                        <Row>
                                                            <Col>
                                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Pemeriksaan : {layanan} <span style={{ color: '#e67e22' }}> </span></h4>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </CardHeader>
                                                <CardBody>
                                                    <Table className="table-sm table-borderless mb-0" id="tab_logic">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-center">No</th>
                                                                <th className="text-center">Detail Kelompok Umur</th>
                                                                <th className="text-center">Nilai Min</th>
                                                                <th className="text-center">Nilai max</th>
                                                                <th className="text-center">Nilai Teks</th>
                                                                <th className="text-center">Nilai Kritis</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataDetail.map((row) => (
                                                                <tr key={row.id} className="text-center">
                                                                    <td>
                                                                        {row.no}
                                                                    </td>
                                                                    <td>
                                                                        {row.detailkelompokumur}
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="nama"
                                                                            // value={row.nama}
                                                                            placeholder="Enter nama"
                                                                            className="form-control"
                                                                        // disabled={row.statusDisable}
                                                                        // onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="nama"
                                                                            // value={row.nama}
                                                                            placeholder="Enter nama"
                                                                            className="form-control"
                                                                        // disabled={row.statusDisable}
                                                                        // onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="nama"
                                                                            // value={row.nama}
                                                                            placeholder="Enter nama"
                                                                            className="form-control"
                                                                        // disabled={row.statusDisable}
                                                                        // onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="nama"
                                                                            // value={row.nama}
                                                                            placeholder="Enter nama"
                                                                            className="form-control"
                                                                        // disabled={row.statusDisable}
                                                                        // onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
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