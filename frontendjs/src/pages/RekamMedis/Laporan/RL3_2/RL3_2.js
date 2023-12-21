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
    laporanRL_3_2_Get,kendaliDokumenResetForm
} from '../../../../store/actions';
import "./RL3_2.scss"
import * as XLSX from 'xlsx';
import { Grid, _ } from 'gridjs-react';
import { BaseExample } from '../../../Tables/GridTables/GridTablesData';
import KontainerFlatpickr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr';

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
        dataGrid: state.KendaliDokumen.laporanRL_3_2_Get.data,
        loadingGrid: state.KendaliDokumen.laporanRL_3_2_Get.loading,
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
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {

            dispatch(laporanRL_3_2_Get({
                search: search,
                start: validation.values.tglstart,
                end: validation.values.tglend
            }));
        }
    }
    const handleClickCari = () => {
        dispatch(laporanRL_3_2_Get({
            search: search,
            start: validation.values.tglstart,
            end: validation.values.tglend
        }));
    }
    
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.row_n,
            sortable: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Jenis Pelayanan</span>,
            selector: row => row.reportdisplay,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien Rujukan</span>,
            selector: row => row.rujukan,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien NonRujukan</span>,
            selector: row => row.nonrujukan,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien Rawat</span>,
            selector: row => row.rawat,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien rujuk</span>,
            selector: row => row.rujuk,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Pasien pulang</span>,
            selector: row => row.pulang,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Mati IGD</span>,
            selector: row => row.matiigd,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>DOA</span>,
            selector: row => row.doa,
            sortable: true,
            // width: "250px",
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
            <UiContent />
            <div className="page-content laporan-rl3-2">
                <Container fluid>
                    <BreadCrumb title="Laporan RL3.2" pageTitle="Forms" />
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
                                </Row>
                            </div>
                            <Button color='info' type="button" placement="top" id="tooltipTopPencarian" onClick={handleExport}>
                                Export to Excel
                            </Button>

                            <div className="live-preview">
                                <div className="table-responsive">
                                    <Table className="table-bordered border-secondary table-nowrap align-top mb-0">
                                        <thead style={{ backgroundColor: '#FFCB46', color: '#ffffff', textAlign: 'center', verticalAlign: 'top' }}>
                                            <tr>
                                                <th rowSpan="2">No</th>
                                                <th rowSpan="2">Jenis Pelayanan</th>
                                                <th colSpan="2">Total Pasien</th>
                                                <th colSpan="3">Tindak Lanjut Pelayanan</th>
                                                <th rowSpan="2">Mati Di IGD</th>
                                                <th rowSpan="2">DOA</th>
                                            </tr>
                                            <tr>
                                                <th scope="col"><span>Rujukan</span></th>
                                                <th scope="col">Non Rujukan</th>
                                                <th scope="col"><span>Dirawat</span></th>
                                                <th scope="col">Dirujukan</th>
                                                <th scope="col"><span>Pulang</span></th>
                                            </tr>
                                        </thead>
                                        {
                                            dataGrid.map((data, i) => (
                                                <tbody className="w-100 table-hover-click"
                                                    key={i}>
                                                    <tr className="w-100">
                                                        <td className="text-muted">{data.row_n}</td>
                                                        <td className="text-muted">{data.reportdisplay}</td>
                                                        <td className="text-muted">{data.rujukan}</td>
                                                        <td className="text-muted">{data.nonrujukan}</td>
                                                        <td className="text-muted">{data.rawat}</td>
                                                        <td className="text-muted">{data.rujuk}</td>
                                                        <td className="text-muted">{data.pulang}</td>
                                                        <td className="text-muted">{data.matidiigd}</td>
                                                        <td className="text-muted">{data.doa}</td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </Table>
                                </div>
                            </div>
                            <div id="table-gridjs">
                                {/* <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="700px"
                                    columns={columns}
                                    pagination
                                    data={dataGrid}
                                    progressPending={loading}
                                    progressComponent={<LoadingTable />}
                                    customStyles={tableCustomStyles}
                                /> */}
                                <BaseExample />
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (RL3_2)