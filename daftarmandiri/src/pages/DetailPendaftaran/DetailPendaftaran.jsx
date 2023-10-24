import { useRef } from 'react'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'

const DetailPendaftaran = () => {
  const refKontainer = useRef(null)
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="detail-pendaftaran">
      <div className="page-detail-pendaftaran">
        <BackKomponen refKontainer={refKontainer} text="Pilih Jadwal" />
        <img />
        <div></div>
      </div>
    </KontainerPage>
  )
}
