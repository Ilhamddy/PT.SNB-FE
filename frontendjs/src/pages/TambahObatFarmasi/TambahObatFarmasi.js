import { Button, Card, Col, Container, FormFeedback, Input, Label, Row } from "reactstrap"
import CustomSelect from "../../Components/Common/CustomSelect/CustomSelect"
import { useFormik } from "formik"
import DataTable from 'react-data-table-component';
import LoadingTable from "../../Components/Table/LoadingTable";
import NoDataTable from "../../Components/Table/NoDataTable";
import { onChangeStrNbr, strToNumber } from "../../utils/format";
import { useEffect, useRef, useState } from "react";
import { getComboPenjualanBebas, getComboResep, getComboVerifResep } from "../../store/master/action";
import { useDispatch, useSelector } from "react-redux";
import { getObatFromUnit } from "../../store/emr/action";
import * as Yup from "yup"
import { useNavigate, useParams, useSearchParams} from "react-router-dom"
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import { createOrUpdateOrderPlusVerif, createOrUpdateVerifResep, getOrderResepFromNorec } from "../../store/farmasi/action";
import Flatpickr from "react-flatpickr";
import KontainerFlatpickr from "../../Components/KontainerFlatpickr/KontainerFlatpickr";
import { initValueResep, validationResep, useHandleChangeResep, useHandleChangeAllResep, useColumnsResep, useColumnsResepRacikan, TabelResep, useResepRef } from "../PenjualanObatBebas/KomponenResep";
import CustomInput from "../../Components/Common/CustomInput/CustomInput";



const initialResep = (dateNow, norecap) => ({
    norecorder: "",
    norecap: norecap,
    tanggalresep: dateNow,
    unittujuan: "",
    penulisresep: "",
    noresep: "",
    resep: [
        {
            ...initValueResep
        }
    ],
})

const TambahObatFarmasi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {norecap, norecresep} = useParams()

    const {
        pegawai,
        unit,
        keteranganResep,
        signa,
        obatList,
        sediaanList,
        obatResep
    } = useSelector((state) => ({
        pegawai: state?.Master?.getComboPenjualanBebas?.data?.pegawai || [],
        unit: state.Master?.getComboPenjualanBebas?.data?.unit || [],
        keteranganResep: state.Master?.getComboPenjualanBebas?.data?.keteranganresep || [],
        signa: state.Master?.getComboPenjualanBebas?.data?.signa || [],
        obatList: state?.Emr?.getObatFromUnit?.data?.obat || [],
        sediaanList: state?.Master?.getComboPenjualanBebas?.data?.sediaan || [],
        obatResep: state.Farmasi.getOrderResepFromNorec.data?.ordernorec || null
    }))

    const [dateNow] = useState(() => new Date().toISOString())

    const vResep = useFormik({
        enableReinitialize: true,
        initialValues: initialResep(dateNow, norecap),
        validationSchema: Yup.object({
            penulisresep: Yup.string().required("Penulis resep harus diisi"),
            unittujuan: Yup.string().required("Depo tujuan harus diisi"),
            resep: validationResep()
        }),
        onSubmit: (value) => {
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
            dispatch(createOrUpdateOrderPlusVerif(newVal, (data) => {
                navigate(-1)
            }))
        }
    })

    // harusnya pake memoized tapi lagi keburu
    const resepRef = useResepRef()

    useEffect(() => {
        dispatch(getComboPenjualanBebas())
    }, [dispatch])

    useEffect(() => {
        vResep.values.unittujuan &&
            dispatch(getObatFromUnit({idunit: vResep.values.unittujuan}))
    }, [dispatch, vResep.values.unittujuan])

    useEffect(() => {
        const setFF = vResep.setFieldValue
        setFF("norecap", norecap || "")
    }, [norecap, vResep.setFieldValue])

    useEffect(() => {
        dispatch(getOrderResepFromNorec({norec: norecresep}))
    }, [norecresep, dispatch])

    useEffect(() => {
        const setV = vResep.setValues
        const resetV = vResep.resetForm
        if(obatResep){
            const newResep = {
                ...initialResep(dateNow, norecap),
                ...obatResep, 
            }
            setV(newResep)
            resepRef.current = newResep.resep
        }else{
            resetV()
        }
    }, [obatResep, dateNow, norecap, vResep.setValues, vResep.resetForm, resepRef])

    return (
        <div className="page-content page-verifikasi-resep">
            <Container fluid>
                <BreadCrumb title="Verifikasi Resep" pageTitle="Farmasi" />
                <Card className="p-5">
                    <Row className="mb-2">
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggalresep`}
                                className="form-label mt-2">
                                Tanggal Resep
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <KontainerFlatpickr
                                isError={
                                    vResep.touched?.tanggalresep 
                                    && !!vResep.errors?.tanggalresep
                                }
                                id="tanggalresep"
                                options={{
                                    dateFormat: "Y-m-d H:i",
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
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`unittujuan`}
                                className="form-label mt-2">
                                Depo 
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomSelect
                                id="unittujuan"
                                name="unittujuan"
                                options={unit}
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
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`penulisresep`}
                                className="form-label mt-2">
                                Penulis resep 
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomSelect
                                id="penulisresep"
                                name="penulisresep"
                                options={pegawai}
                                onChange={(e) => {
                                    vResep.setFieldValue("penulisresep", e?.value || "")
                                }}
                                value={vResep.values.penulisresep}
                                className={`input ${!!vResep?.errors.penulisresep ? "is-invalid" : ""}`}
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
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`noresep`}
                                className="form-label mt-2">
                                No Resep 
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomInput 
                                id={`noresep`}
                                name={`noresep`}
                                type="text"
                                value={vResep.values.noresep} 
                                disabled
                                invalid={vResep.touched?.noresep 
                                    && !!vResep.errors?.noresep}
                                />
                            {vResep.touched?.noresep 
                                && !!vResep.errors?.noresep && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vResep.errors?.noresep}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <TabelResep 
                            vResep={vResep} 
                            idunit={vResep.values.unittujuan} 
                            resepRef={resepRef}/>
                        <Row style={{justifyContent: "space-evenly"}}>
                            <Col md={2}>
                                <Button color="success"
                                    onClick={() => {
                                        vResep.handleSubmit();
                                    }}>
                                    {vResep.values.noresep ? "Edit" : "Simpan"}
                                </Button>
                            </Col>
                            <Col md={2}>
                                <Button color="danger">
                                    Batal
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                </Card> 
            </Container>
        </div>
    )
}


export default TambahObatFarmasi