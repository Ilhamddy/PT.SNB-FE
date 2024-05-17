import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import ServiceGigi from "../../services/service-gigi";
import { toast } from "react-toastify";
import { 
    getAllGigi, 
    getAllGigiError, 
    getAllGigiSuccess,  
    getAllLegendGigi,
    getAllLegendGigiSuccess,
    getAllLegendGigiError,
    upsertOdontogram,
    upsertOdontogramSuccess,
    upsertOdontogramError,
    getOdontogram,
    getOdontogramSuccess,
    getOdontogramError,
    getComboOdontogram,
    getComboOdontogramSuccess,
    getComboOdontogramError
} from "./odontogramSlice";
import gigiAPI from "sharedjs/src/gigi/gigiAPI";

const serviceGigi = new ServiceGigi()

const indexAllGigi = (allGigi) => {
    // perlu diindex di frontend siapa tahu ada perubahan data saat di frontend
    let newAllGigi = allGigi.map((data, index) => {
        const newData = { ...data }
        newData.indexkondisi = index
        return newData
    })
    return newAllGigi
}

function* onGetAllGigi({payload: {queries}}) {
    try{
        const response = yield call(serviceGigi.getAllGigi, queries);
        const payload = response.data
        payload.allGigi = indexAllGigi(payload.allGigi);
        yield put(getAllGigiSuccess(payload));
    } catch (error) {
        yield put(getAllGigiError(error));
    }
}

export function* watchOnGetAllGigi() {
    yield takeEvery(getAllGigi.type, onGetAllGigi);
}

function* onGetAllLegendGigi({payload: {queries}}) {
    try{
        const response = yield call(serviceGigi.getAllLegendGigi, queries);
        yield put(getAllLegendGigiSuccess(response.data));
    } catch (error) {
        yield put(getAllLegendGigiError(error));
    }
}

export function* watchOnGetAllLegendGigi() {
    yield takeEvery(getAllLegendGigi.type, onGetAllLegendGigi);
}

function* onUpsertOdontogram({payload: {data, callback}}) {
    try{
        const response = yield call(serviceGigi.upsertOdontogram, data);
        yield put(upsertOdontogramSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertOdontogramError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnUpsertOdontogram() {
    yield takeEvery(upsertOdontogram.type, onUpsertOdontogram);
}


function* onGetOdontogram({payload: {queries}}) {
    try{
        let payload = gigiAPI.rGetOdontogram()
        const response = yield call(serviceGigi.getOdontogram, queries);
        const responseAllGigi = yield call(serviceGigi.getAllGigi, queries);
        payload = response.data
        const payloadAllGigi = responseAllGigi.data
        payloadAllGigi.allGigi = indexAllGigi(payloadAllGigi.allGigi)
        payload.kondisiGigi = payload.kondisiGigi.map((kondisi) => {
            const newKondisi = {...kondisi}
            const gigi = payloadAllGigi.allGigi.find((gigi) => gigi.value === newKondisi.gigi)
            const gigiTujuan = payloadAllGigi.allGigi.find((gigi) => gigi.value === newKondisi.gigiTujuan)
            if(!gigi) throw new Error("Gigi tidak ditemukan")
            newKondisi.indexGigi = gigi.indexkondisi
            newKondisi.indexGigiTujuan = gigiTujuan?.indexkondisi ?? null
            newKondisi.labelgigi = gigi.label
            newKondisi.labelgigitujuan = gigiTujuan?.label ?? null
            return newKondisi
        })
        yield put(getOdontogramSuccess(payload));
        yield put(getAllGigiSuccess(payloadAllGigi));

    } catch (error) {
        yield put(getOdontogramError(error));
    }
}

export function* watchOnGetOdontogram() {
    yield takeEvery(getOdontogram.type, onGetOdontogram);
}

function* onGetComboOdontogram({payload: {queries}}) {
    try{
        const response = yield call(serviceGigi.getComboOdontogram, queries);
        yield put(getComboOdontogramSuccess(response.data));
    } catch (error) {
        yield put(getComboOdontogramError(error));
    }
}

export function* watchOnGetComboOdontogram() {
    yield takeEvery(getComboOdontogram.type, onGetComboOdontogram);
}



function* odontogramSaga(){
    yield all([
        fork(watchOnGetAllGigi),
        fork(watchOnGetAllLegendGigi),
        fork(watchOnUpsertOdontogram),
        fork(watchOnGetOdontogram),
        fork(watchOnGetComboOdontogram),
    ])
}
export default odontogramSaga