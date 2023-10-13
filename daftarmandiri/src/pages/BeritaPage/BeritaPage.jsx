import { useEffect, useRef } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import { getBeritaQuery } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './BeritaPage.scss'
import { dateTimeLocal } from '../../utils/format'
import BackKomponen from '../../Components/BackKomponen/BackKomponen'

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
      <BackKomponen text={'Berita'} refKontainer={refKontainer} />
      <h2>{berita?.judul}</h2>
      <img
        className="gbr-headline"
        src={`${process.env.REACT_APP_MEDIA_UPLOAD_URL}/${berita?.gambar}`}
        alt={berita?.judul}
      />
      <p>{dateTimeLocal(berita?.tglposting)}</p>
      <div
        className="konten-berita"
        dangerouslySetInnerHTML={{ __html: berita?.isi || '' }}
      ></div>
    </KontainerPage>
  )
}

export default BeritaPage
