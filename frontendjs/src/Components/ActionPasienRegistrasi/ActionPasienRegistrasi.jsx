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
import classnames from 'classnames'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const initProfil = {
  namaPasien: null,
  noIdentitas: null,
  norm: null,
  nohp: null,
  alamat: null,
  search: null,
  idcmfk: null,
}

const ActionPasienRegistrasi = ({ profil = initProfil, buttonAction }) => {
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

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <div className="text-center mt-3">
              <img
                src={userDummy}
                className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                alt="user-profile"
              />
              <h5 className="fs-17 mb-1">{profil?.namaPasien}</h5>
              <p className="text-muted mb-0">{profil?.noIdentitas}</p>
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
                          <tr>
                            <th className="ps-0" scope="row">
                              NoRM :
                            </th>
                            <td className="text-muted">{profil?.norm}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              No Hp :
                            </th>
                            <td className="text-muted">{profil?.nohp}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              Alamat :
                            </th>
                            <td className="text-muted">{profil?.alamat}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </TabPane>

              <TabPane tabId="2" id="profile-1">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    In some designs, you might adjust your tracking to create a
                    certain artistic effect. It can also help you fix fonts that
                    are poorly spaced to begin with.
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet mornings of spring which I enjoy with my
                    whole heart.
                  </div>
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
                    <ToastContainer autoClose={2000} />
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
