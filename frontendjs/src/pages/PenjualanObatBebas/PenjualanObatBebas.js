import { Button, Card, Col, Container, FormFeedback, Input, Label, Row } from "reactstrap"
import CustomSelect from "../Select/Select"
import { useFormik } from "formik"
import DataTable from 'react-data-table-component';
import LoadingTable from "../../Components/Table/LoadingTable";
import NoDataTable from "../../Components/Table/NoDataTable";
import { calculateRounding, onChangeStrNbr, strToNumber } from "../../utils/format";
import { useCallback, useEffect, useRef, useState } from "react";
import { getComboPenjualanBebas, getComboResep, getComboVerifResep } from "../../store/master/action";
import { useDispatch, useSelector } from "react-redux";
import { getObatFromUnit } from "../../store/emr/action";
import * as Yup from "yup"
import { Link, useParams, useNavigate} from "react-router-dom"
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import { createOrUpdatePenjualanBebas, createOrUpdateVerifResep, getOrderResepFromNorec, getPasienFromNoCm, getPenjualanBebasFromNorec } from "../../store/farmasi/action";
import Flatpickr from "react-flatpickr";
import { rgxNbrEmpty } from "../../utils/regexcommon";
import KontainerFlatpickr from "../../Components/KontainerFlatpickr/KontainerFlatpickr";

export const initValueResep = {
    norecdetail: "",
    obat: "",
    namaobat: "",
    satuanobat: "",
    namasatuan: "",
    koder: 1,
    qty: "",
    qtyracikan: "",
    qtypembulatan: "",
    qtyjumlahracikan: "",
    stok: "",
    sediaan: "",
    namasediaan: "",
    harga: "",
    total: "",
    signa: "",
    keterangan: "",
    namaketerangan: "",
    nobatch: "",
    racikan: []
}

const initValueRacikan = {
    ...initValueResep,
    racikan: undefined
}


const PenjualanObatBebas = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const penjualanBebasFromNorec = useSelector(
        state => state.Farmasi.getPenjualanBebasFromNorec.data?.dataPenjualanBebas || null
    )
    const {norecjualbebas} = useParams()
    const [today] = useState(() => new Date().toISOString())
    const {
        unit,
        keteranganResep,
        signa,
        obatList,
        sediaanList,
        jenisResep,
        penjamin,
        pegawai,
        orderNorec,
        pasien
    } = useSelector((state) => ({
        unit: state.Master?.getComboPenjualanBebas?.data?.unit || [],
        keteranganResep: state.Master?.getComboPenjualanBebas?.data?.keteranganresep || [],
        signa: state.Master?.getComboPenjualanBebas?.data?.signa || [],
        obatList: state?.Emr?.getObatFromUnit?.data?.obat || [],
        jenisResep: state?.Master?.getComboPenjualanBebas?.data?.jenisresep || [],
        sediaanList: state?.Master?.getComboPenjualanBebas?.data?.sediaan || [],
        penjamin: state?.Master?.getComboPenjualanBebas?.data?.penjamin || [],
        pegawai: state?.Master?.getComboPenjualanBebas?.data?.pegawai || [],
        orderNorec: state?.Farmasi?.getOrderResepFromNorec?.data?.ordernorec || null,
        pasien: state?.Farmasi?.getPasienFromNoCm?.data?.datapasien || [],
    }))

    const vResep = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecjualbebas: "",
            norm: "",
            namapasien: "",
            tanggallahir: today ,
            notelepon: "",
            alamat: "",
            tanggalresep: today,
            jenis: "",
            unittujuan: 14,
            noresep: "",
            penulisresep: "",
            petugasapotek: "",
            catatan: "",
            resep: [
                {
                    ...initValueResep
                }
            ],
        },
        validationSchema: Yup.object({
            namapasien: Yup.string().required("Nama pasien harus diisi"),
            tanggallahir: Yup.string().required("Tanggal lahir harus diisi"),
            notelepon: Yup.string().required("No telepon harus diisi"),
            alamat: Yup.string().required("Alamat harus diisi"),
            tanggalresep: Yup.string().when("jenis", {
                is: (val) => (val === 2),
                then: () => Yup.string().required("Tanggal resep harus diisi"),
            }),
            jenis: Yup.string().required("Jenis harus diisi"),
            unittujuan: Yup.string().required("Unit tujuan harus diisi"),
            noresep: Yup.string().when("jenis", {
                is: (val) => (val === 2),
                then: () => Yup.string().required("No Resep harus diisi"),
            }),
            penulisresep: Yup.string().when("jenis", {
                is: (val) => (val === 2),
                then: () => Yup.string().required("Penulis resep harus diisi"),
            }),
            petugasapotek: Yup.string().required("Petugas apotek harus diisi"),
            catatan: Yup.string().required("Catatan harus diisi"),
            resep: Yup.array().of(
                Yup.object().shape({
                    obat: Yup.string().when("racikan", {
                        is: (val) => (val.length === 0),
                        then: () => Yup.string().required("Obat harus diisi"),
                    }),
                    qty: Yup.string().required("Qty harus diisi"),
                    sediaan: Yup.string().required("Sediaan harus diisi"),
                    signa: Yup.string().required("Signa harus diisi"),
                    keterangan: Yup.string().required("Keterangan harus diisi"),
                    racikan: Yup.array().of(
                        Yup.object().shape({
                            obat: Yup.string().required("Obat harus diisi"),
                            qtyracikan: Yup.string().required("Qty Racikan harus diisi"),
                        })
                    )
                })
            )
        }),
        onSubmit: (value, {resetForm}) => {
            const newVal = {...value}
            newVal.resep = newVal.resep.map((valResep) => {
                const newValResep = {...valResep}
                newValResep.racikan = newValResep.racikan.map((valRacikan) => {
                    const newValRacikan = {...valRacikan}
                    newValRacikan.qty = strToNumber(newValRacikan.qty)
                    newValRacikan.qtyjumlahracikan = strToNumber(newValRacikan.qtyjumlahracikan)
                    newValRacikan.qtyracikan = strToNumber(newValRacikan.qtyracikan)
                    newValRacikan.qtypembulatan = strToNumber(newValRacikan.qtypembulatan)
                    newValRacikan.harga = strToNumber(newValRacikan.harga)
                    newValRacikan.total = strToNumber(newValRacikan.total)
                    return newValRacikan
                })
                newValResep.qty = strToNumber(valResep.qty)
                newValResep.qtyjumlahracikan = strToNumber(valResep.qtyjumlahracikan)
                newValResep.qtyracikan = strToNumber(valResep.qtyracikan)
                newValResep.qtypembulatan = strToNumber(valResep.qtypembulatan)
                newValResep.harga = strToNumber(valResep.harga)
                newValResep.total = strToNumber(valResep.total)
                return newValResep
            }) 
            dispatch(createOrUpdatePenjualanBebas(newVal, (data) => {
                navigate("/farmasi/penjualan-obat-bebas-list")
            }))
        }
    })

    // harusnya pake memoized tapi lagi keburu
    const resepRef = useRef([
        {
            ...initValueResep
        }
    ])

    const {
        handleChangeResep, 
        handleChangeObatResep,
        handleChangeRacikan,
        handleQtyObatResep,
        handleQtyRacikan,
        handleChangeObatRacikan
    } = useHandleChangeResep(resepRef, vResep)

    const {
        handleChangeAllResep,
        handleHapusRacikan,
        handleTambahRacikan,
        handleAddResep,
        handleAddRacikan
    } = useHandleChangeAllResep(resepRef, vResep)
    

    const handleBlur = (e) => {
        vResep.setFieldValue("resep", resepRef.current)
    }
    

    useEffect(() => {
        dispatch(getComboPenjualanBebas())
    }, [dispatch])

    useEffect(() => {
        vResep.values.unittujuan &&
            dispatch(getObatFromUnit({
                idunit: vResep.values.unittujuan, 
                isbebas: vResep.values.jenis === 1
            }
        ))
    }, [dispatch, vResep.values.unittujuan, vResep.values.jenis])


    useEffect(() => {
        const setV = vResep.setValues
        const resetV = vResep.resetForm
        let orderNorecGot = null
    }, [
        orderNorec, 
        norecjualbebas, 
        vResep.setValues, 
        vResep.resetForm
    ])

    useEffect(() => {
        dispatch(getPenjualanBebasFromNorec({norecjualbebas: norecjualbebas}))

    }, [dispatch, norecjualbebas])


    useEffect(() => {
        const setV = vResep.setValues
        setV({
            ...vResep.initialValues,
            ...penjualanBebasFromNorec
        })
        if(penjualanBebasFromNorec?.resep){
            resepRef.current = penjualanBebasFromNorec.resep
        }
    }, [penjualanBebasFromNorec, vResep.setValues, vResep.initialValues])



    const columnsResep = useColumnsResep(
        vResep,
        obatList,
        handleChangeObatResep,
        sediaanList,
        handleChangeResep,
        handleBlur,
        handleQtyObatResep,
        signa,
        keteranganResep,
        resepRef,
        handleChangeAllResep
    )

    const columnsResepRacikan = useColumnsResepRacikan(
        vResep,
        obatList,
        handleChangeObatRacikan,
        handleQtyRacikan,
        handleBlur,
        handleChangeRacikan,
        handleTambahRacikan,
        handleHapusRacikan,
    )
    
    const resepNonRacikan = vResep.values.resep.filter((val) => val.racikan.length === 0)
    const resepRacikan = vResep.values.resep.filter((val) => val.racikan.length > 0)
    return (
        <div className="page-content page-verifikasi-resep">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Penjualan Obat Bebas" pageTitle="Farmasi" />
                <Card className="p-5">
                    <Row>
                        <Col lg={5}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="namapasien" 
                                            className="form-label">
                                            No Rm
                                        </Label>
                                    </div>
                                    <CustomSelect
                                        id="norm"
                                        name="norm"
                                        options={pasien}
                                        onChange={(e) => {
                                            vResep.setFieldValue("norm", e?.value || "")
                                            vResep.setFieldValue("namapasien", e?.namapasien || "")
                                            vResep.setFieldValue("notelepon", e?.notelepon || "")
                                            vResep.setFieldValue("alamat", e?.alamat || "")
                                            vResep.setFieldValue("tanggallahir", e?.tanggallahir || "")
                                        }}
                                        onInputChange={(val) => {
                                            val && dispatch(getPasienFromNoCm({nocm: val}))
                                        }}
                                        value={vResep.values.norm}
                                        className={`input ${!!vResep?.errors.norm ? "is-invalid" : ""}`}
                                        />
                                    {vResep.touched.norm 
                                        && !!vResep.errors.norm && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.norm}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="namapasien" 
                                            className="form-label">
                                            Nama Pasien
                                        </Label>
                                    </div>
                                    <Input 
                                        id={`namapasien`}
                                        name={`namapasien`}
                                        type="text"
                                        value={vResep.values.namapasien} 
                                        onChange={vResep.handleChange}
                                        invalid={vResep.touched?.namapasien 
                                            && !!vResep.errors?.namapasien}
                                        />
                                    {vResep.touched?.namapasien 
                                        && !!vResep.errors?.namapasien && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {vResep.errors?.namapasien}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="tanggallahir" 
                                            className="form-label">
                                            Tanggal Lahir
                                        </Label>
                                    </div>
                                    <KontainerFlatpickr
                                        isError={
                                            vResep.touched.tanggallahir &&
                                            !!vResep?.errors.tanggallahir}
                                        id="tanggallahir"
                                        options={{
                                            dateFormat: "Y-m-d",
                                            defaultDate: "today"
                                        }}
                                        value={vResep.values.tanggallahir}
                                        onChange={([newDate]) => {
                                            vResep.setFieldValue(
                                                "tanggallahir", 
                                                newDate.toISOString()
                                            );
                                        }}
                                    />
                                    {
                                        vResep.touched?.tanggallahir 
                                            && !!vResep.errors?.tanggallahir && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors?.tanggallahir}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="notelepon" 
                                            className="form-label">
                                            No telepon
                                        </Label>
                                    </div>
                                    <Input 
                                        id={`notelepon`}
                                        name={`notelepon`}
                                        type="text"
                                        value={vResep.values.notelepon} 
                                        onChange={(e) => {
                                            rgxNbrEmpty.test(e.target.value) 
                                                && vResep.setFieldValue("notelepon", e.target.value)
                                        }}
                                        invalid={vResep.touched?.notelepon 
                                            && !!vResep.errors?.notelepon}
                                        />
                                    {vResep.touched?.notelepon 
                                        && !!vResep.errors?.notelepon && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {vResep.errors?.notelepon}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="alamat" 
                                            className="form-label">
                                            Alamat
                                        </Label>
                                    </div>
                                    <Input 
                                        id={`alamat`}
                                        name={`alamat`}
                                        type="text"
                                        value={vResep.values.alamat} 
                                        onChange={vResep.handleChange}
                                        invalid={vResep.touched?.alamat 
                                            && !!vResep.errors?.alamat}
                                        />
                                    {vResep.touched?.alamat 
                                        && !!vResep.errors?.alamat && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {vResep.errors?.alamat}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={7}>
                            <Row>
                                <Col lg={4}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="tanggallahir" 
                                            className="form-label">
                                            Tanggal Resep
                                        </Label>
                                    </div>
                                    <KontainerFlatpickr
                                        isError={vResep.touched.tanggalresep &&
                                                !!vResep?.errors.tanggalresep}
                                        id="tanggallahir"
                                        options={{
                                            dateFormat: "Y-m-d",
                                            defaultDate: "today"
                                        }}
                                        value={vResep.values.tanggalresep}
                                        onChange={([newDate]) => {
                                            vResep.setFieldValue("tanggalresep", newDate.toISOString());
                                        }}
                                    />
                                    {
                                        vResep.touched?.tanggalresep 
                                            && !!vResep.errors?.tanggalresep && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors?.tanggalresep}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="namapasien" 
                                            className="form-label">
                                            Jenis
                                        </Label>
                                    </div>
                                    <CustomSelect
                                        id="jenis"
                                        name="jenis"
                                        options={jenisResep}
                                        onChange={(e) => {
                                            vResep.setFieldValue("jenis", e?.value || "")
                                            if(e.value === 1){
                                                vResep.setFieldValue("noresep", "")
                                                vResep.setFieldValue("penulisresep", "")
                                            }
                                        }}
                                        value={vResep.values.jenis}
                                        className={`input ${!!vResep?.errors.jenis ? "is-invalid" : ""}`}
                                        />
                                    {vResep.touched.jenis 
                                        && !!vResep.errors.jenis && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.jenis}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="unittujuan" 
                                            className="form-label">
                                            Depo
                                        </Label>
                                    </div>
                                    <CustomSelect
                                        id="unittujuan"
                                        name="unittujuan"
                                        options={unit}
                                        isDisabled
                                        onChange={(e) => {
                                            vResep.setFieldValue("unittujuan", e?.value || "")
                                        }}
                                        value={vResep.values.unittujuan}
                                        className={`input ${!!vResep?.errors.unittujuan ? "is-invalid" : ""}`}
                                        />
                                    {vResep.touched.unittujuan 
                                        && !!vResep.errors.unittujuan && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.unittujuan}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="noresep" 
                                            className="form-label">
                                            No Resep
                                        </Label>
                                    </div>
                                    <Input 
                                        id={`noresep`}
                                        name={`noresep`}
                                        type="text"
                                        disabled={vResep.values.jenis !== 2}
                                        value={vResep.values.noresep} 
                                        onChange={vResep.handleChange}
                                        invalid={vResep.touched?.noresep 
                                            && !!vResep.errors?.noresep}
                                        />
                                    {vResep.touched.noresep 
                                        && !!vResep.errors.noresep && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.noresep}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="noresep" 
                                            className="form-label">
                                            Penulis Resep
                                        </Label>
                                    </div>
                                    <Input 
                                        id={`penulisresep`}
                                        name={`penulisresep`}
                                        type="text"
                                        disabled={vResep.values.jenis !== 2}
                                        value={vResep.values.penulisresep} 
                                        onChange={vResep.handleChange}
                                        invalid={vResep.touched?.penulisresep 
                                            && !!vResep.errors?.penulisresep}
                                        />
                                    {vResep.touched.penulisresep 
                                        && !!vResep.errors.penulisresep && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.penulisresep}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="petugasapotek" 
                                            className="form-label">
                                            Petugas Apotek
                                        </Label>
                                    </div>
                                    <CustomSelect
                                        id="petugasapotek"
                                        name="petugasapotek"
                                        options={pegawai}
                                        onChange={(e) => {
                                            vResep.setFieldValue("petugasapotek", e?.value || "")
                                        }}
                                        value={vResep.values.petugasapotek}
                                        className={`input ${!!vResep?.errors.petugasapotek ? "is-invalid" : ""}`}
                                        />
                                    {vResep.touched.petugasapotek 
                                        && !!vResep.errors.petugasapotek && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.petugasapotek}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                                <Col lg={12}>
                                    <div className="mt-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="catatan" 
                                            className="form-label">
                                            Catatan
                                        </Label>
                                    </div>
                                    <Input 
                                        id={`catatan`}
                                        name={`catatan`}
                                        type="text"
                                        value={vResep.values.catatan} 
                                        onChange={vResep.handleChange}
                                        invalid={vResep.touched?.catatan 
                                            && !!vResep.errors?.catatan}
                                        />
                                    {vResep.touched.catatan 
                                        && !!vResep.errors.catatan && (
                                            <FormFeedback type="invalid" >
                                                <div>
                                                    {vResep.errors.catatan}
                                                </div>
                                            </FormFeedback>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <table className="table" width={"fit-content"}>
                            <thead style={{width: "100%",}}>
                                <tr style={{width: "100%", display: "flex", flexDirection: "row"}}>
                                    {columnsResep.map((col, index) => 
                                        <th scope="col" key={index} 
                                        style={{width: col.width || "200px"}}>
                                            {col.name}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{width: "100%", display: "flex", flexDirection: "row"}}>
                                    <td style={{width: "5%"}}></td>
                                    <td colSpan={2} style={{width: "95%", display: "flex"}}>
                                        <h1 style={{
                                            color: "#6699ff",
                                            fontWeight: "bold",
                                            fontSize: "15px",
                                            width: "100px",
                                            marginBottom: "0px",
                                            marginTop: "7px"
                                        }}>
                                            Non Racikan
                                        </h1>
                                        <Button 
                                            color={"info"} 
                                            style={{border: "none", width: "fit-content"}}
                                            onClick={handleAddResep}>
                                            +
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody style={{width: "100%"}}>
                                {resepNonRacikan.map((value, key) => 
                                    <tr key={key} style={{width: "100%", display: "flex", flexDirection: "row"}}>
                                        {columnsResep.map((col, index) => {
                                            return (
                                                <td key={index} style={{width: col.width || "200px"}}>
                                                    <col.Cell row={value} />
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )}
                            </tbody>
                            <tbody>
                                <tr style={{width: "100%", display: "flex", flexDirection: "row"}}>
                                    <td style={{width: "5%"}}></td>
                                    <td colSpan={2} style={{width: "95%", display: "flex"}}>
                                        <h1 style={{
                                            color: "#6699ff",
                                            fontWeight: "bold",
                                            fontSize: "15px",
                                            width: "100px",
                                            marginBottom: "0px",
                                            marginTop: "7px"
                                        }}>
                                            Racikan
                                        </h1>
                                        <Button 
                                            color={"info"} 
                                            style={{border: "none", width: "fit-content"}}
                                            onClick={handleAddRacikan}>
                                            +
                                        </Button>
                                    </td>
                                    
                                </tr>
                            </tbody>
                            <tbody style={{width: "100%"}}>
                                {resepRacikan.map((value, key) => 
                                    <>
                                        <tr 
                                            key={key} 
                                            style={{width: "100%", display: "flex", flexDirection: "row"}}
                                            >
                                            {columnsResep.map((col, index) => {
                                                return (
                                                    <td key={index} style={{width: col.width || "200px"}}>
                                                        <col.Cell row={value} />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                        {value.racikan.map((valueRacikan, keySub) => 
                                                <tr 
                                                    key={`${key}-${keySub}`} 
                                                    style={{width: "100%", display: "flex", flexDirection: "row"}}
                                                    >
                                                    {columnsResepRacikan.map((col, index) => {
                                                        return (
                                                            <td 
                                                                key={index} 
                                                                style={{width: col.width || "200px"}}>
                                                                <col.Cell 
                                                                    key={index} 
                                                                    row={valueRacikan} 
                                                                    rowUtama={value} />
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        }
                                    </>
                                )}
                            </tbody>
                        </table>
                        <Row style={{justifyContent: "space-evenly"}}>
                            <Col md={2}>
                                <Button color="success"
                                    disabled={false}
                                    onClick={() => {
                                        vResep.handleSubmit();
                                    }}>
                                    {vResep.values.norecjualbebas ? "Edit" : "Simpan"}
                                </Button>
                            </Col>
                            <Col md={2}>
                                <Link to="/farmasi/penjualan-obat-bebas-list">
                                    <Button color="danger">
                                        Batal
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Row>
                </Card> 
            </Container>
        </div>
    )
}

export const useHandleChangeResep = (resepRef, vResep) => {
    // untuk sekarang dirounding menjadi 100 rupiah
    const roundingTotal = 0
    const handleChangeResep = useCallback((newVal, field, row, isSet) => {
        const newReseps = [...resepRef.current]
        const newResep = {...newReseps[row.koder - 1]}
        newResep[field] = newVal
        newReseps[row.koder - 1] = newResep
        resepRef.current = newReseps
        if(isSet){
            vResep.setFieldValue("resep", resepRef.current)
        }
    }, [vResep, resepRef])

    const handleChangeObatResep = useCallback((e, row) => {
        handleChangeResep(e?.value || "", "obat", row, true);
        handleChangeResep(e?.label || "", "namaobat", row, true);
        handleChangeResep(e?.satuanid || "", "satuanobat", row, true);
        handleChangeResep(e?.namasatuan || "", "namasatuan", row, true);
        handleChangeResep(e?.sediaanid || "", "sediaan", row, true);
        handleChangeResep(e?.namasediaan || "", "namasediaan", row, true); 
        handleChangeResep(e?.totalstok || "", "stok", row, true);
        const harga = e?.batchstokunit?.[0]?.harga || 0
        const nobatch = e?.batchstokunit?.[0]?.nobatch || ""
        // hitung harga
        let totalHarga = 
            ((harga) * 1.25 * (row.qty || 0)) || 0
        const [roundedHarga, difference] = calculateRounding(totalHarga, roundingTotal)
        handleChangeResep(
            roundedHarga, 
            "total", 
            row, 
            true
        )
        handleChangeResep(
            harga || "", 
            "harga", 
            row, 
            true
        )
        handleChangeResep(
            nobatch || "",
            "nobatch",
            row,
            true
        )
    }, [handleChangeResep])

    const handleChangeRacikan = useCallback((newVal, field, rowUtama, rowRacikan, isSet) => {
        const newReseps = [...resepRef.current]
        const newResep = {...newReseps[rowUtama.koder - 1]}
        const newRacikan = {...newResep.racikan[rowRacikan.koder - 1]}
        newRacikan[field] = newVal
        newResep.racikan[rowRacikan.koder - 1] = newRacikan
        newReseps[rowUtama.koder - 1] = newResep
        resepRef.current = newReseps
        if(isSet){
            vResep.setFieldValue("resep", newReseps)
        }
    }, [resepRef, vResep])
    
    const handleQtyObatResep = (e, row, val, setVal) => {
        let newVal = onChangeStrNbr(e.target.value, val)
        if(strToNumber(newVal) > strToNumber(row.stok) 
            && row.racikan.length === 0){
            newVal = row.stok
        }
        setVal(newVal)
        handleChangeResep(newVal, "qty", row)
        handleChangeResep(newVal, "qtypembulatan", row)
        let totalHarga = (
            row.harga * 
            (strToNumber(newVal) || 0)
            * 1.25
        ) || 0
        const [roundedHarga, difference] = calculateRounding(totalHarga, roundingTotal)
        handleChangeResep(
            roundedHarga, 
            "total", 
            row
        )
        row.racikan.forEach((valRacikan) => {
            let totalQty = strToNumber(valRacikan.qtyracikan) * (strToNumber(newVal) || 0)
            totalQty = Number(totalQty.toFixed(6))
            const qtyBulat = Math.ceil(totalQty)
            let qtyPembulatan = qtyBulat - totalQty
            
            qtyPembulatan = Number(qtyPembulatan.toFixed(6))
            let totalHargaRacikan = (
                valRacikan.harga * 1.25 * (strToNumber(qtyBulat))
            ) || 0
            const [roundedHarga, difference] = calculateRounding(totalHargaRacikan, roundingTotal)
            handleChangeRacikan(qtyBulat, "qtypembulatan", row, valRacikan)
            handleChangeRacikan(qtyPembulatan, qtyBulat, row, valRacikan)
            handleChangeRacikan(
                roundedHarga, 
                "total", 
                row, 
                valRacikan
            )
            handleChangeRacikan(
                totalQty, 
                "qty", 
                row, 
                valRacikan
            )
        })
    }

    const handleQtyRacikan = useCallback((e, row, rowUtama, val, setVal) => {
        const newVal = onChangeStrNbr(e.target.value, val)
        let qtyTotal = strToNumber(rowUtama.qty || 0) * strToNumber(newVal || 0)
        qtyTotal = Number(qtyTotal.toFixed(6))
        const qtyBulat = Math.ceil(qtyTotal)
        let qtyPembulatan = qtyBulat - qtyTotal
        qtyPembulatan = Number(qtyPembulatan.toFixed(6))
        handleChangeRacikan(newVal, "qtyracikan", rowUtama, row)
        handleChangeRacikan(qtyTotal, "qty", rowUtama, row)
        handleChangeRacikan(qtyBulat, "qtypembulatan", rowUtama, row)
        let totalHarga = (
            row.harga * 1.25 * (strToNumber(qtyBulat))
        ) || 0
        const [roundedHarga, difference] = calculateRounding(totalHarga, roundingTotal)
        handleChangeRacikan(
            roundedHarga, 
            "total", 
            rowUtama,
            row
        )
        // set val, value yang ada di dalam input
        setVal(newVal)
    }, [handleChangeRacikan])

    const handleChangeObatRacikan = (e, row, rowUtama) => {
        handleChangeRacikan(e?.value || "", "obat", rowUtama, row, true);
        handleChangeRacikan(e?.label || "", "namaobat", rowUtama, row, true);
        handleChangeRacikan(e?.satuanid || "", "satuanobat", rowUtama, row, true);
        handleChangeRacikan(e?.namasatuan || "", "namasatuan", rowUtama, row, true);
        handleChangeRacikan(e?.totalstok || "", "stok", rowUtama, row, true);
        const harga = e?.batchstokunit?.[0]?.harga || 0
        let qtyTotal = strToNumber(rowUtama.qty || 0) * strToNumber(row.qtyracikan || 0)
        qtyTotal = Math.ceil(qtyTotal)
        const totalHarga = 
            ((harga) * 1.25 * qtyTotal)
        const [roundedHarga, difference] = calculateRounding(totalHarga, roundingTotal)
        handleChangeRacikan(
            qtyTotal,
            "qty",
            rowUtama,
            row,
            true
        )
        handleChangeRacikan(
            roundedHarga, 
            "total", 
            rowUtama,
            row, 
            true
        )
        handleChangeRacikan(
            harga || "", 
            "harga",
            rowUtama, 
            row, 
            true
        )
    }

    return {
        handleChangeResep, 
        handleChangeObatResep,
        handleChangeRacikan,
        handleQtyObatResep,
        handleQtyRacikan,
        handleChangeObatRacikan
    }
}

export const useHandleChangeAllResep = (resepRef, vResep) => {
    const handleChangeAllResep = useCallback((newVal) => {
        let newResep = [...newVal]
        //diurutkan agar non racikan yang duluan
        newResep = newResep.sort((a, b) => {
            if(a.racikan.length > 0 && b.racikan.length === 0) return 1
            if(a.racikan.length === 0 && b.racikan.length > 0) return -1
            return 0
        } )
        newResep = newResep.map((val, key) => {
            val.koder = key + 1
            val.racikan = val.racikan.map((valRacikan, keyRacikan) => {
                valRacikan.koder = keyRacikan + 1
                return valRacikan
            })
            return val
        })
        
        resepRef.current = newResep
        vResep.setFieldValue("resep", newResep)
    }, [resepRef, vResep])

    const handleHapusRacikan = (row, rowUtama) => {
        if(rowUtama.racikan.length === 1) return;
        const newReseps = [...resepRef.current]
        const newResep = {...newReseps[rowUtama.koder - 1]}
        const newRacikans = [...newResep.racikan]
        newRacikans.splice(row.koder - 1, 1)
        newResep.racikan = newRacikans 
        newReseps[rowUtama.koder - 1] = newResep
        handleChangeAllResep(newReseps)
    }

    const handleTambahRacikan = (row, rowUtama) => {
        const newReseps = [...resepRef.current]
        const newResep = {...newReseps[rowUtama.koder - 1]}
        const newRacikans = [...newResep.racikan]
        const newRacikan = {...initValueRacikan}
        newRacikans.push(newRacikan)
        newResep.racikan = newRacikans
        newReseps[rowUtama.koder - 1] = newResep
        handleChangeAllResep(newReseps)
    }

    const handleAddResep = () => {
        const newValue = {...initValueResep}
        const newResep = [...resepRef.current, {...newValue}]
        handleChangeAllResep(newResep)
    }

    const handleAddRacikan = () => {
        const newValue = {...initValueResep}
        newValue.racikan = [{...initValueRacikan}]
        const newResep = [...resepRef.current, {...newValue}]
        handleChangeAllResep(newResep)
    }

    return {
        handleChangeAllResep,
        handleHapusRacikan,
        handleTambahRacikan,
        handleAddResep,
        handleAddRacikan
    }
}

export const useColumnsResep = (
    vResep,
    obatList,
    handleChangeObatResep,
    sediaanList,
    handleChangeResep,
    handleBlur,
    handleQtyObatResep,
    signa,
    keteranganResep,
    resepRef,
    handleChangeAllResep,
    disableObat = false
) => [
    {
        name: <span className='font-weight-bold fs-13'>R/</span>,
        Cell: ({row}) => row.koder,
        width: "5%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Nama Obat</span>,
        Cell: ({row}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[row.koder - 1]
            if(row.racikan.length === 0){
                return (
                    <div>
                        <CustomSelect
                            id="obat"
                            name="obat"
                            options={obatList}
                            onChange={(e) => handleChangeObatResep(e, row)}
                            value={row.obat}
                            isDisabled={disableObat}
                            className={`input ${touchedResep?.obat 
                                && !!errorsResep?.obat
                                ? "is-invalid" : ""}`}
                            />
                        {touchedResep?.obat
                            && !!errorsResep?.obat && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorsResep?.obat}
                                    </div>
                                </FormFeedback>
                            ) 
                        }
                        <div>
                            <span>Stok: {row.stok}</span>
                        </div>
                    </div>
                )
            }
            return (
                <div>
                    <CustomSelect
                        id="sediaan"
                        name="sediaan"
                        options={sediaanList}
                        onChange={(e) => {
                            handleChangeResep(e?.value || "", "sediaan", row, true);
                            handleChangeResep(e?.label || "", "namasediaan", row, true); 
                        }}
                        value={row.sediaan}
                        className={`input ${touchedResep?.sediaan 
                            && !!errorsResep?.sediaan
                            ? "is-invalid" : ""}`}
                        />
                    {touchedResep?.sediaan
                        && !!errorsResep?.sediaan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.sediaan}
                                </div>
                            </FormFeedback>
                        ) 
                    }
                </div>
            )
        },
        width: "23%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Qty</span>,
        Cell: ({row}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[row.koder - 1]
            const [val, setVal] = useState(row.qty)
            return (
                <div>
                    <Input 
                        id={`qty-${row.koder}`}
                        name={`qty`}
                        type="text"
                        value={val} 
                        onBlur={handleBlur}
                        disabled={!row.obat && !row.sediaan}
                        onChange={(e) => handleQtyObatResep(
                            e, 
                            row, 
                            val, 
                            setVal
                        )}
                        invalid={touchedResep?.qty && !!errorsResep?.qty}
                        />
                    {
                    touchedResep?.qty
                        && !!errorsResep?.qty &&  (
                        <FormFeedback type="invalid" >
                            <div>
                                {errorsResep?.qty}
                            </div>
                        </FormFeedback>
                    )}
                </div>
            )
        },
        width: "10%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Sediaan</span>,
        Cell: ({row}) => {
            return (
                <div>
                    {row.namasatuan}
                </div>
            )
        },
        width: "10%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Harga</span>,
        Cell: ({row}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[row.koder - 1]
            const totalRacikan = row.racikan.reduce((prev, val) => {
                return prev + (strToNumber(val.total) || 0)
            }, 0)
            const initValue = row.racikan.length > 0 ? 
                totalRacikan : row.total
            const [val, setVal] = useState(initValue)
            return (
                <div>
                    <Input 
                        id={`harga-${row.koder}`}
                        name={`harga`}
                        type="text"
                        value={val} 
                        onBlur={handleBlur}
                        disabled
                        onChange={(e) => {
                            const newVal = onChangeStrNbr(e.target.value, val)
                            setVal(newVal)
                            handleChangeResep(newVal, "harga", row)
                        }}
                        invalid={touchedResep?.harga && !!errorsResep?.harga}
                        />
                    {
                    touchedResep?.harga
                        && !!errorsResep?.qty &&  (
                        <FormFeedback type="invalid" >
                            <div>
                                {errorsResep?.harga}
                            </div>
                        </FormFeedback>
                    )}
                </div>
            )
        },
        width: "10%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Signa</span>,
        Cell: ({row}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[row.koder - 1]
            return (
                <div>
                    <CustomSelect
                        id={`signa-${row.koder}`}
                        name={`signa-${row.koder}`}
                        options={signa}
                        onChange={(e) => {
                            const newVal = e?.value || ""
                            handleChangeResep(newVal, "signa", row, true)
                        }}
                        value={row.signa}
                        className={`input ${!!errorsResep?.signa
                            ? "is-invalid" : ""}`}
                        />
                    {touchedResep?.signa
                        && !!errorsResep?.signa && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.signa}
                                </div>
                            </FormFeedback>
                        ) 
                    }
                </div>
            )
        },
        width: "17%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Keterangan</span>,
        Cell: ({row}) => {
            const errorsResep = vResep.errors?.resep?.[row.koder - 1]
            const touchedResep = vResep.touched?.resep?.[row.koder - 1]
            return (
                <div>
                    <CustomSelect
                        id={`keterangan-${row.koder}`}
                        name={`keterangan-${row.koder}`}
                        options={keteranganResep}
                        onChange={(e) => {
                            const newVal = e?.value || ""
                            handleChangeResep(newVal, "keterangan", row, true)
                            handleChangeResep(e?.label || "", "namaketerangan", row, true)
                        }}
                        value={row.keterangan}
                        className={`input ${!!errorsResep?.keterangan
                            ? "is-invalid" : ""}`}
                        />
                    {touchedResep?.keterangan
                        && !!errorsResep?.keterangan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.keterangan}
                                </div>
                            </FormFeedback>
                        ) 
                    }
                </div>
            )
        },
        width: "15%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Hapus</span>,
        Cell: ({row}) => {
            return (
                <div>
                    <Button color="danger" onClick={() => {
                        if(resepRef.current.length === 1) return;
                        const newResep = [...resepRef.current]
                        newResep.splice(row.koder - 1, 1)
                        handleChangeAllResep(newResep)
                    }}>
                        -
                    </Button>
                </div>
            )
        },
        width: "10%"
    },
];

export const useColumnsResepRacikan = (
    vResep,
    obatList,
    handleChangeObatRacikan,
    handleQtyRacikan,
    handleBlur,
    handleChangeRacikan,
    handleTambahRacikan,
    handleHapusRacikan,
    disableObat = false
) => [
    {
        name: <span className='font-weight-bold fs-13'>R/</span>,
        Cell: ({row, rowUtama}) => `${rowUtama.koder}.${row.koder}`,
        width: "5%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Nama Obat</span>,
        Cell: ({row, rowUtama}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[rowUtama.koder - 1]
            ?.racikan?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[rowUtama.koder - 1]
            ?.racikan?.[row.koder - 1]
            return (
                <div>
                    <CustomSelect
                        id="obat"
                        name="obat"
                        options={obatList}
                        isDisabled={disableObat}
                        onChange={(e) => handleChangeObatRacikan(
                            e, 
                            row, 
                            rowUtama
                        )}
                        value={row.obat}
                        className={`input row-header ${!!errorsResep?.obat
                            ? "is-invalid" : ""}`}
                        />
                    {touchedResep?.obat
                        && !!errorsResep?.obat && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.obat}
                                </div>
                            </FormFeedback>
                        ) 
                    }
                    <div>
                        <span>Stok: {row.stok}</span>
                    </div>
                </div>
            )
        },
        width: "15%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Qty</span>,
        Cell: ({row, rowUtama}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[rowUtama.koder - 1]
            ?.racikan
            ?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[rowUtama.koder - 1]
            ?.racikan
            ?.[row.koder - 1]
            const [val, setVal] = useState(row.qtyracikan)
            return (
                <div>
                    <Input 
                        id={`qty-${row.koder}`}
                        name={`qty`}
                        type="text"
                        value={val} 
                        onChange={(e) => {
                            handleQtyRacikan(
                                e, 
                                row, 
                                rowUtama,
                                val,
                                setVal
                            )
                        }}
                        onBlur={handleBlur}
                        invalid={touchedResep?.qtyracikan && !!errorsResep?.qtyracikan}
                        />
                    {
                    touchedResep?.qtyracikan
                        && !!errorsResep?.qtyracikan &&  (
                        <FormFeedback type="invalid" >
                            <div>
                                {errorsResep?.qtyracikan}
                            </div>
                        </FormFeedback>
                    )}
                </div>
            )
        },
        width: "8%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Qty</span>,
        Cell: ({row}) => <>
            <p className="mb-0">/1 racikan</p>
            <p className="mb-0">{row.qty} {row.namasatuan}</p>
        </>,
        width: "10%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Sediaan</span>,
        Cell: ({row}) => <div></div>,
        width: "10%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Harga</span>,
        Cell: ({row, rowUtama}) => {
            const errorsResep = vResep.errors
            ?.resep
            ?.[rowUtama.koder - 1]
            ?.racikan
            ?.[row.koder - 1]
            const touchedResep = vResep.touched
            ?.resep
            ?.[rowUtama.koder - 1]
            ?.racikan
            ?.[row.koder - 1]
            const [val, setVal] = useState(row.total)
            return (
                <div>
                    <Input 
                        id={`harga-${row.koder}`}
                        name={`harga`}
                        type="text"
                        value={val} 
                        disabled
                        onBlur={handleBlur}
                        onChange={(e) => {
                            const newVal = onChangeStrNbr(e.target.value, val)
                            setVal(newVal)
                            handleChangeRacikan(newVal, "harga", rowUtama, row)
                        }}
                        invalid={touchedResep?.harga && !!errorsResep?.harga}
                        />
                    {
                    touchedResep?.harga
                        && !!errorsResep?.qty &&  (
                        <FormFeedback type="invalid" >
                            <div>
                                {errorsResep?.harga}
                            </div>
                        </FormFeedback>
                    )}
                </div>
            )
        },
        width: "10%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Signa</span>,
        Cell: ({row}) => <div></div>,
        width: "27%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Tambah</span>,
        Cell: ({row, rowUtama}) => {
            if(row.koder !== rowUtama.racikan.length){
                return <div></div>
            }
            return (
                <div>
                    <Button 
                        color="success" 
                        onClick={() => 
                            handleTambahRacikan(row, rowUtama)
                        }>
                        +
                    </Button>
                </div>
            )
        },
        width: "5%"
    },
    {
        name: <span className='font-weight-bold fs-13'>Hapus</span>,
        Cell: ({row, rowUtama}) => {
            return (
                <div>
                    <Button 
                        color="danger" 
                        onClick={() => 
                            handleHapusRacikan(row, rowUtama)
                        }>
                        -
                    </Button>
                </div>
            )
        },
        width: "10%"
    },
];


export default PenjualanObatBebas