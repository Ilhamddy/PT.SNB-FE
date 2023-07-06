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
    comboHistoryUnitGet, comboTindakanRadiologiGet, radiologiResetForm,
    saveOrderPelayananRadiologi,daftarOrderRadiologiGet
} from "../../../../../store/actions";

const OrderRadiologi = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();

    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo,
        dataTindakan, loadingTindakan, successTindakan,
        dataOrder, loadingOrder, successOrder } = useSelector((state) => ({
            newData: state.Radiologi.saveOrderPelayananRadiologi.newData,
            success: state.Radiologi.saveOrderPelayananRadiologi.success,
            loading: state.Radiologi.saveOrderPelayananRadiologi.loading,
            dataCombo: state.Emr.comboHistoryUnitGet.data,
            loadingCombo: state.Emr.comboHistoryUnitGet.loading,
            successCombo: state.Emr.comboHistoryUnitGet.success,
            dataTindakan: state.Emr.comboTindakanRadiologiGet.data,
            loadingTindakan: state.Emr.comboTindakanRadiologiGet.loading,
            successTindakan: state.Emr.comboTindakanRadiologiGet.success,
            dataOrder: state.Radiologi.daftarOrderRadiologiGet.data,
            loadingOrder: state.Radiologi.daftarOrderRadiologiGet.loading,
            successOrder: state.Radiologi.daftarOrderRadiologiGet.success,
        }));
    useEffect(() => {
        if (norecdp) {
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(comboTindakanRadiologiGet('8&objectunitfk=13&namaproduk='));
            dispatch(daftarOrderRadiologiGet(norecdp))
        }
    }, [norecdp, dispatch])
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}`);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: newData?.norecap ?? norecap,
            tindakan: newData?.tindakan ?? '',
            namatindakan: newData?.namatindakan??'',
            keterangan:newData?.keterangan??'',
            tglinput:newData?.tglinput??dateStart,
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
            dispatch(radiologiResetForm());
        }
    }, [dispatch])
    const handleBeginOnChangeTglInput = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        // setdateStart(dateString)
        validation.setFieldValue('tglinput', dateString)
    }
    const [count, setCount] = useState(1);
    const [harga, setHarga] = useState(0);

    const onClickCount = (temp) => {
        if (temp === 'min') {
            if (count > 0) {
                setCount(count - 1)
                // validation.setFieldValue('quantity', count - 1)
            }
        } else {
            setCount(count + 1)
            // validation.setFieldValue('quantity', count + 1)
        }

    }
    const hargaRef = useRef(0);
    const countRef = useRef(1);
    const handleTindakanSelcted = (selected) => {
        validation.setFieldValue('tindakan', selected.value)
        validation.setFieldValue('namatindakan', selected.label)
        setHarga(selected.totalharga)
        hargaRef.current = selected.totalharga

    }
    const handleTindakan = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(comboTindakanRadiologiGet('8&objectunitfk=13&namaproduk=' + characterEntered));
            // }, [dispatch]);
        }
    };

    const [searches, setSearches] = useState([])
    const onClickTambah = () => {
        if (validation.values.tindakan === '') {
            toast.error('Tindakan Belum Diisi', { autoClose: 3000 });
            return
        }

        let tempValue = {
            id: searches.length + 1,
            tindakan: validation.values.tindakan,
            namatindakan: validation.values.namatindakan,
            qty: count,
            harga: hargaRef.current,
            total: hargaRef.current * count
        }
        setSearches(searches => searches.concat(tempValue))
        console.log(searches)
        validation.setFieldValue('tindakan', '')
        validation.setFieldValue('namatindakan', '')
        setCount(1)
        hargaRef.current = 0
        setHarga(0)
    }
    const onClickSimpan = ()=>{
        if(searches.length===0){
            toast.error('Tindakan Belum Diisi...');
            return
        }
        let tempValue = {
            norecap: norecap,
            objectunitasal: validation.values.unitasal,
            listtindakan: searches,
            keterangan: validation.values.keterangan
        }
        // console.log(searches)
        dispatch(saveOrderPelayananRadiologi(tempValue));
    }
    useEffect(() => {
        if (newData !== null) {
            setSearches([])
            dispatch(daftarOrderRadiologiGet(norecdp))
        }
    }, [newData,norecdp, dispatch])
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
            name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
            selector: row => row.namatindakan,
            sortable: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Harga</span>,
            selector: row => row.harga,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Qty</span>,
            selector: row => row.qty,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.total,
            sortable: true,
            // width: "250px",
        },
    ];
    const columnsRiwayat = [
        {
            name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Order</span>,
            selector: row => row.tglinput,
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
                        <Col lg={5}>
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
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tindakan" className="form-label">Nama Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div>
                                        <CustomSelect
                                            id="tindakan"
                                            name="tindakan"
                                            options={dataTindakan}
                                            value={validation.values.tindakan || ""}
                                            className={`input ${validation.errors.tindakan ? "is-invalid" : ""}`}
                                            onChange={handleTindakanSelcted}
                                            onInputChange={handleTindakan}
                                        />
                                        {validation.touched.tindakan && validation.errors.tindakan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tindakan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={7}>
                            <Row>
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tanggal" className="form-label">Tanggal Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={6} md={6}>
                                    <div className="input-group">
                                        <Flatpickr
                                            className="form-control border-0 fs-5 dash-filter-picker shadow"
                                            options={{
                                                //  enableTime: true,
                                                // mode: "range",
                                                dateFormat: "Y-m-d H:i",
                                                defaultDate: "today"
                                            }}
                                            value={dateStart}
                                            onChange={([newDate]) => {
                                                handleBeginOnChangeTglInput(newDate);
                                            }}
                                        />
                                        <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                    </div>
                                </Col>
                                <Col lg={2} md={2}>
                                    <div className="form-check ms-2">
                                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                        <Label className="form-check-label" htmlFor="formCheck1" style={{ color: "black" }} >
                                            Cito
                                        </Label>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={4} sm={6}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="qty" className="form-label fw-semibold">Quantity</Label>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} className="mt-1">
                                            <div>
                                                <div className="input-step">
                                                    <button type="button" className="minus" onClick={() => onClickCount('min')}>
                                                        –
                                                    </button>
                                                    <Input
                                                        type="number"
                                                        className="product-quantity"
                                                        id="product-qty-1"
                                                        value={count}
                                                        readOnly
                                                    />
                                                    <button type="button" className="plus" onClick={() => onClickCount('plus')}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col lg={2} sm={6}> */}
                                        {/* <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tinggibadan" className="form-label fw-semibold">Harga</Label>
                                            </div> */}
                                        {/* </Col> */}
                                        <Col lg={4} sm={6} className="mt-1">
                                            <div>
                                                <Input
                                                    type="text"
                                                    className="form-control bg-light border-0 product-line-price"
                                                    id="harga"
                                                    placeholder="Rp.0.00"
                                                    value={"Rp " + harga * count}
                                                    readOnly
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={12}>
                                    <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                                        <Button type="button" color="info" className="rounded-pill" placement="top"
                                            onClick={() => onClickTambah()}>
                                            TAMBAH
                                        </Button>
                                        <Button type="button" color="danger" className="rounded-pill" placement="top" >
                                            BATAL
                                        </Button>
                                    </div>



                                </Col>
                            </Row>
                        </Col>
                        <Col lg={8} className="gy-2">
                            <Card>
                                <CardHeader style={{ backgroundColor: "#e67e22" }}>
                                    <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Daftar Order Tindakan</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                        fixedHeader
                                            columns={columns}
                                            pagination
                                            data={searches}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Col lg={10} sm={10} className="mt-1">
                                <div>
                                    <Input
                                    style={{ height: '300px' }}
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
                            <Col lg={2} sm={2} className="mt-1">
                                <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                                    <Button type="button" color="info" className="rounded-pill" placement="top"
                                    onClick={() => onClickSimpan()}>
                                        Simpan
                                    </Button>
                                </div>
                            </Col>
                        </Col>
                        <Col lg={12} className="gy-2">
                            <Card>
                                <CardHeader style={{ backgroundColor: "#e67e22" }}>
                                    <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Riwayat Order Tindakan</h4>
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
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={12} className="gy-2">
                            <Card>
                                <CardHeader style={{ backgroundColor: "#e67e22" }}>
                                    <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Hasil Radiologi</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                        fixedHeader
                                            columns={columns}
                                            pagination
                                            // data={searches}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
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

export default (OrderRadiologi)