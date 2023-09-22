import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceKiosk from "../../services/services-kiosk";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
    GET_COMBO_KIOSK,
    GET_CARI_PASIEN_KIOSK,
    SAVE_REGISTRASI_PASIEN_KIOSK,
    SAVE_ANTREAN_PASIEN_KIOSK
} from "./actionType";

import {
    getComboKioskSuccess, getComboKioskError,
    getCariPasienKioskSuccess, getCariPasienKioskError,
    saveRegistrasiPasienKioskSuccess, saveRegistrasiPasienKioskError,
    saveAntreanPasienKioskSuccess, saveAntreanPasienKioskError
} from "./action";

const serviceKiosk = new ServiceKiosk();

function* ongetComboKiosk({ payload: { queries } }) {
    try {
        const response = yield call(serviceKiosk.getComboKiosk, queries);
        yield put(getComboKioskSuccess(response.data));
    } catch (error) {
        yield put(getComboKioskError(error));
    }
}

export function* watchongetComboKiosk() {
    yield takeEvery(GET_COMBO_KIOSK, ongetComboKiosk);
}

function* ongetCariPasienKiosk({ payload: { queries } }) {
    try {
        const response = yield call(serviceKiosk.getCariPasienKiosk, queries);
        yield put(getCariPasienKioskSuccess(response.data));
    } catch (error) {
        yield put(getCariPasienKioskError(error));
    }
}

export function* watchongetCariPasienKiosk() {
    yield takeEvery(GET_CARI_PASIEN_KIOSK, ongetCariPasienKiosk);
}

function* onsaveRegistrasiPasienKiosk({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceKiosk.saveRegistrasiPasienKiosk, body);
        yield put(saveRegistrasiPasienKioskSuccess(response.data));
        // toast.success("Sukses update order plus verif", { autoClose: 3000 });
        const MySwal = withReactContent(Swal)
        MySwal.fire(
            'Pendaftaran Berhasil!',
            // 'You clicked the button!',
            // 'success'
        )
        callback && callback();
    } catch (error) {
        yield put(saveRegistrasiPasienKioskError(error));
        // toast.error("Gagal update order plus verif", { autoClose: 3000 });
    }
}
export function* watchonsaveRegistrasiPasienKiosk() {
    yield takeEvery(SAVE_REGISTRASI_PASIEN_KIOSK, onsaveRegistrasiPasienKiosk);
}

function* onsaveAntreanPasienKiosk({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceKiosk.saveAntreanPasienKiosk, body);
        yield put(saveAntreanPasienKioskSuccess(response.data));
        if (window.electron) {
            window.electron.printPOS({
                devicePrintBus: 1,
                jenisantrean: response.data?.antreanloket?.noantreantext,
                captionjenisantrean: response.data?.datasave?.captionheader,
                sisaantrean: response.data?.belumdipanggil,
                tujuanpoli:response.data?.datasave?.unittujuan
            });
        } else {

            console.error('Electron not available');
        }
        callback && callback();
    } catch (error) {
        yield put(saveAntreanPasienKioskError(error));
        // toast.error("Gagal update order plus verif", { autoClose: 3000 });
    }
}
export function* watchonsaveAntreanPasienKiosk() {
    yield takeEvery(SAVE_ANTREAN_PASIEN_KIOSK, onsaveAntreanPasienKiosk);
}


function* kioskSaga() {
    yield all([
        fork(watchongetComboKiosk),
        fork(watchongetCariPasienKiosk),
        fork(watchonsaveRegistrasiPasienKiosk),
        fork(watchonsaveAntreanPasienKiosk)
    ]);
}

export default kioskSaga;