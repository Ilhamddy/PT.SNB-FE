/**
 * q: query
 * b: body
 * r: response
 * v: validation
 */

const a = {}

a.qGetHistoriPatologi = () => ({
    norecdp: '',
})
a.rGetHistoriPatologi = () => ({
    histori: []
})

a.qGetListOrderPatologi = () => ({
    start: null, 
    end: null, 
    noregistrasi: null, 
    taskid: null
})
a.rGetListOrderPatologi = () => ({
    listOrder: []
})

a.qGetIsiOrderPatologi = () => ({
    norec: null
})
a.rGetIsiOrderPatologi = () => ({
    isiOrder: []
})

a.qGetWidgetOrderPatologi = a.qGetListOrderPatologi
a.rGetWidgetOrderPatologi = () => ({
    widget: []
})

a.bUpdateTanggalRencanaPatologi = (dateNow) => ({
    norec: '',
    namatindakan: '',
    norecselected: '',
    nokamar: '',
    tglinput: dateNow,
})
a.rUpdateTanggalRencanaPatologi = a.bUpdateTanggalRencanaPatologi

a.qGetDaftarPasienPatologi = (dateNow) => ({
    noregistrasi: '',
    start: dateNow,
    end: dateNow,
})
a.rGetDaftarPasienPatologi = () => ({
    listPasien: []
})

a.bVerifikasiPatologi = (dateNow) => ({
    norec: '',
    tglinput: dateNow,
    listorder: [],
})

a.bTolakOrderPatologi = () => ({
    norec: ''
})

a.qGetTransaksiPelayananPatologiByNorecDp = () => ({
    norecdp: ''
})
a.rGetTransaksiPelayananPatologiByNorecDp = () => ({
    pelayanan: []
})

a.rGetComboPatologiModal = () => ({ 
    pegawai: [], 
    unit: [], 
    expertise: []
})


const patologiAPI = a


export default patologiAPI

