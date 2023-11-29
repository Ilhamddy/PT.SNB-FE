import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Card, CardBody, CardHeader, Modal, ModalBody, Col, Label, Input, Row, Form,
    Button, FormFeedback, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import CustomSelect from "../../pages/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";
import PrintHasilLaboratorium from "../../pages/Print/PrintHasilLaboratorium/PrintHasilLaboratorium";
import PrintTemplate from "../../pages/Print/PrintTemplate/PrintTemplate";
import {
    daftarPasienNorecGet,listCetakHasiilLabGet
} from "../../store/actions";
import KontainerFlatpickr from "../KontainerFlatpickr/KontainerFlatpickr";

const CetakLabModal = ({ show, norecdp, norecap, onCloseClick,tempNorecPel }) => {
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataReg,
    dataCetak } = useSelector((state) => ({
        dataReg: state.DaftarPasien.daftarPasienNoRecGet.data,
        dataCetak: state.Laboratorium.listCetakHasiilLabGet.data
        // newData: state.Emr.konsulSave.newData,
        // success: state.Emr.konsulSave.success,
        // loading: state.Emr.konsulSave.loading,
    }));
    useEffect(() => {
        norecdp && dispatch(daftarPasienNorecGet(norecdp));
        dispatch(listCetakHasiilLabGet(tempNorecPel))
    }, [dispatch, norecap, norecdp,tempNorecPel])
    const [tempDataDokter, settempDataDokter] = useState([]);
    const [tempDataUnit, settempDataUnit] = useState([]);
    useEffect(() => {
        if (dataReg.dokter !== undefined) {
            const optionsArray = dataReg.dokter.map(item => ({
                value: item.namalengkap, // Use a unique identifier from your data
                label: item.namalengkap // Use the appropriate property from your data
            }));
            settempDataDokter(optionsArray)
            const optionsArray2 = dataReg.unitantrean.map(item => ({
                value: item.namaunit, // Use a unique identifier from your data
                label: item.namaunit // Use the appropriate property from your data
            }));
            settempDataUnit(optionsArray2)
        }
    }, [dispatch, dataReg])
    const [dateStart, setdateStart] = useState((new Date()).toISOString());
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: norecap,
            dokterlab: '',
            unitpengirim: '',
            dokterpengirim: '',
            tgllayanan: dateStart,
            tglhasil: dateStart,
            tglcetak: dateStart,
            tglpengambilansample: dateStart
        },
        validationSchema: Yup.object({
            dokterlab: Yup.string().required("Dokter Lab wajib diisi"),
            unitpengirim: Yup.string().required("Unit Tujuan wajib diisi"),
            dokterpengirim: Yup.string().required("Dokter Pengirim wajib diisi"),
            // tgllayanan: Yup.string().required("Tanggal Layanan wajib diisi"),
            // tglhasil: Yup.string().required("Tanggal Hasil wajib diisi"),
            // tglcetak: Yup.string().required("Tanggal Cetak wajib diisi"),
            // tglpengambilansample: Yup.string().required("Tanggal Pengambilan Sample wajib diisi"),

        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            // dispatch(konsulSave(values, '', () => {
            //     onSimpanClick()
            // }));
            // console.log(validation.values.dokterlab)
            refPrintHasilLab.current?.handlePrint();
            // resetForm()
        }
    })
    const refPrintHasilLab = useRef(null);

    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true} size="xl">
            <ModalBody className="py-12 px-12">
                <Row>
                    <Col md={12}>
                        <div>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (Object.keys(validation.errors).length) {
                                        console.error(validation.errors);
                                    }
                                    validation.handleSubmit();
                                    return false;
                                }}
                                className="gy-4"
                                action="#">
                                <Card>
                                    <CardHeader className="card-header-snb">
                                        <h4 className="card-title mb-0" style={{ color: 'black' }}>Cetak Hasil Laboratorium</h4>
                                    </CardHeader>
                                    <CardBody>

                                        <Row>
                                            <Col lg={12}>
                                                <Col lg={6}>
                                                    <div>
                                                        <CustomSelect
                                                            id="dokterlab"
                                                            name="dokterlab"
                                                            options={tempDataDokter}
                                                            value={validation.values.dokterlab || ""}
                                                            className={`input ${validation.errors.dokterlab ? "is-invalid" : ""}`}
                                                            onChange={value => validation.setFieldValue('dokterlab', value.value)}
                                                            invalid={
                                                                validation.touched.dokterlab && validation.errors.dokterlab ? true : false
                                                            }
                                                        />
                                                        {validation.touched.dokterlab && validation.errors.dokterlab ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.dokterlab}</div></FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>


                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Unit Pengirim</Label>
                                                </div>
                                                <div>
                                                    <CustomSelect
                                                        id="unitpengirim"
                                                        name="unitpengirim"
                                                        options={tempDataUnit}
                                                        value={validation.values.unitpengirim || ""}
                                                        className={`input ${validation.errors.unitpengirim ? "is-invalid" : ""}`}
                                                        onChange={value => validation.setFieldValue('unitpengirim', value.value)}
                                                        invalid={
                                                            validation.touched.unitpengirim && validation.errors.unitpengirim ? true : false
                                                        }
                                                    />
                                                    {validation.touched.unitpengirim && validation.errors.unitpengirim ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.unitpengirim}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Dokter Pengirim</Label>
                                                </div>
                                                <div>
                                                    <CustomSelect
                                                        id="dokterpengirim"
                                                        name="dokterpengirim"
                                                        options={tempDataDokter}
                                                        value={validation.values.dokterpengirim || ""}
                                                        className={`input ${validation.errors.dokterpengirim ? "is-invalid" : ""}`}
                                                        onChange={value => validation.setFieldValue('dokterpengirim', value.value)}
                                                        invalid={
                                                            validation.touched.dokterpengirim && validation.errors.dokterpengirim ? true : false
                                                        }
                                                    />
                                                    {validation.touched.dokterpengirim && validation.errors.dokterpengirim ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.dokterpengirim}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Pelayanan</Label>
                                                </div>
                                                <KontainerFlatpickr
                                                    id="tgllayanan"
                                                    options={{
                                                        enableTime: true,
                                                        // mode: "range",
                                                        dateFormat: "Y-m-d H:i",
                                                        defaultDate: "today"
                                                    }}
                                                    value={validation.values.tgllayanan}
                                                    onChange={([newDate]) => {
                                                        validation.setFieldValue("tgllayanan", newDate.toISOString());
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Keluar Hasil</Label>
                                                </div>
                                                <KontainerFlatpickr
                                                    id="tglhasil"
                                                    options={{
                                                        enableTime: true,
                                                        // mode: "range",
                                                        dateFormat: "Y-m-d H:i",
                                                        defaultDate: "today"
                                                    }}
                                                    value={validation.values.tglhasil}
                                                    onChange={([newDate]) => {
                                                        validation.setFieldValue("tglhasil", newDate.toISOString());
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Cetak</Label>
                                                </div>
                                                <KontainerFlatpickr
                                                    id="tglcetak"
                                                    options={{
                                                        enableTime: true,
                                                        // mode: "range",
                                                        dateFormat: "Y-m-d H:i",
                                                        defaultDate: "today"
                                                    }}
                                                    value={validation.values.tglcetak}
                                                    onChange={([newDate]) => {
                                                        validation.setFieldValue("tglcetak", newDate.toISOString());
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Pengambilan Sample</Label>
                                                </div>
                                                <KontainerFlatpickr
                                                    id="tglpengambilansample"
                                                    className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                    options={{
                                                        enableTime: true,
                                                        // mode: "range",
                                                        dateFormat: "Y-m-d H:i",
                                                        defaultDate: "today"
                                                    }}
                                                    value={validation.values.tglpengambilansample}
                                                    onChange={([newDate]) => {
                                                        validation.setFieldValue("tglpengambilansample", newDate.toISOString());
                                                    }}
                                                />
                                            </Col>
                                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                                <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                                    Cetak
                                                </Button>
                                                <button
                                                    type="button"
                                                    className="btn w-sm btn-danger"
                                                    data-bs-dismiss="modal"
                                                    onClick={onCloseClick}
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
            <PrintTemplate
                ContentPrint={<PrintHasilLaboratorium
                    dataCetak={dataCetak || []}
                    dataPasien={dataReg || null}
                    dokterlab={validation.values.dokterlab}
                    unitpengirim={validation.values.unitpengirim}
                    dokterpengirim={validation.values.dokterpengirim}
                    tgllayanan={validation.values.tgllayanan}
                    tglhasil={validation.values.tglhasil}
                    tglcetak={validation.values.tglcetak}
                />

                }
                ref={refPrintHasilLab}
            />
        </Modal>
    )
}

CetakLabModal.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
};

export default CetakLabModal