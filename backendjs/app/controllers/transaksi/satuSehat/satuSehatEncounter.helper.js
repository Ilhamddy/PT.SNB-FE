import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehat.queries";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";

const hUpsertEncounter = wrapperSatuSehat(
    async (logger, createdResep, createdDetailOrder) => {
    }
)

export {
    hUpsertEncounter
}