import './Odontogram.scss'

const Odontogram = () => {
  return (
    <div className="kontainer-all">
      <div className="odontogram-gigi">
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
      </div>
      <div className="odontogram-gigi">
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
      </div>{' '}
      <div className="odontogram-gigi">
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
      </div>{' '}
      <div className="odontogram-gigi">
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
        <Gigi />
      </div>
    </div>
  )
}

const Gigi = () => {
  return (
    <div className="kontainer-gigi">
      <GigiBawah />
      <GigiKanan />
      <GigiAtas />
      <GigiKiri />
    </div>
  )
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
