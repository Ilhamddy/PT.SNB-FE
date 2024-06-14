import KontainerPage from 'daftarmandiri/src/Components/KontainerPage/KontainerPage'
import HeaderProfil from './HeaderProfil'
import {
  IsiKontenDasbor,
  KontenMenuDasbor,
} from 'daftarmandiri/src/pages/Home/HomePage'
import GbrRiwayat from './riwayat-pendaftaran.svg'
import { useRef } from 'react'
import { useHandleNextPage } from 'daftarmandiri/src/utils/ui'

const Dashboard = () => {
  const { refKontainer, handleToNextPage } = useHandleNextPage()

  return (
    <KontainerPage
      top={150}
      className="kontainer-dashboardjs"
      header={<HeaderProfil />}
      ref={refKontainer}
    >
      <KontenMenuDasbor jumlahMenu={4}>
        <IsiKontenDasbor
          gbr={GbrRiwayat}
          text={'Absen'}
          onClick={() => handleToNextPage('/absen')}
        />
      </KontenMenuDasbor>
    </KontainerPage>
  )
}

export default Dashboard
