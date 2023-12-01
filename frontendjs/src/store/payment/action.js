import {
    PELAYANAN_FROM_DP_GET,
    PELAYANAN_FROM_DP_GET_SUCCESS,
    PELAYANAN_FROM_DP_GET_ERROR,
    PELAYANAN_FROM_DP_GET_RESET,
    NOTA_VERIF_CREATE,
    NOTA_VERIF_CREATE_SUCCESS,
    NOTA_VERIF_CREATE_ERROR,
    DAFTAR_TAGIHAN_PASIEN_GET,
    DAFTAR_TAGIHAN_PASIEN_GET_SUCCESS,
    DAFTAR_TAGIHAN_PASIEN_GET_ERROR,
    DAFTAR_TAGIHAN_PASIEN_GET_RESET,
    PELAYANAN_FROM_VERIF_GET,
    PELAYANAN_FROM_VERIF_GET_SUCCESS,
    PELAYANAN_FROM_VERIF_GET_ERROR,
    PELAYANAN_FROM_VERIF_GET_RESET,
    BUKTI_BAYAR_CREATE,
    BUKTI_BAYAR_CREATE_SUCCESS,
    BUKTI_BAYAR_CREATE_ERROR,
    BUKTI_BAYAR_CREATE_RESET,
    VERIF_NOTA_CANCEL,
    VERIF_NOTA_CANCEL_SUCCESS,
    VERIF_NOTA_CANCEL_ERROR,
    VERIF_NOTA_CANCEL_RESET,
    BUKTI_BAYAR_CANCEL,
    BUKTI_BAYAR_CANCEL_SUCCESS,
    BUKTI_BAYAR_CANCEL_ERROR,
    BUKTI_BAYAR_CANCEL_RESET,
    DAFTAR_PIUTANG_PASIEN_GET,
    DAFTAR_PIUTANG_PASIEN_GET_SUCCESS,
    DAFTAR_PIUTANG_PASIEN_GET_ERROR,
    DAFTAR_PIUTANG_PASIEN_GET_RESET,
    PAYMENT_PIUTANG_PASIEN_GET,
    PAYMENT_PIUTANG_PASIEN_GET_SUCCESS,
    PAYMENT_PIUTANG_PASIEN_GET_ERROR,
    PAYMENT_PIUTANG_PASIEN_GET_RESET,
    LAPORAN_PENDAPATAN_KASIR_GET,
    LAPORAN_PENDAPATAN_KASIR_GET_SUCCESS,
    LAPORAN_PENDAPATAN_KASIR_GET_ERROR,
    LAPORAN_PENDAPATAN_KASIR_GET_RESET,
    GET_PIUTANG_AFTER_DATE,
    GET_PIUTANG_AFTER_DATE_SUCCESS,
    GET_PIUTANG_AFTER_DATE_ERROR,
    GET_DAFTAR_VERIFIKASI_REMUNERASI, 
    GET_DAFTAR_VERIFIKASI_REMUNERASI_SUCCESS, 
    GET_DAFTAR_VERIFIKASI_REMUNERASI_ERROR,
    UPSERT_VERIFIKASI_REMUNERASI,
    UPSERT_VERIFIKASI_REMUNERASI_SUCCESS,
    UPSERT_VERIFIKASI_REMUNERASI_ERROR,
    UPSERT_VERIFIKASI_REMUNERASI_RESET,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_ERROR,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_SUCCESS,
    GET_COMBO_SETOR,
    GET_COMBO_SETOR_SUCCESS,
    GET_COMBO_SETOR_ERROR,
    GET_PEMBAYARAN_SETOR,
    GET_PEMBAYARAN_SETOR_SUCCESS,
    GET_PEMBAYARAN_SETOR_ERROR,
    UPSERT_SETORAN,
    UPSERT_SETORAN_SUCCESS,
    UPSERT_SETORAN_ERROR
} from "./actionType";

export const pelayananFromDpGet = (norecap) => {
    return {
        type: PELAYANAN_FROM_DP_GET,
        payload: { norecap }
    }
}

export const pelayananFromDpGetSuccess = (data) => {
    return {
        type: PELAYANAN_FROM_DP_GET_SUCCESS,
        payload: data
    }
}

export const pelayananFromDpGetError = (error) => {
    return {
        type: PELAYANAN_FROM_DP_GET_ERROR,
        payload: error
    }
}

export const pelayananFromDpGetReset = () => {
    return {
        type: PELAYANAN_FROM_DP_GET_RESET,
        payload: {}
    }
}

export const notaVerifCreate = (body, callback) => {
    return {
        type: NOTA_VERIF_CREATE,
        payload: { body, callback }
    }
}

export const notaVerifCreateSuccess = (data) => {
    return {
        type: NOTA_VERIF_CREATE_SUCCESS,
        payload: data
    }
}

export const notaVerifCreateError = (error) => {
    return {
        type: NOTA_VERIF_CREATE_ERROR,
        payload: error
    }
}

export const daftarTagihanPasienGet = (body, callback) => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET,
        payload: { body, callback }
    }
}

export const daftarTagihanPasienGetSuccess = (data) => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET_SUCCESS,
        payload: data
    }
}

export const daftarTagihanPasienGetError = (error) => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET_ERROR,
        payload: error
    }
}

export const daftarTagihanPasienGetReset = () => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET_RESET,
        payload: {}
    }
}

export const pelayananFromVerifGet = (queries) => {
    return {
        type: PELAYANAN_FROM_VERIF_GET,
        payload: { queries }
    }
}

export const pelayananFromVerifGetSuccess = (data) => {
    return {
        type: PELAYANAN_FROM_VERIF_GET_SUCCESS,
        payload: data
    }
}

export const pelayananFromVerifGetError = (error) => {
    return {
        type: PELAYANAN_FROM_VERIF_GET_ERROR,
        payload: error
    }
}

export const pelayananFromVerifGetReset = () => {
    return {
        type: PELAYANAN_FROM_VERIF_GET_RESET
    }
}

export const buktiBayarCreate = (body, callback) => {
    return {
        type: BUKTI_BAYAR_CREATE,
        payload: { body, callback }
    }
}

export const buktiBayarCreateSuccess = (data) => {
    return {
        type: BUKTI_BAYAR_CREATE_SUCCESS,
        payload: data
    }
}

export const buktiBayarCreateError = (error) => {
    return {
        type: BUKTI_BAYAR_CREATE_ERROR,
        payload: error
    }
}

export const buktiBayarCreateReset = () => {
    return {
        type: BUKTI_BAYAR_CREATE_RESET,
    }
}

export const verifNotaCancel = (norecnota, norecdp, callback) => {
    return {
        type: VERIF_NOTA_CANCEL,
        payload: { norecnota, norecdp, callback }
    }
}

export const verifNotaCancelSuccess = (data) => {
    return {
        type: VERIF_NOTA_CANCEL_SUCCESS,
        payload: data
    }
}

export const verifNotaCancelError = (error) => {
    return {
        type: VERIF_NOTA_CANCEL_ERROR,
        payload: error
    }
}

export const verifNotaCancelReset = () => {
    return {
        type: VERIF_NOTA_CANCEL_RESET,
    }
}

export const buktiBayarCancel = (norecnota, norecbayar, callback) => {
    return {
        type: BUKTI_BAYAR_CANCEL,
        payload: { norecnota, norecbayar, callback }
    }
}

export const buktiBayarCancelSuccess = (data) => {
    return {
        type: BUKTI_BAYAR_CANCEL_SUCCESS,
        payload: data
    }
}

export const buktiBayarCancelError = (error) => {
    return {
        type: BUKTI_BAYAR_CANCEL_ERROR,
        payload: error
    }
}

export const buktiBayarCancelReset = () => {
    return {
        type: BUKTI_BAYAR_CANCEL_RESET,
    }
}

export const daftarPiutangPasienGet = (location) => {
    return {
        type: DAFTAR_PIUTANG_PASIEN_GET,
        payload: { location }
    }
}

export const daftarPiutangPasienGetSuccess = (data) => {
    return {
        type: DAFTAR_PIUTANG_PASIEN_GET_SUCCESS,
        payload: data
    }
}

export const daftarPiutangPasienGetError = (error) => {
    return {
        type: DAFTAR_PIUTANG_PASIEN_GET_ERROR,
        payload: error
    }
}

export const daftarPiutangPasienGetReset = () => {
    return {
        type: DAFTAR_PIUTANG_PASIEN_GET_RESET,
    }
}

export const paymentPiutangPasienGet = (queries) => {
    return {
        type: PAYMENT_PIUTANG_PASIEN_GET,
        payload: { queries }
    }
}

export const paymentPiutangPasienGetSuccess = (data) => {
    return {
        type: PAYMENT_PIUTANG_PASIEN_GET_SUCCESS,
        payload: data
    }
}

export const paymentPiutangPasienGetError = (error) => {
    return {
        type: PAYMENT_PIUTANG_PASIEN_GET_ERROR,
        payload: error
    }
}

export const paymentPiutangPasienGetReset = () => {
    return {
        type: PAYMENT_PIUTANG_PASIEN_GET_RESET,
    }
}

export const laporanPendapatanKasirGet = (param) => {
    return {
        type: LAPORAN_PENDAPATAN_KASIR_GET,
        payload: { param }
    }
}

export const laporanPendapatanKasirGetSuccess = (data) => {
    return {
        type: LAPORAN_PENDAPATAN_KASIR_GET_SUCCESS,
        payload: data
    }
}

export const laporanPendapatanKasirGetError = (error) => {
    return {
        type: LAPORAN_PENDAPATAN_KASIR_GET_ERROR,
        payload: error
    }
}

export const laporanPendapatanKasirGetReset = () => {
    return {
        type: LAPORAN_PENDAPATAN_KASIR_GET_RESET,
    }
}

export const getPiutangAfterDate = (queries = {
    tglterakhir: null,
    norecnota: null
}) => {
    return {
        type: GET_PIUTANG_AFTER_DATE,
        payload: { queries }
    }
}

export const getPiutangAfterDateSuccess = (data) => {
    return {
        type: GET_PIUTANG_AFTER_DATE_SUCCESS,
        payload: data
    }
}

export const getPiutangAfterDateError = (error) => {
    return {
        type: GET_PIUTANG_AFTER_DATE_ERROR,
        payload: error
    }
}

export const getDaftarVerifikasiRemunerasi = (queries) => ({
    type: GET_DAFTAR_VERIFIKASI_REMUNERASI,
    payload: {
        queries,
    },
});

export const getDaftarVerifikasiRemunerasiSuccess = (data) => ({
    type: GET_DAFTAR_VERIFIKASI_REMUNERASI_SUCCESS,
    payload: data,
});

export const getDaftarVerifikasiRemunerasiError = (error) => ({
    type: GET_DAFTAR_VERIFIKASI_REMUNERASI_ERROR,
    payload: error,
});

export const upsertVerifikasiRemunerasi = (body, callback) => ({
    type: UPSERT_VERIFIKASI_REMUNERASI,
    payload: {
        body: body,
        callback: callback
    }
});

export const upsertVerifikasiRemunerasiSuccess = (data) => ({
    type: UPSERT_VERIFIKASI_REMUNERASI_SUCCESS,
    payload: data
});

export const upsertVerifikasiRemunerasiError = (error) => ({
    type: UPSERT_VERIFIKASI_REMUNERASI_ERROR,
    payload: error
});

export const upsertVerifikasiRemunerasiReset = () => {
    return {
        type: UPSERT_VERIFIKASI_REMUNERASI_RESET,
    }
}

export const getDaftarSudahVerifikasiRemunerasi = (queries) => ({
    type: GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI,
    payload: {
        queries,
    },
});

export const getDaftarSudahVerifikasiRemunerasiSuccess = (data) => ({
    type: GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_SUCCESS,
    payload: data,
});

export const getDaftarSudahVerifikasiRemunerasiError = (error) => ({
    type: GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_ERROR,
    payload: error,
});


export const getComboSetor = (queries) => ({
    type: GET_COMBO_SETOR,
    payload: {
        queries,
    },
});

export const getComboSetorSuccess = (data) => ({
    type: GET_COMBO_SETOR_SUCCESS,
    payload: data,
});

export const getComboSetorError = (error) => ({
    type: GET_COMBO_SETOR_ERROR,
    payload: error,
});



export const getPembayaranSetor = (queries) => ({
    type: GET_PEMBAYARAN_SETOR,
    payload: {
        queries,
    },
});

export const getPembayaranSetorSuccess = (data) => ({
    type: GET_PEMBAYARAN_SETOR_SUCCESS,
    payload: data,
});

export const getPembayaranSetorError = (error) => ({
    type: GET_PEMBAYARAN_SETOR_ERROR,
    payload: error,
});

export const upsertSetoran = (data, callback) => ({
    type: UPSERT_SETORAN,
    payload: {
        data: data,
        callback: callback,
    },
});

export const upsertSetoranSuccess = (data) => ({
    type: UPSERT_SETORAN_SUCCESS,
    payload: data,
});

export const upsertSetoranError = (error) => ({
    type: UPSERT_SETORAN_ERROR,
    payload: error,
});

