import KontainerPage from 'daftarmandiri/src/Components/KontainerPage/KontainerPage'
import './Absensi.scss'
import Webcam from 'react-webcam'
import ButtonDM from 'daftarmandiri/src/Components/ButtonDM/ButtonDM'
import { useRef } from 'react'
import { useFormik } from 'formik'
import BackKomponen from 'daftarmandiri/src/Components/BackKomponen/BackKomponen'
import { useHandleNextPage } from 'daftarmandiri/src/utils/ui'

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}

const Absensi = () => {
  const webcamRef = useRef()
  const { refKontainer } = useHandleNextPage()
  const vUpload = useFormik({
    initialValues: {
      gbr: null,
    },
    onSubmit: (values) => {
      let dataImg = new FormData()
      const file = urltoFile(values.gbr)
      dataImg.append('file', file)
    },
  })
  const onCapture = (e) => {
    const imageSrc = webcamRef.current.getScreenshot()
    vUpload.setFieldValue('gbr', imageSrc)
  }
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
      {!vUpload.values.gbr ? (
        <ButtonDM onClick={onCapture}>Ambil</ButtonDM>
      ) : (
        <div className="d-flex">
          <ButtonDM onClick={vUpload.handleSubmit}>Absen</ButtonDM>
          <ButtonDM onClick={vUpload.resetForm} buttonType="secondary">
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
