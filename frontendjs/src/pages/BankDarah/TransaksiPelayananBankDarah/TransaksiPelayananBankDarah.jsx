import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import EmrHeader from '../../Emr/EmrHeader/EmrHeader'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import {
  radiologiResetForm,
  listComboRadiologiGet,
  emrHeaderGet,
} from '../../../store/actions'
import * as Yup from 'yup'
import InputTindakan from '../../Emr/InputTindakan/InputTindakan';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { getStokDarahFromUnit, getTransaksiPelayananBankDarahByNorecDp, postUpsertPelayananLabuDarah } from '../../../store/bankDarah/bankDarahSlice';
import { dateTimeLocal } from '../../../utils/format';
import { useFormik } from 'formik';
import ColLabelInput2 from '../../../Components/ColLabelInput2/ColLabelInput2';
import { useSelectorRoot } from '../../../store/reducers';
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import PrintTemplate from '../../Print/PrintTemplate/PrintTemplate';
import PrintSuratPermintaanDarah from '../../Print/PrintSuratPermintaanDarah/PrintSuratPermintaanDarah';
import ModalApp from '../../../Components/Common/ModalApp'

const TransaksiPelayananBankDarah = () => {
  const { norecdp, norecap } = useParams()
  const dispatch = useDispatch()
  document.title = 'Transaksi Pelayanan Bank Darah'
  const {
    dataPelayanan,
    loadingPelayanan,
    successPelayanan,
    dataCombo,
    dataReg,
  } = useSelector((state) => ({
    dataPelayanan:
      state.bankDarahSlice.getTransaksiPelayananBankDarahByNorecDp?.data || [],
    loadingPelayanan:
      state.bankDarahSlice.getTransaksiPelayananBankDarahByNorecDp.loading,
    successPelayanan:
      state.bankDarahSlice.getTransaksiPelayananBankDarahByNorecDp.success,
    dataCombo: state.Radiologi.listComboRadiologiGet.data,
    dataReg: state.Emr.emrHeaderGet.data,
  }))
  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getTransaksiPelayananBankDarahByNorecDp({ norec: norecdp }))
    dispatch(listComboRadiologiGet(''))
    dispatch(emrHeaderGet(norecap + `&norecdp=${norecdp}`))
  }, [norecap, norecdp, dispatch])

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
      name: <span className="font-weight-bold fs-13">Tgl Pelayanan</span>,
      selector: (row) => dateTimeLocal(row.tglinput),
      sortable: true,
      wrap: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Pemeriksaan</span>,
      selector: (row) => row.namaproduk,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Dokter Pengirim</span>,
      selector: (row) => row.pegawaipengirim,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Order</span>,
      selector: (row) => row.unitpengirim,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Aksi</span>,
      selector: (row) => {
        if (row.objectdetailjenisprodukfk !== 99 && row.isdarah === false) {
          return (
            <button
              className="btn btn-success"
              onClick={() => handleClickModal(row)}
            >
              Gunakan Darah
            </button>
          )
        } else {
          return null
        }
      },
    },
  ]
  const [pillsTab, setpillsTab] = useState('1')
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab)
    }
  }
  const taskWidgets = [
    {
      id: 1,
      label: 'Transaksi Pelayanan',
    },
    {
      id: 2,
      label: 'Tindakan',
    },
  ]
  const [showExpertiseModal, setshowExpertiseModal] = useState(false)
  const [norecPelayanan, setnorecPelayanan] = useState('')
  const [tempDokterPengirim, settempDokterPengirim] = useState('')
  const [tempIdRuanganPengirim, settempIdRuanganPengirim] = useState('')
  const [tempSelected, settempSelected] = useState('')
  const handleClickExpertise = (e) => {
    setshowExpertiseModal(true)
    setnorecPelayanan(e.norec)
    settempDokterPengirim(e.idpegawaipengirim)
    settempIdRuanganPengirim(e.idunitpengirim)
    settempSelected(e)
  }
  const [isModalVerifikasiOpen, setisModalVerifikasiOpen] = useState(false)
  const [isModalPermintaanDarahOpen, setisModalPermintaanDarahOpen] =
    useState(false)
  const [selectedRow, setselectedRow] = useState()
  const handleClickModalClose = (e) => {
    setisModalVerifikasiOpen(!isModalVerifikasiOpen)
  }
  const handleClickModal = (e) => {
    if (!e) {
      toast.error('Pasien Belum Dipilih', { autoClose: 3000 })
      return
    }
    setselectedRow(e)
    setisModalVerifikasiOpen(true)
  }
  const handleClickMintaDarah = (e) => {
    setisModalVerifikasiOpen(!isModalVerifikasiOpen)
    setisModalPermintaanDarahOpen(true)
  }
  return (
    <React.Fragment>
      <ModalVerifikasi
        isModalVerifikasiOpen={isModalVerifikasiOpen}
        toggle={() => handleClickModalClose()}
        selectedPasien={selectedRow}
        mintaDarah={() => handleClickMintaDarah()}
      />
      <ModalPermintaanDarah
        isModalPermintaanDarahOpen={isModalPermintaanDarahOpen}
        toggle={() => setisModalPermintaanDarahOpen(false)}
        selectedPasien={selectedRow}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Transaksi Pelayanan Bank Darah"
            pageTitle="Bank Darah"
          />
          <Row>
            <Col xxl={12}>
              <EmrHeader />
            </Col>
            <Col ccl={12}>
              <Card style={{ borderRadius: '20px' }}>
                <CardBody>
                  <div className="card-header align-items-center d-flex">
                    <Nav
                      tabs
                      className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    >
                      {taskWidgets.map((item, key) => (
                        <NavItem key={key}>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              active: pillsTab === `${item.id}`,
                            })}
                            onClick={() => {
                              pillsToggle(`${item.id}`)
                            }}
                          >
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

const ModalVerifikasi = ({
  isModalVerifikasiOpen,
  toggle,
  selectedPasien,
  mintaDarah,
}) => {
  const dispatch = useDispatch()
  const { norecdp, norecap } = useParams()
  const { dataStok, upsert } = useSelectorRoot((state) => ({
    dataStok: state.bankDarahSlice.getStokDarahFromUnit?.data || null,
    upsert: state.bankDarahSlice.postUpsertPelayananLabuDarah,
  }))
  const vModalVerifikasi = useFormik({
    initialValues: {
      stok: 0,
      kantongDiperlukan: '',
      norecap: norecap,
      dataproduk: dataStok,
    },
    validationSchema: Yup.object({
      kantongDiperlukan: Yup.string().required(
        'Kantong Darah Yang Diperlukan wajib diisi'
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        postUpsertPelayananLabuDarah(values, () => {
          dispatch(getTransaksiPelayananBankDarahByNorecDp({ norec: norecdp }))
          toggle()
        })
      )
    },
  })
  useEffect(() => {
    if (selectedPasien?.objectgolongandarahfk !== undefined) {
      dispatch(
        getStokDarahFromUnit({
          golongandarah: selectedPasien?.objectgolongandarahfk,
        })
      )
    }
  }, [dispatch, selectedPasien?.objectgolongandarahfk])
  useEffect(() => {
    const setFF = vModalVerifikasi.setFieldValue
    setFF('stok', dataStok?.totalstok)
    setFF('dataproduk', dataStok)
  }, [dataStok, vModalVerifikasi.setFieldValue])
  return (
    <ModalApp
      labelHeader="Gunakan Stok"
      isOpen={isModalVerifikasiOpen}
      toggle={toggle}
      centered={true}
      size="xl"
      backdrop={'static'}
    >
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vModalVerifikasi.handleSubmit()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Row className="gy-2">
            <ColLabelInput2
              label={`Stok [${selectedPasien?.namaproduk}] saat ini `}
              lg={12}
            >
              <Input
                id="stok"
                name="stok"
                type="text"
                value={vModalVerifikasi.values.stok}
                onChange={(e) => {
                  vModalVerifikasi.setFieldValue('stok', e.target.value)
                }}
                invalid={
                  vModalVerifikasi.touched?.stok &&
                  !!vModalVerifikasi.errors?.stok
                }
                disabled
              />
              {vModalVerifikasi.touched?.stok &&
                !!vModalVerifikasi.errors.stok && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.stok}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label="Kantong Darah Yang Diperlukan" lg={12}>
              <Input
                id="kantongDiperlukan"
                name="kantongDiperlukan"
                type="number"
                value={vModalVerifikasi.values.kantongDiperlukan}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('kantongDiperlukan', 0)
                  } else {
                    vModalVerifikasi.setFieldValue(
                      'kantongDiperlukan',
                      e.target.value
                    )
                  }
                }}
                invalid={
                  vModalVerifikasi.touched?.kantongDiperlukan &&
                  !!vModalVerifikasi.errors?.kantongDiperlukan
                }
              />
              {vModalVerifikasi.touched?.kantongDiperlukan &&
                !!vModalVerifikasi.errors.kantongDiperlukan && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.kantongDiperlukan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <p style={{ textAlign: 'center' }}>
              Apakah anda yakin menggunakan darah ini ?
            </p>
            <Col lg={12} sm={12} className="d-flex justify-content-end">
              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  color="success"
                  placement="top"
                  onClick={() => {
                    // handleClickModal()
                  }}
                >
                  Simpan
                </Button>
                <Button
                  type="button"
                  color="info"
                  placement="top"
                  onClick={() => {
                    mintaDarah()
                  }}
                >
                  Buat Surat Permohonan Darah
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </ModalApp>
  )
}
const ModalPermintaanDarah = ({
  isModalPermintaanDarahOpen,
  toggle,
  selectedPasien,
}) => {
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { norecdp, norecap } = useParams();
  const { dataStok, upsert, editData } = useSelectorRoot((state) => ({
    dataStok: state.bankDarahSlice.getStokDarahFromUnit?.data || null,
    upsert: state.bankDarahSlice.postUpsertPelayananLabuDarah,
    editData: state.Emr.emrHeaderGet?.data,
  }));
  const vModalVerifikasi = useFormik({
    initialValues: {
      dpjp: '',
      jenisDarah: '',
      namaPasien: '',
      golDarah: '',
      noRM: '',
      untukKeperluan: '',
      diagnosa: '',
      tglDiperlukan: dateNow,
      ruangRawat: '',
      jumlahKantong: ''
    },
    validationSchema: Yup.object({
      untukKeperluan: Yup.string().required('Keperluan wajib diisi'),
      jumlahKantong: Yup.string().required('Jumlah Kantong wajib diisi'),
    }),
    onSubmit: (values) => {
      refPrintExpertise.current?.handlePrint()
    },
  })
  useEffect(() => {
    if (selectedPasien?.objectgolongandarahfk !== undefined) {
      dispatch(
        getStokDarahFromUnit({
          golongandarah: selectedPasien?.objectgolongandarahfk,
        })
      )
    }
  }, [dispatch, selectedPasien?.objectgolongandarahfk])
  useEffect(() => {
    const setFF = vModalVerifikasi.setFieldValue
    setFF('stok', dataStok?.totalstok)
    setFF('dataproduk', dataStok)
  }, [dataStok, vModalVerifikasi.setFieldValue])
  const refPrintExpertise = useRef(null)

  return (
    <ModalApp
      isOpen={isModalPermintaanDarahOpen}
      toggle={toggle}
      centered={true}
      size="xl"
      backdrop={'static'}
      labelHeader="Permintaan Darah"
    >
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            vModalVerifikasi.handleSubmit()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Row className="gy-2">
            <ColLabelInput2 label='DPJP' lg={6}>
              <Input
                id="dpjp"
                name="dpjp"
                type="text"
                value={editData?.namadokter}
                onChange={(e) => {
                  vModalVerifikasi.setFieldValue('dpjp', e.target.value)
                }}
                invalid={vModalVerifikasi.touched?.dpjp &&
                  !!vModalVerifikasi.errors?.dpjp}
                disabled
              />
              {vModalVerifikasi.touched?.dpjp
                && !!vModalVerifikasi.errors.dpjp && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.dpjp}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Jenis Darah' lg={6}>
              <Input
                id="jenisDarah"
                name="jenisDarah"
                type="text"
                value={selectedPasien?.namaproduk}
                onChange={(e) => {
                  vModalVerifikasi.setFieldValue('jenisDarah', e.target.value)
                }}
                invalid={vModalVerifikasi.touched?.jenisDarah &&
                  !!vModalVerifikasi.errors?.jenisDarah}
                disabled
              />
              {vModalVerifikasi.touched?.jenisDarah
                && !!vModalVerifikasi.errors.jenisDarah && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.jenisDarah}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Nama Pasien' lg={6}>
              <Input
                id="namaPasien"
                name="namaPasien"
                type="text"
                value={editData?.namapasien}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('namaPasien', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('namaPasien', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.namaPasien &&
                  !!vModalVerifikasi.errors?.namaPasien}
                disabled
              />
              {vModalVerifikasi.touched?.namaPasien
                && !!vModalVerifikasi.errors.namaPasien && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.namaPasien}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Gol. Darah' lg={6}>
              <Input
                id="golDarah"
                name="golDarah"
                type="text"
                value={editData?.golongandarah}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('golDarah', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('golDarah', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.golDarah &&
                  !!vModalVerifikasi.errors?.golDarah}
                disabled
              />
              {vModalVerifikasi.touched?.golDarah
                && !!vModalVerifikasi.errors.golDarah && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.golDarah}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='No. RM' lg={6}>
              <Input
                id="noRM"
                name="noRM"
                type="number"
                value={editData?.nocm}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('noRM', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('noRM', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.noRM &&
                  !!vModalVerifikasi.errors?.noRM}
                disabled
              />
              {vModalVerifikasi.touched?.noRM
                && !!vModalVerifikasi.errors.noRM && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.noRM}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Untuk Keperluan' lg={6}>
              <Input
                id="untukKeperluan"
                name="untukKeperluan"
                type="textarea"
                value={vModalVerifikasi.values.untukKeperluan}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('untukKeperluan', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('untukKeperluan', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.untukKeperluan &&
                  !!vModalVerifikasi.errors?.untukKeperluan}
              />
              {vModalVerifikasi.touched?.untukKeperluan
                && !!vModalVerifikasi.errors.untukKeperluan && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.untukKeperluan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Diagnosa' lg={6}>
              <Input
                id="diagnosa"
                name="diagnosa"
                type="text"
                value={editData?.diagnosa}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('diagnosa', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('diagnosa', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.diagnosa &&
                  !!vModalVerifikasi.errors?.diagnosa}
                disabled
              />
              {vModalVerifikasi.touched?.diagnosa
                && !!vModalVerifikasi.errors.diagnosa && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.diagnosa}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Tgl. Diperlukan' lg={6}>
              <KontainerFlatpickr
                isError={vModalVerifikasi.touched?.tglDiperlukan &&
                  !!vModalVerifikasi.errors?.tglDiperlukan}
                id="tglDiperlukan"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vModalVerifikasi.values.tglDiperlukan}
                onChange={([newDate]) => {
                  vModalVerifikasi.setFieldValue('tglDiperlukan', newDate.toISOString())
                }}
              />
              {vModalVerifikasi.touched?.tglDiperlukan
                && !!vModalVerifikasi.errors.tglDiperlukan && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.tglDiperlukan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Ruang Rawat' lg={6}>
              <Input
                id="ruangRawat"
                name="ruangRawat"
                type="text"
                value={editData?.ruangantd}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('ruangRawat', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('ruangRawat', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.ruangRawat &&
                  !!vModalVerifikasi.errors?.ruangRawat}
                disabled
              />
              {vModalVerifikasi.touched?.ruangRawat
                && !!vModalVerifikasi.errors.ruangRawat && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.ruangRawat}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <ColLabelInput2 label='Jumlah Kantong' lg={6}>
              <Input
                id="jumlahKantong"
                name="jumlahKantong"
                type="number"
                value={vModalVerifikasi.values.jumlahKantong}
                onChange={(e) => {
                  if (vModalVerifikasi.values.stok < e.target.value) {
                    vModalVerifikasi.setFieldValue('jumlahKantong', 0)
                  } else {
                    vModalVerifikasi.setFieldValue('jumlahKantong', e.target.value)
                  }
                }}
                invalid={vModalVerifikasi.touched?.jumlahKantong &&
                  !!vModalVerifikasi.errors?.jumlahKantong}
              />
              {vModalVerifikasi.touched?.jumlahKantong
                && !!vModalVerifikasi.errors.jumlahKantong && (
                  <FormFeedback type="invalid">
                    <div>{vModalVerifikasi.errors.jumlahKantong}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
            <Col lg={12} sm={12} className="d-flex justify-content-end">
              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  color="info"
                  placement="top"
                >
                  Cetak
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <PrintTemplate
        ContentPrint={
          <PrintSuratPermintaanDarah
            dataSelected={selectedPasien}
            dataPasien={editData || null}
            untukKeperluan={vModalVerifikasi.values.untukKeperluan}
            tgllayanan={vModalVerifikasi.values.tglDiperlukan}
          />
        }
        ref={refPrintExpertise}
      />
    </ModalApp>
  )
}
export default TransaksiPelayananBankDarah
