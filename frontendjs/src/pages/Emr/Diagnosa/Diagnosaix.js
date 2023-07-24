import React, { useEffect, useState, useCallback, useRef } from 'react';
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

import { emrDiagnosaixSave, emrResetForm, emrDiagnosaixGet,
    emrListDiagnosaixGet,deleteDiagnosaix } from "../../../store/actions";
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';

const Diagnosaix = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const refTipeDiagnosa = useRef(null);
    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo, dataDiagnosa,
        loadingDiagnosa, successDiagnosa,dataRiwayat,loadingRiwayat,successRiwayat,
        newDataDelete } = useSelector((state) => ({
            newData: state.Emr.emrDiagnosaixSave.newData,
            success: state.Emr.emrDiagnosaixSave.success,
            loading: state.Emr.emrDiagnosaixSave.loading,
            dataDiagnosa: state.Emr.emrDiagnosaixGet.data,
            loadingDiagnosa: state.Emr.emrDiagnosaixGet.loading,
            successDiagnosa: state.Emr.emrDiagnosaixGet.success,
            dataRiwayat: state.Emr.emrListDiagnosaixGet.data,
            loadingRiwayat: state.Emr.emrListDiagnosaixGet.loading,
            successRiwayat: state.Emr.emrListDiagnosaixGet.success,
            newDataDelete:state.Emr.deleteDiagnosaix.newData,
        }));

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (norecdp) {
            dispatch(emrDiagnosaixGet('', 'diagnosa9'));
            dispatch(emrListDiagnosaixGet(norecdp))
        }
    }, [norecdp, dispatch])
    useEffect(() => {
        if (newData !== null) {
            dispatch(emrListDiagnosaixGet(norecdp));
        }else if(newDataDelete === true){
            dispatch(emrListDiagnosaixGet(norecdp));
        }
    }, [newData, norecdp,newDataDelete, dispatch])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            kodediagnosa9: editData?.kodediagnosa9 ?? '',
            keteranganicd9:editData?.keteranganicd9??'',
            idlabel: 3,
            label: 'DIAGNOSA',
            jumlahtindakan: editData?.jumlahtindakan??''
        },
        validationSchema: Yup.object({
            kodediagnosa9: Yup.string().required("Diagnosa Belum Diisi"),
            jumlahtindakan: Yup.string().required("Jumlah Tindakan Belum Diisi")
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            dispatch(emrDiagnosaixSave(values, ''));
            resetForm({ values: '' })
        }
    })

    //delete order
    const [deleteModal, setDeleteModal] = useState(false);
    const [product, setProduct] = useState(null);
    const onClickDelete = (product) => {
        setProduct(product);
        setDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        if (product) {
            dispatch(deleteDiagnosaix(product.norec));
            setDeleteModal(false);
        }
    };
    const handleClickReset = (e) => {
        validation.setFieldValue('kodediagnosa9', '')
        validation.setFieldValue('keteranganicd9', '')
        refTipeDiagnosa.current?.clearValue();

    };
    const handleDiagnosa = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(emrDiagnosaixGet(characterEntered, 'diagnosa9'));
            // }, [dispatch]);
        }
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
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button" onClick={() => onClickDelete(data)}>
                                <i className="ri-delete-bin-2-line"></i>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip>
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            width: "140px",
          
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

            name: <span className='font-weight-bold fs-13'>Diagnosa</span>,
            selector: row => row.label,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Qty</span>,
            selector: row => row.qty,
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
            <DeleteModalCustom
                show={deleteModal}
                onDeleteClick={handleDeleteOrder}
                onCloseClick={() => setDeleteModal(false)}
                msgHDelete='Apa Kamu Yakin ?'
                msgBDelete='Yakin ingin menghapus data ini?'
            />
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
                                                    onChange={value => validation.setFieldValue('kodediagnosa9', value?.value || "")}
                                                    onInputChange={handleDiagnosa}
                                                    ref={refTipeDiagnosa}
                                                />
                                                {validation.touched.kodediagnosa9 && validation.errors.kodediagnosa9 ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.kodediagnosa9}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        
                                        <Col xxl={6} md={6}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="jumlahtindakan" className="form-label">Jumlah Tindakan Per Episode</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={6} md={6}>
                                            <div>
                                                <Input
                                                    id="jumlahtindakan"
                                                    name="jumlahtindakan"
                                                    type="number"
                                                    placeholder="Jumlah Tindakan"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.jumlahtindakan || ""}
                                                    invalid={
                                                        validation.touched.jumlahtindakan && validation.errors.jumlahtindakan ? true : false
                                                    }
                                                />
                                                {validation.touched.jumlahtindakan && validation.errors.jumlahtindakan ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.jumlahtindakan}</div></FormFeedback>
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
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <Card>
                            <CardHeader style={{ backgroundColor: "#B57602" }}>
                                    <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Riwayat ICD 9</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="350px"
                                            columns={columns}
                                            pagination
                                            data={dataRiwayat}
                                            progressPending={loadingRiwayat}
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