import { useNavigate } from 'react-router-dom'
import arrowKiriImg from './arrow_left.svg'

export const BackKomponen = ({ text, refKontainer }) => {
  const navigate = useNavigate()
  const handleBack = () => {
    if (!refKontainer.current) return navigate(-1)
    refKontainer.current.handleToNextPage(() => {
      navigate(-1)
    })
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
      <p>{text}</p>
    </div>
  )
}

export default BackKomponen
