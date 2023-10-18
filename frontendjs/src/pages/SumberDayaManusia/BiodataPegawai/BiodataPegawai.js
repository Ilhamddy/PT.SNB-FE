import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import UiContent from "../../../Components/Common/UiContent";
import { Button, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { onChangeStrNbr, onChangeStrNbrNeg } from "../../../utils/format";
import CustomSelect from "../../Select/Select";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";

const BiodataPegawai = () => {
    document.title = "Biodata Pegawai";
    const [dateNow] = useState(() => new Date().toISOString())
    const vSetValidationBiodata = useFormik({
        enableReinitialize: true,
        initialValues: {
            nip: '',
            gelardepan: '',
            namalengkap:'',
            gelarbelakang:'',
            namalengkap2:'',
            nik:'',
            inisialNama:'',
            jenisKelamin:'',
            tempatLahir:'',
            tglLahir:'',
            agama:'',
            golonganDarah:'',
            suku:'',
            noTelp:'',
            noHp:'',
            email:'',
            pendidikanTerakhir:'',
            statusPernikahan:'',
            namaIbuKandung:'',
        },
        validationSchema: Yup.object({
            nip: Yup.string().required("NIP wajib diisi"),
            // gelardepan: Yup.string().required("Gelar wajib diisi"),
            namalengkap: Yup.string().required("NIP wajib diisi"),
            // gelarbelakang: Yup.string().required("NIP wajib diisi"),
            nik: Yup.string().required("NIK wajib diisi"),
            // inisialNama: Yup.string().required("NIP wajib diisi"),
            jenisKelamin: Yup.string().required("Jenis Kelamin wajib diisi"),
            tempatLahir: Yup.string().required("Tempat Lahir wajib diisi"),
            tglLahir: Yup.string().required("TGL Lahir wajib diisi"),
            agama: Yup.string().required("Agama wajib diisi"),
            golonganDarah: Yup.string().required("GOlongan Darah wajib diisi"),
            suku: Yup.string().required("Sukur wajib diisi"),
            noTelp: Yup.string().required("No. Telp wajib diisi"),
            noHp: Yup.string().required("No. Hp wajib diisi"),
            email: Yup.string().required("email wajib diisi"),
            pendidikanTerakhir: Yup.string().required("Pendidikan Terakhir wajib diisi"),
            statusPernikahan: Yup.string().required("Status Pernikahan wajib diisi"),
            namaIbuKandung: Yup.string().required("Nama Ibu Kandung wajib diisi"),
        }),
        onSubmit: (values) => {
        }
    })
    const vSetValidationAlamat = useFormik({
        enableReinitialize: true,
        initialValues: {
            comboUnit: '',
            search: ''
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
        }
    })
    const vSetValidationStatusPegawai = useFormik({
        enableReinitialize: true,
        initialValues: {
            comboUnit: '',
            search: ''
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
        }
    })
    const [activeTab, setActiveTab] = useState("1");
    const toggleTab = (tab, type) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            //   let filteredOrders = orders;
            if (type !== "all") {
                // filteredOrders = orders.filter((order) => order.status === type);
            }
        }
    };
    const taskBiodata = [
        {
            id: 1,
            label: "Biodata Pegawai",
        },
        {
            id: 2,
            label: "Alamat",
        },
        {
            id: 3,
            label: "Status Pegawai",
        },
        {
            id: 4,
            label: "User Name",
        },
    ];
    // Pills
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggleBilling = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tambah / Edit Pegawai" pageTitle="Forms" />
                    <Card>
                        <CardBody className="pt-0">
                            <div>
                                <Nav
                                    className="nav-tabs nav-tabs-custom nav-success"
                                    role="tablist"
                                >
                                    {taskBiodata.map((item, key) => (
                                        <NavItem key={key}>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === `${item.id}` }, "fw-semibold")} onClick={() => { pillsToggleBilling(`${item.id}`); }}>
                                                <i className="ri-book-3-line me-1 align-bottom"></i>{" "}{item.label}
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                                <TabContent activeTab={pillsTab} className="text-muted">
                                    <TabPane tabId="1" id="ttv-1">
                                        <Card>
                                            <CardBody>
                                                <Form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        vSetValidationBiodata.handleSubmit();
                                                        return false;
                                                    }}
                                                    className="gy-4"
                                                    action="#">
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">NIP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="nip"
                                                                        name="nip"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.nip}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('nip', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.nip &&
                                                                            !!vSetValidationBiodata.errors?.nip}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.nip
                                                                        && !!vSetValidationBiodata.errors.nip && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.nip}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Nama dan Gelar</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={2}>
                                                                    <Input
                                                                        id="gelardepan"
                                                                        name="gelardepan"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.gelardepan}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('gelardepan', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.gelardepan &&
                                                                            !!vSetValidationBiodata.errors?.gelardepan}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.gelardepan
                                                                        && !!vSetValidationBiodata.errors.gelardepan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.gelardepan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="namalengkap"
                                                                        name="namalengkap"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.namalengkap}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('namalengkap', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.namalengkap &&
                                                                            !!vSetValidationBiodata.errors?.namalengkap}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.namalengkap
                                                                        && !!vSetValidationBiodata.errors.namalengkap && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.namalengkap}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={2}>
                                                                    <Input
                                                                        id="gelarbelakang"
                                                                        name="gelarbelakang"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.gelarbelakang}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('gelarbelakang', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.gelarbelakang &&
                                                                            !!vSetValidationBiodata.errors?.gelarbelakang}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.gelarbelakang
                                                                        && !!vSetValidationBiodata.errors.gelarbelakang && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.gelarbelakang}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Nama Lengkap</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="namalengkap2"
                                                                        name="namalengkap2"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.namalengkap2}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('namalengkap2', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.namalengkap2 &&
                                                                            !!vSetValidationBiodata.errors?.namalengkap2}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationBiodata.touched?.namalengkap2
                                                                        && !!vSetValidationBiodata.errors.namalengkap2 && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.namalengkap2}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">NIK</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="nik"
                                                                        name="nik"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.nik}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbrNeg(
                                                                                e.target.value,
                                                                                vSetValidationBiodata.values.nik
                                                                            )
                                                                            vSetValidationBiodata.setFieldValue('nik', newVal)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.nik &&
                                                                            !!vSetValidationBiodata.errors?.nik}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.nik
                                                                        && !!vSetValidationBiodata.errors.nik && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.nik}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Inisial Nama</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="inisialNama"
                                                                        name="inisialNama"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.inisialNama}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('inisialNama', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.inisialNama &&
                                                                            !!vSetValidationBiodata.errors?.inisialNama}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.inisialNama
                                                                        && !!vSetValidationBiodata.errors.inisialNama && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.inisialNama}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jenis Kelamin</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="jenisKelamin"
                                                                        name="jenisKelamin"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('jenisKelamin', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationBiodata.values.jenisKelamin}
                                                                        className={`input row-header ${!!vSetValidationBiodata?.errors.jenisKelamin ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationBiodata.touched.jenisKelamin &&
                                                                        !!vSetValidationBiodata.errors.jenisKelamin && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.jenisKelamin}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Tempat / Tanggal Lahir</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="tempatLahir"
                                                                        name="tempatLahir"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.tempatLahir}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('tempatLahir', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.tempatLahir &&
                                                                            !!vSetValidationBiodata.errors?.tempatLahir}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.tempatLahir
                                                                        && !!vSetValidationBiodata.errors.tempatLahir && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.tempatLahir}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationBiodata.touched?.tglLahir &&
                                                                            !!vSetValidationBiodata.errors?.tglLahir}
                                                                        id="tglLahir"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationBiodata.values.tglLahir || dateNow}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationBiodata.setFieldValue('tglLahir', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.tglLahir
                                                                        && !!vSetValidationBiodata.errors.tglLahir && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.tglLahir}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Agama</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="agama"
                                                                        name="agama"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('agama', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationBiodata.values.agama}
                                                                        className={`input row-header ${!!vSetValidationBiodata?.errors.agama ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationBiodata.touched.agama &&
                                                                        !!vSetValidationBiodata.errors.agama && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.agama}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Golongan Darah</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="golonganDarah"
                                                                        name="golonganDarah"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('golonganDarah', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationBiodata.values.golonganDarah}
                                                                        className={`input row-header ${!!vSetValidationBiodata?.errors.golonganDarah ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationBiodata.touched.golonganDarah &&
                                                                        !!vSetValidationBiodata.errors.golonganDarah && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.golonganDarah}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Suku</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="suku"
                                                                        name="suku"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('suku', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationBiodata.values.suku}
                                                                        className={`input row-header ${!!vSetValidationBiodata?.errors.suku ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationBiodata.touched.suku &&
                                                                        !!vSetValidationBiodata.errors.suku && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.suku}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">No. Telp / HP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="noTelp"
                                                                        name="noTelp"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.noTelp}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationBiodata.values.noTelp
                                                                            )
                                                                            vSetValidationBiodata.setFieldValue('noTelp', newVal)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.noTelp &&
                                                                            !!vSetValidationBiodata.errors?.noTelp}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.noTelp
                                                                        && !!vSetValidationBiodata.errors.noTelp && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.noTelp}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="noHp"
                                                                        name="noHp"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.noHp}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationBiodata.values.noHp
                                                                            )
                                                                            vSetValidationBiodata.setFieldValue('noHp', newVal)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.noHp &&
                                                                            !!vSetValidationBiodata.errors?.noHp}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.noHp
                                                                        && !!vSetValidationBiodata.errors.noHp && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.noHp}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Email</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="email"
                                                                        name="email"
                                                                        type="email"
                                                                        value={vSetValidationBiodata.values.email}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('email', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.email &&
                                                                            !!vSetValidationBiodata.errors?.email}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.email
                                                                        && !!vSetValidationBiodata.errors.email && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.email}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Pendidikan Terakhir</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="pendidikanTerakhir"
                                                                        name="pendidikanTerakhir"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('pendidikanTerakhir', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationBiodata.values.pendidikanTerakhir}
                                                                        className={`input row-header ${!!vSetValidationBiodata?.errors.pendidikanTerakhir ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationBiodata.touched.pendidikanTerakhir &&
                                                                        !!vSetValidationBiodata.errors.pendidikanTerakhir && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.pendidikanTerakhir}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Status Pernikahan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="statusPernikahan"
                                                                        name="statusPernikahan"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('statusPernikahan', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationBiodata.values.statusPernikahan}
                                                                        className={`input row-header ${!!vSetValidationBiodata?.errors.statusPernikahan ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationBiodata.touched.statusPernikahan &&
                                                                        !!vSetValidationBiodata.errors.statusPernikahan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.statusPernikahan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Nama Ibu Kandung</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="namaIbuKandung"
                                                                        name="namaIbuKandung"
                                                                        type="text"
                                                                        value={vSetValidationBiodata.values.namaIbuKandung}
                                                                        onChange={(e) => {
                                                                            vSetValidationBiodata.setFieldValue('namaIbuKandung', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationBiodata.touched?.namaIbuKandung &&
                                                                            !!vSetValidationBiodata.errors?.namaIbuKandung}
                                                                    />
                                                                    {vSetValidationBiodata.touched?.namaIbuKandung
                                                                        && !!vSetValidationBiodata.errors.namaIbuKandung && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationBiodata.errors.namaIbuKandung}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={12} className="mr-3 me-3 mt-2">
                                                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                                                <Button type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                                                                <Button type="button" color="danger" style={{ width: '20%' }}
                                                                // onClick={() => { handleBack() }}
                                                                >Batal</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTab} className="text-muted">
                                    <TabPane tabId="2" id="ttv-1">
                                        <Card>
                                            <CardBody>
                                                <Form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        vSetValidationAlamat.handleSubmit();
                                                        return false;
                                                    }}
                                                    className="gy-4"
                                                    action="#">
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={12}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Alamat KTP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Alamat</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="alamat"
                                                                        name="alamat"
                                                                        type="textarea"
                                                                        value={vSetValidationAlamat.values.alamat}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('alamat', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.alamat &&
                                                                            !!vSetValidationAlamat.errors?.alamat}
                                                                    />
                                                                    {vSetValidationAlamat.touched?.alamat
                                                                        && !!vSetValidationAlamat.errors.alamat && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.alamat}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">RT / RW</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="rt"
                                                                        name="rt"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.rt}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationAlamat.values.rt
                                                                            )
                                                                            vSetValidationAlamat.setFieldValue('rt', newVal)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.rt &&
                                                                            !!vSetValidationAlamat.errors?.rt}
                                                                    />
                                                                    {vSetValidationAlamat.touched?.rt
                                                                        && !!vSetValidationAlamat.errors.rt && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.rt}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="rw"
                                                                        name="rw"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.rw}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationAlamat.values.rw
                                                                            )
                                                                            vSetValidationAlamat.setFieldValue('rw', newVal)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.rw &&
                                                                            !!vSetValidationAlamat.errors?.rw}
                                                                    />
                                                                    {vSetValidationAlamat.touched?.rw
                                                                        && !!vSetValidationAlamat.errors.rw && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.rw}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Desa / Kelurahan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="desa"
                                                                        name="desa"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('desa', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationAlamat.values.desa}
                                                                        className={`input row-header ${!!vSetValidationAlamat?.errors.desa ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationAlamat.touched.desa &&
                                                                        !!vSetValidationAlamat.errors.desa && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.desa}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kode Pos</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="kodepos"
                                                                        name="kodepos"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.kodepos}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationAlamat.values.kodepos
                                                                            )
                                                                            vSetValidationAlamat.setFieldValue('kodepos', newVal)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.kodepos &&
                                                                            !!vSetValidationAlamat.errors?.kodepos}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.kodepos
                                                                        && !!vSetValidationAlamat.errors.kodepos && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.kodepos}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kecamatan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="kecamatan"
                                                                        name="kecamatan"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.kecamatan}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('kecamatan', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.kecamatan &&
                                                                            !!vSetValidationAlamat.errors?.kecamatan}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.kecamatan
                                                                        && !!vSetValidationAlamat.errors.kecamatan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.kecamatan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kabupaten</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="kabupaten"
                                                                        name="kabupaten"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('kabupaten', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationAlamat.values.kabupaten}
                                                                        className={`input row-header ${!!vSetValidationAlamat?.errors.kabupaten ? 'is-invalid' : ''
                                                                            }`}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched.kabupaten &&
                                                                        !!vSetValidationAlamat.errors.kabupaten && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.kabupaten}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Provinsi</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="provinsi"
                                                                        name="provinsi"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.provinsi}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('provinsi', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.provinsi &&
                                                                            !!vSetValidationAlamat.errors?.provinsi}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.provinsi
                                                                        && !!vSetValidationAlamat.errors.provinsi && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.provinsi}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={12}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Alamat Domisili</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <div className="form-check ms-2">
                                                                        <Input className="form-check-input" type="checkbox" id="formCheckCito"
                                                                            onChange={value => vSetValidationAlamat.setFieldValue('formCheckCito', value.target.checked)} />
                                                                        <Label className="form-check-label" htmlFor="formCheckCito" style={{ color: "black" }} >
                                                                            Sesuai dengan KTP
                                                                        </Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Alamat</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="alamatDomisili"
                                                                        name="alamatDomisili"
                                                                        type="textarea"
                                                                        value={vSetValidationAlamat.values.alamatDomisili}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('alamatDomisili', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.alamatDomisili &&
                                                                            !!vSetValidationAlamat.errors?.alamatDomisili}
                                                                    />
                                                                    {vSetValidationAlamat.touched?.alamatDomisili
                                                                        && !!vSetValidationAlamat.errors.alamatDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.alamatDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">RT / RW</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="rtDomisili"
                                                                        name="rtDomisili"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.rtDomisili}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationAlamat.values.rtDomisili
                                                                            )
                                                                            vSetValidationAlamat.setFieldValue('rtDomisili', newVal)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.rtDomisili &&
                                                                            !!vSetValidationAlamat.errors?.rtDomisili}
                                                                    />
                                                                    {vSetValidationAlamat.touched?.rtDomisili
                                                                        && !!vSetValidationAlamat.errors.rtDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.rtDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <Input
                                                                        id="rwDomisili"
                                                                        name="rwDomisili"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.rwDomisili}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationAlamat.values.rwDomisili
                                                                            )
                                                                            vSetValidationAlamat.setFieldValue('rwDomisili', newVal)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.rwDomisili &&
                                                                            !!vSetValidationAlamat.errors?.rwDomisili}
                                                                    />
                                                                    {vSetValidationAlamat.touched?.rwDomisili
                                                                        && !!vSetValidationAlamat.errors.rwDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.rwDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Desa / Kelurahan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="desaDomisili"
                                                                        name="desaDomisili"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('desaDomisili', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationAlamat.values.desaDomisili}
                                                                        className={`input row-header ${!!vSetValidationAlamat?.errors.desaDomisili ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationAlamat.touched.desaDomisili &&
                                                                        !!vSetValidationAlamat.errors.desaDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.desaDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kode Pos</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="kodeposDomisili"
                                                                        name="kodeposDomisili"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.kodeposDomisili}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationAlamat.values.kodeposDomisili
                                                                            )
                                                                            vSetValidationAlamat.setFieldValue('kodeposDomisili', newVal)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.kodeposDomisili &&
                                                                            !!vSetValidationAlamat.errors?.kodeposDomisili}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.kodeposDomisili
                                                                        && !!vSetValidationAlamat.errors.kodeposDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.kodeposDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kecamatan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="kecamatanDomisili"
                                                                        name="kecamatanDomisili"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.kecamatanDomisili}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('kecamatanDomisili', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.kecamatanDomisili &&
                                                                            !!vSetValidationAlamat.errors?.kecamatanDomisili}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.kecamatanDomisili
                                                                        && !!vSetValidationAlamat.errors.kecamatanDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.kecamatanDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Kabupaten</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="kabupatenDomisili"
                                                                        name="kabupatenDomisili"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('kabupatenDomisili', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationAlamat.values.kabupatenDomisili}
                                                                        className={`input row-header ${!!vSetValidationAlamat?.errors.kabupatenDomisili ? 'is-invalid' : ''
                                                                            }`}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched.kabupatenDomisili &&
                                                                        !!vSetValidationAlamat.errors.kabupatenDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.kabupatenDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Provinsi</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="provinsiDomisili"
                                                                        name="provinsiDomisili"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.provinsiDomisili}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('provinsiDomisili', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.provinsiDomisili &&
                                                                            !!vSetValidationAlamat.errors?.provinsiDomisili}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.provinsiDomisili
                                                                        && !!vSetValidationAlamat.errors.provinsiDomisili && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationAlamat.errors.provinsiDomisili}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTab} className="text-muted">
                                    <TabPane tabId="3" id="ttv-1">
                                        <Card>
                                            <CardBody>
                                                <Form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        vSetValidationStatusPegawai.handleSubmit();
                                                        return false;
                                                    }}
                                                    className="gy-4"
                                                    action="#">
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">No. SK</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="noSK"
                                                                        name="noSK"
                                                                        type="text"
                                                                        value={vSetValidationStatusPegawai.values.noSK}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('noSK', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationStatusPegawai.touched?.noSK &&
                                                                            !!vSetValidationStatusPegawai.errors?.noSK}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.noSK
                                                                        && !!vSetValidationStatusPegawai.errors.noSK && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.noSK}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">No. SIP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="noSIP"
                                                                        name="noSIP"
                                                                        type="text"
                                                                        value={vSetValidationStatusPegawai.values.noSIP}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('noSIP', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationStatusPegawai.touched?.noSIP &&
                                                                            !!vSetValidationStatusPegawai.errors?.noSIP}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.noSIP
                                                                        && !!vSetValidationStatusPegawai.errors.noSIP && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.noSIP}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">No. STR</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="noSTR"
                                                                        name="noSTR"
                                                                        type="text"
                                                                        value={vSetValidationStatusPegawai.values.noSTR}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('noSTR', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationStatusPegawai.touched?.noSTR &&
                                                                            !!vSetValidationStatusPegawai.errors?.noSTR}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.noSTR
                                                                        && !!vSetValidationStatusPegawai.errors.noSTR && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.noSTR}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">NPWP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="npwp"
                                                                        name="npwp"
                                                                        type="text"
                                                                        value={vSetValidationStatusPegawai.values.npwp}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationStatusPegawai.values.npwp
                                                                            )
                                                                            vSetValidationStatusPegawai.setFieldValue('npwp', newVal)
                                                                        }}
                                                                        invalid={vSetValidationStatusPegawai.touched?.npwp &&
                                                                            !!vSetValidationStatusPegawai.errors?.npwp}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.npwp
                                                                        && !!vSetValidationStatusPegawai.errors.npwp && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.npwp}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Golongan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="golongan"
                                                                        name="golongan"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('golongan', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.golongan}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.golongan ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.golongan &&
                                                                        !!vSetValidationStatusPegawai.errors.golongan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.golongan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Status Pegawai</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="statusPegawai"
                                                                        name="statusPegawai"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('statusPegawai', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.statusPegawai}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.statusPegawai ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.statusPegawai &&
                                                                        !!vSetValidationStatusPegawai.errors.statusPegawai && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.statusPegawai}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Profesi</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="profesi"
                                                                        name="profesi"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('profesi', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.profesi}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.profesi ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.profesi &&
                                                                        !!vSetValidationStatusPegawai.errors.profesi && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.profesi}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jabatan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="jabatan"
                                                                        name="jabatan"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('jabatan', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.jabatan}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.jabatan ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.jabatan &&
                                                                        !!vSetValidationStatusPegawai.errors.jabatan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.jabatan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Tgl. SK</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationStatusPegawai.touched?.tglSKStart &&
                                                                            !!vSetValidationStatusPegawai.errors?.tglSKStart}
                                                                        id="tglSKStart"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.tglSKStart}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('tglSKStart', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.tglSKStart
                                                                        && !!vSetValidationStatusPegawai.errors.tglSKStart && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.tglSKStart}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={1}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">s.d</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationStatusPegawai.touched?.tglSKend &&
                                                                            !!vSetValidationStatusPegawai.errors?.tglSKend}
                                                                        id="tglSKend"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.tglSKend}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('tglSKend', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.tglSKend
                                                                        && !!vSetValidationStatusPegawai.errors.tglSKend && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.tglSKend}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Tgl. Berlaku SIP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationStatusPegawai.touched?.tglSIPStart &&
                                                                            !!vSetValidationStatusPegawai.errors?.tglSIPStart}
                                                                        id="tglSIPStart"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.tglSIPStart}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('tglSIPStart', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.tglSIPStart
                                                                        && !!vSetValidationStatusPegawai.errors.tglSIPStart && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.tglSIPStart}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={1}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">s.d</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationStatusPegawai.touched?.tglSIPend &&
                                                                            !!vSetValidationStatusPegawai.errors?.tglSIPend}
                                                                        id="tglSIPend"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.tglSIPend}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('tglSIPend', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.tglSIPend
                                                                        && !!vSetValidationStatusPegawai.errors.tglSIPend && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.tglSIPend}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Tgl. Berlaku STR</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationStatusPegawai.touched?.tglSTRStart &&
                                                                            !!vSetValidationStatusPegawai.errors?.tglSTRStart}
                                                                        id="tglSTRStart"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.tglSTRStart}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('tglSTRStart', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.tglSTRStart
                                                                        && !!vSetValidationStatusPegawai.errors.tglSTRStart && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.tglSTRStart}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={1}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">s.d</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <KontainerFlatpickr
                                                                        isError={vSetValidationStatusPegawai.touched?.tglSTRend &&
                                                                            !!vSetValidationStatusPegawai.errors?.tglSTRend}
                                                                        id="tglSTRend"
                                                                        options={{
                                                                            dateFormat: 'Y-m-d',
                                                                            defaultDate: 'today',
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.tglSTRend}
                                                                        onChange={([newDate]) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('tglSTRend', newDate.toISOString())
                                                                        }}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.tglSTRend
                                                                        && !!vSetValidationStatusPegawai.errors.tglSTRend && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.tglSTRend}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Golongan PTKP</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <CustomSelect
                                                                        id="golonganPTKP"
                                                                        name="golonganPTKP"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('golonganPTKP', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.golonganPTKP}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.golonganPTKP ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.golonganPTKP &&
                                                                        !!vSetValidationStatusPegawai.errors.golonganPTKP && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.golonganPTKP}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jumlah Anak</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Input
                                                                        id="jumlahAnak"
                                                                        name="jumlahAnak"
                                                                        type="text"
                                                                        value={vSetValidationStatusPegawai.values.jumlahAnak}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationStatusPegawai.values.jumlahAnak
                                                                            )
                                                                            vSetValidationStatusPegawai.setFieldValue('jumlahAnak', newVal)
                                                                        }}
                                                                        invalid={vSetValidationStatusPegawai.touched?.jumlahAnak &&
                                                                            !!vSetValidationStatusPegawai.errors?.jumlahAnak}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.jumlahAnak
                                                                        && !!vSetValidationStatusPegawai.errors.jumlahAnak && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.jumlahAnak}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Jumlah Tanggungan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <Input
                                                                        id="jumlahTanggungan"
                                                                        name="jumlahTanggungan"
                                                                        type="text"
                                                                        value={vSetValidationStatusPegawai.values.jumlahTanggungan}
                                                                        onChange={(e) => {
                                                                            const newVal = onChangeStrNbr(
                                                                                e.target.value,
                                                                                vSetValidationStatusPegawai.values.jumlahTanggungan
                                                                            )
                                                                            vSetValidationStatusPegawai.setFieldValue('jumlahTanggungan', newVal)
                                                                        }}
                                                                        invalid={vSetValidationStatusPegawai.touched?.jumlahTanggungan &&
                                                                            !!vSetValidationStatusPegawai.errors?.jumlahTanggungan}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched?.jumlahTanggungan
                                                                        && !!vSetValidationStatusPegawai.errors.jumlahTanggungan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.jumlahTanggungan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Unit Pelayanan</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <CustomSelect
                                                                        id="unitPelayanan"
                                                                        name="unitPelayanan"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('unitPelayanan', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.unitPelayanan}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.unitPelayanan ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.unitPelayanan &&
                                                                        !!vSetValidationStatusPegawai.errors.unitPelayanan && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.unitPelayanan}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Unit Kerja</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={9}>
                                                                    <CustomSelect
                                                                        id="unitKerja"
                                                                        name="unitKerja"
                                                                        options={[]}
                                                                        onChange={(e) => {
                                                                            vSetValidationStatusPegawai.setFieldValue('unitKerja', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationStatusPegawai.values.unitKerja}
                                                                        className={`input row-header ${!!vSetValidationStatusPegawai?.errors.unitKerja ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationStatusPegawai.touched.unitKerja &&
                                                                        !!vSetValidationStatusPegawai.errors.unitKerja && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationStatusPegawai.errors.unitKerja}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default (BiodataPegawai)