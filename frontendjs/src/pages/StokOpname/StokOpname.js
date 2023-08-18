import { ToastContainer } from "react-toastify";
import { 
    Button,
    Card, 
    CardBody, 
    CardHeader, 
    Col, 
    Container, 
    Dropdown, 
    DropdownMenu, 
    DropdownToggle, 
    FormFeedback, 
    Input, 
    Label, 
    Modal, 
    ModalBody, 
    Nav,
    NavItem,
    NavLink,
    Row,
    TabPane
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { 
    useNavigate, 
    useParams 
} from "react-router-dom";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getComboStokOpname } from "../../store/master/action";


const linkStokOpname = "/farmasi/gudang/stok-opname"

const StokOpname = () => {
    const navigate = useNavigate();
    const { tabopen } = useParams();
    const [ isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const [dateNow] = useState(() => (new Date()).toISOString());

    const {
        unit
    } = useSelector((state) => ({
        unit: state.Master.getComboStokOpname?.data?.unit
    }))

    const vJadwal = useFormik({
        initialValues: {
            tanggalawal: dateNow,
            tanggalakhir: dateNow,
            unitso: "",
            keteranganso: ""
        },
        onSubmit: async (values) => {
        
        }
    })

    useEffect(() => {
        dispatch(getComboStokOpname())
    }, [dispatch])
            
    return (
        <div className="page-content page-list-penerimaan">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="List produk" pageTitle="List Produk" />
                <Card className="p-5">
                    <div className="card-header align-items-center d-flex">
                        <div className="flex-shrink-0 ms-2">
                            <Nav tabs 
                                className="nav justify-content-end 
                                nav-tabs-custom rounded card-header-tabs 
                                border-bottom-0">
                                <NavItem>
                                    <NavLink 
                                        style={{ cursor: "pointer", fontWeight: "bold" }} 
                                        className={classnames({ active: tabopen === "daftar-stok-opname", })} 
                                        onClick={() => { navigate(linkStokOpname + "/daftar-stok-opname"); }} >
                                        Tambah Produk
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        style={{ cursor: "pointer", fontWeight: "bold" }} 
                                        className={classnames({ active: tabopen === "edit-stok-opname", })} 
                                        onClick={() => { navigate(linkStokOpname + "/edit-stok-opname"); }} >
                                        Konversi Produk
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    <CardBody>
                        <TabPane tabId={"daftar-stok-opname"} id="daftar-stok-opname">
                            <Button 
                                color={"info"}
                                type="button"
                                onClick={() => setIsMenuOpen(true)}>
                                Menu
                            </Button>
                            <Modal isOpen={isMenuOpen} toggle={() => {setIsMenuOpen(!isMenuOpen)}}>
                                <ModalBody>
                                    <Row className="mb-3">
                                        <h2 className="text-center mt-2 fs-6">
                                            Jadwal Stok Opname
                                        </h2>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col lg={6}>
                                            Tanggal Awal
                                        </Col>
                                        <Col lg={6}>
                                            <Flatpickr
                                                // value={penerimaan.tglregistrasi || ""}
                                                className="form-control"
                                                id="tanggalawal"
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                    defaultDate: "today"
                                                }}
                                                onChange={([newDate]) => {
                                                    vJadwal.setFieldValue("tanggalawal", newDate.toISOString());
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col lg={6}>
                                            Tanggal Akhir
                                        </Col>
                                        <Col lg={6}>
                                            <Flatpickr
                                                // value={penerimaan.tglregistrasi || ""}
                                                className="form-control"
                                                id="tanggalakhir"
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                    defaultDate: "today"
                                                }}
                                                onChange={([newDate]) => {
                                                    vJadwal.setFieldValue("tanggalakhir", newDate.toISOString());
                                                }}
                                            />
                                        </Col>
                                        </Row>
                                    <Row className="mb-2">
                                        <Col lg={6}>
                                            <Label 
                                                style={{ color: "black" }} 
                                                htmlFor={`unitso`}
                                                className="form-label">
                                                Keterangan Order
                                            </Label>
                                        </Col>
                                        <Col lg={6}>
                                            <CustomSelect
                                                id="unitso"
                                                name="unitso"
                                                options={unit}
                                                value={vJadwal.values.unitso}
                                                onChange={(val) => {
                                                    vJadwal.setFieldValue("unitso", val.value)
                                                }}
                                                className={`input 
                                                    ${vJadwal.errors?.unitso 
                                                        ? "is-invalid" 
                                                        : ""
                                                    }`}
                                                />
                                            {vJadwal.touched?.unitso 
                                                && !!vJadwal.errors?.unitso && (
                                                <FormFeedback type="invalid" >
                                                    <div>
                                                        {vJadwal.errors?.unitso}
                                                    </div>
                                                </FormFeedback>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <Label 
                                                style={{ color: "black" }} 
                                                htmlFor={`keteranganorder`}
                                                className="form-label">
                                                Keterangan SO
                                            </Label>
                                        </Col>
                                        <Col lg={6} className="mb-2">
                                            <Input 
                                                id={`keteranganso`}
                                                name={`keteranganso`}
                                                type="text"
                                                value={vJadwal.values.keteranganso} 
                                                onChange={vJadwal.handleChange}
                                                invalid={vJadwal.touched?.keteranganso 
                                                    && !!vJadwal?.errors?.keteranganso}
                                                />
                                            {vJadwal.touched?.keteranganso 
                                                && !!vJadwal.errors?.keteranganso && (
                                                <FormFeedback type="invalid" >
                                                    <div>
                                                        {vJadwal.errors?.keteranganso}
                                                    </div>
                                                </FormFeedback>
                                            )}
                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>
                        </TabPane>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default StokOpname