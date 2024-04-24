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
}