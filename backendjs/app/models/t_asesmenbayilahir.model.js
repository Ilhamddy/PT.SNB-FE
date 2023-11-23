/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_asesmenbayilahir = sequelize.define("t_asesmenbayilahir", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectemrfk:{
            type: Sequelize.CHAR(32)
        },
        responden:{
            type: Sequelize.STRING
        },
        objecthubungankeluargafk:{
            type: Sequelize.INTEGER
        },
        anamnesa:{
            type: Sequelize.STRING
        },
        gravida:{
            type: Sequelize.INTEGER
        },
        partus:{
            type: Sequelize.INTEGER
        },
        abortus:{
            type: Sequelize.INTEGER
        },
        keadaanibu:{
            type:Sequelize.STRING
        },
        tempatpersalinan:{
            type:Sequelize.STRING
        },
        penolong:{
            type:Sequelize.STRING
        },
        ketubanpecah:{
            type:Sequelize.DATE
        },
        airketuban:{
            type:Sequelize.INTEGER
        },
        lahir:{
            type:Sequelize.DATE
        },
        lamapersalinan:{
            type:Sequelize.STRING
        },
        macampersalinan:{
            type:Sequelize.INTEGER
        },
        indikasi:{
            type:Sequelize.STRING
        },
        objectjeniskelaminfk:{
            type:Sequelize.INTEGER
        },
        keadaan:{
            type:Sequelize.INTEGER
        },
        berat:{
            type:Sequelize.INTEGER
        },
        panjang:{
            type:Sequelize.FLOAT
        },
        lingkardada:{
            type:Sequelize.FLOAT
        },
        lingkarkepala:{
            type:Sequelize.FLOAT
        },
        lahirmeninggal:{
            type:Sequelize.STRING
        },
        objectstatuspulangrifk:{
            type:Sequelize.INTEGER
        },
        a1:{
            type:Sequelize.INTEGER
        },
        a5:{
            type:Sequelize.INTEGER
        },
        a10:{
            type:Sequelize.INTEGER
        },
        p1:{
            type:Sequelize.INTEGER
        },
        p5:{
            type:Sequelize.INTEGER
        },
        p10:{
            type:Sequelize.INTEGER
        },
        g1:{
            type:Sequelize.INTEGER
        },
        g5:{
            type:Sequelize.INTEGER
        },
        g10:{
            type:Sequelize.INTEGER
        },
        c1:{
            type:Sequelize.INTEGER
        },
        c5:{
            type:Sequelize.INTEGER
        },
        c10:{
            type:Sequelize.INTEGER
        },
        r1:{
            type:Sequelize.INTEGER
        },
        r5:{
            type:Sequelize.INTEGER
        },
        r10:{
            type:Sequelize.INTEGER
        },
        total1:{
            type:Sequelize.INTEGER
        },
        total5:{
            type:Sequelize.INTEGER
        },
        total10:{
            type:Sequelize.INTEGER
        },
        durasitpiece:{
            type:Sequelize.FLOAT
        },
        durasio2:{
            type:Sequelize.FLOAT
        },
        durasipompa:{
            type:Sequelize.FLOAT
        },
        durasiintubatic:{
            type:Sequelize.FLOAT
        },
        kulit:{
            type:Sequelize.STRING
        },
        tht:{
            type:Sequelize.STRING
        },
        mulut:{
            type:Sequelize.STRING
        },
        leher:{
            type:Sequelize.STRING
        },
        dada:{
            type:Sequelize.STRING
        },
        paru:{
            type:Sequelize.STRING
        },
        jantung:{
            type:Sequelize.STRING
        },
        abdomen:{
            type:Sequelize.STRING
        },
        genitalia:{
            type:Sequelize.STRING
        },
        anus:{
            type:Sequelize.STRING
        },
        extremitasatas:{
            type:Sequelize.STRING
        },
        extremitasbawah:{
            type:Sequelize.STRING
        },
        reflexhisap:{
            type:Sequelize.STRING
        },
        pengeluaranairkeruh:{
            type:Sequelize.STRING
        },
        pengeluaranmokeneum:{
            type:Sequelize.STRING
        },
        pemeriksaanlab:{
            type:Sequelize.STRING
        },
        diagnosakerja:{
            type:Sequelize.STRING
        },
        penatalaksanaan:{
            type:Sequelize.STRING
        },
    }, {
        tableName: "t_asesmenbayilahir",
        createdAt: false,
        updatedAt: false,
    });

    return t_asesmenbayilahir;
};