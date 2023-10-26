import { ToastContainer } from 'react-toastify'
import { useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getJadwalOperasi } from '../../store/actions'
import './ViewerBed.scss'

const ViewerBed = () => {
  const { waktu, tanggal } = useDate()
  return (
    <div className="viewer-bed">
      <ToastContainer />
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="kontainer-konten">
        <h1 className="judul-viewer-bed">
          Informasi Ketersediaan Tempat Tidur
        </h1>
        <div className="kontainer-data">
          <div className="kontainer-tabel-informasi">
            <div className="tabel-informasi">
              <div className="head-table">
                <div className="row-bed">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VVIP</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VIP</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VVIP</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VVIP</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VVIP</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VVIP</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>VVIP</p>
                  </div>
                </div>
              </div>
              <div className="body-table">
                <div className="row-bed">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>1</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>8</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed bg-genap">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed ">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed bg-genap">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed bg-genap">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed bg-genap">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
                <div className="row-bed bg-genap">
                  <div className="kontainer-data-ruangan">
                    <p className="ruangan">Ruangan</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>4</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                  <div className="kontainer-data-kelas-table">
                    <p>-</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="legend">
              <div className="legend-jumlah">
                <div className="jumlah-tersedia"></div>
                <p>Jumlah Bed</p>
              </div>
              <div className="legend-jumlah">
                <div className="bed-tersedia"></div>
                <p>Bed Tersedia</p>
              </div>
            </div>
          </div>
          <div className="kelas">
            <div className="kontainer-kelas">
              <p className="judul-kelas">Kelas VVIP</p>
              <div className="bed">
                <div className="kontainer-bed">
                  <p className="jumlah-bed">8</p>
                </div>
                <div className="kontainer-sisa">
                  <p className="tersisa">4</p>
                </div>
              </div>
            </div>
            <div className="kontainer-kelas">
              <p className="judul-kelas">Kelas VVIP</p>
              <div className="bed">
                <div className="kontainer-bed">
                  <p className="jumlah-bed">8</p>
                </div>
                <div className="kontainer-sisa">
                  <p className="tersisa">4</p>
                </div>
              </div>
            </div>
            <div className="kontainer-kelas">
              <p className="judul-kelas">Kelas VVIP</p>
              <div className="bed">
                <div className="kontainer-bed">
                  <p className="jumlah-bed">8</p>
                </div>
                <div className="kontainer-sisa">
                  <p className="tersisa">4</p>
                </div>
              </div>
            </div>
            <div className="kontainer-kelas">
              <p className="judul-kelas">Kelas VVIP</p>
              <div className="bed">
                <div className="kontainer-bed">
                  <p className="jumlah-bed">8</p>
                </div>
                <div className="kontainer-sisa">
                  <p className="tersisa">4</p>
                </div>
              </div>
            </div>
            <div className="kontainer-kelas">
              <p className="judul-kelas">Kelas VVIP</p>
              <div className="bed">
                <div className="kontainer-bed">
                  <p className="jumlah-bed">8</p>
                </div>
                <div className="kontainer-sisa">
                  <p className="tersisa">4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewerBed
