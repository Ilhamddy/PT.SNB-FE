import { useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'

const RiwayatPendaftaran = () => {
  const refKontainer = useRef(null)
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="jadwal-konten">
      <div className="navigasi-poliklinik"></div>
    </KontainerPage>
  )
}

export default RiwayatPendaftaran
