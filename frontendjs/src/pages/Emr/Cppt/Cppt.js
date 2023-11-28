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

import { emrSave, emrResetForm, emrGet } from "../../../store/actions";
import LoadingTable from '../../../Components/Table/LoadingTable';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


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
            dispatch(emrGet(norecdp, 'cppt'));
        }
    }, [norecdp, dispatch])
    useEffect(() => {
        if (newData !== null) {
            dispatch(emrGet(norecdp, 'cppt'));
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
            <Row className="gy-4 p-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">

                    <Row className='text-dark'>
                        <Col xxl={12} sm={12}>
                            <Row>
                                <Col sm={12}>
                                    <div>
                                        <Label style={{ color: "black" }} htmlFor="subjective" className="form-label fw-semibold">Subjective</Label>
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: {
                                                items: ['undo', "redo", "bold", "italic", 'link', 'bulletedList']
                                            }
                                        }}
                                        data={validation.values.subjective || ""}
                                        onChange={(event, editor) => {
                                            const data = editor.getData(); 
                                            validation.setFieldValue('subjective', data)
                                        }}
                                    />
                                    {validation.touched.subjective && validation.errors.subjective ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.subjective}</div></FormFeedback>
                                    ) : null}
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={12} sm={12}>
                            <Row className='mt-5'>
                                <Col lg={12} sm={12}>
                                    <div >
                                        <Label style={{ color: "black" }} htmlFor="objective" className="form-label fw-semibold">Objective</Label>
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: {
                                                items: ['undo', "redo", "bold", "italic", 'link', 'bulletedList']
                                            }
                                        }}
                                        data={validation.values.objective || ""}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            validation.setFieldValue('objective', data)
                                        }}
                                    />
                                    {validation.touched.objective && validation.errors.objective ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.objective}</div></FormFeedback>
                                    ) : null}
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={12} sm={12}>
                            <Row>
                                <Col lg={12} sm={12}>
                                    <div>
                                        <Label style={{ color: "black" }} htmlFor="assesment" className="form-label fw-semibold">Assesment</Label>
                                    </div>
                                    <div>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                toolbar: {
                                                    items: ['undo', "redo", "bold", "italic", 'link', 'bulletedList']
                                                }
                                            }}
                                            data={validation.values.assesment || ""}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log(data)
                                                validation.setFieldValue('assesment', data)
                                            }}
                                        />
                                        {validation.touched.assesment && validation.errors.assesment ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.assesment}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={12} sm={12}>
                            <Row className='mt-5'>
                                <Col lg={12} sm={12}>
                                    <div >
                                        <Label style={{ color: "black" }} htmlFor="plan" className="form-label fw-semibold">Plan</Label>
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: {
                                                items: ['undo', "redo", "bold", "italic", 'link', 'bulletedList']
                                            }
                                        }}
                                        data={validation.values.plan || ""}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            validation.setFieldValue('plan', data)
                                        }}
                                    />
                                    {validation.touched.plan && validation.errors.plan ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.plan}</div></FormFeedback>
                                    ) : null}
                                </Col>
                            </Row>
                        </Col>

                        <Col xxl={12} sm={12}>
                            <div className="d-flex flex-wrap gap-2 mt-5 w-100 flex-row-reverse">
                                <Button type="button" color="danger" placement="top" onClick={handleClickReset}>
                                    BATAL
                                </Button>
                                <Button type="submit" color="success" placement="top">
                                    SIMPAN
                                </Button>
                            </div>
                        </Col>

                        <Col xxl={12} sm={12} className='mt-5'>
                            <Card>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="700px"
                                            columns={columns}
                                            pagination
                                            data={dataTtv}
                                            progressPending={loadingTtv}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
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
export default (Cppt)