import pool from "../../../config/dbcon.query";
import queries from '../../../queries/master/agama/agama.queries.js';

const allSelect = (req, res) => {
    
    pool.query(queries.getAll, (error, result) => {
        if (error) throw error;
        let tempres = {
            agama: result.rows, jeniskelamin: result.rows
                }
        res.status(201).send({
            data: tempres,
            status: "success",
            success: true,
        });
      
    });
};
export default {
    allSelect,
  
};
