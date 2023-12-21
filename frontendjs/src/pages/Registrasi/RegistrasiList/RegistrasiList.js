import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { registrasiGetList, registrasiGetListByOr,upsertPatient } from '../../../store/actions';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeaderNew from '../../../Components/Common/PreviewCardHeaderNew';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import withRouter from '../../../Components/Common/withRouter';
import DataTable from 'react-data-table-component';
//import images

import patient from "../../../assets/images/users/icons8-patient-64.png";

import { ToastContainer, toast } from 'react-toastify';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { dateLocal } from '../../../utils/format';
import ActionPasienRegistrasi from '../../../Components/ActionPasienRegistrasi/ActionPasienRegistrasi';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const RegistrasiList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, loading, error } = useSelector((state) => ({
        data: state.Registrasi.registrasiList.data,
        loading: state.Registrasi.registrasiList.loading,
        error: state.Registrasi.registrasiList.error,
    }));

    useEffect(() => {
        dispatch(registrasiGetList(''));
    }, [dispatch]);


    // Profil
    const [profil, setProfil] = useState({
        profile: null,
        namaPasien: null,
        noIdentitas: null,
        norm: null,
        nohp: null,
        alamat: null,
        search: null,
        idcmfk: null,
        jeniskelamin:null,
        golongandarah:null,
        alamatdomisili:null,
        namaibu:null,
        pendidikan:null,
        pekerjaan:null,
        agama:null,
        statusperkawinan:null,
        namasuamiistri:null,
        ihs_id:null,
        ihs_code:null,
        ihs_display:null,
        ihs_jeniskelamin:null,
        tgllahir:null,
        namakabupaten:null,
        kodepos:null,
        kodedesa:null,
        kodekecamatan:null,
        kodekabupaten:null,
        kodeprovinsi:null,
        rtktp:null,
        rwktp:null
    })
    const [search, setSearch] = useState('')
    const [statusNotif, setstatusNotif] = useState(false);

    const handleClick = (e) => {
        setProfil({
            profile: e.profile,
            namaPasien: e.namapasien,
            noIdentitas: e.noidentitas,
            norm: e.nocm,
            nohp: e.nohp + ' / ' + e.notelepon,
            alamat: e.alamatrmh,
            idcmfk: e.id,
            jeniskelamin:e.jeniskelamin,
            golongandarah:e.golongandarah,
            alamatdomisili:e.alamatdomisili,
            namaibu:e.namaibu,
            pendidikan:e.pendidikan,
            pekerjaan:e.pekerjaan,
            agama:e.agama,
            statusperkawinan:e.statusperkawinan,
            namasuamiistri:e.namasuamiistri,
            ihs_id:e.ihs_id,
            ihs_code:e.ihs_code,
            ihs_display:e.ihs_display,
            nohppasien: e.nohp,
            ihs_jeniskelamin:e.ihs_jeniskelamin,
            tgllahir:e.tgllahir,
            namakabupaten:e.namakabupaten,
            kodepos:e.kodepos,
            kodedesa:e.kodedesa,
            kodekecamatan:e.kodekecamatan,
            kodekabupaten:e.kodekabupaten,
            kodeprovinsi:e.kodeprovinsi,
            rtktp:e.rtktp,
            rwktp:e.rwktp
        })
    };


    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            dispatch(registrasiGetList(search));
        }
    }

    document.title = "Pasien Lama";


    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocm,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "150px",
            wrap: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Identitas</span>,
            selector: row => row.noidentitas,
            sortable: true,
            width: "180px",
            wrap: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>No. BPJS</span>,
            selector: row => row.nobpjs,
            sortable: true,
            width: "180px",
            wrap: true,
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl. Lahir</span>,
            selector: row => dateLocal(row.tgllahir),
            sortable: false,
            width: "160px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Alamat KTP</span>,
            selector: row => row.alamatrmh,
            sortable: false,
            width: "150px",
            wrap: true,
        },
    ];

    const buttonAction = [
        {
            name: 'Registrasi',
            onClick: (profil) => {
                let values = {
                    id: profil?.idcmfk,
                    noidentitas: profil?.noIdentitas,
                    ihs_code: profil?.ihs_code,
                    ihs_display: profil?.ihs_display,
                    namapasien: profil?.namaPasien,
                    nohppasien: profil?.nohppasien,
                    ihs_jeniskelamin:profil?.ihs_jeniskelamin,
                    tgllahir:profil?.tgllahir,
                    alamat:profil?.alamat,
                    namakabupaten:profil?.namakabupaten,
                    kodepos:profil?.kodepos,
                    kodedesa:profil?.kodedesa,
                    kodekecamatan:profil?.kodekecamatan,
                    kodekabupaten:profil?.kodekabupaten,
                    kodeprovinsi:profil?.kodeprovinsi,
                    rtktp:profil?.rtktp,
                    rwktp:profil?.rwktp
                }
                if(profil?.ihs_id===null && profil?.noIdentitas!==null){
                    dispatch(
                        upsertPatient(values, () => {
                        })
                    )
                }
                navigate(`/registrasi/pasien-ruangan/${profil?.idcmfk}`)
            },
        },
        {
            name: 'Edit Data Pasien',
            onClick: (profil) => {
                navigate(`/registrasi/pasien-baru/${profil?.idcmfk}`)
            },
        },
        {
            name: 'Cetak Kartu Pasien',
            onClick: (profil) => {
                navigate(`/registrasi/pasien-baru/${profil?.idcmfk}`)
            },
        },
        {
            name: 'Cek kepesertaan',
            onClick: (profil) => {},
        },
        {
            name: 'Cek Rujukan',
            onClick: (profil) => {},
        },
        {
            name: '[BPJS] Buat Surkon/SPRI',
            onClick: (profil) => {},
        },
        {
            name: 'Cetak Kartu Pasien',
            onClick: (profil) => {},
        },
        {
            name: 'Cetak Label Pasien',
            onClick: (profil) => {},
        },
    ]


    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Pasien Lama" pageTitle="Forms" />
                    <Row>
                        <Col lg={3}>
                            <ActionPasienRegistrasi profil={profil} buttonAction={buttonAction}/>
                        </Col>
                        <Col lg={9}>
                            <Card>
                            <CardHeader className='card-header-snb'>
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Pasien Lama</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="table-gridjs">
                                        <Col className="col-sm mb-3">
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        onChange={event => setSearch(event.target.value)}
                                                        onKeyDown={handleFilter} placeholder="Search..." />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col>
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="700px"
                                            columns={columns}
                                            pagination
                                            data={data}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                            onRowClicked={(row) => handleClick(row)}
                                            pointerOnHover
                                            highlightOnHover
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
    );
}

export default withRouter(RegistrasiList);