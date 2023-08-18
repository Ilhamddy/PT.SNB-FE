import { ToastContainer } from "react-toastify";
import { 
    Button,
    Card, 
    CardBody, 
    Container, 
    Nav,
    NavItem,
    NavLink,
    TabPane
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { 
    useNavigate, 
    useParams 
} from "react-router-dom";
import classnames from "classnames";


const linkStokOpname = "/farmasi/gudang/stok-opname"

const StokOpname = () => {
    const navigate = useNavigate();
    const { tabopen } = useParams();
    return (
        <div className="page-content page-list-penerimaan">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="List produk" pageTitle="List Produk" />
                <Card className="p-5">
                    <Nav tabs 
                        className="nav justify-content-end 
                        nav-tabs-custom rounded card-header-tabs 
                        border-bottom-0">
                        <NavItem>
                            <NavLink 
                                style={{ cursor: "pointer", fontWeight: "bold" }} 
                                className={classnames({ active: tabopen === "daftar-stok-opname", })} 
                                onClick={() => { navigate(linkStokOpname + "/daftar-stok-opname"); }} >
                                Tambah Produk
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                style={{ cursor: "pointer", fontWeight: "bold" }} 
                                className={classnames({ active: tabopen === "edit-stok-opname", })} 
                                onClick={() => { navigate(linkStokOpname + "/edit-stok-opname"); }} >
                                Konversi Produk
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <CardBody>
                        <TabPane tabId={"daftar-stok-opname"} id="daftar-stok-opname">
                            <Button 
                                color={"info"}
                                type="button">
                                Menu
                            </Button>
                        </TabPane>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default StokOpname