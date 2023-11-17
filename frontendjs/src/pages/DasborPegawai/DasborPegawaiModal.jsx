import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal } from 'reactstrap'
import {
  resetPasienBayar,
  resetPasienGadar,
  resetPasienPoliklinik,
  resetPasienRajal,
  resetPasienRanap,
  resetStatusPegawai,
} from '../../store/eis/action'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../Components/Table/NoDataTable'
import LoadingTable from '../../Components/Table/LoadingTable'
import { dateLocal } from '../../utils/format'

export const ModalStatusPegawai = () => {
  const dispatch = useDispatch()
  const statusPegawai = useSelector(
    (state) => state.Eis.tabelPasien.statusPegawai.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.statusPegawai.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Nama Pegawai</span>,
      sortable: true,
      selector: (row) => row.namapegawai,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">NIP</span>,
      selector: (row) => row.nip,
      sortable: true,
      width: '110px',
    },

    {
      name: <span className="font-weight-bold fs-13">Jabatan</span>,
      sortable: true,
      selector: (row) => row.namajabatan,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Profesi Pegawai</span>,
      sortable: true,
      selector: (row) => row.namaprofesi || '-',
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit || '-',
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Spesialisasi</span>,
      sortable: true,
      selector: (row) => row.namaspesialisasi,
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!statusPegawai}
      toggle={() => dispatch(resetStatusPegawai())}
      centered={true}
      size="lg"
    >
      <h4 className="p-3">{dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={statusPegawai || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'pegawai'} />}
      />
    </Modal>
  )
}

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#878A99',
      backgroundColor: '#F3F6F9',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#ffffff',
    },
  },
}
