import React, { useEffect, useState, useCallback } from 'react'
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
  FormFeedback,
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  registrasiGetList,
  registrasiGetListByOr,
  upsertPatient,
} from '../../../store/actions'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import PreviewCardHeaderNew from '../../../Components/Common/PreviewCardHeaderNew'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import withRouter from '../../../Components/Common/withRouter'
import DataTable from 'react-data-table-component'
import * as Yup from 'yup'
//import images

import patient from '../../../assets/images/users/icons8-patient-64.png'

import { ToastContainer, toast } from 'react-toastify'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { dateLocal, onChangeStrNbr } from '../../../utils/format'
import ActionPasienRegistrasi, {
  initProfil,
} from '../../../Components/ActionPasienRegistrasi/ActionPasienRegistrasi'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import { useFormik } from 'formik'
import {
  getNoRMLast,
  updateNoRM,
} from '../../../store/registrasi/registrasiSlice'
import { rgxAllNumber } from '../../../utils/regexcommon'
import ServiceRegistrasiValidation from '../../../services/registrasi/service-registrasi-validation'

const initialNoRMManual = {
  idPasien: '',
  norm: '',
}

const RegistrasiList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, count, loading, error } = useSelector((state) => ({
    data: state.Registrasi.registrasiList.data?.pasien,
    count: state.Registrasi.registrasiList.data?.count,

    loading: state.Registrasi.registrasiList.loading,
    error: state.Registrasi.registrasiList.error,
  }))

  const [noRMManual, setNoRMManual] = useState(initialNoRMManual)

  // Profil
  const [profil, setProfil] = useState({
    profile: null,
    namaPasien: null,
    noIdentitas: null,
    norm: null,
    nohp: null,
    alamat: null,
    search: null,
    idcmfk: null,
    jeniskelamin: null,
    golongandarah: null,
    alamatdomisili: null,
    namaibu: null,
    pendidikan: null,
    pekerjaan: null,
    agama: null,
    statusperkawinan: null,
    namasuamiistri: null,
    ihs_id: null,
    ihs_code: null,
    ihs_display: null,
    ihs_jeniskelamin: null,
    tgllahir: null,
    namakabupaten: null,
    kodepos: null,
    kodedesa: null,
    kodekecamatan: null,
    kodekabupaten: null,
    kodeprovinsi: null,
    rtktp: null,
    rwktp: null,
  })
  const vFilter = useFormik({
    initialValues: {
      nocm: '',
      page: 1,
      perPage: 10,
    },
    onSubmit: (values) => {
      dispatch(registrasiGetList(values))
    },
  })
  const [statusNotif, setstatusNotif] = useState(false)

  const handleClick = (e) => {
    setProfil({
      ...initProfil,
      profile: e.profile,
      namaPasien: e.namapasien,
      noIdentitas: e.noidentitas,
      norm: e.nocm,
      nohp: e.nohp,
      notelepon: e.notelepon,
      alamat: e.alamatrmh,
      idcmfk: e.id,
      jeniskelamin: e.jeniskelamin,
      golongandarah: e.golongandarah,
      alamatdomisili: e.alamatdomisili,
      namaibu: e.namaibu,
      pendidikan: e.pendidikan,
      pekerjaan: e.pekerjaan,
      agama: e.agama,
      statusperkawinan: e.statusperkawinan,
      namasuamiistri: e.namasuamiistri,
      ihs_id: e.ihs_id,
      ihs_code: e.ihs_code,
      ihs_display: e.ihs_display,
      nohppasien: e.nohp,
      ihs_jeniskelamin: e.ihs_jeniskelamin,
      tgllahir: e.tgllahir,
      namakabupaten: e.namakabupaten,
      kodepos: e.kodepos,
      kodedesa: e.kodedesa,
      kodekecamatan: e.kodekecamatan,
      kodekabupaten: e.kodekabupaten,
      kodeprovinsi: e.kodeprovinsi,
      rtktp: e.rtktp,
      rwktp: e.rwktp,
    })
  }

  const handleFilter = (e) => {
    if (e.keyCode === 13) {
      vFilter.handleSubmit()
    }
  }

  document.title = 'Pasien Lama'

  useEffect(() => {
    const submit = vFilter.handleSubmit
    submit()
  }, [dispatch, vFilter.handleSubmit])

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No. RM</span>,
      selector: (row) => row.nocm,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No. Identitas</span>,
      selector: (row) => row.noidentitas,
      sortable: true,
      width: '180px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No. BPJS</span>,
      selector: (row) => row.nobpjs,
      sortable: true,
      width: '180px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl. Lahir</span>,
      selector: (row) => dateLocal(row.tgllahir),
      sortable: false,
      width: '160px',
    },
    {
      name: <span className="font-weight-bold fs-13">Alamat KTP</span>,
      selector: (row) => {
        let newAlamat = row.alamatrmh || ''
        newAlamat =
          newAlamat.length > 30 ? newAlamat.substring(0, 29) + '...' : newAlamat
        return newAlamat
      },
      sortable: false,
      width: '150px',
      wrap: true,
    },
  ]

  const buttonAction = [
    {
      name: 'Registrasi',
      onClick: (profil) => {
        let values = {
          id: profil?.idcmfk,
          noidentitas: profil?.noIdentitas,
          ihs_code: profil?.ihs_code,
          ihs_display: profil?.ihs_display,
          namapasien: profil?.namaPasien,
          nohppasien: profil?.nohppasien,
          ihs_jeniskelamin: profil?.ihs_jeniskelamin,
          tgllahir: profil?.tgllahir,
          alamat: profil?.alamat,
          namakabupaten: profil?.namakabupaten,
          kodepos: profil?.kodepos,
          kodedesa: profil?.kodedesa,
          kodekecamatan: profil?.kodekecamatan,
          kodekabupaten: profil?.kodekabupaten,
          kodeprovinsi: profil?.kodeprovinsi,
          rtktp: profil?.rtktp,
          rwktp: profil?.rwktp,
        }
        if (profil?.ihs_id === null && profil?.noIdentitas !== null) {
          dispatch(upsertPatient(values, () => {}))
        }
        navigate(`/registrasi/pasien-ruangan/${profil?.idcmfk}`)
      },
    },
    {
      name: 'Edit Data Pasien',
      onClick: (profil) => {
        navigate(`/registrasi/pasien-baru/${profil?.idcmfk}`)
      },
    },
    {
      name: 'Cetak Kartu Pasien',
      onClick: (profil) => {
        navigate(`/registrasi/pasien-baru/${profil?.idcmfk}`)
      },
    },
    {
      name: 'Cek kepesertaan',
      onClick: (profil) => {},
    },
    {
      name: 'Cek Rujukan',
      onClick: (profil) => {},
    },
    {
      name: '[BPJS] Buat Surkon/SPRI',
      onClick: (profil) => {},
    },
    {
      name: 'Cetak Kartu Pasien',
      onClick: (profil) => {},
    },
    {
      name: 'Cetak Label Pasien',
      onClick: (profil) => {},
    },
    {
      name: 'No RM Manual',
      onClick: (profil) => {
        setNoRMManual({
          ...initialNoRMManual,
          idPasien: profil.idcmfk,
          norm: profil.norm,
        })
      },
    },
  ]

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <ModalNoRMManual
          noRMManual={noRMManual}
          setNoRMManual={setNoRMManual}
        />
        <Container fluid>
          <BreadCrumb title="Pasien Lama" pageTitle="Forms" />
          <Row>
            <Col lg={3}>
              <ActionPasienRegistrasi
                profil={profil}
                buttonAction={buttonAction}
              />
            </Col>
            <Col lg={9}>
              <Card>
                <CardHeader className="card-header-snb">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>
                    Daftar Pasien Lama
                  </h4>
                </CardHeader>
                <CardBody>
                  <div id="table-gridjs">
                    <Col className="col-sm mb-3">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            onChange={(event) =>
                              vFilter.setFieldValue('nocm', event.target.value)
                            }
                            onKeyDown={handleFilter}
                            placeholder="Search..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </Col>
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="1600px"
                      columns={columns}
                      pagination
                      paginationServer
                      paginationTotalRows={count}
                      onChangeRowsPerPage={(perPage) => {
                        vFilter.setFieldValue('perPage', perPage)
                        vFilter.handleSubmit()
                      }}
                      onChangePage={(page) => {
                        vFilter.setFieldValue('page', page)
                        vFilter.handleSubmit()
                      }}
                      data={data}
                      progressPending={loading}
                      customStyles={tableCustomStyles}
                      onRowClicked={(row) => handleClick(row)}
                      pointerOnHover
                      highlightOnHover
                      progressComponent={<LoadingTable />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const ModalNoRMManual = ({ noRMManual, setNoRMManual, ...rest }) => {
  const dispatch = useDispatch()
  const last = useSelector(
    (state) => state.registrasiSlice.getNoRMLast.data?.max || '99999999'
  )
  const vNoRMManual = useFormik({
    enableReinitialize: true,
    initialValues: {
      idpasien: '',
      norm: '',
    },
    validationSchema: Yup.object({
      norm: Yup.string()
        .required('No RM Wajib diisi')
        .min(8, 'Harus 8 digit')
        .max(8, 'Harus 8 digit')
        .test(
          'norm-available',
          'Pengguna Sudah ada',
          async (value, { createError }) => {
            try {
              const serviceValidation = new ServiceRegistrasiValidation()
              const response = await serviceValidation.getNoRMLast({
                norm: value,
              })
              if (!response.data.msgAvailable) return true
              return createError({ message: response.data.msgAvailable })
            } catch (error) {
              console.error(error)
              return createError({ message: 'Error' })
            }
          }
        ),
    }),
    onSubmit: (values) => {
      dispatch(
        updateNoRM(values, () => {
          setNoRMManual(initialNoRMManual)
        })
      )
    },
  })
  useEffect(() => {
    dispatch(getNoRMLast({}))
    const setFF = vNoRMManual.setFieldValue
    setFF('idpasien', noRMManual.idPasien || '')
    setFF('norm', noRMManual.norm || '')
  }, [noRMManual, vNoRMManual.setFieldValue, dispatch])
  return (
    <Modal
      centered={true}
      isOpen={!!noRMManual.idPasien}
      toggle={() => setNoRMManual(initialNoRMManual)}
      {...rest}
    >
      <ModalHeader>Input Nomor Rekam Medis Manual</ModalHeader>
      <ModalBody className="py-3 px-5">
        <p>
          Penginputan nomor rekam medis tidak boleh lebih besar dari nomor rekam
          medis terakhir: {last}
        </p>
        <Input
          id="norm"
          name="norm"
          type="text"
          value={vNoRMManual.values.norm}
          onChange={(e) => {
            rgxAllNumber.test(e.target.value) &&
              vNoRMManual.setFieldValue('norm', e.target.value)
          }}
          invalid={vNoRMManual.touched?.norm && !!vNoRMManual.errors?.norm}
        />
        {vNoRMManual.touched?.norm && !!vNoRMManual.errors.norm && (
          <FormFeedback type="invalid">
            <div>{vNoRMManual.errors.norm}</div>
          </FormFeedback>
        )}
        <Row className="d-flex flex-row justify-content-center mt-3">
          <Col lg="auto">
            <Button color="success" onClick={() => vNoRMManual.handleSubmit()}>
              Simpan
            </Button>
          </Col>

          <Col lg="auto">
            <Button color="danger" onClick={() => setNoRMManual('')}>
              Batal
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default withRouter(RegistrasiList)
