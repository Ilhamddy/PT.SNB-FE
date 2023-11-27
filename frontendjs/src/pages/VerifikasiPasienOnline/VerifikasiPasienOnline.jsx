import { ToastContainer, toast } from 'react-toastify'
import { Container, Row, Col, Button, Input, Card, CardBody } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import ActionPasienRegistrasi from '../../Components/ActionPasienRegistrasi/ActionPasienRegistrasi'
import { useState } from 'react'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../Select/Select'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  getComboVerifikasiOnline,
  getDaftarPasienOnline,
} from '../../store/actions'
import { dateLocal } from '../../utils/format'
import NoDataTable from '../../Components/Table/NoDataTable'
import LoadingTable from '../../Components/Table/LoadingTable'
import DataTable from 'react-data-table-component'

const VerifikasiPasienOnline = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { unit, daftarPasienOnline, loading } = useSelector((state) => ({
    unit: state.DaftarPasienOnline.getComboVerifikasiOnline.data?.unit,
    daftarPasienOnline:
      state.DaftarPasienOnline.getDaftarPasienOnline?.data?.pasien || [],
    loading: state.DaftarPasienOnline.getDaftarPasienOnline?.loading || false,
  }))
  const [searchParams, setSearchParams] = useSearchParams()

  const [profil, setProfil] = useState({
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
    profile: null
  })

  const vQueries = useFormik({
    initialValues: {
      nocmnamapasien: '',
      tglmasuk: '',
      unit: '',
      jenispasien: '',
    },
    onSubmit: (values) => {
      dispatch(getDaftarPasienOnline(values))
    },
  })

  useEffect(() => {
    dispatch(getComboVerifikasiOnline())
    dispatch(getDaftarPasienOnline())
  }, [dispatch])

  const handleCard = (data) => {
    setProfil({
      index: data.index,
      namaPasien: data.namapasien,
      noIdentitas: null,
      norm: data.nocm,
      nohp: data.nohp,
      alamat: null,
      search: null,
      idcmfk: data.nocmfk,
      norecdp: data.norecdp,
      jeniskelamin: data.jeniskelamin,
      golongandarah: data.golongandarah,
      alamatdomisili: data.alamatdomisili,
      namaibu: data.namaibu,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
      agama: data.agama,
      statusperkawinan: data.statusperkawinan,
      namasuamiistri: data.namasuamiistri,
      profile: data.profile,
    })
  }

  const buttonAction = [
    {
      name: 'Verifikasi Pasien Baru',
      onClick: (profil) => {
        if (!profil.norm) {
          navigate(
            `/registrasi/pasien-baru/${profil?.idcmfk}?norecdp=${profil?.norecdp}`
          )
        } else {
          toast.warning('Pasien sudah terverifikasi', { autoClose: 3000 })
        }
      },
    },
  ]

  const jenisPasien = [
    {
      value: 1,
      label: 'Pasien Baru',
    },
    {
      value: 2,
      label: 'Pasien Lama',
    },
  ]

  const [page] = useState(() => searchParams.get('page') || 1)
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      cell: (item, index) => (
        <Card
          className="product card-animate w-100"
          style={index === profil.index ? { backgroundColor: '#F2E9CA' } : {}}
          onClick={() => {
            handleCard({ index: index, ...item })
          }}
        >
          <CardBody>
            <Row className="gy-3">
              <div className="col-sm">
                <h5 className="card-title mb-1">
                  {item.nocm || item.nocmtemp || '-'} /{' '}
                  {item.noreservasi || '-'}
                </h5>
                <p className="mb-0">
                  {item.namapasien && item.namapasien.length > 30
                    ? `${item.namapasien.substring(0, 30)}...`
                    : item.namapasien}
                </p>
                <p className="text-muted mb-0">
                  Tanggal Lahir: {dateLocal(item.tgllahir) || '-'}
                </p>
              </div>
              <div className="col-sm">
                <div className="text-lg-start">
                  <p className="text-muted mb-0">
                    Tgl. Booking: {dateLocal(item.tglinput) || '-'}
                  </p>
                  <p className="text-muted mb-0">
                    Tgl. Kunjungan: {dateLocal(item.tglrencana) || '-'}
                  </p>
                  <p className="text-muted mb-0">{item.namaunit || '-'}</p>
                </div>
              </div>
              <div className="col-sm">
                <div className="text-lg-start">
                  <p className="text-muted mb-0">
                    Penjamin : {item.namarekanan || '-'}
                  </p>
                  <p className="text-muted mb-0">
                    No Kartu : {item.nokartu || '-'}
                  </p>
                  <p className="text-muted mb-0">
                    Status : {item.nocm ? 'Terverif' : 'Belum Verif'}
                  </p>
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      ),
      sortable: true,
    },
  ]

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb
          title="Verifikasi Daftar Online"
          pageTitle="Daftar Online"
        />
        <Row>
          <Col lg={3}>
            <ActionPasienRegistrasi
              profil={profil}
              buttonAction={buttonAction}
            />
          </Col>
          <Col lg={9}>
            <Card className="p-3">
              <Row>
                <ColLabelInput lg={4} label="Jenis pasien">
                  <CustomSelect
                    id="jenispasien"
                    name="jenispasien"
                    options={jenisPasien}
                    value={vQueries.values.jenispasien || ''}
                    className={`input ${vQueries.errors.jenispasien ? 'is-invalid' : ''
                      }`}
                    onChange={(value) =>
                      vQueries.setFieldValue('jenispasien', value?.value || '')
                    }
                  />
                </ColLabelInput>
                <ColLabelInput lg={4} label="Tgl Kunjungan">
                  <KontainerFlatpickr
                    id="end"
                    options={{
                      dateFormat: 'd/m/Y',
                      defaultDate: 'today',
                    }}
                    value={vQueries.values.end}
                    onChange={([newDate]) => {
                      vQueries.setFieldValue('tglmasuk', newDate.toISOString())
                    }}
                  />
                </ColLabelInput>
                <ColLabelInput lg={4} label="Poliklinik">
                  <CustomSelect
                    id="unit"
                    name="unit"
                    options={unit}
                    value={vQueries.values.unit || ''}
                    className={`input ${vQueries.errors.unit ? 'is-invalid' : ''
                      }`}
                    onChange={(value) =>
                      vQueries.setFieldValue('unit', value?.value || '')
                    }
                  />
                </ColLabelInput>
                <ColLabelInput
                  lg={4}
                  label="No RM / Nama / No Reservasi"
                  className="mt-3"
                >
                  <Input
                    id="nocmnamapasien"
                    name="nocmnamapasien"
                    type="text"
                    placeholder="Masukkan No RM / Nama / No Reservasi"
                    onChange={vQueries.handleChange}
                    onBlur={vQueries.handleBlur}
                    value={vQueries.values.nocmnamapasien || ''}
                  />
                </ColLabelInput>
                <Col lg={3}>
                  <div className="d-flex flex-column flex-column-reverse h-100">
                    <Row>
                      <Col>
                        <Button
                          type="button"
                          color="info"
                          onClick={() => {
                            vQueries.handleSubmit()
                          }}
                        >
                          Cari
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <DataTable
                noHeader={false}
                columns={columnsDetail}
                data={daftarPasienOnline || []}
                paginationDefaultPage={page || 1}
                onChangePage={(page) => {
                  searchParams.set('page', page)
                  setSearchParams(searchParams)
                }}
                pagination
                progressPending={loading}
                progressComponent={<LoadingTable />}
                noDataComponent={<NoDataTable dataName={'data obat'} />}
                customStyles={{
                  rows: {
                    style: {
                      color: 'black',
                      borderTop: 'none',
                      borderBottom: 'none !important',
                    },
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default VerifikasiPasienOnline
