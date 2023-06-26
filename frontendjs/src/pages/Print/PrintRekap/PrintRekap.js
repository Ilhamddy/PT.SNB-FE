
import "./PrintRekap.scss"

const PrintRekap = ({data}) => {

    return (
        <div className="kontainer-print-rekap ">
            <h2 className="judul-print-rekap    ">
                Rekap Biaya Pelayanan
            </h2>
            <table className="table-print-rekap">
                <tbody className="data-utama">
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No. Registrasi
                            </p>
                            <p className="t-data-data">
                                : {data.noReg}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Unit
                            </p>
                            <p className="t-data-data">
                                : {data.unit}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl. Masuk
                            </p>
                            <p className="t-data-data">
                                : {data.tglMasuk}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No. Rm
                            </p>
                            <p className="t-data-data">
                                : {data.noRm}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Kamar
                            </p>
                            <p className="t-data-data">
                                : {data.kamar}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl. Pulang
                            </p>
                            <p className="t-data-data">
                                : {data.tglPulang}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Nama Pasien
                            </p>
                            <p className="t-data-data">
                                : {data.namaPasien}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Kelas
                            </p>
                            <p className="t-data-data">
                                : {data.kelas}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Penjamin
                            </p>
                            <p className="t-data-data">
                                : {data.penjamin}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tipe
                            </p>
                            <p className="t-data-data">
                                : {data.Tipe}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                DPJP
                            </p>
                            <p className="t-data-data">
                                : {data.dpjp}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No. SEP
                            </p>
                            <p className="t-data-data">
                                : {data.noSep}

                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


PrintRekap.defaultProps = {data: {
    noReg: "eacb",
    noRm: "djklsa",
    namaPasien: "Rizky",
    Tipe: "Umum",
    noSep: "ABdfabJDFdk",
    unit: "lodaya",
    kamar: "lodaya",
    kelas: "VVIP",
    dpjp: "dr. Rizky",
    tglMasuk: "12/12/2020",
    tglPulang: "12/12/2020",
    penjamin: "Umum",
    jmldibayar: 1634613,
    administrasi: [
        {
            name: "materai",
            qty: 1,
            price: 6000
        },
        {
            name: "deposit uang",
            qty: 1,
            price: 0
        },
        {
            name: "diskon jasa",
            qty: 1,
            price: 0
        },
        {
            name: "diskon umum",
            qty: 1,
            price: 0
        },
        {
            name: "sisa deposit",
            qty: 1,
            price: 0
        }
    ],
    rekap: [
        {
            jenis: "Alat Medis",
            item: [
                {
                    name: "dr. Afiyati Rakhmatika Moestafa",
                    qty: 1,
                    price: 1964
                },
                {
                    name: "dr. Dhira Vindy",
                    qty: 1,
                    price: 1964
                },
                {
                    name: "dr. Rizky",
                    qty: 1,
                    price: 55324
                },
            ]
        },
        {
            jenis: "Kamar",
            item: [
                {
                    name: "Kamar/Akomodasi",
                    qty: 1,
                    price: 185000
                },
            ]
        },
        {
            jenis: "Keperawatan",
            item: [
                {
                    name: "Jasa Keperawatan",
                    qty: 1,
                    price: 297000
                }
            ]
        },
        {
            jenis: "Konsultasi",
            item: [
                {
                    name: "dr Evan Pratama Ludirja, M. Biomed, S.PD",
                    qty: 1,
                    price: 160000
                },
                {
                    name: "dr. Nyayu Tri Yeni, Sp.PD",
                    qty: 1,
                    price: 50000
                },
                {
                    name: "dr. Rhomado Mozam",
                    qty: 1,
                    price: 60000
                }
            ]
        },
        {
            jenis: "Laboratorium",
            item: [
                {
                    name: "dr Eirene Jaquelene K Tomatala, SpPK",
                    qty: 1,
                    price: 277000
                },
                {
                    name: "dr. Mekar Palupi, M.Sc, Sp.PK",
                    qty: 1,
                    price: 142750
                }
            ]
        },
        {
            jenis: "Obat",
            item: [
                {
                    name: "dr Rido Jati Kuncara",
                    qty: 1,
                    price: 10773
                },
                {
                    name: "dr. Afiyati Rakhmatika Moesthafa",
                    qty: 1,
                    price: 3186
                },
                {
                    name: "dr. Dhira Vindy Amanda",
                    qty: 1,
                    price: 7202
                },
                {
                    name: "dr. Evan Pratama Ludirja, M.BioMed, Sp.PD",
                    qty: 1,
                    price: 57000
                },
                {
                    name: "dr. Romado Mozam",
                    qty: 1,
                    price: 165338
                }
            ]
        },
        {
            jenis: "Radiologi",
            item: [
                {
                    name: "dr. Josef P Siregar, Sp.PK",
                    qty: 1,
                    price: 95000
                }
            ]
        },
        {
            jenis: "Sewa Alat",
            item: [
                {
                    name: "Sewa Alat",
                    qty: 1,
                    price: 65000
                }
            ]
        }
    ]
}}

export default PrintRekap