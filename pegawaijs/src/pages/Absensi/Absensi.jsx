import KontainerPage from 'daftarmandiri/src/Components/KontainerPage/KontainerPage'
import './Absensi.scss'
import Webcam from 'react-webcam'
import ButtonDM from 'daftarmandiri/src/Components/ButtonDM/ButtonDM'
import { useRef } from 'react'
import { useFormik } from 'formik'
import BackKomponen from 'daftarmandiri/src/Components/BackKomponen/BackKomponen'
import { useHandleNextPage } from 'daftarmandiri/src/utils/ui'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { upsertAbsenFotoLokasi } from '../../store/absen/absenSlice'
import { useDispatch } from 'react-redux'

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}

const getLocationPromisify = () =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        res({ lat, long })
      },
      (error) => {
        rej(error)
      }
    )
  })

const Absensi = () => {
  const dispatch = useDispatch()
  const webcamRef = useRef()
  const { refKontainer } = useHandleNextPage()
  const vUpload = useFormik({
    initialValues: {
      lat: null,
      long: null,
      gbr: null,
      isAccessLocation: true,
    },
    onSubmit: async (values) => {
      const newValues = { ...values }
      let dataImg = new FormData()
      const file = await urltoFile(values.gbr)
      dataImg.append('files', file)
      delete newValues.gbr
      dispatch(upsertAbsenFotoLokasi(dataImg, newValues))
    },
  })
  const getLocation = useCallback(async () => {
    const setFF = vUpload.setFieldValue
    try {
      const { lat, long } = getLocationPromisify()
      setFF('lat', lat)
      setFF('long', long)
      setFF('isAccessLocation', true)
    } catch (e) {
      if (e.code === 1) {
        setFF('isAccessLocation', false)
      }
    }
  }, [vUpload.setFieldValue])

  const onCapture = (e) => {
    const imageSrc = webcamRef.current.getScreenshot()
    vUpload.setFieldValue('gbr', imageSrc)
    getLocation()
  }
  useEffect(() => {
    getLocation()
  }, [getLocation])
  return (
    <KontainerPage top={0}>
      <BackKomponen refKontainer={refKontainer} />
      {vUpload.values.gbr ? (
        <img src={vUpload.values.gbr} alt="gbr-upload" />
      ) : (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          videoConstraints={videoConstraints}
        />
      )}
      {!vUpload.values.isAccessLocation && <p>Mohon beri akses lokasi</p>}
      {!vUpload.values.gbr ? (
        <ButtonDM onClick={onCapture}>Ambil</ButtonDM>
      ) : (
        <div className="d-flex">
          <ButtonDM onClick={vUpload.handleSubmit}>Absen</ButtonDM>
          <ButtonDM
            onClick={(e) => {
              vUpload.resetForm(e)
              getLocation()
            }}
            buttonType="secondary"
          >
            Ulangi
          </ButtonDM>
        </div>
      )}
    </KontainerPage>
  )
}

async function urltoFile(url, filename, mimeType) {
  if (url.startsWith('data:')) {
    var arr = url.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var file = new File([u8arr], filename, { type: mime || mimeType })
    return Promise.resolve(file)
  }
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  return new File([buf], filename, { type: mimeType })
}

export default Absensi
