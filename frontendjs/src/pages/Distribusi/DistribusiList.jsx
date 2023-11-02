import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderBarang } from '../../store/actions'
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

const DistribusiOrderList = () => {
  const dispatch = useDispatch()

  const { listOrder } = useSelector((state) => ({
    listOrder: state.Distribusi.getOrderBarang.data?.order || [],
  }))

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
            {!row.tglkirim ? (
              <DropdownMenu className="dropdown-menu-end">
                <Link to={`/farmasi/gudang/distribusi-kirim/${row.norecorder}`}>
                  <DropdownItem>
                    <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                    Kirim Order
                  </DropdownItem>
                </Link>
              </DropdownMenu>
            ) : (
              <></>
            )}
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
      width: '100px',
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
      selector: (row) => row.noorder,
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

  const totalBelumTerima = listOrder.filter((item) => !item.tglkirim).length
  const totalSudahTerima = listOrder.filter((item) => !!item.tglkirim).length

  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
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
          <Row className="d-flex flex-row-reverse mb-3">
            <Col lg={2} className="d-flex flex-row-reverse">
              <Link to={'/farmasi/gudang/distribusi-order'}>
                <Button color={'info'}>Tambah</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <DataTable
              fixedHeader
              columns={columnsProduk}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5]}
              data={listOrder}
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
                <span className="counter-value" style={{ fontSize: '5rem' }}>
                  <CountUp
                    start={0}
                    end={end}
                    decimal={','}
                    // suffix={item.suffix}
                    duration={3}
                  />
                </span>
              </h2>
            </div>
            <div>
              <div className="avatar-xl flex-shrink-0">
                <span
                  className={'avatar-title rounded-circle fs-4'}
                  style={{ backgroundColor: '#CC845C' }}
                >
                  <img src={image} alt="" className="avatar-lg" />
                </span>
              </div>
            </div>
          </div>
        </CardBody>
        <div className="card-footer" style={{ backgroundColor: '#e67e22' }}>
          <div className="text-center">
            <Link to="#" className="link-light" onClick={() => {}}>
              View
              <i className="ri-arrow-right-s-line align-middle lh-1"></i>
            </Link>
          </div>
        </div>
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
