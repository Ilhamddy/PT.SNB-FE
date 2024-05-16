import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/daftarPasien.queries';

import db from "../../../models";
import { convertToCount, createTransaction, dateBetweenEmptyString, dateEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils";
import bcrypt from "bcryptjs";
import { pasienSignup } from "../../auth/authhelper";
import { belumDiperiksa, iconPenunjang, iconRI, iconRJ, sedangDiperiksa, selesaiDiperiksa, siapPakai, totalTempatRusak, totalTempatTerisi } from "./icon";
import { getDateEnd, getDateEndNull, getDateStart, getDateStartEnd, getDateStartEndNull, getDateStartNull } from "../../../utils/dateutils";
import daftarPasienAPI from "../../../../../sharedjs/src/daftarPasien/daftarPasienAPI";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import statuspulangQueries from "../../../queries/mastertable/statuspulang/statuspulang.queries";
import statuspulangriQueries from "../../../queries/mastertable/statuspulangri/statuspulangri.queries";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import { processQuery } from "../../../utils/backendUtils";


const getComboDaftarPasienRegistrasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const instalasi = (await pool.query(instalasiQueries.getAll, [])).rows
        const statusPulang = (await pool.query(statuspulangQueries.getAll, [])).rows
        const statusPulangRI = (await pool.query(statuspulangriQueries.getAll, [])).rows
        const unit = (await pool.query(unitQueries.getAll, [])).rows

        const tempres = daftarPasienAPI.rGetComboDaftarPasienRegistrasi
        tempres.instalasi = instalasi
        tempres.statuspulang = statusPulang
        tempres.statuspulangri = statusPulangRI
        tempres.unit = unit
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}


const getDaftarPasienRegistrasi = async (req, res) => {
    const logger = res.locals.logger
    try {
        let {noregistrasi, start, end, instalasi, unit, statuspulang, statuspulangri} 
            = processQuery(
                req.query, 
                daftarPasienAPI.qGetDaftarPasienRegistrasi(new Date().toISOString())
            );
        const startDate = getDateStartNull(start)
        const endDate = getDateEndNull(end)
        let query = queries.getDaftarPasienRegistrasi(`
            WHERE td.statusenabled=true 
            AND (
                ${emptyIlike("td.noregistrasi", "$1")}
                OR 
                ${emptyIlike("mp.namapasien", "$1")}
            )
            AND ${dateBetweenEmptyString("td.tglregistrasi", "$2", "$3")}
            AND ${emptyInt("mi.id", "$4")}
            AND ${emptyInt("mu.id", "$5")}
            AND (
                $6 = td.objectstatuspulangfk
                OR
                $7 = td.objectstatuspulangrifk
                OR
                (
                    $6 IS NULL AND $7 IS NULL
                )
            )
        `)
        const result = await pool.query(query, [
            noregistrasi, 
            startDate || "", 
            endDate || "", 
            instalasi, 
            unit, 
            statuspulang, 
            statuspulangri
        ])
        const tempres = daftarPasienAPI.rGetDaftarPasienRegistrasi
        tempres.pasien = result.rows
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        })
    }
}


export default {
    getComboDaftarPasienRegistrasi,
    getDaftarPasienRegistrasi,

}