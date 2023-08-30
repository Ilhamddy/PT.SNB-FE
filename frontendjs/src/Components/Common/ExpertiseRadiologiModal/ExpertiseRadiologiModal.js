import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import CustomSelect from "../../../pages/Select/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useQuill } from "react-quilljs";
import Flatpickr from "react-flatpickr";
import {
    radiologiResetForm, listComboRadiologiGet
} from "../../../store/actions";
import PropTypes from "prop-types";
import PrintTemplate from "../../../pages/Print/PrintTemplate/PrintTemplate";
import PrintExpertiseRadiologi from "../../../pages/Print/PrintExpertiseRadiologi/PrintExpertiseRadiologi";

const dateAwalStart = (new Date(new Date(new Date() - 1000 * 60 * 60 * 24 * 3))).toISOString();
const dateAwalEnd = (new Date()).toISOString()
const date = new Date()

const ExpertiseRadiologiModal = ({ show, onCloseClick, norecPelayanan, dataCombo,tempdokterpengirim,
tempruanganpengirim }) => {
    // const dispatch = useDispatch();
    // const { dataPelayanan, loadingPelayanan, successPelayanan } = useSelector((state) => ({
    //     dataPelayanan: state.Radiologi.listComboRadiologiGet.data,
    //     loadingPelayanan: state.Radiologi.listComboRadiologiGet.loading,
    //     successPelayanan: state.Radiologi.listComboRadiologiGet.success,
    // }));
    // useEffect(() => {
    //     dispatch(listComboRadiologiGet(''));
    // }, [ dispatch]);
    // useEffect(() => {
    //     return () => {
    //         dispatch(radiologiResetForm());
    //     }
    // }, [dispatch])
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecpel: norecPelayanan,
            template: '',
            expertise: '',
            dokterpengirim: '',
            tgllayanan: dateAwalStart,
            foto: '',
            dokterradiologi: '',
            ruanganpengirim: '',
            tglcetak:dateAwalStart
        },
        validationSchema: Yup.object({
            template: Yup.string().required("Template wajib diisi"),
            ruanganpengirim: Yup.string().required("Ruangan Pengirim wajib diisi"),
            dokterpengirim: Yup.string().required("Dokter Pengirim wajib diisi"),
            foto: Yup.string().required("No Foto wajib diisi"),
            dokterradiologi: Yup.string().required("Dokter Radiologi wajib diisi"),
            
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            // dispatch(konsulSave(values, '', () => {
            //     onSimpanClick()
            // }));
            // console.log(validation.values.template)
            // refPrintExpertise.current?.handlePrint();
            // resetForm()
        }
    })
    useEffect(() => {
        const setFF = validation.setFieldValue
        if(tempdokterpengirim){
            setFF('dokterpengirim', tempdokterpengirim || "")
            setFF('ruanganpengirim',tempruanganpengirim || "")
        }
    }, [tempdokterpengirim,tempruanganpengirim, validation.setFieldValue])
    const { quillRef } = useQuill();

    const handleChangeTemplate = (selected) => {
        validation.setFieldValue('template', selected.value)
        validation.setFieldValue('expertise', selected.expertise)

    }
    const refPrintExpertise = useRef(null);
    const handlePrint = ()=>{
        refPrintExpertise.current?.handlePrint();
    }

    

    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true} size="xl">
            <ModalBody className="py-12 px-12">
                <Card>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}>
                        <CardHeader style={{ backgroundColor: "#e67e22", textAlign: 'center' }}>
                            <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Input Expertise Radiologi</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg={3}>
                                    <Card>
                                        <CardBody>
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Template</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <CustomSelect
                                                        id="template"
                                                        name="template"
                                                        options={dataCombo.expertise}
                                                        value={validation.values.template || ""}
                                                        className={`input ${validation.errors.template ? "is-invalid" : ""}`}
                                                        // onChange={value => validation.setFieldValue('template', value.value)}
                                                        onChange={handleChangeTemplate}
                                                        invalid={
                                                            validation.touched.template && validation.errors.template ? true : false
                                                        }
                                                    />
                                                    {validation.touched.template && validation.errors.template ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.template}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">No Foto</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <Input
                                                        id="foto"
                                                        name="foto"
                                                        type="text"
                                                        placeholder="Masukkan nama pasien"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.foto || ""}
                                                        invalid={
                                                            validation.touched.foto
                                                            && !!validation.errors.foto
                                                        }
                                                    />
                                                    {validation.touched.foto && validation.errors.foto ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.foto}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Pelayanan</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <Flatpickr
                                                        id="tgllayanan"
                                                        className="form-control border-0 fs-5 dash-filter-picker shadow"
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
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tgl Cetak Hasil</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <Flatpickr
                                                        id="tglcetak"
                                                        className="form-control border-0 fs-5 dash-filter-picker shadow"
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
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Dokter Radiologi</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <CustomSelect
                                                        id="dokterradiologi"
                                                        name="dokterradiologi"
                                                        options={dataCombo.pegawai}
                                                        value={validation.values.dokterradiologi || ""}
                                                        className={`input ${validation.errors.dokterradiologi ? "is-invalid" : ""}`}
                                                        onChange={value => validation.setFieldValue('dokterradiologi', value.value)}
                                                        invalid={
                                                            validation.touched.dokterradiologi && validation.errors.dokterradiologi ? true : false
                                                        }
                                                    />
                                                    {validation.touched.dokterradiologi && validation.errors.dokterradiologi ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.dokterradiologi}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Dokter Pengirim</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <CustomSelect
                                                        id="dokterpengirim"
                                                        name="dokterpengirim"
                                                        options={dataCombo.pegawai}
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
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Ruangan Pengirim</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div>
                                                    <CustomSelect
                                                        id="ruanganpengirim"
                                                        name="ruanganpengirim"
                                                        options={dataCombo.unit}
                                                        value={validation.values.ruanganpengirim || ""}
                                                        className={`input ${validation.errors.ruanganpengirim ? "is-invalid" : ""}`}
                                                        onChange={value => validation.setFieldValue('ruanganpengirim', value.value)}
                                                        invalid={
                                                            validation.touched.ruanganpengirim && validation.errors.ruanganpengirim ? true : false
                                                        }
                                                    />
                                                    {validation.touched.ruanganpengirim && validation.errors.ruanganpengirim ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.ruanganpengirim}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={9}>
                                    <Card>
                                        <CardBody>
                                            <div className="mt-2">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={validation.values.expertise || ""}
                                                    onReady={(editor) => {
                                                        // You can store the "editor" and use when it is needed.
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        console.log({ data });
                                                        validation.setFieldValue('expertise', data)
                                                    }}
                                                // onBlur={(event, editor) => {
                                                //     console.log('Blur.', editor);
                                                // }}
                                                // onFocus={(event, editor) => {
                                                //     console.log('Focus.', editor);
                                                // }}
                                                />
                                            </div>
                                            <div className="mt-3 d-flex flex-wrap gap-2">
                                                <button type="submit" className="btn btn-success w-sm">
                                                    Simpan
                                                </button>
                                                <button type="button" onClick={handlePrint} className="btn btn-warning w-sm">
                                                    Cetak
                                                </button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>

                    </Form>
                </Card>
            </ModalBody>
            <PrintTemplate
                ContentPrint={<PrintExpertiseRadiologi
                    // dataCetak={dataCetak || []}
                    // dataPasien={dataReg || null}
                    // dokterlab={validation.values.dokterlab}
                    unitpengirim={validation.values.ruanganpengirim}
                    dokterpengirim={validation.values.dokterpengirim}
                    tgllayanan={validation.values.tgllayanan}
                    // tglhasil={validation.values.tglhasil}
                    tglcetak={validation.values.tglcetak}
                    expertise={validation.values.expertise}
                />

                }
                ref={refPrintExpertise}
            />
        </Modal>
    )
}

ExpertiseRadiologiModal.propTypes = {
    onCloseClick: PropTypes.func,
    // onSimpanClick: PropTypes.func,
    show: PropTypes.any,
    tempdokterpengirim:PropTypes.any
};

export default ExpertiseRadiologiModal;