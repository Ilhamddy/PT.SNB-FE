/**
 * q: query
 * b: body
 * r: response
 */

const a = {}

a.rGetAllGigi = {
    allGigi: []
}
a.rGetAllLegendGigi = {
    allLegendGigi: []
}

a.bUpsertOdontogramDetail = {
    norecodontogram: null,
    norecap: null,
    occlusi: null,
    toruspalatinus: null,
    torusmandibularis: null,
    palatum: null,
    diastema: '',
    gigianomali: '',
    lainlain: '',
    decay: 0,
    missing: 0,
    filling: 0,
    jenisfoto: null,
    jenisfotorontgent: null,
    jumlahfoto: 0,
    jumlahfotorontgent: 0,
    tglinput: null,
    isOldKondisi: false,
    /**
     * @type {import("./gigiData").IKondisiGigi[]}
     */
    kondisiGigi: []
}
a.rUpsertOdontogramDetail = {
    odontogram: null,
    allDetail: [],
}
a.rGetOdontogram = { ...a.bUpsertOdontogramDetail }
a.rGetComboOdontogram = {
    occlusi: [],
    torusPalatinus: [],
    torusMandibularis: [],
    palatum: [],
    jenisFoto: [],
    jenisFotoRontgent: []
}

const gigiAPI = a


export default gigiAPI




