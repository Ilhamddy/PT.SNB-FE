import React, { useEffect, useState, useCallback, useRef } from 'react';
import withRouter from "../../../Components/Common/withRouter";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table, Form,
    FormFeedback, Alert, Modal,
    ModalHeader, ModalBody
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
//import images
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';
import CustomSelect from '../../Select/Select'
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { comboRegistrasiGet } from '../../../store/master/action';
import { registrasiNoregistrasiResetForm, registrasiGet, saveRegistrasiMutasi, registrasiResetForm, registrasiRuanganNorecGet, registrasiGetReset, registrasiRuanganNorecGetReset } from "../../../store/actions";
import "./RegistrasiMutasiPasien.scss"

const RegistrasiMutasiPasien = (props) => {
    const { id, norec } = useParams();
    document.title = "Registrasi Mutasi Pasien";
    const dispatch = useDispatch();
    const history = useNavigate();
    const [dateStart] = useState(() => (new Date()).toISOString())
    // Pills Tabs
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    useEffect(() => {
        dispatch(comboRegistrasiGet());
        if (id) {
            dispatch(registrasiGet(id));
        }
    }, [id, dispatch]);
    const { dataPas, data, loading, error, newData, loadingSave, successReg,
        errorSave,
        dtRuangNorec } = useSelector((state) => ({
            data: state.Master.comboRegistrasiGet.data,
            newData: state.Registrasi.saveRegistrasiMutasi.newData,
            successReg: state.Registrasi.saveRegistrasiMutasi.success,
            loadingSave: state.Registrasi.saveRegistrasiMutasi.loading,
            errorSave: state.Registrasi.saveRegistrasiMutasi.error,
            loading: state.Master.comboRegistrasiGet.loading,
            error: state.Master.comboRegistrasiGet.error,
            dataPas: state.Registrasi.registrasiGet.data,
            dtRuangNorec: state.Registrasi.registrasiRuangNorecGet.data,

        }));
        console.log(successReg)
    useEffect(() => {
        return () => {
            dispatch(registrasiNoregistrasiResetForm());
            dispatch(registrasiResetForm())
        }
    }, [dispatch])

    const [dataUnit, setdataUnit] = useState([]);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: newData?.id ?? id,
            norecdp: norec,
            tglregistrasi: newData?.tglregistrasi ?? dateStart,
            unittujuan: newData?.unittujuan ?? "",
            rujukanasal: newData?.rujukanasal ?? "",
            jenispenjamin: newData?.jenispenjamin ?? "",
            penjamin: newData?.penjamin ?? "",
            tujkunjungan: newData?.tujkunjungan ?? "",
            dokter: newData?.dokter ?? "",
            penanggungjawab: newData?.penanggungjawab ?? "",
            namapasien: dataPas?.namapasien ?? "",
            nocm: dataPas?.nocm ?? "",
            nobpjs: dataPas?.nobpjs ?? "",
            noidentitas: dataPas?.noidentitas ?? "",
            tgllahir: dataPas?.tgllahir ?? "",
            kelas: newData?.kelas ?? "",
            kamar: newData?.kamar ?? "",
            tempattidur: newData?.tempattidur ?? "",
            caramasuk: newData?.caramasuk ?? "",
            statuspasien: dataPas?.statuspasien ?? "",
        },
        validationSchema: Yup.object({
            tglregistrasi: Yup.string().required("Tanggal Registrasi wajib diisi"),
            tujkunjungan: Yup.string().required("Tujuan Kunjungan wajib diisi"),
            unittujuan: Yup.string().required("Unit wajib diisi"),
            rujukanasal: Yup.string().required("Asal Rujukan wajib diisi"),
            jenispenjamin: Yup.string().required("Jenis Penjamin wajib diisi"),
            penjamin: Yup.array().required("Penjamin wajib diisi"),
            dokter: Yup.string().required("Dokter wajib diisi"),
            penanggungjawab: Yup.string().required("Penanggung jawab wajib diisi"),
            caramasuk: Yup.string().required("Cara Masuk wajib diisi"),
            // kelas: Yup.string().when("tujkunjungan",{
            //     is:(val) => val ==="2",
            //     then: Yup.string().required("Kelas Harus di isi")
            // })
            kelas: Yup.string().when("tujkunjungan", (tujkunjungan, schema) => {
                if (tujkunjungan[0] === '2') {
                    return schema
                        .required("Kelas Harus di isi")
                } else return schema
            }),
            kamar: Yup.string().when("kelas", (kelas, schema) => {
                if (kelas[0] !== undefined) {
                    return schema
                        .required("Kamar Harus di isi")
                } else return schema
            }),
            tempattidur: Yup.string().when("kamar", (kamar, schema) => {
                if (kamar[0] !== undefined) {
                    return schema
                        .required("Tempat Tidur Harus di isi")
                } else return schema
            })
        }),
        onSubmit: (values) => {
            // console.log('masukkkk')
            dispatch(saveRegistrasiMutasi(values, ''));
        }
    });
    // console.log(validation.errors)
    useEffect(() => {
        norec && dispatch(registrasiRuanganNorecGet(norec));
    }, [dispatch, norec]);

    useEffect(() => {
        if (dtRuangNorec && data) {
            validation.setFieldValue('tujkunjungan', 2)
            let newArray = data?.unit?.filter(function (el) {
                return el.objectinstalasifk === 2;
            }) || [];
            const unitLastFk = dtRuangNorec?.objectunitlastfk || ""
            validation.setFieldValue('unittujuan', unitLastFk);
            setdataUnit(newArray);
            const idKelas = dtRuangNorec?.objectkelasfk || ""
            validation.setFieldValue('kelas', idKelas);
            let newArrayKamar = data?.kamar?.filter(function (item) {
                if (item.objectkelasfk === idKelas && item.objectunitfk === unitLastFk)
                    return true;
                return false;
            }) || [];
            setdataKamar(newArrayKamar);
            const idKamar = dtRuangNorec?.kamar?.[0]?.id || ""
            validation.setFieldValue('kamar', idKamar);
            let newArrayBed = data?.tempattidur?.filter(function (item) {
                if (item.objectkamarfk === idKamar)
                    return true;
                return false;
            }) || [];
            setdataTT(newArrayBed);
            validation.setFieldValue('tempattidur', dtRuangNorec?.antrean?.[0]?.nobed || "")
            validation.setFieldValue('rujukanasal', dtRuangNorec?.objectasalrujukanfk || "")
            validation.setFieldValue('jenispenjamin', dtRuangNorec?.objectjenispenjaminfk || "");
            const penjamin1 = dtRuangNorec?.objectpenjaminfk || null;
            const penjamin2 = dtRuangNorec?.objectpenjamin2fk || null;
            const penjamin3 = dtRuangNorec?.objectpenjamin3fk || null;
            let penjamin = [penjamin1, penjamin2, penjamin3];
            penjamin = penjamin.map((item) => {
                if (item === null) return null;
                const rekanan = data?.rekanan?.find((it) => it.value === item);
                return rekanan || null;
            });
            penjamin = penjamin.filter((item) => item !== null)
            validation.setFieldValue('penjamin', penjamin);
            validation.setFieldValue('dokter', dtRuangNorec?.objectdokterpemeriksafk || "");
            validation.setFieldValue('penanggungjawab', dtRuangNorec?.objectpjpasienfk || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dtRuangNorec, validation.setFieldValue, data])
    const handleRegistrasi = (e) => {
        if (e === 'registrasi') {
            // setcardRegistrasi(false)
            // setcardBuktiPendaftaran(true)
        }
    };
    const refPrintBukti = useRef(null);
    const handleBack = () => {
        history("/bGlzdGRhZnRhcnBhc2llbi9kYWZ0YXJwYXNpZW5tdXRhc2k=");
    }
    const handleBeginOnChange = (newBeginValue) => {
        var dateString = new Date()
        validation.setFieldValue('tglregistrasi', dateString.toISOString())
    }
    const handleChangeTujuan = (selected) => {
        validation.setFieldValue('tujkunjungan', selected.value)
        let newArray = data.unit.filter(function (el) {
            return el.objectinstalasifk === selected.value;
        });
        // console.log(selected.value)
        // if(selected.value===2){
        validation.setFieldValue('kelas', "")
        validation.setFieldValue('kamar', "")
        validation.setFieldValue('tempattidur', "")
        // }
        validation.setFieldValue('unittujuan', "")
        setdataUnit(newArray)

    }
    const handleChangeKamar = (selected) => {
        validation.setFieldValue('kamar', selected.value)
        var newArray = data.tempattidur.filter(function (item) {
            if (item.objectkamarfk === selected.value && item.objectstatusbedfk === 2)
                return true;
            return false;
        });
        console.log(newArray)
        setdataTT(newArray)
    }
    const refIframe = useRef(null)
    function handleSelectPenjamin(data) {
        validation.setFieldValue('penjamin', data)
    }
    const [isLoading, setIsLoading] = useState(true);
    const optionPenjamin = data
        .rekanan?.filter((rekanan) => rekanan.objectjenispenjaminfk === validation.values.jenispenjamin)
        ?? [];
    const [dataTT, setdataTT] = useState([]);
    const [dataKamar, setdataKamar] = useState([]);
    const handleChangeKelas = (selected) => {
        validation.setFieldValue('kelas', selected.value)
        var newArray = data.kamar.filter(function (item) {
            if (item.objectkelasfk === selected.value && item.objectunitfk === validation.values.unittujuan)
                return true;
            return false;
        });
        setdataKamar(newArray)
        setdataTT([])
    }
    const handleChangeUnitTujuan = (selected) => {
        validation.setFieldValue('unittujuan', selected.value)
        validation.setFieldValue('kelas', "")
        validation.setFieldValue('kamar', "")
        validation.setFieldValue('tempattidur', "")
        setdataKamar([])
        setdataTT([])
    }
    const tableCustomStyles = {
        headRow: {
            style: {
                color: '#ffffff',
                backgroundColor: '#FFCB46',
            },
        },
        rows: {
            style: {
                color: "black",
                backgroundColor: "#f1f2f6"
            },

        }
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            // width: "140px",
            // cell: (data) => {
            //     return (
            //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
            //         <button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{data.noregistrasi}</button>
            //     );
            // },
        },
        {

            name: <span className='font-weight-bold fs-13'>Kelas</span>,
            selector: row => row.namakelas,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Bed</span>,
            selector: row => row.count,
            sortable: true,
            // width: "150px"
        },
    ];
    return (
        <div className="page-content registrasi-mutasi-pasien">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Registrasi Mutasi Pasien" pageTitle="Registrasi Mutasi Pasien" />
                <Row>
                    <Col lg={3}>
                        <Card>
                            <CardBody>
                                <h5 className="card-title mb-5">Profile Pasien</h5>
                                <div className="text-center">
                                    <img src={userDummy}
                                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                        alt="user-profile" />
                                    <Input style={{ border: 'none', textAlign: 'center' }}
                                        id="namapasien"
                                        name="namapasien"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.namapasien || ""}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Nav pills className="nav-success mb-3">
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "1", })} onClick={() => { pillsToggle("1"); }} >
                                            Profile
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "2", })} onClick={() => { pillsToggle("2"); }} >
                                            Riwayat
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "3", })} onClick={() => { pillsToggle("3"); }} >
                                            Action
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={pillsTab} className="text-muted">
                                    <TabPane tabId="1" id="home-1">
                                        <Card>
                                            <CardBody>
                                                <div className="table-responsive">
                                                    <Table className="table-borderless mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th className="ps-0" scope="row">NoRM :</th>
                                                                <td className="text-muted">{validation.values.nocm}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Tgllahir :</th>
                                                                <td className="text-muted">{validation.values.tgllahir}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">No BPJS :</th>
                                                                <td className="text-muted">{validation.values.nobpjs}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">No Identitas :</th>
                                                                <td className="text-muted">{validation.values.noidentitas}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="2" id="home-2">
                                        <Card>
                                            <CardBody>

                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="3" id="home-3">
                                        <Card>
                                            <CardBody>
                                                <div className="live-preview">
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {/* <Button color="info" className="btn-animation" data-text="Registrasi" onClick={() => { handleRegistrasi() }}><span>Registrasi</span></Button>
                                                        <Button color="warning" className="btn-animation" data-text="Batal" onClick={() => handleBack()}> <span>Batal</span> </Button> */}
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                            className="gy-4"
                            action="#">
                            {/* {success && success ? (
                                <>
                                    {toast("Registrasi Pasien Berhasil.....", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                    <ToastContainer autoClose={2000} limit={1} />
                                    <Alert color="success" >
                                        Registrasi Pasien Berhasil, dengan nomor registrasi {messageNewData}
                                    </Alert>
                                </>
                            ) : null} */}
                            {/* <BuktiPendaftaran isOpen={modal} toggle={toggle} centered /> */}
                            <Card>
                                <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                    <h4 className="card-title mb-0">Registrasi</h4>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={6}>
                                            <Card>
                                                <CardBody>
                                                    <Row className="gy-4">
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="tglregistrasi" className="form-label">Tanggal Registrasi</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <Flatpickr
                                                                    // value={validation.values.tglregistrasi || ""}

                                                                    className="form-control"
                                                                    options={{
                                                                        enableTime: true,
                                                                        dateFormat: "Y-m-d H:i"
                                                                    }}
                                                                    value={validation.values.tglregistrasi}
                                                                    onChange={([newDate]) => {
                                                                        handleBeginOnChange(newDate);
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="tujkunjungan" className="form-label">Tujuan Kunjungan</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="tujkunjungan"
                                                                    name="tujkunjungan"
                                                                    options={data.instalasi}
                                                                    value={validation.values.tujkunjungan || ""}
                                                                    className={`input ${validation.errors.tujkunjungan ? "is-invalid" : ""}`}
                                                                    onChange={handleChangeTujuan}
                                                                />
                                                                {validation.touched.tujkunjungan && validation.errors.tujkunjungan ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.tujkunjungan}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="unittujuan" className="form-label">Unit Tujuan</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="unittujuan"
                                                                    name="unittujuan"
                                                                    options={dataUnit}
                                                                    value={validation.values.unittujuan || ""}
                                                                    className={`input ${validation.errors.unittujuan ? "is-invalid" : ""}`}
                                                                    // onChange={value => validation.setFieldValue('unittujuan', value.value)}
                                                                    onChange={handleChangeUnitTujuan}
                                                                />
                                                                {validation.touched.unittujuan && validation.errors.unittujuan ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.unittujuan}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        {validation.values.tujkunjungan === 2 ? (
                                                            <>
                                                                <Col xxl={6} md={6}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="kelas" className="form-label">Kelas</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col xxl={6} md={6}>
                                                                    <div>
                                                                        <CustomSelect
                                                                            id="kelas"
                                                                            name="kelas"
                                                                            options={data.kelas}
                                                                            value={validation.values.kelas || ""}
                                                                            className={`input ${validation.errors.kelas ? "is-invalid" : ""}`}
                                                                            // onChange={value => validation.setFieldValue('kelas', value.value)}
                                                                            onChange={handleChangeKelas}
                                                                        />
                                                                        {validation.touched.kelas && validation.errors.kelas ? (
                                                                            <FormFeedback type="invalid"><div>{validation.errors.kelas}</div></FormFeedback>
                                                                        ) : null}
                                                                    </div>
                                                                </Col>
                                                                <Col xxl={6} md={6}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="kamar" className="form-label">Kamar</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col xxl={6} md={6}>
                                                                    <div>
                                                                        <CustomSelect
                                                                            id="kamar"
                                                                            name="kamar"
                                                                            options={dataKamar}
                                                                            value={validation.values.kamar || ""}
                                                                            className={`input ${validation.errors.kamar ? "is-invalid" : ""}`}
                                                                            // onChange={value => validation.setFieldValue('kamar', value.value)}
                                                                            onChange={handleChangeKamar}
                                                                        />
                                                                        {validation.touched.kamar && validation.errors.kamar ? (
                                                                            <FormFeedback type="invalid"><div>{validation.errors.kamar}</div></FormFeedback>
                                                                        ) : null}
                                                                    </div>
                                                                </Col>
                                                                <Col xxl={6} md={6}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="tempattidur" className="form-label">No Tempat Tidur</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col xxl={6} md={6}>
                                                                    <div>
                                                                        <CustomSelect
                                                                            id="tempattidur"
                                                                            name="tempattidur"
                                                                            options={dataTT}
                                                                            value={validation.values.tempattidur || ""}
                                                                            className={`input ${validation.errors.tempattidur ? "is-invalid" : ""}`}
                                                                            onChange={value => validation.setFieldValue('tempattidur', value.value)}
                                                                        />
                                                                        {validation.touched.tempattidur && validation.errors.tempattidur ? (
                                                                            <FormFeedback type="invalid"><div>{validation.errors.tempattidur}</div></FormFeedback>
                                                                        ) : null}
                                                                    </div>
                                                                </Col>
                                                            </>
                                                        ) : null}

                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="rujukanasal" className="form-label">Rujukan Asal</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="rujukanasal"
                                                                    name="rujukanasal"
                                                                    options={data.asalrujukan}
                                                                    value={validation.values.rujukanasal || ""}
                                                                    className={`input ${validation.errors.rujukanasal ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('rujukanasal', value.value)}
                                                                />
                                                                {validation.touched.rujukanasal && validation.errors.rujukanasal ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.rujukanasal}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="caramasuk" className="form-label">Cara Masuk</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="caramasuk"
                                                                    name="caramasuk"
                                                                    options={data.caramasuk}
                                                                    value={validation.values.caramasuk || ""}
                                                                    className={`input ${validation.errors.caramasuk ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('caramasuk', value.value)}
                                                                />
                                                                {validation.touched.caramasuk && validation.errors.caramasuk ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.caramasuk}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg={6}>
                                            <Card>
                                                <CardBody>
                                                    <Row className="gy-4">
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispenjamin" className="form-label">Jenis Penjamin</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispenjamin"
                                                                    name="jenispenjamin"
                                                                    options={data.jenispenjamin}
                                                                    value={validation.values.jenispenjamin || ""}
                                                                    className={`input ${validation.errors.jenispenjamin ? "is-invalid" : ""}`}
                                                                    onChange={value => {
                                                                        validation.setFieldValue('jenispenjamin', value.value);
                                                                        validation.setFieldValue('penjamin', []);
                                                                    }}
                                                                />
                                                                {validation.touched.jenispenjamin && validation.errors.jenispenjamin ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispenjamin}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="penjamin" className="form-label">Penjamin</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="penjamin"
                                                                    name="penjamin"
                                                                    options={optionPenjamin}
                                                                    value={validation.values.penjamin || []}
                                                                    className={`input ${validation.errors.penjamin ? "is-invalid" : ""}`}
                                                                    // onChange={value => validation.setFieldValue('penjamin', value.value)}
                                                                    onChange={handleSelectPenjamin}
                                                                    isMulti
                                                                />
                                                                {validation.touched.penjamin && validation.errors.penjamin ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.penjamin}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="dokter" className="form-label">Dokter Penanggung Jawab</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="dokter"
                                                                    name="dokter"
                                                                    options={data.pegawai}
                                                                    value={validation.values.dokter || ""}
                                                                    className={`input ${validation.errors.dokter ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('dokter', value.value)}
                                                                />
                                                                {validation.touched.dokter && validation.errors.dokter ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.dokter}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="dokter" className="form-label">Penanggung Jawab Pasien</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="row-header">
                                                                <CustomSelect
                                                                    id="penanggungjawab"
                                                                    name="penanggungjawab"
                                                                    options={data.hubungankeluarga}
                                                                    value={validation.values.penanggungjawab || ""}
                                                                    className={`input ${validation.errors.penanggungjawab ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('penanggungjawab', value.value)}
                                                                />
                                                                {validation.touched.penanggungjawab && validation.errors.penanggungjawab ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.penanggungjawab}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div id="table-gridjs" className="mt-2">
                                                        <DataTable
                                                            fixedHeader
                                                            fixedHeaderScrollHeight="330px"
                                                            columns={columns}
                                                            pagination
                                                            data={data.gridtempattidur}
                                                            progressPending={loading}
                                                            customStyles={tableCustomStyles}
                                                            progressComponent={<LoadingTable />}
                                                        />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg={12} style={{ textAlign: 'right' }} >
                                            {!successReg && <Button type="submit"  color="info" disabled={loadingSave}> SIMPAN </Button>}
                                            <Button type="button" color="warning" className="btn-animation" data-text="Batal" onClick={() => handleBack()}> <span>Batal</span> </Button>
                                        </Col>
                                        {/* contoh pakai checkbox */}
                                        {/* <CustomCheckbox 
                                            data={stateDummy}
                                            setData={(newData) => setStateDummy(newData)}
                                            checkboxName='checkbox-dummy-ex'
                                        /> */}

                                    </Row>
                                </CardBody>
                            </Card>
                            {/* <div hidden={cardBuktiPendaftaran}>
                            </div> */}

                            <iframe
                                id="receipt"
                                // src={"50"}//"/bukti-pendaftaran/"	
                                style={{ display: 'none' }}
                                title="Receipt"
                                ref={refIframe}
                                width={"50"}
                                height={"50"}
                            >

                            </iframe>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(RegistrasiMutasiPasien);