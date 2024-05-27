import React, { useEffect, useRef, useState } from "react"
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, DropdownToggle, Form, FormFeedback, Input, Label, Row, Spinner, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import UiContent from "../../../Components/Common/UiContent"
import CountUp from "react-countup";
import { useFormik } from 'formik';
import * as Yup from "yup";
import CustomSelect from "../../../Components/Common/CustomSelect/CustomSelect";
import { onChangeStrNbr } from "../../../utils/format";
import classnames from "classnames";
import {
    emrDiagnosaxSave, emrResetForm, emrComboGet, emrDiagnosaxGet, emrListDiagnosaxGet,
    deleteDiagnosax, comboHistoryUnitGet, emrDiagnosaixGet, emrListDiagnosaixGet,
    deleteDiagnosaix, emrDiagnosaixSave, comboAllTindakan, savePelayananPasienTemp,
    getListPelayananPasienTemp, deletePelayananPasienTemp, getWidgetEfisiensiKlaim,
    bridgingInacbgSave, updateEstimasiKlaim
} from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import DeleteModalCustom from "../../../Components/Common/DeleteModalCustom";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";
import { dateTimeLocal } from '../../../utils/format';
import LoadingTable from "../../../Components/Table/LoadingTable";
import { toast } from "react-toastify";
import { tableCustomStyles } from "../../../Components/Table/tableCustomStyles";

const EfisiensiBPJS = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { dataDiagnosa,
        loadingDiagnosa, successDiagnosa, dataCombo, dataRiwayat, loadingRiwayat, successRiwayat,
        dataHistory, dataDiagnosa9, dataRiwayat9, loadingRiwayat9, successRiwayat9,
        newDataDiagnosax, successDiagnosax, loadingDiagnosax,
        newDataDelete, newDataDeleteix, dataTindakan,
        newDataPelayanan, dataListTindakan, loadingListTindakan,
        newDataDeletePelayanan, dataWidget,
        newData, success, loading, error, newDataUpdateEstimasiKlaim, successUpdateEstimasiKlaim } = useSelector((state) => ({
            newData: state.Casemix.bridgingInacbgSave.newData,
            success: state.Casemix.bridgingInacbgSave.success,
            loading: state.Casemix.bridgingInacbgSave.loading,
            error: state.Casemix.bridgingInacbgSave.error,
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
            newDataDelete: state.Emr.deleteDiagnosax.newData,
            newDataDeleteix: state.Emr.deleteDiagnosaix.newData,
            dataTindakan: state.Emr.comboAllTindakan.data,
            newDataPelayanan: state.Emr.savePelayananPasienTemp.newData,
            dataListTindakan: state.Emr.getListPelayananPasienTemp.data,
            loadingListTindakan: state.Emr.getListPelayananPasienTemp.loading,
            newDataDeletePelayanan: state.Emr.deletePelayananPasienTemp.newData,
            dataWidget: state.Emr.getWidgetEfisiensiKlaim.data,
            newDataUpdateEstimasiKlaim: state.Emr.updateEstimasiKlaim.newData,
            successUpdateEstimasiKlaim: state.Emr.updateEstimasiKlaim.success,
        }));
    useEffect(() => {
        if (norecdp) {
            dispatch(emrComboGet(norecdp, 'combo'));
            dispatch(emrDiagnosaxGet('', 'diagnosa10'));
            dispatch(emrListDiagnosaxGet(norecdp));
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(emrDiagnosaixGet('', 'diagnosa9'));
            dispatch(emrListDiagnosaixGet(norecdp))
            dispatch(getListPelayananPasienTemp({ norecdp: norecdp }));
            dispatch(getWidgetEfisiensiKlaim({ norecdp: norecdp }))
        }
    }, [norecdp, dispatch])

    const vSetValidationDiagnosa = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: '',
            tipediagnosa: '',
            kodediagnosa: '',
            kasuspenyakit: '',
            keteranganicd10: '',
            idlabel: 3,
            label: 'DIAGNOSA'
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
            norecap: '',
            kodediagnosa9: '',
            jumlahtindakan: '',
            keteranganicd9: '',
            idlabel: 3,
            label: 'DIAGNOSA'
        },
        validationSchema: Yup.object({
        }),
        onSubmit: (values) => {
            dispatch(emrDiagnosaixSave(values, () => {
                dispatch(emrListDiagnosaixGet(norecdp));
            }));
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
    const handleDeleteOrder = () => {
        if (product) {
            if (stateDeleteDiagnosa === 10) {
                dispatch(deleteDiagnosax(product.norec));
            } else if (stateDeleteDiagnosa === 9) {
                dispatch(deleteDiagnosaix(product.norec));
            } else if (stateDeleteDiagnosa === 1) {
                let tempValue = {
                    "norec": product.norec
                }
                dispatch(deletePelayananPasienTemp(tempValue, () => {
                    dispatch(getListPelayananPasienTemp({ norecdp: norecdp }));
                }));
            }

            setDeleteModal(false);
        }
    };
    useEffect(() => {
        dispatch(emrListDiagnosaxGet(norecdp));
    }, [newDataDelete, norecdp, dispatch])
    useEffect(() => {
        dispatch(emrListDiagnosaixGet(norecdp));
    }, [newDataDeleteix, norecdp, dispatch])
    const [dateNow] = useState(() => new Date().toISOString())
    const [count, setCount] = useState(1);
    const [harga, setHarga] = useState(0);
    const vSetValidationTindakan = useFormik({
        enableReinitialize: true,
        initialValues: {
            objectkelasfk: '',
            unitlast: '',
            quantity: 0,
            tindakan: '',
            tgltindakan: dateNow,
            norecdp: norecdp,
            harga: 0
        },
        validationSchema: Yup.object({
            // unitlast: Yup.string().required("Unit wajib diisi"),
            tindakan: Yup.string().required("Tindakan wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(savePelayananPasienTemp(values, () => {
                dispatch(getListPelayananPasienTemp({ norecdp: norecdp }));
                resetForm({ values: '' })
            }));
        }
    })


    const onClickCount = (temp) => {
        if (temp === 'min') {
            if (count > 0) {
                setCount(count - 1)
                vSetValidationTindakan.setFieldValue('quantity', count - 1)
            }
        } else {
            setCount(count + 1)
            vSetValidationTindakan.setFieldValue('quantity', count + 1)
        }

    }
    const hargaRef = useRef(0);
    const handleTindakanSelcted = (selected) => {
        vSetValidationTindakan.setFieldValue('tindakan', selected.value)
        vSetValidationTindakan.setFieldValue('harga', selected.totalharga)
        setHarga(selected.totalharga)
        hargaRef.current = selected.totalharga
        vSetValidationTindakan.setFieldValue('quantity', count)
        vSetValidationTindakan.setFieldValue('objectkelasfk', selected.objectkelasfk)
    }
    const handleUnitLast = (selected) => {
        vSetValidationTindakan.setFieldValue('unitlast', selected.value)
        vSetValidationTindakan.setFieldValue('objectkelasfk', selected.objectkelasfk)
    };
    const handleTindakan = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(comboAllTindakan({ namaproduk: characterEntered }));
            // }, [dispatch]);
        }
    };

    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button" onClick={() => onClickDelete(data, 1)}>
                                <i className="ri-delete-bin-2-line"></i>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        {/* <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip> */}
                    </div>
                );
            },
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tindakan</span>,
            selector: row => row.namaproduk,
            sortable: true,
            width: "250px"
        },
        // {
        //     name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
        //     selector: row => row.namaunit,
        //     sortable: true,
        //     width: "250px"
        // },
        {
            name: <span className='font-weight-bold fs-13'>Kelas</span>,
            selector: row => row.namakelas,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            width: "160px",
            wrap: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Harga</span>,
            selector: row => row.harga,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>QTY</span>,
            selector: row => row.qty,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.total,
            sortable: true,
            width: "100",
        },
    ];
    const handleDiagnosa = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(emrDiagnosaxGet(characterEntered, 'diagnosa10'));
        }
    };
    const handleClickGrouping = (e) => {
        let tempData = []

        if (dataRiwayat.length === 0) {
            toast.error('Diagnosa 10 Belum Diisi', { autoClose: 3000 });
        }
        // UNU Grouper
        let paramDiagnosa = ''
        for (let x = 0; x < dataRiwayat.length; x++) {
            if (paramDiagnosa === '') {
                paramDiagnosa = dataRiwayat[x].kodediagnosa
            } else {
                paramDiagnosa = paramDiagnosa + '#' + dataRiwayat[x].kodediagnosa
            }
        }
        let paramDiagnosa9 = ''
        for (let x = 0; x < dataRiwayat9.length; x++) {
            if (paramDiagnosa9 === '') {
                paramDiagnosa9 = dataRiwayat9[x].kodediagnosa
            } else {
                paramDiagnosa9 = paramDiagnosa9 + '#' + dataRiwayat9[x].kodediagnosa
            }
        }
        const jsonNew_Claim = {
            "metadata": {
                "method": "new_claim"
            },
            "data": {
                "nomor_kartu": '000000000001COBA',
                "nomor_sep": '0123456789COBA',
                "nomor_rm": '000COBA',
                "nama_pasien": 'COBA',
                "tgl_lahir": '1940-01-01 02:00:00',
                "gender": '2'
            }
        };
        tempData.push(jsonNew_Claim)
        const jsonSet_Claim = {
            "metadata": {
                "method": "set_claim_data",
                "nomor_sep": '0123456789COBA'
            },
            "data": {
                "nomor_sep": '0123456789COBA',
                "nomor_kartu": '000000000001COBA',
                "tgl_masuk": "2023-01-25 12:55:00",
                "tgl_pulang": "2023-01-25 12:55:00",
                "cara_masuk": 'gp',
                "jenis_rawat": '1',
                "kelas_rawat": "3",
                "adl_sub_acute": "",
                "adl_chronic": "",
                "icu_indikator": "",
                "icu_los": "",
                "ventilator_hour": "",
                "ventilator": {
                    "use_ind": "",
                    "start_dttm": "",
                    "stop_dttm": ""
                },
                "upgrade_class_ind": "0",
                "upgrade_class_class": "",
                "upgrade_class_los": "",
                "upgrade_class_payor": "",
                "add_payment_pct": "",
                "birth_weight": 0,
                "sistole": "",
                "diastole": '',
                "discharge_status": 1,
                "diagnosa": paramDiagnosa,//unu Grouper
                "procedure": paramDiagnosa9,
                "diagnosa_inagrouper": "#",
                "procedure_inagrouper": "#",
                "tarif_rs": {
                    "prosedur_non_bedah": 0,
                    "prosedur_bedah": 0,
                    "konsultasi": 0,
                    "tenaga_ahli": 0,
                    "keperawatan": 0,
                    "penunjang": 0,
                    "radiologi": 0,
                    "laboratorium": 0,
                    "pelayanan_darah": 0,
                    "rehabilitasi": 0,
                    "kamar": 0,
                    "rawat_intensif": 0,
                    "obat": 0,
                    "obat_kronis": 0,
                    "obat_kemoterapi": 0,
                    "alkes": 0,
                    "bmhp": 0,
                    "sewa_alat": 0
                },
                "tarif_poli_eks": "0",
                "nama_dokter": 'COBA',
                "kode_tarif": "AP",
                "payor_id": "3",
                "payor_cd": "JKN",
                "cob_cd": "",
                "coder_nik": "123123123123"
            }
        };
        tempData.push(jsonSet_Claim)
        const jsonGrouper = {
            "metadata": {
                "method": "grouper",
                "stage": "1"
            },
            "data": {
                "nomor_sep": '0123456789COBA'
            }
        };
        tempData.push(jsonGrouper)
        dispatch(bridgingInacbgSave(tempData))
    }
    useEffect(() => {
        if (newData !== null) {
            let tempData = []
            if (newData?.data[2]?.dataResponse !== undefined) {
                const jsonGrouper = {
                    "metadata": {
                        "method": "delete_claim"
                    },
                    "data": {
                        "nomor_sep": "0123456789COBA",
                        "coder_nik": "123123123123"
                    }
                };
                tempData.push(jsonGrouper)
                dispatch(bridgingInacbgSave(tempData))
                const tempValue = {
                    norec: norecdp,
                    nominalklaim: newData.data[2].dataResponse.response.cbg.tariff
                }
                dispatch(updateEstimasiKlaim(tempValue, () => {
                    dispatch(getWidgetEfisiensiKlaim({ norecdp: norecdp }));
                }));
            }
        }
    }, [newData, norecdp, dispatch])
    return (
        <React.Fragment>
            <DeleteModalCustom
                isOpen={deleteModal}
                onDeleteClick={handleDeleteOrder}
                toggle={() => setDeleteModal(false)}
                msgHDelete='Apa Kamu Yakin ?'
                msgBDelete='Yakin ingin menghapus data ini?'
            />
            <Row className="gy-4">
                <UiContent />
                <p style={{ fontSize: '20px', textAlign: 'center', color: 'red' }} className="fw-semibold">informasi harga pada tab ini hanya digunakan untuk melakukan simulasi estimasi harga sebagai referensi</p>
                <Row className="row-cols-xxl-4 row-cols-lg-3 row-cols-1">
                    {dataWidget.map((item, key) => (
                        <Col key={key}>
                            <Card className="card-animate" style={{ backgroundColor: '#ffeaa7' }}>
                                <CardBody>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="fw-medium mb-0">{item.label}</p>
                                            <h2 className="mt-4 ff-secondary fw-semibold">
                                                <span className="counter-value" style={{ fontSize: "2rem", color: item.color }}>
                                                    <CountUp
                                                        start={0}
                                                        end={item.total}
                                                        decimal={item.decimals}
                                                        // suffix={item.suffix}
                                                        duration={3}
                                                    />
                                                </span>
                                            </h2>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                    ))}
                </Row>
                <Card>
                    <CardHeader className="card-header-snb">
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
                                            placeholder='Diagnosa...'
                                            onInputChange={handleDiagnosa}
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
                                            placeholder="Tipe Diagnosa..."
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
                                            placeholder='Kasus Penyakit...'
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
                                            placeholder='Unit...'
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
                                            id="kodediagnosa9"
                                            name="kodediagnosa9"
                                            options={dataDiagnosa9}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa9.setFieldValue('kodediagnosa9', e?.value || '')
                                            }}
                                            value={vSetValidationDiagnosa9.values.kodediagnosa9}
                                            className={`input row-header ${!!vSetValidationDiagnosa9?.errors.kodediagnosa9 ? 'is-invalid' : ''
                                                }`}
                                            placeholder='Diagnosa...'
                                        />
                                        {vSetValidationDiagnosa9.touched.kodediagnosa9 &&
                                            !!vSetValidationDiagnosa9.errors.kodediagnosa9 && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa9.errors.kodediagnosa9}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={2}>
                                        <Input
                                            id="jumlahtindakan"
                                            name="jumlahtindakan"
                                            type="number"
                                            value={vSetValidationDiagnosa9.values.jumlahtindakan}
                                            onChange={(e) => {
                                                const newVal = onChangeStrNbr(
                                                    e.target.value,
                                                    vSetValidationDiagnosa9.values.jumlahtindakan
                                                )
                                                vSetValidationDiagnosa9.setFieldValue('jumlahtindakan', newVal)
                                            }}
                                            invalid={vSetValidationDiagnosa9.touched?.jumlahtindakan &&
                                                !!vSetValidationDiagnosa9.errors?.jumlahtindakan}
                                            placeholder="Jumlah..."
                                        />
                                        {vSetValidationDiagnosa9.touched?.jumlahtindakan
                                            && !!vSetValidationDiagnosa9.errors.jumlahtindakan && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa9.errors.jumlahtindakan}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}>
                                        <CustomSelect
                                            id="norecap"
                                            name="norecap"
                                            options={dataHistory}
                                            onChange={(e) => {
                                                vSetValidationDiagnosa9.setFieldValue('norecap', e?.norec || '')
                                            }}
                                            value={vSetValidationDiagnosa9.values.norecap}
                                            className={`input row-header ${!!vSetValidationDiagnosa9?.errors.norecap ? 'is-invalid' : ''
                                                }`}
                                            placeholder='Unit...'
                                        />
                                        {vSetValidationDiagnosa9.touched.norecap &&
                                            !!vSetValidationDiagnosa9.errors.norecap && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidationDiagnosa9.errors.norecap}</div>
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
                    <CardHeader className="card-header-snb">
                        <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Penginputan Tindakan</h4>
                    </CardHeader>
                    <CardBody>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                vSetValidationTindakan.handleSubmit();
                                return false;
                            }}
                            className="gy-4"
                            action="#">
                            <Row className="gy-4">
                                {/* <Col lg={2}>
                                    <div className="mt-2">
                                        <Label className="form-label">Unit</Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <CustomSelect
                                        id="unitlast"
                                        name="unitlast"
                                        options={dataHistory}
                                        onChange={handleUnitLast}
                                        value={vSetValidationTindakan.values.unitlast}
                                        className={`input row-header ${!!vSetValidationTindakan?.errors.unitlast ? 'is-invalid' : ''
                                            }`}
                                    />
                                    {vSetValidationTindakan.touched.unitlast &&
                                        !!vSetValidationTindakan.errors.unitlast && (
                                            <FormFeedback type="invalid">
                                                <div>{vSetValidationTindakan.errors.unitlast}</div>
                                            </FormFeedback>
                                        )}
                                </Col> */}
                                <Col lg={2}>
                                    <div className="mt-2">
                                        <Label className="form-label">Tanggal Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <KontainerFlatpickr
                                        isError={vSetValidationTindakan.touched?.tgltindakan &&
                                            !!vSetValidationTindakan.errors?.tgltindakan}
                                        id="tgltindakan"
                                        options={{
                                            dateFormat: 'Y-m-d H:i',
                                            defaultDate: 'today',
                                            enableTime: true,
                                            time_24hr: true
                                        }}
                                        value={vSetValidationTindakan.values.tgltindakan}
                                        onChange={([newDate]) => {
                                            vSetValidationTindakan.setFieldValue('tgltindakan', newDate.toISOString())
                                        }}
                                    />
                                    {vSetValidationTindakan.touched?.tgltindakan
                                        && !!vSetValidationTindakan.errors.tgltindakan && (
                                            <FormFeedback type="invalid">
                                                <div>{vSetValidationTindakan.errors.tgltindakan}</div>
                                            </FormFeedback>
                                        )}
                                </Col>
                                <Col lg={2}>
                                    <div className="mt-2">
                                        <Label className="form-label">Nama Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <CustomSelect
                                        id="tindakan"
                                        name="tindakan"
                                        options={dataTindakan}
                                        onChange={handleTindakanSelcted}
                                        onInputChange={handleTindakan}
                                        value={vSetValidationTindakan.values.tindakan}
                                        className={`input row-header ${!!vSetValidationTindakan?.errors.tindakan ? 'is-invalid' : ''
                                            }`}
                                    />
                                    {vSetValidationTindakan.touched.tindakan &&
                                        !!vSetValidationTindakan.errors.tindakan && (
                                            <FormFeedback type="invalid">
                                                <div>{vSetValidationTindakan.errors.tindakan}</div>
                                            </FormFeedback>
                                        )}
                                </Col>
                                <Col lg={2}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="qty" className="form-label fw-semibold">Quantity</Label>
                                    </div>
                                </Col>
                                <Col lg={2}>
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
                                <Col lg={2}>
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
                                <Col lg={12} className="mr-3 me-3 mt-2">
                                    <div className="d-flex flex-wrap justify-content-end gap-2">
                                        <Button type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                                        <Button type="button" color="danger" style={{ width: '20%' }}
                                        // onClick={() => { toggle()}}
                                        >Batal</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader className="card-header-snb">
                        <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>List Tindakan</h4>
                    </CardHeader>
                    <CardBody>
                        <Col lg={12} className="mr-3 me-3 mt-2">
                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                <Button
                                    disabled={error ? null : loading ? true : false}
                                    type="button" color="success" style={{ width: '20%' }}
                                    onClick={() => handleClickGrouping()}>
                                    {error ? null : loading ? (
                                        <Spinner size="sm" className="me-2">
                                            {' '}
                                            Loading...{' '}
                                        </Spinner>
                                    ) : null}Grouping</Button>

                            </div>
                        </Col>
                        <div id="table-gridjs">
                            <DataTable
                                fixedHeader
                                fixedHeaderScrollHeight="330px"
                                columns={columns}
                                pagination
                                data={dataListTindakan}
                                progressPending={loadingListTindakan}
                                customStyles={tableCustomStyles}
                                progressComponent={<LoadingTable />}
                            />

                        </div>
                    </CardBody>
                </Card>
            </Row>
        </React.Fragment>
    )
}
export default (EfisiensiBPJS)