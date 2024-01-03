import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { emrTtvSave, emrResetForm, emrTtvGet, resetRegisterFlag,upsertObservation } from "../../../store/actions";
import { Link, useParams } from "react-router-dom";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import DataTable from 'react-data-table-component';
import { rgxWithSlash } from '../../../utils/regexcommon';
import LoadingTable from '../../../Components/Table/LoadingTable';
import NoDataTable from '../../../Components/Table/NoDataTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const TandaVital = ({isHistory = true}) => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataTtv, loadingTtv, successTtv } = useSelector((state) => ({
        newData: state.Emr.emrTtvSave.newData,
        success: state.Emr.emrTtvSave.success,
        loading: state.Emr.emrTtvSave.loading,
        errorSave: state.Emr.emrTtvSave.error,
        dataTtv: state.Emr.emrTtvGet.data,
        loadingTtv: state.Emr.emrTtvGet.loading,
        successTtv: state.Emr.emrTtvGet.success,
    }));

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])

    useEffect(() => {
        if (newData?.data?.ttv?.norec !== null && norecdp) {
            dispatch(emrTtvGet(norecdp));
        }
    }, [newData, norecdp, dispatch])

    const [hasilGcs, sethasilGcs] = useState('');
    const [rate, setRate] = useState(0);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norecdp: editData?.norecdp ?? norecdp,
            norec: editData?.norec ?? '',
            objectemrfk: editData?.objectemrfk ?? '',
            tinggibadan: editData?.tinggibadan ?? '',
            suhu: editData?.suhu ?? '',
            gcse: editData?.gcse ?? '',
            gcsm: editData?.gcsm ?? '',
            gcsv: editData?.gcsv ?? '',
            beratbadan: editData?.beratbadan ?? '',
            nadi: editData?.nadi ?? '',
            alergi: editData?.alergi ?? '',
            tekanandarah: editData?.tekanandarah ?? '',
            spo2: editData?.spo2 ?? '',
            pernapasan: editData?.pernapasan ?? '',
            keadaanumum: editData?.keadaanumum ?? '',
            idlabel: 1,
            label: 'TTV',
            idgcs: editData?.idgcs ?? '',
            ihs_nadi:editData?.ihs_nadi ?? null,
            sistole: editData?.sistole ?? '',
            diastole: editData?.diastole ?? '',
        },
        validationSchema: Yup.object({
            tinggibadan: Yup.string().required("Tinggi Badan wajib diisi"),
            suhu: Yup.string().required("Suhu wajib diisi"),
            // gcse: Yup.string().required("E wajib diisi"),
            gcsm: Yup.string().required("M wajib diisi"),
            gcsv: Yup.string().required("V wajib diisi"),
            beratbadan: Yup.string().required("Berat Badan wajib diisi"),
            nadi: Yup.string().required("Nadi wajib diisi"),
            alergi: Yup.string().required("Alergi wajib diisi"),
            // tekanandarah: Yup.string().required("Tekanan Darah wajib diisi"),
            spo2: Yup.string().required("SpO2 wajib diisi"),
            pernapasan: Yup.string().required("Pernapasan wajib diisi"),
            keadaanumum: Yup.string().required("Keadaan Umum wajib diisi"),
            sistole: Yup.string().required("Sistole wajib diisi"),
            diastole: Yup.string().required("Diastole wajib diisi"),
            gcse: Yup.string().when("gcsm", (gcsm, schema) => {
                if (validation.values.gcse === '' || validation.values.gcse === null) {
                    return schema
                        .required("E wajib diisi")
                } else {
                    let tempgcse = validation.values.gcse === '' || validation.values.gcse === null ? 0 : validation.values.gcse
                    let tempgcsm = validation.values.gcsm === '' || validation.values.gcsm === null ? 0 : validation.values.gcsm
                    let tempgcsv = validation.values.gcsv === '' || validation.values.gcsv === null ? 0 : validation.values.gcsv
                    setRate(tempgcse + tempgcsm + tempgcsv)
                    return schema
                }
            }),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            dispatch(emrTtvSave(values, ''));
            resetForm({ values: '' })
        }
    })
   
    const columns = [

        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "130px"
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

            name: <span className='font-weight-bold fs-13'>TB</span>,
            selector: row => row.tinggibadan,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>BB</span>,
            selector: row => row.beratbadan,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Sistole</span>,
            selector: (data) => {
                return (
                    <button type='button' className={"btn btn-sm "+data.status_sistole} onClick={() => handleClickSistole(data)}>{data.sistole}</button>
                );
            },
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Diastole</span>,
            selector: (data) => {
                return (
                    <button type='button' className={"btn btn-sm "+data.status_diastole} onClick={() => handleClickDiastole(data)}>{data.diastole}</button>
                );
            },
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Pernapasan</span>,
            sortable: true,
            selector: (data) => {
                return (
                    <button type='button' className={"btn btn-sm "+data.status_pernafasan} onClick={() => handleClickPernapasan(data)}>{data.pernapasan}</button>
                );
            },
        },
        {

            name: <span className='font-weight-bold fs-13'>Suhu</span>,
            // selector: row => row.suhu,
            sortable: true,
            selector: (data) => {
                return (
                    <button type='button' className={"btn btn-sm "+data.status_suhu} onClick={() => handleClickSuhu(data)}>{data.suhu}</button>
                );
            },
        },
        {

            name: <span className='font-weight-bold fs-13'>Nadi</span>,
            sortable: true,
            selector: (data) => {
                return (
                    <button type='button' className={"btn btn-sm "+data.status_nadi} onClick={() => handleClickNadi(data)}>{data.nadi}</button>
                );
            },
        },
        {

            name: <span className='font-weight-bold fs-13'>SpO2</span>,
            selector: row => row.spo2,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>K. Umum</span>,
            selector: row => row.keadaanumum,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>GCS(EMV)</span>,
            // selector: row => row.namagcs,
            sortable: true,
            selector: (data) => {
                return (
                    <button type='button' className={"btn btn-sm "+data.status_kesadaran} onClick={() => handleClickKesadaran(data)}>{data.namagcs}</button>
                );
            },
        },
        {

            name: <span className='font-weight-bold fs-13'>Alergi</span>,
            selector: row => row.alergi,
            sortable: true
        },
        // {

        //     name: <span className='font-weight-bold fs-13'>Nama PPA</span>,
        //     selector: row => row.tekanandarah,
        //     sortable: true
        // },
        // {

        //     name: <span className='font-weight-bold fs-13'>PPA</span>,
        //     selector: row => row.tekanandarah,
        //     sortable: true
        // },
    ];
    const handleClickPernapasan = (e)=>{
        let tempValue={
                norec:e?.norec,
                nilai:e?.pernapasan,
                norecdp:norecdp,
                status:'pernafasan',
                ihs_pernafasan:e?.ihs_pernapasan
            }
            dispatch(upsertObservation(tempValue,()=>{
                dispatch(emrTtvGet(norecdp));
            }));
    }
    const handleClickSuhu = (e)=>{
        let tempValue={
                norec:e?.norec,
                nilai:e?.suhu,
                norecdp:norecdp,
                status:'suhu',
                ihs_suhu:e?.ihs_suhu
            }
            dispatch(upsertObservation(tempValue,()=>{
                dispatch(emrTtvGet(norecdp));
            }));
    }
    const handleClickSistole = (e)=>{
        let tempValue={
                norec:e?.norec,
                nilai:e?.sistole,
                norecdp:norecdp,
                status:'sistole',
                ihs_sistole:e?.ihs_sistole
            }
            dispatch(upsertObservation(tempValue,()=>{
                dispatch(emrTtvGet(norecdp));
            }));
    }
    const handleClickDiastole = (e)=>{
        let tempValue={
                norec:e?.norec,
                nilai:e?.diastole,
                norecdp:norecdp,
                status:'diastole',
                ihs_diastole:e?.ihs_diastole
            }
            dispatch(upsertObservation(tempValue,()=>{
                dispatch(emrTtvGet(norecdp));
            }));
    }
    const handleClickNadi = (e)=>{
        let tempValue={
            norec:e.norec,
            nilai:e.nadi,
            norecdp:norecdp,
            status:'nadi',
            ihs_nadi:e.ihs_nadi
        }
        dispatch(upsertObservation(tempValue,()=>{
            dispatch(emrTtvGet(norecdp));
        }));
    }
    const handleClickKesadaran = (e)=>{
        let tempValue={
            norec:e.norec,
            nilai:e.nadi,
            norecdp:norecdp,
            status:'kesadaran',
            ihs_kesadaran:e.ihs_kesadaran
        }
        dispatch(upsertObservation(tempValue,()=>{
            dispatch(emrTtvGet(norecdp));
        }));
    }
    const handleClick = (e) => {
        validation.setFieldValue('tinggibadan', e.tinggibadan)
        validation.setFieldValue('suhu', e.suhu)
        validation.setFieldValue('gcse', e.e)
        validation.setFieldValue('gcsm', e.m)
        validation.setFieldValue('gcsv', e.v)
        validation.setFieldValue('beratbadan', e.beratbadan)
        validation.setFieldValue('nadi', e.nadi)
        validation.setFieldValue('alergi', e.alergi)
        validation.setFieldValue('tekanandarah', e.tekanandarah)
        validation.setFieldValue('spo2', e.spo2)
        validation.setFieldValue('pernapasan', e.pernapasan)
        validation.setFieldValue('keadaanumum', e.keadaanumum)
        validation.setFieldValue('norec', e.norec)
        validation.setFieldValue('objectemrfk', e.objectemrfk)
        validation.setFieldValue('ihs_nadi', e.ihs_nadi)
        validation.setFieldValue('sistole', e.sistole)
        validation.setFieldValue('diastole', e.diastole)
        console.log(e)
    };
    const handleClickReset = (e) => {
        validation.setFieldValue('tinggibadan', '')
        validation.setFieldValue('suhu', '')
        validation.setFieldValue('gcse', '')
        validation.setFieldValue('gcsm', '')
        validation.setFieldValue('gcsv', '')
        validation.setFieldValue('beratbadan', '')
        validation.setFieldValue('nadi', '')
        validation.setFieldValue('alergi', '')
        validation.setFieldValue('tekanandarah', '')
        validation.setFieldValue('spo2', '')
        validation.setFieldValue('pernapasan', '')
        validation.setFieldValue('keadaanumum', '')
        validation.setFieldValue('norec', '')
        validation.setFieldValue('objectemrfk', '')
        validation.setFieldValue('ihs_nadi', null)
        validation.setFieldValue('sistole', '')
        validation.setFieldValue('diastole', '')
    };


    useEffect(() => {
        if (rate <= 3) {
            sethasilGcs('Coma')
        } else if (rate === 4) {
            sethasilGcs('Semi-coma')
        } else if (rate >= 5 && rate <= 6) {
            sethasilGcs('Sopor')
        } else if (rate >= 7 && rate <= 9) {
            sethasilGcs('Somnolen')
        } else if (rate >= 10 && rate <= 11) {
            sethasilGcs('Delirium')
        } else if (rate >= 12 && rate <= 13) {
            sethasilGcs('Apatis')
        } else if (rate >= 14 && rate <= 15) {
            sethasilGcs('Cosposmentis')
        }
    }, [rate]);

    return (
        <React.Fragment>
            <Row className="gy-4 p-3">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tinggibadan" className="form-label fw-semibold">Tinggi Badan(cm)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="tinggibadan"
                                            name="tinggibadan"
                                            type="number"
                                            placeholder="Tinggi Badan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.tinggibadan || ""}
                                            invalid={
                                                validation.touched.tinggibadan && validation.errors.tinggibadan ? true : false
                                            }
                                        />
                                        {validation.touched.tinggibadan && validation.errors.tinggibadan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tinggibadan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="suhu" className="form-label fw-semibold">Suhu(°C)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="suhu"
                                            name="suhu"
                                            type="number"
                                            placeholder="Suhu Badan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.suhu || ""}
                                            invalid={
                                                validation.touched.suhu && validation.errors.suhu ? true : false
                                            }
                                        />
                                        {validation.touched.suhu && validation.errors.suhu ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.suhu}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={4} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="gcs" className="form-label fw-semibold">GCS(EMV)</Label>
                                    </div>
                                </Col>
                                <Col lg={8} sm={6} className="mt-1">
                                    <Row>
                                        <Col lg={4} md={6} sm={12}>
                                            <div>
                                                <Input
                                                    id="gcse"
                                                    name="gcse"
                                                    type="number"
                                                    placeholder="0"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.gcse || ""}
                                                    invalid={
                                                        validation.touched.gcse && validation.errors.gcse ? true : false
                                                    }
                                                />
                                                {validation.touched.gcse && validation.errors.gcse ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.gcse}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={4} md={6} sm={12}>
                                            <div>
                                                <Input
                                                    id="gcsm"
                                                    name="gcsm"
                                                    type="number"
                                                    placeholder="0"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.gcsm || ""}
                                                    invalid={
                                                        validation.touched.gcsm && validation.errors.gcsm ? true : false
                                                    }
                                                />
                                                {validation.touched.gcsm && validation.errors.gcsm ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.gcsm}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={4} md={6} sm={12}>
                                            <div>
                                                <Input
                                                    id="gcsv"
                                                    name="gcsv"
                                                    type="number"
                                                    placeholder="0"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.gcsv || ""}
                                                    invalid={
                                                        validation.touched.gcsv && validation.errors.gcsv ? true : false
                                                    }
                                                />
                                                {validation.touched.gcsv && validation.errors.gcsv ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.gcsv}</div></FormFeedback>
                                                ) : null}

                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} sm={6}></Col>
                                <Col lg={6} sm={6}>
                                    <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="totalamountInput"
                                        placeholder="Hasil GCS"
                                        readOnly
                                        value={hasilGcs}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="beratbadan" className="form-label fw-semibold">Berat Badan(cm)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="beratbadan"
                                            name="beratbadan"
                                            type="number"
                                            placeholder="Berat Badan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.beratbadan || ""}
                                            invalid={
                                                validation.touched.beratbadan && validation.errors.beratbadan ? true : false
                                            }
                                        />
                                        {validation.touched.beratbadan && validation.errors.beratbadan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.beratbadan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="nadi" className="form-label fw-semibold">Nadi (X/menit)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="nadi"
                                            name="nadi"
                                            type="number"
                                            placeholder="Nadi pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.nadi || ""}
                                            invalid={
                                                validation.touched.nadi && validation.errors.nadi ? true : false
                                            }
                                        />
                                        {validation.touched.nadi && validation.errors.nadi ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.nadi}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="alergi" className="form-label fw-semibold">Alergi</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="alergi"
                                            name="alergi"
                                            type="input"
                                            placeholder="Alergi"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.alergi || ""}
                                            invalid={
                                                validation.touched.alergi && validation.errors.alergi ? true : false
                                            }
                                        />
                                        {validation.touched.alergi && validation.errors.alergi ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.alergi}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={3} sm={3}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tekanandarah" className="form-label fw-semibold">Sistole</Label>
                                    </div>
                                </Col>
                                <Col lg={3} sm={3} className="mt-1">
                                    <div>
                                        <Input
                                            id="sistole"
                                            name="sistole"
                                            type="string"
                                            placeholder="0"
                                            onChange={(e) => {
                                                rgxWithSlash.test(e.target.value)
                                                    && validation.handleChange(e)
                                            }}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.sistole || ""}
                                            invalid={
                                                validation.touched.sistole && validation.errors.sistole ? true : false
                                            }
                                        />
                                        {validation.touched.sistole && validation.errors.sistole ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.sistole}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={3} sm={3}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tekanandarah" className="form-label fw-semibold">Diastole</Label>
                                    </div>
                                </Col>
                                <Col lg={3} sm={3} className="mt-1">
                                    <div>
                                        <Input
                                            id="diastole"
                                            name="diastole"
                                            type="string"
                                            placeholder="0"
                                            onChange={(e) => {
                                                rgxWithSlash.test(e.target.value)
                                                    && validation.handleChange(e)
                                            }}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.diastole || ""}
                                            invalid={
                                                validation.touched.diastole && validation.errors.diastole ? true : false
                                            }
                                        />
                                        {validation.touched.diastole && validation.errors.diastole ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.diastole}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="spo2" className="form-label fw-semibold">SpO2(%)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="spo2"
                                            name="spo2"
                                            type="number"
                                            placeholder="Masukan SpO2"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.spo2 || ""}
                                            invalid={
                                                validation.touched.spo2 && validation.errors.spo2 ? true : false
                                            }
                                        />
                                        {validation.touched.spo2 && validation.errors.spo2 ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.spo2}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="pernapasan" className="form-label fw-semibold">Pernapasan (X/menit)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="pernapasan"
                                            name="pernapasan"
                                            type="number"
                                            placeholder="Pernapasan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.pernapasan || ""}
                                            invalid={
                                                validation.touched.pernapasan && validation.errors.pernapasan ? true : false
                                            }
                                        />
                                        {validation.touched.pernapasan && validation.errors.pernapasan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.pernapasan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="keadaanumum" className="form-label fw-semibold">Keadaan Umum</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="keadaanumum"
                                            name="keadaanumum"
                                            type="textarea"
                                            placeholder="Keadaan Umum Pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.keadaanumum || ""}
                                            invalid={
                                                validation.touched.keadaanumum && validation.errors.keadaanumum ? true : false
                                            }
                                        />
                                        {validation.touched.keadaanumum && validation.errors.keadaanumum ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.keadaanumum}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                {/* <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="aCheckbox" className="form-label fw-semibold">Checkbox</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="aCheckbox"
                                            name="aCheckbox"
                                            type="checkbox"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.aCheckbox || ""}
                                            invalid={
                                                validation.touched.aCheckbox && validation.errors.aCheckbox ? true : false
                                            }
                                        />
                                        {validation.touched.aCheckbox && validation.errors.aCheckbox ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.aCheckbox}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col> */}
                            </Row>
                        </Col>
                        <Col xxl={12} sm={12}>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                <Button type="submit" color="success" placement="top">
                                    SIMPAN
                                </Button>
                                <Button type="button" color="danger" placement="top" onClick={handleClickReset}>
                                    BATAL
                                </Button>
                            </div>
                        </Col>
                        {isHistory && <>
                            <div className="row align-items-center gy-3">
                            <div className="col-sm">
                            <div className="d-flex flex-wrap my-n1">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 avatar-xs">
                                    <div className="avatar-title bg-info rounded-circle">
                                        {/* <i className="ri-shopping-bag-line"></i> */}
                                    </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                    <h6 className="fs-15 mb-0 fw-semibold">
                                        <span className="fw-normal">
                                        Sudah Terupdate Ke Satu Sehat 
                                        </span>
                                    </h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 avatar-xs">
                                    <div className="avatar-title bg-danger rounded-circle">
                                        {/* <i className="ri-shopping-bag-line"></i> */}
                                    </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                    <h6 className="fs-15 mb-0 fw-semibold">
                                        <span className="fw-normal">
                                        Belum Terupdate Ke Satu Sehat, Silahkan Klik Content Yang Belum Terkirim
                                        </span>
                                    </h6>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                            <Col xxl={12} sm={12} className='mt-4'>
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
                                        noDataComponent={<NoDataTable />}
                                    />
                                </div>
                            </Col>
                        </>}
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (TandaVital)