import { useNavigate } from 'react-router-dom'
import arrowKiriImg from './arrow_left.svg'
import './BackKomponen.scss'

export const BackKomponen = ({ text, refKontainer, toHome }) => {
  const navigate = useNavigate()
  const handleBack = () => {
    if (!refKontainer.current) return navigate(-1)
    if (toHome) {
      refKontainer.current.handleToNextPage(() => {
        navigate('/')
      })
    } else {
      refKontainer.current.handleToNextPage(() => {
        navigate(-1)
      })
    }
  }
  return (
    <div className="back-komponen-dm">
      <button
        className="tbl-back"
        onClick={() => {
          handleBack()
        }}
      >
        <img src={arrowKiriImg} alt="tbl-back" />
      </button>
      <p className="teks-back">{text}</p>
    </div>
  )
}

export default BackKomponen
