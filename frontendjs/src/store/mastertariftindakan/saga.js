import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import SericeMTT from "../../services/service-mastertariftindakan.js";

import {
    GET_TOTAL_HARGA_PRODUK,
    GET_COMBO_TARIF_TINDAKAN
} from "./actionType";

import {
    getTotalHargaProdukSuccess,
    getTotalHargaProdukError,
    getComboTarifTindakanSuccess,
    getComboTarifTindakanError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceMTT = new SericeMTT();

function* onGetTotalHargaProduk({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceMTT.getTotalHargaProduk, queries);
        yield put(getTotalHargaProdukSuccess(response.data));
    } catch (error) {
        yield put(getTotalHargaProdukError(error));
    }
}


function* onGetComboTarifTindakan({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceMTT.getComboTarifTindakan, queries);
        yield put(getComboTarifTindakanSuccess(response.data));
    } catch (error) {
        yield put(getComboTarifTindakanError(error));
    }
}

// function* onUpsertLayanan({ payload: { data, callback } }) {
//     try {
//         let response = null;
//         response = yield call(serviceMTT.upsertLayanan, data);
//         yield put(upsertLayananSuccess(response.data));
//         toast.success(response.data.msg || "Sukses")
//         callback && callback(response.data)
//     } catch (error) {
//         yield put(upsertLayananError(error));
//         toast.error(error.response?.data?.msg || "Error")

//     }
// }



function* MasterDataLayananSaga() {
    yield all([
        takeEvery(GET_TOTAL_HARGA_PRODUK, onGetTotalHargaProduk),
        takeEvery(GET_COMBO_TARIF_TINDAKAN, onGetComboTarifTindakan),
        
    ]);
}

export default MasterDataLayananSaga;