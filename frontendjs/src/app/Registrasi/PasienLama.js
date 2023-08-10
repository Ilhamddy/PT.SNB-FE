import React, { useEffect, useState } from 'react';

import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from 'reactstrap';
import PreviewCardHeaderNew from '../../Components/Common/PreviewCardHeaderNew';

// Import Table Data
// import { BaseExample } from '../../../src/pages/Tables/GridTables/GridTablesData';

import { Grid, _ } from 'gridjs-react';

import {
    getRegistrasiList,

} from "../../store/registrasi/action";

//redux
import { useSelector, useDispatch } from "react-redux";

const PasienLama = () => {
    const dispatch = useDispatch();

    // const { registrasiList, isRegistrasiCreated, isRegistrasiSuccess, error } = useSelector((state) => ({
    //     registrasiList: state.Registrasi.RegistrasiList,
    //     isRegistrasiCreated: state.Registrasi.isRegistrasiCreated,
    //     isRegistrasiSuccess: state.Registrasi.isRegistrasiSuccess,
    //     error: state.Registrasi.error,
    // }));

    // useEffect(() => {
    //     if (registrasiList && !registrasiList.length) {
    //         dispatch(getRegistrasiList());
    //     }
    // }, [dispatch, registrasiList]);

    document.title = "Pasien Lama";
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
                                        <BaseExample />
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

export default PasienLama;

const BaseExample = () => {
    return (
        <React.Fragment>
            <Grid
                data={data}
                columns={[{
                    name: 'ID',
                    formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                },
                    "Name",
                {
                    name: 'Email',
                    formatter: (cell) => _(<a href="/#"> {cell} </a>)
                },
                    "Position", "Company", "Country",
                {
                    name: 'Actions',
                    width: '120px',
                    formatter: (cell) => _(<a href='/#' className='text-reset text-decoration-underline'> Details </a>)
                },
                ]}
                search={true}
                sort={true}
                pagination={{ enabled: true, limit: 5, }}
            />
        </React.Fragment>
    );
};

const data = [
    ["01", "Jonathan", "jonathan@example.com", "Senior Implementation Architect", "Hauck Inc", "Holy See"],
    ["02", "Harold", "harold@example.com", "Forward Creative Coordinator", "Metz Inc", "Iran"],
    ["03", "Shannon", "shannon@example.com", "Legacy Functionality Associate", "Zemlak Group", "South Georgia"],
    ["04", "Robert", "robert@example.com", "Product Accounts Technician", "Hoeger", "San Marino"],
    ["05", "Noel", "noel@example.com", "Customer Data Director", "Howell - Rippin", "Germany"],
    ["06", "Traci", "traci@example.com", "Corporate Identity Director", "Koelpin - Goldner", "Vanuatu"],
    ["07", "Kerry", "kerry@example.com", "Lead Applications Associate", "Feeney, Langworth and Tremblay", "Niger"],
    ["08", "Patsy", "patsy@example.com", "Dynamic Assurance Director", "Streich Group", "Niue"],
    ["09", "Cathy", "cathy@example.com", "Customer Data Director", "Ebert, Schamberger and Johnston", "Mexico"],
    ["10", "Tyrone", "tyrone@example.com", "Senior Response Liaison", "Raynor, Rolfson and Daugherty", "Qatar"],
];