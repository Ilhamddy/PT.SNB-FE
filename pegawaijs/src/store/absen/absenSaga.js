import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from "react-toastify";

import { 
    upsertAbsenFotoLokasi, 
    upsertAbsenFotoLokasiSuccess,
    upsertAbsenFotoLokasiError 
} from "./absenSlice";
import ServiceUserPegawai from "../../service/service-absen";

const serviceUserPegawai = new ServiceUserPegawai()

function* onUpsertAbsenFotoLokasi({payload: {dataForm, dataJson, callback}}) {
    try{
        const response = yield call(serviceUserPegawai.upsertAbsenFotoLokasi, dataForm, dataJson);
        yield put(upsertAbsenFotoLokasiSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertAbsenFotoLokasiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnUpsertAbsenFotoLokasi() {
    yield takeEvery(upsertAbsenFotoLokasi.type, onUpsertAbsenFotoLokasi);
}


function* userPegawaiSaga() {
    yield all([
        fork(watchOnUpsertAbsenFotoLokasi),
    ]);
}

export default userPegawaiSaga;

