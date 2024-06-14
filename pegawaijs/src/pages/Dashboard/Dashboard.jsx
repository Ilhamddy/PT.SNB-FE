import KontainerPage from 'daftarmandiri/src/Components/KontainerPage/KontainerPage'
import HeaderProfil from './HeaderProfil'

const Dashboard = () => {
  return (
    <KontainerPage
      top={150}
      className="kontainer-dashboardjs"
      header={<HeaderProfil />}
    >
      <div>Loggedin</div>
    </KontainerPage>
  )
}

export default Dashboard
