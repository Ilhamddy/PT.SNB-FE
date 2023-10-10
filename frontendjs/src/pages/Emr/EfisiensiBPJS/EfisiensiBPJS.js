import React, { useEffect, useState } from "react"
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import UiContent from "../../../Components/Common/UiContent"
import CountUp from "react-countup";
import { useFormik } from 'formik';
import * as Yup from "yup";
import CustomSelect from "../../Select/Select";
import { onChangeStrNbr } from "../../../utils/format";
import classnames from "classnames";
import {
    emrDiagnosaxSave, emrResetForm, emrComboGet, emrDiagnosaxGet, emrListDiagnosaxGet,
    deleteDiagnosax, comboHistoryUnitGet, emrDiagnosaixGet, emrListDiagnosaixGet
} from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";

const EfisiensiBPJS = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { dataDiagnosa,
        loadingDiagnosa, successDiagnosa, dataCombo, dataRiwayat, loadingRiwayat, successRiwayat,
        dataHistory, dataDiagnosa9, dataRiwayat9, loadingRiwayat9, successRiwayat9,
        newDataDiagnosax,successDiagnosax,loadingDiagnosax } = useSelector((state) => ({
            dataCombo: state.Emr.emrComboGet.data,
            dataDiagnosa: state.Emr.emrDiagnosaxGet.data,
            loadingDiagnosa: state.Emr.emrDiagnosaxGet.loading,
            successDiagnosa: state.Emr.emrDiagnosaxGet.success,
            dataRiwayat: state.Emr.emrListDiagnosaxGet.data,
            loadingRiwayat: state.Emr.emrListDiagnosaxGet.loading,
            successRiwayat: state.Emr.emrListDiagnosaxGet.success,
            dataHistory: state.Emr.comboHistoryUnitGet.data,
            dataDiagnosa9: state.Emr.emrDiagnosaixGet.data,
            dataRiwayat9: state.Emr.emrListDiagnosaixGet.data,
            loadingRiwayat9: state.Emr.emrListDiagnosaixGet.loading,
            successRiwayat9: state.Emr.emrListDiagnosaixGet.success,
            newDataDiagnosax: state.Emr.emrDiagnosaxSave.newData,
            successDiagnosax: state.Emr.emrDiagnosaxSave.success,
            loadingDiagnosax: state.Emr.emrDiagnosaxSave.loading,
        }));
    useEffect(() => {
        if (norecdp) {
            dispatch(emrComboGet(norecdp, 'combo'));
            dispatch(emrDiagnosaxGet('', 'diagnosa10'));
            dispatch(emrListDiagnosaxGet(norecdp));
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(emrDiagnosaixGet('', 'diagnosa9'));
            dispatch(emrListDiagnosaixGet(norecdp))
        }
    }, [norecdp, dispatch])
    const datawidget = [
        {
            id: 1,
            label: 'Biaya Pasien Saat Ini'
        },
        {
            id: 2,
            label: 'Biaya Tambahan'
        },
        {
            id: 3,
            label: 'Total Biaya Keseluruhan'
        },
        {
            id: 4,
            label: 'Estimasi Klaim BPJS'
        },
    ]
    const vSetValidationDiagnosa = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: '',
            tipediagnosa: '',
            kodediagnosa:'',
            kasuspenyakit:'',
            keteranganicd10:'',
            idlabel:3,
            label:'DIAGNOSA'
        },
        validationSchema: Yup.object({
            norecap: Yup.string().required("Unit wajib diisi"),
            tipediagnosa: Yup.string().required("Tipe Diagnosa wajib diisi"),
            kodediagnosa: Yup.string().required("Kode Diagnosa wajib diisi"),
            kasuspenyakit: Yup.string().required("Kasus Penyakit wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(emrDiagnosaxSave(values, () => {
                dispatch(emrListDiagnosaxGet(norecdp));
            }));
        }
    })
    const vSetValidationDiagnosa9 = useFormik({
        enableReinitialize: true,
        initialValues: {
            search: '',
            statuspasien: ''
        },
        validationSchema: Yup.object({
        }),
        onSubmit: (values) => {

        }
    })
    const [stateDeleteDiagnosa, setstateDeleteDiagnosa] = useState(10)
    //delete order
    const [deleteModal, setDeleteModal] = useState(false);
    const [product, setProduct] = useState(null);
    const onClickDelete = (product, id) => {
        setstateDeleteDiagnosa(id)
        setProduct(product);
        setDeleteModal(true);
    };
    const columnsDiagnosa10 = [
        {
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button" onClick={() => onClickDelete(data, 10)}>
                                <i className="ri-delete-bin-2-line"></i>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip>
                    </div>
                );
            },
            width: "50px"
        },
        {
            selector: row => row.label,
            sortable: true,
            width: "450px"
        },
        {
            selector: row => row.tipediagnosa,
            sortable: true
        },
        {
            selector: row => row.jeniskasus,
            sortable: true
        },
        {
            selector: row => row.namaunit,
            sortable: true
        },
    ];
    const columnsDiagnosa9 = [
        {
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button" onClick={() => onClickDelete(data, 9)}>
                                <i className="ri-delete-bin-2-line"></i>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip>
                    </div>
                );
            },
            width: "50px"
        },
        {
            selector: row => row.label,
            sortable: true,
            width: "450px"
        },
        {
            selector: row => row.tipediagnosa,
            sortable: true
        },
        {
            selector: row => row.qty,
            sortable: true
        },
        {
            selector: row => row.namaunit,
            sortable: true
        },
        {
            selector: row => row.keterangan,
            sortable: true
        },
    ];
    return (
        <React.Fragment>
            <Row className="gy-4">
                <UiContent />
                <Row className="row-cols-xxl-4 row-cols-lg-3 row-cols-1">
                    {datawidget.map((item, key) => (
                        <Col key={key}>
                            <Card className="card-animate" style={{ backgroundColor: '#ffeaa7' }}>
                                <CardBody>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="fw-medium mb-0">{item.label}</p>

                                        </div>
                                        <div>
                                            <div className="avatar-md flex-shrink-0">

                                                <CountUp
                                                    start={0}
                                                    end={item.counter}
                                                    decimal={item.decimals}
                                                    duration={3}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                    ))}
                </Row>
                <Card>
                    <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
                        <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Penginputan Diagnosa</h4>
                    </CardHeader>
                    <CardBody>
                        <Row className="gy-4">
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    vSetValidationDiagnosa.handleSubmit();
                                    return false;
                                }}
                                className="gy-4"
                                action="#">
                                <Row className="gy-4">
                                    <Col lg={12}>
                                        <Label className="form-label">Diagnosa (ICD-10)</Label>
                                    </Col>
                                    <Col lg={4}>
                                        <CustomSelect
                                            id="kodediagnosa"
                                            name="kodediagnosa"
                                            options={dataDiagnosa}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa.setFieldValue('kodediagnosa', e?.value || '')
                                            }}
                                            value={vSetValidationDiagnosa.values.kodediagnosa}
                                            className={`input row-header ${!!vSetValidationDiagnosa?.errors.kodediagnosa ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidationDiagnosa.touched.kodediagnosa &&
                                            !!vSetValidationDiagnosa.errors.kodediagnosa && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa.errors.kodediagnosa}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <CustomSelect
                                            id="tipediagnosa"
                                            name="tipediagnosa"
                                            options={dataCombo.tipediagnosa}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa.setFieldValue('tipediagnosa', e?.value || '')
                                            }}
                                            value={vSetValidationDiagnosa.values.tipediagnosa}
                                            className={`input row-header ${!!vSetValidationDiagnosa?.errors.tipediagnosa ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidationDiagnosa.touched.tipediagnosa &&
                                            !!vSetValidationDiagnosa.errors.tipediagnosa && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa.errors.tipediagnosa}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <CustomSelect
                                            id="kasuspenyakit"
                                            name="kasuspenyakit"
                                            options={dataCombo.jeniskasus}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa.setFieldValue('kasuspenyakit', e?.value || '')
                                            }}
                                            value={vSetValidationDiagnosa.values.kasuspenyakit}
                                            className={`input row-header ${!!vSetValidationDiagnosa?.errors.kasuspenyakit ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidationDiagnosa.touched.kasuspenyakit &&
                                            !!vSetValidationDiagnosa.errors.kasuspenyakit && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa.errors.kasuspenyakit}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <CustomSelect
                                            id="norecap"
                                            name="norecap"
                                            options={dataHistory}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa.setFieldValue('norecap', e?.norec || '')
                                            }}
                                            value={vSetValidationDiagnosa.values.norecap}
                                            className={`input row-header ${!!vSetValidationDiagnosa?.errors.norecap ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidationDiagnosa.touched.norecap &&
                                            !!vSetValidationDiagnosa.errors.norecap && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa.errors.norecap}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <Button type="submit" color="success" style={{ width: '100%' }}>Tambah</Button>
                                    </Col>
                                    <DataTable
                                        columns={columnsDiagnosa10}
                                        data={dataRiwayat}
                                        pagination
                                        progressPending={loadingRiwayat}
                                    />
                                </Row>
                            </Form>

                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    vSetValidationDiagnosa9.handleSubmit();
                                    return false;
                                }}
                                className="gy-4"
                                action="#">
                                <Row className="gy-4">
                                    <Col lg={12}>
                                        <Label className="form-label">Diagnosa (ICD-9)</Label>
                                    </Col>
                                    <Col lg={4}>
                                        <CustomSelect
                                            id="diagnosa"
                                            name="diagnosa"
                                            options={dataDiagnosa9}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa9.setFieldValue('diagnosa', e?.value || '')
                                            }}
                                            value={vSetValidationDiagnosa9.values.diagnosa}
                                            className={`input row-header ${!!vSetValidationDiagnosa9?.errors.diagnosa ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidationDiagnosa9.touched.diagnosa &&
                                            !!vSetValidationDiagnosa9.errors.diagnosa && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa9.errors.diagnosa}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <Input
                                            id="jumlah"
                                            name="jumlah"
                                            type="number"
                                            value={vSetValidationDiagnosa9.values.jumlah}
                                            onChange={(e) => {
                                                const newVal = onChangeStrNbr(
                                                    e.target.value,
                                                    vSetValidationDiagnosa9.values.jumlah
                                                )
                                                vSetValidationDiagnosa9.setFieldValue('jumlah', newVal)
                                            }}
                                            invalid={vSetValidationDiagnosa9.touched?.jumlah &&
                                                !!vSetValidationDiagnosa9.errors?.jumlah}
                                        />
                                        {vSetValidationDiagnosa9.touched?.jumlah
                                            && !!vSetValidationDiagnosa9.errors.jumlah && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa9.errors.jumlah}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}>
                                        <CustomSelect
                                            id="unit"
                                            name="unit"
                                            options={dataHistory}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa9.setFieldValue('unit', e?.value || '')
                                            }}
                                            value={vSetValidationDiagnosa9.values.unit}
                                            className={`input row-header ${!!vSetValidationDiagnosa9?.errors.unit ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidationDiagnosa9.touched.unit &&
                                            !!vSetValidationDiagnosa9.errors.unit && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa9.errors.unit}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <Button type="submit" color="success" style={{ width: '100%' }}>Tambah</Button>
                                    </Col>
                                    <Col lg={12}>
                                        <DataTable
                                            columns={columnsDiagnosa9}
                                            data={dataRiwayat9}
                                            pagination
                                            progressPending={successRiwayat9}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Row>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Row className="gy-4">
                            <Col lg={12} className="mr-3 me-3 mt-2">
                                <div className="d-flex flex-wrap justify-content-end gap-2">
                                    <Button type="submit" color="success" style={{ width: '20%' }}>Grouping</Button>
                                </div>
                            </Col>
                            <Col lg={12}>

                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Row>
        </React.Fragment>
    )
}
export default (EfisiensiBPJS)