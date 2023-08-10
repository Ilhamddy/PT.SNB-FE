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
import CustomSelect from '../../Select/Select';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import calendar from "../../../assets/images/users/calendar.png";
import SearchOption from '../../../Components/Common/SearchOption';
import { dateTimeLocal } from "../../../utils/format";
import {
    casemixResetForm, listCariPasienGet, listDaftarPasienGet, listTarifPasienGet,
    listDiagnosaxGet, listDiagnosaixGet, bridgingInacbgSave, emrDiagnosaxGet,
    emrDiagnosaxSave, emrDiagnosaixGet, emrDiagnosaixSave, deleteDiagnosax,
    deleteDiagnosaix, tarifKlaimSave, listCmgOptionsGet, statusKlaimSave,
    tarifCmgOptionsSave
} from '../../../store/actions';
import { BasicTable } from '../../Tables/DataTables/datatableCom';
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';
import LoadingTable from '../../../Components/LoadingTable/LoadingTable';

const dateAwalStart = (new Date(new Date() - 1000 * 60 * 60 * 24 * 3)).toISOString();
const dateAwalEnd = (new Date()).toISOString()
const KlaimInacbg = () => {
    document.title = "Klaim Inacbg";
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
        dataPasien, loadingPasien, successPasien, dataDaftarPasien, loadingDaftarPasien, successDaftarPasien,
        dataTarifPasien, loadingTarifPasien, successTarifPasien,
        dataRiwayatD10, loadingRiwayatD10, successRiwayatD10,
        dataRiwayatD9, loadingRiwayatD9, successRiwayatD9,
        dataDiagnosa, loadingDiagnosa, successDiagnosa,
        newDataDiagnosax, loadingDiagnosax, successDiagnosax,
        dataDiagnosaix, loadingDiagnosaix, successDiagnosaix,
        newDataDiagnosaixSave, loadingDiagnosaixSave, successDiagnosaixSave,
        newDataDelete, successDelete, newDataDeleteix, successDeleteix,
        newDataTarifKlaim, loadingTarifKlaim, successTarifKlaim,
        dataListCmg, loadingListCmg, successListCmg,
        newDataStatusKlaim, loadingStatusKlaim, successStatusKlaim,
        newDataTarifCmg, loadingTarifCmg, successTarifCmg, } = useSelector((state) => ({
            newData: state.Casemix.bridgingInacbgSave.newData,
            success: state.Casemix.bridgingInacbgSave.success,
            loading: state.Casemix.bridgingInacbgSave.loading,
            dataPasien: state.Casemix.listCariPasienGet.data,
            loadingPasien: state.Casemix.listCariPasienGet.loading,
            successPasien: state.Casemix.listCariPasienGet.success,
            dataDaftarPasien: state.Casemix.listDaftarPasienGet.data,
            loadingDaftarPasien: state.Casemix.listDaftarPasienGet.loading,
            successDaftarPasien: state.Casemix.listDaftarPasienGet.success,
            dataTarifPasien: state.Casemix.listTarifPasienGet.data,
            loadingTarifPasien: state.Casemix.listTarifPasienGet.loading,
            successTarifPasien: state.Casemix.listTarifPasienGet.success,
            dataRiwayatD10: state.Casemix.listDiagnosaxGet.data,
            loadingRiwayatD10: state.Casemix.listDiagnosaxGet.loading,
            successRiwayatD10: state.Casemix.listDiagnosaxGet.success,
            dataRiwayatD9: state.Casemix.listDiagnosaixGet.data,
            loadingRiwayatD9: state.Casemix.listDiagnosaixGet.loading,
            successRiwayatD9: state.Casemix.listDiagnosaixGet.success,
            dataDiagnosa: state.Emr.emrDiagnosaxGet.data,
            loadingDiagnosa: state.Emr.emrDiagnosaxGet.loading,
            successDiagnosa: state.Emr.emrDiagnosaxGet.success,
            newDataDiagnosax: state.Emr.emrDiagnosaxSave.newData,
            successDiagnosax: state.Emr.emrDiagnosaxSave.success,
            loadingDiagnosax: state.Emr.emrDiagnosaxSave.loading,
            dataDiagnosaix: state.Emr.emrDiagnosaixGet.data,
            loadingDiagnosaix: state.Emr.emrDiagnosaixGet.loading,
            successDiagnosaix: state.Emr.emrDiagnosaixGet.success,
            newDataDiagnosaixSave: state.Emr.emrDiagnosaixSave.newData,
            successDiagnosaixSave: state.Emr.emrDiagnosaixSave.success,
            loadingDiagnosaixSave: state.Emr.emrDiagnosaixSave.loading,
            newDataDelete: state.Emr.deleteDiagnosax.newData,
            successDelete: state.Emr.deleteDiagnosax.success,
            newDataDeleteix: state.Emr.deleteDiagnosaix.newData,
            successDeleteix: state.Emr.deleteDiagnosax.success,
            newDataTarifKlaim: state.Casemix.tarifKlaimSave.newData,
            successTarifKlaim: state.Casemix.tarifKlaimSave.success,
            loadingTarifKlaim: state.Casemix.tarifKlaimSave.loading,
            dataListCmg: state.Casemix.listCmgOptionsGet.data,
            loadingListCmg: state.Casemix.listCmgOptionsGet.loading,
            successListCmg: state.Casemix.listCmgOptionsGet.success,
            newDataStatusKlaim: state.Casemix.statusKlaimSave.newData,
            successStatusKlaim: state.Casemix.statusKlaimSave.success,
            loadingStatusKlaim: state.Casemix.statusKlaimSave.loading,
            newDataTarifCmg: state.Casemix.tarifCmgOptionsSave.newData,
            successTarifCmg: state.Casemix.tarifCmgOptionsSave.success,
            loadingTarifCmg: state.Casemix.tarifCmgOptionsSave.loading,
        }));

    useEffect(() => {
        return () => {
            dispatch(casemixResetForm());
        }
    }, [dispatch])
    const handleClickButton = (e) => {
        if (cardCari === true)
            setcardCari(false)
        else
            setcardCari(true)
    };
    const [cardCari, setcardCari] = useState(false);
    const listJenisRawat = [
        {
            options: [
                { label: "Semua", value: 1 },
                { label: "Rawat Inap", value: 2 },
                { label: "Rawat Jalan", value: 3 }
            ],
        },
    ];
    const listPeriode = [
        {
            options: [
                { label: "Tanggal Pulang", value: 1 },
                { label: "Tanggal Masuk", value: 2 },
                // { label: "Tanggal ", value: 3 }
            ],
        },
    ];
    const [dateStart, setDateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
    const [search, setSearch] = useState("");
    const [stateList, setstateList] = useState(false)
    const [statePencarian, setstatePencarian] = useState(true)
    const [stateListNoregistrasi, setstateListNoregistrasi] = useState(false)
    const [stateCoder, setstateCoder] = useState(false)
    const [stateNocm, setstateNocm] = useState('')
    const [stateNama, setstateNama] = useState('')
    const [stateJK, setstateJK] = useState('')
    const [stateTglLahir, setstateTglLahir] = useState('')
    const [stateTemp, setstateTemp] = useState([])
    const [stateRJ, setstateRJ] = useState(false)
    const [stateRI, setstateRI] = useState(false)
    const [activeTab, setActiveTab] = useState('1');
    const [stateTombol, setstateTombol] = useState('1');
    const [stateDescriptionCbg, setstateDescriptionCbg] = useState("")
    const [stateCodeCbg, setstateCodeCbg] = useState("")
    const [stateTariff, setstateTariff] = useState(0)
    const [stateHasilGrouping, setstateHasilGrouping] = useState(false)
    const [stateHasilGroupingV6, setstateHasilGroupingV6] = useState(false)
    const [stateTombolGrouping, setstateTombolGrouping] = useState(true)
    const [stateTombolFinal, setstateTombolFinal] = useState(true)
    const [stateDeleteDiagnosa, setstateDeleteDiagnosa] = useState(10)
    const [stateMDC, setstateMDC] = useState("")
    const [stateMDCCode, setstateMDCCode] = useState("")
    const [stateDRG, setstateDRG] = useState("")
    const [stateDRGCode, setstateDRGCode] = useState("")
    const [stateTariffSpecialProcedure, setstateTariffSpecialProcedure] = useState(0)
    const [stateTariffSpecialProsthesis, setstateTariffSpecialProsthesis] = useState(0)
    const [stateTariffSpecialInvestigation, setstateTariffSpecialInvestigation] = useState(0)
    const [stateTariffSpecialDrug, setstateTariffSpecialDrug] = useState(0)

    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            setstateList(true)
            dispatch(listCariPasienGet(search))
        }
    }
    const widgetsTasksJenisRawat = [
        {
            id: 1,
            label: "Jalan",
            value: stateRJ,
        },
        {
            id: 2,
            label: "Inap",
            value: stateRI,
        },
    ];
    const widgetsTasksKelasRawat = [
        {
            id: 1,
            label: "Regular",
            value: true,
        },
        {
            id: 2,
            label: "Eksekutif",
            value: false,
        },
    ];

    const clickList = (e) => {
        setstateList(false)
        setstatePencarian(false)
        setstateListNoregistrasi(true)
        setstateNocm(e.nocm)
        setstateNama(e.namapasien)
        setstateJK(e.jeniskelamin)
        setstateTglLahir(e.tgllahir)
        dispatch(listDaftarPasienGet(e.id))
    }
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
    const handleClick = (e) => {
        setstateHasilGrouping(false)
        setstateListNoregistrasi(false)
        setstateCoder(true)
        setstateTemp(e)
        if (e.tipe === 'RJ') {
            setstateRJ(true)
            setstateRI(false)
        } else {
            setstateRI(true)
            setstateRJ(false)
        }
        dispatch(listTarifPasienGet(e.norec))
        dispatch(listDiagnosaxGet(e.norec));
        dispatch(listDiagnosaixGet(e.norec));

        if (e.status_grouping === 'GROUPING') {
            setstateHasilGrouping(true)
            setstateHasilGroupingV6(true)
            setstateDescriptionCbg(e.cbg_description)
            setstateCodeCbg(e.cbg_code)
            setstateTariff(e.cbg_tarif)
            setstateMDC(e.cbg_mdc_description)
            setstateMDCCode(e.cbg_mdc_number)
            setstateDRG(e.cbg_drg_description)
            setstateDRGCode(e.cbg_drg_code)
            dispatch(listCmgOptionsGet(e.norec))
        } else if (e.status_grouping === 'FINAL_KLAIM') {
            setstateTombolGrouping(false)
            setstateTombolFinal(false)
            setstateHasilGrouping(true)
            setstateHasilGroupingV6(true)
            setstateDescriptionCbg(e.cbg_description)
            setstateCodeCbg(e.cbg_code)
            setstateTariff(e.cbg_tarif)
            setstateMDC(e.cbg_mdc_description)
            setstateMDCCode(e.cbg_mdc_number)
            setstateDRG(e.cbg_drg_description)
            setstateDRGCode(e.cbg_drg_code)
            dispatch(listCmgOptionsGet(e.norec))
        } else if (e.status_grouping === 'EDIT_KLAIM') {
            setstateTombolGrouping(true)
            setstateTombolFinal(true)
        }
    };
    //delete order
    const [deleteModal, setDeleteModal] = useState(false);
    const [product, setProduct] = useState(null);
    const onClickDelete = (product, id) => {
        setstateDeleteDiagnosa(id)
        setProduct(product);
        setDeleteModal(true);
    };
    const handleDeleteOrder = () => {
        if (product) {
            if (stateDeleteDiagnosa === 10) {
                dispatch(deleteDiagnosax(product.norec));
            } else {
                dispatch(deleteDiagnosaix(product.norec));
            }

            setDeleteModal(false);
        }
    };
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(row)}>{row.noregistrasi}</button>),
            cell: (data) => {
                return (
                    <Link to="#" onClick={() => handleClick(data)} className="link-primary text-decoration-underline">{data.noregistrasi}</Link>
                )
            },
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Masuk</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Pulang</span>,
            selector: row => row.tglpulang,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jaminan 1</span>,
            selector: row => row.jaminan1,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nomor Jaminan 1</span>,
            selector: row => row.no_sep,
            sortable: true,
            width: "150px"
        },
        // {

        //     name: <span className='font-weight-bold fs-13'>Jaminan 2</span>,
        //     selector: row => row.jaminan2,
        //     sortable: true,
        //     width: "150px"
        // },
        // {
        //     name: <span className='font-weight-bold fs-13'>Nomor Jaminan 2</span>,
        //     selector: row => row.no_sep,
        //     sortable: true,
        //     width: "150px"
        // },
        {
            name: <span className='font-weight-bold fs-13'>Tipe</span>,
            selector: row => row.tipe,
            sortable: true,
            width: "150px",
        },
        {
            name: <span className='font-weight-bold fs-13'>CBG</span>,
            selector: row => '-',
            sortable: true,
            width: "150px",
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.status_grouping,
            sortable: true,
            width: "150px",
        },
        {
            name: <span className='font-weight-bold fs-13'>Petugas</span>,
            selector: row => '-',
            sortable: true,
            width: "150px",
        },
    ];
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
    const back = () => {
        setstatePencarian(true)
        setstateListNoregistrasi(false)
    }
    const back2 = () => {
        setstateListNoregistrasi(true)
        setstateCoder(false)
        setstateDescriptionCbg("")
        setstateCodeCbg("")
        setstateTariff("")
        setstateMDC("")
        setstateMDCCode("")
        setstateDRG("")
        setstateDRGCode("")
    }
    const handleDiagnosa = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(emrDiagnosaxGet(characterEntered, 'diagnosa10'));
        }
    };
    const handleDiagnosaix = characterEntered => {
        if (characterEntered.length > 3) {
            dispatch(emrDiagnosaixGet(characterEntered, 'diagnosa9'));
        }
    };
    const handleDiagnosaSave = (e) => {
        let tipediagnosa = 2
        if (dataRiwayatD10.length === 0) {
            tipediagnosa = 1
        }
        const tempValue = {
            "norecap": stateTemp.norecta,
            "tipediagnosa": tipediagnosa,
            "kodediagnosa": e,
            "kasuspenyakit": 2,
            "keteranganicd10": "",
            "idlabel": 3,
            "label": 'DIAGNOSA'
        }
        dispatch(emrDiagnosaxSave(tempValue, ''));
    };
    const handleDiagnosaixSave = (e) => {
        const tempValue = {
            "norecap": stateTemp.norecta,
            "kodediagnosa9": e,
            "keteranganicd9": '',
            "jumlahtindakan": count,
            "idlabel": 3,
            "label": 'DIAGNOSA'
        }
        dispatch(emrDiagnosaixSave(tempValue, ''));
    };

    useEffect(() => {
        dispatch(listDiagnosaxGet(stateTemp.norec));
    }, [newDataDelete, stateTemp.norec, dispatch])

    useEffect(() => {
        dispatch(listDiagnosaixGet(stateTemp.norec));
    }, [newDataDeleteix, stateTemp.norec, dispatch])

    useEffect(() => {
        dispatch(listDiagnosaxGet(stateTemp.norec));
    }, [newDataDiagnosax, stateTemp.norec, dispatch])

    useEffect(() => {
        dispatch(listDiagnosaixGet(stateTemp.norec));
    }, [newDataDiagnosaixSave, stateTemp.norec, dispatch])

    useEffect(() => {
        console.log('masuk cmg')
        dispatch(listCmgOptionsGet(stateTemp.norec));


    }, [newDataTarifKlaim, stateTemp.norec, dispatch])

    const handleClickEditKlaim = (e) => {
        setstateTombol('3')
        let tempData = []
        const jsonEdit_Claim = {
            "metadata": {
                "method": "reedit_claim"
            },
            "data": {
                "nomor_sep": stateTemp.no_sep,
            }
        };
        tempData.push(jsonEdit_Claim)
        dispatch(bridgingInacbgSave(tempData))
    }
    const handleClickFinal = (e) => {
        setstateTombol('2')
        let tempData = []
        const jsonFinal_Claim = {
            "metadata": {
                "method": "claim_final"
            },
            "data": {
                "nomor_sep": stateTemp.no_sep,
                "coder_nik": "123123123123"
            }
        };
        tempData.push(jsonFinal_Claim)
        dispatch(bridgingInacbgSave(tempData))
    }
    const handleClickGrouping = (e) => {
        setstateTombol('1')
        setstateHasilGrouping(false)
        let tempData = []

        if (dataRiwayatD10.length === 0) {
            toast.error('Diagnosa 10 Belum Diisi', { autoClose: 3000 });
        }
        // UNU Grouper
        let paramDiagnosa = ''
        for (let x = 0; x < dataRiwayatD10.length; x++) {
            if (paramDiagnosa === '') {
                paramDiagnosa = dataRiwayatD10[x].kodediagnosa
            } else {
                paramDiagnosa = paramDiagnosa + '#' + dataRiwayatD10[x].kodediagnosa
            }
        }
        let paramDiagnosa9 = ''
        for (let x = 0; x < dataRiwayatD9.length; x++) {
            if (paramDiagnosa9 === '') {
                paramDiagnosa9 = dataRiwayatD9[x].kodediagnosa
            } else {
                paramDiagnosa9 = paramDiagnosa9 + '#' + dataRiwayatD9[x].kodediagnosa
            }
        }
        // end
        // INA Grouper
        let paramDiagnosa9Ina = ''
        for (let x = 0; x < dataRiwayatD9.length; x++) {
            if (paramDiagnosa9Ina === '') {
                if (dataRiwayatD9[x].qty > 1) {
                    paramDiagnosa9Ina = dataRiwayatD9[x].kodediagnosa + '+' + dataRiwayatD9[x].qty
                } else {
                    paramDiagnosa9Ina = dataRiwayatD9[x].kodediagnosa
                }
            } else {
                if (dataRiwayatD9[x].qty > 1) {
                    paramDiagnosa9Ina = paramDiagnosa9Ina + '#' + dataRiwayatD9[x].kodediagnosa + '+' + dataRiwayatD9[x].qty
                } else {
                    paramDiagnosa9Ina = paramDiagnosa9Ina + '#' + dataRiwayatD9[x].kodediagnosa
                }
            }
        }
        // end
        console.log(paramDiagnosa9Ina)
        if (stateRJ === true) {
            const jsonNew_Claim = {
                "metadata": {
                    "method": "new_claim"
                },
                "data": {
                    "nomor_kartu": stateTemp.no_kartu,
                    "nomor_sep": stateTemp.no_sep,
                    "nomor_rm": stateTemp.nocm,
                    "nama_pasien": stateTemp.namapasien,
                    "tgl_lahir": stateTemp.tgllahir,
                    "gender": stateTemp.gender
                }
            };
            tempData.push(jsonNew_Claim)
            const jsonSet_Claim = {
                "metadata": {
                    "method": "set_claim_data",
                    "nomor_sep": stateTemp.no_sep
                },
                "data": {
                    "nomor_sep": stateTemp.no_sep,
                    "nomor_kartu": stateTemp.no_kartu,
                    "tgl_masuk": stateTemp.tglregistrasi3,
                    "tgl_pulang": stateTemp.tglpulang3,
                    "cara_masuk": stateTemp.kodecaramasuk,
                    "jenis_rawat": stateTemp.jenis_rawat,
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
                    "birth_weight": parseFloat(stateTemp.bb),
                    "sistole": parseFloat(stateTemp.sistole),
                    "diastole": parseFloat(stateTemp.diastole),
                    "discharge_status": stateTemp.kodecarapulang,
                    "diagnosa": paramDiagnosa,//unu Grouper
                    "procedure": paramDiagnosa9,
                    "diagnosa_inagrouper": "#",
                    "procedure_inagrouper": "#",
                    "tarif_rs": {
                        "prosedur_non_bedah": dataTarifPasien.prosedur_non_bedah,
                        "prosedur_bedah": dataTarifPasien.prosedur_bedah,
                        "konsultasi": dataTarifPasien.konsultasi,
                        "tenaga_ahli": dataTarifPasien.tenaga_ahli,
                        "keperawatan": dataTarifPasien.keperawatan,
                        "penunjang": dataTarifPasien.penunjang,
                        "radiologi": dataTarifPasien.radiologi,
                        "laboratorium": dataTarifPasien.laboratorium,
                        "pelayanan_darah": dataTarifPasien.pelayanan_darah,
                        "rehabilitasi": dataTarifPasien.rehabilitasi,
                        "kamar": dataTarifPasien.akomodasi,
                        "rawat_intensif": dataTarifPasien.rawat_intensif,
                        "obat": dataTarifPasien.obat,
                        "obat_kronis": dataTarifPasien.obat_kronis,
                        "obat_kemoterapi": dataTarifPasien.obat_kemoterapi,
                        "alkes": dataTarifPasien.alkes,
                        "bmhp": dataTarifPasien.bmhp,
                        "sewa_alat": dataTarifPasien.sewa_alat
                    },
                    // "pemulasaraan_jenazah": "0",
                    // "kantong_jenazah": "0",
                    // "peti_jenazah": "0",
                    // "plastik_erat": "0",
                    // "desinfektan_jenazah": "0",
                    // "mobil_jenazah": "0",
                    // "desinfektan_mobil_jenazah": "0",
                    // "covid19_status_cd": "0",
                    // "nomor_kartu_t": "",
                    // "episodes": "",
                    // "covid19_cc_ind": "0",
                    // "covid19_rs_darurat_ind": "0",
                    // "covid19_co_insidense_ind": "0",
                    // "covid19_penunjang_pengurang":
                    // {
                    //     "lab_asam_laktat": "0",
                    //     "lab_procalcitonin": "0",
                    //     "lab_crp": "0",
                    //     "lab_kultur": "0",
                    //     "lab_d_dimer": "0",
                    //     "lab_pt": "0",
                    //     "lab_aptt": "0",
                    //     "lab_waktu_pendarahan": "0",
                    //     "lab_anti_hiv": "0",
                    //     "lab_analisa_gas": "0",
                    //     "lab_albumin": "0",
                    //     "rad_thorax_ap_pa": "0"
                    // },
                    // "terapi_konvalesen": "0",
                    // "akses_naat": "0",
                    // "isoman_ind": "0",
                    // "bayi_lahir_status_cd": 0,
                    // "dializer_single_use": "0",
                    // "kantong_darah": 0,
                    // "apgar":
                    // {
                    //     "menit_1":
                    //     {
                    //         "appearance": 0,
                    //         "pulse": 0,
                    //         "grimace": 0,
                    //         "activity": 0,
                    //         "respiration": 0
                    //     },
                    //     "menit_5": {
                    //         "appearance": 0,
                    //         "pulse": 0,
                    //         "grimace": 0,
                    //         "activity": 0,
                    //         "respiration": 0
                    //     }
                    // },
                    // "persalinan": {
                    //     "usia_kehamilan": "22",
                    //     "gravida": "2",
                    //     "partus": "4",
                    //     "abortus": "2",
                    //     "onset_kontraksi": "induksi",
                    //     "delivery": [
                    //         {
                    //             "delivery_sequence": "1",
                    //             "delivery_method": "vaginal",
                    //             "delivery_dttm": "2023-01-21 17:01:33",
                    //             "letak_janin": "kepala",
                    //             "kondisi": "livebirth",
                    //             "use_manual": "1",
                    //             "use_forcep": "0",
                    //             "use_vacuum": "1"
                    //         },
                    //         {
                    //             "delivery_sequence": "2",
                    //             "delivery_method": "vaginal",
                    //             "delivery_dttm": "2023-01-21 17:03:49",
                    //             "letak_janin": "lintang",
                    //             "kondisi": "livebirth",
                    //             "use_manual": "1",
                    //             "use_forcep": "0",
                    //             "use_vacuum": "0"
                    //         }
                    //     ]
                    // },
                    "tarif_poli_eks": "0",
                    "nama_dokter": stateTemp.dpjp,
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
                    "nomor_sep": stateTemp.no_sep
                }
            };
            tempData.push(jsonGrouper)
        } else {
            const jsonNew_Claim = {
                "metadata": {
                    "method": "new_claim"
                },
                "data": {
                    "nomor_kartu": stateTemp.no_kartu,
                    "nomor_sep": stateTemp.no_sep,
                    "nomor_rm": stateTemp.nocm,
                    "nama_pasien": stateTemp.namapasien,
                    "tgl_lahir": stateTemp.tgllahir,
                    "gender": stateTemp.gender
                }
            };
            tempData.push(jsonNew_Claim)
            const jsonSet_Claim = {
                "metadata": {
                    "method": "set_claim_data",
                    "nomor_sep": stateTemp.no_sep
                },
                "data": {
                    "nomor_sep": stateTemp.no_sep,
                    "nomor_kartu": stateTemp.no_kartu,
                    "tgl_masuk": stateTemp.tglregistrasi3,
                    "tgl_pulang": stateTemp.tglpulang3,
                    "cara_masuk": stateTemp.kodecaramasuk,
                    "jenis_rawat": stateTemp.jenis_rawat,
                    "kelas_rawat": stateTemp.kelas_bpjs,
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
                    "birth_weight": parseFloat(stateTemp.bb),
                    "sistole": parseFloat(stateTemp.sistole),
                    "diastole": parseFloat(stateTemp.diastole),
                    "discharge_status": stateTemp.kodecarapulang,
                    "diagnosa": paramDiagnosa,//unu Grouper
                    "procedure": paramDiagnosa9,
                    "diagnosa_inagrouper": paramDiagnosa,
                    "procedure_inagrouper": paramDiagnosa9Ina,
                    "tarif_rs": {
                        "prosedur_non_bedah": dataTarifPasien.prosedur_non_bedah,
                        "prosedur_bedah": dataTarifPasien.prosedur_bedah,
                        "konsultasi": dataTarifPasien.konsultasi,
                        "tenaga_ahli": dataTarifPasien.tenaga_ahli,
                        "keperawatan": dataTarifPasien.keperawatan,
                        "penunjang": dataTarifPasien.penunjang,
                        "radiologi": dataTarifPasien.radiologi,
                        "laboratorium": dataTarifPasien.laboratorium,
                        "pelayanan_darah": dataTarifPasien.pelayanan_darah,
                        "rehabilitasi": dataTarifPasien.rehabilitasi,
                        "kamar": dataTarifPasien.akomodasi,
                        "rawat_intensif": dataTarifPasien.rawat_intensif,
                        "obat": dataTarifPasien.obat,
                        "obat_kronis": dataTarifPasien.obat_kronis,
                        "obat_kemoterapi": dataTarifPasien.obat_kemoterapi,
                        "alkes": dataTarifPasien.alkes,
                        "bmhp": dataTarifPasien.bmhp,
                        "sewa_alat": dataTarifPasien.sewa_alat
                    },
                    // "pemulasaraan_jenazah": "0",
                    // "kantong_jenazah": "0",
                    // "peti_jenazah": "0",
                    // "plastik_erat": "0",
                    // "desinfektan_jenazah": "0",
                    // "mobil_jenazah": "0",
                    // "desinfektan_mobil_jenazah": "0",
                    // "covid19_status_cd": "0",
                    // "nomor_kartu_t": "",
                    // "episodes": "",
                    // "covid19_cc_ind": "0",
                    // "covid19_rs_darurat_ind": "0",
                    // "covid19_co_insidense_ind": "0",
                    // "covid19_penunjang_pengurang":
                    // {
                    //     "lab_asam_laktat": "0",
                    //     "lab_procalcitonin": "0",
                    //     "lab_crp": "0",
                    //     "lab_kultur": "0",
                    //     "lab_d_dimer": "0",
                    //     "lab_pt": "0",
                    //     "lab_aptt": "0",
                    //     "lab_waktu_pendarahan": "0",
                    //     "lab_anti_hiv": "0",
                    //     "lab_analisa_gas": "0",
                    //     "lab_albumin": "0",
                    //     "rad_thorax_ap_pa": "0"
                    // },
                    // "terapi_konvalesen": "0",
                    // "akses_naat": "0",
                    // "isoman_ind": "0",
                    // "bayi_lahir_status_cd": 0,
                    // "dializer_single_use": "0",
                    // "kantong_darah": 0,
                    // "apgar":
                    // {
                    //     "menit_1":
                    //     {
                    //         "appearance": 0,
                    //         "pulse": 0,
                    //         "grimace": 0,
                    //         "activity": 0,
                    //         "respiration": 0
                    //     },
                    //     "menit_5": {
                    //         "appearance": 0,
                    //         "pulse": 0,
                    //         "grimace": 0,
                    //         "activity": 0,
                    //         "respiration": 0
                    //     }
                    // },
                    // "persalinan": {
                    //     "usia_kehamilan": "22",
                    //     "gravida": "2",
                    //     "partus": "4",
                    //     "abortus": "2",
                    //     "onset_kontraksi": "induksi",
                    //     "delivery": [
                    //         {
                    //             "delivery_sequence": "1",
                    //             "delivery_method": "vaginal",
                    //             "delivery_dttm": "2023-01-21 17:01:33",
                    //             "letak_janin": "kepala",
                    //             "kondisi": "livebirth",
                    //             "use_manual": "1",
                    //             "use_forcep": "0",
                    //             "use_vacuum": "1"
                    //         },
                    //         {
                    //             "delivery_sequence": "2",
                    //             "delivery_method": "vaginal",
                    //             "delivery_dttm": "2023-01-21 17:03:49",
                    //             "letak_janin": "lintang",
                    //             "kondisi": "livebirth",
                    //             "use_manual": "1",
                    //             "use_forcep": "0",
                    //             "use_vacuum": "0"
                    //         }
                    //     ]
                    // },
                    "tarif_poli_eks": "0",
                    "nama_dokter": stateTemp.dpjp,
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
                    "nomor_sep": stateTemp.no_sep
                }
            };
            tempData.push(jsonGrouper)
        }
        dispatch(bridgingInacbgSave(tempData))
    };
    const handleClickPrintFinal = (e) => {
        setstateTombol('4')
        let tempData = []
        const jsonPrint_Claim = {
            "metadata": {
                "method": "claim_print"
            },
            "data": {
                "nomor_sep": stateTemp.no_sep
            }
        };
        tempData.push(jsonPrint_Claim)
        dispatch(bridgingInacbgSave(tempData))
    }
    useEffect(() => {
        if (newData !== null) {

            if (stateTombol === '1') {
                if (newData.data[2].dataResponse !== undefined) {
                    setstateHasilGrouping(true)
                    setstateDescriptionCbg(newData.data[2].dataResponse.response.cbg.description)
                    setstateCodeCbg(newData.data[2].dataResponse.response.cbg.code)
                    setstateTariff(newData.data[2].dataResponse.response.cbg.tariff)
                    setstateMDC(newData.data[2].dataResponse.response_inagrouper.mdc_description)
                    setstateMDCCode(newData.data[2].dataResponse.response_inagrouper.mdc_code)
                    setstateDRG(newData.data[2].dataResponse.response_inagrouper.drg_description)
                    setstateDRGCode(newData.data[2].dataResponse.response_inagrouper.drg_code)
                    const value = {
                        "data": newData.data[2].dataResponse,
                        "norec": stateTemp.norec,
                        "status": "GROUPING"
                    };
                    dispatch(tarifKlaimSave(value))
                }
            } else if (stateTombol === '2' && newData.data[0].dataResponse.metadata) {
                toast.success(newData.data[0].dataResponse.metadata.message, { autoClose: 3000 });
                if (newData.data[0].dataResponse.metadata.message === 'Klaim sudah final' || newData.data[0].dataResponse.metadata.message === 'Ok') {
                    const value = {
                        "status_grouping": "FINAL_KLAIM",
                        "norec": stateTemp.norec
                    };
                    dispatch(statusKlaimSave(value))
                    setstateTombolGrouping(false)
                    setstateTombolFinal(false)
                }

            } else if (stateTombol === '3' && newData.data[0].dataResponse.metadata) {
                if (newData.data[0].dataResponse.metadata.message === 'Ok') {
                    const value = {
                        "status_grouping": "EDIT_KLAIM",
                        "norec": stateTemp.norec
                    };
                    dispatch(statusKlaimSave(value))
                    setstateTombolGrouping(true)
                    setstateTombolFinal(true)
                }

            } else if (stateTombol === '4' && newData.data[0].dataResponse.data) {
                let base64String = newData.data[0].dataResponse.data
                let decodedString = atob(base64String);
                // Convert the binary data to a Uint8Array
                let arrayBuffer = new ArrayBuffer(decodedString.length);
                let uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < decodedString.length; i++) {
                    uint8Array[i] = decodedString.charCodeAt(i);
                }
                // Create a Blob from the Uint8Array
                let blob = new Blob([uint8Array], { type: 'application/pdf' });
                // Generate a downloadable link for the Blob
                let downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = stateTemp.no_sep + '_klaim.pdf';

                // Trigger the download programmatically
                document.body.appendChild(downloadLink);
                downloadLink.click();

                // Clean up the temporary URL object
                URL.revokeObjectURL(downloadLink.href);

            } else if (stateTombol === '5' && newData.data[0].dataResponse.response) {
                if (newData.data[0].dataResponse.response !== undefined) {
                    let tempCmg = newData.data[0].dataResponse.response.special_cmg
                    for (let i = 0; i < tempCmg.length; i++) {
                        if (tempCmg[i].type === "Special Procedure") {
                            setstateTariffSpecialProcedure(tempCmg[i].tariff)
                            const value = {
                                "tarif": tempCmg[i].tariff,
                                "norec": stateTemp.norec,
                                "description": tempCmg[i].description
                            };
                            dispatch(tarifCmgOptionsSave(value))
                        }
                        if (tempCmg[i].type === "Special Prosthesis") {
                            setstateTariffSpecialProsthesis(tempCmg[i].tariff)
                            const value = {
                                "tarif": tempCmg[i].tariff,
                                "norec": stateTemp.norec,
                                "description": tempCmg[i].description
                            };
                            dispatch(tarifCmgOptionsSave(value))
                        }
                        if (tempCmg[i].type === "Special Investigation") {
                            setstateTariffSpecialInvestigation(tempCmg[i].tariff)
                            const value = {
                                "tarif": tempCmg[i].tariff,
                                "norec": stateTemp.norec,
                                "description": tempCmg[i].description
                            };
                            dispatch(tarifCmgOptionsSave(value))
                        }
                        if (tempCmg[i].type === "Special Drug") {
                            setstateTariffSpecialDrug(tempCmg[i].tariff)
                            const value = {
                                "tarif": tempCmg[i].tariff,
                                "norec": stateTemp.norec,
                                "description": tempCmg[i].description
                            };
                            dispatch(tarifCmgOptionsSave(value))
                        }
                    }
                }
            }

        }
    }, [newData, stateTombol, stateTemp, dispatch])
    const [count, setCount] = useState(1);

    const onClickCount = (temp) => {
        if (temp === 'min') {
            if (count > 0) {
                setCount(count - 1)
            }
        } else {
            setCount(count + 1)
        }

    }

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            specialProcedure: '',
            specialProthesis: '',
            specialInvestigation: '',
            specialDrug: '',
            codespecialProcedure: '',
            codespecialProthesis: '',
            codespecialInvestigation: '',
            codespecialDrug: '',
        },
        validationSchema: Yup.object({

        }),
        onSubmit: (values, { resetForm }) => {
            resetForm({ values: '' })
        }
    })
    useEffect(() => {
        const setFF = validation.setFieldValue
        setstateTariffSpecialProcedure(0)
        setstateTariffSpecialProsthesis(0)
        setstateTariffSpecialInvestigation(0)
        setstateTariffSpecialDrug(0)
        if (dataListCmg.dataProcedure !== undefined) {
            for (let i = 0; i < dataListCmg.dataProcedure.length; i++) {
                if (dataListCmg.dataProcedure[i].tarif > 0) {
                    setFF('specialProcedure', dataListCmg.dataProcedure[i].value)
                    setFF('codespecialProcedure', dataListCmg.dataProcedure[i].code)
                    setstateTariffSpecialProcedure(dataListCmg.dataProcedure[i].tarif)
                }
            }
            for (let i = 0; i < dataListCmg.dataProsthesis.length; i++) {
                if (dataListCmg.dataProsthesis[i].tarif > 0) {
                    setFF('specialProthesis', dataListCmg.dataProsthesis[i].value)
                    setFF('codespecialProthesis', dataListCmg.dataProsthesis[i].code)
                    setstateTariffSpecialProsthesis(dataListCmg.dataProsthesis[i].tarif)
                }
            }
            for (let i = 0; i < dataListCmg.dataInvestigation.length; i++) {
                if (dataListCmg.dataInvestigation[i].tarif > 0) {
                    setFF('specialInvestigation', dataListCmg.dataInvestigation[i].value)
                    setFF('codespecialInvestigation', dataListCmg.dataInvestigation[i].code)
                    setstateTariffSpecialInvestigation(dataListCmg.dataInvestigation[i].tarif)
                }
            }
            for (let i = 0; i < dataListCmg.dataDrug.length; i++) {
                if (dataListCmg.dataDrug[i].tarif > 0) {
                    setFF('specialDrug', dataListCmg.dataDrug[i].value)
                    setFF('codespecialDrug', dataListCmg.dataDrug[i].code)
                    setstateTariffSpecialDrug(dataListCmg.dataDrug[i].tarif)
                }
            }
        }
    }, [dataListCmg, validation.setFieldValue])
    const SpecialProcedure = (e) => {
        if (e.value === 'none') {
            // const value = {
            //     "tarif": 0,
            //     "norec": stateTemp.norec,
            //     "description":e.label
            // };
            // dispatch(tarifCmgOptionsSave(value))
            return
        }
        setstateTombol('5')
        validation.setFieldValue('specialProcedure', e.value)
        validation.setFieldValue('codespecialProcedure', e.code)
        grouperStage2(1, e.code)
    }
    const SpecialProsthesis = (e) => {
        if (e.value === 'none') {
            // const value = {
            //     "tarif": 0,
            //     "norec": stateTemp.norec,
            //     "description":e.label
            // };
            // dispatch(tarifCmgOptionsSave(value))
            return
        }
        setstateTombol('5')
        validation.setFieldValue('specialProthesis', e.value)
        validation.setFieldValue('codespecialProthesis', e.code)
        grouperStage2(2, e.code)
    }
    const SpecialInvestigation = (e) => {
        if (e.value === 'none') {
            // const value = {
            //     "tarif": 0,
            //     "norec": stateTemp.norec,
            //     "description":e.label
            // };
            // dispatch(tarifCmgOptionsSave(value))
            return
        }
        setstateTombol('5')
        validation.setFieldValue('specialInvestigation', e.value)
        validation.setFieldValue('codespecialInvestigation', e.code)
        grouperStage2(3, e.code)
    }
    const SpecialDrug = (e) => {
        if (e.value === 'none') {
            // const value = {
            //     "tarif": 0,
            //     "norec": stateTemp.norec,
            //     "description":e.label
            // };
            // dispatch(tarifCmgOptionsSave(value))
            return
        }
        setstateTombol('5')
        validation.setFieldValue('specialDrug', e.value)
        validation.setFieldValue('codespecialDrug', e.code)
        grouperStage2(4, e.code)
    }
    const grouperStage2 = (status, code) => {
        let tempData = []
        let tempCmg = ''
        console.log(code)
        if (status === 1) {
            tempCmg = code + '#'
        } else if (validation.values.codespecialProcedure !== undefined && validation.values.codespecialProcedure !== '') {
            tempCmg = validation.values.codespecialProcedure + '#'
        }

        if (status === 2) {
            tempCmg = tempCmg + code + '#'
        } else if (validation.values.codespecialProthesis !== undefined && validation.values.codespecialProthesis !== '') {
            tempCmg = tempCmg + validation.values.codespecialProthesis + '#'
        }

        if (status === 3) {
            tempCmg = tempCmg + code + '#'
        } else if (validation.values.codespecialInvestigation !== undefined && validation.values.codespecialInvestigation !== '') {
            tempCmg = tempCmg + validation.values.codespecialInvestigation + '#'
        }

        if (status === 4) {
            tempCmg = tempCmg + code + '#'
        } else if (validation.values.codespecialDrug !== undefined && validation.values.codespecialDrug !== '') {
            tempCmg = tempCmg + validation.values.codespecialDrug + '#'
        }
        const jsonTemp = {
            "metadata": {
                "method": "grouper",
                "stage": "2"
            },
            "data": {
                "nomor_sep": stateTemp.no_sep,
                "special_cmg": tempCmg
            }
        };
        tempData.push(jsonTemp)
        // console.log(tempData)
        dispatch(bridgingInacbgSave(tempData))
    }
    let stateTotal = parseFloat(stateTariff) + parseFloat(stateTariffSpecialProsthesis) +
        parseFloat(stateTariffSpecialProcedure) + parseFloat(stateTariffSpecialInvestigation) + parseFloat(stateTariffSpecialDrug);


    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModalCustom
                show={deleteModal}
                onDeleteClick={handleDeleteOrder}
                onCloseClick={() => setDeleteModal(false)}
                msgHDelete='Apa Kamu Yakin ?'
                msgBDelete='Yakin ingin menghapus data ini?'
            />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="KLAIM" pageTitle="Forms" />
                    <Row>
                        {statePencarian ? (
                            <>
                                <Col lg={10}>
                                    <Card style={{ backgroundColor: "#ffdd99", height: '70px' }}>
                                        <CardBody>
                                            <Row>
                                                <Col lg={3} md={3}>
                                                    <div className="mt-2">
                                                        <Label style={{ color: "black" }} htmlFor="state" className="form-label">Cari No. RM / No. SEP / Nama</Label>
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <div className="mt-1">
                                                        <div className="form-icon">
                                                            <Input className="form-control form-control-icon rounded-pill" id="iconInput"
                                                                type="text"
                                                                placeholder="Search..."
                                                                onChange={event => setSearch(event.target.value)}
                                                                onKeyDown={handleFilter} />
                                                            <i className="ri-search-2-line"></i>
                                                        </div>
                                                    </div>
                                                    {stateList ? (
                                                        <div className="live-preview">
                                                            <ListGroup>
                                                                {(dataPasien || []).map((item, key) => (<ListGroupItem tag="a" to="#" className="list-group-item-action" key={key}
                                                                    onClick={() => { clickList(item) }}>
                                                                    <div className="float-end">
                                                                        {item.nocm}
                                                                    </div>
                                                                    <div className="d-flex mb-2 align-items-center">
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h5 className="list-title fs-15 mb-1">{item.namapasien}</h5>
                                                                            <p className="list-text mb-0 fs-12">KARTU : {item.nobpjs}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="list-text mb-0">LAHIR :{item.tgllahir}</p>

                                                                </ListGroupItem>))}
                                                            </ListGroup>
                                                        </div>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3} md={3}>
                                                    <Link to="#" className="avatar-group-item" id="calendar">
                                                        <img src={calendar} alt="" className="rounded-circle avatar-sm" onClick={() => handleClickButton('registrasi')} />
                                                    </Link>
                                                </Col>

                                            </Row>

                                        </CardBody>
                                    </Card>

                                    {cardCari ? (
                                        <Card style={{ backgroundColor: "#ffdd99" }}>
                                            <CardBody>
                                                <Col lg={12}>
                                                    <Card style={{ height: '300px' }}>
                                                        <CardBody>
                                                            <Row>
                                                                <Col lg={12} style={{ textAlign: 'center' }}><span style={{ fontStyle: "italic", textAlign: 'center' }}>Pencarian klaim dengan kriteria:</span></Col>
                                                                <hr />
                                                                <Col lg={3} style={{ textAlign: 'right' }}><span>Jenis Rawat :</span></Col>
                                                                <Col lg={9} className="mb-2">
                                                                    <CustomSelect
                                                                        id="jenis_rawat"
                                                                        name="jenis_rawat"
                                                                        options={listJenisRawat}
                                                                    // onChange={handleChangeUnitTujuan}
                                                                    />
                                                                </Col>
                                                                <hr />
                                                                <Col lg={3} style={{ textAlign: 'right' }}><span>Periode :</span></Col>
                                                                <Col lg={2} className="mb-2">
                                                                    <CustomSelect
                                                                        id="periode"
                                                                        name="periode"
                                                                        options={listPeriode}
                                                                    // onChange={handleChangeUnitTujuan}
                                                                    />
                                                                </Col>
                                                                <Col lg={3} className="mb-2">
                                                                    <Flatpickr
                                                                        className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                                        options={{
                                                                            // mode: "range",
                                                                            dateFormat: "Y-m-d",
                                                                            defaultDate: "today"
                                                                        }}
                                                                        value={dateStart}
                                                                        onChange={([dateStart]) => {
                                                                            setDateStart((new Date(dateStart)).toISOString());
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={1} className="mt-2"><span>s/d</span></Col>
                                                                <Col lg={3} className="mb-2">
                                                                    <Flatpickr
                                                                        className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                                        options={{
                                                                            // mode: "range",
                                                                            dateFormat: "Y-m-d",
                                                                            defaultDate: "today"
                                                                        }}
                                                                        value={dateEnd}
                                                                        onChange={([dateEnd]) => {
                                                                            setDateEnd((new Date(dateEnd)).toISOString());
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <hr />
                                                                <Col lg={12} style={{ textAlign: 'right' }}>
                                                                    <Button type="button" color="info" className="rounded-pill" placement="top" >
                                                                        Cari
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </CardBody>
                                        </Card>
                                    ) : null}
                                </Col>
                                <Col lg={2}></Col>
                            </>
                        ) :
                            null
                        }
                        {stateListNoregistrasi ? (
                            <Card>
                                <CardHeader >
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={12} style={{ marginTop: '3px' }}>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">
                                                    <Button type='button' onClick={() => { back() }} color="light" className="btn-icon"> <i className="ri-arrow-go-back-line" /> </Button>{stateNocm} <span style={{ color: "#55aaee" }}>••</span> {stateNama} <span style={{ color: "#55aaee" }}>••</span> {stateJK}<span style={{ color: "#55aaee" }}>••</span> {stateTglLahir}
                                                </h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <div id="table-gridjs">
                                    <DataTable
                                        fixedHeader
                                        fixedHeaderScrollHeight="700px"
                                        columns={columns}
                                        pagination
                                        data={dataDaftarPasien}
                                        progressPending={loading}
                                        progressComponent={<LoadingTable />}
                                        customStyles={tableCustomStyles}
                                    />
                                </div>
                            </Card>
                        ) : null}
                        {stateCoder ? (
                            <Card>
                                <CardHeader >
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={12} style={{ marginTop: '3px' }}>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">
                                                    <Button type='button' onClick={() => { back2() }} color="light" className="btn-icon">
                                                        <i className="ri-arrow-go-back-line" /> </Button>{stateNocm} <span style={{ color: "#55aaee" }}>••</span>
                                                    {stateNama} <span style={{ color: "#55aaee" }}>••</span> {stateJK}<span style={{ color: "#55aaee" }}>••</span> {stateTglLahir}
                                                    <span style={{ color: "#55aaee" }}> /</span> {stateTemp.noregistrasi} <span style={{ color: "#55aaee" }}> /</span> {stateTemp.no_sep}
                                                </h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Row className="row g-4">
                                        <Col lg={3}>
                                            <div>
                                                <Label
                                                    htmlFor="job-title-Input"
                                                    className="form-label" style={{ fontStyle: "italic" }}
                                                >
                                                    Jaminan / Cara Bayar
                                                </Label>
                                                <Input
                                                    id="noidentitas"
                                                    name="noidentitas"
                                                    type="text"
                                                    placeholder="Masukkan no. identitas"
                                                    defaultValue='JKN'
                                                    disabled
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div>
                                                <Label
                                                    htmlFor="job-title-Input"
                                                    className="form-label"
                                                    style={{ fontStyle: "italic" }}
                                                >
                                                    No. Peserta
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="job-title-Input"
                                                    placeholder="0"
                                                    defaultValue={stateTemp.no_kartu}
                                                    disabled
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div>
                                                <Label
                                                    htmlFor="job-title-Input"
                                                    className="form-label" style={{ fontStyle: "italic" }}
                                                >
                                                    Nomor Surat Eligibilitas Peserta (SEP)
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="job-title-Input"
                                                    placeholder="0"
                                                    defaultValue={stateTemp.no_sep}
                                                    disabled
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div>
                                                <Label
                                                    htmlFor="job-title-Input"
                                                    className="form-label" style={{ fontStyle: "italic" }}
                                                >
                                                    COB
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="job-title-Input"
                                                    placeholder="0"
                                                    defaultValue='-'
                                                    disabled
                                                />
                                            </div>
                                        </Col>
                                        <hr style={{ border: '1px dashed' }} />
                                        <div className="table-responsive">
                                            <Table className="table-bordered align-middle table-nowrap mb-0 border-secondary">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>Jenis Rawat</th>
                                                        <td style={{ width: "50%" }}>
                                                            <Row>
                                                                {(widgetsTasksJenisRawat || []).map((data, key) =>
                                                                    <Col lg={3} md={6} key={key}>
                                                                        <div className="d-flex flex-row" >
                                                                            <Input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                id={`radio-payment-${key}`}
                                                                                checked={data.value}
                                                                                readOnly
                                                                            // onClick={e => {
                                                                            //     validation.setFieldValue('nontunai', data.value)
                                                                            // }}
                                                                            />
                                                                            <Label className="form-check-label ms-2"
                                                                                htmlFor={`radio-payment-${key}`}
                                                                                style={{ color: "black" }} >
                                                                                {data.label}
                                                                            </Label>
                                                                        </div>
                                                                    </Col>
                                                                )}

                                                            </Row>
                                                        </td>
                                                        <th scope="row" style={{ width: "10%" }}>Kelas Rawat</th>
                                                        <td style={{ width: "30%" }}>
                                                            <Row>
                                                                {(widgetsTasksKelasRawat || []).map((data, key) =>
                                                                    <Col lg={6} md={6} key={key}>
                                                                        <div className="d-flex flex-row" >
                                                                            <Input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                id={`radio-payment-${key}`}
                                                                                checked={data.value}
                                                                                readOnly
                                                                            // onClick={e => {
                                                                            //     validation.setFieldValue('nontunai', data.value)
                                                                            // }}
                                                                            />
                                                                            <Label className="form-check-label ms-2"
                                                                                htmlFor={`radio-payment-${key}`}
                                                                                style={{ color: "black" }} >
                                                                                {data.label}
                                                                            </Label>
                                                                        </div>
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>Tanggal Rawat</th>
                                                        <td style={{ width: "50%" }}>
                                                            <Row>
                                                                <Col lg={6} md={6}>
                                                                    <Row>
                                                                        <Col lg={6} md={6}>Masuk</Col>
                                                                        <Col lg={6} md={6}>{stateTemp.tglregistrasi}</Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col lg={6} md={6}>
                                                                    <Row>
                                                                        <Col lg={6} md={6}>Pulang</Col>
                                                                        <Col lg={6} md={6}>{stateTemp.tglpulang}</Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </td>
                                                        <th scope="row" style={{ width: "10%" }}>Umur</th>
                                                        <td style={{ width: "30%" }}>{stateTemp.umur.substring(1)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>Cara Masuk</th>
                                                        <td style={{ width: "90%" }} colSpan={3}>
                                                            {stateTemp.caramasuk}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>LOS (hari)</th>
                                                        <td style={{ width: "50%" }}>
                                                            {stateTemp.los}
                                                        </td>
                                                        <th scope="row" style={{ width: "10%" }}>Berat Lahir (gram)</th>
                                                        <td style={{ width: "30%" }}><Input style={{
                                                            textAlign: 'center',
                                                            backgroundColor: '#ffdd99'
                                                        }}
                                                            type="number"
                                                            className="form-control"
                                                            id="job-title-Input"
                                                            placeholder="gram"
                                                            defaultValue={stateTemp.bb}
                                                        /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>ADL Score</th>
                                                        <td style={{ width: "50%" }}>
                                                            <Row>
                                                                <Col lg={6} md={6}>
                                                                    <Row>
                                                                        <Col lg={6} md={6}>Sub Acute :</Col>
                                                                        <Col lg={6} md={6}>-</Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col lg={6} md={6}>
                                                                    <Row>
                                                                        <Col lg={6} md={6}>Chronic :</Col>
                                                                        <Col lg={6} md={6}>-</Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </td>
                                                        <th scope="row" style={{ width: "10%" }}>Cara Pulang</th>
                                                        <td style={{ width: "30%" }}>{stateTemp.labelcarapulang}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>DPJP</th>
                                                        <td style={{ width: "50%" }}>
                                                            {stateTemp.dpjp}
                                                        </td>
                                                        <th scope="row" style={{ width: "10%" }}>Jenis Tarif</th>
                                                        <td style={{ width: "30%" }}>{stateTemp.nama_tarif}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>Pasien TB</th>
                                                        <td style={{ width: "50%" }} colSpan={3}>
                                                            -
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "100%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }} colSpan={4}><span style={{ fontStyle: "italic" }}>Tarif Rumah Sakit</span> : Rp {dataTarifPasien.total_tagihan?.toLocaleString("id-ID") || ""}</th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Table className="table-bordered align-middle table-nowrap mb-0 border-secondary">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }}>
                                                            Prosedur Non Bedah
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.prosedur_non_bedah?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'right', borderRight: '0px' }}>
                                                            Prosedur Bedah
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.prosedur_bedah?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderRight: '0px' }}>
                                                            Konsultasi
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.konsultasi?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }}>
                                                            Tenaga Ahli
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.tenaga_ahli?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'right', borderRight: '0px' }}>
                                                            Keperawatan
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.keperawatan?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderRight: '0px' }}>
                                                            Penunjang
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.penunjang?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }}>
                                                            Radiologi
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.radiologi?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'right', borderRight: '0px' }}>
                                                            Laboratorium
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.laboratorium?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderRight: '0px' }}>
                                                            Pelayanan Darah
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.pelayanan_darah?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }}>
                                                            Rehabilitasi
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.rehabilitasi?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'right', borderRight: '0px' }}>
                                                            Kamar / Akomodasi
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.akomodasi?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderRight: '0px' }}>
                                                            Rawat Intensif
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.rawat_intensif?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }}>
                                                            Obat
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.obat?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'right', borderRight: '0px' }}>
                                                            Obat Kronis
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.obat_kronis?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderRight: '0px' }}>
                                                            Obat Kemoterapi
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.obat_kemoterapi?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }}>
                                                            Alkes
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.alkes?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'right', borderRight: '0px' }}>
                                                            BMHP
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.bmhp?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'right', borderRight: '0px' }}>
                                                            Sewa Alat
                                                        </th>
                                                        <th scope="row" style={{ width: "16%", textAlign: 'left', borderLeft: '0px', borderRight: '0px' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={dataTarifPasien.sewa_alat?.toLocaleString("id-ID") || ""}
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6} style={{ paddingTop: '2em', textAlign: 'center', fontStyle: 'italic', color: '#888', borderLeft: '0px', borderRight: '0px' }}>
                                                            <input type="checkbox" disabled="1" checked="1" value="1"></input> Menyatakan benar bahwa data tarif yang tersebut di atas adalah benar sesuai dengan kondisi yang sesungguhnya.</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <Nav className="nav-tabs nav-tabs-custom" role="tablist">
                                            <NavItem>
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: activeTab === '1' })}
                                                >Coding UNU Grouper
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <Card>
                                            <CardBody>
                                                <TabContent activeTab={activeTab} className="text-muted">
                                                    <TabPane tabId="1">
                                                        <Row className="row g-4">
                                                            <Col lg={9} style={{ textAlign: 'left' }}><h5>Diagnosa (ICD-10):</h5></Col>
                                                            <Col lg={3} style={{ textAlign: 'right', }}>
                                                                <div className="form-icon">
                                                                    <CustomSelect
                                                                        id="kodediagnosa"
                                                                        name="kodediagnosa"
                                                                        options={dataDiagnosa}
                                                                        onChange={value => handleDiagnosaSave(value.value)}
                                                                        onInputChange={handleDiagnosa}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <DataTable
                                                                    columns={columnsDiagnosa10}
                                                                    data={dataRiwayatD10}
                                                                    pagination
                                                                    progressPending={loadingRiwayatD10}
                                                                />
                                                            </Col>
                                                            <Col lg={6} style={{ textAlign: 'left' }}><h5>Diagnosa (ICD-9):</h5></Col>
                                                            <Col lg={3} style={{ textAlign: 'right', }}>
                                                                <div className="form-icon">
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
                                                            <Col lg={3} style={{ textAlign: 'right', }}>
                                                                <div className="form-icon">
                                                                    <CustomSelect
                                                                        id="kodediagnosa9"
                                                                        name="kodediagnosa9"
                                                                        options={dataDiagnosaix}
                                                                        onChange={value => handleDiagnosaixSave(value.value)}
                                                                        onInputChange={handleDiagnosaix}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <DataTable
                                                                    columns={columnsDiagnosa9}
                                                                    data={dataRiwayatD9}
                                                                    pagination
                                                                    progressPending={loadingRiwayatD9}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </TabPane>
                                                </TabContent>
                                            </CardBody>
                                        </Card>
                                        <div className="table-responsive">
                                            <Table className="align-middle table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{ textAlign: 'center' }} colSpan={4}>Data Klinis</th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col" style={{ textAlign: 'center' }} colSpan={4}>
                                                            <span style={{ fontStyle: 'italic', color: '#888' }}>Tekanan Darah (mmHg)</span>:
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" style={{ width: "30%" }}>

                                                        </th>
                                                        <th scope="row" style={{ width: "20%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={stateTemp.sistole}
                                                                disabled
                                                            />
                                                            Sistole
                                                        </th>
                                                        <th scope="row" style={{ width: "20%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue={stateTemp.diastole}
                                                                disabled
                                                            />
                                                            Diastole
                                                        </th>
                                                        <th scope="row" style={{ width: "30%" }}>

                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                        {/* <div className="table-responsive">
                                            <Table className="align-middle table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{ textAlign: 'center' }} colSpan={4}>APGAR Score</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>
                                                            1 Menit
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>
                                                            5 Menit
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <Input style={{ textAlign: 'center' }}
                                                                type="text"
                                                                className="form-control"
                                                                id="job-title-Input"
                                                                placeholder="0"
                                                                defaultValue='0'
                                                                disabled
                                                            />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" style={{ width: "10%" }}>

                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <span style={{ fontStyle: 'italic', color: '#888' }}>appear</span>
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <span style={{ fontStyle: 'italic', color: '#888' }}>pulse</span>
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <span style={{ fontStyle: 'italic', color: '#888' }}>grimace</span>
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <span style={{ fontStyle: 'italic', color: '#888' }}>activity</span>
                                                        </th>
                                                        <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                            <span style={{ fontStyle: 'italic', color: '#888' }}>resp</span>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div> */}
                                        {stateTombolGrouping ? (
                                            <Col xxl={12} sm={12}>
                                                <Button type="button" style={{ backgroundColor: '#192a56' }} className="rounded-pill" placement="top" onClick={handleClickGrouping}>
                                                    GROUPING
                                                </Button>
                                            </Col>
                                        ) : null}

                                        {stateHasilGrouping ? (
                                            <>
                                                <Table className="table-bordered align-middle table-nowrap mb-0 border-secondary"
                                                    style={{ backgroundColor: '#ccddcc' }}>
                                                    <thead className="table-light" >
                                                        <tr>
                                                            <th scope="col" style={{ backgroundColor: '#dddddd', textAlign: 'center' }} colSpan={4}>Hasil Grouper E-Klaim v5</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Info</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }} colSpan={3}>
                                                                <span>TARIF RS KELAS D PEMERINTAH</span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Jenis Rawat</span>
                                                            </th>

                                                            {stateRJ ? (
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }} colSpan={3}>
                                                                    <span>Rawat Jalan Regular</span>
                                                                </th>
                                                            ) :
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }} colSpan={3}>
                                                                    <span>Rawat Jalan Inap</span>
                                                                </th>
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Group</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>{stateDescriptionCbg}</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>{stateCodeCbg}</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Rp {stateTariff?.toLocaleString("id-ID") || ""}</span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Special Procedure</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}>
                                                                <CustomSelect
                                                                    id="specialProcedure"
                                                                    name="specialProcedure"
                                                                    options={dataListCmg.dataProcedure}
                                                                    value={validation.values.specialProcedure || ""}
                                                                    onChange={value => SpecialProcedure(value)}

                                                                />
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}></th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Rp {stateTariffSpecialProcedure?.toLocaleString("id-ID") || ""}</span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Special Prosthesis</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}>
                                                                <CustomSelect
                                                                    id="specialProthesis"
                                                                    name="specialProthesis"
                                                                    options={dataListCmg.dataProsthesis}
                                                                    value={validation.values.specialProthesis || ""}
                                                                    onChange={value => SpecialProsthesis(value)}
                                                                />
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}></th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Rp {stateTariffSpecialProsthesis?.toLocaleString("id-ID") || ""}</span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Special Investigation</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}>
                                                                <CustomSelect
                                                                    id="specialInvestigation"
                                                                    name="specialInvestigation"
                                                                    options={dataListCmg.dataInvestigation}
                                                                    value={validation.values.specialInvestigation || ""}
                                                                    onChange={value => SpecialInvestigation(value)}
                                                                />
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}></th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Rp {stateTariffSpecialInvestigation?.toLocaleString("id-ID") || ""}</span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Special Drug</span>
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}>
                                                                <CustomSelect
                                                                    id="specialDrug"
                                                                    name="specialDrug"
                                                                    options={dataListCmg.dataDrug}
                                                                    value={validation.values.specialDrug || ""}
                                                                    onChange={value => SpecialDrug(value)}
                                                                />
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center', borderLeft: '0px', borderRight: '0px' }}></th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Rp {stateTariffSpecialDrug?.toLocaleString("id-ID") || ""}</span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'right', borderLeft: '0px', borderRight: '0px' }} colSpan={3}>
                                                                Total
                                                            </th>
                                                            <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                <span>Rp {stateTotal?.toLocaleString("id-ID") || ""}</span>
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                {stateHasilGroupingV6 ? (
                                                    <Table className="table-bordered align-middle table-nowrap mb-0 border-secondary"
                                                        style={{ backgroundColor: '#ccddcc' }}>
                                                        <thead className="table-light" >
                                                            <tr>
                                                                <th scope="col" style={{ backgroundColor: '#dddddd', textAlign: 'center' }} colSpan={3}>Hasil Grouper E-Klaim v6</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>Info</span>
                                                                </th>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }} colSpan={2}>
                                                                    <span>TARIF RS KELAS D PEMERINTAH</span>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>Jenis Rawat</span>
                                                                </th>
                                                                {stateRJ ? (
                                                                    <th scope="row" style={{ width: "18%", textAlign: 'center' }} colSpan={2}>
                                                                        <span>Rawat Jalan Regular</span>
                                                                    </th>
                                                                ) :
                                                                    <th scope="row" style={{ width: "18%", textAlign: 'center' }} colSpan={2}>
                                                                        <span>Rawat Inap</span>
                                                                    </th>
                                                                }

                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>MDC</span>
                                                                </th>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>{stateMDC}</span>
                                                                </th>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>{stateMDCCode}</span>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>DRG</span>
                                                                </th>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>{stateDRG}</span>
                                                                </th>
                                                                <th scope="row" style={{ width: "18%", textAlign: 'center' }}>
                                                                    <span>{stateDRGCode}</span>
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                ) : null}
                                                {stateTombolGrouping ? (
                                                    <Col xxl={12} sm={12}>
                                                        <Button type="button" style={{ backgroundColor: '#192a56' }} className="rounded-pill" placement="top" onClick={handleClickFinal}>
                                                            Final Klaim
                                                        </Button>
                                                    </Col>
                                                ) :
                                                    <Row className="row g-2">
                                                        <Col lg={3} sm={3}>
                                                            <Button type="button" color='danger' className="rounded-pill" placement="top" onClick={handleClickEditKlaim}>
                                                                Edit Klaim
                                                            </Button>
                                                        </Col>
                                                        <Col lg={3} sm={3}>
                                                            <Button type="button" style={{ backgroundColor: '#192a56' }} className="rounded-pill" placement="top" onClick={handleClickPrintFinal}>
                                                                Print Klaim
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                }
                                            </>
                                        ) : null}
                                    </Row>
                                </CardBody>
                            </Card>
                        ) : null}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (KlaimInacbg)