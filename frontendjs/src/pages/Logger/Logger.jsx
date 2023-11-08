import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLog } from '../../store/logger/action'
import React from 'react'
import { Button } from 'reactstrap'

const Logger = () => {
  const dispatch = useDispatch()
  const log = useSelector((state) => state.Logger.getLog.data?.lineLog || '')
  useEffect(() => {
    dispatch(getLog())
  }, [dispatch])
  return (
    <div className="page-content page-penerimaan-barang">
      <Button onClick={() => dispatch(getLog())}>Refresh</Button>
      <div>{addLineBreak(log)}</div>
      Selesai
    </div>
  )
}

const addLineBreak = (str) =>
  str.split('\n').map((subStr, index) => {
    return (
      <React.Fragment key={index}>
        [{index}] {subStr}
        <br />
      </React.Fragment>
    )
  })

export default Logger
