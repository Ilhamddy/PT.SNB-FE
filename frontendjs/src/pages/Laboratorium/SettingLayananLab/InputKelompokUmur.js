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
    saveMasterKelUmurLaboratorium, comboLaboratoriumGet
} from '../../../store/actions';

import usePageState from "../../../utils/usePageState";
import LoadingTable from '../../../Components/LoadingTable/LoadingTable';

const InputKelompokUmur = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const refStatusEnabled = useRef(null);
    const listStatusEnabled = [
                { label: "Aktif", value: 1 },
                { label: "Non Aktif", value: 2 },
    ];
    const { data, loading, error,
        newDataSave, loadingSave, successSave } = useSelector((state) => ({
            data: state.Laboratorium.comboLaboratoriumGet.data,
            loading: state.Laboratorium.comboLaboratoriumGet.loading,
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
            dispatch(saveMasterKelUmurLaboratorium(values, ''));
            resetForm({ values: '' })
            handleClickReset()
        }
    })
    const handleClickReset = (e) => {
        validation.setFieldValue('status_enabled', '')
        validation.setFieldValue('namakelompokumur', '')
        refStatusEnabled.current?.clearValue();

    };
    useEffect(() => {
        if (newDataSave !== null) {
            dispatch(comboLaboratoriumGet(''));
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
            // selector: row => row.label,
            selector: row => (<button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClickSelected(row)}>{row.label}</button>),
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
    useEffect(() => {
        dispatch(comboLaboratoriumGet(''));
    }, [dispatch])
    const [sSettingLayLab, setSSettingLayLab] = usePageState("SETTING_LAYANAN_LAB")
    const handleClickSelected = (row) => {
        setSSettingLayLab("idkelumur", row.value)
        setSSettingLayLab("labelkelumur", row.label)
    };

    const handleBack = () => {
        history("/laboratorium/masterlayananlab");
      };

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

                    <Col lg={3} style={{ textAlign: 'left' }}>
                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">Kelompok Umur</Label>
                    </Col>
                    <Col lg={9} className="mb-2">
                        <Input
                            id="namakelompokumur"
                            name="namakelompokumur"
                            type="string"
                            placeholder="Masukkan No Identitas pasien"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.namakelompokumur || ""}
                            invalid={
                                validation.touched.namakelompokumur && validation.errors.namakelompokumur ? true : false
                            }
                        />
                        {validation.touched.namakelompokumur && validation.errors.namakelompokumur ? (
                            <FormFeedback type="invalid"><div>{validation.errors.namakelompokumur}</div></FormFeedback>
                        ) : null}
                    </Col>
                    <Col lg={3} style={{ textAlign: 'left' }}>
                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">Status Enabled</Label>
                    </Col>
                    <Col lg={9} className="mb-2">
                        <CustomSelect
                            id="status_enabled"
                            name="status_enabled"
                            options={listStatusEnabled}
                            value={validation.values.status_enabled || ""}
                            className={`input ${validation.errors.status_enabled ? "is-invalid" : ""}`}
                            onChange={value => {
                                validation.setFieldValue('status_enabled', value?.value || "")
                            }}
                            ref={refStatusEnabled}
                        />
                        {validation.touched.status_enabled && validation.errors.status_enabled ? (
                            <FormFeedback type="invalid"><div>{validation.errors.status_enabled}</div></FormFeedback>
                        ) : null}
                    </Col>
                    <Col lg={6}></Col>
                    <Col lg={3}>
                        <Button type="submit" style={{ backgroundColor: '#192a56', textAlign: 'right' }} className="rounded-pill" placement="top">
                            Tambah
                        </Button>

                    </Col>
                    <Col lg={3}>
                    <Button type="button" color='danger' className="rounded-pill" placement="top" onClick={handleBack}>
                                                            Back
                                                        </Button>

                    </Col>
                    <Col lg={12}>
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
                                    <Col lg={12}>
                                        <Row className="gy-4">

                                            <Col lg={12}>
                                                <div id="table-gridjs">
                                                    <DataTable
                                                        fixedHeader
                                                        columns={columns}
                                                        pagination
                                                        data={data.datakelumur}
                                                        progressPending={loading}
                                                        customStyles={tableCustomStyles}
                                                        progressComponent={<LoadingTable />}
                                                    />
                                                </div>
                                                {/* {data.datakelumur ? (
                                                    <TableContainer
                                                        columns={columns2}
                                                        data={(data.datakelumur || [])}
                                                        isGlobalFilter={true}
                                                        isAddUserList={false}
                                                        customPageSize={8}
                                                        divClass="table-responsive table-card mb-1"
                                                        tableClass="align-middle table-nowrap"
                                                        theadClass="table-light text-muted text-uppercase"
                                                        // handleOrderClick={handleOrderClicks}
                                                        // isOrderFilter={true}
                                                        SearchPlaceholder="Pencarian Berdasarkan No, Kelompok Umur, status..."
                                                        
                                                    />
                                                ) : (<Loader error={error} />)} */}
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                </Row>
            </Form>
        </React.Fragment>
    )
}

export default (InputKelompokUmur)