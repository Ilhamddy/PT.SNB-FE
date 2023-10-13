import { useEffect, useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { getBeritaQuery } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './BeritaPage.scss'

const BeritaPage = () => {
  const refKontainer = useRef(null)
  const { norecberita } = useParams()
  const dispatch = useDispatch()
  const { berita } = useSelector((state) => ({
    berita: state.Home.getBeritaQuery?.data?.berita,
  }))
  useEffect(() => {
    dispatch(getBeritaQuery({ norec: norecberita }))
  }, [])
  return (
    <KontainerPage top={0} ref={refKontainer} className="berita-page">
      <h1>{berita?.judul}</h1>
      <img
        className="gbr-headline"
        src={`${process.env.REACT_APP_MEDIA_UPLOAD_URL}/${berita?.gambar}`}
        alt={berita?.judul}
      />
      <div
        className="konten"
        dangerouslySetInnerHTML={{ __html: berita?.isi || '' }}
      ></div>
    </KontainerPage>
  )
}

export default BeritaPage
