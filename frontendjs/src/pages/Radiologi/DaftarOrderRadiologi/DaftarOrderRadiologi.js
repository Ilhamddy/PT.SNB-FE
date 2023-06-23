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
    widgetdaftarOrderRadiologiGet,radiologiResetForm
} from '../../../store/actions';

const DaftarOrderRadiologi = () => {
    document.title = "Daftar Order Radiologi";
    const dispatch = useDispatch();
    const { data, datawidget, loading, error} = useSelector((state) => ({
        // data: state.DaftarPasien.daftarPasienRJGet.data,
        datawidget: state.Radiologi.widgetdaftarOrderRadiologiGet.data,
       
    }));
    useEffect(() => {
        return () => {
            dispatch(radiologiResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(widgetdaftarOrderRadiologiGet(''));
       
    }, [dispatch]);
    const handleClickCard = (e) => {
        // setidPencarian(e.id)
        // setnamaPencarian(e.label)
        // if (e.id === 1) {
        //     dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
        //     dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
        // } else if (e.id === 2) {
        //     dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
        //     dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
        // } else if (e.id === 3) {
        //     dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
        //     dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
        // }
    };
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
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


                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (DaftarOrderRadiologi)