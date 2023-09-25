import skala0 from './skala0.svg'
import skala1 from './skala1.svg'
import skala2 from './skala2.svg'
import skala3 from './skala3.svg'
import skala4 from './skala4.svg'
import skala5 from './skala5.svg'
import skala6 from './skala6.svg'
import skala7 from './skala7.svg'
import skala8 from './skala8.svg'
import skala9 from './skala9.svg'
import skala10 from './skala10.svg'
import { useState } from 'react'
import './SkalaNyeri.scss'

/**
 * @typedef {object} Props
 * @prop {number} quantity
 * @prop {(n: number) => void} onQuantityChange
 */

/**
 * @type {import('react').FC<Props>}
 */
const SkalaNyeri = ({ quantity, onQuantityChange }) => {
  const skalas = [
    {
      skala: 0,
      img: skala0,
      color: '#308A45',
    },
    {
      skala: 1,
      img: skala1,
      color: '#4F9A3F',
    },
    {
      skala: 2,
      img: skala2,
      color: '#8CBB33',
    },
    {
      skala: 3,
      img: skala3,
      color: '#CBDE27',
    },
    {
      skala: 4,
      img: skala4,
      color: '#F3EA1E',
    },
    {
      skala: 5,
      img: skala5,
      color: '#F3CF16',
    },
    {
      skala: 6,
      img: skala6,
      color: '#F3B410',
    },
    {
      skala: 7,
      img: skala7,
      color: '#F39208',
    },
    {
      skala: 8,
      img: skala8,
      color: '#EE6100',
    },
    {
      skala: 9,
      img: skala9,
      color: '#E33B00',
    },
    {
      skala: 10,
      img: skala10,
      color: '#D40B0B',
    },
  ]
  const [qtyVal, setQtyVal] = useState(() => quantity)
  const handleValueChange = (skala) => {
    setQtyVal(skala)
    onQuantityChange && onQuantityChange(skala)
  }
  return (
    <div className="kontainer-skala-nyeri">
      {skalas.map((skala, key) => (
        <IsiSkalaNyeri
          key={key}
          skala={skala.skala}
          img={skala.img}
          color={skala.color}
          filled={skala.skala <= qtyVal}
          onClick={() => handleValueChange(skala.skala)}
        />
      ))}
    </div>
  )
}

const IsiSkalaNyeri = ({ skala, img, color, filled, onClick }) => {
  const backgroundStyle = !filled
    ? {}
    : {
        backgroundColor: color,
      }
  return (
    <div className="kontainer-isi-skala-nyeri" style={backgroundStyle}>
      <img
        onClick={onClick}
        className="gbr-skala-nyeri"
        src={img}
        alt={skala}
      />
      <p className="teks-skala">{skala}</p>
    </div>
  )
}

export default SkalaNyeri
