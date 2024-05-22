import React, { useEffect, useState, useCallback } from 'react'
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
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import withRouter from '../../../Components/Common/withRouter'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import UiContent from '../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import EmrHeader from '../../Emr/EmrHeader/EmrHeader'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import { ToastContainer, toast } from 'react-toastify'
import {
  listPelayananRadiologiGet,
  radiologiResetForm,
  listComboRadiologiGet,
  emrHeaderGet,
} from '../../../store/actions'

import InputTindakan from '../../Emr/InputTindakan/InputTindakan'
import ExpertiseRadiologiModal from '../../../Components/Common/ExpertiseRadiologiModal/ExpertiseRadiologiModal'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import ExpertisePatologiModal from './ExpertisePatologiModal'
import { useSelectorRoot } from '../../../store/reducers'
import {
  getComboPatologiModal,
  getTransaksiPelayananPatologiByNorecDp,
} from '../../../store/patologi/patologiSlice'
import patologiAPI from 'sharedjs/src/patologi/patologiAPI'

// TODO: ubah semua yang masih memakai api radiologi
const TransaksiPelayananPatologi = () => {
  const { norecdp, norecap } = useParams()
  const dispatch = useDispatch()
  document.title = 'Transaksi Pelayanan Radiologi'
  const { dataPelayanan, loadingPelayanan, dataCombo, dataReg } =
    useSelectorRoot((state) => ({
      dataPelayanan:
        state.patologiSlice.getTransaksiPelayananPatologiByNorecDp.data
          .pelayanan,
      loadingPelayanan:
        state.patologiSlice.getTransaksiPelayananPatologiByNorecDp.loading,
      successPelayanan:
        state.patologiSlice.getTransaksiPelayananPatologiByNorecDp.success,
      dataCombo: state.Radiologi.listComboRadiologiGet.data,
      dataReg: state.Emr.emrHeaderGet.data,
    }))
  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(
      getTransaksiPelayananPatologiByNorecDp({
        ...patologiAPI.qGetTransaksiPelayananPatologiByNorecDp(),
        norecdp: norecdp,
      })
    )
    dispatch(getComboPatologiModal())
    dispatch(emrHeaderGet(norecap + `&norecdp=${norecdp}`))
  }, [norecap, norecdp, dispatch])

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (data) => {
        return (
          <Link
            onClick={() => handleClickExpertise(data)}
            className="link-success fs-15"
            id="tooltipTop"
          >
            <i className="ri-edit-2-line"></i>
          </Link>
        )
      },
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Pelayanan</span>,
      selector: (row) => row.tglinput,
      sortable: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Pemeriksaan</span>,
      selector: (row) => row.namaproduk,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Dokter Pengirim</span>,
      selector: (row) => row.pegawaipengirim,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit Pengirim</span>,
      selector: (row) => row.unitpengirim,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Dokter Radiologi</span>,
      selector: (row) => '',
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Perjanjian</span>,
      selector: (row) => row.tglperjanjian,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Photo</span>,
      selector: (row) => '',
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status Cito</span>,
      selector: (row) => row.statuscito,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => row.total,
      sortable: true,
    },
  ]
  const [pillsTab, setpillsTab] = useState('1')
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setpillsTab(tab)
    }
  }
  const taskWidgets = [
    {
      id: 1,
      label: 'Transaksi Pelayanan',
    },
    {
      id: 2,
      label: 'Tindakan',
    },
  ]
  const [showExpertiseModal, setshowExpertiseModal] = useState(false)
  const [norecPelayanan, setnorecPelayanan] = useState('')
  const [tempDokterPengirim, settempDokterPengirim] = useState('')
  const [tempIdRuanganPengirim, settempIdRuanganPengirim] = useState('')
  const [tempSelected, settempSelected] = useState('')
  const handleClickExpertise = (e) => {
    setshowExpertiseModal(true)
    setnorecPelayanan(e.norec)
    settempDokterPengirim(e.idpegawaipengirim)
    settempIdRuanganPengirim(e.idunitpengirim)
    settempSelected(e)
  }
  return (
    <React.Fragment>
      <ExpertisePatologiModal
        show={showExpertiseModal}
        dataReg={dataReg}
        onCloseClick={() => {
          setshowExpertiseModal(false)
        }}
        norecPelayanan={norecPelayanan}
        dataCombo={dataCombo}
        tempdokterpengirim={tempDokterPengirim}
        tempruanganpengirim={tempIdRuanganPengirim}
        tempSelected={tempSelected}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Transaksi Pelayanan Radiologi" pageTitle="Forms" />
          <Row>
            <Col xxl={12}>
              <EmrHeader />
            </Col>
            <Col ccl={12}>
              <Card>
                <CardBody>
                  <div className="card-header align-items-center d-flex">
                    <Nav
                      tabs
                      className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    >
                      {taskWidgets.map((item, key) => (
                        <NavItem key={key}>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              active: pillsTab === `${item.id}`,
                            })}
                            onClick={() => {
                              pillsToggle(`${item.id}`)
                            }}
                          >
                            <span className="fw-semibold">{item.label}</span>
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </div>
                  <TabContent activeTab={pillsTab} className="text-muted">
                    <TabPane tabId="1" id="home-1">
                      <Card>
                        <CardBody>
                          <div id="table-gridjs">
                            <DataTable
                              fixedHeader
                              fixedHeaderScrollHeight="700px"
                              columns={columns}
                              pagination
                              data={dataPelayanan}
                              progressPending={loadingPelayanan}
                              progressComponent={<LoadingTable />}
                              customStyles={tableCustomStyles}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="2" id="home-1">
                      <Card>
                        <CardBody>
                          <InputTindakan
                            idUnitFilter={[30]}
                            norecap={norecap}
                            norecdp={norecdp}
                          />
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default TransaksiPelayananPatologi
