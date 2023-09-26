import crypto from "crypto"

const getHomePageUser = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}
export default {
    getHomePageUser
}