import util from 'node:util'
import nodeChild from "node:child_process"
import * as nodemailer from "nodemailer"
import pool from "../../../config/dbcon.query";
import queries from "../../../queries/system/system.queries"
import axios from "axios"
import { groupBy } from '../../../utils/arutils';
import { dateLocal } from '../../../utils/dateutils';

const pullGit = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const exec = util.promisify(nodeChild.exec);

        async function lsExample() {
            const { stdout, stderr } = await exec('git pull');
            logger.info('stdout:', stdout);
            logger.error('stderr:', stderr);
        }
        await lsExample();

        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: "done",
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const crashEndpoint = async (req, res) => {
    throw new Error("Crash Endpoint")
}

const sendMail = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'snberdikarinoreply@gmail.com',
                pass: 'heztcjllcnyiivol'
            }
        })
          
        let mailOptions = {
            from: 'snberdikarinoreply@gmail.com',
            to: 'disky.jetmiko@gmail.com',
            subject: 'nodemailer test',
            text: 'Berikut merupakan '
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send({
                    msg: "Gagal kirim",
                    code: 500,
                    data: error,
                    success: false
                });
            } else {
                const date = new Date()
                date.setTime(date.getTime() + (4*60*1000));
                let tempres = {
                    nextMail: date,
                    transporterInfo: info
                }
                res.status(200).send({
                    msg: 'Success',
                    code: 200,
                    data: info,
                    success: true
                });
            }
        });

    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const sendWhatsapp = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const dokterCBG = (await pool.query(queries.qGetDaftarPasienCBG, [])).rows
        const dokters = groupBy(dokterCBG, "iddokter", "nohpdokter", "namadokter")
        const sentWhatsapps = await Promise.all(
            dokters.map(
                async(dokter) => {
                    if(!dokter.nohpdokter) return
                    let text = `*Informasi pasien BPJS Kesehatan yang tagihannya >= 80% dari total estimasi klaim INA-CBG*
                    `
                    let pasienGrouped = groupBy(
                        dokter._values, 
                        "idpasien", 
                        "namapasien", 
                        "norm", 
                        "noregistrasi",
                        "estimasiklaim",
                        "tglregistrasi",
                        "totalbiaya"
                    )
                    pasienGrouped.forEach((pasien, index) => {
                        const percentageEstimasi = pasien.estimasiklaim * 8 / 10
                        const is80Percent = pasien.totalbiaya > percentageEstimasi
                        const groupedDiagIcdx = groupBy(pasien._values, "diagnosaicdx")
                        const groupedDiagIcdix = groupBy(pasien._values, "diagnosaicdix")
                        if(!is80Percent){
                            return
                        }
                        let texticdx = ``
                        groupedDiagIcdx.forEach((diagnosa) => {
                            if(!diagnosa.diagnosaicdx) return 
                            texticdx += diagnosa.diagnosaicdx + " ## "
                        })
                        let texticdix = ``
                        groupedDiagIcdix.forEach((diagnosa) => {
                            if(!diagnosa.diagnosaicdix) return 
                            texticdix += diagnosa.diagnosaicdix + " ## "
                        })
                        if(!texticdx){
                            texticdx = "-"
                        }
                        if(!texticdix){
                            texticdix = "-"
                        }
                        text += `
================================
PASIEN ${index + 1}
================================
DPJP Pasien	: ${dokter.namadokter}
Nama pasien	: ${pasien.namapasien}
No. RM		: ${pasien.norm}
Tgl. Masuk	: ${dateLocal(pasien.tglregistrasi)}
No. Registrasi	: ${pasien.noregistrasi}
ICD 10		: ${texticdx}
ICD 9		: ${texticdix}
Total Pelayanan	: Rp${pasien.totalbiaya?.toLocaleString("id-ID") || "0"}
Estimasi Klaim	: Rp${pasien.estimasiklaim?.toLocaleString("id-ID") || "0"}
`
                    })

                    try{
                        const sentWhatsapp = await axios.post("https://graph.facebook.com/v17.0/167007769837153/messages", {
                            "messaging_product": "whatsapp",
                            "to": dokter.nohpdokter,
                            "type": "text",
                            "text": {
                                "body": text
                            }
                        }, {
                            headers: {
                                Authorization: "Bearer EAAOWxZCIIQ2cBO362ITrEuhj0n6dWptkZBzGv1ux3yUlrCycebp0LMw6WZACn08Mazao2pKCg1zqeA5O0xZBc4cFSNnwRxsjnZBotRa2d92SSvLPpZCGCGjbEiro3oLaRQD7oZC1PXL3KZCxtCZCu3glHA74YIpTXMxL3dZA5PID2Wa6LE2VKU7feCryvO8YmKK8N9vReCtTSsytSemzroSxw1P77t9CWdVZBPyJrYZD"
                            }
                        })
                        return sentWhatsapp.data
                    } catch(e) {
                        return null
                    }
                }
            )
        )
        
    } catch (error) {
        console.log(error)
    }
}

export default {
    pullGit,
    crashEndpoint,
    sendMail,
    sendWhatsapp
}