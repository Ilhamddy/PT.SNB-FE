import { useEffect, useRef } from 'react'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import './TempatTidurPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBed } from '../../store/actions'

const TempatTidurPage = () => {
  const dispatch = useDispatch()
  const refKontainer = useRef()
  const kelas = useSelector((state) => state.Home.getAllBed.data?.kelas || [])
  useEffect(() => {
    dispatch(getAllBed())
  }, [])
  return (
    <KontainerPage ref={refKontainer} top="0px" className="tempat-tidur-page">
      <BackKomponen text="Tempat Tidur" refKontainer={refKontainer} />
      <div className="legend-tempat-tidur">
        <div className="isi-legend">
          <div className="legend-jumlah legend" />
          <p className="teks-legend">Jumlah Bed</p>
        </div>
        <div className="isi-legend">
          <div className="legend-tersedia legend" />
          <p className="teks-legend">Bed Tersedia</p>
        </div>
      </div>
      {kelas.map((kelas) => (
        <TempatTidur
          kelas={kelas.namakelas}
          jumlahBed={kelas.totalbed}
          bedTersedia={kelas.totalkosong}
        />
      ))}
    </KontainerPage>
  )
}

const TempatTidur = ({ kelas, jumlahBed, bedTersedia }) => {
  return (
    <div className="tempat-tidur">
      <p className="isi-kelas">{kelas}</p>
      <div className="isi-data">
        <div className="kontainer-bed jumlah-bed">
          <p className=" data-bed">{jumlahBed}</p>
        </div>
        <div className="kontainer-bed bed-tersedia">
          <p className=" data-bed">{bedTersedia}</p>
        </div>
      </div>
    </div>
  )
}

export default TempatTidurPage
