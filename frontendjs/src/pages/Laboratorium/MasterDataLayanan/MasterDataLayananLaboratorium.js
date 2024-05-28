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
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect';
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    masterPelayananLaboratoriumGet
} from '../../../store/actions';
import {
   updateStatusLayanan
  } from '../../../store/masterdatalayanan/action'
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import SearchInput from '../../../Components/Common/CustomInput/SearchInput';

const MasterDataLayananLaboratorium = () => {
    document.title = "Master Data Layanan Laboratorium";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error } = useSelector((state) => ({
        data: state.Laboratorium.masterPelayananLaboratoriumGet.data,
        loading: state.Laboratorium.masterPelayananLaboratoriumGet.loading

    }));
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [dateEnd, setdateEnd] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [search, setSearch] = useState('')
    const [filterStatus, setfilterStatus] = useState(1)
    const onClickDetail = (product, id) => {

    };
    const handleClickDetail = (id, e) => {
        if (id === 1)
            history(`/laboratorium/masternilainormal/${e.id}/${e.namaproduk}/${e.kodeexternal}/${e.detailjenisproduk}`);
        else if (id === 2)
            history(`/laboratorium/setnilainormal/${e.id}/${e.namaproduk}/${e.kodeexternal}/${e.detailjenisproduk}`);
        else if (id === 3)
            history(`/laboratorium/masterhasillab/${e.id}/${e.namaproduk}/${e.kodeexternal}/${e.detailjenisproduk}`);
    };
    const columns = [
        {
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#!" onClick={() => handleClickDetail(1, data)}><i className="ri-apps-2-line align-bottom me-2 link-success"></i>Detail</DropdownItem>
                                <DropdownItem href="#!" onClick={() => handleClickDetail(2, data)}><i className="ri-file-settings-line align-bottom me-2 link-success"></i>Set Nilai Normal</DropdownItem>
                                <DropdownItem href="#!" onClick={() => handleClickDetail(3, data)}><i className="ri-file-settings-line align-bottom me-2 link-success"></i>Set Master Hasil Lab</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <Link to={`/laboratorium/masternilainormal/${data.id}/${data.namaproduk}/${data.kodeexternal}/${data.detailjenisproduk}`} className="link-success fs-15" id="tooltipMasterDataLayanan"><i className="ri-apps-2-line"></i></Link>
                        <UncontrolledTooltip placement="top" target="tooltipMasterDataLayanan" > Set Nilai Normal </UncontrolledTooltip> */}
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Id Produk</span>,
            selector: row => row.id,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kode Layanan</span>,
            selector: row => row.kodeexternal,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Layanan</span>,
            selector: row => row.namaproduk,
            sortable: true,
            // width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Detail Jenis Produk</span>,
            selector: row => row.detailjenisproduk,
            sortable: true,
            // width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kode Satusehat</span>,
            selector: row => row.kodesatusehat,
            sortable: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>Statusenabled</span>,
            cell: (row) =>
            row.statusenabled ? (
            <Button color="danger" type='button' onClick={()=>{
                handleClikStatus(row,false)
            }}>Nonaktifkan</Button>
            ) : (
            <Button color="success" type='button' onClick={()=>{
                handleClikStatus(row,true)
            }}>Aktifkan</Button>
            ),
            sortable: true,
            width: "150px"
        },
    ];
    useEffect(() => {
        dispatch(masterPelayananLaboratoriumGet({param:'',status:filterStatus}));
    }, [filterStatus,dispatch]);

    const handleClikStatus = (e,status)=>{
        let temp={
            idproduk:e.id,
            status:status
        }
        dispatch(updateStatusLayanan(temp,()=>{
            dispatch(masterPelayananLaboratoriumGet({param:search,status:filterStatus}));
        }))
    }
    const handleClickCari = () => {
        dispatch(masterPelayananLaboratoriumGet({param:search,status:filterStatus}));

    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            dispatch(masterPelayananLaboratoriumGet({param:search}));
        }
    }
    const handleClickToSetting = () => {
        history("/laboratorium/seeting-layanan-lab")
    }

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Master Data Layanan Laboratorium" pageTitle="Forms" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='card-header-snb'>
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Master Data Layanan Laboratorium</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <Row className='d-flex justify-content-between'>
                                                    <Col lg={3}>
                                                        <Button type="button" color='info' placement="top" onClick={handleClickToSetting}>
                                                            Setting Layanan
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Row className='d-flex flex-row-reverse'>
                                                            <Col lg={"auto"}>
                                                                <Button type="button" color='info' placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                                                    CARI
                                                                </Button>
                                                                <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                                            </Col>
                                                            <Col lg={"auto"}>
                                                                <SearchInput type="text" className="form-control search"
                                                                    placeholder="Nama Produk..." onChange={event => setSearch(event.target.value)}
                                                                    onKeyDown={handleFilter} />
                                                            
                                                            </Col>
                                                            <Col lg={"auto"}>
                                                                <CustomSelect
                                                                    id="DataName"
                                                                    name="DataName"
                                                                    options={[
                                                                        {
                                                                          label: 'Semua',
                                                                          value: 1,
                                                                        },
                                                                        {
                                                                          label: 'Aktif',
                                                                          value: 2,
                                                                        },
                                                                        {
                                                                          label: 'Nonaktif',
                                                                          value: 3,
                                                                        }]}
                                                                    onChange={(e) => {
                                                                        setfilterStatus(e?.value)
                                                                    }}
                                                                    value={filterStatus}
                                                                    />
                                                            </Col>
                                                        </Row>
                                                    </Col>


                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="700px"
                                            columns={columns}
                                            pagination
                                            data={data}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(MasterDataLayananLaboratorium)