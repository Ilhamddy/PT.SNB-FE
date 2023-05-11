import React, { useEffect, useState } from 'react';


//import Components
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from 'reactstrap';

// Import Table Data
// import { BaseExample } from '../../../src/pages/Tables/GridTables/GridTablesData';

import { Grid, _ } from 'gridjs-react';

//redux
import { useSelector, useDispatch } from "react-redux";
import { registrasiGetList } from '../../../store/actions';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeaderNew from '../../../Components/Common/PreviewCardHeaderNew';
import UiContent from '../../../Components/Common/UiContent';
import { Link } from 'react-router-dom';
import withRouter from '../../../Components/Common/withRouter';
import DataTable from 'react-data-table-component';

const RegistrasiList = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => ({
        data: state.Registrasi.registrasiList.data,
        loading: state.Registrasi.registrasiList.loading,
        error: state.Registrasi.registrasiList.error,
    }));

    useEffect(() => {
        dispatch(registrasiGetList());
    }, [dispatch]);

    document.title = "Pasien Lama";

    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: false
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Identitas</span>,
            selector: row => row.noidentitas,
            sortable: false
        },
        {
            name: <span className='font-weight-bold fs-13'>No. BPJS</span>,
            selector: row => row.nobpjs,
            sortable: false
        },
        {
            name: <span className='font-weight-bold fs-13'>No. HP</span>,
            selector: row => row.nohp,
            sortable: false
        },
        {
            name: <span className='font-weight-bold fs-13'>Aksi</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
                );
            },
        },
    ];

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Pasien Lama" pageTitle="Forms" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeaderNew title="Daftar Pasien Lama" />

                                <CardBody>
                                    <div id="table-gridjs">
                                    <DataTable
                                        columns={columns}
                                        pagination
                                        data={data}
                                        progressPending={loading}
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