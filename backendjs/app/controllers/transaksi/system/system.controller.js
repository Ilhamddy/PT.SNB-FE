import util from 'node:util'
import nodeChild from "node:child_process"
import * as nodemailer from "nodemailer"

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

export default {
    pullGit,
    crashEndpoint,
    sendMail
}