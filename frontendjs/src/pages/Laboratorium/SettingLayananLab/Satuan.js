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
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect';
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    comboLaboratoriumGet, saveNilaiNormalLaboratorium, satuanSaveOrUpdate, lainLainGet
} from '../../../store/actions';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import CustomInput from '../../../Components/Common/CustomInput/CustomInput';

const Satuan = () => {
    document.title = "Satuan";
    const dispatch = useDispatch();
    const history = useNavigate();
    const refJenisSatuan = useRef(null);
    const optionStatusEnabled = [
        {
            value: true,
            label: "Aktif"
        },
        {
            value: false,
            label: "NonAktif"
        }
    ]
    const {
        comboSettingProduk,
        detailjenisproduk,
        sediaan,
        satuan
    } = useSelector(state => ({
        comboSettingProduk: state.Master.comboSettingProdukGet.data,
        detailjenisproduk: state.Gudang.lainLainGet.data?.detailjenisproduk || [],
        sediaan: state.Gudang.lainLainGet.data?.sediaan || [],
        satuan: state.Gudang.lainLainGet.data?.satuan || [],
    }))
    const vSatuan = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: "",
            satuan: "",
            jenissatuan: "",
            statusenabled: true,
        },
        validationSchema: Yup.object({
            satuan: Yup.string().required("Satuan harus diisi"),
            jenissatuan: Yup.string().required("Jenis satuan harus diisi")
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(satuanSaveOrUpdate(values, () => {
                dispatch(lainLainGet())
            }));

        }
    })
    useEffect(() => {
        dispatch(lainLainGet())
    }, [dispatch])
    const handleEditSatuan = (row) => {
        vSatuan.setFieldValue("id", row.id);
        vSatuan.setFieldValue("satuan", row.satuan);
        vSatuan.setFieldValue("jenissatuan", row.idjenissatuan);
    }
    const columnsSatuan = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Status Enabled</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.statusenabled ? "Aktif" : "NonAktif",
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Jenis satuan</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.jenissatuan,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan</span>,
            selector: (row, index) => (
                <div>
                    <Link
                        className="lain-edit-2-line"
                        id={`edit-satuan-${index}`}
                        onClick={() => handleEditSatuan(row)}
                    >
                        {row.satuan}
                    </Link>
                    <UncontrolledTooltip
                        placement="top"
                        target={`edit-satuan-${index}`}>
                        Edit {row.satuan}
                    </UncontrolledTooltip>
                </div>),
            sortable: true,
            width: "170px"
        }
    ];
    const handleBack = () => {
        history("/laboratorium/masterlayananlab");
    };
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Satuan <span style={{ color: '#FFCB46' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='mb-2'>
                                <Row className="g-3">
                                    <Col lg={6}>
                                        <DataTable
                                            fixedHeader
                                            columns={columnsSatuan}
                                            pagination
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5]}
                                            data={satuan}
                                            progressPending={false}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                vSatuan.handleSubmit();
                                                return false;
                                            }}
                                            className="gy-4"
                                            action="#">
                                            <Row className="mb-2">
                                                <Col lg={5}>
                                                    <Label className="form-label mt-2"
                                                        htmlFor="satuan"
                                                        style={{ color: "black" }}
                                                    >
                                                        Satuan
                                                    </Label>
                                                </Col>
                                                <Col lg={7}>
                                                    <CustomInput
                                                        id={`satuan`}
                                                        name={`satuan`}
                                                        type="text"
                                                        value={vSatuan.values.satuan}
                                                        onChange={vSatuan.handleChange}
                                                        invalid={
                                                            vSatuan.touched.satuan
                                                            && !!vSatuan.errors.satuan
                                                        }
                                                    />
                                                    {vSatuan.touched.satuan
                                                        && !!vSatuan.errors.satuan && (
                                                            <FormFeedback type="invalid" >
                                                                <div>
                                                                    {vSatuan.errors.satuan}
                                                                </div>
                                                            </FormFeedback>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col lg={5}>
                                                    <Label
                                                        style={{ color: "black" }}
                                                        htmlFor={`jenissatuan`}
                                                        className="form-label mt-2">
                                                        Jenis Satuan
                                                    </Label>
                                                </Col>
                                                <Col lg={7}>
                                                    <CustomSelect
                                                        id={`jenissatuan`}
                                                        name={`jenissatuan`}
                                                        options={comboSettingProduk?.jenissatuan || []}
                                                        onChange={(e) => {
                                                            vSatuan.setFieldValue('jenissatuan', e?.value || "")
                                                        }}
                                                        value={vSatuan.values.jenissatuan}
                                                        ref={refJenisSatuan}
                                                    />
                                                    {vSatuan.touched.jenissatuan
                                                        && !!vSatuan.errors.jenissatuan && (
                                                            <FormFeedback type="invalid" >
                                                                <div>
                                                                    {vSatuan.errors.jenissatuan}
                                                                </div>
                                                            </FormFeedback>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col lg={5}>
                                                    <Label
                                                        style={{ color: "black" }}
                                                        htmlFor={`statusenabledsatuan`}
                                                        className="form-label mt-2">
                                                        Status Enabled
                                                    </Label>
                                                </Col>
                                                <Col lg={7}>
                                                    <CustomSelect
                                                        id={`statusenabledsatuan`}
                                                        name={`statusenabledsatuan`}
                                                        options={optionStatusEnabled}
                                                        onChange={(e) => { vSatuan.setFieldValue('statusenabled', e?.value) }}
                                                        value={vSatuan.values.statusenabled}
                                                    />
                                                    {vSatuan.touched.statusenabled
                                                        && !!vSatuan.errors.statusenabled && (
                                                            <FormFeedback type="invalid" >
                                                                <div>
                                                                    {vSatuan.errors.statusenabled}
                                                                </div>
                                                            </FormFeedback>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                                    <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                                        {vSatuan.values.id ? "Edit" : "Tambah"}
                                                    </Button>
                                                    <Button type="button"
                                                        className="btn-danger"
                                                        placement="top"
                                                        id="tooltipTop"
                                                        onClick={() => {
                                                            vSatuan.resetForm()
                                                            refJenisSatuan.current.clearValue()
                                                        }}
                                                    >
                                                        Batal
                                                    </Button>
                                                    <Button type="button" color='danger' placement="top" onClick={handleBack}>
                                                    Back
                                                </Button>
                                                </div>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}


export default withRouter(Satuan)