import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import './JadwalDokter.scss'
import arrowKiriImg from './arrow-kiri.svg'
import arrowKananImg from './arrow-kanan.svg'
import dokterImg from './dokter.png'
import { useEffect, useRef, useState } from 'react'
import { getComboJadwal, getJadwalDokter } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'reactstrap'
import { useFormik } from 'formik'
import ModalSelectDM from '../../Components/ModalSelectDM/ModalSelectDM'
import LoadingDM from '../../Components/LoadingDM/LoadingDM'
import { useNavigate } from 'react-router-dom'
import { BackKomponen } from '../../Components/BackKomponen/BackKomponen'

const JadwalDokter = () => {
  const { dokter, loadingDokter, hariOpt, unitOpt } = useSelector((state) => ({
    dokter: state.Home.getJadwalDokter?.data?.dokter || [],
    loadingDokter: state.Home.getJadwalDokter?.loading || false,
    hariOpt: state.Home.getComboJadwal?.data?.hari || [],
    unitOpt: state.Home.getComboJadwal?.data?.unit || [],
  }))
  const vJadwal = useFormik({
    initialValues: {
      unitid: '',
      unitlabel: 'Semua Poliklinik',
      hariid: '',
      harilabel: 'Semua Hari',
      dokterid: '',
    },
    onSubmit: (values) => {
      dispatch(getJadwalDokter(values))
    },
  })
  const refKontainer = useRef(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getJadwalDokter({
        unitid: undefined,
        hariid: undefined,
        dokterid: undefined,
      })
    )
    dispatch(getComboJadwal())
  }, [dispatch])

  const [showPoli, setShowPoli] = useState(false)
  const [showHari, setShowHari] = useState(false)

  return (
    <KontainerPage top={'0'} ref={refKontainer} className="jadwal-konten">
      <BackKomponen text={'Jadwal Dokter'} refKontainer={refKontainer} />
      <div className="navigasi-poliklinik">
        <div className="poliklinik-terpilih">
          <p className="judul-poliklinik">{vJadwal.values.unitlabel}</p>
        </div>
      </div>
      {loadingDokter && <LoadingDM />}
      {!loadingDokter && (
        <JadwalDokterKomponen
          refKontainer={refKontainer}
          imgDokter={dokterImg}
          dokters={dokter}
        />
      )}
      <ModalSelectDM
        dataName={'Poliklinik'}
        isOpen={showPoli}
        toggle={() => setShowPoli(false)}
        centered={true}
        size="sm"
        option={unitOpt}
        value={vJadwal.values.unitid}
        optionAll={vJadwal.initialValues.unitlabel}
        onSelect={(value) => {
          vJadwal.setFieldValue('unitid', value.value)
          vJadwal.setFieldValue('unitlabel', value.label)
          vJadwal.handleSubmit()
        }}
      />
      <ModalSelectDM
        dataName={'Hari'}
        isOpen={showHari}
        toggle={() => setShowHari(false)}
        centered={true}
        size="sm"
        option={hariOpt}
        value={vJadwal.values.hariid}
        optionAll={vJadwal.initialValues.harilabel}
        onSelect={(value) => {
          vJadwal.setFieldValue('hariid', value.value)
          vJadwal.handleSubmit()
        }}
      />
      <div className="opsi-bottom">
        <p className="opsi" onClick={() => setShowPoli(true)}>
          Poliklinik
        </p>
        <p className="opsi" onClick={() => setShowHari(true)}>
          Hari
        </p>
      </div>
    </KontainerPage>
  )
}

export const JadwalDokterKomponen = ({ imgDokter, dokters, refKontainer }) => {
  const navigate = useNavigate()
  const handleToDokter = (dokter) => {
    refKontainer.current.handleToNextPage(() => {
      navigate(`/dokter/${dokter.dokterid}`)
    })
  }
  return (
    <div className="jadwal-dokter-komponen">
      {dokters.map((dokter, index) => (
        <div
          className="isi-jadwal-dokter"
          key={index}
          onClick={() => handleToDokter(dokter)}
        >
          <div className="dokter-jabar">
            <img src={imgDokter} alt={dokter.doktername} />
            <div className="jabar">
              <p className="nama">{dokter.doktername}</p>
              <p className="poli-spesialisasi">{dokter.spesialisasi}</p>
              <p className="poli-spesialisasi">{dokter.unitdokter}</p>
            </div>
          </div>
          {dokter.values.map((hari, key) => {
            return (
              <div className="isi-jadwal" key={key}>
                <p className="jadwal">{hari.hari}</p>
                <div className="jam-jadwal">
                  {hari.jadwal.map((jadwal, key) => {
                    return (
                      <div className="jam" key={key}>
                        <p>
                          {jadwal.jam_mulai} - {jadwal.jam_selesai}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default JadwalDokter
