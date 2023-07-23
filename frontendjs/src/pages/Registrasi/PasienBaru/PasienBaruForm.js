import React, { useEffect, useRef, useState } from 'react';
import UiContent from '../../../Components/Common/UiContent';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import withRouter from "../../../Components/Common/withRouter";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    Form, FormFeedback, Alert
} from 'reactstrap';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//import images
import progileBg from '../../../assets/images/profile-bg-2.jpg';

import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { masterGet, desaGet, kecamatanGet } from '../../../store/master/action';
import { registrasiSave, registrasiResetForm, registrasiGet } from "../../../store/actions";
import CustomSelect from '../../Select/Select'
import { rgxAllNumber } from '../../../utils/regexcommon';

const PasienBaru = () => {
    document.title = "Profile Pasien Baru";
    const dispatch = useDispatch();
    const { data, dataJenisKelamin, dataTitle, dataGD, dataKebangsaan,
        dataPerkawinan, dataPendidikan, dataPekerjaan, dataEtnis, dataBahasa, dataDesa,
        dataNegara, loading, error, newData, loadingSave, success, errorSave } = useSelector((state) => ({
            data: state.Master.masterGet.data.agama,
            dataJenisKelamin: state.Master.masterGet.data.jeniskelamin,
            dataTitle: state.Master.masterGet.data.title,
            dataGD: state.Master.masterGet.data.golongandarah,
            dataKebangsaan: state.Master.masterGet.data.kebangsaan,
            dataPerkawinan: state.Master.masterGet.data.perkawinan,
            dataPendidikan: state.Master.masterGet.data.pendidikan,
            dataPekerjaan: state.Master.masterGet.data.pekerjaan,
            dataEtnis: state.Master.masterGet.data.etnis,
            dataBahasa: state.Master.masterGet.data.bahasa,
            dataDesa: state.Master.desaGet.data,
            dataNegara: state.Master.masterGet.data.negara,
            newData: state.Registrasi.registrasiSave.newData,
            loadingSave: state.Registrasi.registrasiSave.loading,
            errorSave: state.Registrasi.registrasiSave.error,
            success: state.Registrasi.registrasiSave.success,
            loading: state.Master.masterGet.loading,
            error: state.Master.masterGet.error,
        }));

    useEffect(() => {
        dispatch(masterGet());
        dispatch(desaGet(''));
        // dispatch(kecamatanGet())
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(registrasiResetForm());
        }
    }, [dispatch])
    // Card Header Tabs
    const [cardHeaderTab, setcardHeaderTab] = useState("1");
    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    };


    const [companyType, setcompanyType] = useState(null);
    const [kecamatan, setKecamatan] = useState(null);
    const [isWni, setisWni] = useState("");
    const [isSesuaiKtp, setisSesuaiKtp] = useState(false);

    function handlecompanyType(companyType) {
        setcompanyType(companyType);
        console.log(companyType);
    }

    const refNegara = useRef(null);
    const refNegaraDomisili = useRef(null);
    
    const handleChangeDesa = (selected) => {
        validation.setFieldValue('desa', selected.value)
        validation.setFieldValue('kecamatan', selected.namakecamatan)
        validation.setFieldValue('kota', selected.namakabupaten)
        validation.setFieldValue('provinsi', selected.namaprovinsi)
        validation.setFieldValue('pos', selected.kodepos)
        // console.log(selected);
    };
    const handleChangeDesaDomisili = (selected) => {
        validation.setFieldValue('desaDomisili', selected.value)
        validation.setFieldValue('kecamatanDomisili', selected.namakecamatan)
        validation.setFieldValue('kotaDomisili', selected.namakabupaten)
        validation.setFieldValue('provinsiDomisili', selected.namaprovinsi)
        validation.setFieldValue('posDomisili', selected.kodepos)
        // console.log(selected);
    };

    const handleDesa = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(desaGet(characterEntered));
            // }, [dispatch]);
        }
    };

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: newData?.id ?? undefined,
            namapasien: newData?.namapasien ?? "",
            noidentitas: newData?.noidentitas ?? "",
            jeniskelamin: newData?.jeniskelamin ?? "",
            titlepasien: newData?.titlepasien ?? "",
            tgllahir: newData?.tgllahir ?? "",
            agama: newData?.agama ?? "",
            goldarah: newData?.goldarah ?? "",
            kebangsaan: newData?.kebangsaan ?? "",
            statusperkawinan: newData?.statusperkawinan ?? "",
            pendidikan: newData?.pendidikan ?? "",
            pekerjaan: newData?.pekerjaan ?? "",
            suku: newData?.suku ?? "",
            bahasa: newData?.bahasa ?? "",
            alamatktp: newData?.alamatktp ?? "",
            rt: newData?.rt ?? "",
            rw: newData?.rw ?? "",
            desa: newData?.desa ?? "",
            kecamatan: newData?.kecamatan ?? "",
            kota: newData?.kota ?? "",
            provinsi: newData?.provinsi ?? "",
            pos: newData?.pos ?? "",
            negara: newData?.negara ?? "",
            alamatdomisili: newData?.alamatdomisili ?? "",
            rtdomisili: newData?.rtdomisili ?? "",
            rwdomisili: newData?.rwdomisili ?? "",
            desaDomisili: newData?.desaDomisili ?? "",
            kecamatanDomisili: newData?.kecamatanDomisili ?? "",
            kotaDomisili: newData?.kotaDomisili ?? "",
            provinsiDomisili: newData?.provinsiDomisili ?? "",
            posDomisili: newData?.posDomisili ?? "",
            negaraDomisili: newData?.negaraDomisili ?? "",
        },
        validationSchema: Yup.object({
            namapasien: Yup.string().required("Nama pasien wajib diisi"),
            noidentitas: Yup.string().required("Nomor identitas wajib diisi"),
            jeniskelamin: Yup.string().required("Jenis Kelamin wajib diisi"),
            titlepasien: Yup.string().required("Title Pasien wajib diisi"),
            tgllahir: Yup.string().required("Tanggal Lahir wajib diisi"),
            agama: Yup.string().required("Agama wajib diisi"),
            goldarah: Yup.string().required("Golongan Darah wajib diisi"),
            kebangsaan: Yup.string().required("Kebangsaan wajib diisi"),
            statusperkawinan: Yup.string().required("Status Perkawinan wajib diisi"),
            pendidikan: Yup.string().required("Pendidikan wajib diisi"),
            pekerjaan: Yup.string().required("Pekerjaan wajib diisi"),
            suku: Yup.string().required("Suku wajib diisi"),
            bahasa: Yup.string().required("Bahasa wajib diisi"),
            alamatktp: Yup.string().required("Alamat wajib diisi"),
            rt: Yup.string().required("RT wajib diisi"),
            rw: Yup.string().required("RW wajib diisi"),
            desa: Yup.string().required("Desa wajib diisi"),
            negara: Yup.string().required("negara wajib diisi"),
            alamatdomisili: Yup.string().required("Alamat Domisili Wajib diisi"),
            rtdomisili: Yup.string().required("RT wajib diisi"),
            rwdomisili: Yup.string().required("RW wajib diisi"),
            desaDomisili: Yup.string().required("Desa wajib diisi"),
            negaraDomisili: Yup.string().required("negara wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(registrasiSave(values, ''));
            // console.log(values)
        }
    });

    useEffect(() => {
        const setFF = validation.setFieldValue
        if(!isSesuaiKtp) {
            return
        }
        setFF('alamatdomisili', validation.values.alamatktp)
        setFF('rtdomisili', validation.values.rt)
        setFF('rwdomisili', validation.values.rw)
        setFF('desaDomisili', validation.values.desa)
        setFF('kotaDomisili', validation.values.kota)
        setFF('provinsiDomisili', validation.values.provinsi)
        setFF('posDomisili', validation.values.pos)
        setFF('negaraDomisili', validation.values.negara)
    }, [
        validation.values.alamatktp,
        validation.values.rt,
        validation.values.rw,
        validation.values.desa,
        validation.values.kota,
        validation.values.provinsi,
        validation.values.pos,
        validation.values.negara,
        validation.setFieldValue,
        isSesuaiKtp
    ])

    const handleChangeKebangsaan = (selected) => {
        validation.setFieldValue('kebangsaan', selected.value)
        if (selected.value === 1){
            validation.setFieldValue("negara", 13)
            validation.setFieldValue("negaraDomisili", 13)
        }else{
            refNegara.current?.clearValue()
            refNegaraDomisili.current?.clearValue()
        }
    }
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <div className="page-content">
                <Container fluid>
                    <div className="position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg profile-setting-img">
                            <img src={progileBg} className="profile-wid-img" alt="" />
                        </div>
                    </div>

                    <Row>
                        <Col xxl={12}>
                            <Card className="mt-xxl-n5">
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-shrink-0 ms-2">

                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer", fontWeight: "bold" }} className={classnames({ active: cardHeaderTab === "1", })} onClick={() => { cardHeaderToggle("1"); }} >
                                                    Profile
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer", fontWeight: "bold" }} className={classnames({ active: cardHeaderTab === "2", })} onClick={() => { cardHeaderToggle("2"); }} >
                                                    Informasi Lainnya
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                    </div>
                                </div>
                                <CardBody>
                                    <TabContent activeTab={cardHeaderTab} className="text-muted">
                                        {/* <Form className="gy-4"
                                                action="#"> */}
                                        <TabPane tabId="1" id="home2">
                                            <Form onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                                className="gy-4"
                                                action="#">
                                                {/* {success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success" >
                                                            Pasien berhasil di simpan, silahkan lanjutkan Registrasi...
                                                        </Alert>
                                                    </>
                                                ) : null} */}
                                                <Row>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Data Diri Pasien</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="noidentitas" className="form-label">No Identitas</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="noidentitas"
                                                                                name="noidentitas"
                                                                                type="string"
                                                                                placeholder="Masukkan No Identitas pasien"
                                                                                onChange={validation.handleChange}
                                                                                onBlur={validation.handleBlur}
                                                                                value={validation.values.noidentitas || ""}
                                                                                invalid={
                                                                                    validation.touched.noidentitas && validation.errors.noidentitas ? true : false
                                                                                }
                                                                            />
                                                                            {validation.touched.noidentitas && validation.errors.noidentitas ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.noidentitas}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Nama Pasien</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="namapasien"
                                                                                name="namapasien"
                                                                                type="text"
                                                                                placeholder="Masukkan nama pasien"
                                                                                onChange={validation.handleChange}
                                                                                onBlur={validation.handleBlur}
                                                                                value={validation.values.namapasien || ""}
                                                                                invalid={
                                                                                    validation.touched.namapasien && validation.errors.namapasien ? true : false
                                                                                }
                                                                            />
                                                                            {validation.touched.namapasien && validation.errors.namapasien ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.namapasien}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="jeniskelamin" className="form-label">Jenis Kelamin</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="jeniskelamin"
                                                                                name="jeniskelamin"
                                                                                options={dataJenisKelamin}
                                                                                value={validation.values.jeniskelamin || ""}
                                                                                className={`input ${validation.errors.jeniskelamin ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('jeniskelamin', value.value)}
                                                                            />
                                                                            {validation.touched.jeniskelamin && validation.errors.jeniskelamin ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.jeniskelamin}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="titlepasien" className="form-label">Title Pasien</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="titlepasien"
                                                                                name="titlepasien"
                                                                                options={dataTitle}
                                                                                value={validation.values.titlepasien || ""}
                                                                                className={`input ${validation.errors.titlepasien ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('titlepasien', value.value)}
                                                                            />
                                                                            {validation.touched.titlepasien && validation.errors.titlepasien ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.titlepasien}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="tgllahir" className="form-label">Tanggal Lahir</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Flatpickr
                                                                                className="form-control"
                                                                                options={{
                                                                                    dateFormat: "Y-m-d",
                                                                                    defaultDate: "today",
                                                                                    maxDate: "today"
                                                                                }}
                                                                                value={new Date(validation.values.tgllahir) || ""}
                                                                                onChange={([newDate]) => {
                                                                                    validation.setFieldValue("tgllahir", newDate.toISOString())
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="agama" className="form-label">Agama</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="agama"
                                                                                name="agama"
                                                                                options={data}
                                                                                value={validation.values.agama || ""}
                                                                                className={`input ${validation.errors.agama ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('agama', value.value)}
                                                                            />
                                                                            {validation.touched.agama && validation.errors.agama ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.agama}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="goldarah" className="form-label">Gol Darah</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="goldarah"
                                                                                name="goldarah"
                                                                                options={dataGD}
                                                                                value={validation.values.goldarah || ""}
                                                                                className={`input ${validation.errors.goldarah ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('goldarah', value.value)}
                                                                            />
                                                                            {validation.touched.goldarah && validation.errors.goldarah ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.goldarah}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kebangsaan" className="form-label">Kebangsaan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="kebangsaan"
                                                                                name="kebangsaan"
                                                                                options={dataKebangsaan}
                                                                                value={validation.values.kebangsaan || ""}
                                                                                className={`input ${validation.errors.kebangsaan ? "is-invalid" : ""}`}
                                                                                onChange={handleChangeKebangsaan}

                                                                            />
                                                                            {validation.touched.kebangsaan && validation.errors.kebangsaan ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.kebangsaan}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="statusperkawinan" className="form-label">Status Perkawinan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="statusperkawinan"
                                                                                name="statusperkawinan"
                                                                                options={dataPerkawinan}
                                                                                value={validation.values.statusperkawinan || ""}
                                                                                className={`input ${validation.errors.statusperkawinan ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('statusperkawinan', value.value)}
                                                                            />
                                                                            {validation.touched.statusperkawinan && validation.errors.statusperkawinan ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.statusperkawinan}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="pendidikan" className="form-label">Pendidikan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="pendidikan"
                                                                                name="pendidikan"
                                                                                options={dataPendidikan}
                                                                                value={validation.values.pendidikan || ""}
                                                                                className={`input ${validation.errors.pendidikan ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('pendidikan', value.value)}
                                                                            />
                                                                            {validation.touched.pendidikan && validation.errors.pendidikan ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.pendidikan}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="pekerjaan" className="form-label">Pekerjaan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="pekerjaan"
                                                                                name="pekerjaan"
                                                                                options={dataPekerjaan}
                                                                                value={validation.values.pekerjaan || ""}
                                                                                className={`input ${validation.errors.pekerjaan ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('pekerjaan', value.value)}
                                                                            />
                                                                            {validation.touched.pekerjaan && validation.errors.pekerjaan ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.pekerjaan}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="suku" className="form-label">SUKU</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="suku"
                                                                                name="suku"
                                                                                options={dataEtnis}
                                                                                value={validation.values.suku || ""}
                                                                                className={`input ${validation.errors.suku ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('suku', value.value)}
                                                                            />
                                                                            {validation.touched.suku && validation.errors.suku ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.suku}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="bahasa" className="form-label">Bahasa Yang Dikuasai</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="bahasa"
                                                                                name="bahasa"
                                                                                options={dataBahasa}
                                                                                value={validation.values.bahasa || ""}
                                                                                className={`input ${validation.errors.bahasa ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('bahasa', value.value)}
                                                                            />
                                                                            {validation.touched.bahasa && validation.errors.bahasa ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.bahasa}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Alamat KTP</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="alamatktp" className="form-label">Alamat KTP</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="alamatktp"
                                                                                name="alamatktp"
                                                                                type="textarea"
                                                                                placeholder="Masukkan Alamat pasien"
                                                                                onChange={validation.handleChange}
                                                                                onBlur={validation.handleBlur}
                                                                                value={validation.values.alamatktp || ""}
                                                                                invalid={
                                                                                    validation.touched.alamatktp && validation.errors.alamatktp ? true : false
                                                                                }
                                                                            />
                                                                            {validation.touched.alamatktp && validation.errors.alamatktp ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.alamatktp}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="rtrw" className="form-label">RT / RW</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="row">
                                                                            <div className="col-sm">
                                                                                <Input
                                                                                    id="rt"
                                                                                    name="rt"
                                                                                    type="input"
                                                                                    placeholder="RT"
                                                                                    onChange={(e) => {
                                                                                        rgxAllNumber.test(e.target.value) 
                                                                                            && validation.setFieldValue("rt", e.target.value)
                                                                                    }}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.rt || ""}
                                                                                    invalid={
                                                                                        validation.touched.rt && validation.errors.rt ? true : false
                                                                                    }
                                                                                />
                                                                                {validation.touched.rt && validation.errors.rt ? (
                                                                                    <FormFeedback type="invalid"><div>{validation.errors.rt}</div></FormFeedback>
                                                                                ) : null}
                                                                            </div>
                                                                            <div className="col-sm">
                                                                                <Input
                                                                                    id="rw"
                                                                                    name="rw"
                                                                                    type="input"
                                                                                    placeholder="RW"
                                                                                    onChange={(e) => {
                                                                                        rgxAllNumber.test(e.target.value) 
                                                                                            && validation.setFieldValue("rw", e.target.value)
                                                                                    }}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.rw || ""}
                                                                                    invalid={
                                                                                        validation.touched.rw && validation.errors.rw ? true : false
                                                                                    }
                                                                                />
                                                                                {validation.touched.rw && validation.errors.rw ? (
                                                                                    <FormFeedback type="invalid"><div>{validation.errors.rw}</div></FormFeedback>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="desa" className="form-label">Kelurahan / Desa</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="desa"
                                                                                name="desa"
                                                                                options={dataDesa}
                                                                                value={validation.values.desa || ""}
                                                                                className={`input ${validation.errors.desa ? "is-invalid" : ""}`}
                                                                                // onChange={value => validation.setFieldValue('desa', value.value)} 
                                                                                onChange={handleChangeDesa}
                                                                                onInputChange={handleDesa}
                                                                            />
                                                                            {validation.touched.desa && validation.errors.desa ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.desa}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kecamatan" className="form-label">Kecamatan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="kecamatan"
                                                                                name="kecamatan"
                                                                                type="input"
                                                                                placeholder="Kecamatan"
                                                                                value={validation.values.kecamatan || ""}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kota" className="form-label">Kota / Kabupaten</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="kota"
                                                                                name="kota"
                                                                                type="input"
                                                                                placeholder="kota"
                                                                                value={validation.values.kota || ""}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="pos" className="form-label">Kode POS</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="pos"
                                                                                name="pos"
                                                                                type="input"
                                                                                placeholder="pos"
                                                                                value={validation.values.pos || ""}
                                                                                onChange={(e) => {
                                                                                    rgxAllNumber.test(e.target.value) 
                                                                                        && validation.setFieldValue("pos", e.target.value)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="provinsi" className="form-label">Provinsi</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="provinsi"
                                                                                name="provinsi"
                                                                                type="input"
                                                                                placeholder="provinsi"
                                                                                value={validation.values.provinsi || ""}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="negara" className="form-label">Negara</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect
                                                                                id="negara"
                                                                                name="negara"
                                                                                options={dataNegara}
                                                                                ref={refNegara}
                                                                                value={validation.values.negara || null}
                                                                                className={`input ${validation.errors.negara ? "is-invalid" : ""}`}
                                                                                onChange={value => {
                                                                                    validation.setFieldValue('negara', value?.value || "")
                                                                                }}
                                                                            />
                                                                            {validation.touched.negara && validation.errors.negara ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.negara}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Alamat Domisili</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">
                                                                    {/* <Col xxl={6} md={6}> */}
                                                                    <div className="form-check ms-2">
                                                                        <Input className="form-check-input" type="checkbox" 
                                                                            checked={isSesuaiKtp}
                                                                            id="formCheck1" 
                                                                            onChange={e => setisSesuaiKtp(e.target.checked)}/>
                                                                        <Label className="form-check-label" htmlFor="formCheck1" style={{ color: "black" }} >
                                                                            Sesuai KTP
                                                                        </Label>
                                                                    </div>
                                                                    {/* </Col> */}

                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="alamatdomisili" className="form-label">Alamat Domisili</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <Input
                                                                                id="alamatdomisili"
                                                                                name="alamatdomisili"
                                                                                type="textarea"
                                                                                placeholder="Masukkan Alamat pasien"
                                                                                onChange={validation.handleChange}
                                                                                onBlur={validation.handleBlur}
                                                                                value={validation.values.alamatdomisili || ""}
                                                                                invalid={
                                                                                    validation.touched.alamatdomisili && validation.errors.alamatdomisili ? true : false
                                                                                }
                                                                                disabled={isSesuaiKtp}
                                                                            />
                                                                            {validation.touched.alamatdomisili && validation.errors.alamatdomisili ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.alamatdomisili}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="rtrwdomisili" className="form-label">RT / RW</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="row">
                                                                            <div className="col-sm">
                                                                            <Input
                                                                                    id="rtdomisili"
                                                                                    name="rtdomisili"
                                                                                    type="input"
                                                                                    placeholder="RT"
                                                                                    onChange={(e) => {
                                                                                        rgxAllNumber.test(e.target.value) 
                                                                                            && validation.setFieldValue("rtdomisili", e.target.value)
                                                                                    }}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.rtdomisili || ""}
                                                                                    invalid={
                                                                                        validation.touched.rtdomisili && validation.errors.rtdomisili ? true : false
                                                                                    }
                                                                                />
                                                                                {validation.touched.rtdomisili && validation.errors.rtdomisili ? (
                                                                                    <FormFeedback type="invalid"><div>{validation.errors.rtdomisili}</div></FormFeedback>
                                                                                ) : null}
                                                                            </div>
                                                                            <div className="col-sm">
                                                                            <Input
                                                                                    id="rwdomisili"
                                                                                    name="rwdomisili"
                                                                                    type="input"
                                                                                    placeholder="RW"
                                                                                    onChange={(e) => {
                                                                                        rgxAllNumber.test(e.target.value) 
                                                                                            && validation.setFieldValue("rwdomisili", e.target.value)
                                                                                    }}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.rwdomisili || ""}
                                                                                    invalid={
                                                                                        validation.touched.rwdomisili && validation.errors.rwdomisili ? true : false
                                                                                    }
                                                                                />
                                                                                {validation.touched.rwdomisili && validation.errors.rwdomisili ? (
                                                                                    <FormFeedback type="invalid"><div>{validation.errors.rwdomisili}</div></FormFeedback>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="desa" className="form-label">Kelurahan / Desa</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <CustomSelect
                                                                                id="desaDomisili"
                                                                                name="desaDomisili"
                                                                                options={dataDesa}
                                                                                value={validation.values.desaDomisili || ""}
                                                                                className={`input ${validation.errors.desaDomisili ? "is-invalid" : ""}`}
                                                                                // onChange={value => validation.setFieldValue('desa', value.value)} 
                                                                                onChange={handleChangeDesaDomisili}
                                                                                onInputChange={handleDesa}
                                                                            />
                                                                            {validation.touched.desaDomisili && validation.errors.desaDomisili ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.desaDomisili}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kecamatandomisili" className="form-label">Kecamatan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <Input
                                                                                id="kecamatanDomisili"
                                                                                name="kecamatanDomisili"
                                                                                type="input"
                                                                                placeholder="kecamatanDomisili"
                                                                                value={validation.values.kecamatanDomisili || ""}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kotadomisili" className="form-label">Kota / Kabupaten</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <Input
                                                                                id="kotaDomisili"
                                                                                name="kotaDomisili"
                                                                                type="input"
                                                                                placeholder="kotaDomisili"
                                                                                value={validation.values.kotaDomisili || ""}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="posdomisili" className="form-label">Kode POS</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <Input
                                                                                id="posDomisili"
                                                                                name="posDomisili"
                                                                                type="input"
                                                                                placeholder="posDomisili"
                                                                                value={validation.values.posDomisili || ""}
                                                                                onChange={(e) => {
                                                                                    rgxAllNumber.test(e.target.value) 
                                                                                        && validation.setFieldValue("posDomisili", e.target.value)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="provinsidomisili" className="form-label">Provinsi</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <Input
                                                                                id="provinsiDomisili"
                                                                                name="provinsiDomisili"
                                                                                type="input"
                                                                                placeholder="provinsiDomisili"
                                                                                value={validation.values.provinsiDomisili || ""}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="negaradomisili" className="form-label">Negara</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                        <CustomSelect
                                                                                id="negaraDomisili"
                                                                                name="negaraDomisili"
                                                                                options={dataNegara}
                                                                                ref={refNegaraDomisili}
                                                                                value={validation.values.negaraDomisili || ""}
                                                                                className={`input ${validation.errors.negaraDomisili ? "is-invalid" : ""}`}
                                                                                onChange={value => validation.setFieldValue('negaraDomisili', value?.value || "")}
                                                                            />
                                                                            {validation.touched.negaraDomisili && validation.errors.negaraDomisili ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.negaraDomisili}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='text-center'>
                                                            <Button type="submit" color="primary" disabled={loadingSave}> Simpan </Button>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="2" id="profile2">
                                            <Form className="gy-4"
                                                action="#">
                                                <Row>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Informasi Lainnya</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">

                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>
                                        {/* </Form> */}
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default withRouter(PasienBaru);