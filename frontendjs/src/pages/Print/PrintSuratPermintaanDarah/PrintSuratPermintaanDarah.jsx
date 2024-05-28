import './PrintSuratPermintaanDarah.scss'
import { Col, Row } from 'reactstrap'
import GambarHealthTechs from '../../../assets/images/logo_snb2.jpg'
import { dateLocal } from '../../../utils/format'
const PrintSuratPermintaanDarah = ({
  dataSelected,
  dataPasien,
  untukKeperluan,
  tgllayanan,
}) => {
  const rsName = 'Rumah Sakit Solusi Nusantara Berdikari'
  const alamat =
    'Menara Mandiri Tower 2, Jl. Jenderal Sudirman No.54-55, RT.5/RW.3, Senayan, Kec. Kby. Baru, Daerah Khusus Ibukota Jakarta 12190'
  return (
    <div className="kontainer-print-permintaan-darah">
      <div className="header-hasil">
        <img src={GambarHealthTechs} alt="emblem-berdikari" />
        <div className="header-title">
          <h2>{rsName}</h2>
          <h3>{alamat}</h3>
        </div>
        <img src={GambarHealthTechs} alt="emblem-berdikari" />
      </div>
      <div className='header-judul'>
        <h2>Surat Permintaan Darah</h2>
      </div>
      <div className='body-surat'>
        <p>Yang Bertandatangan di bawah ini :</p>
        <div className="isi-data">
          <p>Dokter Yang Merawat</p>
          <p className="data">: {dataPasien?.namadokter}</p>
        </div>
        <div className="isi-data">
          <p>Nama Penderita</p>
          <p className="data">: {dataPasien?.namapasien}</p>
        </div>
        <div className="isi-data">
          <p>Nomor Kartu Peserta Askes</p>
          <p className="data">: {dataPasien?.nobpjs}</p>
        </div>
        <div className="isi-data">
          <p>Diagnosa</p>
          <p className="data">: {dataPasien?.diagnosa}</p>
        </div>
        <div className="isi-data">
          <p>Ruang Rawat</p>
          <p className="data">: {dataPasien?.ruangantd}</p>
        </div>
      </div>
      <div className='body-surat'>
        <p>Sesuai indikasi yang bersangkutan memerlukan darah sebagai berikut :</p>
        <div className="isi-data">
          <p>Jenis Darah</p>
          <p className="data">: {dataSelected?.namaproduk}</p>
        </div>
        <div className="isi-data">
          <p>Golongan Darah</p>
          <p className="data">: {dataPasien?.namapasien}</p>
        </div>
        <div className="isi-data">
          <p>Untuk Keperluan</p>
          <p className="data">: {untukKeperluan}</p>
        </div>
        <div className="isi-data">
          <p>Diperlukan Tanggal</p>
          <p className="data">: {dateLocal(tgllayanan)}</p>
        </div>
        <p>Demikian untuk menjadi periksa </p>
      </div>
      <div className="data-footer">
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
            <div>Jakarta, {dateLocal(new Date())}</div>
            <div>Dokter Yang Merawat</div>
            <br />
            <br />
            <p>({dataPasien?.namadokter})</p>
          </Col>
        </Row>
      </div>
      <div className='header-judul'>
        <h2>Tanda Terima</h2>
      </div>
      <div className='body-surat'>
        <p>Telah Terima dari UTD Palang Merah Indonesia (PMI) Cabang .........................</p>
        <div className="isi-data">
          <p>Banyaknya</p>
          <p className="data">: ................(....) kantong/bag</p>
        </div>
        <div className="isi-data">
          <p>Nomor Bag</p>
          <p className="data">: 1................................,2................................</p>
        </div>
        <div className="isi-data">
          <p></p>
          <p className="data">: 3................................,4................................</p>
        </div>
        <div className="isi-data">
          <p></p>
          <p className="data">: 5................................,6................................</p>
        </div>
        <p>Demikian untuk menjadi periksa</p>
      </div>
      <div className="data-footer-2">
        <Row>
          <Col lg={6}>
            <div>Yang Menyerahkan</div>
            <div>Petugas UTD PMI Cabang</div>
            <br />
            <br />
            <p>(....................)</p>
          </Col>
          <Col lg={6}>
            <div>Yang Menerima :</div>
            <div>Peserta/keluarga:</div>
            <br />
            <br />
            <p>(....................)</p>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PrintSuratPermintaanDarah
