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

/**
 * @type {import("./gigiData").IUpsertKondisi}
 */
a.bUpsertOdontogramDetail = {
    norecodontogram: null,
    norecap: null,
    kondisiGigi: []
}
a.rUpsertOdontogramDetail = {
    odontogram: null,
    allDetail: [],
}
a.rGetOdontogram = { kondisiGigi: [...a.bUpsertOdontogramDetail.kondisiGigi]}

const gigiAPI = a


export default gigiAPI




