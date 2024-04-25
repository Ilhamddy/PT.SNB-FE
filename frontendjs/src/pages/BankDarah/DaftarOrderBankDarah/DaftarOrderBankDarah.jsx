import React, { useEffect, useState } from "react"
import UiContent from "../../../Components/Common/UiContent"
import { Button, Card, CardBody, CardHeader, Col, Container, Row, UncontrolledTooltip } from "reactstrap"
import BreadCrumb from "../../../Components/Common/BreadCrumb"
import { getDaftarOrderBankDarah, getWidgetDaftarOrderBankDarah } from "../../../store/bankDarah/bankDarahSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CountUp from "react-countup";
import pria from "../../../assets/images/svg/pria.svg"
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"
import LoadingTable from "../../../Components/Table/LoadingTable"
import { tableCustomStyles } from "../../../Components/Table/tableCustomStyles"
import DataTable from "react-data-table-component"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KontainerFlatpickr from "../../../Components/KontainerFlatpickr/KontainerFlatpickr"
import { useFormik } from "formik"
import DetailOrderModal from "../DetailOrderModal/DetailOrderModal"
import DeleteModalCustom from "../../../Components/Common/DeleteModalCustom"
import { deleteOrderPelayanan } from "../../../store/actions"

const DaftarOrderBankDarah = () => {
  document.title = "Daftar Order Bank Darah";
  const [dateNow] = useState(() => new Date().toISOString())
  const dispatch = useDispatch();
  const { data, datawidget, loading, error, deleteOrder, successOrder, loadingOrder } = useSelector((state) => ({
    data: state.bankDarahSlice.getDaftarOrderBankDarah?.data || [],
    datawidget: state.bankDarahSlice.getWidgetDaftarOrderBankDarah?.data || [],
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
      // dispatch(daftarPasienRJGet(newVal))
      dispatch(getWidgetDaftarOrderBankDarah({ dateStart: values.start, dateEnd: values.end }))
      dispatch(getDaftarOrderBankDarah({ dateStart: values.start, dateEnd: values.end }))
    },
  })
  useEffect(() => {
    dispatch(getWidgetDaftarOrderBankDarah({ dateStart: dateNow, dateEnd: dateNow }));
    dispatch(getDaftarOrderBankDarah({ dateStart: dateNow, dateEnd: dateNow }));
    // dispatch(listdaftarOrderRadiologiGet(''));
  }, [dispatch, dateNow]);
  const [idPencarian, setidPencarian] = useState(1);
  const [namaPencarian, setnamaPencarian] = useState('Belum Verif');
  const [search, setSearch] = useState('')
  const handleClickCard = (e) => {
    setidPencarian(e.id)
    setnamaPencarian(e.label)
    // if (e.id === 1) {
    //     dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
    //     dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=1`));
    // } else if (e.id === 2) {
    //     dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
    //     dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=2`));
    // } else if (e.id === 3) {
    //     dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
    //     dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=3`));
    // }
  };
  const [userChosen, setUserChosen] = useState({
    nama: "",
    id: "",
    profile: ''
  })
  const handleClick = (e) => {
    setUserChosen({
      profile: e.profile,
      nama: e.namapasien
    })
  };
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>Detail</span>,
      sortable: false,
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <Link to="#" onClick={() => { clickDetail(data) }} className="text-danger fs-15" ><i className="ri-apps-2-line"></i></Link>

          </div>
        );
      },
      width: "80px"
    },
    {
      name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
      selector: row => row.noregistrasi,
      sortable: true,
      width: "130px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Tgl Order</span>,
      selector: row => row.tglinput,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>No Order</span>,
      selector: row => row.nomororder,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Dokter Order</span>,
      selector: row => row.namalengkap,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
      selector: row => row.namaunit,
      sortable: true,
      width: "150px",
    },
    {

      name: <span className='font-weight-bold fs-13'>Keterangan</span>,
      selector: row => row.keterangan,
      sortable: true,
      // width: "250px",
    },
    {

      name: <span className='font-weight-bold fs-13'>Status</span>,
      selector: row => row.statusverif,
      sortable: true,
      // width: "250px",
    },
  ];
  const [detailModal, setdetailModal] = useState(false);
  const [tempNorecOrder, settempNorecOrder] = useState('');
  const clickDetail = (e) => {
    // let tempValue = {
    //     idpencarian: 4,
    //     norectrm: e.norectrm
    // }
    // console.log(tempValue)
    if (e.statusverif === "DIVERIF") {
      toast.error('Order Sudah Diverifikasi', { autoClose: 3000 });
      return
    } else if (e.statusverif === "DITOLAK") {
      toast.error('Order Sudah Ditolak', { autoClose: 3000 });
      return
    }
    settempNorecOrder(e.norec)
    setdetailModal(true)
  };
  const handleFilter = (e) => {
    if (e.keyCode === 13) {

      // dispatch(listdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
      // dispatch(widgetdaftarOrderRadiologiGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
    }
  }
  const handleBeginOnChangeStart = (newBeginValue) => {
    var dateString = new Date(newBeginValue).toISOString()
    vFilter.setFieldValue('start', dateString)
  }
  const handleBeginOnChangeEnd = (newBeginValue) => {
    var dateString = new Date(newBeginValue).toISOString()
    vFilter.setFieldValue('end', dateString)
  }
  const handleSimpan = () => {
    setdetailModal(false);
  };
  const [deleteModal, setDeleteModal] = useState(false);

  const handleTolak = () => {
    setdetailModal(false);
    setDeleteModal(true);
  };
  const handleDeleteOrder = () => {
    if (tempNorecOrder) {
      let tempValue = {
        norec: tempNorecOrder
      }
      dispatch(deleteOrderPelayanan(tempValue));
      setDeleteModal(false);
    }
  };
  return (
    <React.Fragment>
      <DetailOrderModal
        show={detailModal}
        onSimpanClick={handleSimpan}
        onCloseClick={() => setdetailModal(false)}
        tempNorec={tempNorecOrder}
        onTolakClick={handleTolak}
      />
      <DeleteModalCustom
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
        msgHDelete='Apa Kamu Yakin ?'
        msgBDelete='Yakin ingin menolak Order Ini?'
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daftar Order Bank Darah" pageTitle="Forms" />
          <Row>
            {datawidget.map((item, key) => (
              <Col xxl={4} sm={6} key={key}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-medium text-muted mb-0">Total Pasien {item.label}</p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                            <CountUp
                              start={0}
                              end={item.counter}
                              decimal={item.decimals}
                              // suffix={item.suffix}
                              duration={3}
                            />
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-md flex-shrink-0">
                          <span className={"avatar-title rounded-circle fs-4 bg-soft-" + item.iconClass + " text-" + item.iconClass}>
                            <img src={item.icon}
                              alt="" className="avatar-md" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <div className="card-footer p-2" style={{ backgroundColor: '#FFCB46' }}>
                    <div className="text-center">
                      <Link to="#" className="link-light" onClick={() => handleClickCard(item)}>View <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
            <Col lg={3}>
              <Card>
                <CardBody>
                  <div className="text-center">
                    {userChosen?.profile === 'baby' ? (
                      <img src={baby} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                    ) : userChosen?.profile === 'dewasalaki' ? (
                      <img src={pria} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                    ) : userChosen?.profile === 'anaklaki' ? (
                      <img src={anaklaki} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                    ) : userChosen?.profile === 'anakperempuan' ? (
                      <img src={anakperempuan} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                    ) : userChosen?.profile === 'dewasaperempuan' ? (
                      <img src={dewasaperempuan} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                    ) : userChosen?.profile === 'kakek' ? (
                      <img src={kakek} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                    ) : userChosen?.profile === 'nenek' ? (
                      <img src={nenek} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
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
                <CardHeader style={{
                  backgroundColor: "#FFCB46",
                  borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
                  padding: '10px 15px'
                }}>
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Order Radiologi</h4>
                </CardHeader>
                <CardBody>
                  <div className='mb-2'>
                    <Row>
                      <Col sm={4}>
                        <KontainerFlatpickr
                          options={{
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={vFilter.values.start}
                          onChange={([dateStart]) => {
                            handleBeginOnChangeStart(dateStart)
                          }}
                        />
                      </Col>
                      <Col lg={1}><h4 className='mt-2'>s/d</h4></Col>
                      <Col sm={4}>
                        <KontainerFlatpickr
                          isError={false}
                          options={{
                            dateFormat: 'Y-m-d',
                            defaultDate: 'today',
                          }}
                          value={vFilter.values.end}
                          onChange={([dateEnd]) => {
                            handleBeginOnChangeEnd(dateEnd)
                          }}
                        />
                      </Col>
                      {/* <Col lg={2}>
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input type="text" className="form-control search"
                              placeholder="Search..." onChange={event => vFilter.setFieldValue('search', event.target.value)}
                            // onKeyDown={handleFilter}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col> */}
                      <Col lg={1}>
                        <Button type="button" color='info' placement="top" id="tooltipTopPencarian"
                          onClick={() => {
                            vFilter.setFieldValue('taskid', '')
                            vFilter.handleSubmit()
                            setnamaPencarian('Keseluruhan')
                          }}>
                          CARI
                        </Button>
                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                      </Col>
                    </Row>
                  </div>

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
export default DaftarOrderBankDarah