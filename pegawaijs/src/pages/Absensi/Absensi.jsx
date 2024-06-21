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
import { useSelectorRoot } from '../../store/reducers'

const videoConstraints = {
  facingMode: 'user',
  height: 450,
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
  const { refKontainer, handleToNextPage } = useHandleNextPage()
  const { loading } = useSelectorRoot((state) => ({
    loading: state.absenSlice.upsertAbsenFotoLokasi.loading,
  }))
  const vUpload = useFormik({
    initialValues: {
      lat: null,
      long: null,
      gbr: null,
      isAccessLocation: true,
    },
    onSubmit: async (values, { resetForm }) => {
      const newValues = { ...values }
      let dataImg = new FormData()
      const file = await urltoFile(values.gbr)
      dataImg.append('files', file)
      delete newValues.gbr
      dispatch(
        upsertAbsenFotoLokasi(dataImg, newValues, (value, error) => {
          if (error) {
            resetForm()
          } else {
            handleToNextPage('/dashboard')
          }
        })
      )
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

  const onCapture = async (e) => {
    const imageSrc = webcamRef.current.getScreenshot()
    vUpload.setFieldValue('gbr', imageSrc)
    await getLocation()
    vUpload.handleSubmit()
  }
  useEffect(() => {
    getLocation()
  }, [getLocation])
  return (
    <KontainerPage
      top={400}
      header={
        vUpload.values.gbr ? (
          <img
            src={vUpload.values.gbr}
            alt="gbr-upload"
            width={'100%'}
            height={450}
            style={{
              objectFit: 'cover',
            }}
          />
        ) : (
          <Webcam
            audio={false}
            height={450}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={'100%'}
            videoConstraints={videoConstraints}
            style={{
              objectFit: 'cover',
            }}
          />
        )
      }
      ref={refKontainer}
    >
      <BackKomponen refKontainer={refKontainer} />

      {!vUpload.values.isAccessLocation && <p>Mohon beri akses lokasi</p>}
      {
        <ButtonDM className="w-100" onClick={onCapture} isLoading={loading}>
          Absen Masuk
        </ButtonDM>
      }
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
