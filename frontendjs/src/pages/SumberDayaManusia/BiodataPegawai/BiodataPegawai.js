import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import UiContent from "../../../Components/Common/UiContent";
import { Button, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { onChangeStrNbr, onChangeStrNbrNeg } from "../../../utils/format";
import CustomSelect from "../../Select/Select";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";
import {
    sdmResetForm, saveBiodataPegawai, getComboSDM, getPegawaiById, getUserRoleById, saveSignupUserRole,
    updateResetPassword
} from "../../../store/actions";
import { desaGet } from '../../../store/master/action';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import LoadingTable from "../../../Components/Table/LoadingTable";

const BiodataPegawai = () => {
    document.title = "Biodata Pegawai";
    const dispatch = useDispatch();
    const { idPegawai } = useParams();
    const [dateNow] = useState(() => new Date().toISOString())
    const { data, loading, dataCombo,
        newData, success, error, dataPegawai, dataDesa, dataUserRole,
        loadingUserRole, newDataSignup, newDataReset } = useSelector((state) => ({
            dataCombo: state.sumberDayaManusia.getComboSDM.data,
            newData: state.sumberDayaManusia.saveBiodataPegawai.data,
            success: state.sumberDayaManusia.saveBiodataPegawai.success,
            loading: state.sumberDayaManusia.saveBiodataPegawai.loading,
            error: state.sumberDayaManusia.saveBiodataPegawai.error,
            dataPegawai: state.sumberDayaManusia.getPegawaiById.data,
            dataDesa: state.Master.desaGet.data,
            dataUserRole: state.sumberDayaManusia.getUserRoleById.data,
            loadingUserRole: state.sumberDayaManusia.getUserRoleById.loading,
            newDataSignup: state.sumberDayaManusia.saveSignupUserRole.data,
            newDataReset: state.sumberDayaManusia.updateResetPassword.data,
        }));
    const vSetValidationBiodata = useFormik({
        enableReinitialize: true,
        initialValues: {
            task: 1,
            idPegawai: '',
            nip: '',
            gelardepan: '',
            namalengkap: '',
            gelarbelakang: '',
            namalengkap2: '',
            nik: '',
            inisialNama: '',
            jenisKelamin: '',
            tempatLahir: '',
            tglLahir: '',
            agama: '',
            golonganDarah: '',
            suku: '',
            noTelp: '',
            noHp: '',
            email: '',
            pendidikanTerakhir: '',
            statusPernikahan: '',
            namaIbuKandung: '',
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
            dispatch(saveBiodataPegawai(values, () => {

            }));
        }
    })
    const vSetValidationAlamat = useFormik({
        enableReinitialize: true,
        initialValues: {
            task: 2,
            idPegawai: '',
            alamat: '',
            rt: '',
            rw: '',
            desa: '',
            kodepos: '',
            kecamatan: '',
            kabupaten: '',
            provinsi: '',
            alamatDomisili: '',
            rtDomisili: '',
            rwDomisili: '',
            desaDomisili: '',
            kodeposDomisili: '',
            kecamatanDomisili: '',
            kabupatenDomisili: '',
            provinsiDomisili: '',
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(saveBiodataPegawai(values, () => {

            }));
        }
    })
    const vSetValidationStatusPegawai = useFormik({
        enableReinitialize: true,
        initialValues: {
            task: 3,
            idPegawai: '',
            noSK: '',
            noSIP: '',
            noSTR: '',
            npwp: '',
            golongan: '',
            statusPegawai: '',
            profesi: '',
            jabatan: '',
            tglSKStart: '',
            tglSKend: '',
            tglSIPStart: '',
            tglSIPend: '',
            tglSTRStart: '',
            tglSTRend: '',
            golonganPTKP: '',
            jumlahAnak: '',
            jumlahTanggungan: '',
            unitPelayanan: '',
            unitKerja: '',
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(saveBiodataPegawai(values, () => {

            }));
        }
    })
    const vSetValidationUserName = useFormik({
        enableReinitialize: true,
        initialValues: {
            task: 4,
            statusEnabled: '',
            username: '',
            roles: '',
            idUser: '',
            idpegawai: '',
            password: ''
        },
        validationSchema: Yup.object({
            statusEnabled: Yup.string().required("Status Enabled wajib diisi"),
            username: Yup.string().required("User Name wajib diisi"),
            roles: Yup.string().required("Role Applikasi wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            values.password = values.username + `@123`
            if (values.idpegawai === '') {
                toast.error("ID Pegawai Tidak Ada, Silahkan Kembali, dan masuk lagi", { autoClose: 3000 });
                return
            }
            dispatch(saveSignupUserRole(values, () => {
                resetForm()
                dispatch(getUserRoleById({ idPegawai: idPegawai }))
            }));
        }
    })
    useEffect(() => {
        return () => {
            dispatch(sdmResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(getComboSDM())
        dispatch(desaGet(''));
    }, [dispatch])
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
    const dataStatusEnabled = [
        {
            value: 1,
            label: "Aktif",
        },
        {
            value: 2,
            label: "Non Aktif",
        },
    ];
    // Pills
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggleBilling = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    useEffect(() => {
        const setFF = vSetValidationBiodata.setFieldValue
        const setFF2 = vSetValidationAlamat.setFieldValue
        const setFF3 = vSetValidationStatusPegawai.setFieldValue
        const setFF4 = vSetValidationUserName.setFieldValue
        if (newData !== null) {
            if (newData?.pegawai?.id !== undefined) {
                setFF('idPegawai', newData.pegawai.id)
                setFF2('idPegawai', newData.pegawai.id)
                setFF3('idPegawai', newData.pegawai.id)
                setFF4('idpegawai', newData.pegawai.id)
            }
        }
    }, [newData, vSetValidationBiodata.setFieldValue, vSetValidationAlamat.setFieldValue, vSetValidationStatusPegawai.setFieldValue, success,
        vSetValidationUserName.setFieldValue])
    // useEffect(() => {
    //     if (newDataSignup !== null && newDataSignup !== undefined) {
    //         dispatch(getUserRoleById({ idPegawai: idPegawai }))
    //     }
    // }, [newDataSignup, dispatch, idPegawai])
    useEffect(() => {
        if (idPegawai !== undefined) {
            const setFF = vSetValidationBiodata.setFieldValue
            setFF("idPegawai", idPegawai)
            const setFF2 = vSetValidationAlamat.setFieldValue
            setFF2("idPegawai", idPegawai)
            const setFF3 = vSetValidationStatusPegawai.setFieldValue
            setFF3("idPegawai", idPegawai)
            const setFF4 = vSetValidationUserName.setFieldValue
            setFF4("idpegawai", parseFloat(idPegawai))
            dispatch(getPegawaiById({ idPegawai: idPegawai }))
            dispatch(getUserRoleById({ idPegawai: idPegawai }))
        }
    }, [idPegawai, dispatch, vSetValidationBiodata.setFieldValue, vSetValidationAlamat.setFieldValue, vSetValidationStatusPegawai.setFieldValue,
        vSetValidationUserName.setFieldValue])
    useEffect(() => {
        const setFF = vSetValidationBiodata.setFieldValue
        const setFF2 = vSetValidationAlamat.setFieldValue
        const setFF3 = vSetValidationStatusPegawai.setFieldValue
        if (dataPegawai[0] !== undefined) {
            if (dataPegawai[0]?.namalengkap !== undefined) {
                setFF('gelardepan', dataPegawai[0]?.gelardepan)
                setFF('gelarbelakang', dataPegawai[0]?.gelarbelakang)
                setFF('namalengkap', dataPegawai[0]?.nama)
                setFF('nik', dataPegawai[0]?.noidentitas)
                setFF('nip', dataPegawai[0]?.nip)
                setFF('inisialNama', dataPegawai[0]?.reportdisplay)
                setFF('jenisKelamin', dataPegawai[0]?.objectjeniskelaminfk)
                setFF('tempatLahir', dataPegawai[0]?.tempatlahir)
                setFF('tglLahir', dataPegawai[0]?.tgllahir)
                setFF('objectagamafk', dataPegawai[0]?.agama)
                setFF('golonganDarah', dataPegawai[0]?.objectgolongandarahfk)
                setFF('objectetnisfk', dataPegawai[0]?.suku)
                setFF('noTelp', dataPegawai[0]?.notlp)
                setFF('noHp', dataPegawai[0]?.nohandphone)
                setFF('email', dataPegawai[0]?.email)
                setFF('pendidikanTerakhir', dataPegawai[0]?.objectpendidikanterakhirfk)
                setFF('statusPernikahan', dataPegawai[0]?.objectstatusperkawinanpegawaifk)
                setFF('namaIbuKandung', dataPegawai[0]?.namaibu)
                setFF('agama', dataPegawai[0]?.objectagamafk)
                setFF('suku', dataPegawai[0]?.objectetnisfk)
                setFF2('alamat', dataPegawai[0]?.alamatktp)
                setFF2('rt', dataPegawai[0]?.rtktp)
                setFF2('rw', dataPegawai[0]?.rwktp)
                setFF2('desa', dataPegawai[0]?.objectdesakelurahanktpfk)
                setFF2('alamatDomisili', dataPegawai[0]?.alamatdom)
                setFF2('rtDomisili', dataPegawai[0]?.rtdom)
                setFF2('rwDomisili', dataPegawai[0]?.rwdom)
                setFF2('desaDomisili', dataPegawai[0]?.objectdesakelurahandomfk)

                setFF3('noSK', dataPegawai[0]?.nosk)
                setFF3('noSIP', dataPegawai[0]?.nosip)
                setFF3('noSTR', dataPegawai[0]?.nostr)
                setFF3('npwp', dataPegawai[0]?.npwp)
                setFF3('golongan', dataPegawai[0]?.objectgolonganfk)
                setFF3('statusPegawai', dataPegawai[0]?.objectstatuspegawaifk)
                setFF3('profesi', dataPegawai[0]?.objectprofesipegawaifk)
                setFF3('jabatan', dataPegawai[0]?.objectjabatanfk)
                setFF3('tglSKStart', dataPegawai[0]?.tglmasuk)
                setFF3('tglSKend', dataPegawai[0]?.tglpensiun)
                setFF3('tglSIPStart', dataPegawai[0]?.tglterbitsip)
                setFF3('tglSIPend', dataPegawai[0]?.tglberakhirsip)
                setFF3('tglSTRStart', dataPegawai[0]?.tglterbitstr)
                setFF3('tglSTRend', dataPegawai[0]?.tglberakhirstr)
                setFF3('golonganPTKP', dataPegawai[0]?.objectgolonganptkpfk)
                setFF3('jumlahAnak', dataPegawai[0]?.qtyanak)
                setFF3('jumlahTanggungan', dataPegawai[0]?.qtytanggungan)
                setFF3('unitPelayanan', dataPegawai[0]?.objectunitfk)
                setFF3('unitKerja', dataPegawai[0]?.objectunitkerjafk)
            }
        }
    }, [dataPegawai, vSetValidationBiodata.setFieldValue, vSetValidationAlamat.setFieldValue, vSetValidationStatusPegawai.setFieldValue])
    const handleDesa = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(desaGet(characterEntered));
            // }, [dispatch]);
        }
    };
    const handleChangeDesa = (selected) => {
        vSetValidationAlamat.setFieldValue('desa', selected?.value || "")
        vSetValidationAlamat.setFieldValue('kecamatan', selected?.namakecamatan || "")
        vSetValidationAlamat.setFieldValue('kabupaten', selected?.namakabupaten || "")
        vSetValidationAlamat.setFieldValue('provinsi', selected?.namaprovinsi || "")
        vSetValidationAlamat.setFieldValue('kodepos', selected?.kodepos || "")
        // console.log(selected);
    };
    const handleChangeDesaDomisili = (selected) => {
        vSetValidationAlamat.setFieldValue('desaDomisili', selected?.value || "")
        vSetValidationAlamat.setFieldValue('kecamatanDomisili', selected?.namakecamatan || "")
        vSetValidationAlamat.setFieldValue('kabupatenDomisili', selected?.namakabupaten || "")
        vSetValidationAlamat.setFieldValue('provinsiDomisili', selected?.namaprovinsi || "")
        vSetValidationAlamat.setFieldValue('kodeposDomisili', selected?.kodepos || "")
        // console.log(selected);
    };
    const handleDesaDomisili = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(desaGet(characterEntered));
            // }, [dispatch]);
        }
    };
    const handleCheck = (e) => {
        vSetValidationAlamat.setFieldValue('formCheckCito', e)
        if (e === true) {
            vSetValidationAlamat.setFieldValue('desaDomisili', vSetValidationAlamat.values.desa || "")
            vSetValidationAlamat.setFieldValue('kecamatanDomisili', vSetValidationAlamat.values.kecamatan || "")
            vSetValidationAlamat.setFieldValue('kabupatenDomisili', vSetValidationAlamat.values.kabupaten || "")
            vSetValidationAlamat.setFieldValue('provinsiDomisili', vSetValidationAlamat.values.provinsi || "")
            vSetValidationAlamat.setFieldValue('kodeposDomisili', vSetValidationAlamat.values.kodepos || "")
            vSetValidationAlamat.setFieldValue('alamatDomisili', vSetValidationAlamat.values.alamat || "")
            vSetValidationAlamat.setFieldValue('rtDomisili', vSetValidationAlamat.values.rt || "")
            vSetValidationAlamat.setFieldValue('rwDomisili', vSetValidationAlamat.values.rw || "")
        } else {
            vSetValidationAlamat.setFieldValue('desaDomisili', "")
            vSetValidationAlamat.setFieldValue('kecamatanDomisili', "")
            vSetValidationAlamat.setFieldValue('kabupatenDomisili', "")
            vSetValidationAlamat.setFieldValue('provinsiDomisili', "")
            vSetValidationAlamat.setFieldValue('kodeposDomisili', "")
            vSetValidationAlamat.setFieldValue('alamatDomisili', "")
            vSetValidationAlamat.setFieldValue('rtDomisili', "")
            vSetValidationAlamat.setFieldValue('rwDomisili', "")
        }
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
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Status Enabled</span>,
            selector: row => row.status,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>User Name</span>,
            selector: row => row.username,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            width: "160px",
            wrap: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Role</span>,
            selector: row => row.namerole,
            sortable: true,
            width: "150px"
        },
    ];
    const [disabledUsername, setdisabledUsername] = useState(false);
    const handleClick = (e) => {
        vSetValidationUserName.setFieldValue('statusEnabled', 2)
        if (e.status === 'AKTIF') {
            vSetValidationUserName.setFieldValue('statusEnabled', 1)
        }
        setdisabledUsername(true)
        vSetValidationUserName.setFieldValue('username', e.username)
        vSetValidationUserName.setFieldValue('roles', e.idrole)
        vSetValidationUserName.setFieldValue('idUser', e.id)
    };
    const handleClickBatal = (e) => {
        setdisabledUsername(false)
        vSetValidationUserName.setFieldValue('statusEnabled', '')
        vSetValidationUserName.setFieldValue('username', '')
        vSetValidationUserName.setFieldValue('roles', '')
        vSetValidationUserName.setFieldValue('idUser', '')
    }
    const handleClickResetPassword = (e) => {
        if (vSetValidationUserName.values.idUser === '') {
            toast.error("Role Pasien Belum Dipilih", { autoClose: 3000 });
            return
        }
        const values = {
            idUser: vSetValidationUserName.values.idUser,
            password: vSetValidationUserName.values.username + `@123`
        }
        dispatch(updateResetPassword(values, () => {
            // resetForm()
        }));
    }
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
                                                {" "}{item.label}
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
                                                                        value={vSetValidationBiodata.values.gelardepan + vSetValidationBiodata.values.namalengkap + vSetValidationBiodata.values.gelarbelakang}
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
                                                                            vSetValidationBiodata.setFieldValue('nik', e.target.value)
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
                                                                        options={dataCombo.jenisKelamin}
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
                                                                        options={dataCombo.agama}
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
                                                                        options={dataCombo.golonganDarah}
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
                                                                        options={dataCombo.etnis}
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
                                                                            vSetValidationBiodata.setFieldValue('noTelp', e.target.value)
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
                                                                            vSetValidationBiodata.setFieldValue('noHp', e.target.value)
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
                                                                        options={dataCombo.pendidikan}
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
                                                                        options={dataCombo.perkawinan}
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
                                                                <Button

                                                                    type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
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
                                                                            vSetValidationAlamat.setFieldValue('rt', e.target.value)
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
                                                                            vSetValidationAlamat.setFieldValue('rw', e.target.value)
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
                                                                        options={dataDesa}
                                                                        onChange={handleChangeDesa}
                                                                        onInputChange={handleDesa}
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
                                                                    <Input
                                                                        id="kabupaten"
                                                                        name="kabupaten"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.kabupaten}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('kabupaten', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.kabupaten &&
                                                                            !!vSetValidationAlamat.errors?.kabupaten}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.kabupaten
                                                                        && !!vSetValidationAlamat.errors.kabupaten && (
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
                                                                            onChange={value =>
                                                                                // vSetValidationAlamat.setFieldValue('formCheckCito', value.target.checked)} 
                                                                                handleCheck(value.target.checked)}
                                                                        />
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
                                                                        options={dataDesa}
                                                                        onChange={handleChangeDesaDomisili}
                                                                        onInputChange={handleDesaDomisili}
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
                                                                    <Input
                                                                        id="kabupatenDomisili"
                                                                        name="kabupatenDomisili"
                                                                        type="text"
                                                                        value={vSetValidationAlamat.values.kabupatenDomisili}
                                                                        onChange={(e) => {
                                                                            vSetValidationAlamat.setFieldValue('kabupatenDomisili', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationAlamat.touched?.kabupatenDomisili &&
                                                                            !!vSetValidationAlamat.errors?.kabupatenDomisili}
                                                                        disabled
                                                                    />
                                                                    {vSetValidationAlamat.touched?.kabupatenDomisili
                                                                        && !!vSetValidationAlamat.errors.kabupatenDomisili && (
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
                                                        <Col lg={12} className="mr-3 me-3 mt-2">
                                                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                                                <Button

                                                                    type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
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
                                                                            vSetValidationStatusPegawai.setFieldValue('npwp', e.target.value)
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
                                                                        options={dataCombo.golonganPegawai}
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
                                                                        options={dataCombo.statusPegawai}
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
                                                                        options={dataCombo.profesi}
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
                                                                        options={dataCombo.jabatan}
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
                                                                        value={vSetValidationStatusPegawai.values.tglSKStart || dateNow}
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
                                                                        value={vSetValidationStatusPegawai.values.tglSKend || dateNow}
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
                                                                        value={vSetValidationStatusPegawai.values.tglSIPStart || dateNow}
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
                                                                        value={vSetValidationStatusPegawai.values.tglSIPend || dateNow}
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
                                                                        value={vSetValidationStatusPegawai.values.tglSTRStart || dateNow}
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
                                                                        value={vSetValidationStatusPegawai.values.tglSTRend || dateNow}
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
                                                                        options={dataCombo.golonganPtkp}
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
                                                                        options={dataCombo.unit}
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
                                                                        options={dataCombo.unitKerja}
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
                                                        <Col lg={12} className="mr-3 me-3 mt-2">
                                                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                                                <Button

                                                                    type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
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
                                    <TabPane tabId="4" id="ttv-1">
                                        <Card>
                                            <CardBody>
                                                <Form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        vSetValidationUserName.handleSubmit();
                                                        return false;
                                                    }}
                                                    className="gy-4"
                                                    action="#">
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div id="table-gridjs">
                                                                <DataTable
                                                                    fixedHeader
                                                                    fixedHeaderScrollHeight="330px"
                                                                    columns={columns}
                                                                    pagination
                                                                    data={dataUserRole}
                                                                    progressPending={loadingUserRole}
                                                                    customStyles={tableCustomStyles}
                                                                    progressComponent={<LoadingTable />}
                                                                    onRowClicked={(row) => handleClick(row)}
                                                                    pointerOnHover
                                                                    highlightOnHover
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Row className="gy-2">
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Status Enabled</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="statusEnabled"
                                                                        name="statusEnabled"
                                                                        options={dataStatusEnabled}
                                                                        isClearEmpty
                                                                        onChange={(e) => {
                                                                            vSetValidationUserName.setFieldValue('statusEnabled', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationUserName.values.statusEnabled}
                                                                        className={`input row-header ${!!vSetValidationUserName?.errors.statusEnabled ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationUserName.touched.statusEnabled &&
                                                                        !!vSetValidationUserName.errors.statusEnabled && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationUserName.errors.statusEnabled}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">User Name</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <Input
                                                                        id="username"
                                                                        name="username"
                                                                        type="text"
                                                                        value={vSetValidationUserName.values.username}
                                                                        onChange={(e) => {
                                                                            vSetValidationUserName.setFieldValue('username', e.target.value)
                                                                        }}
                                                                        invalid={vSetValidationUserName.touched?.username &&
                                                                            !!vSetValidationUserName.errors?.username}
                                                                        disabled={disabledUsername}
                                                                    />
                                                                    {vSetValidationUserName.touched?.username
                                                                        && !!vSetValidationUserName.errors.username && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationUserName.errors.username}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                                <Col lg={4}>
                                                                    <div className="mt-2">
                                                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Role</Label>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={8}>
                                                                    <CustomSelect
                                                                        id="roles"
                                                                        name="roles"
                                                                        options={dataCombo.roles}
                                                                        isClearEmpty
                                                                        onChange={(e) => {
                                                                            vSetValidationUserName.setFieldValue('roles', e?.value || '')
                                                                        }}
                                                                        value={vSetValidationUserName.values.roles}
                                                                        className={`input row-header ${!!vSetValidationUserName?.errors.roles ? 'is-invalid' : ''
                                                                            }`}
                                                                    />
                                                                    {vSetValidationUserName.touched.roles &&
                                                                        !!vSetValidationUserName.errors.roles && (
                                                                            <FormFeedback type="invalid">
                                                                                <div>{vSetValidationUserName.errors.roles}</div>
                                                                            </FormFeedback>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg={12} className="mr-3 me-3 mt-2">
                                                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                                                <Button

                                                                    type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                                                                <Button type="button" color="danger" style={{ width: '20%' }}
                                                                    onClick={() => { handleClickBatal() }}
                                                                >Batal</Button>
                                                                <Button type="button" color="warning" style={{ width: '20%' }}
                                                                    onClick={() => { handleClickResetPassword() }}
                                                                >Reset Password</Button>
                                                            </div>
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