import { ToastContainer } from 'react-toastify'
import { Card, Container, Nav, NavItem, NavLink, TabContent } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getMasterTarifLayanan } from '../../store/payment/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import MasterTambahLayanan from './MasterTambahLayanan'
import {
  getComboTambahLayanan,
  getLayanan,
} from '../../store/masterdatalayanan/action'
import MapRuangPelayanan from './MapRuangPelayanan'
import LainLainPelayanan from './LainLainPelayanan'

const linkSettingProduk = '/master/setting-layanan'

const MasterSettingLayanan = () => {
  const { tabopen, id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="page-content page-data-layanan">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Setting Layanan" pageTitle="Master" />
        <Card>
          <div className="card-header align-items-center d-flex">
            <div className="flex-shrink-0 ms-2">
              <Nav
                tabs
                className={
                  'nav justify-content-end nav-tabs-custom' +
                  ' rounded card-header-tabs border-bottom-0 mt-3'
                }
              >
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    className={classnames({ active: tabopen === 'tambah' })}
                    onClick={() => {
                      navigate(linkSettingProduk + '/tambah')
                    }}
                  >
                    Tambah Layanan
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    className={classnames({
                      active: tabopen === 'map-ruang-pelayanan',
                    })}
                    onClick={() => {
                      navigate(linkSettingProduk + '/map-ruang-pelayanan')
                    }}
                  >
                    Map Ruang Pelayanan
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    className={classnames({ active: tabopen === 'lain-lain' })}
                    onClick={() => {
                      navigate(linkSettingProduk + '/lain-lain')
                    }}
                  >
                    Master Data
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <TabContent activeTab={tabopen} className="text-muted">
            <MasterTambahLayanan tabId={'tambah'} />
            <MapRuangPelayanan tabId={'map-ruang-pelayanan'} />
            <LainLainPelayanan tabId={'lain-lain'} />
          </TabContent>
        </Card>
      </Container>
    </div>
  )
}

export default MasterSettingLayanan
