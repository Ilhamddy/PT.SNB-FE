import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal } from 'reactstrap'
import {
  resetPasienBayar,
  resetPasienGadar,
  resetPasienPoliklinik,
  resetPasienRajal,
  resetPasienRanap,
  resetPembayaran,
  resetStatusPegawai,
} from '../../../store/eis/action'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../../Components/Table/NoDataTable'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { dateLocal, dateTimeLocal } from '../../../utils/format'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import ModalApp from '../../../Components/Common/ModalApp'

export const ModalPembayaran = () => {
  const dispatch = useDispatch()
  const pembayaran = useSelector(
    (state) => state.Eis.tabelPasien.pembayaran.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pembayaran.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No Bukti</span>,
      sortable: true,
      selector: (row) => row.nobukti,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total Bayar</span>,
      selector: (row) =>
        'Rp' + (row.totalbayar?.toLocaleString('id-ID') || '0'),
      sortable: true,
      width: '160px',
    },

    {
      name: <span className="font-weight-bold fs-13">Tanggal Bayar</span>,
      sortable: true,
      selector: (row) => dateTimeLocal(row.tglbayar),
      width: '160px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pegawai</span>,
      sortable: true,
      selector: (row) => row.namapegawai,
      width: '160px',
    },
  ]
  return (
    <ModalApp
      isOpen={!!pembayaran}
      toggle={() => dispatch(resetPembayaran())}
      centered={true}
      size="lg"
    >
      <h4 className="p-3">{dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pembayaran || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'pegawai'} />}
      />
    </ModalApp>
  )
}
