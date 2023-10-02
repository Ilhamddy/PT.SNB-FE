import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import './JadwalDokter.scss'
import arrowKiriImg from './arrow-kiri.svg'
import arrowKananImg from './arrow-kanan.svg'
import dokter from './dokter.png'
import { useRef } from 'react'

const JadwalDokter = () => {
  const refKontainer = useRef(null)
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="jadwal-konten">
      <div className="navigasi-poliklinik">
        <div className="navigasi">
          <img src={arrowKiriImg} alt="navigasi" />
        </div>
        <div className="poliklinik-terpilih">
          <p className="judul-poliklinik">Poliklinik Kebidanan</p>
          <p className="jadwal-poliklinik">Senin, 9 September 2023</p>
        </div>
        <div className="navigasi">
          <img src={arrowKananImg} alt="navigasi" />
        </div>
      </div>
      <div className="jadwal-dokter">
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />{' '}
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />{' '}
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />{' '}
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />{' '}
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />{' '}
        <JadwalDokterKomponen
          imgDokter={dokter}
          namaDokter={'dr. H. Boyke Dian Nugraha, Sp.OG, MARS'}
          jadwal={'Senin, 9 September 2023'}
        />
      </div>
    </KontainerPage>
  )
}

const JadwalDokterKomponen = ({ imgDokter, namaDokter, jadwal }) => {
  return (
    <div className="isi-jadwal-dokter">
      <img src={imgDokter} alt={namaDokter} />
      <div className="jabar">
        <p className="nama">{namaDokter}</p>
        <p className="jadwal">{jadwal}</p>
      </div>
    </div>
  )
}

export default JadwalDokter
