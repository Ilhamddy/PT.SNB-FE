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
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    masterPelayananLaboratoriumGet
} from '../../../store/actions';

const MasterDataLayanan = () => {
    document.title = "Master Data Layanan Laboratorium";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error } = useSelector((state) => ({
        data: state.Laboratorium.masterPelayananLaboratoriumGet.data,
        loading: state.Laboratorium.masterPelayananLaboratoriumGet.loading

    }));
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [dateEnd, setdateEnd] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [search, setSearch] = useState('')
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
    const onClickDetail = (product, id) => {

    };
    const handleClickDetail = (id, e) => {
        if (id === 1)
            history(`/laboratorium/masternilainormal/${e.id}/${e.namaproduk}/${e.kodeexternal}/${e.detailjenisproduk}`);
        else
            history(`/laboratorium/setnilainormal/${e.id}/${e.namaproduk}/${e.kodeexternal}/${e.detailjenisproduk}`);
    };
    const columns = [
        {
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#!" onClick={() => handleClickDetail(1, data)}><i className="ri-apps-2-line align-bottom me-2 link-success"></i>Detail</DropdownItem>
                                <DropdownItem href="#!" onClick={() => handleClickDetail(2, data)}><i className="ri-file-settings-line align-bottom me-2 link-success"></i>Set Nilai Normal</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <Link to={`/laboratorium/masternilainormal/${data.id}/${data.namaproduk}/${data.kodeexternal}/${data.detailjenisproduk}`} className="link-success fs-15" id="tooltipMasterDataLayanan"><i className="ri-apps-2-line"></i></Link>
                        <UncontrolledTooltip placement="top" target="tooltipMasterDataLayanan" > Set Nilai Normal </UncontrolledTooltip> */}
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Id Produk</span>,
            selector: row => row.id,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Statusenabled</span>,
            selector: row => row.status,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kode Layanan</span>,
            selector: row => row.kodeexternal,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Layanan</span>,
            selector: row => row.namaproduk,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Detail Jenis Produk</span>,
            selector: row => row.detailjenisproduk,
            sortable: true,
            // width: "150px"
        },
    ];
    useEffect(() => {
        dispatch(masterPelayananLaboratoriumGet(''));
    }, [dispatch]);

    const handleClickCari = () => {
        dispatch(masterPelayananLaboratoriumGet(`${search}`));

    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {

            dispatch(masterPelayananLaboratoriumGet(`${search}`));

        }
    }
    const handleClickToSetting = () => {
        history("/laboratorium/seeting-layanan-lab")
    }

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Master Data Layanan Laboratorium" pageTitle="Forms" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Master Data Layanan Laboratorium <span style={{ color: '#e67e22' }}> </span></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <Row>
                                                    <Col lg={6}></Col>
                                                    <Col lg={2}>
                                                        <div className="d-flex justify-content-sm-end">
                                                            <div className="search-box ms-2">
                                                                <input type="text" className="form-control search"
                                                                    placeholder="Nama Produk..." onChange={event => setSearch(event.target.value)}
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
                                                    <Col lg={3}>
                                                        <Button type="button" color='success' className="rounded-pill" placement="top" onClick={handleClickToSetting}>
                                                            Setting Layanan
                                                        </Button>
                                                    </Col>
                                                </Row>
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
                                            fixedHeaderScrollHeight="400px"
                                            columns={columns}
                                            pagination
                                            data={data}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
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

export default withRouter(MasterDataLayanan)