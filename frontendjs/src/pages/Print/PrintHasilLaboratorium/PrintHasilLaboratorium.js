import EmblemBerdikari from "./emblemberdikari.png";
import "./PrintHasilLaboratorium.scss";
const PrintHasilLaboratorium = ({ dataCetak, dataPasien, dokterlab,
    unitpengirim, dokterpengirim, tgllayanan, tglhasil, tglcetak }) => {
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
                                : {dataPasien?.pasien?.[0]?.nocm || "-"} / {dataPasien?.noregistrasi || "-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Unit Pengirim
                            </p>
                            <p className="t-data-data">
                                : {unitpengirim}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Nama Pasien
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.pasien?.[0]?.namapasien || ""}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Dokter Pengirim
                            </p>
                            <p className="t-data-data">
                                : {dokterpengirim || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tgl Lahir/Umur
                            </p>
                            <p className="t-data-data">
                                {dataPasien?.pasien?.[0]?.tgllahir || ""}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tanggal Pelayanan
                            </p>
                            <p className="t-data-data">
                                : {(new Date(tgllayanan))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Jenis Kelamin
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.jeniskelamin || "-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tanggal Hasil
                            </p>
                            <p className="t-data-data">
                                : {(new Date(tglhasil))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tipe Pasien
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.penjamin1?.[0]?.namarekanan || "-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl Cetak
                            </p>
                            <p className="t-data-data">
                                : {(new Date(tglcetak))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Alamat
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.pasien?.[0]?.alamatdomisili || "-"}
                            </p>
                        </td>

                    </tr>
                </tbody>
            </table>
            <table className="table-data-hasil">
                <thead>
                    <tr>
                        <th>Pemeriksaan</th>
                        <th>Hasil Pemeriksaan</th>
                        <th>Nilai Rujuk</th>
                        <th>Satuan Hasil</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCetak.map((item, key) =>
                        <tr key={key}>
                            <td>{item.pemeriksaan_lab}</td>
                            <td>{item.nilaihasil}</td>
                            <td>{item.nilaitext}</td>
                            <td>{item.satuan}</td>
                            <td>{item.keterangan}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PrintHasilLaboratorium;