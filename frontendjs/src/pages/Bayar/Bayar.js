import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import { ToastContainer } from "react-toastify";
import { useEffect, useReducer, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button, FormFeedback, Label, CardHeader } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import * as Yup from "yup";
import classnames from "classnames"
import { Link } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import {daftarPasienPulangGet,} from "../../store/daftarPasien/action";
import DataTable from "react-data-table-component";
import { dateISOString, dateTimeISOString, dateTimeLocal, onChangeStrNbr, strNumber } from "../../utils/format";
import Flatpickr from "react-flatpickr";
import { 
    comboAsuransiGet, 
    comboPaymentGet, 
    comboRegistrasiGet,
} from "../../store/master/action";
import { 
    pelayananFromAntreanGet,
    notaVerifCreate,
    pelayananFromVerifGet,
    pelayananFromVerifGetReset,
    buktiBayarCreate
} from "../../store/payment/action";
import CustomSelect from "../Select/Select";
import "./Bayar.scss"
import { useNavigate, useParams } from "react-router-dom";
import { rgxAllNumber, rgxAllPeriods, rgxValidNumber } from "../../utils/regexcommon";
import PrintTemplate from "../Print/PrintTemplate/PrintTemplate";
import "./Bayar.scss"

const dateAwalStart = dateTimeISOString(new Date(new Date() - 1000 * 60 * 60 * 24 * 3));
const dateAwalEnd = dateISOString(new Date())
const date = new Date()


const Bayar = () => {
    const { norecnota } = useParams();
    let {
        dataPasienPlg, 
        comboboxReg,
        listPelayanan,
        norecdp,
        comboboxpayment,
        nota,
        kepesertaan,
        created
    } = useSelector((state) => ({
        dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
        comboboxReg: state.Master.comboRegistrasiGet.data || {},
        listPelayanan: state.Payment.pelayananFromVerifGet.data?.pelayanan || [],
        comboboxpayment: state.Master.comboPaymentGet.data,
        nota: state.Payment.pelayananFromVerifGet.data?.nota || [],
        kepesertaan: state.Payment.pelayananFromVerifGet.data?.kepesertaan || [],
        created: state.Payment.buktiBayarCreate.data || null,
    }))

    const refPrintTransaksi = useRef(null)
    
    const handlePrintBukti = () => {
        refPrintTransaksi.current.handlePrint();
    }

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            totaltagihan: "",
            diskon: 0,
            // non wajib
            deposit: 0,
            nobukti: `B${date.getFullYear().toString().substring(2, 4)}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
            pegawai: "",
            norecnota: "",
            klaim: "",
            norecdp: "",
            pjpasien: "",
            keterangan: "",
            payment: [{
                metodebayar: "",
                nontunai: "",
                pjpasien: "",
                approvalcode: "",
                nominalbayar: "",
                tglbayar: dateAwalStart,
                rekeningrs: ""
            }]
        },
        validationSchema: Yup.object({
            totaltagihan: Yup.string().required("Total Tagihan harus diisi"),
            diskon: Yup.string().required("Diskon harus diisi"),
            payment: Yup.array().of(
                Yup.object().shape({
                    metodebayar: Yup.string().required("Metode Pembayaran harus diisi"),
                    nontunai: Yup.string().when("metodebayar", {
                        is: (val) => val === "2",
                        then: () => Yup.string().required("Metode non tunai harus diisi"),
                    }),
                    nominalbayar: Yup.string().required("Nominal Bayar harus diisi"),
                    tglbayar: Yup.string()
                        .required("Tanggal Bayar harus diisi"),
                    rekeningrs: Yup.string().when("metodebayar", {
                        is: (val) => val === "2",
                        then: () => Yup.string().required("Rekening RS harus diisi"),
                    }),
                    approvalcode: Yup.string().when("metodebayar", {
                        is: (val) => val === "2",
                        then: () => Yup.string().required("Approval Code harus diisi"),
                    }),
                })
            ),
            pjpasien: Yup.string().required("Diterima Dari harus diisi"),
            // non wajib
            deposit: Yup.string().required("Deposit harus diisi"),
            nobukti: Yup.string().required("No Bukti harus diisi"),
            keterangan: Yup.string().required("Keterangan bayar wajib diisi"),
            pegawai: Yup.string().required("Pegawai harus diisi"),
            norecnota: Yup.string().required("No Rekam Medis harus diisi"),
            klaim: Yup.string().required("Klaim harus diisi"),
            norecdp: Yup.string().required("No DP harus diisi"),
        }),
        onSubmit: (values) => {
            let valuesSent = {...values}
            valuesSent.payment = valuesSent.payment.map((payment) => {
                let newPayment = {...payment}
                newPayment.nominalbayar 
                    = Number(newPayment.nominalbayar.replace(rgxAllPeriods, "")) 
                return newPayment
            })
            dispatch(buktiBayarCreate(valuesSent, () => {
                norecnota && dispatch(pelayananFromVerifGet(norecnota))
                handlePrintBukti();
            }))
        }
    })

    const changePayment = (fieldname, index, newvalue) => {
        let newPayments = [...validation.values.payment];
        let newPayment = {...newPayments[index]};
        newPayment[fieldname] = newvalue;
        newPayments[index] = newPayment;
        validation.setFieldValue("payment", newPayments);
    }

    const addPayment = () => {
        let newPayments = [...validation.values.payment];
        newPayments.push({
            metodebayar: "",
            nontunai: "",
            pjpasien: "",
            nominalbayar: "",
            tglbayar: dateAwalStart,
            rekeningrs: "",
            approvalcode: ""
        });
        validation.setFieldValue("payment", newPayments);
    }

    const deleteLastPayment = () => {
        let newPayments = [...validation.values.payment];
        newPayments.pop();
        validation.setFieldValue("payment", newPayments);
    }

    const [dateStart, setDateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
    const [search, setSearch] = useState("");
    const [instalasi, setInstalasi] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleFilter = () => {
        dispatch(daftarPasienPulangGet(dateStart, dateEnd))
    }
    const handleClickCari = () => {
        dispatch(daftarPasienPulangGet({dateStart, dateEnd, instalasi, unit: "", search}))
    }
    const handleToVerif = async (norecpp) => {
        norecpp 
            && navigate(`/payment/verif-tagihan/${norecpp}`)    
    }

    const diskon = listPelayanan.reduce((prev, pel) => prev + (pel.discount || 0), 0)
    let totalTagihan = listPelayanan.reduce((prev, pel) => prev + (pel.total || 0), 0)
    const nominalklaim = kepesertaan.reduce((prev, pel) => prev + (pel.nominalklaim || 0), 0);
    const grandTotal = totalTagihan - diskon - nominalklaim;
    let payment = validation.values.payment
        ?.reduce((prev, pel) => prev + (Number(pel.nominalbayar.replace(rgxAllPeriods, ""))  || 0), 0) || 0;
    let sisaGrandTotal = grandTotal - payment;
    
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Tgl Pelayanan</span>,
            selector: row => dateTimeLocal(new Date(row.tglinput)),
            sortable: true,
            width: "160px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Layanan</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.namaproduk,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Petugas</span>,
            selector: row => row.namapegawai,
            sortable: true,
            width: "120px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "120px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Kelas</span>,
            selector: row => row.namakelas,
            sortable: true,
            width: "110px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Harga</span>,
            selector: row => row.harga,
            sortable: true,
            width: "110px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Qty</span>,
            selector: row => row.qty,
            sortable: true,
            width: "20px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Diskon</span>,
            selector: row => row.discount || 0,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Jasa</span>,
            selector: row => row.jasa || 0,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>C</span>,
            selector: row => `${row.iscito ? "v" : "x"}`,
            sortable: true,
            width: "40px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.total,
            sortable: true,
            width: "140px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>No Verif/NBB</span>,
            selector: row => (`${(row.no_nota ? `${row.no_nota}/\n` : ``) + (row.no_bukti ? `${row.no_bukti}` : ``)}`),
            sortable: true,
            width: "140px",
            wrap: true
        },
    ];

    useEffect(() => {
        dispatch(comboPaymentGet())
    }, [dispatch])

    
    useEffect(() => {
        const setFF = validation.setFieldValue
        grandTotal && setFF("totaltagihan", grandTotal)
        diskon && setFF("diskon", diskon)
        setFF("klaim", nominalklaim || 0)
    }, [dispatch, validation.setFieldValue, grandTotal, diskon, nominalklaim])

    useEffect(() => {
        const setFF = validation.setFieldValue
        nota.namapasien 
            && setFF("pjpasien", nota.namapasien)
        nota.idpegawai 
            && setFF("pegawai", nota.idpegawai)
        nota.norecdp
            && setFF("norecdp", nota.norecdp)
    }, [nota, validation.setFieldValue]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        const setFF = validation.setFieldValue
        norecnota && setFF("norecnota", norecnota)
        norecnota && dispatch(pelayananFromVerifGet(norecnota))
        return () => {
            dispatch(pelayananFromVerifGetReset())
        }
    }, [dispatch, norecnota, validation.setFieldValue])

    const filterRekeningRs = (rekeningRs, nontunaiV) => {
        return rekeningRs?.filter(
            (rekening) => rekening.objectbankfk === nontunaiV
        );
    }

    return(
        <div className="page-content page-bayar">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Pembayaran" pageTitle="Pembayaran" />
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log(validation.errors)
                            validation.handleSubmit();
                            return false;
                        }}
                        className="gy-4"
                        action="#">
                        <Row>
                            <Col lg={7}>
                                <Card className="p-3">
                                    {validation.values.payment.map((itemP, index) => 
                                        <Row key={index} className="mb-5">
                                            <Row className="mb-2">
                                                <Col lg={6}>
                                                    <Label style={{ color: "black" }} htmlFor={`metodebayar${index}`} className="form-label">
                                                        Metode Pembayaran {index + 1}
                                                    </Label>
                                                    <div>
                                                        <CustomSelect
                                                            id={`metodebayar${index}`}
                                                            name={`metodebayar${index}`}
                                                            options={comboboxpayment?.metodeBayar || []}
                                                            onChange={e => 
                                                                changePayment('metodebayar', index, e.value)
                                                            }
                                                            value={itemP.metodebayar || ""}
                                                            className={`input ${validation.errors.payment?.[index]?.metodebayar ? "is-invalid" : ""}`}
                                                        />
                                                        {validation.touched.payment?.[index]?.metodebayar && validation.errors.payment?.[index]?.metodebayar && (
                                                            <FormFeedback type="invalid"><div>{validation.errors.payment?.[index]?.metodebayar}</div></FormFeedback>
                                                        )}
                                                    </div>
                                                </Col>
                                                {itemP.metodebayar === 2 &&
                                                    <Col xxl={6} md={6}>
                                                        <Card>
                                                            <CardHeader>
                                                                Non Tunai
                                                            </CardHeader>
                                                            <CardBody>
                                                                <div className="d-flex flex-column">
                                                                {(comboboxpayment?.nontunai || []).map((data, key) => 
                                                                    <div className="d-flex flex-row" key={key}>
                                                                        <Input 
                                                                            className="form-check-input" 
                                                                            type="radio" 
                                                                            id={`radio-payment-${key}-${index}`}   
                                                                            checked={itemP.nontunai === data.value}
                                                                            readOnly
                                                                            onClick={e => { 
                                                                                changePayment('nontunai', index, data.value)
                                                                            }}/>
                                                                        <Label className="form-check-label ms-2" 
                                                                            htmlFor={`radio-payment-${key}-${index}`} 
                                                                            style={{ color: "black" }} >
                                                                            {data.label}
                                                                        </Label>
                                                                    </div>
                                                                )}
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                }
                                            </Row>
                                                <Row className="mb-2">
                                                {itemP.metodebayar === 2 && 
                                                    <>
                                                        <Label 
                                                            style={{ color: "black" }} 
                                                            htmlFor={`approvalcode${index}`}
                                                            className="form-label">
                                                            Approval Code
                                                        </Label>
                                                        <div>
                                                            <Input 
                                                                id={`approvalcode${index}`}
                                                                name={`approvalcode${index}`}
                                                                type="text"
                                                                value={itemP.approvalcode || ""} 
                                                                onChange={(e) => {
                                                                    rgxAllNumber.test(e.target.value) &&
                                                                        changePayment("approvalcode", index, e.target.value);
                                                                }}
                                                                invalid={validation.touched.payment?.[index]?.approvalcode && !!validation.errors.payment?.[index]?.approvalcode}
                                                                />
                                                            {validation.touched.payment?.[index]?.approvalcode && validation.errors.payment?.[index]?.approvalcode ? (
                                                                <FormFeedback type="invalid" ><div>{validation.errors.payment?.[index]?.approvalcode}</div></FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </>
                                                }
                                                <Label style={{ color: "black" }} 
                                                    htmlFor={`keterangan${index}`}
                                                    className="form-label">
                                                    Nominal bayar
                                                </Label>
                                                <div>
                                                    <Input 
                                                        id={`nominalbayar${index}}`}
                                                        name={`nominalbayar${index}`}
                                                        type="string"
                                                        placeholder="Masukkan nominal bayar"
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            changePayment("nominalbayar",
                                                                index,
                                                                onChangeStrNbr(
                                                                    e.target.value, 
                                                                    itemP.nominalbayar
                                                                ))  
                                                        }}
                                                        invalid={validation.touched.payment?.[index]?.nominalbayar && !!validation.errors.payment?.[index]?.nominalbayar}
                                                        value={itemP.nominalbayar || ""} />
                                                    {validation.touched.payment?.[index]?.nominalbayar && validation.errors.payment?.[index]?.nominalbayar ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.payment?.[index]?.nominalbayar}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                {itemP.metodebayar === 2 &&
                                                    <>
                                                        <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                                            Rekening RS
                                                        </Label>
                                                        <div>
                                                            <CustomSelect
                                                                id={`rekeningrs${index}}`}
                                                                name={`rekeningrs${index}`}
                                                                options={filterRekeningRs(comboboxpayment?.rekeningRs || [], itemP.nontunai)}
                                                                onChange={(e) => {
                                                                    changePayment("rekeningrs", index, e.value);
                                                                }}
                                                                className={`input ${validation.errors.payment?.[index]?.rekeningrs ? "is-invalid" : ""}`}
                                                            />
                                                            {validation.touched.payment?.[index]?.rekeningrs && validation.errors.payment?.[index]?.rekeningrs ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.payment?.[index]?.rekeningrs}</div></FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </>
                                                }
                                            </Row>
                                            {index === validation.values.payment.length - 1 && 
                                            <div className="d-flex flex-column align-items-center">
                                                <Row>
                                                    <Col lg={5}>
                                                        <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => addPayment()}>
                                                            +
                                                        </Button>
                                                    </Col>
                                                    {
                                                        validation.values.payment.length > 1 && <Col lg={5}>
                                                            <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => deleteLastPayment()}>
                                                                -
                                                            </Button>
                                                        </Col>
                                                    }
                                                </Row>
                                            </div>
                                            }
                                        </Row>
                                    )}
                                    <Row className="mb-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor={`pjpasien`}
                                            className="form-label">
                                            Sudah diterima dari
                                        </Label>
                                        <div>
                                            <Input 
                                                id={`pjpasien`}
                                                name={`pjpasien`}
                                                type="text"
                                                onChange={validation.handleChange}
                                                value={validation.values.pjpasien || ""} 
                                                invalid={validation.touched.payment && !!validation.errors.payment?.nominalbayar}
                                                />
                                            {validation.touched.payment && validation.errors.payment?.nominalbayar ? (
                                                <FormFeedback type="invalid" ><div>{validation.errors.payment?.nominalbayar}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Row>
                                    <Row className="mb-2">
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor={`keterangan`}
                                            className="form-label">
                                            Keterangan bayar
                                        </Label>
                                        <div>
                                            <Input 
                                                id={`keterangan`}
                                                name={`keterangan`}
                                                type="text"
                                                value={validation.values.keterangan || ""} 
                                                onChange={validation.handleChange}
                                                invalid={validation.touched.keterangan && !!validation.errors.keterangan}
                                                />
                                            {validation.touched.keterangan && validation.errors.keterangan ? (
                                                <FormFeedback type="invalid" ><div>{validation.errors.keterangan}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col lg={5}>
                                <Card className="p-3">
                                    <Label style={{ color: "black" }} className="form-label">
                                        Detail Pembayaran
                                    </Label>
                                    <table className="table-bayar ">
                                        <tbody>
                                            <tr>
                                                <td>Total</td>
                                                <td>Rp{totalTagihan?.toLocaleString("id-ID") || ""}</td>
                                            </tr>
                                            <tr>
                                                <td>Diskon</td>
                                                <td>Rp{diskon}</td>
                                            </tr>
                                            <tr>
                                                <td>Klaim Asuransi</td>
                                                <td>Rp{nominalklaim}</td>
                                            </tr>
                                            <tr>
                                                <td>Deposit</td>
                                                <td>Rp{0}</td>
                                            </tr>
                                        </tbody>
                                        <tbody className="total-tagihan">
                                            <tr>
                                                <td>Total Tagihan</td>
                                                <td>Rp{grandTotal?.toLocaleString('id-ID')}</td>
                                            </tr>
                                        </tbody>
                                        <tbody className="total-tagihan">
                                            <tr>
                                                <td>Pembayaran</td>
                                                <td>Rp{payment?.toLocaleString('id-ID')}</td>
                                            </tr>
                                        </tbody>
                                        <tbody className="total-tagihan">
                                            <tr>
                                                <td>Sisa tagihan</td>
                                                <td>Rp{sisaGrandTotal?.toLocaleString('id-ID')}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </Card>

                            </Col>
                        </Row>
                        <Row>
                            <Col lg={13}>
                                <Card className="p-3">
                                    <Row>
                                        <Label style={{ color: "black" }} className="form-label">
                                            Detail Verifikasi
                                        </Label>
                                    </Row>
                                    <Row>
                                        <DataTable
                                            fixedHeader
                                            columns={columns}
                                            pagination
                                            data={listPelayanan || []}
                                            progressPending={false}
                                            customStyles={tableCustomStyles}
                                        />
                                    </Row>
                                    <Row>
                                        <Col lg={2} >
                                            <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                                Keterangan: 
                                            </Label>
                                        </Col>
                                        <Col lg={4}>
                                            <Input
                                                id="keterangan"
                                                name="keterangan"
                                                type="keterangan"
                                                placeholder="Isi Keterangan"
                                                disabled
                                                style={{ height: '200px' }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={""}
                                                invalid={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                            <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                                SIMPAN
                                            </Button>
                                            <button
                                                type="button"
                                                className="btn w-sm btn-danger"
                                                data-bs-dismiss="modal"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
            </Container>
            <PrintTemplate 
                ContentPrint={
                    <div className="template-bukti-bayar-print">
                        <h2 className="judul-template">
                            Bukti Pembayaran pasien Rumah Sakit Solusi Nusantara Berdikari
                        </h2>
                        <h3 className="no-kwitansi">

                        </h3>
                        <table>
                            <tr>
                                <td>
                                    Nama Pasien
                                </td>
                                <td>
                                    : Moelyono
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Tgl Pendaftaran
                                </td>
                                <td>
                                    : 17/07/2023
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    No. Rekam Medis
                                </td>
                                <td>
                                    : 0012308
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    No Registrasi
                                </td>
                                <td>
                                    : 20230402009
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Sudah diterima dari 
                                </td>
                                <td>
                                    : Neneng Komariyah
                                </td>
                            </tr>
                            {created.createdCaraBayar?.map((caraBayar, index) =>
                                <tr key={index}>
                                    <td>
                                        Metode bayar {index + 1}
                                    </td>
                                    <td>
                                        : {`${caraBayar.objectmetodebayarfk === "Tunai" ? "Tunai" : ""}` + 
                                            ` ${caraBayar.objectjenisnontunaifk ? `${caraBayar.objectjenisnontunaifk}` : ``}` +
                                            ` Rp${caraBayar.totalbayar.toLocaleString("id-ID")}`}
                                    </td>
                                </tr>
                            )}
                            
                            <tr>
                                <td>
                                    Total Bayar
                                </td>
                                <td>
                                    : Tunai
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Untuk Pebayaran
                                </td>
                                <td>
                                    : Keterangan coba
                                </td>
                            </tr>
                        </table>
                    </div>
                }
                testing={false}
                ref={refPrintTransaksi}
                orientation="landscape"
                format={[210, 120]}
                />
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

export default Bayar;