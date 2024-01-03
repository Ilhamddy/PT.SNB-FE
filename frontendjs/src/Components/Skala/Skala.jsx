import { useState } from 'react'
import './Skala.scss'

/**
 * @typedef {object} Props
 * @prop {number} quantity
 * @prop {(n: number) => void} onQuantityChange
 */

/**
 * @type {import('react').FC<Props>}
 */
const Skala = ({ quantity, onQuantityChange }) => {
  const skalas = [
    {
      skala: 0,
      color: '#308A45',
    },
    {
      skala: 1,
      color: '#4F9A3F',
    },
    {
      skala: 2,
      color: '#8CBB33',
    },
    {
      skala: 3,
      color: '#CBDE27',
    },
    {
      skala: 4,
      color: '#F3EA1E',
    },
    {
      skala: 5,
      color: '#F3CF16',
    },
    {
      skala: 6,
      color: '#F3B410',
    },
    {
      skala: 7,
      color: '#F39208',
    },
    {
      skala: 8,
      color: '#EE6100',
    },
    {
      skala: 9,
      color: '#E33B00',
    },
    {
      skala: 10,
      color: '#D40B0B',
    },
  ]
  const handleValueChange = (skala) => {
    onQuantityChange && onQuantityChange(skala)
  }
  return (
    <div className="kontainer-skala">
      {skalas.map((skala, key) => (
        <IsiSkala
          key={key}
          skala={skala.skala}
          color={skala.color}
          filled={skala.skala <= quantity}
          onClick={() => handleValueChange(skala.skala)}
        />
      ))}
    </div>
  )
}

const IsiSkala = ({ skala, color, filled, onClick }) => {
  const backgroundStyle = !filled
    ? {}
    : {
        backgroundColor: color,
      }
  return (
    <div
      className="kontainer-isi-skala-nyeri"
      style={backgroundStyle}
      onClick={onClick}
    >
      <p className="teks-skala" style={{ color: 'black' }}>
        {skala}
      </p>
    </div>
  )
}

export default Skala
