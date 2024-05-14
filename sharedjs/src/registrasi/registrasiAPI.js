/**
 * q: query
 * b: body
 * r: response
 * v: validation
 */

const a = {}

a.bUpsertPenunjangModal = {
    norecdp: null,
    instalasiTujuan: null,
    unitTujuan: null,
    kelasTujuan: null,
    dokter: null
}

a.rGetComboPenunjangModal = {
    instalasi: [],
    unit: [],
    kelas: [],
    dokter: []
}

const registrasiAPI = a


export default registrasiAPI

