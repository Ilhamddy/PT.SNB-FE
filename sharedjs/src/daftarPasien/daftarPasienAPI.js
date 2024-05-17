/**
 * q: query
 * b: body
 * r: response
 * v: validation
 */

const a = {}

a.qGetDaftarPasienRegistrasi = (dateNow) => ({
    noregistrasi: '',
    statuspulang: null,
    statuspulangri: null,
    instalasi: null,
    unit: null,
    start: dateNow,
    end: dateNow,
})

a.rGetDaftarPasienRegistrasi = () => ({
    pasien: []
})

a.rGetComboDaftarPasienRegistrasi = () => ({
    instalasi: [],
    unit: [],
    statuspulang: [],
    statuspulangri: []
})

const daftarPasienAPI = a


export default daftarPasienAPI

