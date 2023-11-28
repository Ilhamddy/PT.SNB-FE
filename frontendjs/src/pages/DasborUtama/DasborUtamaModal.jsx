import { useDispatch, useSelector } from 'react-redux'
import { Card, Modal } from 'reactstrap'
import {
  resetPasienBayar,
  resetPasienGadar,
  resetPasienPoliklinik,
  resetPasienRajal,
  resetPasienRanap,
  resetWidgetUtama,
} from '../../store/eis/action'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../Components/Table/NoDataTable'
import LoadingTable from '../../Components/Table/LoadingTable'
import { dateLocal } from '../../utils/format'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

export const ModalWidgetUtama = () => {
  const dispatch = useDispatch()
  const pasien = useSelector((state) => state.Eis.tabelPasien.widgetutama.data)
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.widgetutama.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },

    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pasien}
      toggle={() => dispatch(resetWidgetUtama())}
      centered={true}
      size="xl"
    >
      <h4 className="p-3">{dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pasien || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={dataName} />}
      />
    </Modal>
  )
}

export const ModalPasienRajal = () => {
  const dispatch = useDispatch()
  const pasienRajal = useSelector(
    (state) => state.Eis.tabelPasien.pasienRajal.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pasienRajal.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },

    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pasienRajal}
      toggle={() => dispatch(resetPasienRajal())}
      centered={true}
      size="xl"
    >
      <h4 className="p-3">List Pasien {dataName} Rawat Jalan</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pasienRajal?.items || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'kamar'} />}
      />
    </Modal>
  )
}

export const ModalPasienGaDar = () => {
  const dispatch = useDispatch()
  const pasienGadar = useSelector(
    (state) => state.Eis.tabelPasien.pasienGadar.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pasienGadar.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },

    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pasienGadar}
      toggle={() => dispatch(resetPasienGadar())}
      centered={true}
      size="xl"
    >
      <h4 className="p-3">List {dataName} Gawat Darurat</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pasienGadar?.items || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'gawat darurat'} />}
      />
    </Modal>
  )
}

export const ModalPasienRanap = () => {
  const dispatch = useDispatch()
  const pasienRanap = useSelector(
    (state) => state.Eis.tabelPasien.pasienRanap.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pasienRanap.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },

    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pasienRanap}
      toggle={() => dispatch(resetPasienRanap())}
      centered={true}
      size="xl"
    >
      <h4 className="p-3">List {dataName} Rawat Inap</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pasienRanap?.items || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'gawat darurat'} />}
      />
    </Modal>
  )
}

export const ModalPasienCaraBayar = () => {
  const dispatch = useDispatch()
  const pasienBayar = useSelector(
    (state) => state.Eis.tabelPasien.pasienBayar.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pasienBayar.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },

    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pasienBayar}
      toggle={() => dispatch(resetPasienBayar())}
      centered={true}
      size="xl"
    >
      <h4 className="p-3">List Cara Bayar {dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pasienBayar || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'gawat darurat'} />}
      />
    </Modal>
  )
}

export const ModalPoliklinik = () => {
  const dispatch = useDispatch()
  const pasienPoliklinik = useSelector(
    (state) => state.Eis.tabelPasien.pasienPoliklinik.data
  )
  const dataName = useSelector(
    (state) => state.Eis.tabelPasien.pasienPoliklinik.name || ''
  )
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },

    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '150px',
    },
  ]
  return (
    <Modal
      isOpen={!!pasienPoliklinik}
      toggle={() => dispatch(resetPasienPoliklinik())}
      centered={true}
      size="xl"
    >
      <h4 className="p-3">List Cara Bayar {dataName}</h4>
      <DataTable
        columns={columnsDetail}
        pagination
        data={pasienPoliklinik || []}
        progressPending={false}
        customStyles={tableCustomStyles}
        progressComponent={<LoadingTable />}
        noDataComponent={<NoDataTable dataName={'gawat darurat'} />}
      />
    </Modal>
  )
}
