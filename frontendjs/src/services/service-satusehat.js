import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceSatuSehat {
    getListInstalasi = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-instalasi", queries)
    }
    upsertOrganizationInstalasi = async (body) => {
        return await api.create("/transaksi/satu-sehat/update-organization", body)
    }
    getListUnit = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-unit", queries)
    }
    upsertLocationUnit = async (body) => {
        return await api.create("/transaksi/satu-sehat/update-location-unit", body)
    }
    getListPractitioner = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-dokter", queries)
    }
    upsertPractitioner = async (body) => {
        return await api.create("/transaksi/satu-sehat/update-practitioner-pegawai", body)
    }
    upsertPatient = async (body) => {
        return await api.create("/transaksi/satu-sehat/update-ihs-patient", body)
    }
    upsertEncounter = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-encounter", body)
    }
    upsertCondition = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-condition", body)
    }
    upsertConditionV2 = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-condition-v2", body)
    }
    upsertEncounterPulang = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-encounter-pulang", body)
    }
    upsertObservation = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-observation", body)
    }
    getListKamar = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-kamar", queries)
    }
    upsertLocationKamar = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-location-kamar", body)
    }
    getListTempatTidur = async (queries) => {
        return await api.get("/transaksi/satu-sehat/get-list-tempattidur", queries)
    }
    upsertLocationTempatTidur = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-location-tempattidur", body)
    }
    upsertProcedure = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-procedure", body)
    }
    upsertAlergi = async (body) => {
        return await api.create("/transaksi/satu-sehat/upsert-alergi", body)
    }
}