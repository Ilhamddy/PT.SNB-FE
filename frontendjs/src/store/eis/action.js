import {
    GET_PASIEN_RJ,
    GET_PASIEN_RJ_SUCCESS,
    GET_PASIEN_RJ_ERROR,
    GET_PASIEN_IGD,
    GET_PASIEN_IGD_SUCCESS,
    GET_PASIEN_IGD_ERROR,
    GET_PASIEN_RANAP,
    GET_PASIEN_RANAP_SUCCESS,
    GET_PASIEN_RANAP_ERROR,
    GET_COUNT_CARA_BAYAR,
    GET_COUNT_CARA_BAYAR_SUCCESS,
    GET_COUNT_CARA_BAYAR_ERROR,
    GET_POLIKLINIK_TERBANYAK,
    GET_POLIKLINIK_TERBANYAK_SUCCESS,
    GET_POLIKLINIK_TERBANYAK_ERROR,
    GET_COUNT_UNIT,
    GET_COUNT_UNIT_SUCCESS,
    GET_COUNT_UNIT_ERROR,
    GET_STATUS_PEGAWAI,
    GET_STATUS_PEGAWAI_SUCCESS,
    GET_STATUS_PEGAWAI_ERROR,
    GET_PEGAWAI_PENSIUN,
    GET_PEGAWAI_PENSIUN_SUCCESS,
    GET_PEGAWAI_PENSIUN_ERROR,
    GET_DASBOR_FARMASI,
    GET_DASBOR_FARMASI_SUCCESS,
    GET_DASBOR_FARMASI_ERROR,
    GET_DASBOR_PEMBAYARAN,
    GET_DASBOR_PEMBAYARAN_SUCCESS,
    GET_DASBOR_PEMBAYARAN_ERROR,
    SET_WIDGET_UTAMA,
    RESET_WIDGET_UTAMA,
    SET_PASIEN_RAJAL,
    RESET_PASIEN_RAJAL,
    SET_PASIEN_GADAR,
    RESET_PASIEN_GADAR,
    SET_PASIEN_RANAP,
    RESET_PASIEN_RANAP,
    SET_PASIEN_BAYAR,
    RESET_PASIEN_BAYAR,
    SET_PASIEN_POLIKLINIK,
    RESET_PASIEN_POLIKLINIK,
    SET_STATUS_PEGAWAI,
    RESET_STATUS_PEGAWAI,
    SET_PEMBAYARAN,
    RESET_PEMBAYARAN,
    SET_PEMESANAN,
    RESET_PEMESANAN,
    SET_PENERIMAAN,
    RESET_PENERIMAAN,
    SET_RETUR,
    RESET_RETUR,
    SET_JUMLAH_OBAT,
    RESET_JUMLAH_OBAT
} from "./actionType"


export const getPasienRJ = (queries) => ({
    type: GET_PASIEN_RJ,
    payload: {queries: queries}
})

export const getPasienRJSuccess = (data) => ({
    type: GET_PASIEN_RJ_SUCCESS,
    payload: data
})

export const getPasienRJError = (error) => ({
    type: GET_PASIEN_RJ_ERROR,
    payload: error
})

export const getPasienIGD = (queries) => ({
    type: GET_PASIEN_IGD,
    payload: {queries: queries}
})

export const getPasienIGDSuccess = (data) => ({
    type: GET_PASIEN_IGD_SUCCESS,
    payload: data
})

export const getPasienIGDError = (error) => ({
    type: GET_PASIEN_IGD_ERROR,
    payload: error
})

export const getPasienRanap = (queries) => ({
    type: GET_PASIEN_RANAP,
    payload: {queries: queries}
})

export const getPasienRanapSuccess = (data) => ({
    type: GET_PASIEN_RANAP_SUCCESS,
    payload: data
})

export const getPasienRanapError = (error) => ({
    type: GET_PASIEN_RANAP_ERROR,
    payload: error
})

export const getCountCaraBayar = (queries) => ({
    type: GET_COUNT_CARA_BAYAR,
    payload: {queries: queries}
})

export const getCountCaraBayarSuccess = (data) => ({
    type: GET_COUNT_CARA_BAYAR_SUCCESS,
    payload: data
})

export const getCountCaraBayarError = (error) => ({
    type: GET_COUNT_CARA_BAYAR_ERROR,
    payload: error
})

export const getPoliklinikTerbanyak = (queries) => ({
    type: GET_POLIKLINIK_TERBANYAK,
    payload: {queries: queries}
})

export const getPoliklinikTerbanyakSuccess = (data) => ({
    type: GET_POLIKLINIK_TERBANYAK_SUCCESS,
    payload: data
})

export const getPoliklinikTerbanyakError = (error) => ({
    type: GET_POLIKLINIK_TERBANYAK_ERROR,
    payload: error
})


export const getCountUnit = (queries) => ({
    type: GET_COUNT_UNIT,
    payload: {queries: queries}
})

export const getCountUnitSuccess = (data) => ({
    type: GET_COUNT_UNIT_SUCCESS,
    payload: data
})

export const getCountUnitError = (error) => ({
    type: GET_COUNT_UNIT_ERROR,
    payload: error
})

export const getStatusPegawai = (queries) => ({
    type: GET_STATUS_PEGAWAI,
    payload: {queries: queries}
})

export const getStatusPegawaiSuccess = (data) => ({
    type: GET_STATUS_PEGAWAI_SUCCESS,
    payload: data
})

export const getStatusPegawaiError = (error) => ({
    type: GET_STATUS_PEGAWAI_ERROR,
    payload: error
})


export const getPegawaiPensiun = (queries) => ({
    type: GET_PEGAWAI_PENSIUN,
    payload: {queries: queries}
})

export const getPegawaiPensiunSuccess = (data) => ({
    type: GET_PEGAWAI_PENSIUN_SUCCESS,
    payload: data
})

export const getPegawaiPensiunError = (error) => ({
    type: GET_PEGAWAI_PENSIUN_ERROR,
    payload: error
})


export const getDasborFarmasi = (queries) => ({
    type: GET_DASBOR_FARMASI,
    payload: {queries: queries}
})

export const getDasborFarmasiSuccess = (data) => ({
    type: GET_DASBOR_FARMASI_SUCCESS,
    payload: data
})

export const getDasborFarmasiError = (error) => ({
    type: GET_DASBOR_FARMASI_ERROR,
    payload: error
})

export const getDasborPembayaran = (queries) => ({
    type: GET_DASBOR_PEMBAYARAN,
    payload: {queries: queries}
})

export const getDasborPembayaranSuccess = (data) => ({
    type: GET_DASBOR_PEMBAYARAN_SUCCESS,
    payload: data
})

export const getDasborPembayaranError = (error) => ({
    type: GET_DASBOR_PEMBAYARAN_ERROR,
    payload: error
})


export const setPasienRajal = (name, data) => ({
    type: SET_PASIEN_RAJAL,
    payload: {
        name: name,
        data: data
    }
})

export const resetPasienRajal = () => ({
    type: RESET_PASIEN_RAJAL,
})

export const setPasienGadar = (name, data) => ({
    type: SET_PASIEN_GADAR,
    payload: {
        name: name,
        data: data
    }
})

export const resetPasienGadar = () => ({
    type: RESET_PASIEN_GADAR,
})

export const setPasienRanap = (name, data) => ({
    type: SET_PASIEN_RANAP,
    payload: {
        name: name,
        data: data
    }
})

export const resetPasienRanap = () => ({
    type: RESET_PASIEN_RANAP,
})

export const setWidgetUtama = (name, data) => ({
    type: SET_WIDGET_UTAMA,
    payload: {
        name: name,
        data: data
    }
})

export const resetWidgetUtama = () => ({
    type: RESET_WIDGET_UTAMA,
})

export const setPasienBayar = (name, data) => ({
    type: SET_PASIEN_BAYAR,
    payload: {
        name: name,
        data: data
    }
})

export const resetPasienBayar = () => ({
    type: RESET_PASIEN_BAYAR,
})

export const setPasienPoliklinik = (name, data) => ({
    type: SET_PASIEN_POLIKLINIK,
    payload: {
        name: name,
        data: data
    }
})

export const resetPasienPoliklinik = () => ({
    type: RESET_PASIEN_POLIKLINIK,
})


export const setStatusPegawai = (name, data) => ({
    type: SET_STATUS_PEGAWAI,
    payload: {
        name: name,
        data: data
    }
})

export const resetStatusPegawai = () => ({
    type: RESET_STATUS_PEGAWAI,
})


export const setPembayaran = (name, data) => ({
    type: SET_PEMBAYARAN,
    payload: {
        name: name,
        data: data
    }
})

export const resetPembayaran = () => ({
    type: RESET_PEMBAYARAN,
})


export const setPemesanan = (name, data) => ({
    type: SET_PEMESANAN,
    payload: {
        name: name,
        data: data
    }
})

export const resetPemesanan = () => ({
    type: RESET_PEMESANAN,
})

export const setPenerimaan = (name, data) => ({
    type: SET_PENERIMAAN,
    payload: {
        name: name,
        data: data
    }
})

export const resetPenerimaan = () => ({
    type: RESET_PENERIMAAN,
})

export const setRetur = (name, data) => ({
    type: SET_RETUR,
    payload: {
        name: name,
        data: data
    }
})

export const resetRetur = () => ({
    type: RESET_RETUR,
})

export const setJumlahObat = (jumlah) => ({
    type: SET_JUMLAH_OBAT,
    payload: {
        jumlah: jumlah
    }
})

export const resetJumlahObat = () => ({
    type: RESET_JUMLAH_OBAT,
})

