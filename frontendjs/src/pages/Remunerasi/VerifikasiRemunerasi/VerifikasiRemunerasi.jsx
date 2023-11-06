import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import { ToastContainer } from "react-toastify";
import UiContent from "../../../Components/Common/UiContent";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Label, Modal, ModalBody, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../../Select/Select";
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr";
import DataTable from "react-data-table-component";
import LoadingTable from "../../../Components/Table/LoadingTable";
import {
  getDaftarVerifikasiRemunerasi, listTagihanGet, upsertVerifikasiRemunerasi
} from '../../../store/actions';
import { comboRegistrasiGet } from '../../../store/master/action';

const VerifikasiRemunerasi = () => {
  document.title = "Verifikasi Remunerasi";
  const dispatch = useDispatch();
  const { dataGrid, loadingGrid, data } = useSelector((state) => ({
    dataGrid: state.Payment.getDaftarVerifikasiRemunerasi.data,
    loadingGrid: state.Payment.getDaftarVerifikasiRemunerasi.loading,
    data: state.Master.comboRegistrasiGet.data || [],
  }));
  const [dateNow] = useState(() => new Date().toISOString())
  const vSetValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      instalasi: '',
      unit: '',
      penjamin: '',
      tglAwal: '',
      tglAkhir: ''
    },
    validationSchema: Yup.object({
      // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
    }),
    onSubmit: (values) => {
      dispatch(getDaftarVerifikasiRemunerasi({
        tglAwal: values.tglAwal || dateNow,
        tglAkhir: values.tglAkhir || dateNow,
        instalasi: values.instalasi || '',
        unit: values.unit || '',
        penjamin: values.penjamin || ''
      }));
    }
  })
  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#ffffff',
        backgroundColor: '#e67e22',
      },
    },
    rows: {
      style: {
        color: "black",
        backgroundColor: "#f1f2f6"
      },
    }
  }
  const handleClick = (e) => {
    setselectedPasien(e)
    setisVerifikasiOpen(true)
  };
  useEffect(() => {
    dispatch(comboRegistrasiGet());
  }, [dispatch]);
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>No</span>,
      selector: row => row.no,
      sortable: true,
      width: "50px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Detail</span>,
      cell: (data) => {
        return (
          // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
          <button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>Verif</button>
        );
      },
      sortable: true,
      width: "80px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Tgl. Registrasi</span>,
      selector: row => row.tglregistrasi,
      sortable: true,
      width: "150px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Tgl. Pulang</span>,
      selector: row => row.tglpulang,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: "160px",
      wrap: true,
    },
    {

      name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
      selector: row => row.noregistrasi,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>No.RM</span>,
      selector: row => row.nocm,
      sortable: true,
      width: "100px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
      selector: row => row.namapasien,
      sortable: true,
      width: "100",
    },
    {

      name: <span className='font-weight-bold fs-13'>Penjamin</span>,
      selector: row => row.namarekanan,
      sortable: true,
      width: "100",
    },
    {

      name: <span className='font-weight-bold fs-13'>DPJP</span>,
      selector: row => row.dpjp,
      sortable: true,
      width: "100",
    },
    {

      name: <span className='font-weight-bold fs-13'>Total</span>,
      selector: row => row.total,
      sortable: true,
      width: "100",
    },
  ];
  const [isVerifikasiOpen, setisVerifikasiOpen] = useState(false);
  const [selectedPasien, setselectedPasien] = useState(null);
  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <ModalVerifikasi
        isVerifikasiOpen={isVerifikasiOpen}
        toggle={() => setisVerifikasiOpen(!isVerifikasiOpen)}
        selectedPasien={selectedPasien}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Verifikasi Remunerasi" pageTitle="Forms" />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              vSetValidation.handleSubmit();
              return false;
            }}
            className="gy-4"
            action="#">
            <Card>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <Row className="gy-2">
                      <Col lg={2}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Instalasi</Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <CustomSelect
                          id="instalasi"
                          name="instalasi"
                          options={data.instalasi || []}
                          onChange={(e) => {
                            vSetValidation.setFieldValue('instalasi', e?.value || '')
                          }}
                          value={vSetValidation.values.instalasi}
                          className={`input row-header ${!!vSetValidation?.errors.instalasi ? 'is-invalid' : ''
                            }`}
                        />
                        {vSetValidation.touched.instalasi &&
                          !!vSetValidation.errors.instalasi && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.instalasi}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={2}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Unit</Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <CustomSelect
                          id="unit"
                          name="unit"
                          options={data.unit || []}
                          onChange={(e) => {
                            vSetValidation.setFieldValue('unit', e?.value || '')
                          }}
                          value={vSetValidation.values.unit}
                          className={`input row-header ${!!vSetValidation?.errors.unit ? 'is-invalid' : ''
                            }`}
                        />
                        {vSetValidation.touched.unit &&
                          !!vSetValidation.errors.unit && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.unit}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={2}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Penjamin</Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <CustomSelect
                          id="penjamin"
                          name="penjamin"
                          options={data.rekanan || []}
                          onChange={(e) => {
                            vSetValidation.setFieldValue('penjamin', e?.value || '')
                          }}
                          value={vSetValidation.values.penjamin}
                          className={`input row-header ${!!vSetValidation?.errors.penjamin ? 'is-invalid' : ''
                            }`}
                        />
                        {vSetValidation.touched.penjamin &&
                          !!vSetValidation.errors.penjamin && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.penjamin}</div>
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <Row className="gy-2">
                      <Col lg={3}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Tanggal Pulang Pasien</Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <KontainerFlatpickr
                          isError={vSetValidation.touched?.tglAwal &&
                            !!vSetValidation.errors?.tglAwal}
                          id="tglAwal"
                          options={{
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={vSetValidation.values.tglAwal || dateNow}
                          onChange={([newDate]) => {
                            vSetValidation.setFieldValue('tglAwal', newDate.toISOString())
                          }}
                        />
                        {vSetValidation.touched?.tglAwal
                          && !!vSetValidation.errors.tglAwal && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.tglAwal}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={1}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">S/D</Label>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <KontainerFlatpickr
                          isError={vSetValidation.touched?.tglAkhir &&
                            !!vSetValidation.errors?.tglAkhir}
                          id="tglAkhir"
                          options={{
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={vSetValidation.values.tglAkhir || dateNow}
                          onChange={([newDate]) => {
                            vSetValidation.setFieldValue('tglAkhir', newDate.toISOString())
                          }}
                        />
                        {vSetValidation.touched?.tglAkhir
                          && !!vSetValidation.errors.tglAkhir && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidation.errors.tglAkhir}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={12} className="mr-3 me-3 mt-2">
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                          <Button

                            type="submit" color="info" style={{ width: '20%' }}>Cari</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={columns}
                    pagination
                    data={dataGrid}
                    progressPending={loadingGrid}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    // onRowClicked={(row) => handleClick(row)}
                    pointerOnHover
                    highlightOnHover
                  />
                </div>
              </CardBody>
            </Card>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

const ModalVerifikasi = ({ isVerifikasiOpen, toggle, selectedPasien }) => {
  const dispatch = useDispatch();
  const { dataTagihan, loadingTagihan, successTagihan } = useSelector((state) => ({
    dataTagihan: state.Emr.listTagihanGet.data,
    loadingTagihan: state.Emr.listTagihanGet.loading,
    successTagihan: state.Emr.listTagihanGet.success,
  }));
  const vSetValidationModal = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecdp: selectedPasien?.norecdp ?? '',
    },
    validationSchema: Yup.object({
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      dispatch(
        upsertVerifikasiRemunerasi(values, () => {

        })
      )
    }
  })
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>No</span>,
      selector: row => row.no,
      sortable: true,
      width: "100px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Pelayanan</span>,
      selector: row => row.namaproduk,
      sortable: true,
      width: "100px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Unit</span>,
      selector: row => row.namaunit,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Petugas</span>,
      selector: row => row.petugas,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Qty</span>,
      selector: row => row.qty,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Total</span>,
      selector: row => row.total,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className='font-weight-bold fs-13'>Cito</span>,
      selector: row => row.statuscito,
      sortable: true,
      wrap: true,
    },
  ];
  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#ffffff',
        backgroundColor: '#e67e22',
      },
    },
    rows: {
      style: {
        color: "black",
        backgroundColor: "#f1f2f6"
      },
    }
  }
  useEffect(() => {
    if (selectedPasien !== null) {
      dispatch(listTagihanGet(selectedPasien.norecdp));
    }
  }, [selectedPasien, dispatch])
  return (
    <Modal isOpen={isVerifikasiOpen} toggle={toggle} centered={true} size="xl">
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            vSetValidationModal.handleSubmit();
            return false;
          }}
          className="gy-4"
          action="#">
          <Card>
            <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
              <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Verifikasi Remunerasi</h4>
            </CardHeader>
            <CardBody>
              <Row className="gy-3">
                <Col lg={12}>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="330px"
                      columns={columns}
                      pagination
                      data={dataTagihan}
                      progressPending={loadingTagihan}
                      customStyles={tableCustomStyles}
                      progressComponent={<LoadingTable />}
                      // onRowClicked={(row) => handleClickRowChild(row)}
                      pointerOnHover
                      highlightOnHover
                    />
                  </div>
                </Col>
                <Col lg={12} className="mr-3 me-3 mt-2">
                  <div className="d-flex flex-wrap justify-content-end gap-2">
                    <Button

                      type="submit" color="success" style={{ width: '30%' }}>Simpan</Button>
                    <Button type="button" color="danger" style={{ width: '30%' }}
                    // onClick={() => { handleBack() }}
                    >Batal</Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default withRouter(VerifikasiRemunerasi)