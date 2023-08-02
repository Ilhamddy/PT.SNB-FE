import { useState, useEffect, useRef } from "react";
import { Button, 
    Card, 
    CardBody, 
    Col, 
    Container, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    FormFeedback, 
    Input, 
    Label, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { produkMasterGet } from "../../store/actions";
import Flatpickr from "react-flatpickr";
import usePageState from "../../utils/usePageState";
import { onChangeStrNbr, strToNumber } from "../../utils/format";
import { comboPenerimaanBarangGet } from "../../store/master/action";
import { satuanFromProdukGet } from "../../store/gudang/action";


const PenerimaanProduk = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refSatuanTerima = useRef(null);

    const {
        supplier, 
        produk,
        satuanProduk,
        kemasanProduk
    } = useSelector((state) => ({
        supplier: state.Master.comboPenerimaanBarangGet?.data?.supplier || [],
        produk: state.Master.comboPenerimaanBarangGet?.data?.produk || [],
        satuanProduk: state.Master.comboPenerimaanBarangGet?.data?.satuanproduk || [],
        kemasanProduk: state.Gudang.satuanFromProdukGet?.data?.satuan || []
    }))

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            nomorterima: "",
            tanggalterima: "",
            namasupplier: "",
            nomorpo: "",
            tanggalpesan: "",
            unitpesan: "",
            tanggaljatuhtempo: "",
            sumberdana: "",
            keterangan: "",
            subtotal: "",
            ppnrupiah: "",
            diskonrupiah: "",
            total: "",
        },
        validationSchema: Yup.object({
            nomorterima: Yup.string().required("No Terima harus diisi"),
            tanggalterima: Yup.string().required("Tanggal Terima harus diisi"),
            namasupplier: Yup.string().required("Nama Supplier harus diisi"),
            nomorpo: Yup.string().required("No PO harus diisi"),
            tanggalpesan: Yup.string().required("Tanggal Pesan harus diisi"),
            unitpesan: Yup.string().required("Unit Pesan harus diisi"),
            tanggaljatuhtempo: Yup.string().required("Tanggal Jatuh Tempo harus diisi"),
            sumberdana: Yup.string().required("Sumber Dana harus diisi"),
            keterangan: Yup.string().required("Keterangan harus diisi"),
            subtotal: Yup.string().required("Subtotal harus diisi"),
            ppnrupiah: Yup.string().required("PPN Rupiah harus diisi"),
            diskonrupiah: Yup.string().required("Diskon harus diisi"),
            total: Yup.string().required("Total harus diisi"),
        }),
        onSubmit: (values) => {

        }
    })

    const vProduk = useFormik({
        enableReinitialize: true,
        initialValues: {
            produk: {
                value: "",
                satuanjual: "",
            },
            satuanterima: "",
            konversisatuan: "",
            jumlahterima: "",
            checkedharga: "0",
            hargasatuankecil: "",
            hargasatuanterima: "",
            checkeddiskon: "0",
            diskonpersen: "",
            diskonrupiah: "",
            ppnrupiahproduk: "",
            ppnpersenproduk: "",
            tanggaled: "",
            nobatch: "",
            subtotalproduk: "",
            totalproduk: "",
        },
        validationSchema: Yup.object({
            produk: Yup.object().shape({
                value: Yup.string().required("Produk harus diisi"),
                satuanjual: Yup.string().required("Satuan jual harus diisi"),
            }),
            satuanjual: Yup.string().required("Satuan Jual harus diisi"),
            satuanterima: Yup.string().required("Satuan Terima harus diisi"),
            konversisatuan: Yup.string().required("Konversi Satuan harus diisi"),
            jumlahterima: Yup.string().required("Jumlah Terima harus diisi"),
            hargasatuankecil: Yup.string().when("checkedharga", {
                is: (val) => val === "0",
                then: () => Yup.string().required("Harga satuan kecil harus diisi"),
            }),
            hargasatuanterima: Yup.string().required("Harga satuan terima harus diisi"),
            diskonpersen: Yup.string().when("checkeddiskon", {
                is: (val) => val === "0",
                then: () => Yup.string().required("Diskon harus diisi"),
            }),
            diskonrupiah: Yup.string().required("Diskon harus diisi"),
            ppnrupiahproduk: Yup.string().required("PPN Rupiah harus diisi"),
            ppnpersenproduk: Yup.string().required("PPN Persen harus diisi"),
            tanggaled: Yup.string().required("Tanggal ED harus diisi"),
            nobatch: Yup.string().required("No Batch harus diisi"),
            subtotalproduk: Yup.string().required("Subtotal harus diisi"),
            totalproduk: Yup.string().required("Total harus diisi"),
        }),
        onSubmit: (values) => {}
    })

    const handleChangeJumlahTerima = (e) => {
        const newVal = onChangeStrNbr(
            e.target.value, 
            vProduk.values.jumlahterima
        )
        vProduk.setFieldValue('jumlahterima', newVal)
    }

    useEffect(() => {
        const idProduk = vProduk.values.produk.value
        refSatuanTerima.current?.clearValue();
        idProduk && 
            dispatch(satuanFromProdukGet({ idproduk: idProduk }))
    }, [dispatch, vProduk.values.produk.value])

    useEffect(() => {
        // Perhitungan satuan jumlah terima, harga, Diskon, dan ppn
        const setFF = vProduk.setFieldValue
        const calcualteSatuanTerima = () => {
            let newValTerima
            if(vProduk.values.checkedharga === "0"){
                const hargaSatuan = vProduk.values.hargasatuankecil
                newValTerima = 
                    strToNumber(hargaSatuan) *
                    vProduk.values.konversisatuan
                const newValTerimaStr = onChangeStrNbr(
                    newValTerima,
                    vProduk.values.hargasatuankecil
                )
                setFF(
                    "hargasatuanterima", 
                    newValTerimaStr
                )
            }else{
                newValTerima 
                    = strToNumber(vProduk.values.hargasatuanterima)
                let newValKecil = 
                    newValTerima /
                    (vProduk.values.konversisatuan || 1)
                const newValKecilStr = onChangeStrNbr(
                    newValKecil,
                    vProduk.values.hargasatuankecil
                )
                setFF(
                    "hargasatuankecil", 
                    newValKecilStr
                )
                let newValSubtotal =
                    strToNumber(newValKecilStr) *
                    (vProduk.values.jumlahterima || 0)
                newValSubtotal = onChangeStrNbr(
                    newValSubtotal,
                    vProduk.values.subtotalproduk
                )
                setFF(
                    "subtotalproduk",
                    newValSubtotal
                )
            }
            return newValTerima
        }
        const calculateSubtotal = (newValTerima) => {
            let newValSubtotal = 
                newValTerima * 
                (vProduk.values.jumlahterima || 0)
            const newValSubtotalStr = onChangeStrNbr(
                newValSubtotal,
                vProduk.values.subtotalproduk
            )
            setFF(
                "subtotalproduk",
                newValSubtotalStr
            )
            return newValSubtotal
        }

        const calculateDiskon = (newValSubtotal) => {
            let newValDiskon
            if(vProduk.values.checkeddiskon === "0"){
                const diskonPersen = vProduk.values.diskonpersen
                newValDiskon = 
                    strToNumber(diskonPersen) *
                    newValSubtotal /
                    100
                const newValDiskonStr = onChangeStrNbr(
                    newValDiskon,
                    vProduk.values.diskonpersen
                )
                setFF(
                    "diskonrupiah", 
                    newValDiskonStr
                )
            }else{
                newValDiskon 
                    = strToNumber(vProduk.values.diskonrupiah);
            }
            return newValDiskon
        }

        const calculateTotal = (newValSubtotal, newValDiskon) => {
            let newValTotal =
                newValSubtotal -
                newValDiskon
            newValTotal = onChangeStrNbr(
                newValTotal,
                vProduk.values.totalproduk
            )
            setFF(
                "totalproduk",
                newValTotal
            )
            return newValTotal
        }
        const calculatePpn = (newValSubtotal) => {
            const ppnPersen = vProduk.values.ppnpersenproduk
            let newValPpn =
                strToNumber(ppnPersen) *
                newValSubtotal /
                100
            newValPpn = onChangeStrNbr(
                newValPpn,
                vProduk.values.ppnrupiahproduk
            )
            setFF(
                "ppnrupiahproduk",
                newValPpn
            )
            return newValPpn
        }
        const newValTerima = calcualteSatuanTerima()
        const newValSubtotal = calculateSubtotal(newValTerima)
        const newValDiskon = calculateDiskon(newValSubtotal)
        const newppn = calculatePpn(newValSubtotal)
        calculateTotal(newValSubtotal, newValDiskon)
        
    }, [
        vProduk.values.hargasatuankecil, 
        vProduk.values.hargasatuanterima, 
        vProduk.values.checkedharga,
        vProduk.values.konversisatuan,
        vProduk.values.jumlahterima,
        vProduk.values.subtotalproduk,
        vProduk.values.diskonrupiah,
        vProduk.values.totalproduk,
        vProduk.values.checkeddiskon,
        vProduk.values.diskonpersen,
        vProduk.values.ppnpersenproduk,
        vProduk.values.ppnrupiahproduk,
        vProduk.setFieldValue
    ])

    useEffect(() => {
        dispatch(comboPenerimaanBarangGet())
    }, [dispatch])

    const InputUmumTerima = (
        <Card className="p-5">
            <Row className="mb-2">
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`nomorterima`}
                        className="form-label mt-2">
                        No Terima
                    </Label>
                </Col>
                <Col lg={3}>
                    <Input 
                        id={`nomorterima`}
                        name={`nomorterima`}
                        type="text"
                        value={validation.values.nomorterima} 
                        onChange={validation.handleChange}
                        invalid={validation.touched.nomorterima && !!validation.errors.nomorterima}
                        />
                    {validation.touched.nomorterima 
                        && !!validation.errors.nomorterima && (
                        <FormFeedback type="invalid" >
                            <div>
                                {validation.errors.nomorterima}
                            </div>
                        </FormFeedback>
                    )}
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`tanggalterima`}
                        className="form-label mt-2">
                        Tgl Terima
                    </Label>
                </Col>
                <Col lg={3}>
                    <Flatpickr
                        // value={validation.values.tglregistrasi || ""}
                        className="form-control"
                        id="tanggalterima"
                        options={{
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                        }}
                        onChange={([newDate]) => {
                            validation.setFieldValue("tanggalterima", newDate.toISOString());
                        }}
                    />
                    {
                        validation.touched.tanggalterima 
                            && !!validation.errors.tanggalterima && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {validation.errors.tanggalterima}
                                </div>
                            </FormFeedback>
                        )
                    }
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`namasupplier`}
                        className="form-label mt-2">
                        Supplier
                    </Label>
                </Col>
                <Col lg={3}>
                    <CustomSelect
                        id="namasupplier"
                        name="namasupplier"
                        options={supplier}
                        onChange={(e) => {
                            validation.setFieldValue('namasupplier', e?.value || "")
                        }}
                        value={validation.values.namasupplier}
                        className={`input ${validation.errors.namasupplier ? "is-invalid" : ""}`}
                        />
                    {validation.touched.namasupplier 
                        && validation.errors.namasupplier ? (
                            <FormFeedback type="invalid" >
                                <div>
                                    {validation.errors.namasupplier}
                                </div>
                            </FormFeedback>
                        ) : null
                    }
                </Col>
            </Row>
            <Row className="mb-2">
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`nomorpo`}
                        className="form-label mt-2">
                        No PO
                    </Label>
                </Col>
                <Col lg={3}>
                    <Input 
                        id={`nomorpo`}
                        name={`nomorpo`}
                        type="text"
                        value={validation.values.nomorpo} 
                        onChange={validation.handleChange}
                        invalid={validation.touched.nomorpo && !!validation.errors.nomorpo}
                        />
                    {validation.touched.nomorpo 
                        && !!validation.errors.nomorpo ? (
                        <FormFeedback type="invalid" >
                            <div>
                                {validation.errors.nomorpo}
                            </div>
                        </FormFeedback>
                    ) : null}
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`tanggalpesan`}
                        className="form-label mt-2">
                        Tgl Pesan   
                    </Label>
                </Col>
                <Col lg={3}>
                    <Flatpickr
                        // value={validation.values.tglregistrasi || ""}
                        className="form-control"
                        id="tanggalpesan"
                        options={{
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                        }}
                        onChange={([newDate]) => {
                            validation.setFieldValue("tanggalpesan", newDate.toISOString());
                        }}
                    />
                    {
                        validation.touched.tanggalpesan 
                            && !!validation.errors.tanggalpesan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {validation.errors.tanggalpesan}
                                </div>
                            </FormFeedback>
                        )
                    }
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`unitpesan`}
                        className="form-label mt-2">
                        Unit Pesan
                    </Label>
                </Col>
                <Col lg={3}>
                    <CustomSelect
                        id="unitpesan"
                        name="unitpesan"
                        options={[]}
                        onChange={(e) => {
                            validation.setFieldValue('unitpesan', e?.value || "")
                        }}
                        value={validation.values.unitpesan}
                        className={`input ${validation.errors.unitpesan ? "is-invalid" : ""}`}
                        />
                    {validation.touched.unitpesan 
                        && !!validation.errors.unitpesan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {validation.errors.unitpesan}
                                </div>
                            </FormFeedback>
                        )
                    }
                </Col>
            </Row>
            <Row className="mb-2">
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`tanggaljatuhtempo`}
                        className="form-label mt-2">
                        Tgl J.Tempo  
                    </Label>
                </Col>
                <Col lg={3}>
                    <Flatpickr
                        // value={validation.values.tglregistrasi || ""}
                        className="form-control"
                        id="tanggaljatuhtempo"
                        options={{
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                        }}
                        onChange={([newDate]) => {
                            validation.setFieldValue("tanggaljatuhtempo", newDate.toISOString());
                        }}
                    />
                    {
                        validation.touched.tanggaljatuhtempo 
                            && !!validation.errors.tanggaljatuhtempo && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {validation.errors.tanggaljatuhtempo}
                                </div>
                            </FormFeedback>
                        )
                    }
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`sumberdana`}
                        className="form-label mt-2">
                        Sbr Dana
                    </Label>
                </Col>
                <Col lg={3}>
                    <Input 
                        id={`sumberdana`}
                        name={`sumberdana`}
                        type="text"
                        value={validation.values.sumberdana} 
                        onChange={validation.handleChange}
                        invalid={validation.touched.sumberdana 
                            && !!validation.errors.sumberdana}
                        />
                    {validation.touched.sumberdana 
                        && !!validation.errors.sumberdana && (
                        <FormFeedback type="invalid" >
                            <div>
                                {validation.errors.sumberdana}
                            </div>
                        </FormFeedback>
                    )}
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`keterangan`}
                        className="form-label mt-2">
                        Keterangan
                    </Label>
                </Col>
                <Col lg={3}>
                    <Input 
                        id={`keterangan`}
                        name={`keterangan`}
                        type="text"
                        value={validation.values.keterangan} 
                        onChange={validation.handleChange}
                        invalid={validation.touched.keterangan 
                            && !!validation.errors.keterangan}
                        />
                    {validation.touched.keterangan 
                        && !!validation.errors.keterangan && (
                        <FormFeedback type="invalid" >
                            <div>
                                {validation.errors.keterangan}
                            </div>
                        </FormFeedback>
                    )}
                </Col>
            </Row>
        </Card>
    )

    const InputProdukDetail = (
        <Card className="p-5">
            <Row className="mb-2">
                <Col lg={4}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`produk`}
                        className="form-label mt-2">
                        Nama Produk
                    </Label>
                    <CustomSelect
                        id="produk"
                        name="produk"
                        options={produk}
                        onChange={(e) => {
                            vProduk.setFieldValue('produk', {
                                value: e?.value || "",
                                satuanjual: e?.valuesatuanstandar || "",
                            })
                        }}
                        value={vProduk.values.produk}
                        className={`input ${vProduk.errors.produk ? "is-invalid" : ""}`}
                        />
                    {vProduk.touched.produk 
                        && !!vProduk.errors.produk && (
                        <FormFeedback type="invalid" >
                            <div>
                                {vProduk.errors.produk}
                            </div>
                        </FormFeedback>
                    )}
                </Col>
                <Col lg={4}>
                    <Row>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`satuanjual`}
                                className="form-label mt-2">
                                Satuan Jual
                            </Label>
                            <CustomSelect
                                id="satuanjual"
                                name="satuanjual"
                                options={satuanProduk}
                                value={vProduk.values.produk?.satuanjual}
                                isDisabled
                                className={`input 
                                    ${vProduk.errors.produk?.satuanjual 
                                        ? "is-invalid" 
                                        : ""
                                    }`}
                                />
                            {vProduk.touched.produk?.satuanjual
                                && !!vProduk.errors?.produk?.satuanjual && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors?.produk?.satuanjual}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`satuanterima`}
                                className="form-label mt-2">
                                Satuan Penerimaan
                            </Label>
                            <CustomSelect
                                id="satuanterima"
                                name="satuanterima"
                                options={kemasanProduk}
                                isDisabled={kemasanProduk.length === 0}
                                onChange={(e) => {
                                    vProduk.setFieldValue('satuanterima', e?.value || "")
                                    vProduk.setFieldValue('konversisatuan', e?.nilaikonversi || "")
                                }}
                                value={vProduk.values.satuanterima}
                                className={`input ${vProduk.errors.satuanterima ? "is-invalid" : ""}`}
                                ref={refSatuanTerima}
                                />
                            {vProduk.touched.satuanterima 
                                && !!vProduk.errors.satuanterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.satuanterima}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`konversisatuan`}
                                className="form-label mt-2">
                                Konversi Satuan
                            </Label>
                            <Input 
                                id={`konversisatuan`}
                                name={`konversisatuan`}
                                type="text"
                                value={vProduk.values.konversisatuan} 
                                disabled
                                invalid={vProduk.touched.konversisatuan 
                                    && !!vProduk.errors.konversisatuan}
                                />
                            {vProduk.touched.konversisatuan 
                                && !!vProduk.errors.konversisatuan && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.konversisatuan}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`jumlahterima`}
                                className="form-label mt-2">
                                Jumlah Terima
                            </Label>
                            <Input 
                                id={`jumlahterima`}
                                name={`jumlahterima`}
                                type="text"
                                value={vProduk.values.jumlahterima} 
                                onChange={handleChangeJumlahTerima}
                                invalid={vProduk.touched.jumlahterima 
                                    && !!vProduk.errors.jumlahterima}
                                />
                            {vProduk.touched.jumlahterima 
                                && !!vProduk.errors.jumlahterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.jumlahterima}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col lg={4}>
                    <Row>
                        <Col lg={6}>
                            <div className="d-flex flex-row mt-2 form-label">
                                <Input 
                                    className="form-check-input" 
                                    type="radio" 
                                    id={`radio-satuan-kecil`}   
                                    checked={vProduk.values.checkedharga === "0"}
                                    onClick={e => { 
                                        vProduk.setFieldValue("checkedharga", "0")
                                    }}/>
                                <Label className="form-check-label ms-2" 
                                    htmlFor={`radio-satuan-kecil`} 
                                    style={{ color: "black" }} >
                                    Harga satuan kecil
                                </Label>
                            </div>
                            <Input 
                                id={`hargasatuankecil`}
                                name={`hargasatuankecil`}
                                type="text"
                                value={vProduk.values.hargasatuankecil} 
                                disabled={vProduk.values.checkedharga !== "0"}
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.hargasatuankecil
                                    )
                                    vProduk.setFieldValue('hargasatuankecil', newVal)
                                }}
                                invalid={vProduk.touched.hargasatuankecil && !!vProduk.errors.hargasatuankecil}
                                />
                            {vProduk.touched.hargasatuankecil 
                                && !!vProduk.errors.hargasatuankecil && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.hargasatuankecil}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={6}>
                            <div className="d-flex flex-row mt-2 form-label">
                                <Input 
                                    className="form-check-input" 
                                    type="radio" 
                                    id={`radio-satuan-terima`}   
                                    checked={vProduk.values.checkedharga === "1"}
                                    onClick={e => { 
                                        vProduk.setFieldValue("checkedharga", "1")
                                    }}/>
                                <Label className="form-check-label ms-2" 
                                    htmlFor={`radio-satuan-terima`} 
                                    style={{ color: "black" }} >
                                    Harga satuan terima
                                </Label>
                            </div>
                            <Input 
                                id={`hargasatuanterima`}
                                name={`hargasatuanterima`}
                                type="text"
                                value={vProduk.values.hargasatuanterima} 
                                disabled={vProduk.values.checkedharga !== "1"}
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.hargasatuanterima
                                    )
                                    vProduk.setFieldValue('hargasatuanterima', newVal)
                                }}
                                invalid={
                                    vProduk.touched.hargasatuanterima 
                                        && !!vProduk.errors.hargasatuanterima}
                                />
                            {vProduk.touched.hargasatuanterima 
                                && !!vProduk.errors.hargasatuanterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.hargasatuanterima}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Row>
                        <Col lg={6}>
                            <div className="d-flex flex-row mt-2 form-label">
                                <Input 
                                    className="form-check-input" 
                                    type="radio" 
                                    id={`radio-satuan-terima`}   
                                    checked={vProduk.values.checkeddiskon === "0"}
                                    onClick={e => { 
                                        vProduk.setFieldValue("checkeddiskon", "0")
                                    }}/>
                                <Label className="form-check-label ms-2" 
                                    htmlFor={`radio-diskon-persen`} 
                                    style={{ color: "black" }} >
                                    Diskon (%)
                                </Label>
                            </div>
                            <Input 
                                id={`diskonpersen`}
                                name={`diskonpersen`}
                                type="text"
                                value={vProduk.values.diskonpersen}
                                disabled={vProduk.values.checkeddiskon !== "0"} 
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.diskonpersen
                                    )
                                    vProduk.setFieldValue("diskonpersen", newVal);
                                }}
                                invalid={vProduk.touched.diskonpersen && !!vProduk.errors.diskonpersen}
                                />
                            {vProduk.touched.diskonpersen 
                                && !!vProduk.errors.diskonpersen && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.diskonpersen}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={6}>
                            <div className="d-flex flex-row mt-2 form-label">
                                <Input 
                                    className="form-check-input" 
                                    type="radio" 
                                    id={`radio-diskon-rupiah`}   
                                    checked={vProduk.values.checkeddiskon === "1"}
                                    onClick={e => { 
                                        vProduk.setFieldValue("checkeddiskon", "1")
                                    }}/>
                                <Label className="form-check-label ms-2" 
                                    htmlFor={`radio-diskon-rupiah`} 
                                    style={{ color: "black" }} >
                                    Diskon (Rp)
                                </Label>
                            </div>
                            <Input 
                                id={`diskonrupiah`}
                                name={`diskonrupiah`}
                                type="text"
                                value={vProduk.values.diskonrupiah} 
                                disabled={vProduk.values.checkeddiskon !== "1"}
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.diskonpersen
                                    )
                                    vProduk.setFieldValue("diskonrupiah", newVal);
                                }}
                                invalid={vProduk.touched.diskonrupiah 
                                    && !!vProduk.errors.diskonrupiah}
                                />
                            {vProduk.touched.diskonrupiah 
                                && !!vProduk.errors.diskonrupiah && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.diskonrupiah }
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Row>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`ppnpersenproduk`}
                                className="form-label mt-2">
                                PPn (%)
                            </Label>
                            <Input 
                                id={`ppnpersenproduk`}
                                name={`ppnpersenproduk`}
                                type="text"
                                value={vProduk.values.ppnpersenproduk} 
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.ppnpersenproduk
                                    )
                                    vProduk.setFieldValue("ppnpersenproduk", newVal);
                                }}
                                invalid={vProduk.touched.ppnpersenproduk 
                                    && !!vProduk.errors.ppnpersenproduk}
                                />
                            {vProduk.touched.ppnpersenproduk 
                                && !!vProduk.errors.ppnpersenproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.ppnpersenproduk}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`ppnrupiahproduk`}
                                className="form-label mt-2">
                                PPn (Rp)
                            </Label>
                            <Input 
                                id={`ppnrupiahproduk`}
                                name={`ppnrupiahproduk`}
                                type="text"
                                value={vProduk.values.ppnrupiahproduk} 
                                disabled
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.ppnrupiahproduk
                                    )
                                    vProduk.setFieldValue("ppnrupiahproduk", newVal);
                                }}
                                invalid={vProduk.touched.ppnrupiahproduk 
                                    && !!vProduk.errors.ppnrupiahproduk}
                                />
                            {vProduk.touched.ppnrupiahproduk 
                                && !!vProduk.errors.ppnrupiahproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.ppnrupiahproduk }
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col lg={4}>
                    <Row>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggaled`}
                                className="form-label mt-2">
                                E.D  
                            </Label>
                            <Flatpickr
                                className="form-control"
                                id="tanggaled"
                                options={{
                                    dateFormat: "Y-m-d",
                                    defaultDate: "today"
                                }}
                                onChange={([newDate]) => {
                                    vProduk.setFieldValue("tanggaled", newDate.toISOString());
                                }}
                            />
                            {
                                vProduk.touched.tanggaled 
                                    && !!vProduk.errors.tanggaled && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vProduk.errors.tanggaled}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`nobatch`}
                                className="form-label mt-2">
                                No Batch
                            </Label>
                            <Input 
                                id={`nobatch`}
                                name={`nobatch`}
                                type="text"
                                value={vProduk.values.nobatch} 
                                onChange={vProduk.handleChange}
                                invalid={vProduk.touched.nobatch 
                                    && !!vProduk.errors.nobatch}
                                />
                            {vProduk.touched.nobatch 
                                && !!vProduk.errors.nobatch && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.nobatch }
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Row>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`subtotalproduk`}
                                className="form-label mt-2">
                                Subtotal
                            </Label>
                            <Input 
                                id={`subtotalproduk`}
                                name={`subtotalproduk`}
                                type="text"
                                value={vProduk.values.subtotalproduk} 
                                disabled
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.subtotalproduk
                                    )
                                    vProduk.setFieldValue("subtotalproduk", newVal);
                                }}
                                invalid={vProduk.touched.subtotalproduk 
                                    && !!vProduk.errors.subtotalproduk}
                                />
                            {vProduk.touched.subtotalproduk 
                                && !!vProduk.errors.subtotalproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.subtotalproduk }
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`totalproduk`}
                                className="form-label mt-2">
                                Total
                            </Label>
                            <Input 
                                id={`totalproduk`}
                                name={`totalproduk`}
                                type="text"
                                value={vProduk.values.totalproduk} 
                                disabled
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        vProduk.values.totalproduk
                                    )
                                    vProduk.setFieldValue("totalproduk", newVal);
                                }}
                                invalid={vProduk.touched.totalproduk 
                                    && !!vProduk.errors.totalproduk}
                                />
                            {vProduk.touched.totalproduk 
                                && !!vProduk.errors.totalproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vProduk.errors.totalproduk }
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        
                    </Row>
                </Col>
                <Col lg={4}
                    className="d-flex 
                    justify-content-between align-items-end">
                    <Button 
                        type="submit" 
                        color="info" 
                        placement="top" 
                        id="tooltipTop" >
                        Tambah
                    </Button>
                    <Button
                        type="button"
                        className="btn"
                        color="warning">
                        Batal
                    </Button>
                    <Button
                        type="button"
                        className="btn"
                        color="danger">
                        Hapus
                    </Button>
                </Col>
            </Row>
        </Card>
    )

    const ListDetail = (
        <Card className="p-5">
            <Row className="mb-5">
                <DataTable
                    fixedHeader
                    columns={[]}
                    pagination
                    data={[]}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                    noDataComponent={
                        <div 
                            className="border-bottom w-100 text-center">
                            Belum ada data produk
                        </div>}
                    />
            </Row>
            <Row>
                <Col lg={7}
                    className="d-flex justify-content-around align-items-end">
                    <Button 
                        type="submit" 
                        color="info" 
                        placement="top" 
                        >
                        Tambah
                    </Button>
                    <Button
                        type="button"
                        className="btn"
                        color="danger">
                        Batal
                    </Button>
                </Col>
                <Col lg={5}>
                    <Row className="mb-2">
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`subtotal`}
                                className="form-label mt-2">
                                Subtotal
                            </Label>
                        </Col>
                        <Col lg={6}>
                            <Input 
                                id={`subtotal`}
                                name={`subtotal`}
                                type="text"
                                disabled
                                value={validation.values.subtotal} 
                                onChange={validation.handleChange}
                                invalid={validation.touched.subtotal 
                                    && !!validation.errors.subtotal}
                                />
                            {
                                validation.touched.subtotal 
                                    && !!validation.errors.subtotal && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.subtotal}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`ppnrupiah`}
                                className="form-label mt-2">
                                PPn
                            </Label>
                        </Col>
                        <Col lg={6}>
                            <Input 
                                id={`ppnrupiah`}
                                name={`ppnrupiah`}
                                type="text"
                                disabled
                                value={validation.values.ppnrupiah} 
                                invalid={validation.touched.ppnrupiah 
                                    && !!validation.errors.ppnrupiah}
                                />
                            {
                                validation.touched.ppnrupiah 
                                    && !!validation.errors.ppnrupiah && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.ppnrupiah}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`diskonrupiah`}
                                className="form-label mt-2">
                                Diskon
                            </Label>
                        </Col>
                        <Col lg={6}>
                            <Input 
                                id={`diskonrupiah`}
                                name={`diskonrupiah`}
                                type="text"
                                disabled
                                value={validation.values.diskonrupiah} 
                                invalid={validation.touched.diskonrupiah 
                                    && !!validation.errors.diskonrupiah}
                                />
                            {
                                validation.touched.diskonrupiah 
                                    && !!validation.errors.diskonrupiah && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.diskonrupiah}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`total`}
                                className="form-label mt-2">
                                Total Tagihan
                            </Label>
                        </Col>
                        <Col lg={6}>
                            <Input 
                                id={`total`}
                                name={`total`}
                                type="text"
                                disabled
                                value={validation.values.total} 
                                invalid={validation.touched.total 
                                    && !!validation.errors.total}
                                />
                            {
                                validation.touched.total 
                                    && !!validation.errors.total && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.total}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
    
    return (
        <div className="page-content page-penerimaan-barang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Penerimaan Produk" pageTitle="Gudang" />
                {InputUmumTerima}
                {InputProdukDetail}
                {ListDetail}
            </Container>
        </div>
    )
}


const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#B57602'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },

    }
}


export default PenerimaanProduk;