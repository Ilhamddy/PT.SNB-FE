import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderBarang, verifyKirim } from '../../store/actions'
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
} from 'reactstrap'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import {
  pesananBatal,
  pesananDiterimaImg,
  pesananSudahImg,
} from './imagesementara'
import { dateLocal } from '../../utils/format'
import { useFormik } from 'formik'

const DistribusiOrderList = ({ isUnit }) => {
  const dispatch = useDispatch()

  const { listAll, listKirim } = useSelector((state) => ({
    listAll: state.Distribusi.getOrderBarang.data?.order || [],
    listKirim: state.Distribusi.getOrderBarang.data?.kirim || [],
  }))

  const vVerif = useFormik({
    initialValues: {
      noreckirim: '',
    },
    onSubmit: (value, { resetForm }) => {
      dispatch(
        verifyKirim(value, () => {
          resetForm()
        })
      )
    },
  })

  useEffect(() => {
    dispatch(getOrderBarang())
  }, [dispatch])

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
              {isUnit && row.noreckirim ? (
                <DropdownItem
                  onClick={() => {
                    vVerif.setFieldValue('noreckirim', row.noreckirim)
                  }}
                >
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Verifikasi Pengiriman
                </DropdownItem>
              ) : isUnit ? (
                <Link to={`/farmasi/gudang/distribusi-order/${row.norecorder}`}>
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Lihat Order
                  </DropdownItem>
                </Link>
              ) : (
                <Link to={`/farmasi/gudang/distribusi-kirim/${row.norecorder}`}>
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    {!row.noreckirim ? 'Kirim Order' : 'Lihat Detail'}
                  </DropdownItem>
                </Link>
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
      selector: (row) => row.namaunitasal,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Kirim</span>,
      sortable: true,
      selector: (row) => row.namajenisorder,
      width: '200px',
    },
  ]

  const totalBelumTerima = listAll.filter((item) => !item.tglkirim).length
  const totalSudahTerima = listAll.filter((item) => !!item.tglkirim).length

  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <Modal
        toggle={() => {
          vVerif.resetForm()
        }}
        isOpen={!!vVerif.values.noreckirim}
        centered
      >
        <Card className="p-3">
          <Row className="d-flex justify-content-center mb-3 fs-3">
            <Col sm="auto">Konfirmasi verifikasi barang</Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg="auto">
              <Button color="danger">Batal</Button>
            </Col>
            <Col lg="auto">
              <Button
                color="success"
                onClick={() => {
                  vVerif.handleSubmit()
                }}
              >
                Ya
              </Button>
            </Col>
          </Row>
        </Card>
      </Modal>
      <Container fluid>
        <BreadCrumb title="Order Barang" pageTitle="Gudang" />
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
              <h3>Pemesanan</h3>
            </Col>
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <Link to={'/farmasi/gudang/distribusi-order'}>
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
              <h3>Pengiriman</h3>
            </Col>
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <Link to={'/farmasi/gudang/distribusi-kirim'}>
                <Button color={'info'}>Kirim</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <DataTable
              fixedHeader
              columns={columnsProduk}
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

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#e67e22',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default DistribusiOrderList
