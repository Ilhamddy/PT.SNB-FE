import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip, ListGroup, ListGroupItem
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import CustomSelect from '../../Select/Select';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import calendar from "../../../assets/images/users/calendar.png";
import SearchOption from '../../../Components/Common/SearchOption';
import { dateISOString, dateTimeLocal } from "../../../utils/format";
import {
    casemixResetForm, listCariPasienGet, listDaftarPasienGet
} from '../../../store/actions';

const dateAwalStart = dateISOString(new Date(new Date() - 1000 * 60 * 60 * 24 * 3));
const dateAwalEnd = dateISOString(new Date())
const KlaimInacbg = () => {
    document.title = "Klaim Inacbg";
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
        dataPasien, loadingPasien, successPasien, dataDaftarPasien, loadingDaftarPasien, successDaftarPasien } = useSelector((state) => ({
            // newData: state.Radiologi.updateTglRencanaRadiologi.newData,
            // success: state.Radiologi.updateTglRencanaRadiologi.success,
            // loading: state.Radiologi.updateTglRencanaRadiologi.loading,
            dataPasien: state.Casemix.listCariPasienGet.data,
            loadingPasien: state.Casemix.listCariPasienGet.loading,
            successPasien: state.Casemix.listCariPasienGet.success,
            dataDaftarPasien: state.Casemix.listDaftarPasienGet.data,
            loadingDaftarPasien: state.Casemix.listDaftarPasienGet.loading,
            successDaftarPasien: state.Casemix.listDaftarPasienGet.success,
        }));

    useEffect(() => {
        return () => {
            dispatch(casemixResetForm());
        }
    }, [dispatch])
    const handleClickButton = (e) => {
        if (cardCari === true)
            setcardCari(false)
        else
            setcardCari(true)
    };
    const [cardCari, setcardCari] = useState(false);
    const listJenisRawat = [
        {
            options: [
                { label: "Semua", value: 1 },
                { label: "Rawat Inap", value: 2 },
                { label: "Rawat Jalan", value: 3 }
            ],
        },
    ];
    const listPeriode = [
        {
            options: [
                { label: "Tanggal Pulang", value: 1 },
                { label: "Tanggal Masuk", value: 2 },
                // { label: "Tanggal ", value: 3 }
            ],
        },
    ];
    const [dateStart, setDateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
    const [search, setSearch] = useState("");
    const [stateList, setstateList] = useState(false)
    const [statePencarian, setstatePencarian] = useState(true)
    const [stateListNoregistrasi, setstateListNoregistrasi] = useState(false)
    const [stateCoder, setstateCoder] = useState(false)
    const [stateNocm, setstateNocm] = useState('')
    const [stateNama, setstateNama] = useState('')
    const [stateJK, setstateJK] = useState('')
    const [stateTglLahir, setstateTglLahir] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            setstateList(true)
            dispatch(listCariPasienGet(search))
        }
    }
    const widgetsTasks = [
        {
            id: 1,
            forId: "task_one",
            text: "Review and make sure nothing slips through cracks",
            date: "15 Sep, 2021",
        },
        {
            id: 2,
            forId: "task_two",
            text: "Send meeting invites for sales upcampaign",
            date: "20 Sep, 2021",
        },
        {
            id: 3,
            forId: "task_three",
            text: "Weekly closed sales won checking with sales team",
            date: "24 Sep, 2021",
        },
        {
            id: 4,
            forId: "task_four",
            text: "Add notes that can be viewed from the individual view",
            date: "27 Sep, 2021",
        },
        {
            id: 5,
            forId: "task_five",
            text: "Move stuff to another page",
            date: "27 Sep, 2021",
        },
        {
            id: 6,
            forId: "task_six",
            text: "Styling wireframe design and documentation for velzon admin",
            date: "27 Sep, 2021",
        },
    ];
    const clickList = (e) => {
        console.log(e)
        setstateList(false)
        setstatePencarian(false)
        setstateListNoregistrasi(true)
        setstateNocm(e.nocm)
        setstateNama(e.nama)
        setstateJK(e.jeniskelamin)
        setstateTglLahir(e.tgllahir)
        dispatch(listDaftarPasienGet(e.id))
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
    const handleClick = (e) => {
        setstateListNoregistrasi(false)
        setstateCoder(true)
        console.log(e.norec)
    };
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(row)}>{row.noregistrasi}</button>),
            cell: (data) => {
                return (
                    <Link to="#" onClick={()=>handleClick(data)} className="link-primary text-decoration-underline">{data.noregistrasi}</Link>
                )
            },
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Masuk</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Pulang</span>,
            selector: row => row.tglpulang,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jaminan 1</span>,
            selector: row => row.jaminan1,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nomor Jaminan 1</span>,
            selector: row => row.no_sep,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jaminan 2</span>,
            selector: row => row.jaminan2,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nomor Jaminan 2</span>,
            selector: row => row.no_sep,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tipe</span>,
            selector: row => row.tipe,
            sortable: true,
            width: "150px",
        },
        {
            name: <span className='font-weight-bold fs-13'>CBG</span>,
            selector: row => '-',
            sortable: true,
            width: "150px",
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => '-',
            sortable: true,
            width: "150px",
        },
        {
            name: <span className='font-weight-bold fs-13'>Petugas</span>,
            selector: row => '-',
            sortable: true,
            width: "150px",
        },
    ];
    const back = () => {
        setstatePencarian(true)
        setstateListNoregistrasi(false)
    }
    const back2 = () => {
        setstateListNoregistrasi(true)
        setstateCoder(false)
    }
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="KLAIM" pageTitle="Forms" />
                    <Row>
                        {statePencarian ? (
                            <>
                                <Col lg={10}>
                                    <Card style={{ backgroundColor: "#ffdd99", height: '70px' }}>
                                        <CardBody>
                                            <Row>
                                                <Col lg={3} md={3}>
                                                    <div className="mt-2">
                                                        <Label style={{ color: "black" }} htmlFor="state" className="form-label">Cari No. RM / No. SEP / Nama</Label>
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <div className="mt-1">
                                                        <div className="form-icon">
                                                            <Input className="form-control form-control-icon rounded-pill" id="iconInput"
                                                                type="text"
                                                                placeholder="Search..."
                                                                onChange={event => setSearch(event.target.value)}
                                                                onKeyDown={handleFilter} />
                                                            <i className="ri-search-2-line"></i>
                                                        </div>
                                                    </div>
                                                    {stateList ? (
                                                        <div className="live-preview">
                                                            <ListGroup>
                                                                {(dataPasien || []).map((item, key) => (<ListGroupItem tag="a" to="#" className="list-group-item-action" key={key}
                                                                    onClick={() => { clickList(item) }}>
                                                                    <div className="float-end">
                                                                        {item.nocm}
                                                                    </div>
                                                                    <div className="d-flex mb-2 align-items-center">
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h5 className="list-title fs-15 mb-1">{item.namapasien}</h5>
                                                                            <p className="list-text mb-0 fs-12">KARTU : {item.nobpjs}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="list-text mb-0">LAHIR :{item.tgllahir}</p>

                                                                </ListGroupItem>))}
                                                            </ListGroup>
                                                        </div>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3} md={3}>
                                                    <Link to="#" className="avatar-group-item" id="calendar">
                                                        <img src={calendar} alt="" className="rounded-circle avatar-sm" onClick={() => handleClickButton('registrasi')} />
                                                    </Link>
                                                </Col>

                                            </Row>

                                        </CardBody>
                                    </Card>

                                    {cardCari ? (
                                        <Card style={{ backgroundColor: "#ffdd99" }}>
                                            <CardBody>
                                                <Col lg={12}>
                                                    <Card style={{ height: '300px' }}>
                                                        <CardBody>
                                                            <Row>
                                                                <Col lg={12} style={{ textAlign: 'center' }}><span style={{ fontStyle: "italic", textAlign: 'center' }}>Pencarian klaim dengan kriteria:</span></Col>
                                                                <hr />
                                                                <Col lg={3} style={{ textAlign: 'right' }}><span>Jenis Rawat :</span></Col>
                                                                <Col lg={9} className="mb-2">
                                                                    <CustomSelect
                                                                        id="jenis_rawat"
                                                                        name="jenis_rawat"
                                                                        options={listJenisRawat}
                                                                    // onChange={handleChangeUnitTujuan}
                                                                    />
                                                                </Col>
                                                                <hr />
                                                                <Col lg={3} style={{ textAlign: 'right' }}><span>Periode :</span></Col>
                                                                <Col lg={2} className="mb-2">
                                                                    <CustomSelect
                                                                        id="periode"
                                                                        name="periode"
                                                                        options={listPeriode}
                                                                    // onChange={handleChangeUnitTujuan}
                                                                    />
                                                                </Col>
                                                                <Col lg={3} className="mb-2">
                                                                    <Flatpickr
                                                                        className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                                        options={{
                                                                            // mode: "range",
                                                                            dateFormat: "Y-m-d",
                                                                            defaultDate: "today"
                                                                        }}
                                                                        value={dateStart}
                                                                        onChange={([dateStart]) => {
                                                                            setDateStart(dateISOString(dateStart - dateStart.getTimezoneOffset() * 60000));
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={1} className="mt-2"><span>s/d</span></Col>
                                                                <Col lg={3} className="mb-2">
                                                                    <Flatpickr
                                                                        className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                                        options={{
                                                                            // mode: "range",
                                                                            dateFormat: "Y-m-d",
                                                                            defaultDate: "today"
                                                                        }}
                                                                        value={dateEnd}
                                                                        onChange={([dateEnd]) => {
                                                                            setDateEnd(dateISOString(dateEnd - dateEnd.getTimezoneOffset() * 60000));
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <hr />
                                                                <Col lg={12} style={{ textAlign: 'right' }}>
                                                                    <Button type="button" color="info" className="rounded-pill" placement="top" >
                                                                        Cari
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </CardBody>
                                        </Card>
                                    ) : null}
                                </Col>
                                <Col lg={2}></Col>
                            </>
                        ) :
                            null
                        }
                        {stateListNoregistrasi ? (
                            <Card>
                                <CardHeader >
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={12} style={{ marginTop: '3px' }}>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">
                                                    <Button type='button' onClick={() => { back() }} color="light" className="btn-icon"> <i className="ri-arrow-go-back-line" /> </Button>{stateNocm} <span style={{ color: "#55aaee" }}>••</span> {stateNama} <span style={{ color: "#55aaee" }}>••</span> {stateJK}<span style={{ color: "#55aaee" }}>••</span> {stateTglLahir}
                                                </h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <div id="table-gridjs">
                                    <DataTable
                                        fixedHeader
                                        fixedHeaderScrollHeight="400px"
                                        columns={columns}
                                        pagination
                                        data={dataDaftarPasien}
                                        progressPending={loading}
                                        customStyles={tableCustomStyles}
                                    />
                                </div>
                            </Card>
                        ) : null}
                        {stateCoder ? (
                            <Card>
                                    <CardHeader >
                                        <div className="live-preview">
                                            <Row>
                                                <Col lg={12} style={{ marginTop: '3px' }}>
                                                    <h4 className="card-title mb-0 flex-grow-1 mb-3">
                                                        <Button type='button' onClick={() => { back2() }} color="light" className="btn-icon"> <i className="ri-arrow-go-back-line" /> </Button>{stateNocm} <span style={{ color: "#55aaee" }}>••</span> {stateNama} <span style={{ color: "#55aaee" }}>••</span> {stateJK}<span style={{ color: "#55aaee" }}>••</span> {stateTglLahir}
                                                    </h4>
                                                </Col>
                                            </Row>
                                        </div>
                                    </CardHeader>
                            </Card>
                        ) : null}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (KlaimInacbg)