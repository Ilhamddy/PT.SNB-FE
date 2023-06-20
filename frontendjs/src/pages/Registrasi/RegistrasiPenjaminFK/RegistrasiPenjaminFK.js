
import { useEffect, useState } from "react";
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";
import classnames from "classnames";
import withRouter from "../../../Components/Common/withRouter";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, Input, Form, TabContent, TabPane, Table, Label, FormFeedback, Button, CardTitle,
} from 'reactstrap';
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import CustomSelect from "../../Select/Select";
import { emrDiagnosaxGet, emrListDiagnosaxGet } from "../../../store/actions";
import { useDispatch } from "react-redux";


const RegistrasiPenjaminFK = () => {
    const { id } = useParams();
    const [cardHeaderTab, setcardHeaderTab] = useState("1")

    const [pillsTab, setpillsTab] = useState("1");
    const dispatch = useDispatch();

    const penjaminLakaLantas = [ //dummy data
        { value: "1", label: "Jasa Raharja" },
        { value: "2", label: "TASPEN" },
        { value: "3", label: "BPJS Ketenagakerjaan" },
        { value: "4", label: "ASABRI PT" },
    ];

    const jenisPeserta = [ //dummy data
        { value: "1", label: "Poli Eksklusif" },
        { value: "2", label: "Cobas" },
        { value: "3", label: "Katarak" }
    ]

    const [checkedLakaLantas, setCheckedLakaLantas] 
        = useState(() => penjaminLakaLantas.map((data) => {
            data.checked = false;
            return data;
        }))

    const [checkedJenisPes, setcheckedJenisPes] 
        = useState(() => jenisPeserta.map((data) => {
            data.checked = false;
            return data;
        }))



    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: id,
            nokartu: "",
            jenisrujukan: "",
            tanggalsep: "",
            tujuankunjungan: "",
            dpjppmelayani: "",
            asalrujukan: "",
            tanggalrujukan: "",
            nosuratkontrol: "",
            dpjppemberi: "",
            diagnosarujukan: "",
            jenispeserta: "",
            notelepon: "",
            catatan: "",
            statuskecelakaan: "",

        },
        validationSchema: Yup.object({
            nokartu: Yup.string().required("No kartu wajib di isi"),
            jenisrujukan: Yup.string().required("Jenis rujukan wajib di isi"),
            nokartu: Yup.string().required("No kartu wajib di isi"),
            tanggalsep: Yup.string().required("Tanggal SEP wajib di isi"),
            tujuankunjungan: Yup.string().required("Tujuan kunjungan wajib di isi"),
            dpjppmelayani: Yup.string().required("DPJP pelayani wajib di isi"),
            asalrujukan: Yup.string().required("Asal rujukan wajib di isi"),
            tanggalrujukan: Yup.string().required("Tanggal rujukan wajib di isi"),
            nosuratkontrol: Yup.string().required("No surat kontrol wajib di isi"),
            dpjppemberi: Yup.string().required("DPJP pemberi wajib di isi"),
            diagnosarujukan: Yup.string().required("Diagnosa rujukan wajib di isi"),
            jenispeserta: Yup.string().required("Jenis peserta wajib di isi"),
            notelepon: Yup.string().required("No telepon wajib di isi"),
            catatan: Yup.string().required("Catatan wajib di isi"),
            statuskecelakaan: Yup.string().required("Status kecelakaan wajib di isi"),
        }),
        onSubmit: (values) => {

        }
    });

    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    }
    useEffect(() => {
        dispatch(emrDiagnosaxGet("con", 'diagnosa10'));
    }, [id, dispatch]);


    //component
    const PilihRujukan = (
        <Row>
            <Col lg={6}>
                <Card>
                    <CardBody>
                        <Row className="gy-4">
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="jenisrujukan" className="form-label">Jenis Rujukan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <CustomSelect
                                        id="jenisrujukan"
                                        name="jenisrujukan"
                                    />
                                    {validation.touched.jenisrujukan && validation.errors.jenisrujukan ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.jenisrujukan}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="nokartu" className="form-label">No Kartu</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Input
                                        id="nokartu"
                                        name="nokartu"
                                        type="number"
                                        placeholder="Masukkan No Kartu"
                                        className="form-control"
                                        onChange={validation.handleChange}
                                        // onBlur={validation.handleBlur}
                                        value={validation.values.nokartu || ""}
                                        invalid={validation.touched.nokartu && validation.errors.nokartu ? true : false}
                                    />
                                    {validation.touched.nokartu && validation.errors.nokartu ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.nokartu}</div></FormFeedback>
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
                                    <Label style={{ color: "black" }} htmlFor="tglregistrasi" className="form-label">Tanggal SEP</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Flatpickr
                                        // value={validation.values.tglregistrasi || ""}
                                        className="form-control"
                                        options={{
                                            dateFormat: "Y-m-d",
                                            defaultDate: "today",
                                            maxDate: "today",
                                            minDate: "today"
                                        }}
                                        onChange={([newDate]) => {
                                            
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="norujukan" className="form-label">No Rujukan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Input
                                        id="norujukan"
                                        name="norujukan"
                                        type="number"
                                        placeholder="Masukkan No Rujukan"
                                        className="form-control"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.norujukan || ""}
                                        invalid={validation.touched.norujukan && validation.errors.norujukan ? true : false}
                                    />
                                    {validation.touched.norujukan && validation.errors.norujukan ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.norujukan}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col> 
        </Row>
    )

    const DetailBPJS = (
        <Row>
            <Col lg={6}>
                <Card>
                    <CardBody>
                        <Row className="gy-4">
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="tujuankunjungan" className="form-label">Tujuan Kunjungan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <CustomSelect
                                        id="tujuankunjungan"
                                        name="tujuankunjungan"
                                    />
                                    {validation.touched.tujuankunjungan && validation.errors.tujuankunjungan ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.tujuankunjungan}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="dpjppmelayani" className="form-label">DPJP yang melayani</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <CustomSelect
                                        id="dpjppmelayani"
                                        name="dpjppmelayani"
                                    />
                                    {validation.touched.dpjppmelayani && validation.errors.dpjppmelayani ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.dpjppmelayani}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="asalrujukan" className="form-label">Asal Rujukan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Input
                                        id="asalrujukan"
                                        name="asalrujukan"
                                        type="string"
                                        placeholder="Asal Rujukan"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.asalrujukan || ""}
                                        invalid={
                                            validation.touched.asalrujukan && validation.errors.asalrujukan ? true : false
                                        }
                                    />
                                    {validation.touched.asalrujukan && validation.errors.asalrujukan ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.asalrujukan}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="tanggalrujukan" className="form-label">Tanggal Rujukan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Flatpickr
                                        // value={validation.values.tglregistrasi || ""}
                                        className="form-control"
                                        options={{
                                            dateFormat: "Y-m-d",
                                            defaultDate: "today",
                                            maxDate: "today",
                                            minDate: "today"
                                        }}
                                        onChange={([newDate]) => {
                                            
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="nosuratkontrol" className="form-label">No Surat Kontrol</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Input
                                        id="nosuratkontrol"
                                        name="nosuratkontrol"
                                        type="number"
                                        placeholder="No Surat Kontrol"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.nosuratkontrol || ""}
                                        invalid={
                                            validation.touched.nosuratkontrol && validation.errors.nosuratkontrol ? true : false
                                        }
                                    />
                                    {validation.touched.nosuratkontrol && validation.errors.nosuratkontrol ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.nosuratkontrol}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="dpjppemberi" className="form-label">DPJP Pemberi Surat</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Input
                                        id="dpjppemberi"
                                        name="dpjppemberi"
                                        type="text"
                                        placeholder="DPJP Pemberi"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.dpjppemberi || ""}
                                        invalid={
                                            validation.touched.dpjppemberi && validation.errors.dpjppemberi ? true : false
                                        }
                                    />
                                    {validation.touched.dpjppemberi && validation.errors.dpjppemberi ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.dpjppemberi}</div></FormFeedback>
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
                                    <Label style={{ color: "black" }} htmlFor="tglregistrasi" className="form-label">Diagnosa Rujukan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <CustomSelect
                                    id="diagnosarujukan"
                                    name="diagnosarujukan"
                                    onChange={() => {
                                        
                                    }}
                                />
                                {validation.touched.diagnosarujukan && validation.errors.diagnosarujukan ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.diagnosarujukan}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <CustomCheckbox data={checkedJenisPes} setData={setcheckedJenisPes}/>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="jenispeserta" className="form-label">Jenis Peserta</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <Input
                                    id="jenispeserta"
                                    name="jenispeserta"
                                    type="string"
                                    placeholder="Jenis Peserta"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.jenispeserta || ""}
                                    invalid={
                                        validation.touched.jenispeserta && validation.errors.jenispeserta ? true : false
                                    }
                                />
                                {validation.touched.jenispeserta && validation.errors.jenispeserta ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.jenispeserta}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="notelepon" className="form-label">No Telepon</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <Input
                                    id="notelepon"
                                    name="notelepon"
                                    type="number"
                                    placeholder="No Telepon"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.notelepon || ""}
                                    invalid={
                                        validation.touched.notelepon && validation.errors.notelepon ? true : false
                                    }
                                />
                                {validation.touched.notelepon && validation.errors.notelepon ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.notelepon}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="catatan" className="form-label">Catatan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <Input
                                    id="catatan"
                                    name="catatan"
                                    type="string"
                                    placeholder="Catatan"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.catatan || ""}
                                    invalid={
                                        validation.touched.catatan && validation.errors.catatan ? true : false
                                    }
                                />
                                {validation.touched.catatan && validation.errors.catatan ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.catatan}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="statuskecelakaan" className="form-label">Status Kecelakaan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <CustomSelect
                                    id="statuskecelakaan"
                                    name="statuskecelakaan"
                                />
                                {validation.touched.statuskecelakaan && validation.errors.statuskecelakaan ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.statuskecelakaan}</div></FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col> 
        </Row>
    )

    const BodyLakaLantas = (
        <Row>
            <Col lg={6}>
                <Card>
                    <CardBody>

                        <Row className="gy-4">
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="inputprovinsi" className="form-label">Provinsi</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <CustomSelect
                                    id="inputprovinsi"
                                    name="inputprovinsi"
                                />
                                {validation.touched.inputprovinsi && validation.errors.inputprovinsi ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.inputprovinsi}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="inputkota" className="form-label">Kota</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <CustomSelect
                                    id="inputkota"
                                    name="inputkota"
                                />
                                {validation.touched.inputkota && validation.errors.inputkota ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.inputkota}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="inputkecamatan" className="form-label">Kecamatan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <CustomSelect
                                    id="inputkecamatan"
                                    name="inputkecamatan"
                                />
                                {validation.touched.inputkecamatan && validation.errors.inputkecamatan ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.inputkecamatan}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Penjamin Laka Lantas</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <CustomCheckbox data={checkedLakaLantas} setData={setCheckedLakaLantas}/>
                                </CardBody>
                            </Card>
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
                                    <Label style={{ color: "black" }} htmlFor="tanggallakalantas" className="form-label">Tanggal Laka Lantas</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div>
                                    <Flatpickr
                                        className="form-control"
                                        options={{
                                            dateFormat: "Y-m-d",
                                            defaultDate: "today",
                                            maxDate: "today",
                                            minDate: "today"
                                        }}
                                        onChange={([newDate]) => {
                                            
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="nosepsuplesi" className="form-label">No SEP Suplesi</Label>
                                </div>
                            </Col>

                            <Col xxl={6} md={6}>
                                <Input
                                    id="nosepsuplesi"
                                    name="nosepsuplesi"
                                    type="number"
                                    placeholder="No SEP Suplesi"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.nosepsuplesi || ""}
                                    invalid={
                                        validation.touched.nosepsuplesi && validation.errors.nosepsuplesi ? true : false
                                    }
                                />
                                {validation.touched.nosepsuplesi && validation.errors.nosepsuplesi ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.nosepsuplesi}</div></FormFeedback>
                                ) : null}
                            </Col>
                            <Col xxl={6} md={6}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="keteranganlaka" className="form-label">Keterangan</Label>
                                </div>
                            </Col>
                            <Col xxl={6} md={6}>
                                <Input
                                    id="keteranganlaka"
                                    name="keteranganlaka"
                                    type="string"
                                    placeholder="Keterangan"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.keteranganlaka || ""}
                                    invalid={
                                        validation.touched.keteranganlaka && validation.errors.keteranganlaka ? true : false
                                    }
                                />
                                {validation.touched.keteranganlaka && validation.errors.keteranganlaka ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.keteranganlaka}</div></FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col> 
        </Row>
    )

    const BodyBPJSRujukan = (
        <>
            {PilihRujukan}
            <Col lg={12} style={{ textAlign: 'left' }} className="ms-2">
                <Button color="info" className="rounded-pill" >Pilih Rujukan</Button>
            </Col>
            {DetailBPJS}
            <div className="ms-3">
                Laka Lantas
            </div>
            {BodyLakaLantas}
            <Col lg={12} style={{ textAlign: 'right' }} className="mr-3 me-3">
                <Button type="submit" color="info" className="rounded-pill" >Pilih Rujukan</Button>
            </Col>
        </>
    )

    return(
        <div className="page-content">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien" pageTitle="Registrasi Pasien" />
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

                            <Card>
                                <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                    <h4 className="card-title mb-0">Registrasi</h4>
                                </CardHeader>
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-shrink-0 ms-2">
                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            
                                            <NavItemCust 
                                                tabNumber={"1"} 
                                                text={"BPJS"} 
                                                cardHeaderTab={cardHeaderTab} 
                                                cardHeaderToggle={cardHeaderToggle}/>
                                            <NavItemCust 
                                                tabNumber={"2"} 
                                                text={"Penjamin Lainnya"} 
                                                cardHeaderTab={cardHeaderTab} 
                                                cardHeaderToggle={cardHeaderToggle}/>
                                        </Nav>
                                    </div>
                                </div>
                                <TabContent activeTab={cardHeaderTab} className="text-muted">
                                    <TabPane tabId="1" id="home-1">
                                        {BodyBPJSRujukan}
                                    </TabPane>

                                    <TabPane tabId="2" id="home-1">
                                        <Card>
                                            <CardBody>
                                                body2
                                            </CardBody>
                                        </Card>
                                    </TabPane>

                                    <TabPane tabId="3" id="home-1">
                                        <Card>
                                            <CardBody>
                                                body3
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                            </Card>                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const CustomCheckbox = ({data, setData}) => {
    const handleChangeCheckBox = (val)=>{
        const newData = [...data]
        const dataVal = newData.find((dataVal) => dataVal.value === val) 
        dataVal.checked = !dataVal.checked
        setData(newData)
    }
    return(
        <Row className="mt-3">
            <Col xxl={6} md={6}>
                {
                    data.map((dataVal, indexVal) => Math.abs(indexVal % 2) === 1 ? <></> :
                        <div className="form-check ms-2" key={dataVal.value}>
                            <Input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="formCheck1" 
                                checked={dataVal.checked} 
                                onChange={e => handleChangeCheckBox(dataVal.value)}/>
                            <Label className="form-check-label" htmlFor="formCheck1" style={{ color: "black" }} >
                                {dataVal.label}
                            </Label>
                        </div>
                    )
                }
            </Col>
            <Col xxl={6} md={6}>
                {
                    data.map((dataVal, indexVal) => indexVal % 2 === 0 ? <></> :
                        <div className="form-check ms-2" key={dataVal.value}>
                            <Input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="formCheck1" 
                                checked={dataVal.checked} 
                                onChange={e => handleChangeCheckBox(dataVal.value)}/>
                            <Label className="form-check-label" htmlFor="formCheck1" style={{ color: "black" }} >
                                {dataVal.label}
                            </Label>
                        </div>
                    )
                }
            </Col>
        </Row>

    )
}

const NavItemCust = ({tabNumber, text, cardHeaderTab, cardHeaderToggle}) => (
    <NavItem>
        <NavLink 
            style={{ cursor: "pointer", fontWeight: "bold" }} 
            className={classnames({ active: cardHeaderTab === tabNumber})} 
            onClick={() => { cardHeaderToggle(tabNumber); }} >
            {text}
        </NavLink>
    </NavItem>
);


export default withRouter(RegistrasiPenjaminFK);