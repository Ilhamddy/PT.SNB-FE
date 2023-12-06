import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOrderBarang,
  getUnitUser,
  tolakKirim,
  tolakOrder,
  verifyKirim,
} from '../../store/actions'
import LoadingTable from '../../Components/Table/LoadingTable'
import DataTable from 'react-data-table-component'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Input,
  FormFeedback,
} from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import CountUp from 'react-countup'
import {
  pesananBatal,
  pesananDiterimaImg,
  pesananSudahImg,
} from './imagesementara'
import { dateLocal } from '../../utils/format'
import { useFormik } from 'formik'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'
import * as Yup from 'yup'
import DeleteModalCustom from '../../Components/Common/DeleteModalCustom'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'

const DistribusiOrderList = ({ isUnit, isLogistik }) => {
  const dispatch = useDispatch()
  // teks taruh sini biar langsung tahu bedanya antara 4 page
  const linkDistribusi = isLogistik ? 'logistik' : 'farmasi'
  const judulPemesanan = isUnit
    ? 'Pemesanan Ke Gudang dan Apotek'
    : 'Pemesanan dari Unit'
  const judulPengiriman = isUnit
    ? 'Pemesanan Ke Gudang dan Apotek'
    : 'Pemesanan dari Unit'
  const judulBreadCrumb = isUnit
    ? 'Order Barang Ke Gudang Dan Apotek'
    : 'Order Barang dari Unit'

  const { listAll, listKirim } = useSelector((state) => ({
    listAll: state.Distribusi.getOrderBarang.data?.order || [],
    listKirim: state.Distribusi.getOrderBarang.data?.kirim || [],
    orderStokBatch: state.Distribusi.getOrderStokBatch.data || null,
  }))

  const vTolakPesanan = useFormik({
    initialValues: {
      norecorder: '',
      alasantolak: '',
    },
    validationSchema: Yup.object({
      alasantolak: Yup.string().required('Alasan tolak perlu diisi'),
    }),
    onSubmit: (value, { resetForm }) => {
      dispatch(
        tolakOrder(value, () => {
          dispatch(
            getOrderBarang({ isGudang: !isUnit, isLogistik: !!isLogistik })
          )
          resetForm()
        })
      )
    },
  })

  const vTolakKirim = useFormik({
    initialValues: {
      noreckirim: '',
      alasantolak: '',
    },
    validationSchema: Yup.object({
      alasantolak: Yup.string().required('Alasan tolak perlu diisi'),
    }),
    onSubmit: (value, { resetForm }) => {
      dispatch(
        tolakKirim(value, () => {
          dispatch(
            getOrderBarang({ isGudang: !isUnit, isLogistik: !!isLogistik })
          )
          resetForm()
        })
      )
    },
  })

  useEffect(() => {
    dispatch(getOrderBarang({ isGudang: !isUnit, isLogistik: !!isLogistik }))
  }, [dispatch, isUnit, isLogistik])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsProduk = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {isUnit && (
                <Link
                  to={`/${linkDistribusi}/gudang/distribusi-order/${row.norecorder}`}
                >
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Lihat Order
                  </DropdownItem>
                </Link>
              )}
              {!isUnit && (
                <Link
                  to={`/${linkDistribusi}/gudang/distribusi-kirim/${row.norecorder}`}
                >
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Kirim Barang
                  </DropdownItem>
                </Link>
              )}
              {!isUnit && !row.istolak && (
                <DropdownItem
                  onClick={() =>
                    vTolakPesanan.setFieldValue('norecorder', row.norecorder)
                  }
                >
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Tolak Pesanan
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Order</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglorder),
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      sortable: true,
      selector: (row) => row.noorder || '-',
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Membutuhkan</span>,
      sortable: true,
      selector: (row) => row.namaunitasal,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Kirim</span>,
      sortable: true,
      selector: (row) => row.namajenisorder,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (row) => (row.istolak ? 'Ditolak' : 'Belum dikirim'),
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Alasan Tolak</span>,
      sortable: true,
      selector: (row) => row.alasantolak || '-',
      width: '150px',
    },
  ]

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsKirim = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="edit-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              itemType="button"
              id="edit-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {isUnit && (
                <Link
                  to={`/${linkDistribusi}/gudang/distribusi-kirim-verif/${row.noreckirim}`}
                >
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    {row.isverif ? 'Lihat kiriman' : 'Verifikasi'}
                  </DropdownItem>
                </Link>
              )}
              {!isUnit && (
                <Link
                  to={`/${linkDistribusi}/gudang/distribusi-kirim-langsung/${row.noreckirim}`}
                >
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    {'Lihat Detail'}
                  </DropdownItem>
                </Link>
              )}
              {isUnit && !row.isverif && (
                <DropdownItem
                  onClick={() => {
                    vTolakKirim.setFieldValue('noreckirim', row.noreckirim)
                  }}
                >
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Tolak Kiriman
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Kirim</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglkirim) || '-',
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Kirim</span>,
      sortable: true,
      selector: (row) => row.nokirim || '-',
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Order</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglorder),
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      sortable: true,
      selector: (row) => row.noorder || '-',
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Membutuhkan</span>,
      sortable: true,
      selector: (row) => row.namaunittujuan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Kirim</span>,
      sortable: true,
      selector: (row) => row.namajenisorder,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (row) =>
        row.isverif ? 'Sudah verif' : row.istolak ? 'Ditolak' : 'Belum verif',
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Alasan Tolak</span>,
      sortable: true,
      selector: (row) => row.alasantolak || '-',
      width: '150px',
    },
  ]

  const totalBelumTerima = listAll.filter((item) => !item.tglkirim).length
  const totalSudahTerima = listAll.filter((item) => !!item.tglkirim).length

  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <DeleteModalCustom
        show={!!vTolakPesanan.values.norecorder}
        onDeleteClick={() => {
          vTolakPesanan.handleSubmit()
        }}
        showMessage={false}
        onCloseClick={() => vTolakPesanan.resetForm()}
        buttonHapus="Tolak"
      >
        <ColLabelInput label={'alasan tolak'}>
          <Input
            id="alasantolak"
            name="alasantolak"
            type="text"
            value={vTolakPesanan.values.alasantolak}
            onChange={(e) => {
              vTolakPesanan.setFieldValue('alasantolak', e.target.value)
            }}
            invalid={
              vTolakPesanan.touched?.alasantolak &&
              !!vTolakPesanan.errors?.alasantolak
            }
          />
          {vTolakPesanan.touched?.alasantolak &&
            !!vTolakPesanan.errors.alasantolak && (
              <FormFeedback type="invalid">
                <div>{vTolakPesanan.errors.alasantolak}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
      </DeleteModalCustom>
      <DeleteModalCustom
        show={!!vTolakKirim.values.noreckirim}
        onDeleteClick={() => {
          vTolakKirim.handleSubmit()
        }}
        showMessage={false}
        onCloseClick={() => vTolakKirim.resetForm()}
        buttonHapus="Tolak"
      >
        <ColLabelInput label={'alasan tolak'}>
          <Input
            id="alasantolak"
            name="alasantolak"
            type="text"
            value={vTolakKirim.values.alasantolak}
            onChange={(e) => {
              vTolakKirim.setFieldValue('alasantolak', e.target.value)
            }}
            invalid={
              vTolakKirim.touched?.alasantolak &&
              !!vTolakKirim.errors?.alasantolak
            }
          />
          {vTolakKirim.touched?.alasantolak &&
            !!vTolakKirim.errors.alasantolak && (
              <FormFeedback type="invalid">
                <div>{vTolakKirim.errors.alasantolak}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
      </DeleteModalCustom>
      <Container fluid>
        <BreadCrumb title={judulBreadCrumb} pageTitle="Gudang" />
        <Card className="p-5">
          <Row>
            <Widget
              title={'Total Permintaan Barang'}
              end={totalBelumTerima}
              image={pesananSudahImg}
            />
            <Widget
              title={'Total Barang Dikirim'}
              end={totalSudahTerima}
              image={pesananDiterimaImg}
            />
            <Widget
              title={'Total pemesanan yang Dibatalkan'}
              end={0}
              image={pesananBatal}
            />
          </Row>
          <Row className="d-flex justify-content-between mb-3">
            <Col lg="auto">
              <h3>{judulPemesanan}</h3>
            </Col>
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <Link
                to={
                  isUnit
                    ? `/${linkDistribusi}/gudang/distribusi-order`
                    : `/${linkDistribusi}/gudang/distribusi-order-unit`
                }
              >
                <Button color={'info'}>Pesan</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <DataTable
              fixedHeader
              columns={columnsProduk}
              pagination
              paginationPerPage={10}
              data={listAll}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
            />
          </Row>
          <Row className="d-flex justify-content-between mb-3">
            <Col lg="auto">
              <h3>{judulPengiriman}</h3>
            </Col>
            {!isUnit && (
              <Col lg={'auto'} className="d-flex flex-row-reverse">
                <Link
                  to={`/${linkDistribusi}/gudang/distribusi-kirim-langsung`}
                >
                  <Button color={'info'}>Kirim</Button>
                </Link>
              </Col>
            )}
          </Row>
          <Row>
            <DataTable
              fixedHeader
              columns={columnsKirim}
              pagination
              paginationPerPage={10}
              data={listKirim}
              progressPending={false}
              customStyles={tableCustomStyles}
              progressComponent={<LoadingTable />}
            />
          </Row>
        </Card>
      </Container>
    </div>
  )
}

const Widget = ({ title, end, image }) => {
  return (
    <Col xxl={4} sm={6}>
      <Card className="card-animate">
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <p className="fw-medium text-muted mb-0">{title}</p>
              <h2 className="mt-4 ff-secondary fw-semibold">
                <span className="counter-value" style={{ fontSize: '2rem' }}>
                  <CountUp start={0} end={end} decimal={','} duration={3} />
                </span>
              </h2>
            </div>
            <div>
              <div className="avatar-md flex-shrink-0">
                <span
                  className={'avatar-title rounded-circle fs-4'}
                  style={{ backgroundColor: '#CC845C' }}
                >
                  <img src={image} alt="" className="avatar-md" />
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DistribusiOrderList
