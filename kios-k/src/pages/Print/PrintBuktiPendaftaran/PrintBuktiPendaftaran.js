

import "./PrintBuktiPendaftaran.scss"

const PrintBuktiPendaftaran = ({
    noRekam, 
    nama,
    tglLahir,
    noReg,
    tglPendaftaran,
    poliTujuan,
    dokterTujuan,
    rujukanAsal,
    penjamin,
    catatan,
    noAntrean,
    initialDoc
}) => {
    return (
        <div className="kontainer-print-bukti-pendaftaran">
            <h2>
                Bukti Pendaftaran Pasien Rumah Sakit Solusi Nusantara Berdikari
            </h2>
            <div className="data-bukti-pendaftaran">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                No Rekam Medis
                            </th>
                            <td>
                                : {noRekam}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Nama
                            </th>
                            <td>
                                : {nama}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Tgl Lahir
                            </th>
                            <td>
                                : {tglLahir}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                No Registrasi
                            </th>
                            <td>
                                : {noReg}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Tgl Pendaftaran
                            </th>
                            <td>
                                : {tglPendaftaran}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Poli Tujuan
                            </th>
                            <td>
                                : {poliTujuan}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Dokter Tujuan
                            </th>
                            <td>
                                : {dokterTujuan}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Rujukan Asal
                            </th>
                            <td>
                                : {rujukanAsal}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Penjamin
                            </th>
                            <td>
                                : {penjamin}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Catatan
                            </th>
                            <td>
                                : {catatan}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="no-antrean">
                    <h3>NO ANTREAN</h3>
                    <p className="data-no-antrean">{noAntrean}</p>
                    <p className="initial-doc">{initialDoc}</p>
                </div>
            </div>
        </div>
    )
}

PrintBuktiPendaftaran.defaultProps = {
    noRekam: "",
    nama: "",
    tglLahir: "",
    noReg: "",
    tglPendaftaran: "",
    poliTujuan: "",
    dokterTujuan: "",
    rujukanAsal: "",
    penjamin: "",
    catatan: "",
    noAntrean: "2   ",
    initialDoc: "MYS"
}


export default PrintBuktiPendaftaran