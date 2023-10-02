import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './KontainerPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { onChangePage } from '../../store/actions'

const KontainerPage = forwardRef(({ children, header, top }, ref) => {
  const lastTop = useSelector((state) => state.DOM.kontainerPage.lastTop)
  const [stlHeader, setStlHeader] = useState(() => ({
    height: lastTop,
    opacity: 0,
  }))
  const [stlBody, setStlBody] = useState(() => ({ top: lastTop }))
  const [stlBodyKonten, setStlBodyKonten] = useState({ opacity: 0 })

  const dispatch = useDispatch()
  const handleToNextPage = (callback) => {
    setStlHeader({ ...stlHeader, opacity: 0 })
    setStlBodyKonten({ opacity: 0 })
    setTimeout(() => {
      callback && callback()
    }, 500)
  }
  useEffect(() => {
    setTimeout(() => {
      setStlHeader({ height: top, opacity: 1 })
      setStlBody({ top: top })
      setStlBodyKonten({ opacity: 1 })
    })
  }, [top])

  useEffect(() => {
    return () => {
      dispatch(onChangePage(top))
    }
  }, [top, dispatch])
  useImperativeHandle(ref, () => ({
    handleToNextPage,
  }))
  return (
    <div className="kontainer-page">
      <div className="kontainer-page-header" style={stlHeader}>
        {header}
      </div>
      <div className="kontainer-page-konten" style={stlBody}>
        <div className="konten" style={stlBodyKonten}>
          {children}
        </div>
      </div>
    </div>
  )
})

export default KontainerPage
