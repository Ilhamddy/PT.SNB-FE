import { Button, Card, Col, Container, FormFeedback, Input, Label, Row } from "reactstrap"
import CustomSelect from "../Select/Select"
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
import { useHandleChangeResep, useHandleChangeAllResep, useColumnsResep, useColumnsResepRacikan } from "../PenjualanObatBebas/PenjualanObatBebas";
import KontainerFlatpickr from "../../Components/KontainerFlatpickr/KontainerFlatpickr";

export const initValueResep = {
    norecverif: "",
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

const TambahObatFarmasi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {norecap} = useParams()

    const {
        pegawai,
        unit,
        keteranganResep,
        signa,
        obatList,
        sediaanList,
    } = useSelector((state) => ({
        pegawai: state?.Master?.getComboPenjualanBebas?.data?.pegawai || [],
        unit: state.Master?.getComboPenjualanBebas?.data?.unit || [],
        keteranganResep: state.Master?.getComboPenjualanBebas?.data?.keteranganresep || [],
        signa: state.Master?.getComboPenjualanBebas?.data?.signa || [],
        obatList: state?.Emr?.getObatFromUnit?.data?.obat || [],
        sediaanList: state?.Master?.getComboPenjualanBebas?.data?.sediaan || [],
    }))

    const [dateNow] = useState(() => new Date().toISOString())

    const vResep = useFormik({
        enableReinitialize: true,
        initialValues: {
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
        },
        validationSchema: Yup.object({
            penulisresep: Yup.string().required("Penulis resep harus diisi"),
            unittujuan: Yup.string().required("Depo tujuan harus diisi"),
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
            dispatch(getObatFromUnit({idunit: vResep.values.unittujuan}))
    }, [dispatch, vResep.values.unittujuan])

    useEffect(() => {
        const setFF = vResep.setFieldValue
        setFF("norecap", norecap || "")
    }, [norecap, vResep.setFieldValue])


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
                            <Input 
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
                                <Button color="info"
                                    disabled={vResep.values.noresep}
                                    onClick={() => {
                                        vResep.handleSubmit();
                                    }}>
                                    Simpan
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