import EmblemBerdikari from "./emblemberdikari.png";
import "./PrintHasilLaboratorium.scss";
const PrintHasilLaboratorium = () => {
    const rsName = "Rumah Sakit Solusi Nusantara Berdikari";
    const alamat = "Menara Mandiri Tower 2, Jl. Jenderal Sudirman No.54-55, RT.5/RW.3, Senayan, Kec. Kby. Baru, Daerah Khusus Ibukota Jakarta 12190";
    return (
        <div className="kontainer-print-hasil-b">
            <div className="header-hasil">
                <img src={EmblemBerdikari} alt="emblem-berdikari" />
                <div className="header-title">
                    <h2>
                        {rsName}
                    </h2>
                    <h3>
                        {alamat}
                    </h3>
                </div>
                <img src={EmblemBerdikari} alt="emblem-berdikari" />
            </div>
            <table className="table-data-umum">
                <tbody>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No RM/No Registrasi
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.pasien?.[0]?.namapasien || "-"} */}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Unit Pengirim
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.dokter?.[0]?.nama} */}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Nama Pasien
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.nocmfk || ""} */}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Dokter Pengirim
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.unit?.[0]?.namaunit || "-"} */}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tgl Lahir/Umur
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.noregistrasi || "-"} */}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tanggal Pelayanan
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.kamar?.[0] || "-"} */}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Jenis Kelamin
                            </p>
                            <p className="t-data-data">
                                : {"-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tanggal Hasil
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.kelas?.[0]?.namakelas || "-"} */}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tipe Pasien
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien2.namaPasien || "-"} */}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl Cetak
                            </p>
                            <p className="t-data-data">
                                {/* : {(new Date(dataPasien?.tglregistrasi))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"} */}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Alamat
                            </p>
                            <p className="t-data-data">
                                {/* : {dataPasien?.pasien?.[0]?.alamatdomisili || "-"} */}
                            </p>
                        </td>

                    </tr>
                </tbody>
            </table>
            <table className="table-data-hasil">
                <thead>
                    <tr>
                        <th scope="col">Pemeriksaan</th>
                        <th  scope="col">Hasil Pemeriksaan</th>
                        <th  scope="col">Nilai Rujuk</th>
                        <th  scope="col">Satuan Hasil</th>
                        <th  scope="col">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}

export default PrintHasilLaboratorium;