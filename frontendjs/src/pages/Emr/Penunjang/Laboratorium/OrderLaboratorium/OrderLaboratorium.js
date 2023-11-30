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
    laboratoriumResetForm, widgetDetailJenisProdukGet,
    saveOrderPelayananLaboratorium, comboHistoryUnitGet,
    daftarOrderLaboratoriumGet
} from "../../../../../store/actions";
import ListGroupCollapse from '../../../../../Components/Common/ListGroupCollapse';
import LoadingTable from '../../../../../Components/Table/LoadingTable';
import { dateTimeLocal } from '../../../../../utils/format';
import { tableCustomStyles } from '../../../../../Components/Table/tableCustomStyles';

const OrderLaboratorium = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
        dataWidget, loadingWidget, successWidget,dataCombo, loadingCombo, successCombo,
        dataOrder, loadingOrder, successOrder } = useSelector((state) => ({
            newData: state.Laboratorium.saveOrderPelayananLaboratorium.newData,
            success: state.Laboratorium.saveOrderPelayananLaboratorium.success,
            loading: state.Laboratorium.saveOrderPelayananLaboratorium.loading,
            dataWidget: state.Laboratorium.widgetDetailJenisProdukGet.data,
            loadingWidget: state.Laboratorium.widgetDetailJenisProdukGet.loading,
            successWidget: state.Laboratorium.widgetDetailJenisProdukGet.success,
            dataCombo: state.Emr.comboHistoryUnitGet.data,
            loadingCombo: state.Emr.comboHistoryUnitGet.loading,
            successCombo: state.Emr.comboHistoryUnitGet.success,
            dataOrder: state.Laboratorium.daftarOrderLaboratoriumGet.data,
            loadingOrder: state.Laboratorium.daftarOrderLaboratoriumGet.loading,
            successOrder: state.Laboratorium.daftarOrderLaboratoriumGet.success,
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
            // dispatch(saveOrderPelayananLaboratorium(values, ''));
            resetForm({ values: '' })
        }
    })
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
   
    useEffect(() => {
        if (norecdp) {
            dispatch(widgetDetailJenisProdukGet(''));
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(daftarOrderLaboratoriumGet(norecdp))
        }
    }, [norecdp, dispatch])
    const handleClickCard = (e) => {
        setcol1(true)
    };
    const [temp, setTemp] = useState([]);
    const [col1, setcol1] = useState(false);

    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
            selector: row => row.label,
            sortable: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Harga</span>,
            selector: row => row.harga?.toLocaleString('id-ID'),
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Qty</span>,
            selector: row => 1,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.harga?.toLocaleString('id-ID'),
            sortable: true,
            // width: "250px",
        },
    ];
    const onClickSimpan = () => {
        if (validation.values.unitasal === '') {
            toast.error('Unit Belum Diisi', { autoClose: 3000 });
            return
        }
        let tempValue = {
            norecap: norecap,
            objectunitasal: validation.values.unitasal,
            listtindakan: temp,
            keterangan: validation.values.keterangan
        }
        // console.log(tempValue)
        dispatch(saveOrderPelayananLaboratorium(tempValue));
    }
    const columnsRiwayat = [
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Order</span>,
            selector: row => dateTimeLocal(row.tglinput),
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

            name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
            selector: row => row.namaproduk,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            selector: row => row.keterangan,
            sortable: true,
            // width: "250px",
        },
    ];
    return (
        <React.Fragment>
            <Row className="gy-4 p-5">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="gy-2">
                        <Col lg={12}>
                            <Row className="gy-2">
                                <Col lg={6}>
                                    <Row className="gy-2">
                                        <Col lg={4} md={4}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="unitasal" className="form-label">Unit Asal</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8} md={8}>
                                            <div>
                                                <CustomSelect
                                                    id="unitasal"
                                                    name="unitasal"
                                                    options={dataCombo}
                                                    value={validation.values.unitasal || ""}
                                                    className={`input ${validation.errors.unitasal ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('unitasal', value.value)}
                                                />
                                                {validation.touched.unitasal && validation.errors.unitasal ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.unitasal}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6}></Col>
                            </Row>
                        </Col>
                        {Object.keys(dataWidget).map((key, index) =>
                            <Col xxl={4} sm={6} key={key}>
                                <ListGroupCollapse
                                    key={key}
                                    cat={dataWidget[key]} 
                                    tempData={temp} 
                                    index={index}
                                    onChange={(tempData) => {
                                        setTemp(tempData)
                                    }} />
                            </Col>
                        )}
                        <Col lg={8} className="gy-2">
                            <Card>
                                <CardHeader className="card-header-snb ">
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Order Tindakan</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            columns={columns}
                                            pagination
                                            data={temp}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Row className="gy-2">
                                <Col lg={8} sm={10} className="mt-1">
                                    <div>
                                        <Input
                                            style={{ height: '200px' }}
                                            id="keterangan"
                                            name="keterangan"
                                            type="textarea"
                                            placeholder="Keterangan Order"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.keterangan || ""}
                                            invalid={
                                                validation.touched.keterangan && validation.errors.keterangan ? true : false
                                            }
                                        />
                                        {validation.touched.keterangan && validation.errors.keterangan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.keterangan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={4} sm={2} className="mt-1">
                                    <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                                        <Button type="button" color="success" placement="top"
                                            onClick={() => onClickSimpan()}>
                                            Simpan
                                        </Button>
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={12} className="gy-2">
                            <Card>
                                <CardHeader className="card-header-snb ">
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Riwayat Order Tindakan</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                        fixedHeader
                                            columns={columnsRiwayat}
                                            pagination
                                            data={dataOrder}
                                            progressPending={loadingOrder}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}
export default (OrderLaboratorium)