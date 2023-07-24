import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import CustomSelect from "../../../pages/Select/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { dateISOString, dateTimeISOString, onChangeStrNbr } from "../../../utils/format";
import { rgxAllNumber, rgxAllPeriods } from "../../../utils/regexcommon";
import { comboPaymentGet } from "../../../store/master/action";
import { useEffect } from "react";
import { buktiBayarCreate } from "../../../store/payment/action";

const dateAwalStart = dateTimeISOString(new Date(new Date() - 1000 * 60 * 60 * 24 * 3));
const dateAwalEnd = dateISOString(new Date())
const date = new Date()

const DepositModal = ({toggle, norecdp}) => {
    const dispatch = useDispatch();

    let {
        comboboxpayment,
    } = useSelector((state) => ({
        comboboxpayment: state.Master.comboPaymentGet.data,
    }))
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            totaltagihan: "",
            diskon: 0,
            deposit: 0,
            nobukti: `B${date.getFullYear().toString().substring(2, 4)}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
            norecnota: "",
            klaim: 0,
            norecdp: norecdp,
            pjpasien: "",
            keterangan: "",
            isdeposit: true,
            payment: [{
                metodebayar: "",
                nontunai: "",
                pjpasien: "",
                approvalcode: "",
                nominalbayar: "",
                tglbayar: dateAwalStart,
                rekeningrs: ""
            }]
        },
        validationSchema: Yup.object({
            totaltagihan: Yup.string().required("Total Tagihan harus diisi"),
            diskon: Yup.string().required("Diskon harus diisi"),
            payment: Yup.array().of(
                Yup.object().shape({
                    metodebayar: Yup.string().required("Metode Pembayaran harus diisi"),
                    nontunai: Yup.string().when("metodebayar", {
                        is: (val) => val === "2",
                        then: () => Yup.string().required("Metode non tunai harus diisi"),
                    }),
                    nominalbayar: Yup.string().required("Nominal Bayar harus diisi"),
                    tglbayar: Yup.string()
                        .required("Tanggal Bayar harus diisi"),
                    rekeningrs: Yup.string().when("metodebayar", {
                        is: (val) => val === "2",
                        then: () => Yup.string().required("Rekening RS harus diisi"),
                    }),
                })
            ),
            pjpasien: Yup.string().required("Diterima Dari harus diisi"),
            // non wajib
            deposit: Yup.string().required("Deposit harus diisi"),
            keterangan: Yup.string().required("Keterangan harus diisi"),
            nobukti: Yup.string().required("No Bukti harus diisi"),
            klaim: Yup.string().required("Klaim harus diisi"),
            norecdp: Yup.string().required("No DP harus diisi"),
        }),
        onSubmit: (values) => {
            let valuesSent = {...values}
            valuesSent.payment = valuesSent.payment.map((payment) => {
                let newPayment = {...payment}
                newPayment.nominalbayar 
                    = Number(newPayment.nominalbayar.replace(rgxAllPeriods, "")) 
                return newPayment
            })
            dispatch(buktiBayarCreate(valuesSent, () => {
                toggle();
            }))
        }
    })

    const addPayment = () => {
        let newPayments = [...validation.values.payment];
        newPayments.push({
            metodebayar: "",
            nontunai: "",
            pjpasien: "",
            nominalbayar: "",
            tglbayar: dateAwalStart,
            rekeningrs: "",
            approvalcode: ""
        });
        validation.setFieldValue("payment", newPayments);
    }

    const deleteLastPayment = () => {
        let newPayments = [...validation.values.payment];
        newPayments.pop();
        validation.setFieldValue("payment", newPayments);
    }

    const changePayment = (fieldname, index, newvalue) => {
        let newPayments = [...validation.values.payment];
        let newPayment = {...newPayments[index]};
        newPayment[fieldname] = newvalue;
        newPayments[index] = newPayment;
        const totalPayment = newPayments.reduce((acc, curr) => {
            return acc + Number(curr.nominalbayar);
        }, 0);
        validation.setFieldValue("totaltagihan", totalPayment)
        validation.setFieldValue("payment", newPayments);
    }


    const filterRekeningRs = (rekeningRs, nontunaiV) => {
        return rekeningRs?.filter(
            (rekening) => rekening.objectbankfk === nontunaiV
        );
    }

    useEffect(() => {
        dispatch(comboPaymentGet())
    }, [dispatch])

    return(
        <Modal isOpen={!!norecdp} toggle={() => toggle()} centered={true} size="xl">
            <ModalBody className="py-12 px-12">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(validation.errors)
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Card className="p-3">
                        {validation.values.payment.map((itemP, index) => 
                            <Row key={index} className="mb-5">
                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <Label style={{ color: "black" }} htmlFor={`metodebayar${index}`} className="form-label">
                                            Metode Pembayaran {index + 1}
                                        </Label>
                                        <div>
                                            <CustomSelect
                                                id={`metodebayar${index}`}
                                                name={`metodebayar${index}`}
                                                options={comboboxpayment?.metodeBayar || []}
                                                onChange={e => 
                                                    changePayment('metodebayar', index, e.value)
                                                }
                                                value={itemP.metodebayar || ""}
                                                className={`input ${validation.errors.payment?.[index]?.metodebayar ? "is-invalid" : ""}`}
                                            />
                                            {validation.touched.payment?.[index]?.metodebayar && validation.errors.payment?.[index]?.metodebayar && (
                                                <FormFeedback type="invalid"><div>{validation.errors.payment?.[index]?.metodebayar}</div></FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                    {itemP.metodebayar === 2 &&
                                        <Col xxl={6} md={6}>
                                            <Card>
                                                <CardHeader>
                                                    Non Tunai
                                                </CardHeader>
                                                <CardBody>
                                                    <div className="d-flex flex-column">
                                                    {(comboboxpayment?.nontunai || []).map((data, key) => 
                                                        <div className="d-flex flex-row" key={key}>
                                                            <Input 
                                                                className="form-check-input" 
                                                                type="radio" 
                                                                id={`radio-payment-${key}-${index}`}   
                                                                checked={itemP.nontunai === data.value}
                                                                readOnly
                                                                onClick={e => { 
                                                                    changePayment('nontunai', index, data.value)
                                                                }}/>
                                                            <Label className="form-check-label ms-2" 
                                                                htmlFor={`radio-payment-${key}-${index}`} 
                                                                style={{ color: "black" }} >
                                                                {data.label}
                                                            </Label>
                                                        </div>
                                                    )}
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    }
                                </Row>
                                    <Row className="mb-2">
                                    {itemP.metodebayar === 2 && 
                                        <>
                                            <Label 
                                                style={{ color: "black" }} 
                                                htmlFor={`approvalcode${index}`}
                                                className="form-label">
                                                No. Reference
                                            </Label>
                                            <div>
                                                <Input 
                                                    id={`approvalcode${index}`}
                                                    name={`approvalcode${index}`}
                                                    type="text"
                                                    value={itemP.approvalcode || ""} 
                                                    onChange={(e) => {
                                                        rgxAllNumber.test(e.target.value) &&
                                                            changePayment("approvalcode", index, e.target.value);
                                                    }}
                                                    invalid={validation.touched.payment?.[index]?.approvalcode && !!validation.errors.payment?.[index]?.approvalcode}
                                                    />
                                                {validation.touched.payment?.[index]?.approvalcode && validation.errors.payment?.[index]?.approvalcode ? (
                                                    <FormFeedback type="invalid" ><div>{validation.errors.payment?.[index]?.approvalcode}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </>
                                    }
                                    <Label style={{ color: "black" }} 
                                        htmlFor={`keterangan${index}`}
                                        className="form-label">
                                        Nominal bayar
                                    </Label>
                                    <div>
                                        <Input 
                                            id={`nominalbayar${index}}`}
                                            name={`nominalbayar${index}`}
                                            type="string"
                                            placeholder="Masukkan nominal bayar"
                                            className="form-control"
                                            onChange={(e) => {
                                                changePayment("nominalbayar",
                                                    index,
                                                    onChangeStrNbr(
                                                        e.target.value, 
                                                        itemP.nominalbayar
                                                    ))  
                                            }}
                                            invalid={validation.touched.payment?.[index]?.nominalbayar && !!validation.errors.payment?.[index]?.nominalbayar}
                                            value={itemP.nominalbayar || ""} />
                                        {validation.touched.payment?.[index]?.nominalbayar && validation.errors.payment?.[index]?.nominalbayar ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.payment?.[index]?.nominalbayar}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                    {itemP.metodebayar === 2 &&
                                        <>
                                            <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                                Rekening RS
                                            </Label>
                                            <div>
                                                <CustomSelect
                                                    id={`rekeningrs${index}}`}
                                                    name={`rekeningrs${index}`}
                                                    options={filterRekeningRs(comboboxpayment?.rekeningRs || [], itemP.nontunai)}
                                                    onChange={(e) => {
                                                        changePayment("rekeningrs", index, e.value);
                                                    }}
                                                    className={`input ${validation.errors.payment?.[index]?.rekeningrs ? "is-invalid" : ""}`}
                                                />
                                                {validation.touched.payment?.[index]?.rekeningrs && validation.errors.payment?.[index]?.rekeningrs ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.payment?.[index]?.rekeningrs}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </>
                                    }
                                </Row>
                                {/* {index === validation.values.payment.length - 1 && 
                                <div className="d-flex flex-column align-items-center">
                                    <Row>
                                        <Col lg={5}>
                                            <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => addPayment()}>
                                                +
                                            </Button>
                                        </Col>
                                        {
                                            validation.values.payment.length > 1 && <Col lg={5}>
                                                <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => deleteLastPayment()}>
                                                    -
                                                </Button>
                                            </Col>
                                        }
                                    </Row>
                                </div>
                                } */}
                            </Row>
                        )}
                        <Row className="mb-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`pjpasien`}
                                className="form-label">
                                Sudah diterima dari
                            </Label>
                            <div>
                                <Input 
                                    id={`pjpasien`}
                                    name={`pjpasien`}
                                    type="text"
                                    onChange={validation.handleChange}
                                    value={validation.values.pjpasien || ""} 
                                    invalid={validation.touched.pjpasien && !!validation.errors.pjpasien}
                                    />
                                {validation.touched.pjpasien && validation.errors.pjpasien ? (
                                    <FormFeedback type="invalid" ><div>{validation.errors.pjpasien}</div></FormFeedback>
                                ) : null}
                            </div>
                        </Row>
                        <Row className="mb-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor={`keterangan`}
                                className="form-label">
                                Keterangan bayar
                            </Label>
                            <div>
                                <Input 
                                    id={`keterangan`}
                                    name={`keterangan`}
                                    type="text"
                                    value={validation.values.keterangan || ""} 
                                    onChange={validation.handleChange}
                                    invalid={validation.touched.keterangan && !!validation.errors.keterangan}
                                    />
                                {validation.touched.keterangan && validation.errors.keterangan ? (
                                    <FormFeedback type="invalid" ><div>{validation.errors.keterangan}</div></FormFeedback>
                                ) : null}
                            </div>
                        </Row>
                        <Row>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                    Simpan
                                </Button>
                                <button
                                    type="button"
                                    className="btn w-sm btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => toggle()}
                                >
                                    Batal
                                </button>
                            </div>
                        </Row>
                    </Card>
                </Form>
            </ModalBody>
        </Modal>
        
    )
}

export default DepositModal;