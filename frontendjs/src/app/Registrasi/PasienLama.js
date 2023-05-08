import React from 'react';

import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from 'reactstrap';
import PreviewCardHeaderNew from '../../Components/Common/PreviewCardHeaderNew';


const PasienLama = () => {
    document.title="Pasien Lama";
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

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Basic Input</Label>
                                                    <Input type="password" className="form-control" id="basiInput" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="labelInput" className="form-label">Input with Label</Label>
                                                    <Input type="password" className="form-control" id="labelInput" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="placeholderInput" className="form-label">Input with Placeholder</Label>
                                                    <Input type="password" className="form-control" id="placeholderInput" placeholder="Placeholder" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="valueInput" className="form-label">Input with Value</Label>
                                                    <Input type="text" className="form-control" id="valueInput" defaultValue="Input value" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="readonlyPlaintext" className="form-label">Readonly Plain Text Input</Label>
                                                    <Input type="text" className="form-control-plaintext" id="readonlyPlaintext" defaultValue="Readonly input" readOnly />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="readonlyInput" className="form-label">Readonly Input</Label>
                                                    <Input type="text" className="form-control" id="readonlyInput" defaultValue="Readonly input" readOnly />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="disabledInput" className="form-label">Disabled Input</Label>
                                                    <Input type="text" className="form-control" id="disabledInput" defaultValue="Disabled input" disabled />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="iconInput" className="form-label">Input with Icon</Label>
                                                    <div className="form-icon">
                                                        <Input type="email" className="form-control form-control-icon" id="iconInput" placeholder="example@gmail.com" />
                                                        <i className="ri-mail-unread-line"></i>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="iconrightInput" className="form-label">Input with Icon Right</Label>
                                                    <div className="form-icon right">
                                                        <Input type="email" className="form-control form-control-icon" id="iconrightInput" placeholder="example@gmail.com" />
                                                        <i className="ri-mail-unread-line"></i>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputdate" className="form-label">Input Date</Label>
                                                    <Input type="date" className="form-control" id="exampleInputdate" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputtime" className="form-label">Input Time</Label>
                                                    <Input type="time" className="form-control" id="exampleInputtime" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputpassword" className="form-label">Input Password</Label>
                                                    <Input type="password" className="form-control" id="exampleInputpassword" defaultValue="44512465" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleFormControlTextarea5" className="form-label">Example Textarea</Label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="formtextInput" className="form-label">Form Text</Label>
                                                    <Input type="password" className="form-control" id="formtextInput" />
                                                    <div id="passwordHelpBlock" className="form-text">
                                                        Must be 8-20 characters long.
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="colorPicker" className="form-label">Color Picker</Label>
                                                    <Input type="color" className="form-control form-control-color w-100" id="colorPicker" defaultValue="#364574" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="borderInput" className="form-label">Input Border Style</Label>
                                                    <Input type="text" className="form-control border-dashed" id="borderInput" placeholder="Enter your name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <Label htmlFor="exampleDataList" className="form-label">Datalist example</Label>
                                                <Input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Search your country..." />
                                                <datalist id="datalistOptions">
                                                    <option defaultValue="Switzerland"> </option>
                                                    <option defaultValue="New York"> </option>
                                                    <option defaultValue="France"> </option>
                                                    <option defaultValue="Spain"> </option>
                                                    <option defaultValue="Chicago"> </option>
                                                    <option defaultValue="Bulgaria"> </option>
                                                    <option defaultValue="Hong Kong"> </option>
                                                </datalist>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputrounded" className="form-label">Rounded Input</Label>
                                                    <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter your name" />
                                                </div>
                                            </Col>

                                        </Row>

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