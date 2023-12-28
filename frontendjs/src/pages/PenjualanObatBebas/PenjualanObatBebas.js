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
import { initValueResep, validationResep, initValueRacikan, TabelResep, useResepRef } from "./KomponenResep";



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

    const resepRef = useResepRef()

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
            resep: validationResep()
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
    }, [penjualanBebasFromNorec, vResep.setValues, vResep.initialValues, resepRef])

    return (
        <div className="page-content page-verifikasi-resep">
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
                        <TabelResep vResep={vResep} 
                            idunit={vResep.values.unittujuan} 
                            isbebas 
                            resepRef={resepRef}/>

                        <TabelResep 
                            vResep={vResep} 
                            idunit={vResep.values.unittujuan} 
                            isbebas 
                            resepRef={resepRef}
                            isQty={false}
                            isRacikan={false}
                            isAllObat/>
                        <Row className="d-flex justify-content-center">
                            <Col md="auto">
                                <Button color="success"
                                    disabled={false}
                                    onClick={() => {
                                        vResep.handleSubmit();
                                    }}>
                                    {vResep.values.norecjualbebas ? "Edit" : "Simpan"}
                                </Button>
                            </Col>
                            <Col md="auto">
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



export default PenjualanObatBebas