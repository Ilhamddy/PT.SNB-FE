import { useState, useEffect, useRef, useCallback } from "react";
import { Button, 
    Card, 
    CardBody, 
    Col, 
    Container, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    Form, 
    FormFeedback, 
    Input, 
    Label, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Flatpickr from "react-flatpickr";
import { onChangeStrNbr, strToNumber } from "../../utils/format";
import { comboPenerimaanBarangGet } from "../../store/master/action";
import { kemasanFromProdukGet, penerimaanSaveOrUpdate, penerimaanQueryGet } from "../../store/gudang/action";
import LoadingTable from "../../Components/Table/LoadingTable";
import NoDataTable from "../../Components/Table/NoDataTable";

const PenerimaanProduk = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refSatuanTerima = useRef(null);
    const {norecpenerimaan} = useParams();

    const [dateNow] = useState(() => (new Date()).toISOString())

    const {
        supplier, 
        produk,
        satuanProduk,
        kemasanProduk,
        asalProduk,
        unit,
        penerimaanQuery
    } = useSelector((state) => ({
        supplier: state.Master.comboPenerimaanBarangGet?.data?.supplier || [],
        produk: state.Master.comboPenerimaanBarangGet?.data?.produk || [],
        satuanProduk: state.Master.comboPenerimaanBarangGet?.data?.satuanproduk || [],
        kemasanProduk: state.Gudang.kemasanFromProdukGet?.data?.satuan || [],
        asalProduk: state.Master.comboPenerimaanBarangGet?.data?.asalproduk || [],
        unit: state.Master.comboPenerimaanBarangGet?.data?.unit || [],
        penerimaanQuery: state.Gudang.penerimaanQueryGet?.data || null,
    }))

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecpenerimaan: "",
            penerimaan: {
                nomorterima: "",
                tanggalterima: dateNow,
                namasupplier: "",
                nomorpo: "",
                tanggalpesan: dateNow,
                unitpesan: "",
                tanggaljatuhtempo: dateNow,
                sumberdana: "",
                keterangan: "",
                subtotal: "",
                ppnrupiah: "",
                diskonrupiah: "",
                total: "",
            },
            detail: []
        },
        validationSchema: Yup.object({
            penerimaan: Yup.object().shape({
                nomorterima: Yup.string().required("No Terima harus diisi"),
                tanggalterima: Yup.string().required("Tanggal Terima harus diisi"),
                namasupplier: Yup.string().required("Nama Supplier harus diisi"),
                nomorpo: Yup.string().required("No PO harus diisi"),
                tanggalpesan: Yup.string().required("Tanggal Pesan harus diisi"),
                unitpesan: Yup.string().required("Unit Pesan harus diisi"),
                tanggaljatuhtempo: Yup.string().required("Tanggal Jatuh Tempo harus diisi"),
                sumberdana: Yup.string().required("Sumber Dana harus diisi"),
                keterangan: Yup.string().required("Keterangan harus diisi"),
            }),
            detail: Yup.array()
        }),
        onSubmit: (values) => {
            /**
             * @type {typeof values}
             */
            const newVal = JSON.parse(JSON.stringify(values))
            newVal.detail = newVal.detail.map((valDetail) => {
                const newValDetail = {...valDetail}
                newValDetail.subtotalproduk = strToNumber(newValDetail.subtotalproduk)
                newValDetail.totalproduk = strToNumber(newValDetail.totalproduk)
                newValDetail.diskonrupiah = strToNumber(newValDetail.diskonrupiah)
                newValDetail.ppnrupiahproduk = strToNumber(newValDetail.ppnrupiahproduk)
                newValDetail.hargasatuankecil = strToNumber(newValDetail.hargasatuankecil)
                newValDetail.hargasatuanterima = strToNumber(newValDetail.hargasatuanterima)
                newValDetail.diskonpersen = strToNumber(newValDetail.diskonpersen)
                newValDetail.ppnpersenproduk = strToNumber(newValDetail.ppnpersenproduk)
                newValDetail.konversisatuan = strToNumber(newValDetail.konversisatuan)
                newValDetail.jumlahterima = strToNumber(newValDetail.jumlahterima)
                return newValDetail
            })


            newVal.penerimaan.norecpenerimaan = norecpenerimaan || ""
            newVal.penerimaan.subtotal = strToNumber(newVal.penerimaan.subtotal)
            newVal.penerimaan.total = strToNumber(newVal.penerimaan.total)
            newVal.penerimaan.diskonrupiah = strToNumber(newVal.penerimaan.diskonrupiah)
            newVal.penerimaan.ppnrupiah = strToNumber(newVal.penerimaan.ppnrupiah)
            dispatch(penerimaanSaveOrUpdate(newVal, (newNorec) => {
                navigate(`/farmasi/gudang/penerimaan-produk/${newNorec}`)
                dispatch(penerimaanQueryGet({norecpenerimaan: norecpenerimaan}))
            }))
        }
    })

    const vDetail = useFormik({
        enableReinitialize: true,
        initialValues: {
            indexDetail: "",
            norecdetailpenerimaan: "",
            produk: {
                idproduk: "",
                namaproduk: "",
                satuanjual: "",
                namasatuanjual: "",
            },
            satuanterima: "",
            namasatuanterima: "",
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
            tanggaled: dateNow,
            nobatch: "",
            subtotalproduk: "",
            totalproduk: "",
        },
        validationSchema: Yup.object({
            produk: Yup.object().shape({
                idproduk: Yup.string().required("Produk harus diisi"),
                satuanjual: Yup.string().required("Satuan jual harus diisi"),
            }),
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
        onSubmit: (values, {resetForm}) => {
            const newDetailValues = [...validation.values.detail]
            const newValues = {...values}
            const findSameProduk = newDetailValues.find(
                (val) => val.produk.idproduk === newValues.produk.idproduk
                    && val.nobatch === newValues.nobatch
            )
            const existSameProduk = !!findSameProduk
            const isEdit = newValues.indexDetail !== ""
            if(existSameProduk){
                toast.error("Produk dengan batch sama sudah ada")
                return
            }
            if(isEdit){// edit
                newDetailValues[values.indexDetail] = newValues
            }else{
                newValues.indexDetail = newDetailValues.length
                newDetailValues.push(newValues);
            }
            resetForm();
            validation.setFieldValue("detail", newDetailValues)
        }
    })

    const detail = vDetail.values
    const detailTouched = vDetail.touched
    const detailErr = vDetail.errors

    const penerimaan = validation.values.penerimaan
    const penerimaanTouched = validation.touched.penerimaan
    const penerimaanErr = validation.errors.penerimaan


    const handleChangePenerimaan = useCallback((field, newVal) => {
        const setFF = validation.setFieldValue
        setFF("penerimaan", {
            ...penerimaan,
            [field]: newVal
        })
    }, [validation.setFieldValue, penerimaan])

    const handleChangeDetail = useCallback((field, newVal) => {
        const setFF = vDetail.setFieldValue
        setFF(field, newVal)
    }, [vDetail.setFieldValue])


    const handleChangeJumlahTerima = (e) => {
        const newVal = onChangeStrNbr(
            e.target.value, 
            detail.jumlahterima
        )
        handleChangeDetail('jumlahterima', newVal)
    }

    // Perhitungan satuan jumlah terima, harga, Diskon, dan ppn
    // saat jumlah, terima, harga sudah diinput akan otomatis menghitung total harga
    useEffect(() => {
        const setFF = vDetail.setFieldValue
        const calcualteSatuanTerima = () => {
            let newValTerima
            if(detail.checkedharga === "0"){
                const hargaSatuan = detail.hargasatuankecil
                newValTerima = 
                    strToNumber(hargaSatuan) *
                    detail.konversisatuan
                const newValTerimaStr = onChangeStrNbr(
                    newValTerima,
                    detail.hargasatuankecil
                )
                setFF(
                    "hargasatuanterima", 
                    newValTerimaStr
                )
            }else{
                newValTerima 
                    = strToNumber(detail.hargasatuanterima)
                let newValKecil = 
                    newValTerima /
                    (detail.konversisatuan || 1)
                const newValKecilStr = onChangeStrNbr(
                    newValKecil,
                    detail.hargasatuankecil
                )
                setFF(
                    "hargasatuankecil", 
                    newValKecilStr
                )
                let newValSubtotal =
                    strToNumber(newValKecilStr) *
                    (detail.jumlahterima || 0)
                newValSubtotal = onChangeStrNbr(
                    newValSubtotal,
                    detail.subtotalproduk
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
                (detail.jumlahterima || 0)
            const newValSubtotalStr = onChangeStrNbr(
                newValSubtotal,
                detail.subtotalproduk
            )
            setFF(
                "subtotalproduk",
                newValSubtotalStr
            )
            return newValSubtotal
        }

        const calculateDiskon = (newValSubtotal) => {
            let newValDiskon
            if(detail.checkeddiskon === "0"){
                const diskonPersen = detail.diskonpersen
                newValDiskon = 
                    strToNumber(diskonPersen) *
                    newValSubtotal /
                    100
                const newValDiskonStr = onChangeStrNbr(
                    newValDiskon,
                    detail.diskonpersen
                )
                setFF(
                    "diskonrupiah", 
                    newValDiskonStr
                )
            }else{
                newValDiskon 
                    = strToNumber(detail.diskonrupiah);
            }
            return newValDiskon
        }
        const calculatePpn = (newValSubtotal, newValDiskon) => {
            const ppnPersen = detail.ppnpersenproduk
            let newValPpn =
                newValSubtotal - newValDiskon
            newValPpn = newValPpn *
                strToNumber(ppnPersen)/
                100
            const newValPpnStr = onChangeStrNbr(
                newValPpn,
                detail.ppnrupiahproduk
            )
            setFF(
                "ppnrupiahproduk",
                newValPpnStr
            )
            return newValPpn
        }

        const calculateTotal = (newValSubtotal, newValDiskon, newValPpn) => {
            let newValTotal =
                newValSubtotal -
                newValDiskon +
                newValPpn
            newValTotal = onChangeStrNbr(
                newValTotal,
                detail.totalproduk
            )
            setFF(
                "totalproduk",
                newValTotal
            )
            return newValTotal
        }

        const newValTerima = calcualteSatuanTerima()
        const newValSubtotal = calculateSubtotal(newValTerima)
        const newValDiskon = calculateDiskon(newValSubtotal)
        const newValPpn = calculatePpn(newValSubtotal, newValDiskon)
        calculateTotal(newValSubtotal, newValDiskon, newValPpn)
        
    }, [
        detail.hargasatuankecil, 
        detail.hargasatuanterima, 
        detail.checkedharga,
        detail.konversisatuan,
        detail.jumlahterima,
        detail.subtotalproduk,
        detail.diskonrupiah,
        detail.totalproduk,
        detail.checkeddiskon,
        detail.diskonpersen,
        detail.ppnpersenproduk,
        detail.ppnrupiahproduk,
        vDetail.setFieldValue
    ])

    let subtotal = validation.values.detail.reduce((prev, curr) =>
        prev + strToNumber(curr.subtotalproduk)
    , 0)
    subtotal = "Rp" + subtotal.toLocaleString("id-ID", {maximumFractionDigits:5})

    let ppn = validation.values.detail.reduce((prev, curr) =>
        prev + strToNumber(curr.ppnrupiahproduk)
    , 0)
    ppn = "Rp" + ppn.toLocaleString("id-ID", {maximumFractionDigits: 5})

    let diskon = validation.values.detail.reduce((prev, curr) =>
        prev + strToNumber(curr.diskonrupiah)
    , 0)
    diskon = "Rp" + diskon.toLocaleString("id-ID", {maximumFractionDigits: 5})

    let total = validation.values.detail.reduce((prev, curr) => 
        prev + strToNumber(curr.totalproduk)
    , 0)
    total = "Rp" + total.toLocaleString("id-ID", {maximumFractionDigits: 5})


    useEffect(() => {
        const idProduk = detail.produk.idproduk
        const setFF = vDetail.setFieldValue
        const onGetSatuanSuccess = (data) => {
            // reset value jika ada satuan baru
            if(Array.isArray(data) && data.length === 0) {
                refSatuanTerima.current?.clearValue();
                return
            }
            const newData = [...data.satuan]
            const dataSatuan = newData.find((val) => val.value === detail.satuanterima)
            if(!dataSatuan) {
                refSatuanTerima.current?.clearValue();
                return
            }
            setFF("satuanterima", dataSatuan?.value || "")
            setFF("namasatuanterima", dataSatuan?.label || "")
            setFF("konversisatuan", dataSatuan?.nilaikonversi || "")
        }
        idProduk && 
            dispatch(
                kemasanFromProdukGet(
                    { idproduk: idProduk }, 
                    onGetSatuanSuccess
                ))
    }, [
        dispatch, 
        detail.produk.idproduk,
        detail.satuanterima,
        vDetail.setFieldValue
    ])

    useEffect(() => {
        dispatch(comboPenerimaanBarangGet())
    }, [dispatch])

    useEffect(() => {
        const setFF = validation.setFieldValue
        norecpenerimaan && 
            dispatch(penerimaanQueryGet({norecpenerimaan: norecpenerimaan}))

        setFF("norecpenerimaan", norecpenerimaan)
    }, [dispatch, norecpenerimaan, validation.setFieldValue])

    useEffect(() => {
        console.log(vDetail.values.satuanterima)
    }, [vDetail.values.satuanterima ])

    useEffect(() => {
        const setFF = validation.setFieldValue
        if(penerimaanQuery.detailPenerimaan){
            const detailPenerimaan = penerimaanQuery.detailPenerimaan.map((values, index) => ({
                ...values,
                indexDetail: index,
            }))
            setFF("detail", detailPenerimaan || [])
        }
        if(penerimaanQuery.penerimaan){
            setFF("penerimaan", penerimaanQuery.penerimaan)
        }
        if(!norecpenerimaan){
            setFF("detail", [])
            setFF("penerimaan", validation.initialValues.penerimaan)
        }
    }, [penerimaanQuery, 
        validation.setFieldValue, 
        norecpenerimaan, 
        validation.initialValues.penerimaan
    ])



    /**
     * @type {import("react-data-table-component").TableColumn<typeof vDetail.values>[]}
     */
    const columnsDetail = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            cell: (row) => (
                <div className="hstack gap-3 flex-wrap">
                    <UncontrolledTooltip 
                        placement="top" 
                        target="edit-produk" > 
                        Detail Produk 
                    </UncontrolledTooltip>
                    <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle 
                            className="btn btn-soft-secondary btn-sm" 
                            itemType="button"
                            id="edit-produk">
                            <i className="ri-apps-2-line"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem onClick={() => {
                                console.log(row)
                                vDetail.setValues({
                                    ...row,
                                })
                                }}>
                                <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                </i>
                                Edit Produk
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>)
                ,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama produk</span>,
            sortable: true,
            selector: row => row.produk.namaproduk,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Qty Penerimaan</span>,
            selector: row => row.jumlahterima,
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Harga satuan kecil</span>,
            sortable: true,
            selector: row => `Rp${row.hargasatuankecil?.toLocaleString("id-ID")}`,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Diskon</span>,
            sortable: true,
            selector: row => `Rp${row.diskonrupiah}`,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>PPN</span>,
            sortable: true,
            selector: row => `Rp${row.ppnrupiahproduk}`,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Total</span>,
            sortable: true,
            selector: row => `Rp${row.totalproduk}`,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>E.D</span>,
            sortable: true,
            selector: row => `${row.tanggaled}`,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Batch</span>,
            sortable: true,
            selector: row => row.nobatch,
            width: "100px"
        },
    ];


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
                        value={penerimaan.nomorterima} 
                        disabled={!!norecpenerimaan}
                        onChange={(e) => {
                            handleChangePenerimaan("nomorterima", e.target.value)
                        }}
                        invalid={penerimaanTouched?.nomorterima 
                            && !!penerimaanErr?.nomorterima}
                        />
                    {penerimaanTouched?.nomorterima 
                        && !!penerimaanErr?.nomorterima && (
                        <FormFeedback type="invalid" >
                            <div>
                                {penerimaanErr?.nomorterima}
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
                        // value={penerimaan.tglregistrasi || ""}
                        className="form-control"
                        id="tanggalterima"
                        options={{
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                        }}
                        onChange={([newDate]) => {
                            handleChangePenerimaan("tanggalterima", newDate.toISOString());
                        }}
                    />
                    {
                        penerimaanTouched?.tanggalterima 
                            && !!penerimaanErr?.tanggalterima && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {penerimaanErr?.tanggalterima}
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
                            handleChangePenerimaan('namasupplier', e?.value || "")
                        }}
                        value={penerimaan.namasupplier}
                        className={`input ${penerimaanErr?.namasupplier ? "is-invalid" : ""}`}
                        />
                    {penerimaanTouched?.namasupplier 
                        && penerimaanErr?.namasupplier ? (
                            <FormFeedback type="invalid" >
                                <div>
                                    {penerimaanErr?.namasupplier}
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
                        value={penerimaan.nomorpo} 
                        onChange={(e) => {
                            handleChangePenerimaan("nomorpo", e.target.value)
                        }}
                        invalid={penerimaanTouched?.nomorpo && !!penerimaanErr?.nomorpo}
                        />
                    {penerimaanTouched?.nomorpo 
                        && !!penerimaanErr?.nomorpo ? (
                        <FormFeedback type="invalid" >
                            <div>
                                {penerimaanErr?.nomorpo}
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
                        // value={penerimaan.tglregistrasi || ""}
                        className="form-control"
                        id="tanggalpesan"
                        options={{
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                        }}
                        onChange={([newDate]) => {
                            handleChangePenerimaan("tanggalpesan", newDate.toISOString());
                        }}
                    />
                    {
                        penerimaanTouched?.tanggalpesan 
                            && !!penerimaanErr?.tanggalpesan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {penerimaanErr?.tanggalpesan}
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
                        options={unit}
                        onChange={(e) => {
                            handleChangePenerimaan('unitpesan', e?.value || "")
                        }}
                        value={penerimaan.unitpesan}
                        className={`input ${penerimaanErr?.unitpesan ? "is-invalid" : ""}`}
                        />
                    {penerimaanTouched?.unitpesan 
                        && !!penerimaanErr?.unitpesan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {penerimaanErr?.unitpesan}
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
                        className="form-label">
                        Tgl Jatuh tempo
                    </Label>
                </Col>
                <Col lg={3}>
                    <Flatpickr
                        // value={penerimaan.tglregistrasi || ""}
                        className="form-control"
                        id="tanggaljatuhtempo"
                        options={{
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                        }}
                        onChange={([newDate]) => {
                            handleChangePenerimaan("tanggaljatuhtempo", newDate.toISOString());
                        }}
                    />
                    {
                        penerimaanTouched?.tanggaljatuhtempo 
                            && !!penerimaanErr?.tanggaljatuhtempo && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {penerimaanErr?.tanggaljatuhtempo}
                                </div>
                            </FormFeedback>
                        )
                    }
                </Col>
                <Col lg={1}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`sumberdana`}
                        className="form-label">
                        Sumber Dana
                    </Label>
                </Col>
                <Col lg={3}>
                   <CustomSelect
                        id="sumberdana"
                        name="sumberdana"
                        options={asalProduk}
                        onChange={(e) => {
                            handleChangePenerimaan('sumberdana', e?.value || "")
                        }}
                        value={penerimaan.sumberdana}
                        className={`input ${penerimaanErr?.sumberdana ? "is-invalid" : ""}`}
                        />
                    {penerimaanTouched?.sumberdana 
                        && !!penerimaanErr?.sumberdana && (
                        <FormFeedback type="invalid" >
                            <div>
                                {penerimaanErr?.sumberdana}
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
                        value={penerimaan.keterangan} 
                        onChange={(e) => {
                            handleChangePenerimaan("keterangan", e.target.value)
                        }}
                        invalid={penerimaanTouched?.keterangan 
                            && !!penerimaanErr?.keterangan}
                        />
                    {penerimaanTouched?.keterangan 
                        && !!penerimaanErr?.keterangan && (
                        <FormFeedback type="invalid" >
                            <div>
                                {penerimaanErr?.keterangan}
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
                            handleChangeDetail('produk', {
                                idproduk: e?.value || "",
                                namaproduk: e?.label || "",
                                satuanjual: e?.valuesatuanstandar || "",
                            })
                        }}
                        value={detail.produk.idproduk}
                        className={`input ${detailErr?.produk ? "is-invalid" : ""}`}
                        />
                    {detailTouched?.produk 
                        && !!detailErr?.produk && (
                        <FormFeedback type="invalid" >
                            <div>
                                {detailErr?.produk.idproduk}
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
                                value={detail.produk?.satuanjual}
                                isDisabled
                                className={`input 
                                    ${detailErr?.produk?.satuanjual 
                                        ? "is-invalid" 
                                        : ""
                                    }`}
                                />
                            {detailTouched?.produk?.satuanjual
                                && !!detailErr?.produk?.satuanjual && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.produk?.satuanjual}
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
                                    vDetail.setFieldValue("satuanterima", e?.value || "")
                                    vDetail.setFieldValue("namasatuanterima", e?.label || "")
                                    vDetail.setFieldValue("konversisatuan", e?.nilaikonversi || "")
                                }}
                                value={detail.satuanterima}
                                className={`input ${detailErr?.satuanterima ? "is-invalid" : ""}`}
                                ref={refSatuanTerima}
                                />
                            {detailTouched?.satuanterima 
                                && !!detailErr?.satuanterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.satuanterima}
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
                                value={detail.konversisatuan} 
                                disabled
                                invalid={detailTouched?.konversisatuan 
                                    && !!detailErr?.konversisatuan}
                                />
                            {detailTouched?.konversisatuan 
                                && !!detailErr?.konversisatuan && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.konversisatuan}
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
                                value={detail.jumlahterima} 
                                onChange={handleChangeJumlahTerima}
                                invalid={detailTouched?.jumlahterima 
                                    && !!detailErr?.jumlahterima}
                                />
                            {detailTouched?.jumlahterima 
                                && !!detailErr?.jumlahterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.jumlahterima}
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
                                    checked={detail.checkedharga === "0"}
                                    onClick={e => { 
                                        handleChangeDetail("checkedharga", "0")
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
                                value={detail.hargasatuankecil} 
                                disabled={detail.checkedharga !== "0"}
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.hargasatuankecil
                                    )
                                    handleChangeDetail('hargasatuankecil', newVal)
                                }}
                                invalid={detailTouched?.hargasatuankecil && !!detailErr?.hargasatuankecil}
                                />
                            {detailTouched?.hargasatuankecil 
                                && !!detailErr?.hargasatuankecil && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.hargasatuankecil}
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
                                    checked={detail.checkedharga === "1"}
                                    onClick={e => { 
                                        handleChangeDetail("checkedharga", "1")
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
                                value={detail.hargasatuanterima} 
                                disabled={detail.checkedharga !== "1"}
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.hargasatuanterima
                                    )
                                    handleChangeDetail('hargasatuanterima', newVal)
                                }}
                                invalid={
                                    detailTouched?.hargasatuanterima 
                                        && !!detailErr?.hargasatuanterima}
                                />
                            {detailTouched?.hargasatuanterima 
                                && !!detailErr?.hargasatuanterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.hargasatuanterima}
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
                                    id={`radio-diskon-persen`}   
                                    checked={detail.checkeddiskon === "0"}
                                    onClick={e => { 
                                        handleChangeDetail("checkeddiskon", "0")
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
                                value={detail.diskonpersen}
                                disabled={detail.checkeddiskon !== "0"} 
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.diskonpersen
                                    )
                                    handleChangeDetail("diskonpersen", newVal);
                                }}
                                invalid={detailTouched?.diskonpersen && !!detailErr?.diskonpersen}
                                />
                            {detailTouched?.diskonpersen 
                                && !!detailErr?.diskonpersen && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.diskonpersen}
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
                                    checked={detail.checkeddiskon === "1"}
                                    onClick={e => { 
                                        handleChangeDetail("checkeddiskon", "1")
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
                                value={detail.diskonrupiah} 
                                disabled={detail.checkeddiskon !== "1"}
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.diskonpersen
                                    )
                                    handleChangeDetail("diskonrupiah", newVal);
                                }}
                                invalid={detailTouched?.diskonrupiah 
                                    && !!detailErr?.diskonrupiah}
                                />
                            {detailTouched?.diskonrupiah 
                                && !!detailErr?.diskonrupiah && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.diskonrupiah }
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
                                value={detail.ppnpersenproduk} 
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.ppnpersenproduk
                                    )
                                    handleChangeDetail("ppnpersenproduk", newVal);
                                }}
                                invalid={detailTouched?.ppnpersenproduk 
                                    && !!detailErr?.ppnpersenproduk}
                                />
                            {detailTouched?.ppnpersenproduk 
                                && !!detailErr?.ppnpersenproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.ppnpersenproduk}
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
                                value={detail.ppnrupiahproduk} 
                                disabled
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.ppnrupiahproduk
                                    )
                                    handleChangeDetail("ppnrupiahproduk", newVal);
                                }}
                                invalid={detailTouched?.ppnrupiahproduk 
                                    && !!detailErr?.ppnrupiahproduk}
                                />
                            {detailTouched?.ppnrupiahproduk 
                                && !!detailErr?.ppnrupiahproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.ppnrupiahproduk }
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
                                    handleChangeDetail("tanggaled", newDate.toISOString());
                                }}
                            />
                            {
                                detailTouched?.tanggaled 
                                    && !!detailErr?.tanggaled && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {detailErr?.tanggaled}
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
                                value={detail.nobatch} 
                                onChange={(e) => {
                                    handleChangeDetail("nobatch", e.target.value);
                                }}
                                invalid={detailTouched?.nobatch 
                                    && !!detailErr?.nobatch}
                                />
                            {detailTouched?.nobatch 
                                && !!detailErr?.nobatch && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.nobatch }
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
                                value={detail.subtotalproduk} 
                                disabled
                                
                                invalid={detailTouched?.subtotalproduk 
                                    && !!detailErr?.subtotalproduk}
                                />
                            {detailTouched?.subtotalproduk 
                                && !!detailErr?.subtotalproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.subtotalproduk }
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
                                value={detail.totalproduk} 
                                disabled
                                onChange={(e) => {
                                    const newVal = onChangeStrNbr(
                                        e.target.value, 
                                        detail.totalproduk
                                    )
                                    handleChangeDetail("totalproduk", newVal);
                                }}
                                invalid={detailTouched?.totalproduk 
                                    && !!detailErr?.totalproduk}
                                />
                            {detailTouched?.totalproduk 
                                && !!detailErr?.totalproduk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {detailErr?.totalproduk }
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
                        type="button" 
                        onClick={() => {
                            vDetail.handleSubmit();
                        }}
                        color="info" 
                        placement="top" 
                        formTarget="form-input-produk-detail"
                        id="tooltipTop" >
                        {!vDetail.values.indexDetail ? "Tambah" : "Edit"}
                    </Button>
                    <Button
                        type="button"
                        className="btn"
                        color="warning"
                        onClick={() => {
                            vDetail.resetForm();
                        }}>
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
                    columns={columnsDetail}
                    pagination
                    data={validation.values.detail || []}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    noDataComponent={<NoDataTable />}
                    />
            </Row>
            <Row>
                <Col lg={7}
                    className="d-flex justify-content-around align-items-end">
                    <Button 
                        type="submit" 
                        color="info" 
                        placement="top" 
                        formTarget="form-input-penerimaan"
                        >
                        {!!norecpenerimaan ? "Edit" : "Simpan"}
                    </Button>
                    <Link to="/farmasi/gudang/penerimaan-produk-list">
                        <Button
                            type="button"
                            className="btn"
                            color="danger">
                            Batal
                        </Button>
                    </Link>
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
                                value={subtotal} 
                                invalid={penerimaanTouched?.subtotal 
                                    && !!penerimaanErr?.subtotal}
                                />
                            {
                                penerimaanTouched?.subtotal 
                                    && !!penerimaanErr?.subtotal && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {penerimaanErr?.subtotal}
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
                                PPN
                            </Label>
                        </Col>
                        <Col lg={6}>
                            <Input 
                                id={`ppnrupiah`}
                                name={`ppnrupiah`}
                                type="text"
                                disabled
                                value={ppn} 
                                invalid={penerimaanTouched?.ppnrupiah 
                                    && !!penerimaanErr?.ppnrupiah}
                                />
                            {
                                penerimaanTouched?.ppnrupiah 
                                    && !!penerimaanErr?.ppnrupiah && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {penerimaanErr?.ppnrupiah}
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
                                value={diskon} 
                                invalid={penerimaanTouched?.diskonrupiah 
                                    && !!penerimaanErr?.diskonrupiah}
                                />
                            {
                                penerimaanTouched?.diskonrupiah 
                                    && !!penerimaanErr?.diskonrupiah && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {penerimaanErr?.diskonrupiah}
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
                                value={total} 
                                invalid={penerimaanTouched?.total 
                                    && !!penerimaanErr?.total}
                                />
                            {
                                penerimaanTouched?.total 
                                    && !!penerimaanErr?.total && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {penerimaanErr?.total}
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
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Submit")
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    id="form-input-penerimaan">
                    {InputUmumTerima}
                    {InputProdukDetail}
                    {ListDetail}
                </Form>
            </Container>
        </div>
    )
}




const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#e67e22',
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