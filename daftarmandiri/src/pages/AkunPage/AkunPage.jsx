import { useDispatch } from 'react-redux'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import { logoutUser } from '../../store/actions'
import { useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'

const AkunPage = ({}) => {
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  return (
    <KontainerPage top={'0'} ref={refKontainer} className="akun-page">
      <div className="akun-kontainer">
        <ButtonDM onClick={() => dispatch(logoutUser())}>Keluar</ButtonDM>
      </div>
    </KontainerPage>
  )
}

export default AkunPage
