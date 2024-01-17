import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import CustomSelect from "../../../pages/Select/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Flatpickr from "react-flatpickr";
import {
    saveExpertiseRadiologi,daftarPasienNoRecGet,listCetakHasiilLabGet
} from "../../../store/actions";
import PropTypes from "prop-types";
import PrintTemplate from "../../../pages/Print/PrintTemplate/PrintTemplate";
import PrintExpertiseRadiologi from "../../../pages/Print/PrintExpertiseRadiologi/PrintExpertiseRadiologi";
import KontainerFlatpickr from "../../KontainerFlatpickr/KontainerFlatpickr";

const ExpertiseRadiologiModal = ({ show,dataReg, onCloseClick, norecPelayanan, dataCombo,tempdokterpengirim,
tempruanganpengirim,tempSelected }) => {
    const dispatch = useDispatch();
    const [dateStart] = useState(() => (new Date()).toISOString())
    const { newData, loading, success } = useSelector(state => ({
        newData: state.Radiologi.saveExpertiseRadiologi.newData,
        success: state.Radiologi.saveExpertiseRadiologi.success,
        loading: state.Radiologi.saveExpertiseRadiologi.loading,
    }));

    const [dateAwalStart] = useState(() => (new Date()).toISOString())
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecpel: norecPelayanan,
            norecexpertise:tempSelected.norecexpertise,
            template: '',
            expertise: '',
            dokterpengirim: '',
            labeldokterpengirim: '',
            tgllayanan: dateStart,
            foto: '',
            dokterradiologi: '',
            labeldokterradiologi:'',
            ruanganpengirim: '',
            labelruanganpengirim: '',
            tglcetak:dateStart
        },
        validationSchema: Yup.object({
            template: Yup.string().required("Template wajib diisi"),
            ruanganpengirim: Yup.string().required("Ruangan Pengirim wajib diisi"),
            dokterpengirim: Yup.string().required("Dokter Pengirim wajib diisi"),
            foto: Yup.string().required("No Foto wajib diisi"),
            dokterradiologi: Yup.string().required("Dokter Radiologi wajib diisi"),
            
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(saveExpertiseRadiologi(values))
        }
    })
    const [showCetak, setshowCetak] = useState(false);
    useEffect(() => {
        const setFF = validation.setFieldValue
        if(tempdokterpengirim){
            setFF('dokterpengirim', tempdokterpengirim || "")
            setFF('ruanganpengirim',tempruanganpengirim || "")
            setFF('template',tempSelected.objecttemplateradiologifk || "")
            setFF('expertise',tempSelected.expertise || "")
            if(tempSelected.norecexpertise!==null){
                setshowCetak(true)
            }
        }
    }, [setshowCetak,tempSelected,tempdokterpengirim,tempruanganpengirim, validation.setFieldValue])
    useEffect(()=>{
        if(newData && success){
            setshowCetak(true)
        }
    },[newData,success,setshowCetak])
    const handleChangeTemplate = (selected) => {
        validation.setFieldValue('template', selected.value)
        validation.setFieldValue('expertise', selected.expertise)
    }
    const handleChangeDokterRadiologi = (selected)=>{
        validation.setFieldValue('dokterradiologi', selected.value)
        validation.setFieldValue('labeldokterradiologi', selected.label)
       
    }
    const handleChangeDokterPengirim = (selected)=>{
        validation.setFieldValue('dokterpengirim', selected.value)
        validation.setFieldValue('labeldokterpengirim', selected.label)
    }
    const handleChangeRuanganPengirim = (selected)=>{
        validation.setFieldValue('ruanganpengirim', selected.value)
        validation.setFieldValue('labelruanganpengirim', selected.label)
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
                        <CardHeader className="card-header-snb ">
                            <h4 className="card-title mb-0" style={{ color: 'black' }}>Input Expertise Radiologi</h4>
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
                                                        // onChange={value => validation.setFieldValue('template', value?.value)}
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
                                                        placeholder="Masukkan Nomor Foto"
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
                                            <Col lg={12}>
                                                <div className="mt-2">
                                                    <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tgl Cetak Hasil</Label>
                                                </div>
                                            </Col>
                                            <Col lg={12}>
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
                                                        // onChange={value => validation.setFieldValue('dokterradiologi', value?.value)}
                                                        onChange={handleChangeDokterRadiologi}
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
                                                        // onChange={value => validation.setFieldValue('dokterpengirim', value?.value)}
                                                        onChange={handleChangeDokterPengirim}
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
                                                        // onChange={value => validation.setFieldValue('ruanganpengirim', value?.value)}
                                                        onChange={handleChangeRuanganPengirim}
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
                                                    config={{
                                                        toolbar: {
                                                            items: ['undo', "redo", "bold", "italic", 'link', 'bulletedList', 'numberedList',
                                                            // 'blockQuote'
                                                            // 'insertTable'
                                                            'heading'
                                                        ]
                                                        }
                                                    }}
                                                    data={validation.values.expertise || ""}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        console.log({ data });
                                                        validation.setFieldValue('expertise', data)
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-3 d-flex flex-wrap gap-2">
                                                <button type="submit" className="btn btn-success w-sm">
                                                    Simpan
                                                </button>
                                                {showCetak?(
                                                    <button type="button" onClick={handlePrint} className="btn btn-warning w-sm">
                                                    Cetak
                                                </button>
                                                ):null}
                                                <button
                                                    type="button"
                                                    className="btn w-sm btn-danger"
                                                    data-bs-dismiss="modal"
                                                    onClick={onCloseClick}
                                                >
                                                    Batal
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
                    dataSelected={tempSelected}
                    dataPasien={dataReg || null}
                    dokterradiologi={validation.values.labeldokterradiologi}
                    unitpengirim={validation.values.labelruanganpengirim}
                    dokterpengirim={validation.values.labeldokterpengirim}
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