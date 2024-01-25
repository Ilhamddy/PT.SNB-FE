import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServicePayment {

    getPelayananFromAntrean = async (norecdp) => {
        return await api.get(`/transaksi/payment/pelayanan-from-antrean/${norecdp}`);
    }

    createNotaVerif = async (body) => {
        return await api.create(`/transaksi/payment/create-nota-verif`, body);
    }

    getDaftarTagihanPasien = async (queries) => {
        return await api.get(`/transaksi/payment/get-daftar-tagihan-pasien`, queries);
    }

    getPelayananFromVerif = async (queries) => {
        return await api.get(`/transaksi/payment/pelayanan-from-verif`, queries);
    }

    createBuktiBayar = async (body) => {
        return await api.create(`/transaksi/payment/create-bukti-bayar`, body);
    }

    cancelNotaVerif = async ([norecnota, norecdp]) => {
        return await api.create(`/transaksi/payment/cancel-verif-nota/${norecnota}/${norecdp}`);
    }

    cancelBayar = async ([norecnota, norecbayar]) => {
        return await api.create(`/transaksi/payment/cancel-bayar/${norecnota}/${norecbayar}`);
    }

    getAllPiutang = async (queries) => {
        return await api.get(`/transaksi/payment/get-daftar-piutang-pasien`, queries);
    }

    getPaymentForPiutang = async (queries) => {
        return await api.get(`/transaksi/payment/get-payment-piutang-pasien`, queries);
    }
    getLaporanPendapatanKasir = async (param) => {
        return await api.get(`/transaksi/payment/get-laporan-pendapatan-kasir?&search=${param}`);
    }

    getPiutangAfterDate = async (queries) => {
        return await api.get(`/transaksi/payment/piutang-after-date`, queries)
    }

    getDaftarVerifikasiRemunerasi = async (queries) => {
        return await api.get(`/transaksi/payment/daftar-verifikasi-remunerasi`, queries)
    }
    upsertVerifikasiRemunerasi = async (body) => {
        return await api.create("/transaksi/payment/save-verifikasi-remunerasi", body)
    }
    getDaftarSudahVerifikasiRemunerasi = async (queries) => {
        return await api.get(`/transaksi/payment/daftar-sudah-verifikasi-remunerasi`, queries)
    }

    getComboSetor = async (queries) => {
        return await api.get(`/transaksi/payment/get-combo-setor`, queries)
    }

    getPembayaranSetor = async (queries) => {
        return await api.get(`/transaksi/payment/get-pembayaran-setor`, queries)
    }

    upsertSetoran = async (data) => {
        return await api.create(`/transaksi/payment/upsert-setoran`, data)
    }

}
