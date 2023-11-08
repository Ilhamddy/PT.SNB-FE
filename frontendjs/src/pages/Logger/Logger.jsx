import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLog } from '../../store/logger/action'

const Logger = () => {
  const dispatch = useDispatch()
  const log = useSelector((state) => state.Logger.getLog.data?.lineLog || '')
  useEffect(() => {
    dispatch(getLog())
  }, [dispatch])
  return (
    <div className="page-content page-penerimaan-barang">
      <div>{addLineBreak(log)}</div>
    </div>
  )
}

const addLineBreak = (str) =>
  str.split('\n').map((subStr, index) => {
    return (
      <>
        [{index}] {subStr}
        <br />
      </>
    )
  })

export default Logger
