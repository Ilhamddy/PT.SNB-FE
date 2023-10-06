import { useEffect } from 'react'
import { useDate } from '../../utils/format'
import './Viewer.scss'
import logoSNB from './logo-snb.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLoket } from '../../store/actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const Viewer = () => {
  const dispatch = useDispatch()
  const { loket, lastLoket, lastAntrean } = useSelector((state) => ({
    loket: state.Viewer.getAllLoket?.data?.loket || [],
    lastLoket: state.Viewer.getAllLoket?.data?.lastloket,
    lastAntrean: state.Viewer.getAllLoket?.data?.lastantrean,
  }))
  const { tanggal, waktu } = useDate()
  const panggilLast = async (dataAll) => {
    console.log(dataAll)

    if (dataAll?.status === 2) {
      try {
        console.log(dataAll)
        const lastantrean = dataAll?.lastantrean
        const audioNomorAntrean = new Audio(
          process.env.REACT_APP_MEDIA_URL + '/audio/nomor_antrean.mp3'
        )

        await playAudio(audioNomorAntrean)
        for (let i = 0; i < (lastantrean || []).length; i++) {
          try {
            const audio = new Audio(
              process.env.REACT_APP_MEDIA_URL +
                `/audio/${lastantrean[i].toLowerCase()}.mp3`
            )
            await playAudio(audio)
          } catch (err) {
            console.error(err)
          }
        }
        const audioSilakanMenuju = new Audio(
          process.env.REACT_APP_MEDIA_URL + '/audio/silakan_menuju.mp3'
        )
        await playAudio(audioSilakanMenuju)
        const audioLoket = new Audio(
          process.env.REACT_APP_MEDIA_URL + '/audio/loket.mp3'
        )
        await playAudio(audioLoket)

        // get last char string
        const lastLoket = dataAll?.lastloket
        if (lastLoket) {
          const lastChar = lastLoket?.[lastLoket?.length - 1]
          const audioLoketNumber = new Audio(
            process.env.REACT_APP_MEDIA_URL + `/audio/${lastChar}.mp3`
          )
          await playAudio(audioLoketNumber)
        }

        toast.success(
          `antrean dengan nomor ${lastantrean} dipanggil di loket ${dataAll?.lastloket}`
        )
      } catch (error) {
        console.error(error.message)
        toast.error(error.message)
      }
    }
  }
  useEffect(() => {
    dispatch(getAllLoket(panggilLast))
    const interval = setInterval(() => {
      dispatch(getAllLoket(panggilLast))
    }, 5000)
    return () => clearInterval(interval)
  }, [dispatch])

  const groupLoket = groupArray(loket, 4)

  return (
    <div className="viewer-aplikasi">
      <ToastContainer />
      <div className="header-viewer">
        <img className="gbr-header" src={logoSNB} alt="gbr snb" />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="konten-viewer">
        <div className="antrean-aktif-video">
          <div className="antrean-aktif">
            <p className="judul">Antrean Dipanggil</p>
            <p className="nomor">{lastAntrean}</p>
            <p className="loket">{lastLoket}</p>
          </div>
          <div className="kontainer-video"></div>
        </div>
        <Carousel
          autoFocus
          selectedItem={0}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          showArrows={true}
          interval={6000}
        >
          {groupLoket.map((group, i) => {
            return (
              <div className="loket-group" key={i}>
                {group.map((item, index) => (
                  <LoketAvailable
                    key={index}
                    loketNumber={item.label}
                    isi={item.lastAntrean}
                  />
                ))}
              </div>
            )
          })}
        </Carousel>
      </div>
      <p className="running-text-viewer">
        Teks yang sangat panjang dan super duper panjang kdjfsa Teks yang sangat
        panjang dan super duper panjang kdjfsa
      </p>
    </div>
  )
}

function groupArray(array, size) {
  // Create an empty array to store the result
  let result = []
  // Loop through the array with a step of size
  for (let i = 0; i < array.length; i += size) {
    // Slice a subarray from the original array and push it to the result
    let subarray = array.slice(i, i + size)
    result.push(subarray)
  }
  // Return the result
  return result
}

async function playAudio(audio) {
  try {
    await audio.play()
  } catch (err) {
    console.log(err)
    throw err
  }
  return new Promise((res, rej) => {
    audio.onended = res
    audio.onerror = rej
  })
}

const LoketAvailable = ({ loketNumber, isi }) => {
  return (
    <div className="loket-available">
      <p className="number">{loketNumber}</p>
      <p className="isi">{isi || '-'}</p>
    </div>
  )
}

export default Viewer
