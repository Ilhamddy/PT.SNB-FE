import { Button, Card, Col, Container, FormFeedback, Input, Label, Row } from "reactstrap"
import CustomSelect from "../../Components/Common/CustomSelect/CustomSelect"
import { useFormik } from "formik"
import DataTable from 'react-data-table-component';
import LoadingTable from "../../Components/Table/LoadingTable";
import NoDataTable from "../../Components/Table/NoDataTable";
import { onChangeStrNbr, strToNumber } from "../../utils/format";
import { useEffect, useRef, useState } from "react";
import { getComboResep, getComboVerifResep } from "../../store/master/action";
import { useDispatch, useSelector } from "react-redux";
import { getObatFromUnit } from "../../store/emr/action";
import * as Yup from "yup"
import { useParams, useSearchParams} from "react-router-dom"
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import { createOrUpdateVerifResep, getOrderResepFromNorec } from "../../store/farmasi/action";
import Flatpickr from "react-flatpickr";
import KontainerFlatpickr from "../../Components/KontainerFlatpickr/KontainerFlatpickr";
import { initValueResep, validationResep, useHandleChangeResep, useHandleChangeAllResep, useColumnsResep, useColumnsResepRacikan, useResepRef, TabelResep } from "../PenjualanObatBebas/KomponenResep";
import CustomInput from "../../Components/Common/CustomInput/CustomInput";


const initValueRacikan = {
    ...initValueResep,
    racikan: undefined
}


const VerifikasiResep = () => {
    const dispatch = useDispatch()

    const {norecorder} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const {
        pegawai,
        unit,
        keteranganResep,
        signa,
        obatList,
        sediaanList,
        penjamin,
        orderNorec
    } = useSelector((state) => ({
        pegawai: state.Master?.getComboVerifResep?.data?.pegawai || [],
        unit: state.Master?.getComboVerifResep?.data?.unit || [],
        keteranganResep: state.Master?.getComboVerifResep?.data?.keteranganresep || [],
        signa: state.Master?.getComboVerifResep?.data?.signa || [],
        obatList: state?.Emr?.getObatFromUnit?.data?.obat || [],
        sediaanList: state?.Master?.getComboVerifResep?.data?.sediaan || [],
        penjamin: state?.Master?.getComboVerifResep?.data?.penjamin || [],
        orderNorec: state?.Farmasi?.getOrderResepFromNorec?.data?.ordernorec || null,
    }))

    const vResep = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecorderresep: "",
            norecap: "",
            dokter: "",
            namadokter: "",
            unitasal: "",
            unittujuan: "",
            tanggalorder: "",
            noorder: "",
            noresep: "",
            tglverif: "",
            penjamin: "",
            resep: [
                {
                    ...initValueResep
                }
            ],
        },
        validationSchema: Yup.object({
            dokter: Yup.string().required("Dokter harus diisi"),
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
            dispatch(createOrUpdateVerifResep(newVal, (data) => {
                dispatch(getOrderResepFromNorec({norec: norecorder}))
            }))
        }
    })

    // harusnya pake memoized tapi lagi keburu
    const resepRef = useResepRef()

    useEffect(() => {
        dispatch(getComboVerifResep())
    }, [dispatch])

    useEffect(() => {
        vResep.values.unittujuan &&
            dispatch(getObatFromUnit({idunit: vResep.values.unittujuan}))
    }, [dispatch, vResep.values.unittujuan])


    useEffect(() => {
        const setV = vResep.setValues
        const resetV = vResep.resetForm
        let orderNorecGot = null
        if(!Array.isArray(orderNorec) && orderNorec){
            orderNorecGot = orderNorec
        }
        if(!norecorder){
            resetV();
            resepRef.current = [
                {
                    ...initValueResep
                }
            ]
        }

        if(orderNorecGot){
            setV(orderNorec)
            resepRef.current = orderNorecGot.resep
        }

    }, [
        orderNorec, 
        norecorder, 
        vResep.setValues, 
        vResep.resetForm,
        resepRef
    ])

    useEffect(() => {
        const setFF = vResep.setFieldValue
        dispatch(getOrderResepFromNorec({norec: norecorder}))
        setFF("norecorderresep", norecorder)
    }, [dispatch, norecorder, vResep.setFieldValue])

    return (
        <div className="page-content page-verifikasi-resep">
            <Container fluid>
                <BreadCrumb title="Verifikasi Resep" pageTitle="Farmasi" />
                <Card className="p-5">
                    <Row className="mb-2">
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`dokter`}
                                className="form-label mt-2">
                                Dokter
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomSelect
                                id="dokter"
                                name="dokter"
                                options={pegawai}
                                isDisabled
                                onChange={(e) => {
                                    vResep.setFieldValue("dokter", e?.value || "")
                                    vResep.setFieldValue("namadokter", e?.label || "")
                                }}
                                value={vResep.values.dokter}
                                className={`input ${!!vResep?.errors.dokter ? "is-invalid" : ""}`}
                                />
                            {vResep.touched.dokter 
                                && !!vResep.errors.dokter ? (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vResep.errors.dokter}
                                        </div>
                                    </FormFeedback>
                                ) : null
                            }
                        </Col>
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`unitasal`}
                                className="form-label mt-2">
                                Unit Asal
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomSelect
                                id="unitasal"
                                name="unitasal"
                                options={unit}
                                isDisabled
                                onChange={(e) => {
                                    vResep.setFieldValue("unitasal", e?.value || "")
                                }}
                                value={vResep.values.unitasal}
                                className={`input ${!!vResep?.errors.unitasal ? "is-invalid" : ""}`}
                                />
                            {vResep.touched.unitasal 
                                && !!vResep.errors.unitasal && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vResep.errors.unitasal}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`unitasal`}
                                className="form-label mt-2">
                                Waktu Order
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <KontainerFlatpickr
                                isError={vResep.touched?.tanggalorder 
                                    && !!vResep.errors?.tanggalorder}
                                id="tanggalorder"
                                options={{
                                    dateFormat: "Y-m-d H:i",
                                    defaultDate: "today"
                                }}
                                value={vResep.values.tanggalorder}
                                onChange={([newDate]) => {
                                    vResep.setFieldValue("tanggalorder", newDate.toISOString());
                                }}
                            />
                            {
                                vResep.touched?.tanggalorder 
                                    && !!vResep.errors?.tanggalorder && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vResep.errors?.tanggalorder}
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
                                Depo Tujuan 
                            </Label>
                        </Col>
                        <Col lg={4}>
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
                    </Row>
                    <Row className="mb-2">
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`noorder`}
                                className="form-label mt-2">
                                No Order 
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomInput 
                                id={`noorder`}
                                name={`noorder`}
                                type="text"
                                value={vResep.values.noorder + "/" + (vResep.values.noresep || "")} 
                                disabled
                                invalid={vResep.touched?.noorder 
                                    && !!vResep.errors?.noorder}
                                />
                            {vResep.touched?.noorder 
                                && !!vResep.errors?.noorder && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vResep.errors?.noorder}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={2}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`penjamin`}
                                className="form-label mt-2">
                                Penjamin 
                            </Label>
                        </Col>
                        <Col lg={4}>
                            <CustomSelect
                                id="penjamin"
                                name="penjamin"
                                options={penjamin}
                                isDisabled
                                onChange={(e) => {
                                    vResep.setFieldValue("penjamin", e?.value || "")
                                }}
                                value={vResep.values.penjamin}
                                className={`input ${!!vResep?.errors.penjamin ? "is-invalid" : ""}`}
                                />
                            {vResep.touched?.penjamin 
                                && !!vResep.errors?.penjamin && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vResep.errors?.penjamin}
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
                        <Row className="d-flex justify-content-center">
                            <Col md="auto">
                                <Button color="success"
                                    disabled={vResep.values.noresep}
                                    onClick={() => {
                                        vResep.handleSubmit();
                                    }}>
                                    Verifikasi
                                </Button>
                            </Col>
                            <Col md="auto" >
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


export default VerifikasiResep