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
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import UiContent from '../../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../../Select/Select';
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../../Components/Table/LoadingTable';
import {
    comboLaporanRekammedisGet, kendaliDokumenResetForm, listLaporanPasienKunjunganGet
} from '../../../../store/actions';
import "./LaporanPasienKunjungan.scss"
import * as XLSX from 'xlsx';
import { tableCustomStyles } from '../../../../Components/Table/tableCustomStyles';
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr';

const currentDate = new Date();
currentDate.setDate(currentDate.getDate());
currentDate.setHours(0, 0, 0, 0);

const dateAwalStart = currentDate.toISOString();
const dateAwalEnd = (new Date()).toISOString()

const LaporanPasienKunjungan = () => {
    document.title = "Laporan Pasien Kunjungan";
    const dispatch = useDispatch();
    const { data, loading, error, dataGrid, loadingGrid } = useSelector((state) => ({
        data: state.KendaliDokumen.comboLaporanRekammedisGet.data,
        loading: state.KendaliDokumen.comboLaporanRekammedisGet.loading,
        error: state.KendaliDokumen.comboLaporanRekammedisGet.error,
        dataGrid: state.KendaliDokumen.listLaporanPasienKunjunganGet.data,
        loadingGrid: state.KendaliDokumen.listLaporanPasienKunjunganGet.loading,
    }));
    const [dateStart, setdateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
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
            dispatch(listLaporanPasienKunjunganGet(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}&instalasi=${validation.values.departemen}&unit=${validation.values.unit}&rekanan=${validation.values.rekanan}&pegawai=${validation.values.pegawai}`));
        }
    }
    const handleClickCari = () => {
        dispatch(listLaporanPasienKunjunganGet(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}&instalasi=${validation.values.departemen}&unit=${validation.values.unit}&rekanan=${validation.values.rekanan}&pegawai=${validation.values.pegawai}`));
    }
    
    const columns = [
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
    const handleExport = () => {
        const formattedData = dataGrid.map(row => columns.map(col => col.selector(row)));
        const header = columns.map(col => col.name.props.children);
        const sheetData = [header, ...formattedData];
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'laporan_pasien_kunjungan.xlsx');
    };
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content laporan-pasien-kunjungan">
                <Container fluid>
                    <BreadCrumb title="Laporan Pasien Kunjungan" pageTitle="Forms" />
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
                                        <Button type="button" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                            CARI
                                        </Button>
                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                    </Col>
                                    <Col lg={3}>
                                        <Col lg={12}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Instalasi</Label>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div>
                                                <CustomSelect
                                                    id="departemen"
                                                    name="departemen"
                                                    options={data.departemen}
                                                    value={validation.values.departemen || ""}
                                                    className={`input ${validation.errors.departemen ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('departemen', value.value)}
                                                    invalid={
                                                        validation.touched.departemen && validation.errors.departemen ? true : false
                                                    }
                                                />
                                                {validation.touched.departemen && validation.errors.departemen ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.departemen}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
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
                                    <Col lg={3}>
                                        <Col lg={12}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Rekanan</Label>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div>
                                                <CustomSelect
                                                    id="rekanan"
                                                    name="rekanan"
                                                    options={data.rekanan}
                                                    value={validation.values.rekanan || ""}
                                                    className={`input ${validation.errors.rekanan ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('rekanan', value.value)}
                                                    invalid={
                                                        validation.touched.rekanan && validation.errors.rekanan ? true : false
                                                    }
                                                />
                                                {validation.touched.rekanan && validation.errors.rekanan ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.rekanan}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Col>
                                    <Col lg={3}>
                                        <Col lg={12}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Pegawai Registrasi</Label>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div>
                                                <CustomSelect
                                                    id="pegawai"
                                                    name="pegawai"
                                                    options={data.pegawai}
                                                    value={validation.values.pegawai || ""}
                                                    className={`input ${validation.errors.pegawai ? "is-invalid" : ""}`}
                                                    onChange={value => validation.setFieldValue('pegawai', value.value)}
                                                    invalid={
                                                        validation.touched.pegawai && validation.errors.pegawai ? true : false
                                                    }
                                                />
                                                {validation.touched.pegawai && validation.errors.pegawai ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.pegawai}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>
                            <Button type="button" placement="top" id="tooltipTopPencarian" onClick={handleExport}>
                                Export to Excel
                            </Button>
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

export default (LaporanPasienKunjungan)