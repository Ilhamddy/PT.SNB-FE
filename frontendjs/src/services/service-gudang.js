import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceGudang {
    
    saveObatGudang = async (body) => {
        return await api.create(`/transaksi/gudang/tambah-or-edit-produk`, body);
    }

    getLainLain = async () => {
        return await api.get(`/transaksi/gudang/get-lain-lain`);
    }

    saveOrEditDetailProduk = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-detail-produk`, body)
    }

    saveOrEditSediaan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-sediaan`, body)
    }

    saveOrEditSatuan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-satuan`, body)
    }

    getProdukKonversi = async (queries) => {
        return await api.get(`/transaksi/gudang/get-produk-konversi`, queries)
    }

    getKemasanKonversi = async (queries) => {
        return await api.get(`/transaksi/gudang/get-kemasan-konversi`, queries)
    }

    saveOrEditKemasan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-kemasan`, body)
    }

    getProdukMaster = async (queries) => {
        return await api.get(`/transaksi/gudang/get-produk`, queries)
    }

    getProdukEdit = async (queries) => {
        return await api.get(`/transaksi/gudang/get-produk-edit`, queries)
    }

    getKemasanFromProduk = async (queries) => {
        return await api.get(`/transaksi/gudang/get-kemasan-from-produk`, queries)
    }

    saveOrEditPenerimaan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-penerimaan`, body)
    }
    
    getPenerimaan = async (queries) => {
        return await api.get(`/transaksi/gudang/get-penerimaan`, queries)
    }

    getListPenerimaan = async (queries) => {
        return await api.get(`/transaksi/gudang/get-list-penerimaan`, queries)
    }

    getKartuStok = async (queries) => {
        return await api.get(`/transaksi/gudang/get-kartu-stok`, queries)
    }

    getStokUnit = async (queries) => {
        return await api.get(`/transaksi/gudang/get-stok-unit`, queries)
    }

    createOrUpdateStokOpname = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-stok-opname`, body)
    }

    getStokOpname = async (queries) => {
        return await api.get(`/transaksi/gudang/get-stok-opname`, queries)
    }

    getStokOpnameDetail = async (queries) => {
        return await api.get(`/transaksi/gudang/get-stok-opname-detail`, queries)
    }

    updateStokOpnameDetails = async (body) => {
        return await api.create(`/transaksi/gudang/update-stok-opname-details`, body)
    }

    createOrUpdatePemesanan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-pemesanan`, body)
    }

    getPemesanan = async (queries) => {
        return await api.get(`/transaksi/gudang/get-pemesanan`, queries)
    }

    getListPemesanan = async (queries) => {
        return await api.get(`/transaksi/gudang/get-list-pemesanan`, queries)
    }
    
    getUnitUser = async(queries) => {
        return await api.get(`/transaksi/gudang/get-unit-user`, queries)
    }
}
