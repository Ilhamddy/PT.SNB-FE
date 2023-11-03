import {
  Breadcrumb,
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
import DataTable from 'react-data-table-component'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getListPemesanan, penerimaanListQueryGet } from '../../store/actions'
import CountUp from 'react-countup'
import {
  pesananBatal,
  pesananDiterimaImg,
  pesananSudahImg,
} from './imagesementara'
import LoadingTable from '../../Components/Table/LoadingTable'
import NoDataTable from '../../Components/Table/NoDataTable'
import { dateLocal } from '../../utils/format'

const PenerimaanProdukList = ({ isLogistik }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { penerimaan, pemesanan } = useSelector(
    (state) => ({
      penerimaan: state.Gudang.penerimaanListQueryGet || [],
      pemesanan: state.Gudang.getListPemesanan.data.listpemesanan || [],
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(penerimaanListQueryGet({ isLogistik: isLogistik || false }))
    dispatch(getListPemesanan({ isLogistik: isLogistik || false }))
  }, [dispatch, isLogistik])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsPenerimaan = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="detail-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              id="detail-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() =>
                  navigate(
                    `/farmasi/gudang/penerimaan-produk/${row.norecpenerimaan}`
                  )
                }
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No PO</span>,
      sortable: true,
      selector: (row) => row.nomorpo,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Pemesanan</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tanggalpesan),
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Terima</span>,
      selector: (row) => row.nomorterima,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Terima</span>,
      sortable: true,
      selector: (row) => row.tanggalterima,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama supplier</span>,
      sortable: true,
      selector: (row) => row.namasupplierstr,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Item Dipesan</span>,
      sortable: true,
      selector: (row) => row.detailpenerimaan?.length || 0,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Item Diterima</span>,
      sortable: true,
      selector: (row) => row.detailpenerimaan?.length || 0,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Pemesan</span>,
      sortable: true,
      selector: (row) => row.unitpesanstr,
      width: '130px',
    },
  ]

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsPemesanan = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="detail-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              id="detail-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() =>
                  navigate(
                    `/farmasi/gudang/pemesanan-barang/${row.norecpemesanan}`
                  )
                }
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  navigate(
                    `/farmasi/gudang/penerimaan-produk-pemesanan/${row.norecpemesanan}`
                  )
                }
              >
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Terima Barang
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No PO</span>,
      sortable: true,
      selector: (row) => row.nomorpo,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Pemesanan</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tanggalpesan),
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama supplier</span>,
      sortable: true,
      selector: (row) => row.namasupplierstr,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Item Dipesan</span>,
      sortable: true,
      selector: (row) => row.detailpemesanan?.length || 0,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Item Diterima</span>,
      sortable: true,
      selector: (row) => row.detailpemesanan?.length || 0,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Pemesan</span>,
      sortable: true,
      selector: (row) => row.unitpesanstr,
      width: '130px',
    },
  ]

  return (
    <div className="page-content page-list-penerimaan">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <Breadcrumb title="List produk" pageTitle="List Produk" />
        <Card className="p-5">
          <Row>
            <Widget
              title={'Total pemesanan yang belum diterima'}
              end={0}
              image={pesananDiterimaImg}
            />
            <Widget
              title={'Total pemesanan yang sudah diterima'}
              end={(penerimaan?.data?.listpenerimaan || []).length}
              image={pesananSudahImg}
            />
            <Widget
              title={'Total pemesanan yang Dibatalkan'}
              end={0}
              image={pesananBatal}
            />
          </Row>
          <Row className="d-flex justify-content-between mb-3">
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <h4 className="mb-0">Penerimaan</h4>
            </Col>
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <Link
                to={
                  isLogistik
                    ? '/logistik/gudang/penerimaan-produk'
                    : '/farmasi/gudang/penerimaan-produk'
                }
              >
                <Button color={'info'}>Tambah</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <div id="table-gridjs">
              <DataTable
                fixedHeader
                fixedHeaderScrollHeight="700px"
                columns={columnsPenerimaan}
                pagination
                data={penerimaan?.data?.listpenerimaan || []}
                progressPending={penerimaan?.loading || false}
                customStyles={tableCustomStyles}
                expandableRows
                expandableRowsComponent={ExpandablePenerimaan}
                progressComponent={<LoadingTable />}
                noDataComponent={<NoDataTable dataName={'permintaan'} />}
              />
            </div>
          </Row>
          <Row className="d-flex justify-content-between mb-3">
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <h4 className="mb-0">Pemesanan</h4>
            </Col>
            <Col lg={'auto'} className="d-flex flex-row-reverse">
              <Link
                to={
                  isLogistik
                    ? '/logistik/gudang/pemesanan-barang'
                    : '/farmasi/gudang/pemesanan-barang'
                }
              >
                <Button color={'info'}>Pesan</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <div id="table-gridjs">
              <DataTable
                fixedHeader
                fixedHeaderScrollHeight="700px"
                columns={columnsPemesanan}
                pagination
                data={pemesanan || []}
                progressPending={penerimaan?.loading || false}
                customStyles={tableCustomStyles}
                expandableRows
                expandableRowsComponent={ExpandablePemesanan}
                progressComponent={<LoadingTable />}
                noDataComponent={<NoDataTable dataName={'permintaan'} />}
              />
            </div>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

const ExpandablePenerimaan = ({ data }) => {
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.produk.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Penerimaan</span>,
      selector: (row) => row.jumlahterima,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga satuan kecil</span>,
      sortable: true,
      selector: (row) => `Rp${row.hargasatuankecil?.toLocaleString('id-ID')}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Diskon</span>,
      sortable: true,
      selector: (row) => `Rp${row.diskonrupiah}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">PPN</span>,
      sortable: true,
      selector: (row) => `Rp${row.ppnrupiahproduk}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      sortable: true,
      selector: (row) => `Rp${row.totalproduk}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">E.D</span>,
      sortable: true,
      selector: (row) => `${row.tanggaled}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Batch</span>,
      sortable: true,
      selector: (row) => row.nobatch,
      width: '100px',
    },
  ]
  if (data.detailpenerimaan.length === 0) {
    return <></>
  }
  return (
    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="700px"
      columns={columnsDetail}
      data={data.detailpenerimaan || []}
      progressPending={false}
      customStyles={subTableCustomStyles}
    />
  )
}

const ExpandablePemesanan = ({ data }) => {
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama produk</span>,
      sortable: true,
      selector: (row) => row.produk.namaproduk,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty Penerimaan</span>,
      selector: (row) => row.jumlahterima,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga satuan kecil</span>,
      sortable: true,
      selector: (row) => `Rp${row.hargasatuankecil?.toLocaleString('id-ID')}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Diskon</span>,
      sortable: true,
      selector: (row) => `Rp${row.diskonrupiah}`,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">PPN</span>,
      sortable: true,
      selector: (row) => `Rp${row.ppnrupiahproduk}`,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      sortable: true,
      selector: (row) => `Rp${row.totalproduk}`,
      width: '150px',
    },
  ]
  if (data.detailpemesanan.length === 0) {
    return <></>
  }
  return (
    <DataTable
      fixedHeader
      fixedHeaderScrollHeight="700px"
      columns={columnsDetail}
      data={data.detailpemesanan || []}
      progressPending={false}
      customStyles={subTableCustomStyles}
    />
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
                <span className="counter-value" style={{ fontSize: '1.5rem' }}>
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

const subTableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#ECB349',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
      borderBottom: '1px solid #919191',
    },
  },
}

export default PenerimaanProdukList