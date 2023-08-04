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
    listDetailKelUmurGet, saveMasterDKelUmurLaboratorium
} from '../../../store/actions';
import usePageState from "../../../utils/usePageState";
const DetailKelompokUmur = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [sSettingLayLab, setSSettingLayLab] = usePageState("SETTING_LAYANAN_LAB")
    const { data, loading, error,
        newDataSave, loadingSave, successSave, dataState } = useSelector((state) => ({
            data: state.Laboratorium.listDetailKelUmurGet.data,
            loading: state.Laboratorium.listDetailKelUmurGet.loading,
            newDataSave: state.Laboratorium.saveMasterDKelUmurLaboratorium.newData,
            successSave: state.Laboratorium.saveMasterDKelUmurLaboratorium.success,
            loadingSave: state.Laboratorium.saveMasterDKelUmurLaboratorium.loading,
        }));
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            idkelumur: sSettingLayLab.idkelumur,
            iddkelumur: '',
            detailkelompokumur: newDataSave?.detailkelompokumur ?? '',
            umurmin: newDataSave?.umurmin ?? '',
            statusumur: newDataSave?.statusumur ?? '',
            umurmax: newDataSave?.umurmax ?? '',
            status:1
        },
        validationSchema: Yup.object({
            detailkelompokumur: Yup.string().required("Detail Kelompok Umur Belum Diisi"),
            umurmin: Yup.string().required("Umur Min Belum Diisi"),
            statusumur: Yup.string().required("Status Umur Belum Diisi"),
            umurmax: Yup.string().required("Umur Max Belum Diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(saveMasterDKelUmurLaboratorium(values, ''));
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
        validation.setFieldValue('detailkelompokumur', '')
        validation.setFieldValue('umurmin', '')
        validation.setFieldValue('statusumur', '')
        validation.setFieldValue('umurmax', '')
        validation.setFieldValue('iddkelumur', '')
        refStatusUmur.current?.clearValue();

    };

    const handleClickHapus = (e) => {
        let tempValue = { 
            idkelumur: validation.values.idkelumur, 
            iddkelumur: validation.values.iddkelumur, 
            detailkelompokumur:validation.values.detailkelompokumur, 
            umurmin: validation.values.umurmin, 
            statusumur: validation.values.statusumur, 
            umurmax: validation.values.umurmax, 
            status: 0 }
        dispatch(saveMasterDKelUmurLaboratorium(tempValue, ''));
    };

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
            // selector: row => row.kelompokumur,
            selector: row => (<button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClickSelected(row)}>{row.kelompokumur}</button>),
            sortable: true,
            width: "250px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Detail Kelompok Umur</span>,
            selector: row => row.detailkelompokumur,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Umur Min</span>,
            selector: row => row.umurmin,
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Umur Max</span>,
            selector: row => row.umurmax,
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.statusumur,
            sortable: true,
            width: "100px"
        },
    ];


    useEffect(() => {
        if (sSettingLayLab.idkelumur !== undefined)
            dispatch(listDetailKelUmurGet(sSettingLayLab.idkelumur));
    }, [sSettingLayLab, dispatch])
    const refStatusUmur = useRef(null);

    const handleClickSelected = (row) => {
        validation.setFieldValue('iddkelumur', row.id)
        validation.setFieldValue('detailkelompokumur', row.detailkelompokumur)
        validation.setFieldValue('umurmin', row.umurmin)
        validation.setFieldValue('statusumur', row.statusumur)
        validation.setFieldValue('umurmax', row.umurmax)

    };

    const listStatusUmur = [
        { label: "Hari", value: 'H' },
        { label: "Bulan", value: 'B' },
        { label: "Tahun", value: 'T' },
    ];


    console.log(validation.values.statusumur)
    useEffect(() => {
        if (newDataSave !== null) {
            dispatch(listDetailKelUmurGet(sSettingLayLab.idkelumur));
        }
    }, [newDataSave, sSettingLayLab, dispatch])

    console.log(listStatusUmur)
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
                        <Row className="gy-4">
                            <Col lg={12}>
                                <Row>
                                    <Col lg={3} style={{ textAlign: 'left' }}>
                                        <Label style={{ color: "black" }} htmlFor="kelompokumur" className="form-label">Detail Kelompok Umur</Label>
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
                                        <CustomSelect
                                            id="statusumur"
                                            name="statusumur"
                                            options={listStatusUmur}
                                            value={validation.values.statusumur || ""}
                                            className={`input ${validation.errors.statusumur ? "is-invalid" : ""}`}
                                            onChange={value => {
                                                validation.setFieldValue('statusumur', value?.value || "")
                                            }}
                                            ref={refStatusUmur}
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
                            {sSettingLayLab.idkelumur ? (
                                <>
                                    <Col lg={2}>
                                        <Button type="submit" style={{ backgroundColor: '#192a56', textAlign: 'right' }} className="rounded-pill" placement="top">
                                            Simpan
                                        </Button>
                                    </Col>
                                    <Col lg={2}>
                                        <Button type="button" color='danger' style={{ textAlign: 'right' }} className="rounded-pill" placement="top"
                                            onClick={() => handleClickReset()}>
                                            Batal
                                        </Button>
                                    </Col>
                                    <Col lg={2}>
                                        <Button type="button" color='danger' style={{ textAlign: 'right' }} className="rounded-pill" placement="top"
                                            onClick={() => handleClickHapus()}>
                                            Hapus
                                        </Button>
                                    </Col>
                                </>
                            ) : null}


                            <Col lg={12}>
                                <div id="table-gridjs">
                                    <DataTable
                                        fixedHeader
                                        fixedHeaderScrollHeight="400px"
                                        columns={columns}
                                        pagination
                                        data={data}
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