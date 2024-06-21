import KontainerPage from 'daftarmandiri/src/Components/KontainerPage/KontainerPage'
import HeaderProfil from './HeaderProfil'
import {
  IsiKontenDasbor,
  KontenMenuDasbor,
} from 'daftarmandiri/src/pages/Home/HomePage'
import { useRef } from 'react'
import { useHandleNextPage } from 'daftarmandiri/src/utils/ui'

const Dashboard = () => {
  const { refKontainer, handleToNextPage } = useHandleNextPage()

  return (
    <KontainerPage
      top={260}
      className="kontainer-dashboardjs"
      header={<HeaderProfil handleToNextPage={handleToNextPage} />}
      ref={refKontainer}
    ></KontainerPage>
  )
}

export default Dashboard
