import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Card, CardBody, CardHeader, Modal, ModalBody, Col, Label, Input, Row, Form,
    Button, FormFeedback,DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import CustomSelect from "../../../Components/Common/CustomSelect/CustomSelect";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';
import {
    listOrderLaboratoriumByNorecGet,updateTglRencanaLaboratorium,saveVerifikasiLaboratorium,
    deleteDetailOrderPelayanan,laboratoriumResetForm
} from "../../../store/actions";
import LoadingTable from "../../../Components/Table/LoadingTable";
import { tableCustomStyles } from "../../../Components/Table/tableCustomStyles";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";

const DetailOrderModal = ({ show, onSimpanClick, onCloseClick,onTolakClick, tempNorec }) => {
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
        dataOrder, loadingOrder, successOrder,
        dataKamar, loadingKamar, successKamar,
        updateVerifikasi, loadingVerifikasi, successVerifikasi,
        deleteDetail,successdeleteDetail,loadingdeleteDetail } = useSelector((state) => ({
        newData: state.Laboratorium.updateTglRencanaLaboratorium.newData,
        success: state.Laboratorium.updateTglRencanaLaboratorium.success,
        loading: state.Laboratorium.updateTglRencanaLaboratorium.loading,
        dataOrder: state.Laboratorium.listOrderLaboratoriumByNorecGet.data,
        loadingOrder: state.Laboratorium.listOrderLaboratoriumByNorecGet.loading,
        successOrder: state.Laboratorium.listOrderLaboratoriumByNorecGet.success,
        updateVerifikasi: state.Laboratorium.saveVerifikasiLaboratorium.newData,
        successVerifikasi: state.Laboratorium.saveVerifikasiLaboratorium.success,
        loadingVerifikasi: state.Laboratorium.saveVerifikasiLaboratorium.loading,
        // deleteDetail: state.Radiologi.deleteDetailOrderPelayanan.newData,
        // successdeleteDetail: state.Radiologi.deleteDetailOrderPelayanan.success,
        // loadingdeleteDetail: state.Radiologi.deleteDetailOrderPelayanan.loading,
    }));
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (tempNorec) {
            dispatch(listOrderLaboratoriumByNorecGet(tempNorec));
        }
    }, [tempNorec, dispatch])
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}`);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norec: editData?.norec ?? tempNorec,
            namatindakan: editData?.namatindakan ?? '',
            norecselected: editData?.norecselected ?? '',
            tglinput:editData?.tglinput??dateStart,
        },
        validationSchema: Yup.object({
            namatindakan: Yup.string().required("Nama Tindakan wajib diisi"),
            // nokamar: Yup.string().required("No Kamar wajib diisi"),

        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(updateTglRencanaLaboratorium(values,''));
            resetForm({ values: '' })
        }
    })
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
   
    
    const [tempSelected, settempSelected] = useState("");
    const handleClick = (e)=>{
        settempSelected(e)
        validation.setFieldValue('norecselected', e.norec)
        validation.setFieldValue('namatindakan', e.namaproduk)
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>TGL Order</span>,
            selector: row => row.tglinput,
            sortable: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
            // selector: row => row.namaproduk,
            sortable: true,
            cell: (data) => {
                return (
                    // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
                    <button className="btn btn-sm btn-soft-info" type="button" onClick={() => handleClick(data)}>{data.namaproduk}</button>
                );
            },
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
        {
            name: <span className='font-weight-bold fs-13'>Pegawai Verif</span>,
            selector: row => row.pegawaiverif,
            sortable: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>Rencana Tindakan</span>,
            selector: row => row.tglinput,
            sortable: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>#</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button" onClick={() => onClickDelete(data)}>
                                <i className="ri-delete-bin-2-line"></i>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip>
                    </div>
                );
            },
            width: "50px"
        },
    ];
    const onClickSimpan = ()=>{
        let tempValue = {
            norec: tempNorec,
            tglinput:validation.values.tglinput
        }
        dispatch(saveVerifikasiLaboratorium(tempValue));
    }
    const onClickDelete = (e) => {
        // setProduct(product);
        // setDeleteModal(true);
        let tempValue = {
            norec: e.norec
        }
        dispatch(deleteDetailOrderPelayanan(tempValue))
    };
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true} size="xl">
            <ModalBody className="py-12 px-12">
                {/* <div className="mt-2 text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/zganwmkl.json"
                        trigger="loop"
                        colors="outline:#121331,primary:#3a3347,secondary:#646e78"
                        style={{ width: "100px", height: "100px" }}
                    ></lord-icon>

                </div> */}
                <Row>
                    <Col md={12}>
                        <div>
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
                                        <Row>
                                            <Col md={4} className="mt-2"><Label htmlFor="namatindakan" className="form-label">Nama Tindakan</Label></Col>
                                            <Col md={8} className="mb-2">
                                                <Input
                                                    id="namatindakan"
                                                    name="namatindakan"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.namatindakan || ""}
                                                    invalid={
                                                        validation.touched.namatindakan && validation.errors.namatindakan ? true : false
                                                    }
                                                    disabled
                                                />
                                                {validation.touched.namatindakan && validation.errors.namatindakan ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.namatindakan}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={7}>
                                        <Row>
                                            <Col lg={4} md={4}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tanggal" className="form-label">Rencana Tindakan</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8} md={8}>
                                                <KontainerFlatpickr
                                                    options={{
                                                        dateFormat: "Y-m-d H:i",
                                                        defaultDate: "today"
                                                    }}
                                                    value={dateStart}
                                                    onChange={([newDate]) => {
                                                        handleBeginOnChangeTglInput(newDate);
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={12} className="mt-3 mb-4">
                                                <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                                                    <Button type="submit" color="info" placement="top">
                                                        Edit
                                                    </Button>
                                                    <Button type="button" color="danger" placement="top" >
                                                        BATAL
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12} className="gy-2">
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
                                                        data={dataOrder}
                                                        progressPending={loadingOrder}
                                                        customStyles={tableCustomStyles}
                                                        progressComponent={<LoadingTable />}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <button
                                            type="button"
                                            className="btn w-sm btn-light"
                                            data-bs-dismiss="modal"
                                            onClick={onCloseClick}
                                        >
                                            Tutup
                                        </button>

                                        <Button type="button" color="success" placement="top" id="tooltipTop"
                                        onClick={() => onClickSimpan()} >
                                            SIMPAN
                                        </Button>
                                        <button
                                            type="button"
                                            className="btn w-sm btn-danger"
                                            data-bs-dismiss="modal"
                                            onClick={onTolakClick}
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </Row>

                            </Form>
                        </div>
                    </Col>
                </Row>

            </ModalBody>
        </Modal>
    );
};

DetailOrderModal.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
    onTolakClick: PropTypes.func,
};

export default DetailOrderModal;