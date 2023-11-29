import React, { useEffect, useState, useCallback, useReducer, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
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
import DataTable from 'react-data-table-component';
import CustomSelect from '../../Select/Select';

import {
    emrJenisPelayananSave, emrResetForm, emrComboGet, getHistoriJenisPelayanan
} from "../../../store/actions";
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';
import LoadingTable from '../../../Components/Table/LoadingTable';

const JenisPelayanan = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataCombo, loadingCombo,
        dataJP } = useSelector((state) => ({
        newData: state.Emr.emrJenisPelayananSave.newData,
        success: state.Emr.emrJenisPelayananSave.success,
        loading: state.Emr.emrJenisPelayananSave.loading,
        dataCombo: state.Emr.emrComboGet.data,
        loadingCombo: state.Emr.emrComboGet.loading,
        dataJP: state.Emr.getHistoriJenisPelayanan.data,
    }));


    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecdp: editData?.norecdp ?? norecdp,
            jenispelayanan: editData?.jenispelayanan ?? ''
        },
        validationSchema: Yup.object({
            jenispelayanan: Yup.string().required("Tipe Diagnosa Belum Diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(emrJenisPelayananSave(values, ''));
            resetForm({ values: '' })
        }
    })
    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (norecdp) {
            dispatch(emrComboGet('combo'));
            dispatch(getHistoriJenisPelayanan({norecdp:norecdp}))
        }
    }, [norecdp, dispatch])
    useEffect(() => {
        const setFF = validation.setFieldValue
        if (dataJP) {
            const idjenispelayanan = dataJP?.[0]?.objectjenispelayananfk || ""
            setFF('jenispelayanan', idjenispelayanan);
        }
    }, [validation.setFieldValue, dataJP])
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
                    <Card>
                        <CardHeader className="card-header-snb ">
                            <h4 className="card-title mb-0" style={{ color: 'black' }}>Jenis Pelayanan Pasien</h4>
                        </CardHeader>
                        <CardBody>
                            <Row className="gy-2">
                                <Col xxl={2} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="jenispelayanan" className="form-label">Jenis Pelayanan</Label>
                                    </div>
                                </Col>
                                <Col xxl={3} md={4}>
                                    <div>
                                        <CustomSelect
                                            id="jenispelayanan"
                                            name="jenispelayanan"
                                            options={dataCombo.jenispelayanan}
                                            value={validation.values.jenispelayanan || ""}
                                            className={`input ${validation.errors.jenispelayanan ? "is-invalid" : ""}`}
                                            onChange={value => {
                                                validation.setFieldValue('jenispelayanan', value?.value || "")
                                            }}
                                        />
                                        {validation.touched.jenispelayanan && validation.errors.jenispelayanan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.jenispelayanan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col xxl={7} md={4} >
                                    <Button type="submit" color="success" placement="top">
                                        SIMPAN
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (JenisPelayanan)