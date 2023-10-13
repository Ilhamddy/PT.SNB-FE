import {
  Button,
  Card,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import FormData from 'form-data'
import { getListBerita, uploadImage } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { useEffect } from 'react'
import NoDataTable from '../../Components/Table/NoDataTable'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useNavigate } from 'react-router-dom'

const ListBeritaPage = () => {
  const dispatch = useDispatch()
  const { loading, berita } = useSelector((state) => ({
    loading: state.Berita.getListBerita.loading,
    berita: state.Berita.getListBerita.data?.data?.berita || [],
  }))
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getListBerita())
  }, [dispatch])
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsBerita = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="detail-berita">
            {' '}
            Detail Produk{' '}
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              id="detail-berita"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => navigate(`/admin-konten/berita/${row.norec}`)}
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
      name: <span className="font-weight-bold fs-13">Judul Berita</span>,
      sortable: true,
      selector: (row) => row.judul,
      width: '500px',
    },
  ]

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Upload Berita" pageTitle="Upload Berita" />
        <Card className="p-5">
          <Row>
            <DataTable
              fixedHeader
              fixedHeaderScrollHeight="700px"
              columns={columnsBerita}
              data={berita}
              progressPending={loading}
              customStyles={subTableCustomStyles}
              progressComponent={<LoadingTable />}
              noDataComponent={<NoDataTable dataName={'data obat'} />}
            />
          </Row>
          <Row className="mt-5">
            <Col>
              <Button
                color="info"
                onClick={() => {
                  navigate('/admin-konten/list-berita')
                }}
              >
                Tambah Berita
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
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

export default ListBeritaPage
