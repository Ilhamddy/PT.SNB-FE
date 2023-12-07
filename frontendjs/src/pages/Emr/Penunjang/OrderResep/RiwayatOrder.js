import { Row, UncontrolledDropdown, UncontrolledTooltip, DropdownToggle, DropdownMenu, DropdownItem, } from "reactstrap"
import LoadingTable from "../../../../Components/Table/LoadingTable"
import NoDataTable from "../../../../Components/Table/NoDataTable"
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from "react-redux";
import { dateTimeLocal } from "../../../../utils/format";
import { tableCustomStyles } from "../../../../Components/Table/tableCustomStyles";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { deleteOrder, deleteOrderResep, getOrderResepFromDp } from "../../../../store/actions";
import DeleteModalCustom from "../../../../Components/Common/DeleteModalCustom";



const RiwayatOrder = () => {
    
    const {norecdp} = useParams()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const norecresep = searchParams.get("norecresep")
    const {
        listOrder,
        listVerif
    } = useSelector(state => ({
        listOrder: state.Emr.getOrderResepFromDP.data?.order || [],
        listVerif: state.Emr.getOrderResepFromDP.data?.veriforder || []
    }))

    const vDeleteResep = useFormik({
        initialValues: {
            norecresep: ""
        }, 
        onSubmit: (values) => {
            dispatch(
                deleteOrderResep(values, () => {
                    vDeleteResep.resetForm()
                    dispatch(getOrderResepFromDp({
                        norecdp: norecdp, 
                        norecresep: norecresep
                    }))
                })
            )
        }
    })


    const handleToNorec = (row) => {
        searchParams.set("norecresep", row.norecorder)
        setSearchParams(searchParams)
    }

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsOrder = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            cell: row => <div className="hstack gap-3 flex-wrap">
            <UncontrolledTooltip placement="top" target="edit-produk">
              Detail Produk
            </UncontrolledTooltip>
            <UncontrolledDropdown className="dropdown d-inline-block">
                <DropdownToggle
                    className="btn btn-soft-secondary btn-sm"
                    itemType="button"
                    id="edit-produk"
                >
                    <i className="ri-apps-2-line"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem onClick={() => handleToNorec(row)}>
                        <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                        Edit Order
                    </DropdownItem>
                    <DropdownItem onClick={() => vDeleteResep.setFieldValue("norecresep", row.norecorder)}>
                        <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                        Hapus Order
                    </DropdownItem>
                </DropdownMenu>

            </UncontrolledDropdown>
          </div>,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Order</span>,
            sortable: true,
            selector: row => row.noorder,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl. Order</span>,
            sortable: true,
            selector: row => dateTimeLocal(row.tanggalorder),
            width: "160px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Unit tujuan</span>,
            sortable: true,
            selector: row => row.namaunittujuan,
            width: "170px"
        }
        
    ];

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsVerif = [
        {
            name: <span className='font-weight-bold fs-13'>No Order/No Resep</span>,
            sortable: true,
            selector: row => row.noorder + "/" + row.noresep,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl. Order</span>,
            sortable: true,
            selector: row => dateTimeLocal(row.tanggalorder),
            width: "160px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl. Verif</span>,
            sortable: true,
            selector: row => dateTimeLocal(row.tanggalverif),
            width: "160px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Unit tujuan</span>,
            sortable: true,
            selector: row => row.namaunittujuan,
            width: "170px"
        }
        
    ];

    return(
        <>
            <DeleteModalCustom
                show={!!vDeleteResep.values.norecresep}
                onDeleteClick={() => {
                    vDeleteResep.handleSubmit()
                }}
                onCloseClick={() => vDeleteResep.resetForm()}
                msgHDelete='Apa Anda Yakin ?'
                msgBDelete={`Yakin ingin hapus resep ini`}
                buttonHapus="Hapus"
            />
            <Row className="mt-5">
                <h5>
                    Riwayat Order
                </h5>
                <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columnsOrder}
                    pagination
                    data={listOrder || []}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                    expandableRows
                    expandableRowsComponent={ExpandableRiwayat}
                    progressComponent={<LoadingTable />}
                    noDataComponent={<NoDataTable dataName={"order"}/>}
                />
                <h5 className="mt-4">
                    Riwayat Obat Diterima pasien
                </h5>
                <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columnsVerif}
                    pagination
                    data={listVerif || []}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                    expandableRows
                    expandableRowsComponent={ExpandableRiwayat}
                    progressComponent={<LoadingTable />}
                    noDataComponent={<NoDataTable dataName={"obat diterima pasien"}/>}
                />
            </Row>
        </>
    )
}

const ExpandableRiwayat = ({ data }) => {

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsDetail = [
        {
            name: <span className='font-weight-bold fs-13'>Kemasan</span>,
            selector: row => (row.racikan || [])?.length === 0 ? "Non Racikan" : "Racikan",
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Obat</span>,
            sortable: true,
            selector: row => `${row.namaobat || ""}`,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Qty</span>,
            sortable: true,
            selector: row => `${row.qty}`,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan</span>,
            sortable: true,
            selector: row => `${row.namasatuan || ""}`,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Signa</span>,
            sortable: true,
            selector: row => `${row.namasigna || ""}`,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            sortable: true,
            selector: row => `${row.namaketerangan}`,
            width: "100px"
        },
    ];
    return(
        <DataTable
            fixedHeader
            fixedHeaderScrollHeight="700px"
            columns={columnsDetail}
            data={data.resep || []}
            progressPending={false}
            customStyles={subTableCustomStyles}
            progressComponent={<LoadingTable />}
            expandableRowDisabled={row => (row.racikan || [])?.length === 0}
            expandableRows
            expandableRowsComponent={ExpandableRiwayatObat}
            noDataComponent={<NoDataTable dataName={"data obat"}/>}
        />
    )
}

const ExpandableRiwayatObat = ({ data }) => {

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsDetail = [
        {
            sortable: true,
            selector: row => row.koder,
            width: "47px"
        },
        {
            selector: row => (row.racikan || [])?.length === 0 ? "Non Racikan" : "Racikan",
            sortable: true,
            width: "100px"
        },
        {
            sortable: true,
            selector: row => `${row.namaobat || ""}`,
            width: "100px"
        },
        {
            sortable: true,
            selector: row => `${row.qty}`,
            width: "150px"
        },
        {
            sortable: true,
            selector: row => `${row.namasatuan || ""}`,
            width: "100px"
        },
        {
            sortable: true,
            selector: row => `${row.namasigna || ""}`,
            width: "150px"
        },
        {
            sortable: true,
            selector: row => `${row.namaketerangan}`,
            width: "100px"
        },
    ];
    return(
        <DataTable
            columns={columnsDetail}
            data={data.racikan || []}
            progressPending={false}
            customStyles={{...subTableCustomStyles, headRow: {...subTableCustomStyles.headRow, style: {...subTableCustomStyles.headRow.style, display: "none"}}}}
            progressComponent={<LoadingTable />}
            noDataComponent={<NoDataTable dataName={"data obat"}/>}
        />
    )
}

const subTableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#ECB349'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6",
            borderBottom: "1px solid #919191"
        },
    }
}

export default RiwayatOrder