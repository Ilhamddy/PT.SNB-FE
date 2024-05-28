import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Card, CardBody, CardHeader, Modal, ModalBody, Col, Label, Input, Row, Form,
    Button, FormFeedback,DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import CustomSelect from "./CustomSelect/CustomSelect";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import {
    listOrderByNorecGet,listKamarRadiologiGet,updateTglRencanaRadiologi,saveVerifikasiRadiologi,
    deleteDetailOrderPelayanan,radiologiResetForm, daftarPasienRIPulangSave, listFaskesGet, daftarPasienNorecGet, antreanPasienNorecGet,
    upsertEncounterPulang
} from "../../store/actions";
import { comboPulangGet } from "../../store/master/action";
import { useNavigate } from "react-router-dom";
import KontainerFlatpickr from "../KontainerFlatpickr/KontainerFlatpickr";
import ModalApp from "./ModalApp";
import CustomInput from "./CustomInput/CustomInput";


const StatusPulangRIModal = ({ norecdp, norecAP, toggle }) => {
    const dispatch = useDispatch();
    const { comboPulang, dataFaskes, dataReg, antreanSebelum, kepesertaanBPJS } = useSelector((state) => ({
        comboPulang: state.Master.comboPulangGet.data,
        dataFaskes: state.DaftarPasien.listFaskesGet.data,
        dataReg: state.DaftarPasien.daftarPasienNoRecGet.data,
        antreanSebelum: state.DaftarPasien.antreanNoRecGet.data,
        kepesertaanBPJS: state.DaftarPasien.daftarPasienNoRecGet.data?.kepesertaanBPJS || null
    }));
    const isBPJS = dataReg.objectpenjaminfk === 2 
        || dataReg.objectpenjaminfk2 === 2 
        || dataReg.objectpenjaminfk3 === 2;
    useEffect(() => {
        dispatch(comboPulangGet());
    }, [dispatch]);
    const current = new Date();
    const navigate = useNavigate()
    const [dateStart, setdateStart] = useState((new Date()).toISOString());
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norec: norecdp,
            norecAP: norecAP,
            carakeluar: "",
            //pulang/aps 1/2/3/4
            kondisipulang: "",
            statuspulang: "",
            tanggalpulang: dateStart,
            pembawapulang: "",
            hubungan: "",
            //meninggal 4
            tanggalmeninggal: dateStart,
            //rujukan 5
            alasanrujuk: "",
            faskestujuan: "",
            namafaskes: "",
            dokterperujuk: "",
            //pindah 3
            unittujuan: "",
            kamar: "",
            keteranganpindah: "",
            kelas: "",
            nobed: "",
            nobedsebelum: "",
            naikturunkelas: "",
        },
        validationSchema: Yup.object({
            carakeluar: Yup.string().required("Cara Keluar Harus diisi"),
            kondisipulang: Yup.string().when("carakeluar", {
                is: (val) => val !== '3',
                then: () => Yup.string().required("Kondisi Pulang Harus diisi"),
            }),
            statuspulang: Yup.string().when("carakeluar", {
                is: (val) => val !== '3',
                then: () => Yup.string().required("Status Pulang Harus diisi"),
            }),
            tanggalpulang: Yup.string().when("carakeluar", {
                is: (val) => val !== '3',
                then: () => Yup.string().required("Tanggal Pulang Harus diisi"),
            }),
            pembawapulang: Yup.string().when("carakeluar", {
                is: (val) => val !== '3',
                then: () => Yup.string().required("Pembawa Pulang Harus diisi"),
            }),
            hubungan: Yup.string().when("carakeluar", {
                is: (val) => val !== '3',
                then: () => Yup.string().required("Hubungan Harus diisi"),
            }),
            tanggalmeninggal: Yup.string().when("carakeluar", {
                is: (val) => val === '4',
                then: () => Yup.string().required("Tanggal Meninggal Harus diisi"),
            }),
            alasanrujuk: Yup.string().when("carakeluar", {
                is: (val) => val === '5',
                then: () => Yup.string().required("Alasan Rujuk Harus diisi"),
            }),
            faskestujuan: Yup.string().when("carakeluar", {
                is: (val) => val === '5',
                then: () =>  Yup.string().required("Faskes Tujuan Harus diisi"),
            }),
            namafaskes: Yup.string().when("carakeluar", {
                is: (val) => val === '5',
                then: () => Yup.string().required("Nama Faskes Harus diisi"),
            }),
            dokterperujuk: Yup.string().when("carakeluar", {
                is: (val) => val === "5",
                then: () => Yup.string().required("Dokter Perujuk Harus diisi"),
            }),
            unittujuan: Yup.string().when("carakeluar", {
                is: (val) => val === "3",
                then: () => Yup.string().required("Unit Tujuan Harus diisi"),
            }),
            kamar: Yup.string().when("carakeluar", {
                is: (val) => val === "3",
                then: () => Yup.string().required("Kamar Harus diisi"),
            }),
            keteranganpindah: Yup.string().when("carakeluar", {
                is: (val) => val === "3",
                then: () => Yup.string().required("Keterangan Pindah Harus diisi"),
            }),
            kelas: Yup.string().when("carakeluar", {
                is: (val) => val === "3",
                then: () => Yup.string().required("Kelas Harus diisi"),
            }),
            nobed: Yup.string().when("carakeluar", {
                is: (val) => val === "3",
                then: () => Yup.string().required("No Bed Harus diisi"),
            }),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            dispatch(daftarPasienRIPulangSave(values, () => {
                navigate("/listdaftarpasien/daftar-pasien-pulang");
                toggle();
                resetForm()
            }));

        }
    })

    useEffect(() => {
        const setFF = validation.setFieldValue
        setFF("nobedsebelum", antreanSebelum.nobed || "")
    }, [validation.setFieldValue, antreanSebelum])

    let arKamar = comboPulang?.kamar?.filter(function (item) {
        if (item.objectkelasfk === validation.values.kelas 
            && item.objectunitfk === validation.values.unittujuan)
            return true;
        return false;
    }) || [];
    let arBed = comboPulang?.tempattidur?.filter(function (item) {
        if (item.objectkamarfk === validation.values.kamar)
            return true;
        return false;
    }) || [];

    const handleBeginOnChangeTglInput = (name, newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
        validation.setFieldValue(name, dateString)
    }
    const [count, setCount] = useState(1);

    const onClickCount = (temp) => {
        if (temp === 'min') {
            if (count > 0) {
                setCount(count - 1)
                // validation.setFieldValue('quantity', count - 1)
            }
        } else {
            setCount(count + 1)
            // validation.setFieldValue('quantity', count + 1)
        }

    }
    const [tempSelected, settempSelected] = useState("");
    const handleClick = (e)=>{
        settempSelected(e)
        validation.setFieldValue('norecselected', e.norec)
        validation.setFieldValue('namatindakan', e.namaproduk)
    }
    
    const isPulangAPS = validation.values.carakeluar === 1 || validation.values.carakeluar === 2
    const isMeninggal = validation.values.carakeluar === 4
    const isRujuk = validation.values.carakeluar === 5
    const isPindah = validation.values.carakeluar === 3

    const handleFaskes = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(listFaskesGet(characterEntered, validation.values.faskestujuan));
        }
    };


    useEffect(() => {
        norecdp && dispatch(daftarPasienNorecGet(norecdp));
        norecAP && dispatch(antreanPasienNorecGet(norecAP));
    }, [dispatch, norecAP, norecdp])
    let naikTurunKelas = comboPulang?.naikturunkelas || []
    const isKelasSama = 
        (!!kepesertaanBPJS?.objectkelasfk && !!(validation.values.kelas === kepesertaanBPJS?.objectkelasfk))
    naikTurunKelas = naikTurunKelas.filter((n) => isKelasSama || (!isKelasSama && n.value !== 1))
    useEffect(() => {
        const setFF = validation.setFieldValue
        isKelasSama && setFF('naikturunkelas', 1)
    }, [validation.setFieldValue, isKelasSama])

    const IsiRujukKiri = (
        <>
            <Col md={4} className="mb-2">
                <Label htmlFor="faskestujuan" className="form-label">
                    Faskes Tujuan
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="faskestujuan"
                    name="faskestujuan"
                    options={[{label: "Faskes 1", value: "1"}, {label: "Faskes 2", value: "2"}]}
                    value={validation.values.faskestujuan || ""}
                    className={`input ${validation.errors.faskestujuan ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('faskestujuan', value?.value)}
                    invalid={
                        validation.touched.faskestujuan && validation.errors.faskestujuan ? true : false
                    }
                />
                {validation.touched.faskestujuan && validation.errors.faskestujuan ? (
                    <FormFeedback type="invalid"><div>{validation.errors.faskestujuan}</div></FormFeedback>
                ) : null}
            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="dokterperujuk" className="form-label">
                    Dokter Perujuk
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="dokterperujuk"
                    name="dokterperujuk"
                    options={comboPulang?.pegawai || []}
                    value={validation.values.dokterperujuk || ""}
                    className={`input ${validation.errors.dokterperujuk ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('dokterperujuk', value?.value)}
                    invalid={
                        validation.touched.dokterperujuk && validation.errors.dokterperujuk ? true : false
                    }
                />
                {validation.touched.dokterperujuk && validation.errors.dokterperujuk ? (
                    <FormFeedback type="invalid"><div>{validation.errors.dokterperujuk}</div></FormFeedback>
                ) : null}
            </Col>
        </>
    )

    const IsiRujukKanan = (
        <>
            <Col md={4} className="mb-2">
                <Label htmlFor="namafaskes" className="form-label">
                    Nama Faskes
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                {isBPJS ?
                    <>
                        <CustomSelect
                            id="namafaskes"
                            name="namafaskes"
                            onInputChange={handleFaskes}
                            options={dataFaskes?.faskes || []}
                            className={`input ${validation.errors.namafaskes ? "is-invalid" : ""}`}
                            onChange={(e) => validation.setFieldValue("namafaskes", e?.value)}
                        />
                        {validation.touched.diagnosarujukan && validation.errors.diagnosarujukan ? (
                            <FormFeedback type="invalid"><div>{validation.errors.diagnosarujukan}</div></FormFeedback>
                        ) : null}
                    </>
                    :
                    <> 
                        <CustomInput
                            id="namafaskes"
                            name="namafaskes"
                            type="string"
                            placeholder="Masukkan Nama Faskes"
                            className="form-control"
                            onChange={validation.handleChange}
                            value={validation.values.namafaskes || ""}
                            invalid={validation.touched.namafaskes && validation.errors.namafaskes ? true : false}
                        />
                        {validation.touched.namafaskes && validation.errors.namafaskes ? (
                            <FormFeedback type="invalid"><div>{validation.errors.namafaskes}</div></FormFeedback>
                        ) : null} 
                    </>  
                }

            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="dokterperujuk" className="form-label">
                    Alasan Rujuk
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomInput
                    id="alasanrujuk"
                    name="alasanrujuk"
                    type="string"
                    placeholder="Masukkan Alasan Rujuk"
                    className="form-control"
                    onChange={validation.handleChange}
                    value={validation.values.alasanrujuk || ""}
                    invalid={validation.touched.alasanrujuk && validation.errors.alasanrujuk ? true : false}
                />
                {validation.touched.alasanrujuk && validation.errors.alasanrujuk ? (
                    <FormFeedback type="invalid"><div>{validation.errors.alasanrujuk}</div></FormFeedback>
                ) : null}
            </Col>
        </>
    )

    const IsiUmumKiri = (
        <>
            <Col md={4} className="mb-2">
                <Label htmlFor="statuspulang" className="form-label">
                    {isRujuk ? `Status Rujuk` 
                            : isMeninggal 
                            ? `Penyebab Meninggal` 
                            : `Status Pulang`}
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="statuspulang"
                    name="statuspulang"
                    options={comboPulang?.statuspulang || []}
                    value={validation.values.statuspulang || ""}
                    className={`input ${validation.errors.statuspulang ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('statuspulang', value?.value)}
                    invalid={
                        validation.touched.statuspulang && validation.errors.statuspulang ? true : false
                    }
                />
                {validation.touched.statuspulang && validation.errors.statuspulang ? (
                    <FormFeedback type="invalid"><div>{validation.errors.statuspulang}</div></FormFeedback>
                ) : null}
            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="pembawapulang" className="form-label">
                    {isRujuk ? `Pembawa Rujuk` : `Pembawa Pulang`}
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomInput
                    id="pembawapulang"
                    name="pembawapulang"
                    type="text"
                    placeholder="Masukkan Pembawa Pulang"
                    className="form-control"
                    onChange={validation.handleChange}
                    value={validation.values.pembawapulang || ""}
                    invalid={validation.touched.pembawapulang && validation.errors.pembawapulang}
                />
                {validation.touched.pembawapulang && validation.errors.pembawapulang ? (
                    <FormFeedback type="invalid"><div>{validation.errors.pembawapulang}</div></FormFeedback>
                ) : null}
            </Col>

        </>
    )

    const IsiUmumKanan = (
        <>
            <Col lg={4} md={4} className="mb-2">
                <div className="mt-2">
                    <Label style={{ color: "black" }} htmlFor="kondisipulang" className="form-label">
                        {`Kondisi ${isMeninggal 
                            ? `Meninggal` 
                            : isRujuk 
                            ? `Rujuk` 
                            : `Pulang`}`}
                    </Label>
                </div>
            </Col>
            <Col lg={6} md={6} className="mb-2">
                <CustomSelect
                    id="kondisipulang"
                    name="kondisipulang"
                    options={comboPulang?.kondisipulang || []}
                    value={validation.values.kondisipulang || ""}
                    className={`input ${validation.errors.kondisipulang ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('kondisipulang', value?.value)}
                    invalid={
                        validation.touched.kondisipulang && validation.errors.kondisipulang
                    }
                />
                {validation.touched.kondisipulang && validation.errors.kondisipulang ? (
                    <FormFeedback type="invalid"><div>{validation.errors.kondisipulang}</div></FormFeedback>
                ) : null}
            </Col>
            <Col lg={4} md={4} className="mb-2">
                <div className="mt-2">
                    <Label style={{ color: "black" }} htmlFor="tanggalpulang" className="form-label">
                        {isRujuk ? `Tanggal Rujuk`
                            : isMeninggal 
                            ? `Tanggal Keluar`
                            : `Tanggal Pulang`}
                    </Label>
                </div>
            </Col>
            <Col lg={6} md={6} className="mb-2">
                <KontainerFlatpickr
                    id="tanggalpulang"
                    options={{
                        enableTime: true,
                        // mode: "range",
                        dateFormat: "Y-m-d H:i",
                        defaultDate: "today"
                    }}
                    value={validation.values.tanggalpulang}
                    onChange={([newDate]) => {
                        validation.setFieldValue("tanggalpulang", newDate.toISOString());
                    }}
                />
            </Col>
            <Col lg={4} md={4} className="mb-2">
                <div className="mt-2">
                    <Label style={{ color: "black" }} htmlFor="hubungan" className="form-label">Hubungan</Label>
                </div>
            </Col>
            <Col lg={6} md={6} className="mb-2">
                <CustomSelect
                    id="hubungan"
                    name="hubungan"
                    options={comboPulang?.hubungankeluarga || []}
                    value={validation.values.hubungan || ""}
                    className={`input ${validation.errors.hubungan ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('hubungan', value?.value)}
                    invalid={
                        validation.touched.hubungan && validation.errors.hubungan
                    }
                />
                {validation.touched.hubungan && validation.errors.hubungan ? (
                    <FormFeedback type="invalid"><div>{validation.errors.hubungan}</div></FormFeedback>
                ) : null}
            </Col>
        </>
    )


    
    const IsiPindahKiri = (
        <>
            <Col md={4} className="mb-2">
                <Label htmlFor="statuspulang" className="form-label">
                    Unit Tujuan
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="unittujuan"
                    name="unittujuan"
                    options={comboPulang?.unit || []}
                    value={validation.values.unittujuan || ""}
                    className={`input ${validation.errors.unittujuan ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('unittujuan', value?.value)}
                    invalid={
                        validation.touched.unittujuan && validation.errors.unittujuan ? true : false
                    }
                />
                {validation.touched.unittujuan && validation.errors.unittujuan ? (
                    <FormFeedback type="invalid"><div>{validation.errors.unittujuan}</div></FormFeedback>
                ) : null}
            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="kamar" className="form-label">
                    Kamar
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="kamar"
                    name="kamar"
                    options={arKamar}
                    value={validation.values.kamar || ""}
                    className={`input ${validation.errors.kamar ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('kamar', value?.value)}
                    invalid={
                        validation.touched.kamar && validation.errors.kamar ? true : false
                    }
                />
                {validation.touched.kamar && validation.errors.kamar ? (
                    <FormFeedback type="invalid"><div>{validation.errors.kamar}</div></FormFeedback>
                ) : null}
            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="dokterperujuk" className="form-label">
                    Keterangan pindah
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomInput
                    id="keteranganpindah"
                    name="keteranganpindah"
                    type="string"
                    placeholder="Masukkan Keterangan Pindah"
                    className="form-control"
                    onChange={validation.handleChange}
                    value={validation.values.keteranganpindah || ""}
                    invalid={validation.touched.keteranganpindah && validation.errors.keteranganpindah ? true : false}
                />
                {validation.touched.keteranganpindah && validation.errors.keteranganpindah ? (
                    <FormFeedback type="invalid"><div>{validation.errors.keteranganpindah}</div></FormFeedback>
                ) : null}
            </Col>
        </>
    )

    const IsiPindahKanan = (
        <>
            <Col md={4} className="mb-2">
                <Label htmlFor="statuspulang" className="form-label">
                    Tanggal Pindah
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <div className="input-group">
                    <KontainerFlatpickr
                        options={{
                            //  enableTime: true,
                            // mode: "range",
                            dateFormat: "Y-m-d H:i",
                            defaultDate: "today"
                        }}
                        value={dateStart}
                        onChange={([newDate]) => {
                            handleBeginOnChangeTglInput("tanggalpulang", newDate);
                        }}
                    />
                </div>
            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="kelas" className="form-label">
                    kelas
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="kelas"
                    name="kelas"
                    options={comboPulang?.kelas || []}
                    value={validation.values.kelas || ""}
                    className={`input ${validation.errors.kelas ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('kelas', value?.value)}
                    invalid={
                        validation.touched.kelas && validation.errors.kelas ? true : false
                    }
                />
                {validation.touched.kelas && validation.errors.kelas ? (
                    <FormFeedback type="invalid"><div>{validation.errors.kelas}</div></FormFeedback>
                ) : null}
            </Col>
            <Col md={4} className="mb-2">
                <Label htmlFor="nobed" className="form-label">
                    No Bed
                </Label>
            </Col>
            <Col md={8} className="mb-2">
                <CustomSelect
                    id="nobed"
                    name="nobed"
                    options={arBed}
                    value={validation.values.nobed || ""}
                    className={`input ${validation.errors.nobed ? "is-invalid" : ""}`}
                    onChange={value => validation.setFieldValue('nobed', value?.value)}
                    invalid={
                        validation.touched.nobed && validation.errors.nobed ? true : false
                    }
                />
                {validation.touched.nobed && validation.errors.nobed ? (
                    <FormFeedback type="invalid"><div>{validation.errors.nobed}</div></FormFeedback>
                ) : null}
            </Col>
            {<>
                <Col md={4} className="mb-2">
                    <Label htmlFor="dokterperujuk" className="form-label">
                        Alasan pindah kelas
                    </Label>
                </Col>
                <Col md={8} className="mb-2">
                    <CustomSelect
                        id="naikturunkelas"
                        name="naikturunkelas"
                        options={naikTurunKelas}
                        onChange={(e) => {
                            validation.setFieldValue('naikturunkelas', e?.value || '')
                        }}
                        value={validation.values.naikturunkelas}
                        onBlur={validation.handleBlur}
                        className={`input row-header ${
                            !!validation?.errors.naikturunkelas ? 'is-invalid' : ''
                        }`}
                        isDisabled={!validation.values.kelas || 
                            (kepesertaanBPJS?.objectkelasfk && validation.values.kelas === kepesertaanBPJS?.objectkelasfk)}
                        />
                    {validation.touched.naikturunkelas &&
                        !!validation.errors.naikturunkelas && (
                            <FormFeedback type="invalid">
                                <div>{validation.errors.naikturunkelas}</div>
                            </FormFeedback>
                        )}
                </Col>
            </>}
        </>
    )
    

    return (
        <ModalApp isOpen={!!norecdp} toggle={() => toggle()} centered={true} size="xl">
            <ModalBody className="py-12 px-12">
                <Row>
                    <Col md={12}>
                        <div>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if(Object.keys(validation.errors).length){
                                        console.error(validation.errors);
                                    }
                                    validation.handleSubmit();
                                    return false;
                                }}
                                className="gy-4"
                                action="#">
                                <Row>
                                    <Col lg={6}>
                                        <Row>
                                            <Col md={4} className="mb-2"><Label htmlFor="carakeluar" className="form-label">Cara Keluar</Label></Col>
                                            <Col md={8} className="mb-2">
                                                <CustomSelect
                                                    id="carakeluar"
                                                    name="carakeluar"
                                                    options={comboPulang?.carapulang || []}
                                                    value={validation.values.carakeluar || ""}
                                                    className={`input ${validation.errors.carakeluar ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('carakeluar', value?.value)}
                                                    invalid={
                                                        validation.touched.carakeluar && validation.errors.carakeluar ? true : false
                                                    }
                                                />
                                                {validation.touched.carakeluar && validation.errors.carakeluar ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.carakeluar}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            
                                            {!isPindah && <>{IsiUmumKiri}</>}
                                            {isRujuk && <>{IsiRujukKiri}</>}
                                            {isPindah && <>{IsiPindahKiri}</>}
                                            {isMeninggal && 
                                                <>
                                                    <Col lg={4} md={4} className="mb-2">
                                                        <div className="mt-2">
                                                            <Label style={{ color: "black" }} htmlFor="tanggalkeluar" className="form-label">Tanggal Meninggal</Label>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6} md={6} className="mb-2">
                                                        <KontainerFlatpickr
                                                            options={{
                                                                //  enableTime: true,
                                                                // mode: "range",
                                                                dateFormat: "Y-m-d H:i",
                                                                defaultDate: "today"
                                                            }}
                                                            id={"tanggalmeninggal"}
                                                            value={dateStart}
                                                            onChange={([newDate]) => {
                                                                handleBeginOnChangeTglInput("tanggalmeninggal", newDate);
                                                            }}
                                                        />
                                                        {validation.touched.tanggalmeninggal && validation.errors.tanggalmeninggal ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.tanggalmeninggal}</div></FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </>
                                            }
                                            
                                        </Row>
                                    </Col>
                                    <Col lg={6}>
                                        <Row>
                                            {!isPindah && <>{IsiUmumKanan}</>}
                                            {isRujuk && <>{IsiRujukKanan}</>}
                                            {isPindah && <>{IsiPindahKanan}</>}
                                        </Row>
                                    </Col>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <Button type="submit" color="success" placement="top" id="tooltipTop" >
                                            SIMPAN
                                        </Button>
                                    </div>
                                </Row>

                            </Form>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </ModalApp>
    );
};

StatusPulangRIModal.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
    onTolakClick: PropTypes.func,
};

export default StatusPulangRIModal;

