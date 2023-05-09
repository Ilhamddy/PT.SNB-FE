const getAll =
    "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp  from m_pasien";

const addPost =
    "insert into  m_pasien (nocm,namapasien,noidentitas ,nobpjs ,nohp) values ($1,$2,$3,$4,$5)";

module.exports = {
    getAll,
    addPost
};