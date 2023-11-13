import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../../Select/Select';
import {
    comboHistoryUnitGet, comboNamaPelaksanaGet,
    emrDiagnosaxGet, emrComboGet, saveOrderOperasi, getHistoriOrderOperasi
} from "../../../../store/actions";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../../Components/Table/LoadingTable';
import { dateTimeLocal } from '../../../../utils/format';

const OrderOperasi = () => {
    const dispatch = useDispatch();
    const { norecdp, norecap } = useParams();
    const [dateNow] = useState(() => new Date().toISOString())
    const refunitlast = useRef(null);
    const refdokterOperator = useRef(null);
    const refjenisOperasi = useRef(null);
    const refkodediagnosa = useRef(null);
    const { dataCombo, dataNamaPelaksana, dataDiagnosa,
        dataComboEmr, newData, dataOrder, loadingOrder
    } = useSelector((state) => ({
        dataCombo: state.Emr.comboHistoryUnitGet.data,
        // dataPasienReg: state.Registrasi.registrasiRuangNorecGet.data || null,
        dataNamaPelaksana: state.Emr.comboNamaPelaksanaGet.data,
        dataDiagnosa: state.Emr.emrDiagnosaxGet.data,
        dataComboEmr: state.Emr.emrComboGet.data,
        newData: state.Emr.saveOrderOperasi.newData,
        success: state.Emr.saveOrderOperasi.success,
        loading: state.Emr.saveOrderOperasi.loading,
        dataOrder: state.Emr.getHistoriOrderOperasi.data,
        loadingOrder: state.Emr.getHistoriOrderOperasi.loading,
        successOrder: state.Emr.getHistoriOrderOperasi.success,
    }));
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            unitlast: '',
            namaoperasi: '',
            dokterOperator: '',
            jenisOperasi: '',
            rencanaOperasi: dateNow,
            formCheckCito: '',
            kodediagnosa: '',
            catatan: '',
            objectantreanpemeriksaanfk: '',
        },
        validationSchema: Yup.object({
            unitlast: Yup.string().required("Unit Harus Diisi jawab wajib diisi"),
            // namaoperasi: Yup.string().required("Nama Operasi Harus Diisi jawab wajib diisi"),
            // dokterOperator: Yup.string().required("Dokter Operator Diisi jawab wajib diisi"),
            // jenisOperasi: Yup.string().required("Jenis Operasi Harus Diisi jawab wajib diisi"),
            // kodediagnosa: Yup.string().required("Diagnosa Harus Diisi jawab wajib diisi"),
            // catatan: Yup.string().required("Catatan Harus Diisi jawab wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            dispatch(saveOrderOperasi(values, () => {
                resetForm({ values: '' })
                dispatch(getHistoriOrderOperasi({
                    norecdp: norecdp
                }));
            }));
            handleClickReset()
        }
    })
    const handleClickReset = (e) => {
        // vSetValidation.setFieldValue('unitlast', '')
        // vSetValidation.setFieldValue('namaoperasi', '')
        // vSetValidation.setFieldValue('dokterOperator', '')
        // vSetValidation.setFieldValue('keteranganicd10', '')
        refunitlast.current?.clearValue()
        refdokterOperator.current?.clearValue()
        refjenisOperasi.current?.clearValue()
        refkodediagnosa.current?.clearValue()
    };
    useEffect(() => {
        if (norecdp) {
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(comboNamaPelaksanaGet(''));
            dispatch(emrComboGet(norecdp, 'combo'));
            dispatch(getHistoriOrderOperasi({
                norecdp: norecdp
            }));
        }
    }, [norecdp, dispatch])
    const handleDiagnosa = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(emrDiagnosaxGet(characterEntered, 'diagnosa10'));
        }
    }
    const handleUnitLast = (e) => {
        vSetValidation.setFieldValue('unitlast', e?.value || "")
        vSetValidation.setFieldValue('objectantreanpemeriksaanfk', e?.norec || "")
    }
    const columnsRiwayat = [

        {
            name: <span className='font-weight-bold fs-13'>Tgl. Order</span>,
            selector: row => dateTimeLocal(row.tglinput),
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Rencana Operasi</span>,
            selector: row => row.tglinput,
            sortable: true,
            width: "200px"
        },
        {

            name: <span className='font-weight-bold fs-13'>No RM</span>,
            selector: row => row.nocm,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Order</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "150px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Operasi</span>,
            selector: row => row.namaoperasi,
            sortable: true,
            width: "150px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Diagnosa</span>,
            selector: row => row.kodeexternal,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Dokter Operator</span>,
            selector: row => row.namalengkap,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Cito</span>,
            selector: row => row.statuscito,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.statusoperasi,
            sortable: true,
            // width: "250px",
        },
    ];
    const tableCustomStyles = {
        headRow: {
            style: {
                color: '#ffffff',
                backgroundColor: '#FFCB46',
            },
        },
        rows: {
            style: {
                color: "black",
                backgroundColor: "#f1f2f6"
            },

        }
    }

    return (
        <React.Fragment>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    vSetValidation.handleSubmit();
                    return false;
                }}
                className="gy-4"
                action="#">
                <Row className="gy-4">
                    <Col lg={6}>
                        <Row className="gy-2">
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Unit</Label>
                                </div>
                            </Col>
                            <Col lg={8} md={8}>
                                <div>
                                    <CustomSelect
                                        id="unitlast"
                                        name="unitlast"
                                        options={dataCombo}
                                        value={vSetValidation.values.unitlast || ""}
                                        className={`input ${vSetValidation.errors.unitlast ? "is-invalid" : ""}`}
                                        onChange={value => (handleUnitLast(value ))}
                                        ref={refunitlast}
                                    />
                                    {vSetValidation.touched.unitlast && vSetValidation.errors.unitlast ? (
                                        <FormFeedback type="invalid"><div>{vSetValidation.errors.unitlast}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="namaoperasi" className="form-label">Nama Operasi</Label>
                                </div>
                            </Col>
                            <Col lg={8} md={8}>
                                <div>
                                    <Input
                                        id="namaoperasi"
                                        name="namaoperasi"
                                        type="textarea"
                                        value={vSetValidation.values.namaoperasi}
                                        onChange={(e) => {
                                            vSetValidation.setFieldValue('namaoperasi', e.target.value)
                                        }}
                                        invalid={vSetValidation.touched?.namaoperasi &&
                                            !!vSetValidation.errors?.namaoperasi}
                                    />
                                    {vSetValidation.touched?.namaoperasi
                                        && !!vSetValidation.errors.namaoperasi && (
                                            <FormFeedback type="invalid">
                                                <div>{vSetValidation.errors.namaoperasi}</div>
                                            </FormFeedback>
                                        )}
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="dokterOperator" className="form-label">Dokter Operator</Label>
                                </div>
                            </Col>
                            <Col lg={8} md={8}>
                                <div>
                                    <CustomSelect
                                        id="dokterOperator"
                                        name="dokterOperator"
                                        options={dataNamaPelaksana}
                                        value={vSetValidation.values.dokterOperator || ""}
                                        className={`input ${vSetValidation.errors.dokterOperator ? "is-invalid" : ""}`}
                                        onChange={value => vSetValidation.setFieldValue('dokterOperator', value?.value || "")}
                                        ref={refdokterOperator}
                                    />
                                    {vSetValidation.touched.dokterOperator && vSetValidation.errors.dokterOperator ? (
                                        <FormFeedback type="invalid"><div>{vSetValidation.errors.dokterOperator}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="jenisOperasi" className="form-label">Jenis Operasi</Label>
                                </div>
                            </Col>
                            <Col lg={8} md={8}>
                                <div>
                                    <CustomSelect
                                        id="jenisOperasi"
                                        name="jenisOperasi"
                                        options={dataComboEmr.jenisoperasi}
                                        value={vSetValidation.values.jenisOperasi || ""}
                                        className={`input ${vSetValidation.errors.jenisOperasi ? "is-invalid" : ""}`}
                                        onChange={value => vSetValidation.setFieldValue('jenisOperasi', value?.value || "")}
                                        ref={refjenisOperasi}
                                    />
                                    {vSetValidation.touched.jenisOperasi && vSetValidation.errors.jenisOperasi ? (
                                        <FormFeedback type="invalid"><div>{vSetValidation.errors.jenisOperasi}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row className="gy-2">
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Rencana Operasi</Label>
                                </div>
                            </Col>
                            <Col lg={6} md={6}>
                                <div>
                                    <KontainerFlatpickr
                                        isError={vSetValidation.touched?.rencanaOperasi &&
                                            !!vSetValidation.errors?.rencanaOperasi}
                                        id="rencanaOperasi"
                                        options={{
                                            dateFormat: 'Y-m-d H:i',
                                            defaultDate: 'today',
                                            enableTime: true,
                                            time_24hr: true
                                        }}
                                        value={vSetValidation.values.rencanaOperasi}
                                        onChange={([newDate]) => {
                                            vSetValidation.setFieldValue('rencanaOperasi', newDate.toISOString())
                                        }}
                                    />
                                    {vSetValidation.touched?.rencanaOperasi
                                        && !!vSetValidation.errors.rencanaOperasi && (
                                            <FormFeedback type="invalid">
                                                <div>{vSetValidation.errors.rencanaOperasi}</div>
                                            </FormFeedback>
                                        )}
                                </div>
                            </Col>
                            <Col lg={2} md={2}>
                                <div className="form-check ms-2">
                                    <Input className="form-check-input" type="checkbox" id="formCheckCito"
                                        onChange={value => vSetValidation.setFieldValue('formCheckCito', value.target.checked)} />
                                    <Label className="form-check-label" htmlFor="formCheckCito" style={{ color: "black" }} >
                                        Cito
                                    </Label>
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="kodediagnosa" className="form-label">Diagnosa Pasien</Label>
                                </div>
                            </Col>
                            <Col lg={8} md={8}>
                                <div>
                                    <CustomSelect
                                        id="kodediagnosa"
                                        name="kodediagnosa"
                                        options={dataDiagnosa}
                                        value={vSetValidation.values.kodediagnosa || ""}
                                        className={`input ${vSetValidation.errors.kodediagnosa ? "is-invalid" : ""}`}
                                        onChange={value => vSetValidation.setFieldValue('kodediagnosa', value?.value || "")}
                                        onInputChange={handleDiagnosa}
                                        ref={refkodediagnosa}
                                    />
                                    {vSetValidation.touched.kodediagnosa && vSetValidation.errors.kodediagnosa ? (
                                        <FormFeedback type="invalid"><div>{vSetValidation.errors.kodediagnosa}</div></FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="mt-2">
                                    <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Catatan</Label>
                                </div>
                            </Col>
                            <Col lg={8} md={8}>
                                <div>
                                    <Input
                                        id="catatan"
                                        name="catatan"
                                        type="textarea"
                                        value={vSetValidation.values.catatan}
                                        onChange={(e) => {
                                            vSetValidation.setFieldValue('catatan', e.target.value)
                                        }}
                                        invalid={vSetValidation.touched?.catatan &&
                                            !!vSetValidation.errors?.catatan}
                                    />
                                    {vSetValidation.touched?.catatan
                                        && !!vSetValidation.errors.catatan && (
                                            <FormFeedback type="invalid">
                                                <div>{vSetValidation.errors.catatan}</div>
                                            </FormFeedback>
                                        )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} className="mr-3 me-3 mt-2">
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                            <Button type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                            <Button type="button" color="danger" style={{ width: '20%' }}
                            // onClick={() => { handleBack() }}
                            >Batal</Button>
                        </div>
                    </Col>
                    <Col lg={12} className="gy-2">
                        <Card>
                            <CardHeader style={{ backgroundColor: "#FFCB46" }}>
                                <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Riwayat Order Operasi</h4>
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
        </React.Fragment>
    )
}
export default (OrderOperasi)