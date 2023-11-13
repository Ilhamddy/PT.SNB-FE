import { ToastContainer } from "react-toastify";
import { 
    Button,
    Card, 
    CardBody, 
    CardHeader, 
    Col, 
    Container, 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    Form, 
    FormFeedback, 
    Input, 
    Label, 
    Modal, 
    ModalBody, 
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { 
    useNavigate, 
    useParams 
} from "react-router-dom";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getComboStokOpname } from "../../store/master/action";
import { createOrUpdateStokOpname, getStokOpname, getStokOpnameDetail, updateStokOpnameDetails } from "../../store/actions";
import DataTable from "react-data-table-component";
import LoadingTable from "../../Components/Table/LoadingTable";
import { dateLocal, dateTimeLocal, onChangeStrNbr, strToNumber } from "../../utils/format";
import * as Yup from "yup";


const linkStokOpname = "/farmasi/gudang/stok-opname"

const StokOpname = () => {
    const navigate = useNavigate();
    const { tabopen } = useParams();
    const {
        unit,
        stokOpname
    } = useSelector((state) => ({
        unit: state.Master.getComboStokOpname?.data?.unit,
        stokOpname: state.Gudang.getStokOpname || []
    }))
    const [ isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComboStokOpname())
        dispatch(getStokOpname())
    }, [dispatch])


    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsStokOpname = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            cell: row => (
                <div className="hstack gap-3 flex-wrap">
                    <UncontrolledTooltip placement="top" target="detail-produk" > Detail Produk </UncontrolledTooltip>
                    <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="detail-produk">
                            <i className="ri-apps-2-line"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem onClick={() => 
                                navigate(`/farmasi/gudang/stok-opname/edit-stok-opname/${row.norecstokopname}`)}>
                                <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                </i>
                                {row.statusselesai ? "lihat" : "Edit"}
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
            name: <span className='font-weight-bold fs-13'>No</span>,
            sortable: true,
            selector: row => row.no,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Awal</span>,
            sortable: true,
            selector: row => dateLocal(row.tanggalawal),
            width: "160px",
            wrap: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Akhir</span>,
            selector: row => dateLocal(row.tanggalakhir),
            sortable: true,
            width: "160px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Unit</span>,
            sortable: true,
            selector: row => row.namaunit,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Keterangan SO</span>,
            sortable: true,
            selector: row => row.variabelbpjs,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Jumlah Item</span>,
            sortable: true,
            selector: row => row.jumlahproduk,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            sortable: true,
            selector: row => row.statusselesai ? "Selesai" : "Belum Selesai",
            width: "150px"
        },
    ];
            
    return (
        <div className="page-content page-list-penerimaan">
            <ToastContainer closeButton={false} />
            <ModalMenu 
                isMenuOpen={isMenuOpen}
                toggle={() => setIsMenuOpen(!isMenuOpen)}
            />
            <Container fluid>
                <BreadCrumb title="List produk" pageTitle="List Produk" />
                <Card className="pt-5">
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
                                        List Stok Opname
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        disabled
                                        style={{ cursor: "pointer", fontWeight: "bold" }} 
                                        className={classnames({ active: tabopen === "edit-stok-opname", })} 
                                        onClick={() => { navigate(linkStokOpname + "/edit-stok-opname"); }} >
                                        Edit Stok Opname
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    <CardBody>
                        <TabContent activeTab={tabopen} className="text-muted">
                            <TabPane 
                                tabId={"daftar-stok-opname"} 
                                id="daftar-stok-opname"
                                className="pe-lg-5 ps-lg-5 pt-2">
                                <Row className="d-flex flex-row-reverse mb-2">
                                    <Col lg={3}
                                        className="d-flex flex-row-reverse">
                                        <Button 
                                            color={"info"}
                                            type="button"
                                            onClick={() => setIsMenuOpen(true)}>
                                            Tambah
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <DataTable 
                                            fixedHeader
                                            columns={columnsStokOpname}
                                            pagination
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[10]}
                                            data={stokOpname?.data?.stokopname || []}
                                            progressPending={stokOpname.loading || false}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                            expandableRows
                                            expandableRowsComponent={ExpandableStokOpname}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane 
                                tabId={"edit-stok-opname"} 
                                id="edit-stok-opname"
                                className="pe-lg-5 ps-lg-5 pt-2">
                                <EditStokOpname />
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

const EditStokOpname = () => {
    const { tabopen, norecstokopname } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSimpan = useRef(false);
    const simpanIndex = useRef(-1);
    const {
        stokOpnameDetail
    } = useSelector((state) => ({
        stokOpnameDetail: state.Gudang.getStokOpnameDetail || []
    }))

    const vStokOpnameDetail = useFormik({
        enableReinitialize: true,
        initialValues: {
            statusSelesai: false,
            norecstokopname: "",
            idunit: "",
            stokopnamedetails: []
        },
        validationSchema: Yup.object({
            idunit: Yup.string().required("Unit harus diisi"),
            stokopnamedetails: Yup.array().of(
                Yup.object().shape({
                    stokfisik: Yup.string().required("Stok fisik harus diisi"),
                })
            )
        }),
        onSubmit: (values) => {
            const newValues = {...values};
            newValues.issimpan = isSimpan.current
            if(simpanIndex.current >= 0){
                newValues.stokopnamedetails = newValues.stokopnamedetails.filter((_, index) => {
                    return index === simpanIndex.current
                })
            }
            newValues.stokopnamedetails = newValues.stokopnamedetails.map((item) => {
                const newItem = {...item};
                newItem.stokfisik = strToNumber(newItem.stokfisik);
                return newItem;
            })
            dispatch(updateStokOpnameDetails(newValues, () => {
                dispatch(getStokOpnameDetail({norecstokopname: norecstokopname}))
            }))
        }
    })
    useEffect(() => {
        norecstokopname && 
            dispatch(getStokOpnameDetail({norecstokopname: norecstokopname}))
    }, [norecstokopname, dispatch])

    useEffect(() => {
        const setFF = vStokOpnameDetail.setFieldValue;
        setFF("norecstokopname", norecstokopname)
        setFF("stokopnamedetails", stokOpnameDetail?.data?.stokopnamedetails || [])
        setFF("idunit", stokOpnameDetail?.data?.unitstokopname || "")
        setFF("statusSelesai", stokOpnameDetail?.data?.statusselesai || false)
    }, [stokOpnameDetail, norecstokopname, vStokOpnameDetail.setFieldValue])

    const statusSelesai = !!vStokOpnameDetail.values.statusSelesai

    const handleSubmitOnBlur = (rowIndex) => {
        simpanIndex.current = rowIndex;
        isSimpan.current = false;
        vStokOpnameDetail.handleSubmit();
    }

    /**
     * @type {import("react-data-table-component").TableColumn<import("../../../../backendjs/app/queries/gudang/gudang.queries").StokOpnameDetail>[]}
     */
    const columnsStokOpnameDetail = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            sortable: true,
            selector: row => row.no,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>ID produk</span>,
            sortable: true,
            selector: row => row.objectprodukfk,
            width: "100px",
            wrap: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama produk</span>,
            selector: row => row.namaproduk,
            sortable: true,
            width: "160px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan</span>,
            sortable: true,
            selector: row => row.namasatuan,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Stok Aplikasi</span>,
            sortable: true,
            selector: row => row.stokaplikasi,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Stok Fisik</span>,
            sortable: true,
            selector: row => {
                const touchedDetail = vStokOpnameDetail.touched?.stokopnamedetails
                const errorSelisih = vStokOpnameDetail.errors?.stokopnamedetails?.[row.no - 1]?.selisih;
                return (
                    <Row>
                        <Col>
                            <Input 
                                id={`keteranganso`}
                                name={`keteranganso`}
                                type="text"
                                value={vStokOpnameDetail.values.stokopnamedetails[row.no - 1]?.stokfisik ?? ""}
                                onChange={(e) => {
                                    const newDatas = [...vStokOpnameDetail.values.stokopnamedetails];
                                    const newData = {...newDatas[row.no - 1]};
                                    const newStokFisik = onChangeStrNbr(e.target.value || 0, newData.stokfisik);
                                    newData.stokfisik = newStokFisik;
                                    newData.selisih = strToNumber(newStokFisik) - newData.stokaplikasi;
                                    newDatas[row.no - 1] = newData;
                                    vStokOpnameDetail.setFieldValue("stokopnamedetails", newDatas);
                                }}
                                onBlur={() => handleSubmitOnBlur(row.no - 1)}
                                disabled={statusSelesai}
                                invalid={touchedDetail
                                    && !!errorSelisih}
                                />
                            {touchedDetail 
                                && !!errorSelisih && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorSelisih}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                )
            },
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Selisih</span>,
            sortable: true,
            selector: row => row.selisih === 0 
                ? `0` 
                : row.selisih > 0 
                ? `+${row.selisih}` 
                : `${row.selisih}`,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            sortable: true,
            cell: row => {
                const touchedDetail = vStokOpnameDetail.touched?.stokopnamedetails
                const errorSelisih = vStokOpnameDetail.errors?.stokopnamedetails?.[row.no - 1]?.selisih;
                return (
                    <Row>
                        <Col>
                            <Input 
                                id={`keteranganso`}
                                name={`keteranganso`}
                                type="text"
                                value={vStokOpnameDetail.values.stokopnamedetails[row.no - 1]?.keterangan ?? ""}
                                onChange={(e) => {
                                    const newDatas = [...vStokOpnameDetail.values.stokopnamedetails];
                                    const newData = {...newDatas[row.no - 1]};
                                    const newKeterangan = e.target.value || "";
                                    newData.keterangan = newKeterangan;
                                    newDatas[row.no - 1] = newData;
                                    vStokOpnameDetail.setFieldValue("stokopnamedetails", newDatas);
                                }}
                                onBlur={() => handleSubmitOnBlur(row.no - 1)}
                                disabled={statusSelesai}
                                invalid={touchedDetail
                                    && !!errorSelisih}
                                />
                            {touchedDetail 
                                && !!errorSelisih && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorSelisih}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                )
            },
            width: "300px"
        },
    ];
    return (
        <>
            <Row className="d-flex flex-row-reverse mb-2">
                <Col lg={3}
                    className="d-flex flex-row-reverse">

                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <DataTable 
                        fixedHeader
                        columns={columnsStokOpnameDetail}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10]}
                        data={vStokOpnameDetail.values.stokopnamedetails || []}
                        progressPending={stokOpnameDetail?.loading}
                        customStyles={tableCustomStyles}
                        progressComponent={<LoadingTable />}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={12}
                    className="d-flex justify-content-around align-items-end mt-5">
                    <Button 
                        type="button" 
                        color="info" 
                        placement="top" 
                        formTarget="form-input-penerimaan"
                        disabled={statusSelesai}
                        onClick={() => {
                            simpanIndex.current = -1;
                            isSimpan.current = true;
                            vStokOpnameDetail.handleSubmit();
                        }}
                        >
                        Simpan
                    </Button>
                </Col>
            </Row>
        </>
    )
}

const ExpandableStokOpname = ({ data }) => {

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsDetail = [
        {
            name: <span className='font-weight-bold fs-13'>Nama produk</span>,
            sortable: true,
            selector: row => row.namaproduk,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan</span>,
            selector: row => row.namasatuan,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Stok aplikasi</span>,
            sortable: true,
            selector: row => row.stokaplikasi,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Stok Fisik</span>,
            sortable: true,
            selector: row => row.stokfisik,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Selisih</span>,
            sortable: true,
            selector: row => row.selisih,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            sortable: true,
            selector: row => row.keterangan,
            width: "150px"
        },

    ];
    if(data.detailstokopname.length === 0 ){
        return <></>
    }
    return (
        <DataTable
            fixedHeader
            fixedHeaderScrollHeight="700px"
            columns={columnsDetail}
            data={data.detailstokopname || []}
            progressPending={false}
            customStyles={subTableCustomStyles}
            />
    )
}

const ModalMenu = ({ isMenuOpen, toggle }) => {
    const [dateNow] = useState(() => (new Date()).toISOString());
    const dispatch = useDispatch();
    const {
        unit
    } = useSelector((state) => ({
        unit: state.Master.getComboStokOpname?.data?.unit
    }))
    const vJadwal = useFormik({
        initialValues: {
            norecstokopname: "",
            tanggalawal: dateNow,
            tanggalakhir: dateNow,
            unitso: "",
            keteranganso: "",
            tglselesai: "",
            statusselesai: false
        },
        onSubmit: async (values) => {
            dispatch(createOrUpdateStokOpname(values, () => {
                dispatch(getStokOpname())
            }))
        }
    })

    return(
        <Modal isOpen={isMenuOpen} toggle={toggle}>
            <ModalBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        vJadwal.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="mb-3">
                        <h2 className="text-center mt-2 fs-6">
                            Jadwal Stok Opname
                        </h2>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={6}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggalawal`}
                                className="form-label mt-2">
                                Tanggal Awal
                            </Label>
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
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggalakhir`}
                                className="form-label  mt-2">
                                Tanggal Akhir
                            </Label>
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
                                className="form-label  mt-2">
                                Unit SO
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
                                className="form-label mt-2">
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
                    <Row>
                        <Col lg={12}
                            className="d-flex justify-content-around align-items-end mt-5">
                            <Button 
                                type="submit" 
                                color="info" 
                                placement="top" 
                                formTarget="form-input-penerimaan"
                                >
                                Simpan
                            </Button>
                            <Button
                                type="button"
                                className="btn"
                                color="danger"
                                onClick={() => toggle()}>
                                Batal
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
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

const subTableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#ECB349'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6",
            borderBottom: "1px solid #919191"
        },
    }
    
}

export default StokOpname