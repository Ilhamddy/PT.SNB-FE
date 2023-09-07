import React from "react"
import { ToastContainer } from "react-toastify"
import UiContent from "../../../../Components/Common/UiContent"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import BreadCrumb from "../../../../Components/Common/BreadCrumb"
import DataTable from "react-data-table-component"


const Mapping3_3 = () => {
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content laporan-rl3-2">
                <Container fluid>
                    <BreadCrumb title="Laporan RL3.2" pageTitle="Forms" />
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </CardBody>
                        <Row>
                            <Col lg={12}>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="700px"
                                    columns={[]}
                                    pagination
                                    data={[]}
                                    progressPending={false}
                                    progressComponent={<LoadingTable />}
                                    customStyles={tableCustomStyles}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={5}>
                                
                            </Col>
                            <Col lg={7}>
                            </Col>
                        </Row>

                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Mapping3_3