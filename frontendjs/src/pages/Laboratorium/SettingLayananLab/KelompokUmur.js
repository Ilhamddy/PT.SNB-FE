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
    comboLaboratoriumGet, saveNilaiNormalLaboratorium
} from '../../../store/actions';

const KelompokUmur = () => {
    document.title = "Kelompok Umur";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error } = useSelector((state) => ({
        // data: state.Laboratorium.masterPelayananLaboratoriumGet.data,
        // loading: state.Laboratorium.masterPelayananLaboratoriumGet.loading

    }));
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {

            // dispatch(masterPelayananLaboratoriumGet(`${search}`));

        }
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
                color: "black",
                backgroundColor: "#f1f2f6"
            },

        }
    }
    const columns = [

        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.id,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kelompok Umur</span>,
            selector: row => row.status,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Enabled</span>,
            selector: row => row.kodeexternal,
            sortable: true,
            width: "100px"
        },
    ];
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Tambah Kelompok Umur <span style={{ color: '#e67e22' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='mb-2'>
                                <Row className="g-3">
                                    <Col lg={6}>
                                        <Row className="gy-4">
                                            <Col lg={8}>
                                                <div className="mt-2">
                                                    {/* <div className="d-flex justify-content-sm-start"> */}
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search"
                                                            placeholder="Cari..." onChange={event => setSearch(event.target.value)}
                                                            onKeyDown={handleFilter} />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                    {/* </div> */}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div id="table-gridjs">
                                                    <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="400px"
                                                        columns={columns}
                                                        pagination
                                                        // data={data}
                                                        progressPending={loading}
                                                        customStyles={tableCustomStyles}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Daftar Kelompok Umur <span style={{ color: '#e67e22' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='mb-2'>
                                <Row className="g-3">
                                    <Col lg={6}>
                                        <Row className="gy-4">
                                            <Col lg={8}>
                                                <div className="mt-2">
                                                    {/* <div className="d-flex justify-content-sm-start"> */}
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search"
                                                            placeholder="Cari..." onChange={event => setSearch(event.target.value)}
                                                            onKeyDown={handleFilter} />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                    {/* </div> */}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div id="table-gridjs">
                                                    <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="400px"
                                                        columns={columns}
                                                        pagination
                                                        // data={data}
                                                        progressPending={loading}
                                                        customStyles={tableCustomStyles}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Detail Kelompok Umur <span style={{ color: '#e67e22' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='mb-2'>
                                <Row className="g-3">
                                    <Col lg={6}>
                                        <Row className="gy-4">
                                            <Col lg={8}>
                                                <div className="mt-2">
                                                    {/* <div className="d-flex justify-content-sm-start"> */}
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search"
                                                            placeholder="Cari..." onChange={event => setSearch(event.target.value)}
                                                            onKeyDown={handleFilter} />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                    {/* </div> */}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div id="table-gridjs">
                                                    <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="400px"
                                                        columns={columns}
                                                        pagination
                                                        // data={data}
                                                        progressPending={loading}
                                                        customStyles={tableCustomStyles}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default withRouter(KelompokUmur)