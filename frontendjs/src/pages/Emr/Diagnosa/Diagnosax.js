import React, { useEffect, useState, useCallback, useReducer, useRef } from 'react';
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
    emrDiagnosaxSave, emrResetForm, emrComboGet, emrDiagnosaxGet, emrListDiagnosaxGet,
    deleteDiagnosax
} from "../../../store/actions";
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';
import LoadingTable from '../../../Components/Table/LoadingTable';

const Diagnosax = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();

    //delete order
    const [deleteModal, setDeleteModal] = useState(false);
    const [product, setProduct] = useState(null);

    const refKodeDiagnosa = useRef(null);
    const refTipeDiagnosa = useRef(null);
    const refKasusPenyakit = useRef(null);

    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo, dataDiagnosa,
        loadingDiagnosa, successDiagnosa, dataRiwayat, loadingRiwayat, successRiwayat, successDelete, newDataDelete } = useSelector((state) => ({
            newData: state.Emr.emrDiagnosaxSave.newData,
            success: state.Emr.emrDiagnosaxSave.success,
            loading: state.Emr.emrDiagnosaxSave.loading,
            dataCombo: state.Emr.emrComboGet.data,
            loadingCombo: state.Emr.emrComboGet.loading,
            successCombo: state.Emr.emrComboGet.success,
            dataDiagnosa: state.Emr.emrDiagnosaxGet.data,
            loadingDiagnosa: state.Emr.emrDiagnosaxGet.loading,
            successDiagnosa: state.Emr.emrDiagnosaxGet.success,
            dataRiwayat: state.Emr.emrListDiagnosaxGet.data,
            loadingRiwayat: state.Emr.emrListDiagnosaxGet.loading,
            successRiwayat: state.Emr.emrListDiagnosaxGet.success,
            newDataDelete: state.Emr.deleteDiagnosax.newData,
            successDelete: state.Emr.deleteDiagnosax.success
        }));

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (norecdp) {
            dispatch(emrComboGet(norecdp, 'combo'));
            dispatch(emrDiagnosaxGet('', 'diagnosa10'));
            dispatch(emrListDiagnosaxGet(norecdp));
        }
    }, [norecdp, dispatch])
    useEffect(() => {
        if (newData !== null) {
            dispatch(emrListDiagnosaxGet(norecdp));
        } else if (newDataDelete === true) {
            dispatch(emrListDiagnosaxGet(norecdp));
        }
    }, [newData, norecdp, newDataDelete, dispatch])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            tipediagnosa: editData?.tipediagnosa ?? '',
            kodediagnosa: editData?.kodediagnosa ?? '',
            kasuspenyakit: editData?.kasuspenyakit ?? '',
            keteranganicd10: editData?.keteranganicd10 ?? '',
            idlabel: 3,
            label: 'DIAGNOSA',
        },
        validationSchema: Yup.object({
            tipediagnosa: Yup.string().required("Tipe Diagnosa Belum Diisi"),
            kodediagnosa: Yup.string().required("Kode Diagnosa Belum Diisi"),
            kasuspenyakit: Yup.string().required("Kasus Penyakit Belum Diisi")
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(emrDiagnosaxSave(values, ''));
            resetForm({ values: '' })
        }
    })
    const onClickDelete = (product) => {
        setProduct(product);
        setDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        if (product) {
            dispatch(deleteDiagnosax(product.norec));
            setDeleteModal(false);
        }
    };

    const handleClickReset = (e) => {
        validation.setFieldValue('tipediagnosa', '')
        validation.setFieldValue('kodediagnosa', '')
        validation.setFieldValue('kasuspenyakit', '')
        validation.setFieldValue('keteranganicd10', '')
        refKodeDiagnosa.current?.clearValue();
        refTipeDiagnosa.current?.clearValue();
        refKasusPenyakit.current?.clearValue();
    };

    const handleDiagnosa = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(emrDiagnosaxGet(characterEntered, 'diagnosa10'));
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
            // cell: (data) => {
            //     return (
            //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
            //         <button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{data.noregistrasi}</button>
            //     );
            // },
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

            name: <span className='font-weight-bold fs-13'>Tipe Diagnosa</span>,
            selector: row => row.tipediagnosa,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Kasus</span>,
            selector: row => row.jeniskasus,
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
                                <CardHeader style={{ backgroundColor: "#FFCB46",
            borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
            padding: '10px 15px' }}>
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>ICD 10</h4>
                                </CardHeader>
                                <CardBody>
                                    <Row className="gy-2">
                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tipe Diagnosa</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
                                            <div>
                                                <CustomSelect
                                                    id="tipediagnosa"
                                                    name="tipediagnosa"
                                                    options={dataCombo.tipediagnosa}
                                                    value={validation.values.tipediagnosa || ""}
                                                    className={`input ${validation.errors.tipediagnosa ? "is-invalid" : ""}`}
                                                    onChange={value => {
                                                        refKodeDiagnosa.current?.clearValue();
                                                        refKasusPenyakit.current?.clearValue();
                                                        validation.setFieldValue('tipediagnosa', value?.value || "")
                                                    }}
                                                    ref={refTipeDiagnosa}
                                                />
                                                {validation.touched.tipediagnosa && validation.errors.tipediagnosa ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.tipediagnosa}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="kodediagnosa" className="form-label">Diagnosa</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
                                            <div>
                                                <CustomSelect
                                                    id="kodediagnosa"
                                                    name="kodediagnosa"
                                                    options={dataDiagnosa}
                                                    value={validation.values.kodediagnosa || ""}
                                                    className={`input ${validation.errors.kodediagnosa ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('kodediagnosa', value?.value || "")}
                                                    onInputChange={handleDiagnosa}
                                                    ref={refKodeDiagnosa}
                                                />
                                                {validation.touched.kodediagnosa && validation.errors.kodediagnosa ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.kodediagnosa}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="kasuspenyakit" className="form-label">Kasus Penyakit</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
                                            <div>
                                                <CustomSelect
                                                    id="kasuspenyakit"
                                                    name="kasuspenyakit"
                                                    options={dataCombo.jeniskasus}
                                                    value={validation.values.kasuspenyakit || ""}
                                                    className={`input ${validation.errors.kasuspenyakit ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('kasuspenyakit', value?.value || "")}
                                                    ref={refKasusPenyakit}
                                                />
                                                {validation.touched.kasuspenyakit && validation.errors.kasuspenyakit ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.kasuspenyakit}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="keteranganicd10" className="form-label">Keterangan</Label>
                                            </div>
                                        </Col>
                                        <Col xxl={8} md={8}>
                                            <div>
                                                <Input
                                                    id="keteranganicd10"
                                                    name="keteranganicd10"
                                                    type="textarea"
                                                    placeholder="keteranganicd10"
                                                    style={{ height: '200px' }}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.keteranganicd10 || ""}
                                                    invalid={
                                                        validation.touched.keteranganicd10 && validation.errors.keteranganicd10 ? true : false
                                                    }
                                                />
                                                {validation.touched.keteranganicd10 && validation.errors.keteranganicd10 ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.keteranganicd10}</div></FormFeedback>
                                                ) : null}
                                            </div>
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
                                <CardHeader style={{ backgroundColor: "#FFCB46",
            borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
            padding: '10px 15px' }}>
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Riwayat ICD 10</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="330px"
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

export default (Diagnosax)