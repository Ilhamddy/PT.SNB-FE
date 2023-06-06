import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';

import { taskWidgets } from '../../../common/data';
import CountUp from "react-countup";

import { daftarPasienRJGet, widgetdaftarPasienRJGet } from '../../../store/actions';
// Imported Images
import pac from "../../../assets/images/sudah-periksa.png";
//import images
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";

const DaftarPasienRJ = () => {
    document.title = "Daftar Pasien Rawat Jalan";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, datawidget, loading, error } = useSelector((state) => ({
        data: state.DaftarPasien.daftarPasienRJGet.data,
        datawidget: state.DaftarPasien.widgetdaftarPasienRJGet.data,
        loading: state.DaftarPasien.daftarPasienRJGet.loading,
        error: state.DaftarPasien.daftarPasienRJGet.error,
    }));
    useEffect(() => {
        dispatch(daftarPasienRJGet(''));
        dispatch(widgetdaftarPasienRJGet(''));
    }, [dispatch]);

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
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <Link to={`/emr-pasien/${data.norecdp}/${data.norecta}`} className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
                        <UncontrolledTooltip placement="top" target="tooltipTop" > Pengkajian Pasien </UncontrolledTooltip>


                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#!"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>View</DropdownItem>
                                <DropdownItem className='edit-item-btn'><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit</DropdownItem>
                                <DropdownItem className='remove-item-btn'> <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Menu </UncontrolledTooltip>
                    </div>
                );
            },
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{row.noregistrasi}</button>),
            // cell: (data) => {
            //     return (
            //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
            //         <button className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>View</button>
            //     );
            // },
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocm,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Poliklinik</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>DPJP Tujuan</span>,
            selector: row => row.namadokter,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Jenis Pasein</span>,
            selector: row => row.jenispenjamin,
            sortable: true
        },
    ];

    const handleClick = (e) => {

        // console.log('this is:', e.namapasien);
    };


    const DisplayData = data.map(
        (info, i) => {
            return (
                <tr key={i}>
                    <td>{info.tglregistrasi}</td>
                    <td>{info.noregistrasi}</td>
                    <td>{info.nocm}</td>
                    <td>{info.namapasien}</td>
                    <td>{info.namaunit}</td>
                    <td>{info.namadokter}</td>
                    <td>{info.jenispenjamin}</td>
                    <td>
                        <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                        </div>
                    </td>
                </tr>
            )
        }
    )

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Rawat Jalan" pageTitle="Forms" />
                    <Row>

                        {datawidget.map((item, key) => (
                            <Col xxl={4} sm={6} key={key}>
                                <Card className="card-animate">
                                    <CardBody>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="fw-medium text-muted mb-0">{item.label}</p>
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
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Daftar Pasien Rawat Jalan</h4>
                                            </Col>
                                        </Row>
                                    </div>

                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <Col className="col-sm">
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col>
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
                        {/* <Col xl={9}>
                            <Card>
                                <CardBody>
                                    <div className="table-responsive mt-4 mt-xl-0" >
                                        <Table className="table-light table-striped table-nowrap align-middle mb-0">
                                            <thead className="table-primary" style={{position:'sticky',top:0, overflow:'auto',maxHeight:'160px'}}>
                                                <tr>
                                                    <th scope="col">Tgl Registrasi</th>
                                                    <th scope="col">No Registrasi</th>
                                                    <th scope="col">NoRM</th>
                                                    <th scope="col">Nama Pasien</th>
                                                    <th scope="col">Poliklinik</th>
                                                    <th scope="col">DPJP</th>
                                                    <th scope="col">Jenis Pasien</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {DisplayData}

                                            </tbody>
                                        
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(DaftarPasienRJ);