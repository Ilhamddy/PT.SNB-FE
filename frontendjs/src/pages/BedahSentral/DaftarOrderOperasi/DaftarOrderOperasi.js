import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Row } from "reactstrap";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../../Select/Select";
import { bedahSentralResetForm, widgetOrderOperasiGet } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";

const DaftarOrderOperasi = () => {
    document.title = "Daftar Order Operasi";
    const dispatch = useDispatch();
    const { datawidget, data, dataCombo } = useSelector((state) => ({
        datawidget: state.BedahSentral.widgetOrderOperasiGet.data
    }));
    const [dateNow] = useState(() => new Date().toISOString())
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            dateStart: dateNow,
            dateEnd: dateNow,
            unitOrder: '',
            search: ''
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            console.log(values);
            // dispatch(saveEmrTriageIgd(values, () => {
            //     // dispatch(lainLainGet())
            // }));

        }
    })
    const handleBeginOnChangeStart = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        vSetValidation.setFieldValue('dateStart', dateString)
    }
    const handleBeginOnChangeEnd = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        vSetValidation.setFieldValue('dateEnd', dateString)
    }
    useEffect(() => {
        return () => {
            dispatch(bedahSentralResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(widgetOrderOperasiGet(''));
    }, [dispatch])
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Order Operasi" pageTitle="Forms" />
                    <Card>
                        <Row>
                            {datawidget.map((item, key) => (
                                <Col xxl={4} sm={6} key={key}>
                                    <Card className="card-animate">
                                        <CardBody>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p className="fw-medium text-muted mb-0">Total Pasien {item.label}</p>
                                                    <h2 className="mt-4 ff-secondary fw-semibold">
                                                        <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                            <CountUp
                                                                start={0}
                                                                end={item.counter}
                                                                decimal={item.decimals}
                                                                duration={3}
                                                            />
                                                        </span>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <div className="avatar-md flex-shrink-0">
                                                        <span className={"avatar-title rounded-circle fs-4 bg-soft-" + item.iconClass + " text-" + item.iconClass}>
                                                            <img src={item.icon}
                                                                alt="" className="avatar-md" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <div className="card-footer p-2" style={{ backgroundColor: '#e67e22' }}>
                                            <div className="text-center">
                                                {/* <Link to="#" className="link-light" onClick={() => handleClickCard(item)}>View <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link> */}
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                            <Col lg={3}>
                                <Card>
                                    <CardBody className="p-4 text-center">
                                        <div className="mx-auto avatar-md mb-3">
                                            <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                <h2 className="ff-secondary fw-semibold">
                                                    <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                        {/* <img src={pria} alt="" className="img-fluid rounded-circle" /> */}
                                                    </span>
                                                </h2>
                                            </span>
                                        </div>
                                        {/* <h5 className="card-title mb-1">{namaPasien}</h5> */}
                                        {/* <p className="text-muted mb-0">Graphic Designer</p> */}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <div className="live-preview">
                                            <div className="d-flex flex-column gap-2">
                                                {/* <Button color="info" className="btn-animation" data-text="Registrasi" onClick={() => handleClickButton('registrasi')}><span>Registrasi</span></Button>
                                                    <Button color="info" className="btn-animation" data-text="Pengkajian Medis" onClick={() => handleClickButton('pengkajian')}> <span>Pengkajian Medis</span> </Button> */}
                                            </div>
                                        </div>
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
                                                <Col sm={3}>
                                                    <KontainerFlatpickr
                                                        options={{
                                                            // mode: "range",
                                                            dateFormat: "Y-m-d",
                                                            defaultDate: "today"
                                                        }}
                                                        value={dateNow}
                                                        onChange={([dateStart]) => {
                                                            handleBeginOnChangeStart(dateStart);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={1}><h4 className='mt-2 text-center'>s/d</h4></Col>
                                                <Col sm={3}>
                                                    <KontainerFlatpickr
                                                        isError={false}
                                                        options={{
                                                            // mode: "range",
                                                            dateFormat: "Y-m-d",
                                                            defaultDate: "today"
                                                        }}
                                                        value={dateNow}
                                                        onChange={([dateEnd]) => {
                                                            handleBeginOnChangeEnd(dateEnd);
                                                        }}
                                                    />
                                                </Col>
                                                <Col lg={2}>
                                                    <CustomSelect
                                                        id="unitOrder"
                                                        name="unitOrder"
                                                        options={[]}
                                                        onChange={(e) => {
                                                            vSetValidation.setFieldValue('unitOrder', e?.value || '')
                                                        }}
                                                        value={vSetValidation.values.unitOrder}
                                                        className={`input row-header ${!!vSetValidation?.errors.unitOrder ? 'is-invalid' : ''
                                                            }`}
                                                    />
                                                    {vSetValidation.touched.unitOrder &&
                                                        !!vSetValidation.errors.unitOrder && (
                                                            <FormFeedback type="invalid">
                                                                <div>{vSetValidation.errors.unitOrder}</div>
                                                            </FormFeedback>
                                                        )}
                                                </Col>
                                                <Col lg={2}>
                                                    <Input
                                                        id="search"
                                                        name="search"
                                                        type="text"
                                                        placeholder='Search...'
                                                        value={vSetValidation.values.search}
                                                        onChange={(e) => {
                                                            vSetValidation.setFieldValue('search', e.target.value)
                                                        }}
                                                        invalid={vSetValidation.touched?.search &&
                                                            !!vSetValidation.errors?.search}
                                                    />
                                                    {vSetValidation.touched?.search
                                                        && !!vSetValidation.errors.search && (
                                                            <FormFeedback type="invalid">
                                                                <div>{vSetValidation.errors.search}</div>
                                                            </FormFeedback>
                                                        )}
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="submit" color="info" placement="top">
                                                        CARI
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardHeader>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default withRouter(DaftarOrderOperasi)