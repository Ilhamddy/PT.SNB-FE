import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import { ToastContainer } from "react-toastify";
import UiContent from "../../../Components/Common/UiContent";
import { Button, Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormFeedback, Input, Row, UncontrolledDropdown } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../../../Components/Common/CustomSelect/CustomSelect";
import DataTable from "react-data-table-component";
import LoadingTable from "../../../Components/Table/LoadingTable";
import {
    sdmResetForm, getDaftarPegawai,getComboSDM
} from "../../../store/actions";

import pria from "../../../assets/images/svg/pria.svg"
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"

import { tableCustomStyles } from "../../../Components/Table/tableCustomStyles";
import CustomInput from "../../../Components/Common/CustomInput/CustomInput";

const linkMedia = process.env.REACT_APP_MEDIA_UPLOAD_URL + '/'


const DaftarPegawai = () => {
    document.title = "Daftar Pegawai";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading,dataCombo } = useSelector((state) => ({
        data: state.sumberDayaManusia.getDaftarPegawai.data,
        loading: state.sumberDayaManusia.getDaftarPegawai.loading,
        dataCombo: state.sumberDayaManusia.getComboSDM.data,
    }));
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            comboUnit: '',
            search: ''
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(getDaftarPegawai({
                unit: values.comboUnit,
                search: values.search,
            }));
        }
    })
    useEffect(() => {
        return () => {
            dispatch(sdmResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(getDaftarPegawai({
            unit: '',
            search: '',
        }));
        dispatch(getComboSDM())
    }, [dispatch])
    
    const handleClickEdit = (e) => {
        navigate(`/sumberdayamanusia/biodata-pegawai/${e.id}`)
    };
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button"
                            >
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#!" onClick={() => handleClickEdit(data)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Edit</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip> */}
                    </div>
                );
            },
            width: "80px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>NIP</span>,
            selector: row => row.nip,
            sortable: true,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Lengkap</span>,
            selector: row => row.namalengkap,
            sortable: true,
            // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
            width: "160px",
            wrap: true,
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Profesi</span>,
            selector: row => row.profesi,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Status Pegawai</span>,
            selector: row => row.statuspegawai,
            sortable: true,
            width: "100",
        },
        {

            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.status,
            sortable: true,
            width: "100",
        },
    ];
    // Profil
    const [profil, setProfil] = useState({
        namalengkap: null,
        nip: null,
        profile: null,
    })
    const handleClick = (e) => {
        setProfil({
            ...e
        })
    };
    const handleClickTambah = (e)=>{
        navigate(`/sumberdayamanusia/biodata-pegawai`)
    }
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pegawai" pageTitle="Forms" />
                    <Row>
                        <Col lg={3}>
                            <Card>
                                <CardBody className="p-4 text-center">
                                    <div className="text-center mt-3">
                                        <h2 className="ff-secondary fw-semibold">
                                        {profil?.fotoUtama?.urifoto  ? (
                                            <img src={linkMedia + profil.fotoUtama.urifoto} style={{objectFit: "cover"}} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : (
                                            // Render when none of the conditions are met
                                            <p>No profile image available</p>
                                        )}
                                        </h2>
                                    </div>
                                    <h5 className="card-title mb-1">{profil && profil.namalengkap ? profil.namalengkap : '-'}</h5>
                                    {/* <p className="text-muted mb-0">{selectedPasien && selectedPasien.jeniskelamin ? selectedPasien.jeniskelamin : '-'}</p> */}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={9}>
                            <Card>
                                <CardHeader>
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            vSetValidation.handleSubmit();
                                            return false;
                                        }}
                                        className="gy-4"
                                        action="#">
                                        <Row className="gy-4">

                                            <Col lg={3}>
                                                <CustomSelect
                                                    id="comboUnit"
                                                    name="comboUnit"
                                                    options={dataCombo?.unit}
                                                    onChange={(e) => {
                                                        vSetValidation.setFieldValue('comboUnit', e?.value || '')
                                                    }}
                                                    value={vSetValidation.values.comboUnit}
                                                    className={`input row-header ${!!vSetValidation?.errors.comboUnit ? 'is-invalid' : ''
                                                        }`}
                                                    placeholder='Unit..'
                                                />
                                                {vSetValidation.touched.comboUnit &&
                                                    !!vSetValidation.errors.comboUnit && (
                                                        <FormFeedback type="invalid">
                                                            <div>{vSetValidation.errors.comboUnit}</div>
                                                        </FormFeedback>
                                                    )}
                                            </Col>
                                            <Col lg={3}>
                                                <CustomInput
                                                    id="search"
                                                    name="search"
                                                    type="text"
                                                    value={vSetValidation.values.search}
                                                    onChange={(e) => {
                                                        vSetValidation.setFieldValue('search', e.target.value)
                                                    }}
                                                    invalid={vSetValidation.touched?.search &&
                                                        !!vSetValidation.errors?.search}
                                                    placeholder="Search Nama / NIP..."
                                                />
                                                {vSetValidation.touched?.search
                                                    && !!vSetValidation.errors.search && (
                                                        <FormFeedback type="invalid">
                                                            <div>{vSetValidation.errors.search}</div>
                                                        </FormFeedback>
                                                    )}
                                            </Col>
                                            <Col lg="auto">
                                                <Button type="submit" color="info" placement="top">
                                                    Cari
                                                </Button>
                                            </Col>
                                            <Col lg="auto">
                                                <Button type="button" color="info" placement="top"
                                                onClick={() => handleClickTambah()}>
                                                    Tambah Pegawai
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="330px"
                                            columns={columns}
                                            pagination
                                            data={data}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                            onRowClicked={(row) => handleClick(row)}
                                            pointerOnHover
                                            highlightOnHover
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
export default withRouter(DaftarPegawai)