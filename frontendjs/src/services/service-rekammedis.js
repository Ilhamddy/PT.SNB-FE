import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceRekammedis {

    getDaftarDokumenRekammedis = async (param) => {
        return await api.get(`/transaksi/rekammedis/list-daftar-dokumen-rekammedis?&noregistrasi=${param}`);
    }

    getWidgetDaftarDokumenRekammedis = async (param) => {
        return await api.get(`/transaksi/rekammedis/widget-list-daftar-dokumen-rekammedis?&noregistrasi=${param}`);
    }

    saveDokumenRekammedis = async (params) => {
        return await api.create("/transaksi/rekammedis/save-dokumen-rekammedis", params);
    }

    getComboLaporanRekammedis = async (param) => {
        return await api.get(`/transaksi/rekammedis/get-combo-laporan-rekammedis`);
    }
}