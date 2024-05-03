import React, { useEffect, useState } from "react"
import UiContent from "../../../Components/Common/UiContent"
import { Button, Card, CardBody, Col, Container, FormFeedback, Row, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import BreadCrumb from "../../../Components/Common/BreadCrumb"
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import { useFormik } from "formik"
import * as Yup from 'yup'
import CustomSelect from "../../Select/Select"
import DataTable from "react-data-table-component"
import { tableCustomStyles } from "../../../Components/Table/tableCustomStyles"
import LoadingTable from "../../../Components/Table/LoadingTable"
import { useDispatch, useSelector } from "react-redux"
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr"
import { getDaftarOrderGizi } from "../../../store/gizi/giziSlice"

const DaftarOrderMenuGizi = () => {
  document.title = 'Daftar Order Menu Gizi'
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { data, loading } = useSelector((state) => ({
    data: state.giziSlice.getDaftarOrderGizi?.data || []
  }));
  const vFilter = useFormik({
    initialValues: {
      tglOrder: dateNow,
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (values) => {
      dispatch(getDaftarOrderGizi({ tglorder: values.tglOrder }))
    },
  })
  useEffect(() => {
    dispatch(getDaftarOrderGizi({ tglorder: dateNow }))
  }, [dispatch, dateNow]);
  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      selector: (row) => row.no,
      sortable: true,
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Order</span>,
      selector: (row) => row.tglorder,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas Order</span>,
      selector: (row) => row.pegawai,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13"></span>,
      selector: (row) => (
        <button className="btn btn-success"
        // onClick={() => handleButtonClick(row)}
        >Verifikasi</button>
      ),
      sortable: false,
    }
  ]
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title='Daftar Order Menu Gizi' pageTitle="Forms" />
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
                  <Row className="mb-3 gy-2">
                    <Col sm={3}>
                      <CustomSelect
                        id="unit"
                        name="unit"
                        options={[]}
                        onChange={(e) => {
                          vFilter.setFieldValue('unit', e?.value || '')
                        }}
                        value={vFilter.values.unit}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${!!vFilter?.errors.unit ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                      />
                      {vFilter.touched.unit &&
                        !!vFilter.errors.unit && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.unit}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col sm={3}>
                      <KontainerFlatpickr
                        isError={vFilter.touched?.tglOrder &&
                          !!vFilter.errors?.tglOrder}
                        id="tglOrder"
                        options={{
                          dateFormat: 'Y-m-d',
                          defaultDate: 'today',
                        }}
                        onBlur={vFilter.handleBlur}
                        value={vFilter.values.tglOrder}
                        onChange={([newDate]) => {
                          vFilter.setFieldValue('tglOrder', newDate.toISOString())
                        }}
                      />
                      {vFilter.touched?.tglOrder
                        && !!vFilter.errors.tglOrder && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.tglOrder}</div>
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
                      pointerOnHover
                      highlightOnHover
                      progressComponent={<LoadingTable />}
                      expandableRows
                      expandableRowsComponent={ExpandablePetugas}
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
const ExpandablePetugas = ({ data }) => {
  const [datax, setDatax] = useState(data.detail);
  const handleCheckboxChange = (index, event) => {
    const newData = datax.map((item, i) => {
      if (i === index) {
        return { ...item, checked: event.target.checked };
      }
      return { ...item }; // Create a new object for other items to avoid mutation
    });
    setDatax(newData);
  };

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col" style={{ width: '5%' }}>
              Cheked
            </th>
            <th scope="col" style={{ width: '15%' }}>
              Noregistrasi
            </th>
            <th scope="col" style={{ width: '10%' }}>
              No. RM
            </th>
            <th scope="col" style={{ width: '15%' }}>
              Nama Pasien
            </th>
            <th scope="col" style={{ width: '10%' }}>
              Jenis Order
            </th>
            <th scope="col" style={{ width: '10%' }}>
              Diet 1
            </th>
            <th scope="col" style={{ width: '10%' }}>
              Diet 2
            </th>
            <th scope="col" style={{ width: '10%' }}>
              Diet 3
            </th>
            <th scope="col" style={{ width: '10%' }}>
              Kategori
            </th>
            <th scope="col" style={{ width: '10%' }}>
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {(datax || []).map((item, key) => (
            <tr key={key}>
              <td>
                <input type="checkbox" checked={item.checked} onChange={(e) => handleCheckboxChange(key, e)} />
              </td>
              <td>{item.noregistrasi}</td>
              <td>{item.nocm}</td>
              <td>{item.namapasien}</td>
              <td>{item.jenisorder}</td>
              <td>{item.diet1}</td>
              <td>{item.diet2}</td>
              <td>{item.diet3}</td>
              <td>{item.kategoridiet}</td>
              <td>{item.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end gap-2">
        <Button type="button" color='danger' placement="top"
          onClick={() => {
            // toggle()
          }}>
          Hapus
        </Button>
      </div>
    </>
  )
}

export default DaftarOrderMenuGizi