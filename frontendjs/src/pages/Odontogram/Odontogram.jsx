import { useEffect, useState } from 'react'
import './Odontogram.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGigi } from '../../store/odontogram/odontogramSlice'

const Odontogram = () => {
  const dispatch = useDispatch()
  let gigi = useSelector(
    (state) => state.odontogramSlice.getAllGigi.data?.allGigi || []
  )

  useEffect(() => {
    dispatch(getAllGigi())
  }, [dispatch])

  const kuadran1 = gigi.filter((f) => f.reportdisplay[0] === '1')
  const kuadran2 = gigi.filter((f) => f.reportdisplay[0] === '2')

  const kuadran5 = gigi.filter((f) => f.reportdisplay[0] === '5')
  const kuadran6 = gigi.filter((f) => f.reportdisplay[0] === '6')
  const kuadran7 = gigi.filter((f) => f.reportdisplay[0] === '7')
  const kuadran8 = gigi.filter((f) => f.reportdisplay[0] === '8')

  const kuadran4 = gigi.filter((f) => f.reportdisplay[0] === '4')
  const kuadran3 = gigi.filter((f) => f.reportdisplay[0] === '3')

  return (
    <div className="kontainer-all">
      <div className="kontainer-all-gigi">
        <div className="all-kuadran">
          <div className="isi-kuadran">
            <div className="kuadran-kiri-gigi">
              {kuadran1.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
            <div className="kuadran-kanan-gigi">
              {kuadran2.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
          </div>
          <div className="isi-kuadran margin-kuadran">
            <div className="kuadran-kiri-gigi-bayi">
              {kuadran5.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
            <div className="kuadran-kanan-gigi-bayi">
              {kuadran6.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
          </div>
          <div className="isi-kuadran">
            <div className="kuadran-kiri-gigi-bayi">
              {kuadran8.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
            <div className="kuadran-kanan-gigi-bayi">
              {kuadran7.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
          </div>
          <div className="isi-kuadran margin-kuadran">
            <div className="kuadran-kiri-gigi">
              {kuadran4.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
            <div className="kuadran-kanan-gigi">
              {kuadran3.map((gigi, index) => (
                <Gigi key={index} namaGigi={gigi.reportdisplay} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Gigi = ({
  namaGigi,
  onClickKiri,
  onClickBawah,
  onClickTengah,
  onClick,
}) => {
  return (
    <div className="kontainer-gigi">
      <GigiTengah />
      <GigiBawah />
      <GigiKanan />
      <GigiAtas />
      <GigiKiri />
      <div className="nama-gigi">{namaGigi}</div>
    </div>
  )
}

const GigiTengah = () => {
  return <div className="gigi-tengah"></div>
}

const GigiBawah = () => {
  return (
    <div className="kontainer-gigi-bawah">
      <div className="gigi-bawah"></div>
    </div>
  )
}
const GigiKanan = () => {
  return (
    <div className="kontainer-gigi-kanan">
      <div className="gigi-kanan"></div>
    </div>
  )
}
const GigiAtas = () => {
  return (
    <div className="kontainer-gigi-atas">
      <div className="gigi-atas"></div>
    </div>
  )
}
const GigiKiri = () => {
  return (
    <div className="kontainer-gigi-kiri">
      <div className="gigi-kiri"></div>
    </div>
  )
}

export default Odontogram
