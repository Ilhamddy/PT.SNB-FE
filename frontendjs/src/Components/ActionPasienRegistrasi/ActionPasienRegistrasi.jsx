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
import userDummy from '../../assets/images/users/user-dummy-img.jpg'
import pria from '../../assets/images/svg/pria.svg'
import baby from '../../assets/images/svg/baby.svg'
import anaklaki from '../../assets/images/svg/anaklaki.svg'
import kakek from '../../assets/images/svg/kakek.svg'
import nenek from '../../assets/images/svg/nenek.svg'
import anakperempuan from '../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../assets/images/svg/dewasaperempuan.svg'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getHistoryRegistrasi } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import CustomSelect from '../Common/CustomSelect/CustomSelect'

export const initProfil = {
  profile: null,
  namaPasien: null,
  noIdentitas: null,
  norm: null,
  nohp: null,
  notelepon: null,
  alamat: null,
  search: null,
  idcmfk: null,
  jeniskelamin: null,
  golongandarah: null,
  alamatdomisili: null,
  namaibu: null,
  pendidikan: null,
  pekerjaan: null,
  agama: null,
  statusperkawinan: null,
  namasuamiistri: null,
}

const ActionPasienRegistrasi = ({ profil = initProfil, buttonAction }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => ({
    data: state.Registrasi.getHistoryRegistrasi.data,
    loading: state.Registrasi.getHistoryRegistrasi.loading,
    error: state.Registrasi.getHistoryRegistrasi.error,
  }))
  const [pillsTab, setPillsTab] = useState('1')
  const navigate = useNavigate()
  const pillsToggle = (tab) => {
    if (pillsTab !== tab) {
      setPillsTab(tab)
    }
  }
  const defaultnotify = (pesan) =>
    toast(pesan, {
      position: 'top-right',
      hideProgressBar: false,
      className: 'bg-warning text-white',
      progress: undefined,
    })

  const handleClickButton = (e) => {
    if (profil.idcmfk === null) {
      defaultnotify('Pasien Belum Dipilih')
      return
    }
  }
  const [rowPage, setrowPage] = useState(5)
  useEffect(() => {
    if (profil.idcmfk !== null) {
      dispatch(getHistoryRegistrasi({ nocmfk: profil.idcmfk, rows: rowPage }))
    }
  }, [profil.idcmfk, rowPage, dispatch])

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <div className="text-center mt-3">
              {/* <img
                src={userDummy}
                className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                alt="user-profile"
              /> */}
              {profil?.profile === 'baby' ? (
                <img
                  src={baby}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : profil?.profile === 'dewasalaki' ? (
                <img
                  src={pria}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : profil?.profile === 'anaklaki' ? (
                <img
                  src={anaklaki}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : profil?.profile === 'anakperempuan' ? (
                <img
                  src={anakperempuan}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : profil?.profile === 'dewasaperempuan' ? (
                <img
                  src={dewasaperempuan}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : profil?.profile === 'kakek' ? (
                <img
                  src={kakek}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : profil?.profile === 'nenek' ? (
                <img
                  src={nenek}
                  alt=""
                  className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                />
              ) : (
                // Render when none of the conditions are met
                <p>No profile image available</p>
              )}
              <h5 className="fs-17 mb-1">{profil?.namaPasien}</h5>
              <p className="text-muted mb-0">{profil?.jeniskelamin}</p>
              <p className="text-muted mb-0">{profil?.golongandarah}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Nav pills className="nav-success mb-3">
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  className={classnames({ active: pillsTab === '1' })}
                  onClick={() => {
                    pillsToggle('1')
                  }}
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  className={classnames({ active: pillsTab === '2' })}
                  onClick={() => {
                    pillsToggle('2')
                  }}
                >
                  Riwayat
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  className={classnames({ active: pillsTab === '3' })}
                  onClick={() => {
                    pillsToggle('3')
                  }}
                >
                  Action
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={pillsTab} className="text-muted">
              <TabPane tabId="1" id="home-1">
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table-borderless mb-0">
                        <tbody>
                          <tr className="border-bottom">
                            <td className="text-muted">
                              {profil?.alamatdomisili || '-'}
                            </td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted">
                              {profil?.nohp || '-'} / {profil?.notelepon || '-'}
                            </td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted">
                              Nama Ibu: {profil?.namaibu || '-'}
                            </td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted">
                              {profil?.pendidikan || '-'} /{' '}
                              {profil?.pekerjaan || '-'}
                            </td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted">
                              {profil?.statusperkawinan || '-'} /{' '}
                              {profil?.namasuamiistri || '-'}
                            </td>
                          </tr>
                          <tr className="border-bottom">
                            <td className="text-muted">{profil?.agama}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </TabPane>

              <TabPane tabId="2" id="profile-1">
                <Col className="mb-3" lg={12}>
                  <CustomSelect
                    id="DataName"
                    name="DataName"
                    options={[
                      {
                        label: '5',
                        value: 5,
                      },
                      {
                        label: '10',
                        value: 10,
                      },
                      {
                        label: '15',
                        value: 15,
                      },
                      {
                        label: '20',
                        value: 20,
                      },
                    ]}
                    onChange={(e) => {
                      setrowPage(e?.value)
                      dispatch(
                        getHistoryRegistrasi({
                          nocmfk: profil.idcmfk,
                          rows: e?.value,
                        })
                      )
                    }}
                    value={rowPage}
                  />
                </Col>
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  {(data || []).map((item, key) => (
                    <React.Fragment key={key}>
                      <Card
                        className="product card-animate"
                        style={{ backgroundColor: '#16B3AC' }}
                      >
                        <CardBody>
                          <Row className="gy-3">
                            <h6 className="card-title mb-0">
                              <span
                                className="badge align-middle fs-12"
                                style={{ color: 'black' }}
                              >
                                {item.displaytgl}
                              </span>
                            </h6>
                            <div className="col-sm">
                              <div className="text-lg-start">
                                <p className="mb-0" style={{ color: 'white' }}>
                                  {item.noregistrasi} ({item.jaminan1})
                                </p>
                                <p className="mb-0" style={{ color: 'white' }}>
                                  {item.namaunit}
                                </p>
                                <p className="mb-0" style={{ color: 'white' }}>
                                  {item.dpjp}
                                </p>
                              </div>
                            </div>
                          </Row>
                        </CardBody>
                      </Card>
                    </React.Fragment>
                  ))}
                </div>
              </TabPane>
              <TabPane tabId="3" id="messages-1">
                <div className="live-preview">
                  <div className="d-flex flex-column gap-2">
                    {(buttonAction || []).map((button, key) => (
                      <Button
                        key={key}
                        color="info"
                        className="btn-animation"
                        data-text={button.name}
                        onClick={() => {
                          if (!button.onClick) {
                            console.error('onClick is not defined')
                            return
                          }
                          if (!profil?.idcmfk) {
                            defaultnotify('Pasien Belum Dipilih')
                            return
                          }
                          button.onClick(profil)
                        }}
                      >
                        <span>{button.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="4" id="settings-1">
                <div className="d-flex mt-2">
                  <div className="flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    For that very reason, I went on a quest and spoke to many
                    different professional graphic designers and asked them what
                    graphic design tips they live.
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    After gathering lots of different opinions and graphic
                    design basics, I came up with a list of 30 graphic design
                    tips that you can start implementing.
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default ActionPasienRegistrasi
