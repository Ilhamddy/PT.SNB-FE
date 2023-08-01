import { useState, useEffect, useRef } from "react";
import { Button, 
    Card, 
    CardBody, 
    Col, 
    Container, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    FormFeedback, 
    Input, 
    Label, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { produkMasterGet } from "../../store/actions";
import Flatpickr from "react-flatpickr";
import usePageState from "../../utils/usePageState";


const PenerimaanProduk = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            nomorterima: "",
            tanggalterima: "",
            namasupplier: "",
            nomorpo: "",
            tanggalpesan: "",
            unitpesan: "",
            tanggaljatuhtempo: "",
            sumberdana: "",
            keterangan: "",
            produk: "",
            satuanjual: "",
            satuanterima: "",
            konversisatuan: "",
            jumlahterima: "",
            hargasatuankecil: "",
            hargasatuanterima: "",
            diskonpersen: "",
            diskonrupiah: "",
            ppnrupiah: "",
            ppnpersen: "",
        },
        validationSchema: Yup.object({
            nomorterima: Yup.string().required("No Terima harus diisi"),
            tanggalterima: Yup.string().required("Tanggal Terima harus diisi"),
            namasupplier: Yup.string().required("Nama Supplier harus diisi"),
            nomorpo: Yup.string().required("No PO harus diisi"),
            tanggalpesan: Yup.string().required("Tanggal Pesan harus diisi"),
            unitpesan: Yup.string().required("Unit Pesan harus diisi"),
            tanggaljatuhtempo: Yup.string().required("Tanggal Jatuh Tempo harus diisi"),
            sumberdana: Yup.string().required("Sumber Dana harus diisi"),
            keterangan: Yup.string().required("Keterangan harus diisi"),
            produk: Yup.string().required("Produk harus diisi"),
            satuanjual: Yup.string().required("Satuan Jual harus diisi"),
            satuanterima: Yup.string().required("Satuan Terima harus diisi"),
            konversisatuan: Yup.string().required("Konversi Satuan harus diisi"),
            jumlahterima: Yup.string().required("Jumlah Terima harus diisi"),
            hargasatuankecil: Yup.string().required("Harga Satuan Kecil harus diisi"),
            hargasatuanterima: Yup.string().required("Harga Satuan Terima harus diisi"),
            diskonpersen: Yup.string().required("Diskon Persen harus diisi"),
            diskonrupiah: Yup.string().required("Diskon Rupiah harus diisi"),
            ppnrupiah: Yup.string().required("PPN Rupiah harus diisi"),
            ppnpersen: Yup.string().required("PPN Persen harus diisi"),
        }),
        onSubmit: (values) => {

        }
    })
    
    return (
        <div className="page-content page-penerimaan-barang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Penerimaan Barang" pageTitle="Penerimaan Barang" />
                <Card className="p-5">
                    <Row className="mb-2">
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`nomorterima`}
                                className="form-label mt-2">
                                No Terima
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Input 
                                id={`nomorterima`}
                                name={`nomorterima`}
                                type="text"
                                value={validation.values.nomorterima} 
                                onChange={validation.handleChange}
                                invalid={validation.touched.nomorterima && !!validation.errors.nomorterima}
                                />
                            {validation.touched.nomorterima 
                                && !!validation.errors.nomorterima && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {validation.errors.nomorterima}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggalterima`}
                                className="form-label mt-2">
                                Tgl Terima
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Flatpickr
                                // value={validation.values.tglregistrasi || ""}
                                className="form-control"
                                id="tanggalterima"
                                options={{
                                    dateFormat: "Y-m-d",
                                    defaultDate: "today"
                                }}
                                onChange={([newDate]) => {
                                    validation.setFieldValue("tanggalterima", newDate.toISOString());
                                }}
                            />
                            {
                                validation.touched.tanggalterima 
                                    && !!validation.errors.tanggalterima && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.tanggalterima}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`namasupplier`}
                                className="form-label mt-2">
                                Supplier
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <CustomSelect
                                id="namasupplier"
                                name="namasupplier"
                                options={[]}
                                onChange={(e) => {
                                    validation.setFieldValue('namasupplier', e?.value || "")
                                }}
                                value={validation.values.namasupplier}
                                className={`input ${validation.errors.namasupplier ? "is-invalid" : ""}`}
                                />
                            {validation.touched.namasupplier 
                                && validation.errors.namasupplier ? (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.namasupplier}
                                        </div>
                                    </FormFeedback>
                                ) : null
                            }
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`nomorpo`}
                                className="form-label mt-2">
                                No PO
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Input 
                                id={`nomorpo`}
                                name={`nomorpo`}
                                type="text"
                                value={validation.values.nomorpo} 
                                onChange={validation.handleChange}
                                invalid={validation.touched.nomorpo && !!validation.errors.nomorpo}
                                />
                            {validation.touched.nomorpo 
                                && !!validation.errors.nomorpo ? (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {validation.errors.nomorpo}
                                    </div>
                                </FormFeedback>
                            ) : null}
                        </Col>
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggalpesan`}
                                className="form-label mt-2">
                                Tgl Pesan   
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Flatpickr
                                // value={validation.values.tglregistrasi || ""}
                                className="form-control"
                                id="tanggalpesan"
                                options={{
                                    dateFormat: "Y-m-d",
                                    defaultDate: "today"
                                }}
                                onChange={([newDate]) => {
                                    validation.setFieldValue("tanggalpesan", newDate.toISOString());
                                }}
                            />
                            {
                                validation.touched.tanggalpesan 
                                    && !!validation.errors.tanggalpesan && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.tanggalpesan}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`unitpesan`}
                                className="form-label mt-2">
                                Unit Pesan
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <CustomSelect
                                id="unitpesan"
                                name="unitpesan"
                                options={[]}
                                onChange={(e) => {
                                    validation.setFieldValue('unitpesan', e?.value || "")
                                }}
                                value={validation.values.unitpesan}
                                className={`input ${validation.errors.unitpesan ? "is-invalid" : ""}`}
                                />
                            {validation.touched.unitpesan 
                                && !!validation.errors.unitpesan && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.unitpesan}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`tanggaljatuhtempo`}
                                className="form-label mt-2">
                                Tgl J.Tempo  
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Flatpickr
                                // value={validation.values.tglregistrasi || ""}
                                className="form-control"
                                id="tanggaljatuhtempo"
                                options={{
                                    dateFormat: "Y-m-d",
                                    defaultDate: "today"
                                }}
                                onChange={([newDate]) => {
                                    validation.setFieldValue("tanggaljatuhtempo", newDate.toISOString());
                                }}
                            />
                            {
                                validation.touched.tanggaljatuhtempo 
                                    && !!validation.errors.tanggaljatuhtempo && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.tanggaljatuhtempo}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`sumberdana`}
                                className="form-label mt-2">
                                Sbr Dana
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Input 
                                id={`sumberdana`}
                                name={`sumberdana`}
                                type="text"
                                value={validation.values.sumberdana} 
                                onChange={validation.handleChange}
                                invalid={validation.touched.sumberdana 
                                    && !!validation.errors.sumberdana}
                                />
                            {validation.touched.sumberdana 
                                && !!validation.errors.sumberdana && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {validation.errors.sumberdana}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={1}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`keterangan`}
                                className="form-label mt-2">
                                Keterangan
                            </Label>
                        </Col>
                        <Col lg={3}>
                            <Input 
                                id={`keterangan`}
                                name={`keterangan`}
                                type="text"
                                value={validation.values.keterangan} 
                                onChange={validation.handleChange}
                                invalid={validation.touched.keterangan 
                                    && !!validation.errors.keterangan}
                                />
                            {validation.touched.keterangan 
                                && !!validation.errors.keterangan && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {validation.errors.keterangan}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                    </Row>
                </Card>
                <Card className="p-5">
                    <Row className="mb-2">
                        <Col lg={4}>
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`produk`}
                                className="form-label mt-2">
                                Nama Produk
                            </Label>
                            <CustomSelect
                                id="produk"
                                name="produk"
                                options={[]}
                                onChange={(e) => {
                                    validation.setFieldValue('produk', e?.value || "")
                                }}
                                value={validation.values.produk}
                                className={`input ${validation.errors.produk ? "is-invalid" : ""}`}
                                />
                            {validation.touched.produk 
                                && !!validation.errors.produk && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {validation.errors.produk}
                                    </div>
                                </FormFeedback>
                            )}
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`satuanjual`}
                                        className="form-label mt-2">
                                        Satuan Jual
                                    </Label>
                                    <CustomSelect
                                        id="satuanjual"
                                        name="satuanjual"
                                        options={[]}
                                        onChange={(e) => {
                                            validation.setFieldValue('satuanjual', e?.value || "")
                                        }}
                                        value={validation.values.satuanjual}
                                        className={`input ${validation.errors.satuanjual ? "is-invalid" : ""}`}
                                        />
                                    {validation.touched.satuanjual 
                                        && !!validation.errors.satuanjual && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.satuanjual}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`satuanterima`}
                                        className="form-label mt-2">
                                        Satuan Penerimaan
                                    </Label>
                                    <CustomSelect
                                        id="satuanterima"
                                        name="satuanterima"
                                        options={[]}
                                        onChange={(e) => {
                                            validation.setFieldValue('satuanterima', e?.value || "")
                                        }}
                                        value={validation.values.satuanterima}
                                        className={`input ${validation.errors.satuanterima ? "is-invalid" : ""}`}
                                        />
                                    {validation.touched.satuanterima 
                                        && !!validation.errors.satuanterima && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.satuanterima}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`konversisatuan`}
                                        className="form-label mt-2">
                                        Konversi Satuan
                                    </Label>
                                    <CustomSelect
                                        id="konversisatuan"
                                        name="konversisatuan"
                                        options={[]}
                                        onChange={(e) => {
                                            validation.setFieldValue('konversisatuan', e?.value || "")
                                        }}
                                        value={validation.values.konversisatuan}
                                        className={`input ${validation.errors.konversisatuan ? "is-invalid" : ""}`}
                                        />
                                    {validation.touched.konversisatuan 
                                        && !!validation.errors.konversisatuan && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.konversisatuan}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`jumlahterima`}
                                        className="form-label mt-2">
                                        Jumlah Terima
                                    </Label>
                                    <CustomSelect
                                        id="jumlahterima"
                                        name="jumlahterima"
                                        options={[]}
                                        onChange={(e) => {
                                            validation.setFieldValue('jumlahterima', e?.value || "")
                                        }}
                                        value={validation.values.jumlahterima}
                                        className={`input ${validation.errors.jumlahterima ? "is-invalid" : ""}`}
                                        />
                                    {validation.touched.jumlahterima 
                                        && !!validation.errors.jumlahterima && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.jumlahterima}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={4}>
                            <Row>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`hargasatuankecil`}
                                        className="form-label mt-2">
                                        Harga Satuan Kecil
                                    </Label>
                                    <Input 
                                        id={`hargasatuankecil`}
                                        name={`hargasatuankecil`}
                                        type="text"
                                        value={validation.values.hargasatuankecil} 
                                        onChange={validation.handleChange}
                                        invalid={validation.touched.hargasatuankecil && !!validation.errors.hargasatuankecil}
                                        />
                                    {validation.touched.hargasatuankecil 
                                        && !!validation.errors.hargasatuankecil && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.hargasatuankecil}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`hargasatuanterima`}
                                        className="form-label mt-2">
                                        Harga Satuan Terima
                                    </Label>
                                    <Input 
                                        id={`hargasatuanterima`}
                                        name={`hargasatuanterima`}
                                        type="text"
                                        value={validation.values.hargasatuanterima} 
                                        onChange={validation.handleChange}
                                        invalid={validation.touched.hargasatuanterima && !!validation.errors.hargasatuanterima}
                                        />
                                    {validation.touched.hargasatuanterima 
                                        && !!validation.errors.hargasatuanterima && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.hargasatuanterima}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`diskonpersen`}
                                        className="form-label mt-2">
                                        Diskon (%)
                                    </Label>
                                    <Input 
                                        id={`diskonpersen`}
                                        name={`diskonpersen`}
                                        type="text"
                                        value={validation.values.diskonpersen} 
                                        onChange={validation.handleChange}
                                        invalid={validation.touched.diskonpersen && !!validation.errors.diskonpersen}
                                        />
                                    {validation.touched.diskonpersen 
                                        && !!validation.errors.diskonpersen && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.diskonpersen}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`diskonrupiah`}
                                        className="form-label mt-2">
                                        Diskon (Rp)
                                    </Label>
                                    <Input 
                                        id={`diskonrupiah`}
                                        name={`diskonrupiah`}
                                        type="text"
                                        value={validation.values.diskonrupiah} 
                                        onChange={validation.handleChange}
                                        invalid={validation.touched.diskonrupiah 
                                            && !!validation.errors.diskonrupiah}
                                        />
                                    {validation.touched.diskonrupiah 
                                        && !!validation.errors.diskonrupiah && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.diskonrupiah }
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`ppnpersen`}
                                        className="form-label mt-2">
                                        PPn (%)
                                    </Label>
                                    <Input 
                                        id={`ppnpersen`}
                                        name={`ppnpersen`}
                                        type="text"
                                        value={validation.values.ppnpersen} 
                                        onChange={validation.handleChange}
                                        invalid={validation.touched.ppnpersen 
                                            && !!validation.errors.ppnpersen}
                                        />
                                    {validation.touched.ppnpersen 
                                        && !!validation.errors.ppnpersen && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.ppnpersen}
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                                <Col lg={6}>
                                    <Label 
                                        style={{ color: "black" }} 
                                        htmlFor={`ppnrupiah`}
                                        className="form-label mt-2">
                                        PPn (Rp)
                                    </Label>
                                    <Input 
                                        id={`ppnrupiah`}
                                        name={`ppnrupiah`}
                                        type="text"
                                        value={validation.values.ppnrupiah} 
                                        onChange={validation.handleChange}
                                        invalid={validation.touched.ppnrupiah 
                                            && !!validation.errors.ppnrupiah}
                                        />
                                    {validation.touched.ppnrupiah 
                                        && !!validation.errors.ppnrupiah && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.ppnrupiah }
                                            </div>
                                        </FormFeedback>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}


const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#B57602'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },

    }
}


export default PenerimaanProduk;