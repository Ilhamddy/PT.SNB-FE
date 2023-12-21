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

import {
    emrDiagnosaixSave, emrResetForm, emrDiagnosaixGet,
    emrListDiagnosaixGet, deleteDiagnosaix,comboNamaPelaksanaGet, upsertProcedure
} from "../../../store/actions";
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const Diagnosaix = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const refTipeDiagnosa = useRef(null);
    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo, dataDiagnosa,
        loadingDiagnosa, successDiagnosa, dataRiwayat, loadingRiwayat, successRiwayat,
        newDataDelete,dataNamaPelaksana } = useSelector((state) => ({
            newData: state.Emr.emrDiagnosaixSave.newData,
            success: state.Emr.emrDiagnosaixSave.success,
            loading: state.Emr.emrDiagnosaixSave.loading,
            dataDiagnosa: state.Emr.emrDiagnosaixGet.data,
            loadingDiagnosa: state.Emr.emrDiagnosaixGet.loading,
            successDiagnosa: state.Emr.emrDiagnosaixGet.success,
            dataRiwayat: state.Emr.emrListDiagnosaixGet.data,
            loadingRiwayat: state.Emr.emrListDiagnosaixGet.loading,
            successRiwayat: state.Emr.emrListDiagnosaixGet.success,
            newDataDelete: state.Emr.deleteDiagnosaix.newData,
            dataNamaPelaksana: state.Emr.comboNamaPelaksanaGet.data,
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
            dispatch(comboNamaPelaksanaGet(''));
        }
    }, [norecdp, dispatch])
    useEffect(() => {
        if (newData !== null) {
            dispatch(emrListDiagnosaixGet(norecdp));
        } else if (newDataDelete === true) {
            dispatch(emrListDiagnosaixGet(norecdp));
        }
    }, [newData, norecdp, newDataDelete, dispatch])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecdp: norecdp,
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            kodediagnosa9: editData?.kodediagnosa9 ?? '',
            keteranganicd9: editData?.keteranganicd9 ?? '',
            idlabel: 3,
            label: 'DIAGNOSA',
            jumlahtindakan: editData?.jumlahtindakan ?? '',
            dokterPelaksana: editData?.dokterPelaksana ?? '',
            ihs_diagnosa:'',
            codestatus:'',
            displaystatus:'',
            ihs_dokter:'',
            namakodediagnosa: editData?.namakodediagnosa ?? '',
            codekodediagnosa: editData?.codekodediagnosa ?? '',
        },
        validationSchema: Yup.object({
            kodediagnosa9: Yup.string().required("Diagnosa Belum Diisi"),
            jumlahtindakan: Yup.string().required("Jumlah Tindakan Belum Diisi"),
            dokterPelaksana:Yup.string().required("Dokter Pelaksana Belum Diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            dispatch(emrDiagnosaixSave(values, ''));
            resetForm({ values: '' }) 
            // dispatch(upsertProcedure(values, ''));
        }
    })

    //delete order
    const [deleteModal, setDeleteModal] = useState(false);
    const [product, setProduct] = useState(null);
    const onClickDelete = (product) => {
        setProduct(product);
        setDeleteModal(true);
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
    const handleDeleteOrder = () => {
        if (product) {
            dispatch(deleteDiagnosaix(product.norec));
            setDeleteModal(false);
            let values ={
                codestatus:'inactive',
                displaystatus:'Inactive',
                ihs_diagnosa:product.ihs_diagnosa,
                codekodediagnosa:product.kodediagnosa,
                namakodediagnosa:product.label,
                norecdp:product.norecdp,
                keteranganicd9:product.keterangan,
                ihs_dokter:product.ihs_dokter
            }
            console.log(values)
            if(product.ihs_diagnosa!==null){
                dispatch(
                    upsertProcedure(values, () => {
                        // resetForm()
                    })
                  )
            }
        }
    };
    return (
        <React.Fragment>
            <DeleteModalCustom
                show={deleteModal}
                onDeleteClick={handleDeleteOrder}
                onCloseClick={() => setDeleteModal(false)}
                msgHDelete='Apa Kamu Yakin ?'
                msgBDelete='Yakin ingin menghapus data ini?'
            />
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
                                <CardHeader className="card-header-snb ">
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>ICD 9</h4>
                                </CardHeader>
                                <CardBody>
                                    <Row className="gy-2">
                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="kodediagnosa9" className="form-label">Diagnosa Tindakan</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
                                            <div>
                                                <CustomSelect
                                                    id="kodediagnosa9"
                                                    name="kodediagnosa9"
                                                    options={dataDiagnosa}
                                                    value={validation.values.kodediagnosa9 || ""}
                                                    className={`input ${validation.errors.kodediagnosa9 ? "is-invalid" : ""}`}
                                                    onChange={value => {
                                                        validation.setFieldValue('kodediagnosa9', value?.value || "")
                                                        validation.setFieldValue('namakodediagnosa', value?.label || "")
                                                        validation.setFieldValue('codekodediagnosa', value?.kodeexternal || "")
                                                    }}
                                                    onInputChange={handleDiagnosa}
                                                    ref={refTipeDiagnosa}
                                                />
                                                {validation.touched.kodediagnosa9 && validation.errors.kodediagnosa9 ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.kodediagnosa9}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col xxl={4} md={4}>
                                            <div>
                                                <Label style={{ color: "black" }} htmlFor="jumlahtindakan" className="form-label">Jumlah Tindakan Per Episode</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
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

                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="keteranganicd9" className="form-label">Keterangan</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
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

                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="keteranganicd9" className="form-label">Dokter Pelaksana</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
                                            <CustomSelect
                                                id="dokterPelaksana"
                                                name="dokterPelaksana"
                                                options={dataNamaPelaksana}
                                                onChange={(e) => {
                                                    validation.setFieldValue('dokterPelaksana', e?.value || '')
                                                    validation.setFieldValue('ihs_dokter', e?.ihs_id || '')
                                                }}
                                                value={validation.values.dokterPelaksana}
                                                className={`input row-header ${
                                                    !!validation?.errors.dokterPelaksana ? 'is-invalid' : ''
                                                }`}
                                                isClearEmpty
                                                />
                                            {validation.touched.dokterPelaksana &&
                                                !!validation.errors.dokterPelaksana && (
                                                    <FormFeedback type="invalid">
                                                        <div>{validation.errors.dokterPelaksana}</div>
                                                    </FormFeedback>
                                                )}
                                        </Col>

                                        <Col xxl={12} sm={12}>
                                            <div className="d-flex flex-wrap gap-2">
                                                <Button type="submit" color="success" placement="top">
                                                    SIMPAN
                                                </Button>
                                                <Button type="button" color="danger" placement="top" onClick={handleClickReset}>
                                                    BATAL
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={7}>
                            <Card>
                                <CardHeader className="card-header-snb ">
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Riwayat ICD 9</h4>
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

export default (Diagnosaix)