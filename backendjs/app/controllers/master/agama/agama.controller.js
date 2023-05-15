const pool = require("../../../config/dbcon.query");
const queries = require('../../../queries/master/agama/agama.queries.js');

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
module.exports = {
    allSelect,
  
};
