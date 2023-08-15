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
import CountUp from "react-countup";
import {
    widgetdaftarOrderRadiologiGet, radiologiResetForm,
    listdaftarOrderRadiologiGet,deleteOrderPelayanan
} from '../../../store/actions';
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";
import DetailOrderModal from '../DetailOrderModal/DetailOrderModal';
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';
import LoadingTable from '../../../Components/Table/LoadingTable';

const DaftarOrderRadiologi = () => {
    document.title = "Daftar Order Radiologi";
    const dispatch = useDispatch();
    const { data, datawidget, loading, error,deleteOrder,successOrder,loadingOrder } = useSelector((state) => ({
        data: state.Radiologi.listdaftarOrderRadiologiGet.data,
        loading: state.Radiologi.listdaftarOrderRadiologiGet.loading,
        error: state.Radiologi.listdaftarOrderRadiologiGet.error,
        datawidget: state.Radiologi.widgetdaftarOrderRadiologiGet.data,
        deleteOrder: state.Radiologi.deleteOrderPelayanan.newData,
        successOrder: state.Radiologi.deleteOrderPelayanan.success,
        loadingOrder: state.Radiologi.deleteOrderPelayanan.loading,
    }));
    useEffect(() => {
        return () => {
            dispatch(radiologiResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(widgetdaftarOrderRadiologiGet(''));
        dispatch(listdaftarOrderRadiologiGet(''));
    }, [dispatch]);
    const handleClickCard = (e) => {
        setidPencarian(e.id)
        setnamaPencarian(e.label)
        if (e.id === 1) {
            dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
            dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
        } else if (e.id === 2) {
            dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
            dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
        } else if (e.id === 3) {
            dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
            dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
        }
    };
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
    const [idPencarian, setidPencarian] = useState(1);
    const [namaPencarian, setnamaPencarian] = useState('Belum Verif');
    const handleClickCari = () => {
        dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
        dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {

            dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
        }
    }
    const handleClick = (e) => {

        // console.log('this is:', e.namapasien);
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
    const [detailModal, setdetailModal] = useState(false);
    const [tempNorecOrder, settempNorecOrder] = useState('');
    const clickDetail = (e) => {
        // let tempValue = {
        //     idpencarian: 4,
        //     norectrm: e.norectrm
        // }
        // console.log(tempValue)
        if(e.statusverif==="DIVERIF"){
            toast.error('Order Sudah Diverifikasi', { autoClose: 3000 });
            return
        }else if(e.statusverif==="DITOLAK"){
            toast.error('Order Sudah Ditolak', { autoClose: 3000 });
            return
        }
        settempNorecOrder(e.norec)
        setdetailModal(true)
    };
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <Link to="#" onClick={() => { clickDetail(data) }} className="text-danger fs-15" ><i className="ri-apps-2-line"></i></Link>

                    </div>
                );
            },
            width: "80px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Order</span>,
            selector: row => row.tglinput,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>No Order</span>,
            selector: row => row.nomororder,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Dokter Order</span>,
            selector: row => row.namalengkap,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "150px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            selector: row => row.keterangan,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.statusverif,
            sortable: true,
            // width: "250px",
        },
    ];
    const handleSimpan = () => {
        // if (product) {
        setdetailModal(false);
        // }
    };
    const [deleteModal, setDeleteModal] = useState(false);
   
    const handleTolak = () => {
        // if (product) {
        setdetailModal(false);
        setDeleteModal(true);
        // }
    };
    const handleDeleteOrder = () => {
        if (tempNorecOrder) {
            let tempValue = {
                norec: tempNorecOrder
            }
            dispatch(deleteOrderPelayanan(tempValue));
            setDeleteModal(false);
        }
    };
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DetailOrderModal
                show={detailModal}
                onSimpanClick={handleSimpan}
                onCloseClick={() => setdetailModal(false)}
                tempNorec={tempNorecOrder}
                onTolakClick={handleTolak}
            />
            <DeleteModalCustom
                show={deleteModal}
                onDeleteClick={handleDeleteOrder}
                onCloseClick={() => setDeleteModal(false)}
                msgHDelete='Apa Kamu Yakin ?'
                msgBDelete='Yakin ingin menolak Order Ini?'
            />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Order Radiologi" pageTitle="Forms" />
                    <Row>
                        {datawidget.map((item, key) => (
                            <Col xxl={4} sm={6} key={key}>
                                <Card className="card-animate">
                                    <CardBody>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="fw-medium text-muted mb-0">Total Order {item.label}</p>
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

                        <Col lg={3}>
                            <Card>
                                <CardBody>
                                    <h5 className="card-title mb-5">Profile Pasien</h5>
                                    <div className="text-center">
                                        <img src={userDummy}
                                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                            alt="user-profile" />
                                        <h5 className="fs-17 mb-1">Testing</h5>
                                        <p className="text-muted mb-0">Testing</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={9}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Daftar Order Radiologi <span style={{ color: '#e67e22' }}></span></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row>
                                            <Col sm={4}>
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
                                            <Col sm={4}>
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
                                            <Col lg={2}>
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search"
                                                            placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                            onKeyDown={handleFilter} />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={1}>
                                                <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                                    CARI
                                                </Button>
                                                <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div id="table-gridjs">
                                        {/* <Col className="col-sm">
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="700px"
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (DaftarOrderRadiologi)