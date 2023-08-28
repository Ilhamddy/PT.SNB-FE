import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {
    getAllMaster = async () => {
        return await api.get("/master/combobox");
    }

    getDesa = async (desa) => {
        return await api.get(`/master/desa-kelurahan?&param=${desa}`);
    }

    getKecamatan = async (desa) => {
        return await api.get(`/master/kecamatan`);
    }

    getComboRegistrasi = async (desa) => {
        return await api.get(`/master/combobox-registrasi`);
    }
    
    getComboAsuransi = async (asuransi) => {
        return await api.get(`/master/combobox-asuransi`);
    }

    getComboPulang = async () => {
        return await api.get(`/master/combobox-pulang`);
    }

    getProvinsiBpjs = async () => {
        return await api.get(`/transaksi/bridging/bpjs/provinsi`);
    }

    getKabupatenBpjs = async (provinsi) => {
        return await api.get(`/transaksi/bridging/bpjs/kabupaten/${provinsi}`);
    }

    getKecamatanBpjs = async (kabupaten) => {
        return await api.get(`/transaksi/bridging/bpjs/kecamatan/${kabupaten}`);
    }

    getComboPayment = async () => {
        return await api.get(`/master/combobox-payment`);
    }

    getComboSettingProduk = async () => {
        return await api.get(`/master/combobox-setting-produk`);
    }

    getComboPenerimaanBarang = async () => {
        return await api.get(`/master/combobox-penerimaan-barang`);
    }

    getComboDistributionOrder = async () => {
        return await api.get(`/master/combobox-distribusi-order`);
    }

    getComboStokOpname = async () => {
        return await api.get(`/master/combobox-stok-opname`);
    }

    getComboResep = async () => {
        return await api.get(`/master/combobox-resep`);
    }
    
    getComboVerifResep = async () => {
        return await api.get(`/master/combobox-verif-resep`);
    }
    
}