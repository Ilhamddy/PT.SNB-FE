
import EmblemBerdikari from "./emblemberdikari.png";
import "./PrintRekapBiaya.scss";

const PrintRekapBiaya = ({ dataRekap, dataPasien }) => {
    const rsName = "Rumah Sakit Solusi Nusantara Berdikari";
    const alamat = "Menara Mandiri Tower 2, Jl. Jenderal Sudirman No.54-55, RT.5/RW.3, Senayan, Kec. Kby. Baru, Daerah Khusus Ibukota Jakarta 12190";
    const dataPasien2 = {}
    const totalPrice = dataRekap?.reduce((total, dataR) => total + dataR.sum, 0) || 0;
    const totalAsuransi = 0;
    const totalDiscount = dataRekap?.reduce((total, dataR) => total + (dataR.discount || 0), 0) || 0;
    return(
        <div className="kontainer-print-rekap-b">
            <div className="header-rekap">
                <img src={EmblemBerdikari} alt="emblem-berdikari"/>
                <div className="header-title">
                    <h2>
                        {rsName} 
                    </h2>
                    <h3>
                        {alamat}
                    </h3>
                </div> 
                <img src={EmblemBerdikari} alt="emblem-berdikari"/>
            </div>
            <table className="table-data-umum">
                <tbody>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Nama Pasien
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.pasien?.[0]?.namapasien || "-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                DPJP
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.dokter?.[0]?.nama}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No. Rm
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.nocmfk || ""}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Unit
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.unit?.[0]?.namaunit || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No Registrasi
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.noregistrasi || "-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Kamar
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.kamar?.[0] || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tipe pasien
                            </p>
                            <p className="t-data-data">
                                : {"-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Kelas
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.kelas?.[0]?.namakelas || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No SEP
                            </p>
                            <p className="t-data-data">
                                : {dataPasien2.namaPasien || "-"}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl Masuk
                            </p>
                            <p className="t-data-data">
                                : {(new Date(dataPasien?.tglregistrasi))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}
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
                        <td>
                            <p className="t-data-name">
                                Tgl Pulang
                            </p>
                            <p className="t-data-data">
                                : {dataPasien2.kelas}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3 className="rekap-b-layanan">
                REKAPITULASI BIAYA LAYANAN
            </h3>
            <table className="table-data-rekap">
                <tbody>
                    {dataRekap.map((dataR, index) => (
                            <tr key={index}>
                                <th>
                                    {dataR.variabelbpjs}
                                </th>
                                <td>
                                    Rp{dataR.sum}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <table className="table-data-total">
                <tbody>
                    <tr>
                        <th>
                            Total
                        </th>
                        <td>
                            Rp{totalPrice}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Diskon
                        </th>
                        <td>
                            Rp{totalDiscount}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Klaim Asuransi
                        </th>
                        <td>
                            Rp{totalAsuransi}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Deposit
                        </th>
                        <td>
                            Rp{0}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Total Tagihan
                        </th>
                        <td>
                            Rp{totalPrice - totalAsuransi}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

PrintRekapBiaya.defaultProps = {
    dataRekap: []
}

export default PrintRekapBiaya;