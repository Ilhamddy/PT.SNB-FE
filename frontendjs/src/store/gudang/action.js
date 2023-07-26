import {
    OBAT_GUDANG_SAVE,
    OBAT_GUDANG_SAVE_SUCCESS,
    OBAT_GUDANG_SAVE_ERROR,
    LAIN_LAIN_GET,
    LAIN_LAIN_GET_SUCCESS,
    LAIN_LAIN_GET_ERROR,
} from "./actionType";



export const obatGudangSave = (data,) => ({
    type: OBAT_GUDANG_SAVE,
    payload: { data: data },
});

export const obatGudangSaveSuccess = (data) => ({
    type: OBAT_GUDANG_SAVE_SUCCESS,
    payload: { data: data },
});

export const obatGudangSaveError = (data) => ({
    type: OBAT_GUDANG_SAVE_ERROR,
    payload: { data },
});

export const lainLainGet = () => ({
    type: LAIN_LAIN_GET,
})

export const lainLainGetSuccess = (data) => ({
    type: LAIN_LAIN_GET_SUCCESS,
    payload: { data: data },
})

export const lainLainGetError = (data) => ({
    type: LAIN_LAIN_GET_ERROR,
    payload: { data: data },
})