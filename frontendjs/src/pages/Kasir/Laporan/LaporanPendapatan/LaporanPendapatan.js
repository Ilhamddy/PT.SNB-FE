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
    laporanPendapatanKasirGet
} from '../../../../store/actions';
import "./LaporanPendapatan.scss"
import * as XLSX from 'xlsx';
import { Grid, _ } from 'gridjs-react';
import { tableCustomStyles } from '../../../../Components/Table/tableCustomStyles';

const LaporanPendapatan = () => {
    document.title = "Laporan RL3.1";
    const dispatch = useDispatch();
    const { data, loading, error, dataGrid, loadingGrid } = useSelector((state) => ({
        // data: state.KendaliDokumen.comboLaporanRekammedisGet.data,
        // loading: state.KendaliDokumen.comboLaporanRekammedisGet.loading,
        // error: state.KendaliDokumen.comboLaporanRekammedisGet.error,
        dataGrid: state.Payment.laporanPendapatanKasirGet.data,
        loadingGrid: state.Payment.laporanPendapatanKasirGet.loading,
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
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {

            dispatch(laporanPendapatanKasirGet(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}`));
        }
    }
    const handleClickCari = () => {
        // console.log(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}`)
        dispatch(laporanPendapatanKasirGet(`${search}&start=${validation.values.tglstart}&end=${validation.values.tglend}`));
    }
    
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>No Bukti Bayar</span>,
            selector: row => row.no_bukti,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Tanggal Bayar</span>,
            selector: row => row.tglbayar,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Total Bayar</span>,
            selector: row => row.totalbayar,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Kasir</span>,
            selector: row => row.namalengkap,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Jenis Pembayaran</span>,
            selector: row => row.jenispembayaran,
            sortable: true,
            // width: "150px"
        },
    ];

    const handleExport = () => {
        const formattedData = dataGrid.laporan.map(row => columns.map(col => col.selector(row)));
        const header = columns.map(col => col.name.props.children);
        const sheetData = [header, ...formattedData];
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'Laporan_Pendapatan.xlsx');
    };


    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content laporan-pendapatan">
                <Container fluid>
                    <BreadCrumb title="Laporan Pendapatan" pageTitle="Forms" />
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
                                <div id="table-gridjs">
                                    <DataTable
                                        fixedHeader
                                        fixedHeaderScrollHeight="700px"
                                        columns={columns}
                                        pagination
                                        data={dataGrid.laporan}
                                        progressPending={loadingGrid}
                                        progressComponent={<LoadingTable />}
                                        customStyles={tableCustomStyles}
                                    />
                                </div>
                                {/* <div className="table-responsive">
                                    <Table className="table-bordered border-secondary table-nowrap align-top mb-0">
                                        <thead style={{ backgroundColor: '#FFCB46', color: '#ffffff' }}>
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
                                            dataGrid.laporan.map((data, i) => (
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
                                </div> */}
                            </div>

                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (LaporanPendapatan)