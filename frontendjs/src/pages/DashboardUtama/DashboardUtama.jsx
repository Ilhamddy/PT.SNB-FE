import { ToastContainer } from 'react-toastify'
import { Breadcrumb, Container } from 'reactstrap'

const DashboardUtama = () => {
  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <Breadcrumb title="Kirim Barang" pageTitle="Gudang" />
      </Container>
    </div>
  )
}
