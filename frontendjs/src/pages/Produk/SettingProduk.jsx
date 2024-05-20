import { useState, useEffect, useRef } from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap'
import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { comboSettingProdukGet } from '../../store/master/action'
import { KonversiProduk } from './KonversiProduk'
import LainLain from './LainLain'
import TambahProduk from './TambahProduk'

const linkSettingProduk = '/farmasi/gudang/setting-produk'

const SettingProduk = () => {
  const { tabopen } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(comboSettingProdukGet())
  }, [dispatch])

  return (
    <div className="page-content page-setting-produk">
      <Container fluid>
        <BreadCrumb title="Master Produk" pageTitle="Gudang" />
        <Card>
          <div className="card-header align-items-center d-flex">
            <div className="flex-shrink-0 ms-2">
              <Nav
                tabs
                className="nav justify-content-end 
                                    nav-tabs-custom rounded card-header-tabs 
                                    border-bottom-0"
              >
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    className={classnames({ active: tabopen === 'tambah' })}
                    onClick={() => {
                      navigate(linkSettingProduk + '/tambah')
                    }}
                  >
                    Tambah Produk
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    className={classnames({
                      active: tabopen === 'konversi-produk',
                    })}
                    onClick={() => {
                      navigate(linkSettingProduk + '/konversi-produk')
                    }}
                  >
                    Konversi Produk
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
                    Lain-lain
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <CardBody>
            <TabContent activeTab={tabopen} className="text-muted">
              <TambahProduk tabId={'tambah'} />
              <LainLain tabId={'lain-lain'} />
              <KonversiProduk tabId={'konversi-produk'} />
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default SettingProduk
