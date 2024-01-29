import React, { useEffect, useState, useCallback, useRef } from 'react'
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
  FormFeedback,
  Form,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
  Dropdown,
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../Select/Select'
import Flatpickr from 'react-flatpickr'
import DataTable from 'react-data-table-component'
import {
  listTagihanGet,
  listTagihanPrintGet,
  registrasiRuanganNorecGet,
} from '../../../store/actions'
import PropTypes from 'prop-types'
import PrintTemplate from '../../Print/PrintTemplate/PrintTemplate'
import PrintRekapBiaya from '../../Print/PrintRekapBiaya/PrintRekapBiaya'
import SimpleBar from 'simplebar-react'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { dateTimeLocal } from '../../../utils/format'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'

const Tagihan = ({ show }) => {
  const { norecdp, norecap } = useParams()
  const dispatch = useDispatch()
  const {
    dataTagihan,
    loadingTagihan,
    successTagihan,
    dataTagihanPrint,
    dataPasienReg,
  } = useSelector((state) => ({
    dataTagihan: state.Emr.listTagihanGet.data,
    loadingTagihan: state.Emr.listTagihanGet.loading,
    successTagihan: state.Emr.listTagihanGet.success,
    dataTagihanPrint: state.Emr.listTagihanPrintGet.data || [],
    dataPasienReg: state.Registrasi.registrasiRuanganNorecGet.data || null,
  }))
  useEffect(() => {
    if (show === '2') {
      if (norecdp) {
        dispatch(listTagihanGet(norecdp))
        dispatch(listTagihanPrintGet(norecdp))
      }
    }
  }, [show, norecdp, dispatch])

  const refPrintBilling = useRef(null)

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledDropdown className="dropdown d-inline-block">
              {/* <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button" onClick={() => onClickDelete(data)}>
                                <i className="ri-delete-bin-2-line"></i>
                            </DropdownToggle> */}
            </UncontrolledDropdown>
            {/* <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip> */}
          </div>
        )
      },
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Layanan</span>,
      selector: (row) => dateTimeLocal(row.tglinput),
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '160px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tindakan</span>,
      selector: (row) => row.namaproduk,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas</span>,
      selector: (row) => row.petugas,
      sortable: true,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      selector: (row) => row.harga?.toLocaleString('id-ID'),
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      selector: (row) => row.qty,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jasa</span>,
      selector: (row) => row.jasa,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Cito</span>,
      selector: (row) => row.statuscito,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Discount</span>,
      selector: (row) => row.discount,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => row.total?.toLocaleString('id-ID'),
      sortable: true,
      width: '100px',
    },
  ]

  const handlePrint = () => {
    refPrintBilling.current?.handlePrint()
  }
  const [isCartDropdown, setIsCartDropdown] = useState(false)

  const toggleCartDropdown = () => {
    setIsCartDropdown(!isCartDropdown)
  }
  return (
    <React.Fragment>
      <Row className="gy-4 page-tagihan">
        <Card>
          <CardHeader className="card-header-snb ">
            <h4 className="card-title mb-0" style={{ color: 'black' }}>
              Rincian Tagihan
            </h4>
          </CardHeader>
          <div className="d-flex flex-row-reverse mt-3">
            <div></div>
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
                <DropdownItem onClick={() => handlePrint()}>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Print
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardBody>
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
                expandableRows
                expandableRowsComponent={ExpandablePetugas}
              />
            </div>
          </CardBody>
        </Card>
      </Row>
      <PrintTemplate
        ContentPrint={
          <PrintRekapBiaya
            dataRekap={dataTagihanPrint?.billing || []}
            dataPasien={dataPasienReg || null}
          />
        }
        ref={refPrintBilling}
      />
    </React.Fragment>
  )
}

Tagihan.propTypes = {
  show: PropTypes.any,
}

const ExpandablePetugas = ({ data }) => {
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col" style={{ width: '5%' }}>
            No
          </th>
          <th scope="col" style={{ width: '40%' }}>
            Pelaksana Tindakan Operasi
          </th>
          <th scope="col" style={{ width: '55%' }}>
            Pegawai
          </th>
        </tr>
      </thead>
      <tbody>
        {(data.listpetugas || []).map((item, key) => (
          <tr key={key}>
            <th scope="row">{key + 1}</th>
            <td>{item.reportdisplay}</td>
            <td>{item.namalengkap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Tagihan
