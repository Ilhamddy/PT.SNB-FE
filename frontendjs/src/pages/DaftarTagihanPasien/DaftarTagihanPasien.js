import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import * as Yup from "yup";
import classnames from "classnames"
import { Link } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import {daftarPasienPulangGet} from "../../store/daftarPasien/action";
import DataTable from "react-data-table-component";
import { dateTimeLocal } from "../../utils/format";
import Flatpickr from "react-flatpickr";
import { comboAsuransiGet, comboRegistrasiGet } from "../../store/master/action";
import CustomSelect from "../Select/Select";
import { useNavigate } from "react-router-dom";
import { buktiBayarCancel, daftarTagihanPasienGet, verifNotaCancel } from "../../store/payment/action";
import LoadingTable from "../../Components/Table/LoadingTable";


const DaftarTagihanPasien = () => {
    const {
        dataTagihan, 
        comboboxReg
    } = useSelector((state) => ({
        dataTagihan: state.Payment.daftarTagihanPasienGet || null
    }))

    const [dateStart, setDateStart] = useState(new Date().toISOString());
    const [dateEnd, setDateEnd] = useState(new Date().toISOString());
    const [search, setSearch] = useState("");
    const [instalasi, setInstalasi] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            namapasien: "",
        },
        validationSchema: Yup.object({
            namapasien: Yup.string().required("Nama Pasien belum diisi"),
        }),
        onSubmit: (values) => {
            // console.log(values)
        }
    });

    useEffect(() => {
        dispatch(daftarTagihanPasienGet())
    }, [dispatch])

    const handleFilter = () => {
        // dispatch(daftarPasienPulangGet(dateStart, dateEnd))
    }
    const handleClickCari = () => {
        dispatch(daftarPasienPulangGet({dateStart, dateEnd, instalasi, unit: "", search}))
    }
    const handleToBayar = async (norecnota) => {
        norecnota 
            && navigate(`/payment/bayar/${norecnota}`)    
    }
    const handleCancelVerif = (norecnota, norecdp) => {
        norecnota && 
            dispatch(verifNotaCancel(norecnota, norecdp, () => dispatch(daftarTagihanPasienGet())))
    }
    const handleCancelBayar = (row) => {
        if(row.jmlpiutangbayar > 0){
            toast.error("Tidak bisa cancel, karena ada piutang terbayarkan", { autoclose: 3000 })
        }else{
            row.norecbukti && row.norecnota &&
                dispatch(buktiBayarCancel(
                    row.norecnota, 
                    row.norecbukti, 
                    () => dispatch(daftarTagihanPasienGet())
                ))
        }
              
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (row) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Detail Tagihan </UncontrolledTooltip>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                {!row.norecbukti && <DropdownItem onClick={() => 
                                        handleToBayar(row.norecnota)}>
                                        <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                        </i>
                                        Bayar
                                    </DropdownItem>
                                }
                                {!row.norecbukti && <DropdownItem 
                                        onClick={() => handleCancelVerif(row.norecnota, row.norecdp)}>
                                        <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                        </i>
                                        Batal Verif
                                    </DropdownItem>
                                }
                                {row.norecbukti && <DropdownItem 
                                        onClick={() => handleCancelBayar(row)}>
                                        <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                                        Batal Bayar
                                    </DropdownItem>}

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => dateTimeLocal(new Date(row.tglregistrasi)),
            sortable: true,
            width: "160px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => {}}>{row.noregistrasi}</button>),
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocmfk,
            sortable: true,
            width: "60px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "120px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Penjamin</span>,
            selector: row => row.namarekanan,
            sortable: true,
            width: "110px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Pulang</span>,
            selector: row => dateTimeLocal(new Date(row.tglpulang)),
            sortable: true,
            width: "160px",
        },
        {
            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => `Rp${row.total?.toLocaleString('id-ID') || 0}`,
            sortable: true,
            width: "120px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.nobukti === null ? "Blm Bayar" 
                : row.totalbayar === row.totaltagihan 
                ? "Lunas" 
                : "Bayar Sebagian",
            sortable: true,
            width: "160px",
            wrap: true
        },
    ];
    const [pillsTab, setpillsTab] = useState("1");
    return(
        <div className="page-content daftar-pasien-pulang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Daftar Tagihan Pasien" pageTitle="Daftar Tagihan Pasien" />
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
                    </Col>
                    <Col lg={9}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
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
                            

                        </Form>
                        <Card>
                            <CardBody>
                                <Row className="row-header mb-2 ">
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                options={{
                                                    // mode: "range",
                                                    dateFormat: "Y-m-d",
                                                    defaultDate: "today"
                                                }}
                                                value={dateStart}
                                                onChange={([dateStart]) => {
                                                    setDateStart((new Date(dateStart - dateStart.getTimezoneOffset() * 60000)).toISOString());
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm={1}><h4 className="mt-2">s/d</h4></Col>
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                options={{
                                                    // mode: "range",
                                                    dateFormat: "Y-m-d",
                                                    defaultDate: "today"
                                                }}
                                                value={dateEnd}
                                                onChange={([dateEnd]) => {
                                                    setDateEnd((new Date(dateEnd - dateEnd.getTimezoneOffset() * 60000)).toISOString());
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={1}>
                                        <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                            CARI
                                        </Button>
                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                    </Col>
                                </Row>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="700px"
                                    columns={columns}
                                    pagination
                                    data={dataTagihan?.data || []}
                                    progressPending={dataTagihan?.loading || false}
                                    customStyles={tableCustomStyles}
                                    progressComponent={<LoadingTable />}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </div>
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

export default DaftarTagihanPasien;