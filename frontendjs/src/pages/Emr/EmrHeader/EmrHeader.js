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
    const { norecdp, norecap,tab } = useParams();
    const dispatch = useDispatch();
    const { editData, dataTagihan, dataPasienReg, dataTtv, deposit } = useSelector(state => ({
        editData: state.Emr.emrHeaderGet.data,
        deposit: state.Emr.emrHeaderGet.data?.deposit || [],
        dataTagihan: state.Emr.listTagihanGet.data,
        dataPasienReg: state.Registrasi.registrasiRuangNorecGet.data || null,
        dataTtv: state.Emr.emrTtvGet.data,
    }));
    useEffect(() => {
        if (norecap) {
            dispatch(emrHeaderGet(norecap + `&norecdp=${norecdp}`));
        }
    }, [norecap, norecdp, tab,dispatch])

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

    const totalTagihan = dataTagihan.reduce((total, item) => total + item.total, 0)
    const dataTtvNol = ([...(dataTtv || [])]?.sort(sortStringDate)?.[0]) || null
    const totalDeposit = deposit.reduce((prev, currDep) => (prev + (currDep.nominal || 0)), 0)
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
                                {/* <div className="flex-shrink-0">
                                    <Link to="#" className="badge badge-soft-info badge-border">{}</Link>
                                    <Link to="#" className="badge badge-soft-primary badge-border">{editData.umur}</Link>
                                </div> */}
                                
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">{editData.jeniskelamin === "LAKI-LAKI" ? "L" : "P"} | {editData.namapasien}</h6>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">{editData.tgllahir} ({editData.umur})</h6>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">{dataPasienReg?.dokter?.[0]?.namaexternal || ""}</h6>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">{dataPasienReg?.unit?.[0]?.namaunit || ""}</h6>
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
                                {/* <div className="flex-shrink-0">
                                    <Link to="#" className="badge badge-soft-primary badge-border">{editData.namarekanan}</Link>
                                </div> */}
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">{editData.nocm} / {editData.noregistrasi}</h6>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">{dataPasienReg?.kelas?.[0]?.namakelas}</h6>
                            </div>
                            {dataPasienReg?.tglregistrasi &&
                                <div className='d-flex justify-content-between mb-1'>
                                    <h6 className="text-muted mb-0">{'Tgl Masuk: ' + (new Date(dataPasienReg?.tglregistrasi))
                                    ?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) 
                                    || "-"}</h6>
                                </div>
                            }
                            {dataPasienReg?.tglpulang && 
                                <div className='d-flex justify-content-between mb-1'>
                                    <h6 className="text-muted mb-0">{'Tgl Keluar: ' + new Date(dataPasienReg?.tglpulang)
                                    ?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}</h6>
                                </div>
                            }
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
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">Total tagihan:</h6>
                                <h6 className="text-muted mb-0">{totalTagihan.toLocaleString('id-ID')}</h6>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">Deposit:</h6>
                                <h6 className="text-muted mb-0">{totalDeposit}</h6>
                            </div>
                            {/* <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">Total Bayar:</h6>
                                <h6 className="text-muted mb-0">{0}</h6>
                            </div> */}
                            <div className='d-flex justify-content-between mb-1'>
                                <h6 className="text-muted mb-0">Sisa tagihan:</h6>
                                <h6 className="text-muted mb-0">{((totalTagihan - totalDeposit) > 0 ? totalTagihan - totalDeposit : 0).toLocaleString('id-ID')}</h6>
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

                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.tekanandarah || "- "}mmHg</h6>
                                        <h6 className="text-muted mb-0">TD</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.pernapasan || "- "} x/menit</h6>
                                        <h6 className="text-muted mb-0">PERNAFASAN</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.suhu || "- "} °C</h6>
                                        <h6 className="text-muted mb-0">SUHU</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.nadi || "- "} x/menit</h6>
                                        <h6 className="text-muted mb-0">NADI</h6>
                                    </div>
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
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.spo2 || "- "}%</h6>
                                        <h6 className="text-muted mb-0">SpO2</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.keadaanumum || "-"}</h6>
                                        <h6 className="text-muted mb-0">KEADAAN UMUM</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.e || ""} {dataTtvNol?.m || ""} {dataTtvNol?.v || ""} {dataTtvNol?.namagcs ? `(${dataTtvNol?.namagcs})` : "-"}</h6>
                                        <h6 className="text-muted mb-0">KESADARAN</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0"> - </h6>
                                        <h6 className="text-muted mb-0">DIAGNOSA</h6>
                                    </div>
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
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.beratbadan || "- "} Kg</h6>
                                        <h6 className="text-muted mb-0">BB</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-1'>
                                        <h6 className="text-muted mb-0">{dataTtvNol?.tinggibadan || "- "} cm</h6>
                                        <h6 className="text-muted mb-0">TB</h6>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    </Swiper>
                </Col>


                {/* <Col xxl={3} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#FFCB46' }}>
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
                    <Card className="card-animate" style={{ backgroundColor: '#FFCB46' }}>
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

const sortStringDate = (a,b) => {
    let stra = a.tglregistrasi;
    let strb = b.tglregistrasi;
    return strb > stra ? 1 : strb < stra ? -1 : 0;
}

export default (EmrHeader);