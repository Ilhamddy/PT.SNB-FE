import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export const useHandleNextPage = () => {
    const refKontainer = useRef(null)
    const navigate = useNavigate()
    const handleToNextPage = (link) => {
      if (refKontainer.current) {
        refKontainer.current?.handleToNextPage(() => {
          navigate(link)
        })
      } else {
        console.error('refKontainer.current masih null')
      }
    }
    return { refKontainer, handleToNextPage }
  }
  