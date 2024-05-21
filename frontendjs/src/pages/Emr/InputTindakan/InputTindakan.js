import React, { useEffect, useState, useRef } from 'react';
import {
    Col, Row, Button, Label, Input, 
    FormFeedback, Form
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect';

import {
    comboHistoryUnitGet, comboTindakanGet, comboJenisPelaksanaGet, comboNamaPelaksanaGet,
    tindakanSave, emrResetForm
} from "../../../store/actions";
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
const InputTindakan = ({ idUnitFilter = [] }) => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    let { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo,
        dataTindakan, loadingTindakan, successTindakan, dataJenisPelaksana, dataNamaPelaksana } = useSelector((state) => ({
            newData: state.Emr.tindakanSave.newData,
            success: state.Emr.tindakanSave.success,
            loading: state.Emr.tindakanSave.loading,
            dataCombo: state.Emr.comboHistoryUnitGet.data,
            loadingCombo: state.Emr.comboHistoryUnitGet.loading,
            successCombo: state.Emr.comboHistoryUnitGet.success,
            dataTindakan: state.Emr.comboTindakanGet.data,
            loadingTindakan: state.Emr.comboTindakanGet.loading,
            successTindakan: state.Emr.comboTindakanGet.success,
            dataJenisPelaksana: state.Emr.comboJenisPelaksanaGet.data,
            dataNamaPelaksana: state.Emr.comboNamaPelaksanaGet.data,
        }));
    dataCombo = dataCombo.filter((combo) => {
        if(idUnitFilter.length === 0){
            return true
        }
        const found = idUnitFilter.find((find) => combo.value === find)
        return !!found
    })
    useEffect(() => {
        if (norecdp) {
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(comboJenisPelaksanaGet(''));
            dispatch(comboNamaPelaksanaGet(''));
        }
    }, [norecdp, dispatch])

    const handleTindakan = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(comboTindakanGet(validation.values.objectkelasfk + '&objectunitfk=' + validation.values.unitlast + '&namaproduk=' + characterEntered));
        }
    };
    const hargaRef = useRef(0);
    const countRef = useRef(1);
    const handleTindakanSelcted = (selected) => {
        validation.setFieldValue('tindakan', selected.value)
        setHarga(selected.totalharga)
        hargaRef.current = selected.totalharga

    }
    const handleUnitLast = (selected) => {
        validation.setFieldValue('unitlast', selected.value)
        validation.setFieldValue('objectkelasfk', selected.objectkelasfk)
        dispatch(comboTindakanGet(selected.objectkelasfk + '&objectunitfk=' + selected.value + '&namaproduk='));
    };
    const handleClickKurang = (e) => {
        if (e === 2) {
            setshowPelaksana2(false)
            validation.setFieldValue('jenispelaksana2', '')
            validation.setFieldValue('namapelaksana2', '')
        } else if (e === 3) {
            setshowPelaksana3(false)
            validation.setFieldValue('jenispelaksana3', '')
            validation.setFieldValue('namapelaksana3', '')
        } else if (e === 4) {
            setshowPelaksana4(false)
            validation.setFieldValue('jenispelaksana4', '')
            validation.setFieldValue('namapelaksana4', '')
        } else if (e === 5) {
            setshowPelaksana5(false)
            validation.setFieldValue('jenispelaksana5', '')
            validation.setFieldValue('namapelaksana5', '')
        } else if (e === 6) {
            setshowPelaksana6(false)
            validation.setFieldValue('jenispelaksana6', '')
            validation.setFieldValue('namapelaksana6', '')
        } else if (e === 7) {
            setshowPelaksana7(false)
            validation.setFieldValue('jenispelaksana7', '')
            validation.setFieldValue('namapelaksana7', '')
        } else if (e === 8) {
            setshowPelaksana8(false)
            validation.setFieldValue('jenispelaksana8', '')
            validation.setFieldValue('namapelaksana8', '')
        }
    }
    const [count, setCount] = useState(1);
    const [harga, setHarga] = useState(0);

    const onClickCount = (temp) => {
        if (temp === 'min') {
            if (count > 0) {
                setCount(count - 1)
                validation.setFieldValue('quantity', count - 1)
            }
        } else {
            setCount(count + 1)
            validation.setFieldValue('quantity', count + 1)
        }

    }

    const [dateStart, setdateStart] = useState((new Date()).toISOString());
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: newData?.norecap ?? norecap,
            norec: newData?.norec ?? '',
            unitlast: newData?.unitlast ?? '',
            objectkelasfk: newData?.objectkelasfk ?? '',
            quantity: newData?.quantity ?? 1,
            tindakan: newData?.tindakan ?? '',
            hargaproduk: newData?.hargaproduk ?? hargaRef,
            tglinput: newData?.tglinput ?? dateStart,
            jenispelaksana1: newData?.jenispelaksana1 ?? '',
            jenispelaksana2: newData?.jenispelaksana2 ?? '',
            jenispelaksana3: newData?.jenispelaksana3 ?? '',
            jenispelaksana4: newData?.jenispelaksana4 ?? '',
            jenispelaksana5: newData?.jenispelaksana5 ?? '',
            jenispelaksana6: newData?.jenispelaksana6 ?? '',
            jenispelaksana7: newData?.jenispelaksana7 ?? '',
            jenispelaksana8: newData?.jenispelaksana8 ?? '',
            namapelaksana1: newData?.namapelaksana1 ?? '',
            namapelaksana2: newData?.namapelaksana2 ?? '',
            namapelaksana3: newData?.namapelaksana3 ?? '',
            namapelaksana4: newData?.namapelaksana4 ?? '',
            namapelaksana5: newData?.namapelaksana5 ?? '',
            namapelaksana6: newData?.namapelaksana6 ?? '',
            namapelaksana7: newData?.namapelaksana7 ?? '',
            namapelaksana8: newData?.namapelaksana8 ?? '',
        },
        validationSchema: Yup.object({
            unitlast: Yup.string().required("Unit Belum Dipilih"),
            tindakan: Yup.string().required("Tindakan Belum Dipilih"),
            tglinput: Yup.string().required("Tanggal Input wajib diisi"),
            jenispelaksana1: Yup.string().required("jenispelaksana 1 Belum Dipilih"),
            namapelaksana1: Yup.string().required("Nama Pelaksana 1 Harus diisi"),
            jenispelaksana2: Yup.string().when('namapelaksana1', (namapelaksana1, schema) => {
                if (showPelaksana2 === true) {
                    return schema
                        .required("Jenis Pelaksana Harus di isi")
                } else return schema
            }),
            namapelaksana2: Yup.string().when("jenispelaksana2", (jenispelaksana2, schema) => {
                if (showPelaksana2 === true) {
                    return schema
                        .required("Nama Pelaksana Harus di isi")
                } else return schema
            }),
            jenispelaksana3: Yup.string().when('namapelaksana1', (namapelaksana1, schema) => {
                if (showPelaksana3 === true) {
                    return schema
                        .required("Jenis Pelaksana Harus di isi")
                } else return schema
            }),
            namapelaksana3: Yup.string().when("jenispelaksana2", (jenispelaksana2, schema) => {
                if (showPelaksana3 === true) {
                    return schema
                        .required("Nama Pelaksana Harus di isi")
                } else return schema
            }),
            jenispelaksana4: Yup.string().when('namapelaksana1', (namapelaksana1, schema) => {
                if (showPelaksana4 === true) {
                    return schema
                        .required("Jenis Pelaksana Harus di isi")
                } else return schema
            }),
            namapelaksana4: Yup.string().when("jenispelaksana2", (jenispelaksana2, schema) => {
                if (showPelaksana4 === true) {
                    return schema
                        .required("Nama Pelaksana Harus di isi")
                } else return schema
            }),
            jenispelaksana5: Yup.string().when('namapelaksana1', (namapelaksana1, schema) => {
                if (showPelaksana5 === true) {
                    return schema
                        .required("Jenis Pelaksana Harus di isi")
                } else return schema
            }),
            namapelaksana5: Yup.string().when("jenispelaksana2", (jenispelaksana2, schema) => {
                if (showPelaksana5 === true) {
                    return schema
                        .required("Nama Pelaksana Harus di isi")
                } else return schema
            }),
            jenispelaksana6: Yup.string().when('namapelaksana1', (namapelaksana1, schema) => {
                if (showPelaksana6 === true) {
                    return schema
                        .required("Jenis Pelaksana Harus di isi")
                } else return schema
            }),
            namapelaksana6: Yup.string().when("jenispelaksana2", (jenispelaksana2, schema) => {
                if (showPelaksana6 === true) {
                    return schema
                        .required("Nama Pelaksana Harus di isi")
                } else return schema
            }),
            jenispelaksana7: Yup.string().when('namapelaksana1', (namapelaksana1, schema) => {
                if (showPelaksana7 === true) {
                    return schema
                        .required("Jenis Pelaksana Harus di isi")
                } else return schema
            }),
            namapelaksana7: Yup.string().when("jenispelaksana2", (jenispelaksana2, schema) => {
                if (showPelaksana7 === true) {
                    return schema
                        .required("Nama Pelaksana Harus di isi")
                } else return schema
            }),

        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values)
            dispatch(tindakanSave(values, ''));
            resetForm({ values: '' })
        }
    })
    const handleBeginOnChangeTglInput = (newBeginValue) => {
        // setdateStart(dateString)

    }

    const [showPelaksana1, setshowPelaksana1] = useState(true);
    const [showPelaksana2, setshowPelaksana2] = useState(false);
    const [showPelaksana3, setshowPelaksana3] = useState(false);
    const [showPelaksana4, setshowPelaksana4] = useState(false);
    const [showPelaksana5, setshowPelaksana5] = useState(false);
    const [showPelaksana6, setshowPelaksana6] = useState(false);
    const [showPelaksana7, setshowPelaksana7] = useState(false);
    const [showPelaksana8, setshowPelaksana8] = useState(false);
    const [showPelaksana9, setshowPelaksana9] = useState(false);
    const [showPelaksana10, setshowPelaksana10] = useState(false);
    return (
        <React.Fragment>
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
                        <Col lg={6}>
                            <Row className="gy-2">
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Unit</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div>
                                        <CustomSelect
                                            id="unitlast"
                                            name="unitlast"
                                            options={dataCombo}
                                            value={validation.values.unitlast || ""}
                                            className={`input ${validation.errors.unitlast ? "is-invalid" : ""}`}
                                            onChange={handleUnitLast}
                                        />
                                        {validation.touched.unitlast && validation.errors.unitlast ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.unitlast}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tindakan" className="form-label">Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div>
                                        <CustomSelect
                                            id="tindakan"
                                            name="tindakan"
                                            options={dataTindakan}
                                            value={validation.values.tindakan || ""}
                                            className={`input ${validation.errors.tindakan ? "is-invalid" : ""}`}
                                            onChange={handleTindakanSelcted}
                                            onInputChange={handleTindakan}
                                        />
                                        {validation.touched.tindakan && validation.errors.tindakan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tindakan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tanggal" className="form-label">Tanggal Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <KontainerFlatpickr
                                        isError={validation.touched?.tglinput &&
                                            !!validation.errors?.tglinput}
                                        id="tglinput"
                                        options={{
                                        dateFormat: 'Y-m-d',
                                        defaultDate: 'today',
                                        }}
                                        value={validation.values.tglinput}
                                        onChange={([newDate]) => {
                                            validation.setFieldValue('tglinput', newDate.toISOString())
                                        }}
                                    />
                                    {validation.touched?.tglinput
                                        && !!validation.errors.tglinput && (
                                            <FormFeedback type="invalid">
                                                <div>{validation.errors.tglinput}</div>
                                            </FormFeedback>
                                        )}
                                </Col>
                                <Col lg={12} className='mt-2'>
                                    <Row>
                                        <Col lg={4} sm={6}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="qty" className="form-label fw-semibold">Quantity</Label>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} className="mt-1">
                                            <div>
                                                <div className="input-step">
                                                    <button type="button" className="minus" onClick={() => onClickCount('min')}>
                                                        –
                                                    </button>
                                                    <Input
                                                        type="number"
                                                        className="product-quantity"
                                                        id="product-qty-1"
                                                        value={count}
                                                        readOnly
                                                    />
                                                    <button type="button" className="plus" onClick={() => onClickCount('plus')}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col lg={2} sm={6}> */}
                                        {/* <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tinggibadan" className="form-label fw-semibold">Harga</Label>
                                            </div> */}
                                        {/* </Col> */}
                                        <Col lg={4} sm={6} className="mt-1">
                                            <div>
                                                <Input
                                                    type="text"
                                                    className="form-control bg-light border-0 product-line-price"
                                                    id="harga"
                                                    placeholder="Rp.0.00"
                                                    value={"Rp " + harga * count}
                                                    readOnly
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={17} lg={19} xl={20} className="mt-2" >
                            <Row> 
                                {showPelaksana1 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana1" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana1"
                                                                    name="jenispelaksana1"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana1 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana1 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana1', value?.value)}
                                                                />
                                                                {validation.touched.jenispelaksana1 && validation.errors.jenispelaksana1 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana1}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="namapelaksana1" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana1"
                                                                    name="namapelaksana1"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana1 || ""}
                                                                    className={`input ${validation.errors.namapelaksana1 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana1', value?.value)}
                                                                />
                                                                {validation.touched.namapelaksana1 && validation.errors.namapelaksana1 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana1}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className='d-flex flex-row-reverse'>
                                                            <Button type="button" color="success" placement="top" onClick={() => setshowPelaksana2(true)}>
                                                                +
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana2 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana2" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana2"
                                                                    name="jenispelaksana2"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana2 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana2 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana2', value?.value)}
                                                                />
                                                                {validation.touched.jenispelaksana2 && validation.errors.jenispelaksana2 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana2}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="namapelaksana2" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana2"
                                                                    name="namapelaksana2"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana2 || ""}
                                                                    className={`input ${validation.errors.namapelaksana2 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana2', value?.value)}
                                                                />
                                                                {validation.touched.namapelaksana2 && validation.errors.namapelaksana2 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana2}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className='d-flex flex-row-reverse gap-2'>
                                                            <Button type="button" color="success" placement="top" onClick={() => setshowPelaksana3(true)}>
                                                                +
                                                            </Button>
                                                            <Button type="button" color="danger" placement="top" onClick={() => handleClickKurang(2)}>
                                                                -
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana3 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana3" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana3"
                                                                    name="jenispelaksana3"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana3 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana3 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana3', value?.value)}
                                                                />
                                                                {validation.touched.jenispelaksana3 && validation.errors.jenispelaksana3 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana3}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="namapelaksana3" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana3"
                                                                    name="namapelaksana3"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana3 || ""}
                                                                    className={`input ${validation.errors.namapelaksana3 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana3', value?.value)}
                                                                />
                                                                {validation.touched.namapelaksana3 && validation.errors.namapelaksana3 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana3}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className='d-flex flex-row-reverse gap-2'>
                                                            <Button type="button" color="success" placement="top" onClick={() => setshowPelaksana4(true)}>
                                                                +
                                                            </Button>
                                                            <Button type="button" color="danger" placement="top" onClick={() => handleClickKurang(3)}>
                                                                -
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana4 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana4" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana4"
                                                                    name="jenispelaksana4"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana4 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana4 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana3', value?.value)}
                                                                />
                                                                {validation.touched.jenispelaksana4 && validation.errors.jenispelaksana4 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana4}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="namapelaksana4" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana4"
                                                                    name="namapelaksana4"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana4 || ""}
                                                                    className={`input ${validation.errors.namapelaksana4 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana4', value?.value)}
                                                                />
                                                                {validation.touched.namapelaksana4 && validation.errors.namapelaksana4 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana4}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className='d-flex flex-row-reverse gap-2'>
                                                            <Button type="button" color="success" placement="top" onClick={() => setshowPelaksana5(true)}>
                                                                +
                                                            </Button>
                                                            <Button type="button" color="danger" placement="top" onClick={() => handleClickKurang(4)}>
                                                                -
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana5 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana5" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana5"
                                                                    name="jenispelaksana5"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana5 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana5 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana5', value?.value)}
                                                                />
                                                                {validation.touched.jenispelaksana5 && validation.errors.jenispelaksana5 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana5}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="namapelaksana5" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana5"
                                                                    name="namapelaksana5"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana5 || ""}
                                                                    className={`input ${validation.errors.namapelaksana5 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana5', value?.value)}
                                                                />
                                                                {validation.touched.namapelaksana5 && validation.errors.namapelaksana5 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana5}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className='d-flex flex-row-reverse gap-2'>
                                                            <Button type="button" color="success" placement="top" onClick={() => setshowPelaksana6(true)}>
                                                                +
                                                            </Button>
                                                            <Button type="button" color="danger" placement="top" onClick={() => handleClickKurang(5)}>
                                                                -
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana6 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana6" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana6"
                                                                    name="jenispelaksana6"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana6 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana6 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana1', value?.value)}
                                                                />
                                                                {validation.touched.jenispelaksana6 && validation.errors.jenispelaksana6 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana6}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="namapelaksana6" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana6"
                                                                    name="namapelaksana6"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana6 || ""}
                                                                    className={`input ${validation.errors.namapelaksana6 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana6', value?.value)}
                                                                />
                                                                {validation.touched.namapelaksana6 && validation.errors.namapelaksana6 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana6}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col lg={2} className='d-flex flex-row-reverse gap-2'>
                                                            <Button type="button" color="success" placement="top" onClick={() => {}}>
                                                                +
                                                            </Button>
                                                            <Button type="button" color="danger" placement="top" onClick={() => handleClickKurang(6)}>
                                                                -
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                            </Row>
                        </Col>
                        <Col xxl={12} sm={12} className='d-flex flex-row-reverse mt-4'>
                            <Button type="submit" color="success" placement="top" >
                                SIMPAN
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (InputTindakan)