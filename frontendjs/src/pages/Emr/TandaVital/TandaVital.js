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
import { emrTtvSave, emrResetForm, emrTtvGet, resetRegisterFlag } from "../../../store/actions";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import DataTable from 'react-data-table-component';

const TandaVital = () => {
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
        if (newData !== null && norecdp) {
            dispatch(emrTtvGet(norecdp));
        }
    }, [newData, norecdp, dispatch])

    const [hasilGcs, sethasilGcs] = useState('');
    const [rate, setRate] = useState(0);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
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
            idgcs: editData?.idgcs?? ''
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
            tekanandarah: Yup.string().required("Tekanan Darah wajib diisi"),
            spo2: Yup.string().required("SpO2 wajib diisi"),
            pernapasan: Yup.string().required("Pernapasan wajib diisi"),
            keadaanumum: Yup.string().required("Keadaan Umum wajib diisi"),
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
            // gcsm: Yup.string().when("gcsv", (gcsv, schema) => {
            //     if (validation.values.gcsm === '' || validation.values.gcsm === null) {
            //         return schema
            //             .required("M wajib diisi")
            //     } else {
            //         let tempgcse = validation.values.gcse === '' || validation.values.gcse === null ? 0 : validation.values.gcse
            //         let tempgcsm = validation.values.gcsm === '' || validation.values.gcsm === null ? 0 : validation.values.gcsm
            //         let tempgcsv = validation.values.gcsv === '' || validation.values.gcsv === null ? 0 : validation.values.gcsv
            //         setRate(tempgcse + tempgcsm + tempgcsv)
            //         return schema
            //     }
            // }),
            // gcsv: Yup.string().when("keadaanumum", (keadaanumum, schema) => {
            //     if (validation.values.gcsv === '' || validation.values.gcsv === null) {
            //         return schema
            //             .required("V wajib diisi")
            //     } else {
            //         let tempgcse = validation.values.gcse === '' || validation.values.gcse === null ? 0 : validation.values.gcse
            //         let tempgcsm = validation.values.gcsm === '' || validation.values.gcsm === null ? 0 : validation.values.gcsm
            //         let tempgcsv = validation.values.gcsv === '' || validation.values.gcsv === null ? 0 : validation.values.gcsv
            //         setRate(tempgcse + tempgcsm + tempgcsv)
            //         return schema
            //     }
            // }),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            dispatch(emrTtvSave(values, ''));
            resetForm({ values: '' })
        }
    })
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

            name: <span className='font-weight-bold fs-13'>T.Darah</span>,
            selector: row => row.tekanandarah,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Pernapasan</span>,
            selector: row => row.pernapasan,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Suhu</span>,
            selector: row => row.suhu,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Nadi</span>,
            selector: row => row.nadi,
            sortable: true
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
            selector: row => row.namagcs,
            sortable: true
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
    };
    
    
    useEffect(() => {
        if(rate<=3){
            sethasilGcs('Coma')
        }else if(rate===4){
            sethasilGcs('Semi-coma')
        }else if(rate>=5 && rate<=6){
            sethasilGcs('Sopor')
        }else if(rate>=7 && rate<=9){
            sethasilGcs('Somnolen')
        }else if(rate>=10 && rate<=11){
            sethasilGcs('Delirium')
        }else if(rate>=12 && rate<=13){
            sethasilGcs('Apatis')
        }else if(rate>=14 && rate<=15){
            sethasilGcs('Cosposmentis')
        }
      }, [rate]);

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
                    {/* {success && success ? (
                        <>
                            {toast("Tanda Vital Berhasil Disimpan.....", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                            <ToastContainer autoClose={2000} limit={1}/>
                        </>
                    ) : null} */}
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
                                <Col lg={5} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="gcs" className="form-label fw-semibold">GCS(EMV)</Label>
                                    </div>
                                </Col>
                                <Col lg={7} sm={6} className="mt-1">
                                    <Row>
                                        <Col lg={4} sm={6}>
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
                                        <Col lg={4} sm={6}>
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
                                        <Col lg={4} sm={6}>
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
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tekanandarah" className="form-label fw-semibold">Tekanan Darah(/70mmhg)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="tekanandarah"
                                            name="tekanandarah"
                                            type="number"
                                            placeholder="Tekanan Darah"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.tekanandarah || ""}
                                            invalid={
                                                validation.touched.tekanandarah && validation.errors.tekanandarah ? true : false
                                            }
                                        />
                                        {validation.touched.tekanandarah && validation.errors.tekanandarah ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tekanandarah}</div></FormFeedback>
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
                            <Button type="submit" color="info" className="rounded-pill" placement="top" id="tooltipTop">
                                SIMPAN
                            </Button>
                            <UncontrolledTooltip placement="top" target="tooltipTop" > SIMPAN Tanda-Tanda Vital </UncontrolledTooltip>

                            <Button type="button" color="danger" className="rounded-pill" placement="top" id="tooltipTop2" onClick={handleClickReset}>
                                BATAL
                            </Button>
                            <UncontrolledTooltip placement="top" target="tooltipTop2" > BATAL Tanda-Tanda Vital </UncontrolledTooltip>

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

export default (TandaVital)