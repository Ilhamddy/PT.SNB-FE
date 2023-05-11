import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
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
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Daftar Pasien Lama</h4>
                                </CardHeader>

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