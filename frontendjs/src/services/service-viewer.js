import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceViewer {
    getLoketSisa = async () => {
        return await api.get("/transaksi/viewer/get-loket-sisa");
    }

    panggilLoket = async (data) => {
        return await api.create("/transaksi/viewer/panggil-loket", data);
    }
    
    getAllLoket = async () => {
        return await api.get("/transaksi/viewer/get-all-loket");
    }

    getAllTerpanggil = async (queries) => {
        return await api.get("/transaksi/viewer/get-all-terpanggil", queries)
    }

    panggilUlangAntrian = async (data) => {
        return await api.create("/transaksi/viewer/panggil-ulang-antrean", data)
    }

    getJadwalDokter = async (queries) => {
        return api.get("/transaksi/viewer/get-jadwal-dokter", queries)
    }

    getJadwalOperasi = (queries) => {
        return api.get("/transaksi/viewer/get-jadwal-operasi", queries)
    }
    
    getAllBed = (queries) => {
        return api.get("/transaksi/viewer/get-all-bed", queries)
    }
    getAntreanObat = (queries) => {
        return api.get("/transaksi/viewer/antrean-obat", queries)
    }
}