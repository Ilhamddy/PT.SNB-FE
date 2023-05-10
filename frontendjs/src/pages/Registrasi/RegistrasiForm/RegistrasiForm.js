import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registrasiCreate } from "../../../store/registrasi/action";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const RegistrasiForm = () => {
    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => ({
        loading: state.Registrasi.registrasiCreate.loading,
        error: state.Registrasi.registrasiCreate.error,
    }));

    const validation = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({
            "namapasien": Yup.string().required("Nama pasien wajib diisi"),
            "noidentitas": Yup.string().required("Nomor identitas wajib diisi"),
            "nobpjs": Yup.string().required("Nomor BPJS wajib diisi"),
            "nohp": Yup.string().required("Nomor handphone wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(registrasiCreate(values));
        }
    });

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien Baru" pageTitle="Registrasi Pasien Baru" />
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Form Registrasi Pasien Baru</h4>
                            </CardHeader>
                            <CardBody>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegistrasiForm;