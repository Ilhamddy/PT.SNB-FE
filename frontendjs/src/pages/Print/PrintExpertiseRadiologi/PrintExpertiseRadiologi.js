import EmblemBerdikari from "./emblemberdikari.png";
import "./PrintExpertiseRadiologi.scss"
import {  Col, Row } from "reactstrap";
const PrintExpertiseRadiologi = ({
    dataPasien, dokterradiologi, unitpengirim, dokterpengirim, tgllayanan, tglcetak, expertise }) => {
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
                                : {dataPasien?.nocm || "-"} / {dataPasien?.noregistrasi || "-"}
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
                                : {dataPasien?.namapasien || ""}
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
                                : {dataPasien?.tgllahir || ""}
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
                                Tanggal Cetak
                            </p>
                            <p className="t-data-data">
                                : {(new Date(tglcetak))?.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) || "-"}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Tipe Pasien
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.namarekanan || "-"}
                            </p>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <p className="t-data-name">
                                Alamat
                            </p>
                            <p className="t-data-data">
                                : {dataPasien?.alamatdomisili || "-"}
                            </p>
                        </td>

                    </tr>
                </tbody>
            </table>

            <div dangerouslySetInnerHTML={{ __html: `<div style="font-size: 10px;">${expertise}</div>` }} />
            {/* <table className="table-data-footer">
                <tbody>
                    
                </tbody>
            </table> */}
            <div className="data-footer">
                <Row>
                    <Col lg={6}></Col>
                    <Col lg={6}>
                    <p>dr. Radiologi</p>
                <br/>
                <br/>
                <p>({dokterradiologi})</p>
                    </Col>
                </Row>
                
            </div>
        </div>

    )
}

export default PrintExpertiseRadiologi;