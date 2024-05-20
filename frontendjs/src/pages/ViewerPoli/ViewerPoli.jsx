import { groupArray, useDate } from '../../utils/format'
import logoSNB from './logo-snb.svg'
import { ToastContainer, toast } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from 'reactstrap'

import './ViewerPoli.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJadwalDokter } from '../../store/viewer/action'
import { Carousel } from 'react-responsive-carousel'
import { useState } from 'react'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'

const ViewerPoli = () => {
  const { tanggal, waktu } = useDate()
  const dispatch = useDispatch()

  const [list, setList] = useState(() =>
    localStorage.getItem('ViewerPreference')
      ? JSON.parse(localStorage.getItem('ViewerPreference'))
      : []
  )
  const [show, setShow] = useState(() => list.length === 0)

  const [intervalVal, setIntervalVal] = useState(null)

  let { jadwalDokter, unit, terpanggil, lastTerpanggil, terpanggilKedua } =
    useSelector((state) => ({
      jadwalDokter: state.Viewer.getJadwalDokter.data.jadwal || [],
      unit: state.Viewer.getJadwalDokter.data.unit || [],
      terpanggil: state.Viewer.getJadwalDokter.data.terpanggil || [],
      lastTerpanggil: state.Viewer.getJadwalDokter.data.lastTerpanggil || [],
      terpanggilKedua: state.Viewer.getJadwalDokter.data.terpanggilKedua || [],
    }))

  const panggilLast = async (dataAll) => {
    if (dataAll?.terpanggil?.antrean?.lastAntrean) {
      try {
        const lastantrean = dataAll?.terpanggil?.antrean?.lastAntrean
        const audioNomorAntrean = new Audio(
          process.env.REACT_APP_MEDIA_URL + '/audio/nomor_antrean.mp3'
        )

        await playAudio(audioNomorAntrean)
        for (let i = 0; i < (lastantrean || []).length; i++) {
          try {
            const huruf = lastantrean[i].toLowerCase()
            const audio = new Audio(
              process.env.REACT_APP_MEDIA_URL + `/audio/${huruf}.mp3`
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
          // bisa dinamis harusnya
          process.env.REACT_APP_MEDIA_URL + '/audio/ruang_perawatan.mp3'
        )
        await playAudio(audioLoket)
        const lastLoket = dataAll?.terpanggil?.namakamar?.toLowerCase()

        // get last char string
        if (lastLoket) {
          let lastText = lastLoket?.split(' ')

          lastText = lastText[lastText.length - 1]

          if (!Number.isNaN(Number(lastText))) {
            if (lastText.length === 1) {
              const char = lastText
              const audioLoketNumber = new Audio(
                process.env.REACT_APP_MEDIA_URL + `/audio/${char}.mp3`
              )
              await playAudio(audioLoketNumber)
            } else {
              let sisa = lastText.length - 1
              for (let i = 0; i < lastText.length; i++) {
                let char = lastText[i]
                let newSisa = sisa
                while (newSisa > 0) {
                  char += '0'
                  newSisa--
                }
                const audioLoketNumber = new Audio(
                  process.env.REACT_APP_MEDIA_URL + `/audio/${char}.mp3`
                )
                await playAudio(audioLoketNumber)
                sisa--
              }
            }
          } else {
            const audioLoketNumber = new Audio(
              process.env.REACT_APP_MEDIA_URL + `/audio/${lastText}.mp3`
            )
            await playAudio(audioLoketNumber)
          }
        }

        toast.success(
          `antrean dengan nomor ${lastantrean} dipanggil di loket ${lastLoket}`
        )
      } catch (error) {
        console.error(error.message)
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    intervalVal && clearTimeout(intervalVal)
    dispatch(
      getJadwalDokter(
        {
          unit: encodeURIComponent(JSON.stringify(list)),
          ispanggil: true,
        },
        panggilLast
      )
    )
    const interval = setInterval(() => {
      dispatch(
        getJadwalDokter(
          {
            unit: encodeURIComponent(JSON.stringify(list)),
            ispanggil: true,
          },
          panggilLast
        )
      )
    }, 11000)
    setIntervalVal(interval)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, list])

  const idLast = terpanggil.idjadwal || lastTerpanggil.idjadwal

  jadwalDokter = groupArray(jadwalDokter, 4)
  const allTerpanggil = Array.isArray(terpanggil)
    ? Array.isArray(lastTerpanggil)
      ? null
      : lastTerpanggil
    : terpanggil

  return (
    <div className="viewer-poli">
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        centered={true}
        size="xl"
      >
        <ModalBody>
          <CustomSelect
            isMulti
            value={list}
            onChange={(val) => {
              setList(val)
              localStorage.setItem('ViewerPreference', JSON.stringify(val))
            }}
            options={unit}
          />
          <Col lg={12} className="mr-3 me-3 mt-2">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <Button
                type="submit"
                color="success"
                style={{ width: '20%' }}
                onClick={() => setShow(!show)}
              >
                Simpan
              </Button>
            </div>
          </Col>
        </ModalBody>
      </Modal>
      <div className="header-viewer">
        <img
          className="gbr-header"
          src={logoSNB}
          alt="gbr snb"
          onClick={() => {
            setShow(!show)
          }}
        />
        <div className="kontainer-waktu">
          <p className="jam-berjalan">{waktu}</p>
          <p className="tgl-berjalan">{tanggal}</p>
        </div>
      </div>
      <div className="kontainer-konten">
        <div className="konten-viewer">
          <Carousel
            autoFocus
            autoPlay
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            interval={7000}
          >
            {jadwalDokter.map((item, key) => (
              <div className="ruang-group" key={key}>
                {item.map((item, key) => (
                  <div className="ruang-available" key={key}>
                    <div className="isi-konten">
                      <p className="nama-poliklinik">{item.namaunit}</p>
                      <p className="nama-dokter">{item.namadokter}</p>
                      <p className="nomor-antrean">
                        {item?.antrean.lastAntrean}
                      </p>
                    </div>
                    <p className="nama-ruang">{item.namakamar}</p>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        <div className="terakhir-panggil">
          <div className="ruang-available">
            <p className="nomor-terpanggil">Antrean Dipanggil</p>
            <div className="isi-konten">
              <p className="nama-poliklinik">
                {allTerpanggil?.namaunit || '-'}
              </p>
              <p className="nama-dokter">{allTerpanggil?.namadokter || '-'}</p>
              <p className="nomor-antrean">
                {allTerpanggil?.antrean?.lastAntrean || '-'}
              </p>
            </div>
            <p className="nama-ruang">{allTerpanggil?.namakamar || '-'}</p>
          </div>
          <div className="ruang-available-sebelumnya">
            <p className="nomor-terpanggil">Panggilan sebelumnya</p>
            <div className="isi-konten">
              <p className="nama-poliklinik">
                {terpanggilKedua?.namaunit || '-'}
              </p>
              <p className="nama-dokter">
                {terpanggilKedua?.namadokter || '-'}
              </p>
              <p className="nomor-antrean">
                {terpanggilKedua?.antrean?.lastAntrean || '-'}
              </p>
            </div>
            <p className="nama-ruang">{terpanggilKedua?.namakamar || '-'}</p>
          </div>
        </div>
      </div>
      <p className="running-text-viewer">
        Teks yang sangat panjang dan super duper panjang kdjfsa Teks yang sangat
        panjang dan super duper panjang kdjfsa
      </p>
    </div>
  )
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

export default ViewerPoli
