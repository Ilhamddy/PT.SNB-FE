import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
  NavLink, TabContent, TabPane, Button, Label, Input, Table,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import EmrHeader from '../../Emr/EmrHeader/EmrHeader';
import DataTable from 'react-data-table-component';
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { ToastContainer, toast } from 'react-toastify';
import {
  radiologiResetForm, listComboRadiologiGet, emrHeaderGet
} from '../../../store/actions';
import * as Yup from 'yup'
import InputTindakan from '../../Emr/InputTindakan/InputTindakan';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { getStokDarahFromUnit, getTransaksiPelayananBankDarahByNorecDp } from '../../../store/bankDarah/bankDarahSlice';
import { dateTimeLocal } from '../../../utils/format';
import { useFormik } from 'formik';
import ColLabelInput2 from '../../../Components/ColLabelInput2/ColLabelInput2';

const TransaksiPelayananBankDarah = () => {
  const { norecdp, norecap } = useParams();
  const dispatch = useDispatch();
  document.title = "Transaksi Pelayanan Bank Darah";
  const { dataPelayanan, loadingPelayanan, successPelayanan, dataCombo, dataReg } = useSelector((state) => ({
    dataPelayanan: state.bankDarahSlice.getTransaksiPelayananBankDarahByNorecDp?.data || [],
    loadingPelayanan: state.bankDarahSlice.getTransaksiPelayananBankDarahByNorecDp.loading,
    successPelayanan: state.bankDarahSlice.getTransaksiPelayananBankDarahByNorecDp.success,
    dataCombo: state.Radiologi.listComboRadiologiGet.data,
    dataReg: state.Emr.emrHeaderGet.data
  }));
  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm());
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getTransaksiPelayananBankDarahByNorecDp({ norec: norecdp }));
    dispatch(listComboRadiologiGet(''))
    dispatch(emrHeaderGet(norecap + `&norecdp=${norecdp}`))
  }, [norecap, norecdp, dispatch]);


  const columns = [
    /* {
       name: <span className='font-weight-bold fs-13'>Detail</span>,
       sortable: false,
       cell: (data) => {
         return (
           <Link onClick={() => handleClickExpertise(data)} className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
         );
       },
       width: "80px"
     },
      */
    {
      name: <span className='font-weight-bold fs-13'>Tgl Pelayanan</span>,
      selector: row => dateTimeLocal(row.tglinput),
      sortable: true,
      wrap: true,
      width: "130px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
      selector: row => row.namaproduk,
      sortable: true,
      wrap: true
    },
    {

      name: <span className='font-weight-bold fs-13'>Dokter Pengirim</span>,
      selector: row => row.pegawaipengirim,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Unit Order</span>,
      selector: row => row.unitpengirim,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>No Order</span>,
      selector: row => row.nomororder,
      sortable: true,
      wrap: true,
    },
    {

      name: <span className='font-weight-bold fs-13'>Aksi</span>,
      selector: (row) => {
        if (row.objectdetailjenisprodukfk !== 99) {
          return (
            <button className="btn btn-success"
              onClick={() => handleClickModal(row)}
            >Verifikasi Darah</button>
          );
        } else {
          return null;
        }
      },
    },
  ];
  const [pillsTab, setpillsTab] = useState("1");
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab);
    }
  };
  const taskWidgets = [
    {
      id: 1,
      label: "Transaksi Pelayanan",
    },
    {
      id: 2,
      label: "Tindakan",
    },

  ];
  const [showExpertiseModal, setshowExpertiseModal] = useState(false);
  const [norecPelayanan, setnorecPelayanan] = useState('');
  const [tempDokterPengirim, settempDokterPengirim] = useState('');
  const [tempIdRuanganPengirim, settempIdRuanganPengirim] = useState('');
  const [tempSelected, settempSelected] = useState('');
  const handleClickExpertise = (e) => {
    setshowExpertiseModal(true)
    setnorecPelayanan(e.norec)
    settempDokterPengirim(e.idpegawaipengirim)
    settempIdRuanganPengirim(e.idunitpengirim)
    settempSelected(e)
  }
  const [isModalVerifikasiOpen, setisModalVerifikasiOpen] = useState(false)
  const [selectedRow, setselectedRow] = useState()
  const handleClickModalClose = (e) => {
    setisModalVerifikasiOpen(!isModalVerifikasiOpen)
  }
  const handleClickModal = (e) => {
    if (!e) {
      toast.error('Pasien Belum Dipilih', { autoClose: 3000 });
      return;
    }
    setselectedRow(e)
    setisModalVerifikasiOpen(true)
    console.log(e)
  }
  return (
    <React.Fragment>
      <ModalVerifikasi
        isModalVerifikasiOpen={isModalVerifikasiOpen}
        toggle={() => handleClickModalClose()}
        selectedPasien={selectedRow}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Transaksi Pelayanan Bank Darah" pageTitle="Bank Darah" />
          <Row>
            <Col xxl={12}>
              <EmrHeader />
            </Col>
            <Col ccl={12}>
              <Card style={{ borderRadius: '20px' }}>
                <CardBody>
                  <div className="card-header align-items-center d-flex">
                    <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                      {taskWidgets.map((item, key) => (
                        <NavItem key={key}>
                          <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === `${item.id}`, })} onClick={() => { pillsToggle(`${item.id}`); }}>
                            <span className="fw-semibold">{item.label}</span>
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </div>
                  <TabContent activeTab={pillsTab} className="text-muted">
                    <TabPane tabId="1" id="home-1">
                      <Card>
                        <CardBody>
                          <div id="table-gridjs">
                            <DataTable
                              fixedHeader
                              fixedHeaderScrollHeight="700px"
                              columns={columns}
                              pagination
                              data={dataPelayanan}
                              progressPending={loadingPelayanan}
                              progressComponent={<LoadingTable />}
                              customStyles={tableCustomStyles}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="2" id="home-1">
                      <Card>
                        <CardBody>
                          <InputTindakan />
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const ModalVerifikasi = ({ isModalVerifikasiOpen, toggle, selectedPasien }) => {
  const dispatch = useDispatch()
  const { dataStok } = useSelector((state) => ({
    dataStok: state.bankDarahSlice.getStokDarahFromUnit?.data || [],
  }));
  const vModalVerifikasi = useFormik({
    initialValues: {
      temppasien: selectedPasien,
      stok: 0,
      kantongDiperlukan: ''
    },
    validationSchema: Yup.object({
      kantongDiperlukan: Yup.string().required('Kantong Darah Yang Diperlukan wajib diisi'),
    }),
    onSubmit: (values) => {

    },
  })
  useEffect(() => {
    if (selectedPasien?.objectgolongandarahfk !== undefined) {
      dispatch(getStokDarahFromUnit({ golongandarah: selectedPasien?.objectgolongandarahfk }));
    }
  }, [dispatch, selectedPasien?.objectgolongandarahfk])
  useEffect(() => {
    const setFF = vModalVerifikasi.setFieldValue
    setFF('stok', dataStok?.totalstok)
  }, [dataStok?.totalstok, vModalVerifikasi.setFieldValue])
  return (
    <Modal isOpen={isModalVerifikasiOpen} toggle={toggle} centered={true} size="xl" backdrop={'static'}>
      <ModalHeader
        className="modal-title"
        id="staticBackdropLabel"
        toggle={() => {
          toggle()
        }}
      >Gunakan Stok</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            vModalVerifikasi.handleSubmit();
            return false;
          }}
          className="gy-4"
          action="#">
          <Row className="gy-2">
            <ColLabelInput2 label={`Stok [${selectedPasien?.namaproduk}] saat ini `} lg={12}>
              <Input
                id="stok"
                name="stok"
                type="text"
                value={vModalVerifikasi.values.stok}
                onChange={(e) => {
                  vModalVerifikasi.setFieldValue('stok', e.target.value)
                }}
                invalid={vModalVerifikasi.touched?.stok &&
                  !!vModalVerifikasi.errors?.stok}
                disabled
              />
              {vModalVerifikasi.touched?.stok
                && !!vModalVerifikasi.errors.stok && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.stok}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Kantong Darah Yang Diperlukan' lg={12}>
              <Input
                id="kantongDiperlukan"
                name="kantongDiperlukan"
                type="number"
                value={vModalVerifikasi.values.kantongDiperlukan}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('kantongDiperlukan', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('kantongDiperlukan', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.kantongDiperlukan &&
                  !!vModalVerifikasi.errors?.kantongDiperlukan}
              />
              {vModalVerifikasi.touched?.kantongDiperlukan
                && !!vModalVerifikasi.errors.kantongDiperlukan && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.kantongDiperlukan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <p style={{ textAlign: 'center' }}>Apakah anda yakin menggunakan darah ini ?</p>
            <Col lg={12} sm={12} className="d-flex justify-content-end">
              <div className="d-flex gap-2">
                <Button type="submit" color='success' placement="top"
                  onClick={() => {
                    // handleClickModal()
                  }}>
                  Simpan
                </Button>
                <Button type="button" color='danger' placement="top"
                  onClick={() => {
                    toggle()
                  }}>
                  Batal
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default (TransaksiPelayananBankDarah);