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
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../Select/Select';
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';
import CountUp from "react-countup";
import {
    daftarDokumenRekammedisGet, widgetdaftarDokumenRekammedisGet,
    saveDokumenRekammedis,kendaliDokumenResetForm
} from '../../../store/actions';
import LoadingTable from '../../../Components/LoadingTable/LoadingTable';

const KendaliDokumen = () => {
    document.title = "Daftar Dokumen Rekammedis";
    const dispatch = useDispatch();
    const { data, loading, error, datawidget,newData } = useSelector((state) => ({
        data: state.KendaliDokumen.daftarDokumenRekammedisGet.data,
        loading: state.KendaliDokumen.daftarDokumenRekammedisGet.loading,
        error: state.KendaliDokumen.daftarDokumenRekammedisGet.error,
        datawidget: state.KendaliDokumen.widgetdaftarDokumenRekammedisGet.data,
        newData: state.KendaliDokumen.saveDokumenRekammedis.newData,
        successSave: state.KendaliDokumen.saveDokumenRekammedis.success,
        loadingSave: state.KendaliDokumen.saveDokumenRekammedis.loading,
        errorSave: state.KendaliDokumen.saveDokumenRekammedis.error,
    }));
    useEffect(() => {
        return () => {
            dispatch(kendaliDokumenResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(daftarDokumenRekammedisGet(''));
        dispatch(widgetdaftarDokumenRekammedisGet(''));

    }, [dispatch]);
    
    const clickCheckBox = (e) => {
        let tempValue = {
            norecap: e.norecap,
            objectstatuskendalirmfkap: e.objectstatuskendalirmfkap,
            objectunittujuan: e.objectunitlastfk,
            idpencarian: idPencarian,
            norectrm: e.norectrm
        }
        // console.log(tempValue)
        if (idPencarian === 3) {
            toast.error('Dokumen Sudah Kembali', { autoClose: 3000 });
        } else {
            dispatch(saveDokumenRekammedis(tempValue));
        }

    };
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
            name: <span className='font-weight-bold fs-13'>#</span>,
            sortable: false,
            cell: (cellProps) => {
                return (
                    <ul className="list-inline hstack gap-2 mb-0">
                        <li className="list-inline-item" title="Kirim">
                            <Link
                                to="#"
                                className="text-danger d-inline-block remove-item-btn"
                                onClick={() => { clickCheckBox(cellProps) }}
                            >
                                <i className="ri-send-plane-fill fs-16"></i>
                            </Link>
                        </li>
                    </ul>
                );
            },
            width: "50px"
        },
        // {
        //     name: <span className='font-weight-bold fs-13'>No</span>,
        //     selector: row => row.no,
        //     sortable: true,
        //     width: "50px"
        // },
        {
            name: <span className='font-weight-bold fs-13'>NoCM</span>,
            selector: row => row.nocm,
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

            name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Tujuan</span>,
            selector: row => row.namaunit,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>statuskendali</span>,
            selector: row => row.statuskendali,
            sortable: true,
            // width: "150px"
        },

    ];
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [dateEnd, setdateEnd] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [search, setSearch] = useState('')
    const handleBeginOnChangeStart = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        setdateStart(dateString)
    }
    const handleBeginOnChangeEnd = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        setdateEnd(dateString)
    }

    const handleClickCari = () => {
        dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
        dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            // console.log(search)
            // useEffect(() => {
            dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            // }, [dispatch]);
        }
    }
    const handleClickCard = (e) => {
        setidPencarian(e.id)
        setnamaPencarian(e.label)
        if (e.id === 1) {
            dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
            dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
        } else if (e.id === 2) {
            dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
            dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
        } else if (e.id === 3) {
            dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
            dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
        }
    };
    const [idPencarian, setidPencarian] = useState(1);
    const [namaPencarian, setnamaPencarian] = useState('Belum Dikirim');
    useEffect(() => {
        if (newData !== null) {
            dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
        }
    }, [newData,search,dateStart,dateEnd,idPencarian, dispatch])
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Kendali Dokumen" pageTitle="Forms" />
                    <Row>
                        {datawidget.map((item, key) => (
                            <Col xxl={4} sm={6} key={key}>
                                <Card className="card-animate">
                                    <CardBody>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="fw-medium text-muted mb-0">Total Dokumen {item.label}</p>
                                                <h2 className="mt-4 ff-secondary fw-semibold">
                                                    <span className="counter-value" style={{ fontSize: "5rem" }}>
                                                        <CountUp
                                                            start={0}
                                                            end={item.counter}
                                                            decimal={item.decimals}
                                                            // suffix={item.suffix}
                                                            duration={3}
                                                        />
                                                    </span>
                                                </h2>
                                                {/* <p className="mb-0 text-muted"><span className={"badge bg-light mb-0 text-" + item.badgeClass}>
                                                    <i className={"align-middle " + item.badge}></i> {item.percentage}
                                                </span> vs. previous month</p> */}
                                            </div>
                                            <div>
                                                <div className="avatar-xl flex-shrink-0">
                                                    <span className={"avatar-title rounded-circle fs-4 bg-soft-" + item.iconClass + " text-" + item.iconClass}>
                                                        {/* <i className={item.icon}></i> */}
                                                        <img src={item.icon}
                                                            alt="" className="avatar-lg" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <div className="card-footer" style={{ backgroundColor: '#e67e22' }}>
                                        <div className="text-center">
                                            <Link to="#" className="link-light" onClick={() => handleClickCard(item)}>View <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                        <Card>
                            <CardHeader style={{ backgroundColor: "#e67e22" }}>
                                <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Dokumen Rekammedis <span style={{ color: 'black' }}>{namaPencarian}</span></h4>
                            </CardHeader>
                            <CardBody>
                                <div className='mb-2'>
                                    <Row>
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
                                                        handleBeginOnChangeStart(dateStart);
                                                    }}
                                                />
                                                <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                            </div>
                                        </Col>
                                        <Col lg={1}><h4>s/d</h4></Col>
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
                                                        handleBeginOnChangeEnd(dateEnd);
                                                    }}
                                                />
                                                <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                        onKeyDown={handleFilter} />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                                CARI
                                            </Button>
                                            <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </div>
                                <div id="table-gridjs">
                                    <DataTable
                                        fixedHeader
                                        fixedHeaderScrollHeight="330px"
                                        columns={columns}
                                        pagination
                                        data={data}
                                        progressPending={loading}
                                        customStyles={tableCustomStyles}
                                        progressComponent={<LoadingTable />}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (KendaliDokumen)