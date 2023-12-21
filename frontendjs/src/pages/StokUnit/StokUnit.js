import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getComboStokUnit, getOrderBarang, getStokUnitGudang } from "../../store/actions"
import LoadingTable from "../../Components/Table/LoadingTable"
import DataTable from "react-data-table-component"
import BreadCrumb from "../../Components/Common/BreadCrumb"
import { ToastContainer } from "react-toastify"
import { Button, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, FormFeedback, Row, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import ColLabelInput from "../../Components/ColLabelInput/ColLabelInput"
import CustomSelect from "../Select/Select"
import { tableCustomStyles } from "../../Components/Table/tableCustomStyles"


const StokUnitList = () => {
    const dispatch = useDispatch()

    const {
        stokUnit,
        unitUser
    } = useSelector(state => ({
        stokUnit: state.Gudang?.getStokUnitGudang?.data?.stokUnit || [],
        unitUser: state.Gudang.getComboStokUnit?.data?.unitUser || []
    }))

    const vFilter = useFormik({
        initialValues: {
            unit: '', 
        },
        validationSchema: Yup.object({
            unit: Yup.string().required("Unit wajib diisi")
        }),
        onSubmit: (values) => {
            dispatch(getStokUnitGudang(values))
        }
    })

    useEffect(() => {
        dispatch(getStokUnitGudang())
        dispatch(getComboStokUnit())
    }, [dispatch])

     /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
     const columnsProduk = [
        {
            name: <span className='font-weight-bold fs-13'></span>,
            cell: (row) => (
                <div className="hstack gap-3 flex-wrap">
                    <UncontrolledTooltip 
                        placement="top" 
                        target="menu-stok-unit" > 
                        Aksi 
                    </UncontrolledTooltip>
                    <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle 
                            className="btn btn-soft-secondary btn-sm" 
                            itemType="button"
                            id="menu-stok-unit">
                            <i className="ri-apps-2-line"></i>
                        </DropdownToggle>
                        {/* <DropdownMenu className="dropdown-menu-end">
                            <Link to={`/farmasi/gudang/stock-opname/${row.norecstokunit}`}>
                                <DropdownItem onClick={() => {
                                    }}>
                                    <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                    </i>
                                    Adjustment stok
                                </DropdownItem>
                            </Link>
                        </DropdownMenu> */}
                    </UncontrolledDropdown>
                </div>)
                ,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Id Produk</span>,
            sortable: true,
            selector: row => row.idproduk || "-",
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Batch</span>,
            sortable: true,
            selector: row => row.nobatch || "-",
            width: "100px"
        }, 
        {
            name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
            sortable: true,
            selector: row => row.namaproduk || "-",
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
            sortable: true,
            selector: row => row.namaunit || "-",
            width: "160px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Quantity</span>,
            sortable: true,
            selector: row => row.qty || "0",
            width: "100px"
        }, 
        {
            name: <span className='font-weight-bold fs-13'>Asal Barang</span>,
            sortable: true,
            selector: row => row.asalproduk || "-",
            width: "200px"
        }, 
        {
            name: <span className='font-weight-bold fs-13'>Harga</span>,
            sortable: true,
            selector: row => row.harga || "-",
            width: "100px"
        }, 

        
    ];

    return (
        <div className="page-content page-penerimaan-barang">
            <Container fluid>
                <BreadCrumb title="Order Barang" pageTitle="Gudang" />
                <Card className="p-5">
                    <Row className="mb-3">
                        <ColLabelInput 
                            label="Unit"
                            inputId="unit-filter"
                            lg={3}
                        >
                            <CustomSelect
                                id="unit"
                                name="unit"
                                options={unitUser}
                                onChange={(e) => {
                                    vFilter.setFieldValue('unit', e?.value || '')
                                }}
                                value={vFilter.values.unit}
                                className={`input row-header ${
                                    !!vFilter?.errors.unit ? 'is-invalid' : ''
                                }`}
                                />
                            {vFilter.touched.unit &&
                                !!vFilter.errors.unit && (
                                    <FormFeedback type="invalid">
                                        <div>{vFilter.errors.unit}</div>
                                    </FormFeedback>
                                )}
                        </ColLabelInput>
                        <ColLabelInput
                            label=""
                            inputId="tbl-cari"
                            lg="auto"
                        >
                            <Button onClick={() => {
                                    vFilter.handleSubmit()
                                }}
                                color="info"
                            >
                                Cari
                            </Button>
                        </ColLabelInput>
                    </Row>
                    <Row>
                        <DataTable 
                            fixedHeader
                            columns={columnsProduk}
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10]}
                            data={stokUnit}
                            progressPending={false}
                            customStyles={tableCustomStyles}
                            progressComponent={<LoadingTable />}
                            /> 
                    </Row>
                </Card>
            </Container>
        </div>

    )
}



export default StokUnitList