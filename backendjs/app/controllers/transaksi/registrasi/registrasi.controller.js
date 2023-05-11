const pool = require("../../../config/dbcon.query");
const queries = require('../../../queries/transaksi/registrasi.queries');

const allSelect = (req, res) => {
    pool.query(queries.getAll, (error, result) => {
        if (error) throw error;
        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });
    });
};

const addPost = (req, res) => {
    const { namapasien, noidentitas, nobpjs, nohp } = req.body;
    // check if username exist
    // pool.query(queries.checkUserNameExist, [username], (error, result) => {
    //     if (result.rows.length) {
    //         res.send("user already exist.");
    //     } else {
    // add tabel
    pool.query(queries.checkNewNumber, (error, result) => {
        if (error) {
            throw error
        } else {
            let nocm = result.rows[0].new_number + 1
            let new_number = result.rows[0].new_number + 1
            for (let x = result.rows[0].new_number.toString().length; x < result.rows[0].extention; x++) {
                nocm = '0' + nocm;
            }
            // res.status(200).send({
            //     data: nocm,
            //     status: "success",
            //     success: true,
            // });

            pool.query(
                queries.addPost, [nocm, namapasien, noidentitas, nobpjs, nohp],
                (error, result) => {
                    if (error) {
                        throw error
                    } else {
                        pool.query(queries.getPasienByNocm, [nocm], (error, result) => {
                            if (error) {
                                throw error
                            } else {
                                pool.query(queries.updateRunning_number, [new_number], (error, resultUpdate) => {
                                    if (error) {
                                        throw error
                                    } else {
                                        res.status(200).send({
                                            data: result.rows,
                                            status: "success",
                                            success: true,
                                        });
                                    }

                                })

                            }

                            // res.status(200).json(result.rows);

                        });
                    }
                }
            )
        }
    });
}

const updatePasienById = (req, res) => {
    const { namapasien, noidentitas, nobpjs, nohp, id } = req.body;
    try {

        pool.query(queries.updatePasienById, [namapasien, noidentitas, nobpjs, nohp, id], (error, result) => {
            if (error) {
                throw error
            } else {
                pool.query(queries.getPasienById, [id], (error, resultx) => {
                    if (error) {
                        throw error
                    } else {
                        res.status(200).send({
                            data: resultx.rows,
                            status: "success",
                            success: true,
                        });
                    }

                })

            }

        })


    } catch (e) {
        res.status(500).send({ message: e, status: "errors" });
    }
}

const getPasienById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPasienById, [id], (error, result) => {
        if (error) {
            throw error
        } else {
            if (result.rows.length == 0) {
                res.status(201).send({
                    data: "",
                    status: "Data Tidak Ada",
                    success: true,
                });
            } else {
                let tempres=""
                for (var i = 0; i < result.rows.length; ++i){
                    if (result.rows[i] !== undefined) {
                        tempres = { id: result.rows[i].id,nocm:result.rows[i].nocm,namapasien:result.rows[i].namapasien,
                        noidentitas:result.rows[i].noidentitas,nobpjs:result.rows[i].nobpjs,nohp:result.rows[i].nohp}
                   
                    }
                }
                
                res.status(200).send({
                    data: tempres,
                    status: "success",
                    success: true,
                });
            }
        }

    })
}

module.exports = {
    allSelect,
    addPost,
    updatePasienById,
    getPasienById
};
