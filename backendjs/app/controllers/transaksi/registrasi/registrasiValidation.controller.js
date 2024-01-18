import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import queriesUnit, { daftarUnit } from '../../../queries/mastertable/unit/unit.queries';

import db from "../../../models";
import { createTransaction, dateBetweenEmptyString, dateEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils";
import bcrypt from "bcryptjs";
import { pasienSignup } from "../../auth/authhelper";
import { belumDiperiksa, iconPenunjang, iconRI, iconRJ, sedangDiperiksa, selesaiDiperiksa, siapPakai, totalTempatRusak, totalTempatTerisi } from "./icon";
import { getDateEnd, getDateEndNull, getDateStart, getDateStartEnd, getDateStartEndNull, getDateStartNull } from "../../../utils/dateutils";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import { hUpsertEncounter, hUpsertEncounterPulang } from "../satuSehat/satuSehatEncounter.helper";
import { hupsertPatientNewBorn } from "../satuSehat/satuSehatPatient.helper";
import { qGetNoRMLast } from "../../../queries/transaksi/registrasiValidation.queries";

const getNIKAvailable = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let msgAvailable = ''
        const noIdentitasCheck = req.query.noidentitas
        const idPasienCheck = JSON.parse(req.query.idpasien)
        if(!noIdentitasCheck) throw new BadRequestError("noidentitas Harus ada")
        const pasien = await db.m_pasien.findOne({
            where: {
                noidentitas: noIdentitasCheck,
                statusenabled: true
            }
        })
        const pasienFromId = idPasienCheck ? await db.m_pasien.findByPk(idPasienCheck) : null
        const isEdit = pasienFromId && pasien && (pasienFromId.id === pasien.id)
        if(pasien && !isEdit){
            msgAvailable = `Pasien sudah ada dengan nama ${pasien.namapasien} dengan nocm ${pasien.nocm}`
        }
        const tempres = {
            pasien: pasien,
            msgAvailable: msgAvailable
        };
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

const getNoRMLast = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let msgAvailable = ''
        let pasien = null
        const normCheck = req.query.norm
        const idPasienCheck = JSON.parse(req.query.idpasien)

        const normLast = (await pool.query(qGetNoRMLast, [])).rows[0]?.max || 99999999
        if(normCheck){
            pasien = await db.m_pasien.findOne({
                where: {
                    nocm: normCheck,
                    statusenabled: true
                }
            })
            const pasienFromId = idPasienCheck ? await db.m_pasien.findByPk(idPasienCheck) : null
            const isEdit = pasienFromId && pasien && pasienFromId.id === pasien.id
            if(pasien && !isEdit){
                msgAvailable = `Pasien sudah ada dengan nama ${pasien.namapasien} dan nocm ${pasien.nocm}`
            }
        }
        if(normCheck && Number(normCheck) > Number(normLast)){
            msgAvailable = `No RM tidak bisa lebih dari ${normLast}`
        }
        const tempres = {
            max: normLast,
            msgAvailable: msgAvailable
        };
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

const getNoBPJS = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let msgAvailable = ''
        const nobpjs = req.query.nobpjs
        const idPasienCheck = JSON.parse(req.query.idpasien)
        if(!nobpjs) throw new BadRequestError("nbpjs wajib ada")

        const pasien = (await db.m_pasien.findOne({
            where: {
                nobpjs: nobpjs,
                statusenabled: true
            }
        }))?.toJSON() || null
        const pasienFromId = idPasienCheck ? await db.m_pasien.findByPk(idPasienCheck) : null
        const isEdit = pasienFromId && pasien && pasienFromId.id === pasien.id
        if(pasien && !isEdit){
            msgAvailable = `No BPJS sudah ada dengan nama ${pasien.namapasien} dan nocm ${pasien.nocm}`
        }
        const tempres = {
            msgAvailable,
            pasien,
        };
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


export default {
    getNIKAvailable,
    getNoRMLast,
    getNoBPJS
}