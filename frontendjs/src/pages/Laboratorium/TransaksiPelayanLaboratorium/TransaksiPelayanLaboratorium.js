import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import EmrHeader from '../../Emr/EmrHeader/EmrHeader';
import DataTable from 'react-data-table-component';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {
    listPelayananLaboratoriumGet, laboratoriumResetForm, saveSetTNilaiNormalLab
} from '../../../store/actions';
import classnames from "classnames";
import { useFormik } from 'formik';
import LoadingTable from '../../../Components/Table/LoadingTable';
import PrintTemplate from '../../Print/PrintTemplate/PrintTemplate';
import PrintHasilLaboratorium from '../../Print/PrintHasilLaboratorium/PrintHasilLaboratorium';
import CetakLabModal from '../../../Components/Common/CetakLabModal';
import InputTindakan from '../../Emr/InputTindakan/InputTindakan';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const TransaksiPelayanLaboratorium = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    document.title = "Transaksi Pelayan Laboratorium";
    const { dataPelayanan, loadingPelayanan, successPelayanan } = useSelector((state) => ({
        dataPelayanan: state.Laboratorium.listPelayananLaboratoriumGet.data || [],
        loadingPelayanan: state.Laboratorium.listPelayananLaboratoriumGet.loading,
        successPelayanan: state.Laboratorium.listPelayananLaboratoriumGet.success,
        newDataSave: state.Laboratorium.saveSetTNilaiNormalLab.newData,
        successSave: state.Laboratorium.saveSetTNilaiNormalLab.success,
        loadingSave: state.Laboratorium.saveSetTNilaiNormalLab.loading,
    }));
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            pelayananproses: []
        },
        onSubmit: (value) => {

        }
    });
    useEffect(() => {
        const setFF = validation.setFieldValue
        if ((dataPelayanan || []).length !== 0) {
            setFF("pelayananproses", dataPelayanan)
            const withChecked = dataPelayanan.map((pelayanan) => {
                return {
                    ...pelayanan,
                    checked: false
                }
            })
            setListPelayananChecked(withChecked)
        }
    }, [dataPelayanan, validation.setFieldValue])
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(listPelayananLaboratoriumGet(norecdp));
    }, [norecdp, dispatch]);
    
    const [listPelayananChecked, setListPelayananChecked] = useState([])
    const handleChecked = (checked, norec) => {
        const newListPC = [...listPelayananChecked]
        const index = newListPC.findIndex((item) => item.norec === norec)
        const newItem = { ...newListPC[index] }
        newItem.checked = !checked
        newListPC[index] = newItem
        setListPelayananChecked(newListPC)
        // console.log(listPelayananChecked)
    }

    const isCheckedAll = listPelayananChecked?.every((item) => item.checked)
    const handleCheckedAll = () => {
        if (dataPelayanan === null) return
        const withChecked = dataPelayanan.map((pelayanan) => {
            return {
                ...pelayanan,
                checked: !pelayanan.norec && !isCheckedAll
            }
        })
        setListPelayananChecked(withChecked)
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>
                {/* <Input 
                    className="form-check-input" 
                    type="checkbox" 
                    id={`formcheck-all`} 
                    checked={isCheckedAll} 
                    onChange={e => {handleCheckedAll(isCheckedAll)}}/> */}
            </span>,
            sortable: false,
            cell: (row) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <Input
                            className="form-check-input"
                            type="checkbox"
                            id={`formcheck-${row.norec}`}
                            checked={row.checked}
                            onChange={e => { handleChecked(row.checked, row.norec) }} />
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <Link to='#' className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
                );
            },
            width: "80px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Pelayanan</span>,
            selector: row => row.tglinput,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
            selector: row => row.namaproduk,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Dokter Pengirim</span>,
            selector: row => row.pegawaipengirim,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Pengirim</span>,
            selector: row => row.unitpengirim,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Dokter Laboratorium</span>,
            selector: row => '',
            sortable: true,
            width: "150px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Tgl Perjanjian</span>,
            selector: row => row.tglperjanjian,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>No Order</span>,
            selector: row => row.nomororder,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>No Photo</span>,
            selector: row => '',
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Status Cito</span>,
            selector: row => row.statuscito,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.total,
            sortable: true,
            // width: "250px",
        },
    ];
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    const taskWidgets = [
        {
            id: 1,
            label: "Transaksi Pelayanan",
        },
        {
            id: 2,
            label: "Tindakan",
        },

    ];

    const handleInputChangeHasil = (data, id, nama, value, nodata) => {
        let newData = [...data]

        for (let i = 0; i < newData.length; i++) {
            if (newData[i].idnilainormallab === id) {
                if (nama === 'nilaihasil') {
                    newData[i].nilaihasil = value
                } else if (nama === 'keterangan') {
                    newData[i].keterangan = value
                }

            }
        }

        let newDataPelayanan = [...validation.values.pelayananproses]

        const indexChange = newDataPelayanan.findIndex((newDataPel) => newDataPel === nodata)
        if (indexChange >= 0) {
            newDataPelayanan[indexChange] = newData

        }

        validation.setFieldValue("pelayananproses", newDataPelayanan)
    };
    const refPrintHasilLab = useRef(null);
    const [tempNorecPel, settempNorecPel] = useState("");
    const handlePrint = () => {
        // refPrintHasilLab.current?.handlePrint();
        let temp = []
        for (let i = 0; i < listPelayananChecked.length; i++) {
            if (listPelayananChecked[i].checked === true) {
                temp.push(listPelayananChecked[i].norec)
                // if (temp === ``)
                //     temp = `'${listPelayananChecked[i].norec}'`
                // else
                //     temp = temp + `,'${listPelayananChecked[i].norec}'`
            }
        }
        settempNorecPel(temp)
        setshowCetakModal(true)
    }
    const [showCetakModal, setshowCetakModal] = useState(false);

    return (
        <React.Fragment>
            <CetakLabModal
                show={showCetakModal}
                norecdp={norecdp}
                norecap={norecap}
                onCloseClick={() => setshowCetakModal(false)}
                tempNorecPel={tempNorecPel} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Transaksi Pelayanan Laboratorium" pageTitle="Forms" />
                    <Row>
                        <Col xxl={12}>
                            <EmrHeader />
                        </Col>
                        <Col ccl={12}>
                            <Card>
                                <CardBody>
                                    <div className="card-header align-items-center d-flex">
                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            {taskWidgets.map((item, key) => (
                                                <NavItem key={key}>
                                                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === `${item.id}`, })} onClick={() => { pillsToggle(`${item.id}`); }}>
                                                        <span className="fw-semibold">{item.label}</span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                    </div>
                                    <TabContent activeTab={pillsTab} className="text-muted">
                                        <TabPane tabId="1" id="home-1">
                                            <Card>
                                                <CardBody>
                                                    <Col lg={3} style={{ textAlign: 'left' }}>
                                                        <Button type="button" style={{ backgroundColor: '#192a56', textAlign: 'right' }} placement="top"
                                                            onClick={handlePrint}
                                                        >
                                                            Cetak
                                                        </Button>
                                                    </Col>
                                                    <div id="table-gridjs">
                                                        <DataTable
                                                            fixedHeader
                                                            fixedHeaderScrollHeight="700px"
                                                            columns={columns}
                                                            pagination
                                                            data={validation.values.pelayananproses}
                                                            progressPending={loadingPelayanan}
                                                            customStyles={tableCustomStyles}
                                                            expandableRows
                                                            expandableRowsComponent={({ ...rest }) =>
                                                                <ExpandableNilaiNormal
                                                                    handleInputChangeHasil={handleInputChangeHasil}
                                                                    {...rest}
                                                                />
                                                            }
                                                            progressComponent={<LoadingTable />}
                                                        />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="2" id="home-1">
                                            <Card>
                                                <CardBody>
                                                    <InputTindakan />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* <PrintTemplate
                ContentPrint={<PrintHasilLaboratorium
                // dataRekap={dataTagihanPrint?.billing || []}
                // dataPasien={dataPasienReg || null}
                />

                }
                ref={refPrintHasilLab}
            /> */}
        </React.Fragment>
    )
}




const ExpandableNilaiNormal = ({ data, handleInputChangeHasil }) => {
    const dispatch = useDispatch();
    const handleClickSave = (e) => {
        let tempValue = {
            data: e
        }
        dispatch(saveSetTNilaiNormalLab(tempValue));
    };
    const [tempVal, setTempValue] = useState({
        index: -1,
        value: "",
    })
    const [tempValKet, setTempValueKet] = useState({
        index: -1,
        value: "",
    })
    if (data.listnilainormal.length === 0) {
        return <></>
    }
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th style={{ width: '50px' }} scope="col">Detail Pemeriksaan</th>
                    <th style={{ width: '100px' }} scope="col">Hasil Pemeriksaan</th>
                    <th style={{ width: '50px' }} scope="col">Nilai Normal</th>
                    <th style={{ width: '50px' }} scope="col">Satuan Hasil</th>
                    <th style={{ width: '50px' }} scope="col">Metode</th>
                    <th style={{ width: '100px' }} scope="col">Keterangan</th>
                </tr>
            </thead>
            <tbody>

                {data.listnilainormal.map((item, key) =>
                    <tr key={key}>
                        {/* <th scope="row">{key + 1}</th> */}
                        <td>{item.reportdisplay}</td>
                        <td>
                            <input
                                type="text"
                                name="nilaihasil"
                                value={key === tempVal.index ? tempVal.value : item.nilaihasil}
                                placeholder="Nilai Hasil"
                                className="form-control"
                                onFocus={(e) => setTempValue({
                                    index: key,
                                    value: e.target.value
                                })}
                                onBlur={(e) => handleInputChangeHasil(
                                    data.listnilainormal,
                                    item.idnilainormallab,
                                    'nilaihasil',
                                    e.target.value,
                                    data.no,
                                )}
                                // disabled={row.statusDisable}
                                onChange={(e) => {
                                    key === tempVal.index &&
                                        setTempValue({
                                            index: tempVal.index,
                                            value: e.target.value
                                        })
                                }}
                            />
                        </td>
                        <td>{item.nilaitext}</td>
                        <td>{item.satuan}</td>
                        <td>{item.metodepemeriksaan}</td>
                        <td>
                            <input
                                type="text"
                                name="keterangan"
                                value={key === tempValKet.index ? tempValKet.value : item.keterangan}
                                placeholder="Keterangan"
                                className="form-control"
                                onFocus={(e) => setTempValueKet({
                                    index: key,
                                    value: e.target.value
                                })}
                                onBlur={(e) => handleInputChangeHasil(
                                    data.listnilainormal,
                                    item.idnilainormallab,
                                    'keterangan',
                                    e.target.value,
                                    data.no,
                                )}
                                // disabled={row.statusDisable}
                                onChange={(e) => {
                                    key === tempValKet.index &&
                                        setTempValueKet({
                                            index: tempValKet.index,
                                            value: e.target.value
                                        })
                                }}
                            />
                        </td>
                        {/* <td>{item.nominal?.toLocaleString("id-ID") || ""}</td>
                    <td>{item.nobukti}</td> */}
                    </tr>
                )}
                <tr>
                    <td style={{ textAlign: 'center' }} colSpan={6}>
                        <Button type="button" style={{ backgroundColor: '#192a56', textAlign: 'right' }} placement="top"
                            onClick={() => handleClickSave(data.listnilainormal)}>
                            Simpan
                        </Button>
                        <Button type="button" style={{ backgroundColor: 'red', textAlign: 'right' }} placement="top">
                            Batal
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}


export default withRouter(TransaksiPelayanLaboratorium);