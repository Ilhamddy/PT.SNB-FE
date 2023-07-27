import { 
    useState, 
    useEffect, 
    useRef 
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, 
    Col, 
    Input, 
    Label, 
    Row, 
    TabPane 
} from "reactstrap";
import CustomSelect from "../Select/Select";
import DataTable from "react-data-table-component";
import { konversiQueryGet } from "../../store/gudang/action";

const KonversiProduk = () => {
    const dispatch = useDispatch();
    const refQSearch = useRef("");

    const { konversiQuery } = useSelector(state => ({
        konversiQuery: state.Gudang.konversiQueryGet.data?.produk || []
    }));

    console.log(konversiQuery)

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsProduk = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Barcode</span>,
            sortable: true,
            selector: row => row.barcode,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
            sortable: true,
            selector: row => row.namaproduk,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan Jual</span>,
            selector: row => row.satuan,
            sortable: true,
            width: "170px"
        }
    ];

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsKonversi = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Kemasan</span>,
            sortable: true,
            selector: row => row.kemasan,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Jumlah</span>,
            sortable: true,
            selector: row => row.jumlah,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan Jual</span>,
            selector: row => row.satuan,
            sortable: true,
            width: "170px"
        }
    ];

    useEffect(() => {
        dispatch(konversiQueryGet({ qsearch: refQSearch.current }))
    }, [dispatch])

    useEffect(() => {
        console.log(konversiQuery)
    }, [konversiQuery])
    
    return (
        <TabPane tabId="konversi-produk" id="home2">
            <Row className="mb-5">
                <Col lg={4}>
                    <Label className="form-label mt-2" 
                        htmlFor="tipeproduk"
                        style={{ color: "black" }} 
                        >
                        Nama Produk/Deskripsi Produk
                    </Label>
                </Col>
                <Col lg={5}>
                    <Input 
                        id={`namaproduk`}
                        name={`namaproduk`}
                        type="text"
                        onChange={(e) => {refQSearch.current = e.target.value}}
                        />
                </Col>
                <Col lg={2}>
                    <Button type="button"
                        color="info" 
                        className="rounded-pill" 
                        placement="top" 
                    >
                        Cari
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <DataTable 
                        fixedHeader
                        columns={columnsProduk}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5]}
                        data={[]}
                        progressPending={false}
                        customStyles={tableCustomStyles}
                    />
                </Col>
                <Col lg={6}>
                    <Row className="mb-2">
                        <DataTable 
                            fixedHeader
                            columns={columnsKonversi}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5]}
                            data={konversiQuery}
                            progressPending={false}
                            customStyles={tableCustomStyles}
                        />
                    </Row>
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label className="form-label mt-2" 
                                htmlFor="kemasan"
                                style={{ color: "black" }}
                                >
                            Kemasan
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`sediaan`}
                                name={`sediaan`}
                                options={[]}
                                onChange={(e) => {}}
                                value={""}
                                />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label className="form-label mt-2" 
                                htmlFor="kemasan"
                                style={{ color: "black" }}
                                >
                            Jumlah/konversi
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`sediaan`}
                                name={`sediaan`}
                                options={[]}
                                onChange={(e) => {}}
                                value={""}
                                />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label className="form-label mt-2" 
                                htmlFor="kemasan"
                                style={{ color: "black" }}
                                >
                            Satuan Jual
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`sediaan`}
                                name={`sediaan`}
                                options={[]}
                                onChange={(e) => {}}
                                value={""}
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </TabPane>
    )
}

const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#B57602'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },

    }
}

export { KonversiProduk }