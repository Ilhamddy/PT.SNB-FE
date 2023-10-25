import { Container, Row } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'

const DaftarUnit = () => {
  return (
    <div className="page-content page-daftar-kamar">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Daftar Kasur" pageTitle="Kasur" />
        <Row></Row>
      </Container>
    </div>
  )
}

export default DaftarUnit
