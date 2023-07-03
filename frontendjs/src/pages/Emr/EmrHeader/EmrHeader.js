import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { emrHeaderGet, emrResetForm, listTagihanGet, listTagihanPrintGet } from "../../../store/actions";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { Swiper, SwiperSlide } from 'swiper/react'
import CountUp from "react-countup";
// Import Swiper styles
import "swiper/css";

// import Swiper core and required modules
import { Autoplay, Mousewheel } from 'swiper';

const EmrHeader = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, dataTagihan, dataPasienReg } = useSelector(state => ({
        editData: state.Emr.emrHeaderGet.data,
        dataTagihan: state.Emr.listTagihanGet.data,
        dataPasienReg: state.Registrasi.registrasiRuangNorecGet.data || null,
    }));

    useEffect(() => {
        if (norecap) {
            dispatch(emrHeaderGet(norecap + `&norecdp=${norecdp}`));
        }
    }, [norecap, norecdp, dispatch])

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])

    useEffect(() => {
        if (norecdp) {
            dispatch(listTagihanGet(norecdp));
            dispatch(listTagihanPrintGet(norecdp));
        }
    }, [norecdp, dispatch])

    const totalTagihan = dataTagihan.reduce((total, item) => total + item.total * item.qty, 0)

    return (
        <React.Fragment>
            <Row>
                <Col xxl={3} md={6}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/itmsnfur.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{ width: "55px", height: "55px" }}>
                                    </lord-icon>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="#" className="badge badge-soft-info badge-border">{editData.tgllahir}</Link>
                                    <Link to="#" className="badge badge-soft-primary badge-border">{editData.umur}</Link>
                                </div>
                                
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Total tagihan:</h6>
                                <h6 className="text-muted mb-0">{totalTagihan}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Deposit:</h6>
                                <h6 className="text-muted mb-0">{0}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Total Bayar:</h6>
                                <h6 className="text-muted mb-0">{0}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Sisa tagihan:</h6>
                                <h6 className="text-muted mb-0">{totalTagihan - 0}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={3} md={6}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <lord-icon
                                         src="https://cdn.lordicon.com/yrixyrst.json" trigger="loop" colors="outline:#121331,primary:#92140c,secondary:#f9c9c0" style={{ width: "55px", height: "55px" }}>
                                    </lord-icon>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="#" className="badge badge-soft-primary badge-border">{editData.namarekanan}</Link>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">{editData.nocm} / {editData.noregistrasi}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">{dataPasienReg?.kelas?.[0]?.namakelas}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">{(new Date(dataPasienReg?.tglregistrasi))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">{new Date(dataPasienReg?.tglpulang)?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={3} md={6}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/pimvysaa.json" trigger="loop" colors="outline:#121331,primary:#b26836,secondary:#ffc738" style={{ width: "55px", height: "55px" }}>
                                    </lord-icon>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Total tagihan:</h6>
                                <h6 className="text-muted mb-0">{totalTagihan}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Deposit:</h6>
                                <h6 className="text-muted mb-0">{0}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Total Bayar:</h6>
                                <h6 className="text-muted mb-0">{0}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h6 className="text-muted mb-0">Sisa tagihan:</h6>
                                <h6 className="text-muted mb-0">{totalTagihan - 0}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={3} md={6}>

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        mousewheel={true}
                        loop={false}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Mousewheel]}
                        className="mySwiper vertical-swiper">
                        <SwiperSlide>
                            <Card className="card-animate">
                                <div className="card-body bg-soft-warning">
                                    <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/rorqcmmn.json" trigger="loop"
                                                colors="primary:#405189,secondary:#0ab39c" style={{ width: "55px", height: "55px" }}>
                                            </lord-icon>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link to="#" className="badge badge-soft-warning badge-border">{editData.tekanandarah} <span style={{ color: "red" }}>mmhg</span></Link>
                                            <Link to="#" className="badge badge-soft-info badge-border">{editData.pernapasan}  <span style={{ color: "red" }}>X/menit</span></Link>
                                            {/* <Link to="#" className="badge badge-soft-primary badge-border">{editData.suhu} <span style={{ color: "red" }}>°C</span></Link> */}
                                            <Link to="#" className="badge badge-soft-danger badge-border">{editData.nadi}  <span style={{ color: "red" }}>X/menit</span></Link>
                                        </div>
                                    </div>
                                    <h3 className="mb-2">{editData.suhu} <small className="text-muted fs-13"><span style={{ color: "red" }}>°C</span></small></h3>
                                    <h6 className="text-muted mb-0">-</h6>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="card-animate">
                                <div className="card-body bg-soft-warning">
                                    <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/rorqcmmn.json" trigger="loop"
                                                colors="primary:#405189,secondary:#0ab39c" style={{ width: "55px", height: "55px" }}>
                                            </lord-icon>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link to="#" className="badge badge-soft-warning badge-border">{editData.spo2} <span style={{ color: 'red' }}>%</span></Link>

                                        </div>
                                    </div>
                                    <h3 className="mb-2">{editData.namagcs}</h3>
                                    <h6 className="text-muted mb-0">{editData.keadaanumum}</h6>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="card-animate">
                                <div className="card-body bg-soft-warning">
                                    <div className="d-flex mb-3">
                                        <div className="flex-grow-1">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/rorqcmmn.json" trigger="loop"
                                                colors="primary:#405189,secondary:#0ab39c" style={{ width: "55px", height: "55px" }}>
                                            </lord-icon>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link to="#" className="badge badge-soft-warning badge-border">{editData.beratbadan}<span style={{ color: 'red' }}> Kg</span></Link>
                                            <Link to="#" className="badge badge-soft-info badge-border">{editData.tinggibadan} <span style={{ color: 'red' }}>cm</span></Link>
                                          
                                        </div>
                                    </div>
                                    <h3 className="mb-2">-</h3>
                                    <h6 className="text-muted mb-0">{editData.alergi}</h6>
                                </div>
                            </Card>
                        </SwiperSlide>
                    </Swiper>
                </Col>


                {/* <Col xxl={3} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#e67e22' }}>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold text-light">{editData.namapasien}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.tgllahir}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.umur}</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold text-light">{editData.jeniskelamin}</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={3} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#e67e22' }}>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold text-light">{editData.nocm}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.noregistrasi}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.ruanganta}</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold text-light">{editData.namarekanan}</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col> */}
                {/* <Col xxl={2} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#f0932b' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.tekanandarah} <span style={{ color: "red" }}>mmhg</span></p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  T.Darah
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.pernapasan}  <span style={{ color: "red" }}>X/menit</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Pernapasan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.suhu} <span style={{ color: "red" }}>°C</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Suhu
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.nadi}  <span style={{ color: "red" }}>X/menit</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Nadi
                                    </h5>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col> */}
                {/* <Col xxl={2} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#f0932b' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.spo2} <span style={{ color: 'red' }}>%</span></p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  SpO2
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.keadaanumum}</p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Keadaan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.namagcs}</p>
                                </div>
                            </div>

                        </CardBody>
                    </Card>
                </Col> */}
                {/* <Col xxl={2} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#f0932b' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"fw-semibold mb-0"} style={{ color: "black" }}>{editData.beratbadan}<span style={{ color: 'red' }}> Kg</span></p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Berat Badan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"fw-semibold mb-0"} style={{ color: "black" }}>{editData.tinggibadan} <span style={{ color: 'red' }}>cm</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  T.Badan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.alergi}</p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Alergi
                                    </h5>
                                </div>
                            </div>


                        </CardBody>
                    </Card>
                </Col> */}

            </Row>
        </React.Fragment>
    )
}

export default (EmrHeader);