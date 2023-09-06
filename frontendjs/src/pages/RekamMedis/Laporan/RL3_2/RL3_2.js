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
    laporanRL_3_1_Get
} from '../../../../store/actions';
import "./RL3_2.scss"
import * as XLSX from 'xlsx';
import { Grid, _ } from 'gridjs-react';

const currentDate = new Date();
currentDate.setDate(currentDate.getDate());
currentDate.setHours(0, 0, 0, 0);

const dateAwalStart = currentDate.toISOString();
const dateAwalEnd = (new Date()).toISOString()

const RL3_2 = () => {
    document.title = "Laporan RL3.2";
    const dispatch = useDispatch();
    const { data, loading, error, dataGrid, loadingGrid } = useSelector((state) => ({
        // data: state.KendaliDokumen.comboLaporanRekammedisGet.data,
        // loading: state.KendaliDokumen.comboLaporanRekammedisGet.loading,
        // error: state.KendaliDokumen.comboLaporanRekammedisGet.error,
        dataGrid: state.KendaliDokumen.laporanRL_3_1_Get.data,
        loadingGrid: state.KendaliDokumen.laporanRL_3_1_Get.loading,
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
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            
            dispatch(laporanRL_3_1_Get({
                search: search,
                start: validation.values.tglstart,
                end: validation.values.tglend,
                instalasi: validation.values.departemen,
                unit: validation.values.unit,
                rekanan: validation.values.rekanan,
                pegawai: validation.values.pegawai
            }));
        }
    }
    const handleClickCari = () => {
        dispatch(laporanRL_3_1_Get({
            search: search,
            start: validation.values.tglstart,
            end: validation.values.tglend,
            instalasi: validation.values.departemen,
            unit: validation.values.unit,
            rekanan: validation.values.rekanan,
            pegawai: validation.values.pegawai
        }));
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
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.row,
            sortable: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Jenis Pelayanan</span>,
            selector: row => row.jenis_spesialisasi,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien Awal Tahun</span>,
            selector: row => '',
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien Masuk</span>,
            selector: row => row.jumlah,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien Keluar Hidup</span>,
            selector: row => row.jmlpulanghidup,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien Akhir Tahun</span>,
            selector: row => row.jmlmeninggalk48,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.jmlmeninggall48,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.lamarawat,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => '',
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatan,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatanklvvip,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatanklvip,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatankl1,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatankl2,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatankl3,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jumlah Hari Perawatan</span>,
            selector: row => row.hariperawatanklkhusus,
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

        XLSX.writeFile(workbook, 'laporan_rl3_2.xlsx');
    };


    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content laporan-rl3-2">
                <Container fluid>
                    <BreadCrumb title="Laporan RL3.2" pageTitle="Forms" />
                    <Card>
                        <CardBody>
                            <div className='mb-2 row-header'>
                                <Row>
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                id="tglstart"
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
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
                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </Col>
                                    <Col lg={1}><h4>s/d</h4></Col>
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                id="tglend"
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
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
                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
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
                                </Row>
                            </div>
                            <Button type="button" placement="top" id="tooltipTopPencarian" onClick={handleExport}>
                                Export to Excel
                            </Button>

                            <div className="live-preview">
                                <div className="table-responsive">
                                    <Table className="table-bordered border-secondary table-nowrap align-top mb-0">
                                        <thead style={{ backgroundColor: '#e67e22', color: '#ffffff' }}>
                                            <tr>
                                                <th rowSpan="2">No</th>
                                                <th rowSpan="2">Jenis Pelayanan</th>
                                                <th rowSpan="2">Pasien Awal Tahun</th>
                                                <th rowSpan="2">Pasien Masuk</th>
                                                <th rowSpan="2">Pasien Keluar Hidup</th>
                                                <th colSpan="2">Pasien Keluar Mati</th>
                                                <th rowSpan="2">JUMLAH Lama Dirawat</th>
                                                <th rowSpan="2">Pasien Akhir Tahun</th>
                                                <th rowSpan="2">Jumlah Hari Perawatan</th>
                                                <th colSpan="6">Rincian Hari Perawatan Per Kelas</th>
                                            </tr>
                                            <tr>
                                                <th scope="col"><span>‹ 48 Jam</span></th>
                                                <th scope="col">› 48 Jam</th>
                                                <th scope="col"><span>VVIP</span></th>
                                                <th scope="col">VIP</th>
                                                <th scope="col"><span>I</span></th>
                                                <th scope="col">II</th>
                                                <th scope="col">III</th>
                                                <th scope="col">Kelas Khusus</th>
                                            </tr>
                                        </thead>
                                        {
                                            dataGrid.map((data, i) => (
                                                <tbody className="w-100 table-hover-click"
                                                    key={i}>
                                                    <tr className="w-100">
                                                        <td className="text-muted">{data.row}</td>
                                                        <td className="text-muted">{data.jenis_spesialisasi}</td>
                                                        <td className="text-muted"></td>
                                                        <td className="text-muted">{data.jumlah}</td>
                                                        <td className="text-muted">{data.jmlpulanghidup}</td>
                                                        <td className="text-muted">{data.jmlmeninggalk48}</td>
                                                        <td className="text-muted">{data.jmlmeninggall48}</td>
                                                        <td className="text-muted">{data.lamarawat}</td>
                                                        <td className="text-muted"></td>
                                                        <td className="text-muted">{data.hariperawatan}</td>
                                                        <td className="text-muted">{data.hariperawatanklvvip}</td>
                                                        <td className="text-muted">{data.hariperawatanklvip}</td>
                                                        <td className="text-muted">{data.hariperawatankl1}</td>
                                                        <td className="text-muted">{data.hariperawatankl2}</td>
                                                        <td className="text-muted">{data.hariperawatankl3}</td>
                                                        <td className="text-muted">{data.hariperawatanklkhusus}</td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </Table>
                                </div>
                            </div>
                            {/* <div className="table-responsive table-card mt-3 mb-1">
                                <table className="table align-middle" id="customerTable">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" style={{ width: "50px" }}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                </div>
                                            </th>
                                            <th className="sort" data-sort="customer_name">No</th>
                                            <th className="sort" data-sort="email">Jenis Pelayanan</th>
                                            <th className="sort" data-sort="phone">PASIEN KELUAR MATI
                                                <td>test</td>
                                                <td>test</td>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div> */}
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (RL3_2)