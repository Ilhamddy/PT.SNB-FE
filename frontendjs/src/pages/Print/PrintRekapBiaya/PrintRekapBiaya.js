
import EmblemBerdikari from "./emblemberdikari.png";
import "./PrintRekapBiaya.scss";

const PrintRekapBiaya = ({ }) => {
    const rsName = "Rumah Sakit Solusi Nusantara Berdikari";
    const alamat = "Menara Mandiri Tower 2, Jl. Jenderal Sudirman No.54-55, RT.5/RW.3, Senayan, Kec. Kby. Baru, Daerah Khusus Ibukota Jakarta 12190";
    const data = {}
    const dataRekap =[
        {
            name: "Akomodasi",
            price: 100000
        },
        {
            name: "Alkes",
            price: 100000
        },
        {
            name: "BMHP",
            price: 100000
        },
        {
            name: "BMHP",
            price: 100000
        },
        {
            name: "BMHP",
            price: 100000
        },
    ]
    const totalPrice = dataRekap.reduce((total, data) => total + data.price, 0);
    const totalAsuransi = 100000;
    return(
        <div className="kontainer-print-rekap-b">
            <div className="header-rekap">
                <img src={EmblemBerdikari} />
                <div className="header-title">
                    <h2>
                        {rsName} 
                    </h2>
                    <h3>
                        {alamat}
                    </h3>
                </div> 
                <img src={EmblemBerdikari}/>
            </div>
            <table className="table-data-umum">
                <tbody>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Nama Pasien
                            </p>
                            <p className="t-data-data">
                                : {data.noReg}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                DPJP
                            </p>
                            <p className="t-data-data">
                                : {data.unit}
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
                                Unit
                            </p>
                            <p className="t-data-data">
                                : {data.kamar}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No Registrasi
                            </p>
                            <p className="t-data-data">
                                : {data.namaPasien}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Kamar
                            </p>
                            <p className="t-data-data">
                                : {data.kelas}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tipe pasien
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
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                No SEP
                            </p>
                            <p className="t-data-data">
                                : {data.namaPasien}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl Masuk
                            </p>
                            <p className="t-data-data">
                                : {data.kelas}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Alamat
                            </p>
                            <p className="t-data-data">
                                : {data.namaPasien}
                            </p>
                        </td>
                        <td>
                            <p className="t-data-name">
                                Tgl Pulang
                            </p>
                            <p className="t-data-data">
                                : {data.kelas}
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
                    {dataRekap.map((data, index) => (
                        <tr key={index}>
                            <th>
                                {data.name}
                            </th>
                            <td>
                                Rp{data.price}
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
                            Rp{0}
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

export default PrintRekapBiaya;