const pool = require("../../../config/dbcon.query");
const queries = require('../../../queries/transaksi/registrasi.queries');

const allSelect = (req, res) => {
    // var data = [
    //     ["01", "Jonathan", "jonathan@example.com", "Senior Implementation Architect", "Hauck Inc", "Holy See"],
    //     ["02", "Harold", "harold@example.com", "Forward Creative Coordinator", "Metz Inc", "Iran"],
    //     ["03", "Shannon", "shannon@example.com", "Legacy Functionality Associate", "Zemlak Group", "South Georgia"],
    //     ["04", "Robert", "robert@example.com", "Product Accounts Technician", "Hoeger", "San Marino"],
    //     ["05", "Noel", "noel@example.com", "Customer Data Director", "Howell - Rippin", "Germany"],
    //     ["06", "Traci", "traci@example.com", "Corporate Identity Director", "Koelpin - Goldner", "Vanuatu"],
    //     ["07", "Kerry", "kerry@example.com", "Lead Applications Associate", "Feeney, Langworth and Tremblay", "Niger"],
    //     ["08", "Patsy", "patsy@example.com", "Dynamic Assurance Director", "Streich Group", "Niue"],
    //     ["09", "Cathy", "cathy@example.com", "Customer Data Director", "Ebert, Schamberger and Johnston", "Mexico"],
    //     ["10", "Tyrone", "tyrone@example.com", "Senior Response Liaison", "Raynor, Rolfson and Daugherty", "Qatar"],
    // ];
    pool.query(queries.getAll, (error, result) => {
        if (error) throw error;
        res.status(200).send({
            data: result.rows,
            status: "success",
        });
        // res.status(200).json(result.rows);

    });
};

const addPost = (req, res) => {
    const { nocm, namapasien,noidentitas ,nobpjs ,nohp } = req.body;
    // check if username exist
    // pool.query(queries.checkUserNameExist, [username], (error, result) => {
    //     if (result.rows.length) {
    //         res.send("user already exist.");
    //     } else {
    // add tabel
    pool.query(
        queries.addPost, [nocm, namapasien,noidentitas ,nobpjs ,nohp],
        (error, result) => {
            if (error) {
                throw error
            }else{
                pool.query(queries.getAll, (error, result) => {
                    if (error) throw error;
                    res.status(200).send({
                        data: result.rows,
                        status: "success",
                    });
                    // res.status(200).json(result.rows);
            
                });
            }
            
            // res.status(201).send("Username Created Succesfully!.");
        }
    )
    // }


    // })
}

module.exports = {
    allSelect,
    addPost
};
