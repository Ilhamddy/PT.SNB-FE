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
        </div>
    )
}

export default PrintHasilLaboratorium;