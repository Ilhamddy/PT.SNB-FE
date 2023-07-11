import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
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
import { rgxAllPeriods, rgxValidNumber } from "../../utils/regexcommon";

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
        nota
    } = useSelector((state) => ({
        dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
        comboboxReg: state.Master.comboRegistrasiGet.data || {},
        listPelayanan: state.Payment.pelayananFromVerifGet.data?.pelayanan || [],
        comboboxpayment: state.Master.comboPaymentGet.data,
        nota: state.Payment.pelayananFromVerifGet.data?.nota || [],
    }))



    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            metodebayar: "",
            nontunai: "",
            pjpasien: "",
            nominalbayar: "",
            tglbayar: dateAwalStart,
            rekeningrs: "",
            totaltagihan: "",
            diskon: 0,
            // non wajib
            deposit: 0,
            nobukti: `B${date.getFullYear().toString().substring(2, 4)}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
            pegawai: "",
            norecnota: "",
            klaim: "",
            norecdp: "",
        },
        validationSchema: Yup.object({
            metodebayar: Yup.string().required("Metode Pembayaran harus diisi"),
            nontunai: Yup.string().when("metodebayar", {
                is: (val) => val === "2",
                then: () => Yup.string().required("Metode non tunai harus diisi"),
            }),
            pjpasien: Yup.string().required("Diterima Dari harus diisi"),
            nominalbayar: Yup.string().required("Nominal Bayar harus diisi"),
            tglbayar: Yup.string()
                .required("Tanggal Bayar harus diisi"),
            rekeningrs: Yup.string().when("metodebayar", {
                is: (val) => val === "2",
                then: () => Yup.string().required("Rekening RS harus diisi"),
            }),
            totaltagihan: Yup.string().required("Total Tagihan harus diisi"),
            diskon: Yup.string().required("Diskon harus diisi"),
            // non wajib
            deposit: Yup.string().required("Deposit harus diisi"),
            nobukti: Yup.string().required("No Bukti harus diisi"),
            pegawai: Yup.string().required("Pegawai harus diisi"),
            norecnota: Yup.string().required("No Rekam Medis harus diisi"),
            pjpasien: Yup.string().required("Penanggung Jawab Pasien harus diisi"),
            klaim: Yup.string().required("Klaim harus diisi"),
            norecdp: Yup.string().required("No DP harus diisi"),
        }),
        onSubmit: (values) => {
            const valuesSent = {...values}
            valuesSent.nominalbayar = Number(valuesSent.nominalbayar.replace(rgxAllPeriods, ""))
            dispatch(buktiBayarCreate(valuesSent, () => {
                norecnota && dispatch(pelayananFromVerifGet(norecnota))
            }))
        }
    })



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
    const totalTagihan = listPelayanan.reduce((prev, pel) => prev + (pel.total || 0), 0)
    const grandTotal = totalTagihan - diskon
    
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
        grandTotal && validation.setFieldValue("totaltagihan", grandTotal)
        diskon && validation.setFieldValue("diskon", diskon)
        console.log(norecnota, "norecnota")
        //TODO: jumlah klaim diisi
        validation.setFieldValue("klaim", 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, validation.setFieldValue, grandTotal, diskon])

    useEffect(() => {
        nota.keterangan
            && validation.setFieldValue("keterangan", nota.keterangan)
        nota.namapasien 
            && validation.setFieldValue("pjpasien", nota.namapasien)
        nota.idpegawai 
            && validation.setFieldValue("pegawai", nota.idpegawai)
        nota.norecdp
            && validation.setFieldValue("norecdp", nota.norecdp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nota, validation.setFieldValue])


    useEffect(() => {
        norecnota && validation.setFieldValue("norecnota", norecnota)
        norecnota && dispatch(pelayananFromVerifGet(norecnota))
        return () => {
            dispatch(pelayananFromVerifGetReset())
        }
    }, [dispatch, norecnota])

    const rekeningRs = (comboboxpayment?.rekeningRs || [])?.filter(
        (rekening) => rekening.objectbankfk === validation.values.nontunai
    );
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
                                    <Row className="mb-2">
                                        <Col lg={6}>
                                            <Label style={{ color: "black" }} htmlFor="metodebayar" className="form-label">
                                                Metode Pembayaran
                                            </Label>
                                            <div>
                                                <CustomSelect
                                                    id="metodebayar"
                                                    name="metodebayar"
                                                    options={comboboxpayment?.metodeBayar || []}
                                                    onChange={e => 
                                                        validation.setFieldValue('metodebayar', e.value)
                                                    }
                                                    value={validation.values.metodebayar || ""}
                                                    className={`input ${validation.errors.metodebayar ? "is-invalid" : ""}`}
                                                />
                                                {validation.touched.metodebayar && validation.errors.metodebayar && (
                                                    <FormFeedback type="invalid"><div>{validation.errors.metodebayar}</div></FormFeedback>
                                                )}
                                            </div>
                                        </Col>
                                        {validation.values.metodebayar === 2 &&
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
                                                                    id={`radio-payment-${key}`}   
                                                                    checked={validation.values.nontunai === data.value}
                                                                    readOnly
                                                                    onClick={e => {
                                                                        validation.setFieldValue('nontunai', data.value)
                                                                    }}/>
                                                                <Label className="form-check-label ms-2" 
                                                                    htmlFor={`radio-payment-${key}`} 
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
                                        <Label 
                                            style={{ color: "black" }} 
                                            htmlFor="pjpasien" 
                                            className="form-label">
                                            Sudah diterima dari
                                        </Label>
                                        <div>
                                            <Input 
                                                id="pjpasien"
                                                name="pjpasien"
                                                type="text"
                                                disabled
                                                onBlur={validation.handleBlur}
                                                value={validation.values.pjpasien || ""} 
                                                invalid={validation.touched.pjpasien && !!validation.errors.pjpasien}
                                                />
                                            {validation.touched.pjpasien && validation.errors.pjpasien ? (
                                                <FormFeedback type="invalid" ><div>{validation.errors.pjpasien}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                        <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                            Nominal bayar
                                        </Label>
                                        <div>
                                            <Input 
                                                id="nominalbayar"
                                                name="nominalbayar"
                                                type="string"
                                                placeholder="Masukkan nominal bayar"
                                                className="form-control"
                                                onBlur={validation.handleBlur}
                                                onChange={(e) => {
                                                    validation.setFieldValue("nominalbayar",
                                                        onChangeStrNbr(
                                                            e.target.value, 
                                                            validation.values.nominalbayar
                                                        ))  
                                                }}
                                                invalid={validation.touched.nominalbayar && !!validation.errors.nominalbayar}
                                                value={validation.values.nominalbayar || ""} />
                                            {validation.touched.nominalbayar && validation.errors.nominalbayar ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.nominalbayar}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                        {validation.values.metodebayar === 2 &&
                                            <>
                                                <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                                    Rekening RS
                                                </Label>
                                                <div>
                                                    <CustomSelect
                                                        id="rekeningrs"
                                                        name="rekeningrs"
                                                        options={rekeningRs}
                                                        className={`input ${validation.errors.rekeningrs ? "is-invalid" : ""}`}
                                                        onChange={(e) => {
                                                            validation.setFieldValue("rekeningrs", e.value);
                                                        }}
                                                    />
                                                    {validation.touched.rekeningrs && validation.errors.rekeningrs ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.rekeningrs}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </>
                                        }
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
                                                <td>Rp{0}</td>
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
                                                value={validation.values.keterangan || ""}
                                                invalid={
                                                    validation.touched.keterangan && validation.errors.keterangan ? true : false
                                                }
                                            />
                                            {validation.touched.keterangan && validation.errors.keterangan ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.keterangan}</div></FormFeedback>
                                            ) : null}
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