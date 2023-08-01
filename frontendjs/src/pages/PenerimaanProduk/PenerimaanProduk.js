import { useState, useEffect, useRef } from "react";
import { Button, 
    Card, 
    CardBody, 
    Col, 
    Container, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    FormFeedback, 
    Input, 
    Label, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { produkMasterGet } from "../../store/actions";



const PenerimaanProduk = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            nomorterima: "",
        },
        validationSchema: Yup.object({
            nomorterima: Yup.string().required("No Terima harus diisi"),
        }),
        onSubmit: (values) => {

        }
    })
    
    return (
        <div className="page-content page-list-produk">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Penerimaan Barang" pageTitle="Penerimaan Barang" />
                <Card className="p-5">
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`nomorterima`}
                                className="form-label">
                                No Terima
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <Input 
                                id={`nomorterima`}
                                name={`nomorterima`}
                                type="text"
                                value={validation.values.nomorterima} 
                                onChange={validation.handleChange}
                                invalid={validation.touched.nomorterima && !!validation.errors.nomorterima}
                                />
                            {validation.touched.nomorterima && validation.errors.nomorterima ? (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {validation.errors.nomorterima}
                                    </div>
                                </FormFeedback>
                            ) : null}
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}


const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#B57602'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },

    }
}


export default PenerimaanProduk;