const pool = require("../../../config/dbcon.query");
const queries = require('../../../queries/master/agama/agama.queries.js');

const allSelect = (req, res) => {
    
    pool.query(queries.getAll, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
      
    });
};
module.exports = {
    allSelect,
  
};
