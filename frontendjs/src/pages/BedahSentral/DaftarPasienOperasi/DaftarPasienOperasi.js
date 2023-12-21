import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import UiContent from "../../../Components/Common/UiContent"
import {
    Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Modal,
    ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb"
import { ToastContainer, toast } from "react-toastify"
import classnames from "classnames";
import {
    bedahSentralResetForm, getDaftarPasienOperasi,
    getComboOrderOperasi
} from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux"
import pria from "../../../assets/images/svg/pria.svg"
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../../Select/Select";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";
import { Link, useNavigate } from "react-router-dom";

const DaftarPasienOperasi = () => {
    document.title = "Daftar Pasien Operasi";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { datawidget, data, dataCombo } = useSelector((state) => ({
        datawidget: state.BedahSentral.widgetOrderOperasiGet.data,
        data: state.BedahSentral.getDaftarPasienOperasi.data,
        dataCombo: state.Master.comboRegistrasiGet.data,
    }));
    const [dateNow] = useState(() => new Date().toISOString())
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            dateStart: dateNow,
            dateEnd: dateNow,
            unitOrder: '',
            search: ''
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(getDaftarPasienOperasi({
                dateStart: vSetValidation.values.dateStart,
                dateEnd: vSetValidation.values.dateEnd,
                unitOrder: vSetValidation.values.unitOrder,
                search: vSetValidation.values.search,
                status: 2
            }));
        }
    })
    const [selectedPasien, setselectedPasien] = useState(null);
    const handleCard = (item) => {
        // console.log(item)
        // setnamaPasien(item.namapasien)
        setselectedPasien(item)
        const itemIndex = datax.findIndex((dataItem) => dataItem.norec === item.norec);
        if (itemIndex !== -1) {
            const updatedData = [...datax];
            for (let i = 0; i < updatedData.length; i++) {
                if (i !== itemIndex) {
                    updatedData[i].color = '#FFFFFF';
                } else {
                    updatedData[i].color = '#F2E9CA';
                }
            }
            setDatax(updatedData);
        }
    };
    const [dataUnit, setdataUnit] = useState([]);
    const handleInputUnit = characterEntered => {
        if (characterEntered.length > 3) {
            var newArray = dataCombo.unit.filter(function (el) {
                return el.objectinstalasifk === 1;
            });
            setdataUnit(newArray)
        }
    }
    const handleBeginOnChangeStart = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        vSetValidation.setFieldValue('dateStart', dateString)
    }
    const handleBeginOnChangeEnd = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        vSetValidation.setFieldValue('dateEnd', dateString)
    }
    // Pills Tabs
    const [pillsTab, setpillsTab] = useState("3");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    const handleClickButton = (e) => {
        if (selectedPasien === null) {
            toast.error("Pasien Belum Dipilih", { autoClose: 3000 });
            return
        }

        if (e === 'Pengkajian') {
            history(`/emr-pasien/${selectedPasien.norecdp}/${selectedPasien.norecta}/rawat-jalan`)
        }

    };
    useEffect(() => {
        dispatch(getDaftarPasienOperasi({
            dateStart: vSetValidation.values.dateStart,
            dateEnd: vSetValidation.values.dateEnd,
            unitOrder: vSetValidation.values.unitOrder,
            status: 2
        }));
    }, [dispatch, vSetValidation.values.dateStart, vSetValidation.values.dateEnd, vSetValidation.values.unitOrder])
    const [datax, setDatax] = useState([]);
    useEffect(() => {
        setDatax(data)
    }, [setDatax, data])
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Operasi" pageTitle="Forms" />
                    <Card>
                        <Row>
                            <Col lg={3}>
                                <Card>
                                    <CardBody className="p-4 text-center">
                                        <div className="mx-auto avatar-md mb-3">
                                            <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                <h2 className="ff-secondary fw-semibold">
                                                    <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                        {/* <img src={pria} alt="" className="img-fluid rounded-circle" /> */}
                                                        {selectedPasien?.profile === 'baby' ? (
                                                            <img src={baby} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'dewasalaki' ? (
                                                            <img src={pria} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'anaklaki' ? (
                                                            <img src={anaklaki} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'anakperempuan' ? (
                                                            <img src={anakperempuan} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'dewasaperempuan' ? (
                                                            <img src={dewasaperempuan} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'kakek' ? (
                                                            <img src={kakek} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'nenek' ? (
                                                            <img src={nenek} alt="" className="img-fluid rounded-circle" />
                                                        ) : (
                                                            // Render when none of the conditions are met
                                                            <p>No profile image available</p>
                                                        )}
                                                    </span>
                                                </h2>
                                            </span>
                                        </div>
                                        <h5 className="card-title mb-1">{selectedPasien && selectedPasien.namapasien ? selectedPasien.namapasien : '-'}</h5>
                                        <p className="text-muted mb-0">{selectedPasien && selectedPasien.jeniskelamin ? selectedPasien.jeniskelamin : '-'}</p>
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
                                                                        <th className="ps-0" scope="row">Tgl. Order :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.tglinputx ? selectedPasien.tglinputx : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Rencana Operasi :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.tglrencana ? selectedPasien.tglrencana : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Kelas :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.namakelas ? selectedPasien.namakelas : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Penjamin :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.jenispenjamin ? selectedPasien.jenispenjamin : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Diorder Oleh :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.pengorder ? selectedPasien.pengorder : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Diagnosa :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.kodeexternal ? selectedPasien.kodeexternal : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Keterangan :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.catatanorder ? selectedPasien.catatanorder : '-'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Nama Operasi :</th>
                                                                        <td className="text-muted">{selectedPasien && selectedPasien.namaoperasi ? selectedPasien.namaoperasi : '-'}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </TabPane>
                                            <TabPane tabId="2" id="home-1">
                                                <Card>
                                                    <CardBody>
                                                        <div className="table-responsive">

                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </TabPane>
                                            <TabPane tabId="3" id="home-1">
                                                <Card>
                                                    <CardBody>
                                                        <div className="live-preview">
                                                            <div className="d-flex flex-column gap-2">
                                                                <Button color="info" className="btn-animation" data-text="Pengkajian"
                                                                    onClick={() => handleClickButton('Pengkajian')}
                                                                ><span>Pengkajian</span></Button>
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
                                <Card>
                                    <CardHeader>
                                        <Form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                vSetValidation.handleSubmit();
                                                return false;
                                            }}
                                            className="gy-4"
                                            action="#">
                                            <Row className="gy-4">
                                                <Col sm={3}>
                                                    <KontainerFlatpickr
                                                        options={{
                                                            // mode: "range",
                                                            dateFormat: "Y-m-d",
                                                            defaultDate: "today"
                                                        }}
                                                        value={dateNow}
                                                        onChange={([dateStart]) => {
                                                            handleBeginOnChangeStart(dateStart);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={1}><h4 className='mt-2 text-center'>s/d</h4></Col>
                                                <Col sm={3}>
                                                    <KontainerFlatpickr
                                                        isError={false}
                                                        options={{
                                                            // mode: "range",
                                                            dateFormat: "Y-m-d",
                                                            defaultDate: "today"
                                                        }}
                                                        value={dateNow}
                                                        onChange={([dateEnd]) => {
                                                            handleBeginOnChangeEnd(dateEnd);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={2}>
                                                    <CustomSelect
                                                        id="unitOrder"
                                                        name="unitOrder"
                                                        options={dataUnit}
                                                        onChange={(e) => {
                                                            vSetValidation.setFieldValue('unitOrder', e?.value || '')
                                                        }}
                                                        value={vSetValidation.values.unitOrder}
                                                        className={`input row-header ${!!vSetValidation?.errors.unitOrder ? 'is-invalid' : ''
                                                            }`}
                                                        onInputChange={handleInputUnit}
                                                    />
                                                    {vSetValidation.touched.unitOrder &&
                                                        !!vSetValidation.errors.unitOrder && (
                                                            <FormFeedback type="invalid">
                                                                <div>{vSetValidation.errors.unitOrder}</div>
                                                            </FormFeedback>
                                                        )}
                                                </Col>
                                                <Col lg={2}>
                                                    <Input
                                                        id="search"
                                                        name="search"
                                                        type="text"
                                                        placeholder='Search...'
                                                        value={vSetValidation.values.search}
                                                        onChange={(e) => {
                                                            vSetValidation.setFieldValue('search', e.target.value)
                                                        }}
                                                        invalid={vSetValidation.touched?.search &&
                                                            !!vSetValidation.errors?.search}
                                                    />
                                                    {vSetValidation.touched?.search
                                                        && !!vSetValidation.errors.search && (
                                                            <FormFeedback type="invalid">
                                                                <div>{vSetValidation.errors.search}</div>
                                                            </FormFeedback>
                                                        )}
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="submit" color="info" placement="top">
                                                        CARI
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardHeader>
                                    <CardBody>
                                        <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                            {(datax || []).map((item, key) => (
                                                <React.Fragment key={key}>
                                                    <Card className="product card-animate" style={{ backgroundColor: item.color }}
                                                        onClick={() => { handleCard(item) }}
                                                    >
                                                        <CardBody>
                                                            <Row className="gy-3">
                                                                <h6 className="card-title mb-0"><span className="badge align-middle fs-10" style={{ backgroundColor: item.colorjenisoperasi, color: "black" }}>{item.jenisoperasi}</span></h6>
                                                                <div className="col-sm-auto">
                                                                    <div className="avatar-md flex-shrink-0">
                                                                        <span className={"avatar-title rounded-circle fs-4"} style={{ backgroundColor: item.statusdarurat }}>
                                                                            <h2 className="ff-secondary fw-semibold">
                                                                                <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                                                    {item.profile === 'baby' ? (
                                                                                        <img src={baby} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : item.profile === 'dewasalaki' ? (
                                                                                        <img src={pria} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : item.profile === 'anaklaki' ? (
                                                                                        <img src={anaklaki} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : item.profile === 'anakperempuan' ? (
                                                                                        <img src={anakperempuan} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : item.profile === 'dewasaperempuan' ? (
                                                                                        <img src={dewasaperempuan} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : item.profile === 'kakek' ? (
                                                                                        <img src={kakek} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : item.profile === 'nenek' ? (
                                                                                        <img src={nenek} alt="" className="img-fluid rounded-circle" />
                                                                                    ) : (
                                                                                        // Render when none of the conditions are met
                                                                                        <p>No profile image available</p>
                                                                                    )}

                                                                                </span>
                                                                            </h2>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <h5 className="card-title mb-1">{item.nocm ? item.nocm : '-'} / {item.noregistrasi ? item.noregistrasi : '-'}</h5>
                                                                    <p className="mb-0">
                                                                        {item.namapasien && item.namapasien.length > 20
                                                                            ? `${item.namapasien.substring(0, 20)}...`
                                                                            : item.namapasien}
                                                                    </p>
                                                                    <p className="text-muted mb-0">{item.umur ? item.umur : '-'}</p>
                                                                    <p className="text-muted mb-0">{item.statusoperasi ? item.statusoperasi : '-'}</p>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="text-lg-start">
                                                                        <p className="text-muted mb-0">Poli Order {item.namaunit}</p>
                                                                        <p className="text-muted mb-0">Tgl. Order {item.tglinputx ? item.tglinputx : '-'}</p>
                                                                        <p className="text-muted mb-0">Jadwal Operasi {item.tglrencana ? item.tglrencana : '-'}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="text-lg-start">
                                                                        <p className="text-muted mb-0">Operasi : {item.namaoperasi ? item.namaoperasi : '-'}</p>
                                                                        <p className="text-muted mb-0">dr. Operator : {item.namalengkap ? item.namalengkap : '-'}</p>
                                                                        <p className="text-muted mb-0">Diagnosa : {item.kodeexternal ? item.kodeexternal : '-'}</p>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default withRouter(DaftarPasienOperasi)