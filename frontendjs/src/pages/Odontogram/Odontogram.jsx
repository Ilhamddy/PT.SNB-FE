import { useState } from 'react'
import './Odontogram.scss'

const Odontogram = () => {
  let [gigi] = useState([
    {
      reportdisplay: '11',
    },
    {
      reportdisplay: '12',
    },
    {
      reportdisplay: '21',
    },
    {
      reportdisplay: '22',
    },
  ])
  const kuadran1 = gigi.filter((f) => f.reportdisplay[0] === '1')
  const kuadran2 = gigi.filter((f) => f.reportdisplay[0] === '2')

  return (
    <div className="kontainer-all">
      <div className="kontainer-all-gigi">
        <div className="all-kuadran">
          <div className="isi-kuadran">
            <div className="kuadran1-gigi">
              {kuadran1.map((gigi, index) => (
                <Gigi key={index} />
              ))}
            </div>
            <div className="kuadran2-gigi">
              {kuadran2.map((gigi, index) => (
                <Gigi key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Gigi = ({ onClickKiri, onClickBawah, onClickTengah, onClick }) => {
  return (
    <div className="kontainer-gigi">
      <GigiTengah />
      <GigiBawah />
      <GigiKanan />
      <GigiAtas />
      <GigiKiri />
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
