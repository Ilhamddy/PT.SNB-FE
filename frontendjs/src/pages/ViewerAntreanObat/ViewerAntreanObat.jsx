import { useEffect, useState } from 'react'
import './ViewerAntreanObat.scss'
import { shallowEqual, useDispatch } from 'react-redux'
import { getAntreanObat } from '../../store/viewer/viewerSlice'
import { TickScroll } from '../ViewerBed/ViewerBed'
import { useSelectorRoot } from '../../store/reducers'
import { useFormik } from 'formik'
import ModalApp from '../../Components/Common/ModalApp'
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
import { useKedip } from '../../utils/ui'

const ViewerAntreanObat = () => {
  const dispatch = useDispatch()
  const vVoice = useFormik({
    initialValues: {
      show: false,
      voiceURI: '',
    },
    onSubmit: (values, { setFieldValue }) => {
      localStorage.setItem('ViewerPreference', JSON.stringify(values.list))
      localStorage.setItem('ViewerVoices', values.voiceURI)
      setFieldValue('show', false)
    },
  })
  const { antrean, antreanObatDiserahkan, lastTerpanggil } = useSelectorRoot(
    (state) => ({
      antrean: state.viewerSlice.getAntreanObat.data.antreanObat,
      antreanObatDiserahkan:
        state.viewerSlice.getAntreanObat.data.antreanObatDiserahkan,
      lastTerpanggil: state.viewerSlice.getAntreanObat.data.lastTerpanggil,
    }),
    shallowEqual
  )

  const listVoice = useListVoice()

  useEffect(() => {
    const setFF = vVoice.setFieldValue
    const voice = localStorage.getItem('ViewerVoices')
      ? localStorage.getItem('ViewerVoices')
      : null
    setFF('voiceURI', voice)
  }, [vVoice.setFieldValue])

  useEffect(() => {
    let interval = setInterval(() => {
      dispatch(getAntreanObat())
    }, 10000)
    dispatch(getAntreanObat())
    return () => {
      clearInterval(interval)
    }
  }, [dispatch])

  useEffect(() => {
    const play = async () => {
      if (lastTerpanggil && lastTerpanggil.isdipanggil) {
        await playAudioSynt(
          lastTerpanggil.namapasien + ', Silahkan mengambil obat di loket'
        )
      }
    }
    play()
  }, [lastTerpanggil])

  const isKedip = useKedip()
  const isActive = isKedip && !!lastTerpanggil?.isdipanggil

  return (
    <div className="viewer-antrean-obat">
      <ModalApp isOpen={!vVoice.values.voiceURI}>
        <CustomSelect
          options={listVoice}
          onChange={(val) => {
            vVoice.setFieldValue('voiceURI', val.value)
          }}
          value={vVoice.values.voiceURI}
        />
      </ModalApp>
      <div className="header-antrean">Healthtechs</div>
      <div className="isi-antrean">
        <div className="antrean-tabel">
          <p className="judul-antrean"></p>
          <div className="tabel">
            <div className="tabel-head">
              <div className="isi-data data-head" style={{ width: '15%' }}>
                Jenis
              </div>
              <div className="isi-data data-head" style={{ width: '15%' }}>
                No RMMM
              </div>
              <div className="isi-data data-head" style={{ width: '20%' }}>
                Nama Pasien
              </div>
              <div className="isi-data data-head" style={{ width: '15%' }}>
                No Registrasi
              </div>
              <div className="isi-data data-head" style={{ width: '20%' }}>
                Poliklinik
              </div>
              <div className="isi-data data-head" style={{ width: '15%' }}>
                Status
              </div>
            </div>
            <TickScroll
              className={'kontainer-tabel'}
              dataApi={antrean}
              dataid="norecorder"
              height="calc(100% - (100% / 11))"
              dataPerPage={10}
              warnaBgGenap="rgb(211, 211, 211)"
              timeTransition={2500}
              isiTabel={(data) => (
                <div className="tabel-body">
                  <div className="isi-data" style={{ width: '15%' }}></div>
                  <div className="isi-data" style={{ width: '15%' }}>
                    {data.nocm}
                  </div>
                  <div className="isi-data" style={{ width: '20%' }}>
                    {data.namapasien}
                  </div>
                  <div className="isi-data" style={{ width: '15%' }}>
                    {data.noregistrasi}
                  </div>
                  <div className="isi-data" style={{ width: '20%' }}>
                    {data.namaunit}
                  </div>
                  <div className="isi-data" style={{ width: '15%' }}>
                    {data.statusfarmasi}
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div className="antrean-action">
          <div className={`antrean-panggil ${isActive ? 'active' : ''}`}>
            <p className="judul-dipanggil">Antrean Dipanggil</p>
            <p className="norm">{lastTerpanggil?.nocm}</p>
            <p className="noreg">{lastTerpanggil?.noregistrasi}</p>
            <p className="nama-pasien">{lastTerpanggil?.namapasien}</p>
          </div>
          <div className="antrean-selesai">
            <p className="judul-tabel">Antrean Selesai</p>
            <div className="tabel">
              <div className="tabel-head">
                <div className="isi-data data-head" style={{ width: '33%' }}>
                  Jenis
                </div>
                <div className="isi-data data-head" style={{ width: '33%' }}>
                  No RM
                </div>
                <div className="isi-data data-head" style={{ width: '34%' }}>
                  Nama Pasien
                </div>
              </div>
              <TickScroll
                className={'kontainer-tabel'}
                dataApi={antreanObatDiserahkan}
                dataid="norecorder"
                height="calc(100% - (100% / 5))"
                dataPerPage={5}
                warnaBgGenap="rgb(211, 211, 211)"
                timeTransition={2500}
                isiTabel={(data) => (
                  <div className="tabel-body">
                    <div className="isi-data" style={{ width: '33%' }}>
                      {data.statusfarmasi}
                    </div>
                    <div className="isi-data" style={{ width: '33%' }}>
                      {data.nocm}
                    </div>
                    <div className="isi-data" style={{ width: '34%' }}>
                      {data.namapasien}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useListVoice = () => {
  const [listOptionVoice, setListOptionVoice] = useState([])

  useEffect(() => {
    const fetchVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices()
      availableVoices = availableVoices
        .filter((voice) => voice.lang === 'id-ID')
        .map((voice) => ({ label: voice.name, value: voice.voiceURI }))
      setListOptionVoice(availableVoices)
    }

    window.speechSynthesis.onvoiceschanged = fetchVoices
  }, [])

  return listOptionVoice
}

async function playAudioSynt(word, voiceURI) {
  const synth = window.speechSynthesis
  let availableVoices = window.speechSynthesis.getVoices()
  const voice = availableVoices.find((voice) => voice.voiceURI === voiceURI)
  const utterThis = new SpeechSynthesisUtterance(word)
  utterThis.voice = voice
  synth.speak(utterThis)
  return new Promise((res, rej) => {
    utterThis.onend = res
    utterThis.onpause = res
    utterThis.onerror = rej
  })
}

export default ViewerAntreanObat
