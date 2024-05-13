import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceBankDarah {
    getDetailJenisProdukBankDarah = async (queries) => {
        return await api.get(`/transaksi/bankdarah/list-detail-jenis-produkbankdarah`, queries);
    }
    postOrderPelayananBankDarah = async (body) => {
        return await api.create(`/transaksi/bankdarah/upsert-order-pelayanan-bank-darah`, body)
    }
    getRiwayatOrderBankDarah = async (queries) => {
        return await api.get(`/transaksi/bankdarah/riwayat-order-bank-darah`, queries);
    }
    getWidgetDaftarOrderBankDarah = async (queries) => {
        return await api.get(`/transaksi/bankdarah/widget-daftar-order-bank-darah`, queries);
    }
    getDaftarOrderBankDarah = async (queries) => {
        return await api.get(`/transaksi/bankdarah/daftar-order-bank-darah`, queries);
    }
    getListOrderByNorecOrder = async (queries) => {
        return await api.get(`/transaksi/bankdarah/order-bank-darah-by-norec`, queries);
    }
    postTglRencanaBankDarah = async (body) => {
        return await api.create(`/transaksi/bankdarah/update-tglrencana-pelayanan-bank-darah`, body)
    }
    postDeleteDetailOrder = async (body) => {
        return await api.create(`/transaksi/bankdarah/post-delete-detail-order-pelayanan-bank-darah`, body)
    }
    postVerifikasiOrderBankDarah = async (body) => {
        return await api.create(`/transaksi/bankdarah/post-verifikasi-order-pelayanan-bank-darah`, body)
    }
    getDaftarPasienBankDarah = async (queries) => {
        return await api.get(`/transaksi/bankdarah/daftar-pasien-bank-darah`, queries);
    }
    getListPenerimaan = async (queries) => {
        return await api.get(`/transaksi/bankdarah/list-penerimaan-bank-darah`, queries);
    }
    getListPemesanan = async (queries) => {
        return await api.get(`/transaksi/bankdarah/list-pemesanan-bank-darah`, queries);
    }
    getListRetur = async (queries) => {
        return await api.get(`/transaksi/bankdarah/list-retur-bank-darah`, queries);
    }
    getComboPenerimaanDarah = async (queries) => {
        return await api.get(`/master/combobox-penerimaan-darah`, queries);
    }
}