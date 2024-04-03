import wrapperBPJSIcare from "../../../utils/icareutils";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import db from "../../../models";

const validateIcareHelper = wrapperBPJSIcare(
    async (logger, ssClient, decrypt,param,transaction) => {
        let response
        const temppost = {
            "param": param.nomor,
            "kodedokter":param.kodedokter
            }  
        response = await ssClient.post(`/api/pcare/validate`,temppost)
        response = decrypt(response.data.response)
        return response
    }
)
export{
    validateIcareHelper
}