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
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import withRouter from '../../../Components/Common/withRouter';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../Select/Select';
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';
import {
    comboLaporanRekammedisGet, kendaliDokumenResetForm, listPasienMutasiGet
} from '../../../store/actions';
import "./DaftarPasienMutasi.scss"
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';


const DaftarPasienMutasi = () => {
    document.title = "Daftar Pasien Rawat Jalan";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error, dataGrid, loadingGrid } = useSelector((state) => ({
        data: state.KendaliDokumen.comboLaporanRekammedisGet.data,
        loading: state.KendaliDokumen.comboLaporanRekammedisGet.loading,
        error: state.KendaliDokumen.comboLaporanRekammedisGet.error,
        dataGrid: state.DaftarPasien.listPasienMutasiGet.data,
        loadingGrid: state.DaftarPasien.listPasienMutasiGet.loading,
    }));
    const [dateStart] = useState(() => (new Date()).toISOString())
    const [dateEnd] = useState(() => (new Date()).toISOString())

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            tglstart: dateStart,
            tglend: dateEnd,
            departemen: '',
            unit: '',
            rekanan: '',
            pegawai: ''
        },
        validationSchema: Yup.object({
            // dokterlab: Yup.string().required("Dokter Lab wajib diisi"),


        }),
        onSubmit: (values, { resetForm }) => {

        }
    })
    useEffect(() => {
        return () => {
            dispatch(kendaliDokumenResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(comboLaporanRekammedisGet(''));

    }, [dispatch]);
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            // console.log(search)
            dispatch(listPasienMutasiGet(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}&instalasi=${validation.values.departemen}&unit=${validation.values.unit}&rekanan=${validation.values.rekanan}&pegawai=${validation.values.pegawai}`));
        }
    }
    const handleClickCari = () => {
        dispatch(listPasienMutasiGet(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}&instalasi=${validation.values.departemen}&unit=${validation.values.unit}&rekanan=${validation.values.rekanan}&pegawai=${validation.values.pegawai}`));
    }
   
    const handleToRegistrasi = async (e) => {
        history(`/registrasi/mutasi-pasien/${e.nocmfk}/${e.norec}`);
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (row) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledTooltip placement="top" target="tooltipTopMutasi" > Mutasi Registrasi </UncontrolledTooltip>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTopMutasi">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={() => handleToRegistrasi(row)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Mutasi Registrasi</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                );
            },
            width: "70px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocm,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            // width: "140px",
            // cell: (data) => {
            //     return (
            //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
            //         <button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{data.noregistrasi}</button>
            //     );
            // },
        },
        {

            name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Tujuan</span>,
            selector: row => row.namaunit,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Instalasi</span>,
            selector: row => row.namainstalasi,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Tgl Pulang</span>,
            selector: row => row.tglpulang,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Petugas Registrasi</span>,
            selector: row => row.namalengkap,
            sortable: true,
            // width: "150px"
        },
    ];
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content daftar-pasien-mutasi">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Mutasi" pageTitle="Forms" />
                    <Card>
                        <CardBody>
                        <div className='mb-2 row-header'>
                                <Row>
                                    <Col sm={3}>
                                        <KontainerFlatpickr
                                            id="tglstart"
                                            options={{
                                                enableTime: true,
                                                // mode: "range",
                                                dateFormat: "Y-m-d",
                                                defaultDate: "today"
                                            }}
                                            value={validation.values.tglstart}
                                            onChange={([newDate]) => {
                                                validation.setFieldValue("tglstart", newDate.toISOString());
                                            }}
                                        />
                                    </Col>
                                    <Col lg={1}><h4>s/d</h4></Col>
                                    <Col sm={3}>
                                        <KontainerFlatpickr
                                            id="tglend"
                                            options={{
                                                enableTime: true,
                                                // mode: "range",
                                                dateFormat: "Y-m-d",
                                                defaultDate: "today"
                                            }}
                                            value={validation.values.tglend}
                                            onChange={([newDate]) => {
                                                validation.setFieldValue("tglend", newDate.toISOString());
                                            }}
                                        />
                                    </Col>
                                    <Col lg={3}>
                                        <div className="d-flex justify-content-sm-end">
                                            <div className="search-box ms-2">
                                                <input type="text" className="form-control search"
                                                    placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                    onKeyDown={handleFilter} />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={2}>
                                        <Button color='info' type="button" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                            CARI
                                        </Button>
                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                    </Col>
                                    <Col lg={3}>
                                        <Col lg={12}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Unit</Label>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div>
                                                <CustomSelect
                                                    id="unit"
                                                    name="unit"
                                                    options={data.unit}
                                                    value={validation.values.unit || ""}
                                                    className={`input ${validation.errors.unit ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('unit', value.value)}
                                                    invalid={
                                                        validation.touched.unit && validation.errors.unit ? true : false
                                                    }
                                                />
                                                {validation.touched.unit && validation.errors.unit ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.unit}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>
                            <div id="table-gridjs">
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="330px"
                                    columns={columns}
                                    pagination
                                    data={dataGrid}
                                    progressPending={loadingGrid}
                                    customStyles={tableCustomStyles}
                                    progressComponent={<LoadingTable />}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(DaftarPasienMutasi)