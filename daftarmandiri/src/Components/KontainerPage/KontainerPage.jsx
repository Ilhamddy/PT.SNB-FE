import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './KontainerPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { onChangePage } from '../../store/actions'

const KontainerPage = forwardRef(
  ({ children, header, top, className }, ref) => {
    const lastTop = useSelector((state) => state.DOM.kontainerPage.lastTop)
    const [stlHeader, setStlHeader] = useState(() => ({
      height: lastTop,
      opacity: 0,
    }))
    const rgxRelative = /px|vh|vw|em|rem|%/gi
    const heightTxt = rgxRelative.test(lastTop) ? lastTop : `${lastTop}px`
    const heightLiteral = `calc(100vh - ${heightTxt})`
    const [stlBody, setStlBody] = useState(() => ({
      top: lastTop,
      minHeight: `calc(100vh)`,
    }))
    const [stlBodyKonten, setStlBodyKonten] = useState({ opacity: 0 })

    const dispatch = useDispatch()
    const handleToNextPage = (callback) => {
      setStlHeader({ ...stlHeader, opacity: 0 })
      setStlBodyKonten({ opacity: 0 })
      setTimeout(() => {
        callback && callback()
      }, 600)
    }
    useEffect(() => {
      setTimeout(() => {
        const rgxRelative = /px|vh|vw|em|rem|%/gi
        const heightTxtTop = rgxRelative.test(top) ? top : `${top}px`
        const heightLiteralTop = `calc(100vh - ${heightTxtTop})`
        setStlHeader({ height: top, opacity: 1 })
        setStlBody({ top: top, minHeight: '100vh' })
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
      <div className={`kontainer-page ${className}`}>
        <div className="kontainer-page-header" style={stlHeader}>
          {header || ''}
        </div>
        <div className="kontainer-page-konten" style={stlBody}>
          <div className="konten" style={stlBodyKonten}>
            {children}
          </div>
        </div>
      </div>
    )
  }
)

export default KontainerPage
