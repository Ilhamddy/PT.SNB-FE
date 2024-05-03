import { useEffect, useState } from 'react'
import './Odontogram.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGigi,
  getAllLegendGigi,
} from '../../store/odontogram/odontogramSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Card, Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import ModalOdontogram from './ModalOdontogram'

const Odontogram = () => {
  const dispatch = useDispatch()
  const allGigi = useSelector(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi
  )

  const vKondisiGigi = useFormik({
    initialValues: {
      /**
       * @type {(typeof initKondisiGigi)[]}
       */
      kondisiGigi: [],
    },
    validationSchema: Yup.object({
      kondisiGigi: Yup.array().min(1).of(validationKondisiGigi),
    }),
  })

  const vEditGigi = useFormik({
    initialValues: { ...initKondisiGigi },
    validationSchema: validationKondisiGigi,
  })

  const onClickLokasi = (e, lokasi, idgigi) => {
    vEditGigi.setFieldValue('gigi', idgigi)
    vEditGigi.setFieldValue('lokasi', lokasi)
  }

  useEffect(() => {
    dispatch(getAllGigi())
    dispatch(getAllLegendGigi())
  }, [dispatch])

  const kuadran1 = allGigi.filter((f) => f.label[0] === '1')
  const kuadran2 = allGigi.filter((f) => f.label[0] === '2')

  const kuadran5 = allGigi.filter((f) => f.label[0] === '5')
  const kuadran6 = allGigi.filter((f) => f.label[0] === '6')
  const kuadran7 = allGigi.filter((f) => f.label[0] === '7')
  const kuadran8 = allGigi.filter((f) => f.label[0] === '8')

  const kuadran4 = allGigi.filter((f) => f.label[0] === '4')
  const kuadran3 = allGigi.filter((f) => f.label[0] === '3')

  const mapGigi = (gigi, index) => (
    <Gigi
      key={index}
      chosenLokasi={vEditGigi.values.lokasi}
      chosenGigi={vEditGigi.values.gigi}
      gigi={gigi}
      kondisiGigi={vKondisiGigi.values.kondisiGigi}
      onClickLokasi={onClickLokasi}
    />
  )

  return (
    <div className="page-content page-odontogram">
      <ModalOdontogram vEditGigi={vEditGigi} vKondisiGigi={vKondisiGigi} />
      <Container fluid>
        <BreadCrumb title="Setting Layanan" pageTitle="Master" />
        <div className="kontainer-all-gigi">
          <div className="all-kuadran">
            <div className="isi-kuadran">
              <div className="kuadran-kiri-gigi">{kuadran1.map(mapGigi)}</div>
              <div className="kuadran-kanan-gigi">{kuadran2.map(mapGigi)}</div>
            </div>
            <div className="isi-kuadran margin-kuadran">
              <div className="kuadran-kiri-gigi-bayi">
                {kuadran5.map(mapGigi)}
              </div>
              <div className="kuadran-kanan-gigi-bayi">
                {kuadran6.map(mapGigi)}
              </div>
            </div>
            <div className="isi-kuadran">
              <div className="kuadran-kiri-gigi-bayi">
                {kuadran8.map(mapGigi)}
              </div>
              <div className="kuadran-kanan-gigi-bayi">
                {kuadran7.map(mapGigi)}
              </div>
            </div>
            <div className="isi-kuadran margin-kuadran">
              <div className="kuadran-kiri-gigi">{kuadran4.map(mapGigi)}</div>
              <div className="kuadran-kanan-gigi">{kuadran3.map(mapGigi)}</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export const Gigi = ({
  gigi,
  chosenLokasi,
  chosenGigi,
  onClickLokasi,
  kondisiGigi,
}) => {
  if (!gigi) return <></>
  const kondisiGigiFilter = kondisiGigi.filter((f) => f.label === gigi.label)

  const kondisiFull = kondisiGigi.find((f) => f.isFull)

  return (
    <div className={gigi.isseri ? 'kontainer-gigi-seri' : 'kontainer-gigi'}>
      {!gigi.isseri && (
        <GigiTengah
          gigi={gigi}
          chosenLokasi={chosenLokasi}
          chosenGigi={chosenGigi}
          onClickLokasi={onClickLokasi}
          kondisiGigi={kondisiGigi}
        />
      )}
      <IsiGigi
        lokasi="bawah"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigi}
      />
      <IsiGigi
        lokasi="kanan"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigi}
      />
      <IsiGigi
        lokasi="atas"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigi}
      />
      <IsiGigi
        lokasi="kiri"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigi}
      />
      <div className="nama-gigi">{gigi.label}</div>
    </div>
  )
}

const GigiTengah = ({
  gigi,
  chosenLokasi,
  chosenGigi,
  chosenWarna,
  onClickLokasi,
}) => {
  return (
    <div
      className="gigi-tengah"
      style={{
        backgroundColor: chosenWarna
          ? chosenWarna
          : chosenLokasi === 'tengah' && gigi.value === chosenGigi
          ? '#5ec4de'
          : undefined,
      }}
      onClick={(e) => onClickLokasi(e, 'tengah', gigi.value)}
    ></div>
  )
}

const IsiGigi = ({
  kondisiGigi,
  gigi,
  lokasi,
  chosenLokasi,
  chosenGigi,
  chosenWarna,
  onClickLokasi,
  ...rest
}) => {
  const kondisiGigiFilter = kondisiGigi.filter((f) => f.lokasi === lokasi)
  const kondisiDgnWarna = kondisiGigiFilter.find((f) => f.warnaKondisi !== null)
  return (
    <div
      className={`kontainer-gigi-${lokasi}`}
      onClick={(e) => onClickLokasi(e, lokasi, gigi.value)}
      {...rest}
    >
      <div
        className={`gigi-${lokasi}`}
        style={{
          backgroundColor: kondisiDgnWarna
            ? kondisiDgnWarna.warnaKondisi
            : chosenLokasi === lokasi && gigi.value === chosenGigi
            ? '#5ec4de'
            : undefined,
        }}
      ></div>
    </div>
  )
}

/**
 * @type {{
 *  gigi: string,
 *  lokasi: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | 'gigiutuh' | null
 *  kondisi: any,
 *  tglTambah: Date | null
 * }}
 */
export const initKondisiGigi = {
  gigi: null,
  lokasi: null,
  tglTambah: null,
  isFull: false,
  kondisi: null,
  svgKondisi: null,
  warnaKondisi: null,
}

const validationKondisiGigi = Yup.object().shape(
  {
    gigi: Yup.string().required(),
    lokasi: Yup.string().required(),
    kondisi: Yup.string().required(),
    svgKondisi: Yup.string().when('warnaKondisi', {
      is: (val) => val === null,
      then: () => Yup.string().required('Kondisi harus diisi'),
    }),
    warnaKondisi: Yup.string().when('svgKondisi', {
      is: (val) => val === null,
      then: () => Yup.string().required('Kondisi harus diisi'),
    }),
  },
  ['svgKondisi', 'warnaKondisi']
)

export default Odontogram
