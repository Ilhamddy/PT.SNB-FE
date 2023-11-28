import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal } from 'reactstrap'
import {
  resetPemesanan,
  resetPenerimaan,
  resetRetur,
  resetStatusPegawai,
} from '../../store/eis/action'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../Components/Table/NoDataTable'
import LoadingTable from '../../Components/Table/LoadingTable'
import { dateLocal } from '../../utils/format'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

export const ModalPemesanan = () => {
  const dispatch = useDispatch()
  const pemesanan = useSelector((state) => state.Eis.tabelPasien.pemesanan.data)
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pemesanan.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      sortable: true,
      selector: (row) => row.noorder,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Order</span>,
      selector: (row) => dateLocal(row.tglorder),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Supplier</span>,
      sortable: true,
      selector: (row) => row.namasupplier,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Item Dipesan</span>,
      sortable: true,
      selector: (row) => row.totalpesan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit || '-',
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pemesanan}
      toggle={() => dispatch(resetPemesanan())}
      centered={true}
      size="lg"
    >
      <h4 className="p-3">{dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pemesanan || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'pegawai'} />}
      />
    </Modal>
  )
}

export const ModalPenerimaan = () => {
  const dispatch = useDispatch()
  const penerimaan = useSelector(
    (state) => state.Eis.tabelPasien.penerimaan.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.penerimaan.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No Terima</span>,
      sortable: true,
      selector: (row) => row.noterima,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Terima</span>,
      selector: (row) => dateLocal(row.tglterima),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Supplier</span>,
      sortable: true,
      selector: (row) => row.namasupplier,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Item Terima</span>,
      sortable: true,
      selector: (row) => row.totalterima,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit || '-',
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!penerimaan}
      toggle={() => dispatch(resetPenerimaan())}
      centered={true}
      size="lg"
    >
      <h4 className="p-3">{dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={penerimaan || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'pegawai'} />}
      />
    </Modal>
  )
}

export const ModalRetur = () => {
  const dispatch = useDispatch()
  const retur = useSelector((state) => state.Eis.tabelPasien.retur.data)
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.retur.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No Retur</span>,
      sortable: true,
      selector: (row) => row.noretur,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Retur</span>,
      selector: (row) => dateLocal(row.tglretur),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Supplier</span>,
      sortable: true,
      selector: (row) => row.namasupplier,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Item Retur</span>,
      sortable: true,
      selector: (row) => row.totalretur,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit || '-',
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!retur}
      toggle={() => dispatch(resetRetur())}
      centered={true}
      size="lg"
    >
      <h4 className="p-3">{dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={retur || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'pegawai'} />}
      />
    </Modal>
  )
}
