import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import DataTable from 'react-data-table-component';
import CustomSelect from '../../Select/Select';

import { emrDiagnosaixSave, emrResetForm, emrComboGet, emrDiagnosaixGet } from "../../../store/actions";

const Diagnosaix = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo, dataDiagnosa,
        loadingDiagnosa, successDiagnosa } = useSelector((state) => ({
            newData: state.Emr.emrDiagnosaixSave.newData,
            success: state.Emr.emrDiagnosaixSave.success,
            loading: state.Emr.emrDiagnosaixSave.loading,
            dataDiagnosa: state.Emr.emrDiagnosaixGet.data,
            loadingDiagnosa: state.Emr.emrDiagnosaixGet.loading,
            successDiagnosa: state.Emr.emrDiagnosaixGet.success,
        }));

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (norecdp) {
            dispatch(emrDiagnosaixGet('', 'diagnosa9'));
        }
    }, [norecdp, dispatch])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            tipediagnosa: editData?.tipediagnosa ?? '',
            idlabel: 3,
            label: 'DIAGNOSA',
        },
        validationSchema: Yup.object({
            tipediagnosa: Yup.string().required("Tipe Diagnosa Belum Diisi"),

        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            dispatch(emrDiagnosaixSave(values, ''));
            resetForm({ values: '' })
        }
    })
    const handleClick = (e) => {
        // validation.setFieldValue('subjective', e.subjective)
        // validation.setFieldValue('objective', e.objective)
        // validation.setFieldValue('assesment', e.assesment)
        // validation.setFieldValue('plan', e.plan)
        // validation.setFieldValue('norec', e.norec)
        // validation.setFieldValue('objectemrfk', e.objectemrfk)
        console.log(e)
    };
    const handleClickReset = (e) => {
        // validation.setFieldValue('subjective', '')
        // validation.setFieldValue('objective', '')
        // validation.setFieldValue('assesment', '')
        // validation.setFieldValue('plan', '')
        // validation.setFieldValue('norec', '')
        // validation.setFieldValue('objectemrfk', '')

    };
    const tableCustomStyles = {
        headRow: {
            style: {
                color: '#ffffff',
                backgroundColor: '#B57602',
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
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            width: "140px",
            cell: (data) => {
                return (
                    // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
                    <button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{data.noregistrasi}</button>
                );
            },
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            width: "120px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Kode Diagnosa</span>,
            selector: row => row.kodediagnosa,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Deskripsi</span>,
            selector: row => row.reportdisplay,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            selector: row => row.keterangan,
            sortable: true
        },

    ];
    return (
        <React.Fragment>
            {/* <ToastContainer closeButton={false} /> */}
            <Row className="gy-4">
                <Form>
                    <Row>
                        <Col lg={5}>
                        <Card>
                                <CardHeader style={{ backgroundColor: "#B57602" }}>
                                    <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>ICD 9</h4>
                                </CardHeader>
                                <CardBody>
                                    <Row className="gy-2">
                                        <Col xxl={6} md={6}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="kodediagnosa9" className="form-label">Diagnosa Tindakan</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={6} md={6}>
                                            <div>
                                                <CustomSelect
                                                    id="kodediagnosa9"
                                                    name="kodediagnosa9"
                                                    options={dataDiagnosa}
                                                    value={validation.values.kodediagnosa9 || ""}
                                                    className={`input ${validation.errors.kodediagnosa9 ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('kodediagnosa9', value.value)}
                                                />
                                                {validation.touched.kodediagnosa9 && validation.errors.kodediagnosa9 ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.kodediagnosa9}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="keteranganicd9" className="form-label">Keterangan</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={6} md={6}>
                                            <div>
                                                <Input
                                                    id="keteranganicd9"
                                                    name="keteranganicd9"
                                                    type="textarea"
                                                    placeholder="keteranganicd9"
                                                    style={{ height: '200px' }}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.keteranganicd9 || ""}
                                                    invalid={
                                                        validation.touched.keteranganicd9 && validation.errors.keteranganicd9 ? true : false
                                                    }
                                                />
                                                {validation.touched.keteranganicd9 && validation.errors.keteranganicd9 ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.keteranganicd9}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <Card>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="400px"
                                            columns={columns}
                                            pagination
                                            // data={dataTtv}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (Diagnosaix)