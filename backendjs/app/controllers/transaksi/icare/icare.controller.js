import { validateIcareHelper } from "./icare.helper";

const validateIcare = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const temppost = {
            "nomor": req.body.nomor,
            "kodedokter":req.body.kodedokter
            }
        let response = await validateIcareHelper(temppost)
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: response,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

export default{
    validateIcare
}