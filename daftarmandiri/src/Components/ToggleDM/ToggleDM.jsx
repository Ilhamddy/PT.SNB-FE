import { useState } from 'react'
import getColorCSS from '../../utils/colors'
import './ToggleDM.scss'

const ToggleDM = ({ chosen, pilihan, onChoose }) => {
  const [chosenInside, setChosenInside] = useState(chosen)
  const stlKontainerBg =
    chosenInside === 0 ? { left: '8px' } : { left: 'calc(50% + 8px)' }
  const stlBtnTerpilih = (link) =>
    chosenInside === link ? { color: getColorCSS('--main-800') } : {}

  const onClick = (nbr) => {
    setChosenInside(nbr)
    onChoose(pilihan[nbr])
  }
  return (
    <div className="kontainer-pilihan-toggle">
      <div className="kontainer-bg" style={stlKontainerBg}></div>
      <button
        onClick={() => onClick(0)}
        className="btn-pilihan"
        style={stlBtnTerpilih(0)}
      >
        {pilihan[0].label}
      </button>
      <button
        onClick={() => onClick(1)}
        className="btn-pilihan"
        style={stlBtnTerpilih(1)}
      >
        {pilihan[1].label}
      </button>
    </div>
  )
}

export default ToggleDM
