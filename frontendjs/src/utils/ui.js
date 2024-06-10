import { useEffect, useState } from "react"



export const useKedip = (time = 1000) => {
    const [isKedip, setIsKedip] = useState(false)
    useEffect(() => {
      const interval = setInterval(() => {
        setIsKedip((i) => !i)
      }, time)
      return () => {
        clearInterval(interval)
      }
    }, [time])
    return isKedip
}
  