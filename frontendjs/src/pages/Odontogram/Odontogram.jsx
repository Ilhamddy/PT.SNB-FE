import './Odontogram.scss'

const Odontogram = () => {
  let gigi = [
    {
      type: 'graham',
      erupsi: null,
      tambalan: null,
      kondisiKiri: [],
      kondisiKanan: [],
      kondisiBawah: [],
      kondisiTengah: [],
    },
  ]
  return (
    <div className="kontainer-all">
      <div className="kontainer-all-gigi">
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
    </div>
  )
}

const Gigi = ({}) => {
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
