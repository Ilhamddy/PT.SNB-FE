import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
import DataTable from 'react-data-table-component';
import {
    listDetailKelUmurGet
} from '../../../store/actions';

const DetailKelompokUmur = ({idkelompokumur}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { data, loading, error,
        newDataSave, loadingSave, successSave,dataState } = useSelector((state) => ({
            data: state.Laboratorium.listDetailKelUmurGet.data,
            loading: state.Laboratorium.listDetailKelUmurGet.loading,
            newDataSave: state.Laboratorium.saveMasterKelUmurLaboratorium.newData,
            successSave: state.Laboratorium.saveMasterKelUmurLaboratorium.success,
            loadingSave: state.Laboratorium.saveMasterKelUmurLaboratorium.loading,
        }));
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            namakelompokumur: newDataSave?.namakelompokumur ?? '',
            status_enabled: newDataSave?.status_enabled ?? '',
        },
        validationSchema: Yup.object({
            namakelompokumur: Yup.string().required("Kelompok Umur Belum Diisi"),
            status_enabled: Yup.string().required("Status Enabled Belum Diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            // dispatch(saveMasterKelUmurLaboratorium(values, ''));
            resetForm({ values: '' })
            handleClickReset()
        }
    })

    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {

            // dispatch(masterPelayananLaboratoriumGet(`${search}`));

        }
    }

    const handleClickReset = (e) => {
        validation.setFieldValue('status_enabled', '')
        validation.setFieldValue('namakelompokumur', '')
        // refStatusEnabled.current?.clearValue();

    };
    useEffect(() => {
        if (newDataSave !== null) {
            // dispatch(comboLaboratoriumGet(''));
        }
    }, [newDataSave, dispatch])
    // console.log(validation.errors)
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
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kelompok Umur</span>,
            selector: row => row.label,
            sortable: true,
            width: "350px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Enabled</span>,
            selector: row => row.status,
            sortable: true,
            width: "100px"
        },
    ];
    // useEffect(() => {
    //     dispatch(comboLaboratoriumGet(''));
    // }, [dispatch])
    return (
        <React.Fragment>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
                className="gy-4"
                action="#">
                <Row>
                    <Col lg={12}>
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={3} style={{ textAlign: 'left' }}>
                                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">{idkelompokumur} Detail Kelompok Umur</Label>
                                    </Col>
                                    <Col lg={3} className="mb-2">
                                        <Input
                                            id="detailkelompokumur"
                                            name="detailkelompokumur"
                                            type="string"
                                            placeholder="Masukkan Detail"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.detailkelompokumur || ""}
                                            invalid={
                                                validation.touched.detailkelompokumur && validation.errors.detailkelompokumur ? true : false
                                            }
                                        />
                                        {validation.touched.detailkelompokumur && validation.errors.detailkelompokumur ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.detailkelompokumur}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col lg={3} style={{ textAlign: 'left' }}>
                                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">Umur Min</Label>
                                    </Col>
                                    <Col lg={3} className="mb-2">
                                        <Input
                                            id="umurmin"
                                            name="umurmin"
                                            type="string"
                                            placeholder="Masukkan Nilai Min"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.umurmin || ""}
                                            invalid={
                                                validation.touched.umurmin && validation.errors.umurmin ? true : false
                                            }
                                        />
                                        {validation.touched.umurmin && validation.errors.umurmin ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.umurmin}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col lg={3} style={{ textAlign: 'left' }}>
                                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">Status Umur</Label>
                                    </Col>
                                    <Col lg={3} className="mb-2">
                                        <Input
                                            id="statusumur"
                                            name="statusumur"
                                            type="string"
                                            placeholder="Masukkan Status Umur"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.statusumur || ""}
                                            invalid={
                                                validation.touched.statusumur && validation.errors.statusumur ? true : false
                                            }
                                        />
                                        {validation.touched.statusumur && validation.errors.statusumur ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.statusumur}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col lg={3} style={{ textAlign: 'left' }}>
                                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">Umur Max</Label>
                                    </Col>
                                    <Col lg={3} className="mb-2">
                                        <Input
                                            id="umurmax"
                                            name="umurmax"
                                            type="string"
                                            placeholder="Masukkan Nilai Min"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.umurmax || ""}
                                            invalid={
                                                validation.touched.umurmax && validation.errors.umurmax ? true : false
                                            }
                                        />
                                        {validation.touched.umurmax && validation.errors.umurmax ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.umurmax}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                            </Col>
                            <Col lg={2}>
                                <Button type="submit" style={{ backgroundColor: '#192a56', textAlign: 'right' }} className="rounded-pill" placement="top">
                                    Tambah
                                </Button>
                            </Col>
                            <Col lg={2}>
                                <Button type="button" color='danger' style={{ textAlign: 'right' }} className="rounded-pill" placement="top">
                                    Batal
                                </Button>
                            </Col>
                            <Col lg={2}>
                                <Button type="button" color='danger' style={{ textAlign: 'right' }} className="rounded-pill" placement="top">
                                    Hapus
                                </Button>
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
            </Form>
        </React.Fragment>
    )
}

export default (DetailKelompokUmur)