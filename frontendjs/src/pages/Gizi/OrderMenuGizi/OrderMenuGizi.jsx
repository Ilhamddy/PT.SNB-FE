import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import UiContent from "../../../Components/Common/UiContent"
import { Button, Card, CardBody, Col, Container, FormFeedback, Input, Row, UncontrolledTooltip } from "reactstrap"
import BreadCrumb from "../../../Components/Common/BreadCrumb"
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import { useFormik } from "formik"
import CustomSelect from "../../Select/Select"
import DataTable from "react-data-table-component"
import { tableCustomStyles } from "../../../Components/Table/tableCustomStyles"
import LoadingTable from "../../../Components/Table/LoadingTable"
import { daftarPasienRIGet } from "../../../store/actions"
import { dateTimeLocal } from "../../../utils/format"

const OrderMenuGizi = () => {
  document.title = 'Order Menu Gizi'
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { data, datawidget, loading, error, deleteOrder, successOrder, loadingOrder } = useSelector((state) => ({
    data: state.DaftarPasien.daftarPasienRIGet?.data || [],
    loading: state.DaftarPasien.daftarPasienRIGet.loading,
    error: state.DaftarPasien.daftarPasienRIGet.error,
  }));
  const vFilter = useFormik({
    initialValues: {
      search: '',
      end: dateNow,
      start: dateNow,
      taskid: '',
      unit: [],
    },
    onSubmit: (values) => {
      // dispatch(getDaftarOrderBankDarah({ dateStart: values.start, dateEnd: values.end }))
    },
  })
  useEffect(() => {
    dispatch(daftarPasienRIGet(''))
  }, [dispatch]);
  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const handleClick = (e) => {
    setUserChosen({
      profile: e.profile,
      nama: e.namapasien,
    })
  }
  const [listPelayananChecked, setListPelayananChecked] = useState([])
  const handleChecked = (checked, norec) => {
    const newListPC = [...listPelayananChecked]
    const index = newListPC.findIndex((item) => item.norec === norec)
    const newItem = { ...newListPC[index] }
    newItem.checked = !checked
    newListPC[index] = newItem
    setListPelayananChecked(newListPC)
  }

  // const isCheckedAll = listPelayananChecked?.every((item) => item.checked)
  const isCheckedAll = listPelayananChecked.length > 0 ? listPelayananChecked.every((item) => item.checked) : false;

  console.log(listPelayananChecked)
  const handleCheckedAll = () => {
    if (data === null) return
    const withChecked = data.map((pelayanan) => {
      return {
        ...pelayanan,
        checked: !pelayanan.no_nota && !isCheckedAll
      }
    })
    setListPelayananChecked(withChecked)
  }
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>
        <Input
          className="form-check-input"
          type="checkbox"
          id={`formcheck-all`}
          checked={isCheckedAll}
          onChange={e => { handleCheckedAll(isCheckedAll) }} />
      </span>,
      sortable: false,
      cell: (row) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            {!row.no_nota && <Input
              className="form-check-input"
              type="checkbox"
              id={`formcheck-${row.norec}`}
              checked={row.checked}
              onChange={e => { handleChecked(row.checked, row.norec) }} />}
          </div>
        );
      },
      width: "50px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
      selector: row => dateTimeLocal(row.tglregistrasi),
      sortable: true,
      wrap: true,
      width: "130px"
    },
    {
      name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
      selector: row => row.noregistrasi,
      sortable: true,
      width: "130px"
    },
    {
      name: <span className='font-weight-bold fs-13'>No. RM</span>,
      selector: row => row.nocm,
      sortable: true,
      width: "100px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
      selector: row => row.namapasien,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Poliklinik</span>,
      selector: row => row.namaunit,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>DPJP Tujuan</span>,
      selector: row => row.namadokter,
      sortable: true
    },
    {

      name: <span className='font-weight-bold fs-13'>Jenis Pasein</span>,
      selector: row => row.jenispenjamin,
      sortable: true
    },
  ];
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Order Menu Gizi" pageTitle="Forms" />
          <Row>
            <Col lg={3}>
              <Card>
                <CardBody>
                  <div className="text-center">
                    {userChosen?.profile === 'baby' ? (
                      <img
                        src={baby}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'dewasalaki' ? (
                      <img
                        src={pria}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'anaklaki' ? (
                      <img
                        src={anaklaki}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'anakperempuan' ? (
                      <img
                        src={anakperempuan}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'dewasaperempuan' ? (
                      <img
                        src={dewasaperempuan}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'kakek' ? (
                      <img
                        src={kakek}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'nenek' ? (
                      <img
                        src={nenek}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : (
                      // Render when none of the conditions are met
                      <p>No profile image available</p>
                    )}
                    <h5 className="fs-17 mb-1">{userChosen.nama}</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <Col sm={3}>
                      <CustomSelect
                        id="DataName"
                        name="DataName"
                        options={[]}
                        onChange={(e) => {
                          vFilter.setFieldValue('DataName', e?.value || '')
                        }}
                        value={vFilter.values.DataName}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${!!vFilter?.errors.DataName ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                        placeholder='list Unit...'
                      />
                      {vFilter.touched.DataName &&
                        !!vFilter.errors.DataName && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.DataName}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col sm={3}>
                      <CustomSelect
                        id="DataName"
                        name="DataName"
                        options={[]}
                        onChange={(e) => {
                          vFilter.setFieldValue('DataName', e?.value || '')
                        }}
                        value={vFilter.values.DataName}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${!!vFilter?.errors.DataName ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                        placeholder='list Kelas...'
                      />
                      {vFilter.touched.DataName &&
                        !!vFilter.errors.DataName && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.DataName}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col sm={3}>
                      <Input
                        id="DataName"
                        name="DataName"
                        type="text"
                        value={vFilter.values.DataName}
                        onChange={(e) => {
                          vFilter.setFieldValue('DataName', e.target.value)
                        }}
                        invalid={vFilter.touched?.DataName &&
                          !!vFilter.errors?.DataName}
                        placeholder="Cari Nama /No RM..."
                      />
                      {vFilter.touched?.DataName
                        && !!vFilter.errors.DataName && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.DataName}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={3}>
                      <Button type="button" color='info' placement="top" id="tooltipTopPencarian"
                        onClick={() => {
                          vFilter.handleSubmit()
                        }}>
                        CARI
                      </Button>
                      <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                    </Col>
                  </Row>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="700px"
                      columns={columns}
                      pagination
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
export default OrderMenuGizi