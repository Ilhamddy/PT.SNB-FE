import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip, ListGroup, ListGroupItem, Collapse
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import UiContent from '../../../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import CustomSelect from '../../../../Select/Select';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    laboratoriumResetForm, widgetDetailJenisProdukGet
} from "../../../../../store/actions";
import ListGroupCollapse from '../../../../../Components/Common/ListGroupCollapse';

const OrderLaboratorium = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
        dataWidget, loadingWidget, successWidget } = useSelector((state) => ({
            // newData: state.Radiologi.saveOrderPelayananRadiologi.newData,
            // success: state.Radiologi.saveOrderPelayananRadiologi.success,
            // loading: state.Radiologi.saveOrderPelayananRadiologi.loading,
            dataWidget: state.Laboratorium.widgetDetailJenisProdukGet.data,
            loadingWidget: state.Laboratorium.widgetDetailJenisProdukGet.loading,
            successWidget: state.Laboratorium.widgetDetailJenisProdukGet.success,

        }));

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: newData?.norecap ?? norecap,

        },
        validationSchema: Yup.object({
            tindakan: Yup.string().required("Tindakan Belum Dipilih"),
            unitasal: Yup.string().required("Unit Asal Belum Dipilih"),
            namatindakan: Yup.string().required("Nama Tindakan Asal Belum Dipilih"),

        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            // dispatch(tindakanSave(values, ''));
            resetForm({ values: '' })
        }
    })
    useEffect(() => {
        return () => {
            dispatch(widgetDetailJenisProdukGet(''));
        }
    }, [dispatch])
    const handleClickCard = (e) => {
        setcol1(true)
    };
    const [col1, setcol1] = useState(false);
    const things = {
        idk: {
            createdAt: new Date(),
            title: 'thing 1'
        },
        another: {
            createdAt: new Date('2010-10-10'),
            title: 'thing 2'
        },
        more: {
            createdAt: new Date('2011-11-11'),
            title: 'thing 3'
        }
    }
    return (
        <React.Fragment>
            <Row className="gy-4">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row>
                        {Object.keys(dataWidget).map((key, index) =>
                            <Col xxl={4} sm={6} key={key}>
                                <ListGroupCollapse key={key} cat={dataWidget[key]} index={index} />
                            </Col>
                        )}
                        {/* {dataWidget.map((item, key) => (
                            <Col xxl={4} sm={6} key={key}>
                                <Card className="card-animate">
                                    <div className="card-footer" style={{ backgroundColor: '#e67e22' }}>
                                        <div className="text-center">
                                            <Link to="#" className="link-light" onClick={() => handleClickCard(item)}>{item.detailjenisproduk} <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                                        </div>
                                    </div>
                                    <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
                                        <div className="accordion-body">
                                            Although you probably won’t get into any legal trouble if you do it just once, why risk it? If you made your subscribers a promise, you should honor that. If not, you run the risk of a drastic increase in opt outs, which will only hurt you in the long run.
                                        </div>
                                    </Collapse>
                                </Card>
                            </Col>
                        ))} */}
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}
export default (OrderLaboratorium)