import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {
    getComboTambahLayanan = async (queries) => {
        return await api.get("/master/layanan/get-combo-tambah-layanan", queries);
    }
    
    upsertLayanan = async (data) => {
        return await api.create("/master/layanan/upsert-layanan", data)
    }

    getLayanan = async (queries) => {
        return await api.get("/master/layanan/get-layanan", queries)
    }

    getComboMapRuangPelayanan = async (queries) => {
        return await api.get("/master/layanan/get-combo-map-ruang-pelayanan", queries)
    }

    getMapUnitToProduk = async (queries) => {
        return await api.get("/master/layanan/get-map-unit-to-produk", queries)
    }

    getLayananMapping = async (queries) => {
        return await api.get("/master/layanan/get-layanan-mapping", queries)
    }

    saveOrDeleteMapping = async (data) => {
        return await api.create("/master/layanan/save-or-delete-mapping", data)
    }
    
    getLainLain = async (queries) => {
        return await api.get(`/master/layanan/get-lain-lain`, queries)
    }
    
    upsertJenisProduk = async (data) => {
        return await api.create(`/master/layanan/upsert-jenis-produk`, data)
    }

    upsertDetailJenisProduk = async (data) => {
        return await api.create(`/master/layanan/upsert-detail-jenis-produk`, data)
    }

    getMasterTarifLayanan = async (queries) => {
        return await api.get(`/master/layanan/get-master-tarif-layanan`, queries)
    }
    
    setVariabelBPJS = async (data) => {
        return await api.create(`/master/layanan/set-variabel-bpjs`, data)
    }
}