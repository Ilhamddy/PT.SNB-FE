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

import { emrSave, emrResetForm, emrGet} from "../../../store/actions";


const Cppt = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataTtv, loadingTtv, successTtv } = useSelector((state) => ({
        newData: state.Emr.emrSave.newData,
        success: state.Emr.emrSave.success,
        loading: state.Emr.emrSave.loading,
        errorSave: state.Emr.emrSave.error,
        dataTtv: state.Emr.emrGet.data,
        loadingTtv: state.Emr.emrGet.loading,
        successTtv: state.Emr.emrGet.success,
    }));

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (norecdp) {
            dispatch(emrGet(norecdp,'cppt'));
        }
    }, [norecdp, dispatch])
    useEffect(() => {
        if (newData !== null) {
            dispatch(emrGet(norecdp,'cppt'));
        }
    }, [newData, norecdp, dispatch])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            objectemrfk: editData?.objectemrfk ?? '',
            subjective: editData?.subjective ?? '',
            objective: editData?.objective ?? '',
            assesment: editData?.assesment ?? '',
            plan: editData?.plan ?? '',
            idlabel: 2,
            label: 'CPPT',
        },
        validationSchema: Yup.object({
            subjective: Yup.string().required("Subjective Belum Diisi"),
            objective: Yup.string().required("Subjective Belum Diisi"),
            assesment: Yup.string().required("Subjective Belum Diisi"),
            plan: Yup.string().required("Subjective Belum Diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(emrSave(values, ''));
            resetForm({ values: '' })
        }
    })
    const handleClick = (e) => {
        validation.setFieldValue('subjective', e.subjective)
        validation.setFieldValue('objective', e.objective)
        validation.setFieldValue('assesment', e.assesment)
        validation.setFieldValue('plan', e.plan)
        validation.setFieldValue('norec', e.norec)
        validation.setFieldValue('objectemrfk', e.objectemrfk)
        console.log(e)
    };
    const handleClickReset = (e) => {
        validation.setFieldValue('subjective', '')
        validation.setFieldValue('objective', '')
        validation.setFieldValue('assesment', '')
        validation.setFieldValue('plan', '')
        validation.setFieldValue('norec', '')
        validation.setFieldValue('objectemrfk', '')

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

            name: <span className='font-weight-bold fs-13'>SUBJECTIVE</span>,
            selector: row => row.subjective,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>OBJECTIVE</span>,
            selector: row => row.objective,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>ASSESMENT</span>,
            selector: row => row.assesment,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>PLAN</span>,
            selector: row => row.plan,
            sortable: true
        },
        
   
    ];

    return (
        <React.Fragment>
            {/* <ToastContainer closeButton={false} /> */}
            <Row className="gy-4">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    
                    <Row>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div style={{ marginTop: '100px' }}>
                                        <Label style={{ color: "black" }} htmlFor="subjective" className="form-label fw-semibold">Subjective</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="subjective"
                                            name="subjective"
                                            type="textarea"
                                            placeholder="Subjective"
                                            style={{ height: '300px' }}
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.subjective || ""}
                                            invalid={
                                                validation.touched.subjective && validation.errors.subjective ? true : false
                                            }
                                        />
                                        {validation.touched.subjective && validation.errors.subjective ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.subjective}</div></FormFeedback>
                                        ) : null}

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div style={{ marginTop: '100px' }}>
                                        <Label style={{ color: "black" }} htmlFor="assesment" className="form-label fw-semibold">Assesment</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="assesment"
                                            name="assesment"
                                            type="textarea"
                                            placeholder="Assesment"
                                            style={{ height: '300px' }} onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.assesment || ""}
                                            invalid={
                                                validation.touched.assesment && validation.errors.assesment ? true : false
                                            }
                                        />
                                        {validation.touched.assesment && validation.errors.assesment ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.assesment}</div></FormFeedback>
                                        ) : null}

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div style={{ marginTop: '100px' }}>
                                        <Label style={{ color: "black" }} htmlFor="objective" className="form-label fw-semibold">Objective</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="objective"
                                            name="objective"
                                            type="textarea"
                                            placeholder="Objective"
                                            style={{ height: '300px' }} onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.objective || ""}
                                            invalid={
                                                validation.touched.objective && validation.errors.objective ? true : false
                                            }
                                        />
                                        {validation.touched.objective && validation.errors.objective ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.objective}</div></FormFeedback>
                                        ) : null}

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div style={{ marginTop: '100px' }}>
                                        <Label style={{ color: "black" }} htmlFor="plan" className="form-label fw-semibold">Plan</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="plan"
                                            name="plan"
                                            type="textarea"
                                            placeholder="Plan"
                                            style={{ height: '300px' }} onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.plan || ""}
                                            invalid={
                                                validation.touched.plan && validation.errors.plan ? true : false
                                            }
                                        />
                                        {validation.touched.plan && validation.errors.plan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.plan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col xxl={12} sm={12}>
                            <Button type="submit" color="info" className="rounded-pill" placement="top" id="tooltipTop">
                                SIMPAN
                            </Button>
                            <UncontrolledTooltip placement="top" target="tooltipTop" > SIMPAN CPPT </UncontrolledTooltip>

                            <Button type="button" color="danger" className="rounded-pill" placement="top" id="tooltipTop2" onClick={handleClickReset}>
                                BATAL
                            </Button>
                            <UncontrolledTooltip placement="top" target="tooltipTop2" > BATAL CPPT </UncontrolledTooltip>

                        </Col>

                        <Col xxl={12} sm={12}>
                            <Card>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="400px"
                                            columns={columns}
                                            pagination
                                            data={dataTtv}
                                            progressPending={loadingTtv}
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
export default (Cppt)