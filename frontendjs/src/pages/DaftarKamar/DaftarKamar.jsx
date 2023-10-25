import { ToastContainer } from 'react-toastify'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'

const DaftarKamar = () => {
  return (
    <div className="page-content page-daftar-kamar">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Daftar Kamar" pageTitle="Kamar" />
      </Container>
    </div>
  )
}
