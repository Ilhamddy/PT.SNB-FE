import { useRef } from 'react'
import {
  JadwalDokterKomponen,
  BackKomponen,
} from '../JadwalDokter/JadwalDokter'
import dokterImg from './dokter.png'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { useSelector } from 'react-redux'

const DokterPage = () => {
  const refKontainer = useRef(null)
  const { dokter } = useSelector((state) => ({
    dokter: state.Home.getJadwalDokter?.data?.dokter || [],
  }))
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="dokter-page">
      <BackKomponen text={'Profil Dokter'} refKontainer={refKontainer} />
      <JadwalDokterKomponen
        dokters={dokter}
        imgDokter={dokterImg}
        refKontainer={refKontainer}
      />
    </KontainerPage>
  )
}

export default DokterPage
