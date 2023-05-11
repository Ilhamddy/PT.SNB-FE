const getAll =
    "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp  from m_pasien";

const addPost =
    "insert into  m_pasien (nocm,namapasien,noidentitas ,nobpjs ,nohp) values ($1,$2,$3,$4,$5)";

const checkNewNumber = "select new_number,extention from running_number where id =1";

const getPasienByNocm = "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp  from m_pasien where nocm = $1";

const updateRunning_number = "update running_number set new_number = $1 where id = 1";

const updatePasienById = "update m_pasien set namapasien=$1,noidentitas=$2 ,nobpjs=$3 ,nohp=$4 where id = $5";

const getPasienById = "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp  from m_pasien where id = $1";

module.exports = {
    getAll,
    addPost,
    checkNewNumber,
    getPasienByNocm,
    updateRunning_number,
    updatePasienById,
    getPasienById
};