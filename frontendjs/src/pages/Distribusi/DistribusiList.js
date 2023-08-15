import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOrderList } from "../../store/actions"


const DistribusiList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrderList({}))
    }, [dispatch])

    return (
        <div>
            {/* <DataTable 
                fixedHeader
                columns={columnsProduk}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5]}
                data={detailjenisproduk}
                progressPending={detailjenisLoading}
                customStyles={tableCustomStyles}
                progressComponent={<LoadingTable />}

                /> */}
        </div>
    )
}


export default DistribusiList