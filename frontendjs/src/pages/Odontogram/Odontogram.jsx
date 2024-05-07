import { useEffect, useRef, createRef } from 'react'
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
import LeaderLine from 'leader-line-new'

const Odontogram = () => {
  const dispatch = useDispatch()
  let allGigi = useSelector(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi
  )
  const refTes = useRef(null)
  const refTes2 = useRef(null)

  const refKontainerGigi = useRef(allGigi.map(() => createRef()))
  const refGigiAtas = useRef(allGigi.map(() => createRef()))
  const refTeksAtas = useRef(allGigi.map(() => createRef()))

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
    onSubmit: (values, { resetForm }) => {
      let newKondisiGigi = [...vKondisiGigi.values.kondisiGigi]
      const isUtuh = values.lokasi === varGUtuh
      const isWarna = values.warnaKondisi !== null
      if (isUtuh) {
        // kalau utuh, hapus utuh lainnya, kalo bisa ditumpuk jangan hapus
        newKondisiGigi = newKondisiGigi.filter((kondisi) => {
          const allBisaTumpuk = kondisi.isTumpuk && values.isTumpuk
          return (
            kondisi.gigi !== values.gigi ||
            kondisi.lokasi !== varGUtuh ||
            allBisaTumpuk
          )
        })
      }

      if (isUtuh && isWarna) {
        // kalau memasukkan yang 'warna utuh', filter 'warna sebagian' lainnya
        newKondisiGigi = newKondisiGigi.filter(
          (kondisi) =>
            kondisi.gigi !== values.gigi || kondisi.warnaKondisi === null
        )
      } else if (isWarna) {
        // kalau memasukkan yang 'warna sebagian', filter 'seluruh warna'
        newKondisiGigi = newKondisiGigi.filter(
          (kondisi) =>
            kondisi.gigi !== values.gigi ||
            kondisi.lokasi !== varGUtuh ||
            (kondisi.lokasi === varGUtuh && kondisi.warnaKondisi === null)
        )
      }
      const indexUtuh = newKondisiGigi.findIndex(
        (kondisi) =>
          kondisi.gigi === values.gigi &&
          kondisi.lokasi === values.lokasi &&
          kondisi.kondisi === values.kondisi &&
          isUtuh
      )
      const indexEdit = newKondisiGigi.findIndex(
        (kondisi) =>
          kondisi.gigi === values.gigi && kondisi.lokasi === values.lokasi
      )

      if (indexUtuh >= 0) {
        newKondisiGigi[indexUtuh] = { ...values }
      } else if (indexEdit >= 0 && !isUtuh) {
        newKondisiGigi[indexEdit] = { ...values }
      } else {
        newKondisiGigi = [...newKondisiGigi, { ...values }]
      }
      vKondisiGigi.setFieldValue('kondisiGigi', newKondisiGigi)
      resetForm()
    },
  })

  const onClickLokasi = (e, lokasi, idgigi) => {
    vEditGigi.setFieldValue('gigi', idgigi)
    vEditGigi.setFieldValue('lokasi', lokasi)
    vEditGigi.setFieldValue('lokasitemp', lokasi)
  }

  useEffect(() => {
    dispatch(getAllGigi())
    dispatch(getAllLegendGigi())
  }, [dispatch])

  useEffect(() => {
    refKontainerGigi.current = allGigi.map(() => createRef(null))
    refGigiAtas.current = allGigi.map(() => createRef(null))
  }, [allGigi])

  const kuadran1 = allGigi.filter((f) => f.label[0] === '1')
  const kuadran2 = allGigi.filter((f) => f.label[0] === '2')

  const kuadran5 = allGigi.filter((f) => f.label[0] === '5')
  const kuadran6 = allGigi.filter((f) => f.label[0] === '6')
  const kuadran7 = allGigi.filter((f) => f.label[0] === '7')
  const kuadran8 = allGigi.filter((f) => f.label[0] === '8')

  const kuadran4 = allGigi.filter((f) => f.label[0] === '4')
  const kuadran3 = allGigi.filter((f) => f.label[0] === '3')

  const mapGigi = (gigi) => (
    <Gigi
      refKontainerAtas={refKontainerGigi.current[gigi.indexkondisi]}
      refGigiAtas={refGigiAtas.current[gigi.indexkondisi]}
      key={gigi.indexkondisi}
      chosenLokasi={vEditGigi.values.lokasi}
      chosenGigi={vEditGigi.values.gigi}
      gigi={gigi}
      kondisiGigi={vKondisiGigi.values.kondisiGigi}
      onClickLokasi={onClickLokasi}
    />
  )

  return (
    <div className="page-content page-odontogram">
      <ModalOdontogram
        vEditGigi={vEditGigi}
        vKondisiGigi={vKondisiGigi}
        refGigiAtas={refGigiAtas}
        refKontainerGigi={refKontainerGigi}
      />
      <Container fluid>
        <BreadCrumb title="Setting Layanan" pageTitle="Master" />
        <div ref={refTes}>Tes</div>
        <div className="mt-5" ref={refTes2}>
          Tes2
        </div>
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
  refGigiAtas,
  refKontainerAtas,
}) => {
  if (!gigi) return <></>
  const kondisiGigiFilter = kondisiGigi.filter(
    (f) => f.gigi === gigi.value || f.gigiTujuan === gigi.value
  )

  const kondisiFull = kondisiGigiFilter.filter((f) => f.isFull)
  const kondisiDgnSVGs = kondisiFull.filter((f) => f.svgKondisi !== null)
  const kondisiDgnTeks = kondisiFull.find((f) => f.teksKondisi !== null)

  return (
    <div
      className={gigi.isseri ? 'kontainer-gigi-seri' : 'kontainer-gigi'}
      ref={refKontainerAtas}
    >
      {!gigi.isseri && (
        <GigiTengah
          gigi={gigi}
          chosenLokasi={chosenLokasi}
          chosenGigi={chosenGigi}
          onClickLokasi={onClickLokasi}
          kondisiGigi={kondisiGigiFilter}
        />
      )}
      <IsiGigi
        lokasi="bawah"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigiFilter}
      />
      <IsiGigi
        lokasi="kanan"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigiFilter}
      />
      <IsiGigi
        lokasi="atas"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigiFilter}
        refGigiAtas={refGigiAtas}
      />
      <IsiGigi
        lokasi="kiri"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={kondisiGigiFilter}
      />
      {kondisiDgnSVGs.map((kondisiDgnSVG, index) =>
        kondisiDgnSVG?.svgKondisi ? (
          <img
            key={index}
            className={`gbr-kondisi`}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              kondisiDgnSVG?.svgKondisi
            )}`}
            alt=""
          />
        ) : (
          <></>
        )
      )}
      {kondisiDgnTeks && (
        <p className="teks-kondisi">{kondisiDgnTeks.teksKondisi}</p>
      )}
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
  kondisiGigi,
}) => {
  const kondisiGigiFilter = kondisiGigi.filter(
    (f) => f.lokasi === 'tengah' || f.lokasi === varGUtuh
  )
  const kondisiDgnWarna = kondisiGigiFilter.find((f) => f.warnaKondisi !== null)
  const isChosen =
    (chosenLokasi === 'tengah' || chosenLokasi === varGUtuh) &&
    gigi.value === chosenGigi
  return (
    <div
      className="gigi-tengah"
      style={{
        backgroundColor: kondisiDgnWarna
          ? kondisiDgnWarna.warnaKondisi
          : isChosen
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
  refGigiAtas,
  ...rest
}) => {
  const kondisiGigiFilter = kondisiGigi.filter(
    (f) => f.lokasi === lokasi || f.lokasi === varGUtuh
  )
  const kondisiDgnWarna = kondisiGigiFilter.find((f) => f.warnaKondisi !== null)
  let isChosen =
    (chosenLokasi === lokasi || chosenLokasi === varGUtuh) &&
    gigi.value === chosenGigi
  return (
    <>
      <div
        className={`kontainer-gigi-${lokasi}`}
        onClick={(e) => onClickLokasi(e, lokasi, gigi.value)}
        ref={refGigiAtas}
        {...rest}
      >
        <div
          className={`gigi-${lokasi}`}
          style={{
            backgroundColor: kondisiDgnWarna
              ? kondisiDgnWarna.warnaKondisi
              : isChosen
              ? '#5ec4de'
              : undefined,
          }}
        ></div>
      </div>
    </>
  )
}

/**
 * @type {{
 *  gigi: string,
 *  gigiTujuan: string,
 *  indexGigi: number | null,
 *  indexGigiTujuan: number | null,
 *  line: LeaderLine | null,
 *  isJembatan: boolean,
 *  lokasi: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | 'gigiutuh' | null,
 *  lokasitemp: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | null,
 *  isFull: boolean,
 *  tglTambah: Date | null
 *  kondisi: any,
 *  svgKondisi: string | null,
 *  warnaKondisi: string | null,
 *  isTumpuk: boolean
 * }}
 */
export const initKondisiGigi = {
  gigi: null,
  gigiTujuan: null,
  indexGigi: null,
  indexGigiTujuan: null,
  line: null,
  isJembatan: false,
  lokasi: null,
  lokasitemp: null,
  tglTambah: null,
  isFull: false,
  kondisi: null,
  svgKondisi: null,
  warnaKondisi: null,
  teksKondisi: null,
  isTumpuk: false,
}

export const varGUtuh = 'gigiutuh'

const validationKondisiGigi = Yup.object().shape(
  {
    gigi: Yup.string().required(),
    gigiTujuan: Yup.string().when('isJembatan', {
      is: (isJembatan) => isJembatan,
      then: () => Yup.string().required('Gigi tujuan jembatan harus diisi'),
    }),
    indexGigi: Yup.number().required(),
    indexGigiTujuan: Yup.number().when('isJembatan', {
      is: (isJembatan) => isJembatan,
      then: () => Yup.number().required(),
    }),
    isJembatan: Yup.boolean(),
    lokasi: Yup.string().required(),
    kondisi: Yup.string().required(),

    svgKondisi: Yup.string()
      .nullable()
      .when(['warnaKondisi', 'teksKondisi', 'isJembatan'], {
        is: (warna, teks, isJembatan) =>
          warna === null && teks === null && !isJembatan,
        then: () => Yup.string().required('Kondisi harus diisi'),
      }),
    warnaKondisi: Yup.string()
      .nullable()
      .when(['svgKondisi', 'teksKondisi', 'isJembatan'], {
        is: (svg, teks, isJembatan) =>
          svg === null && teks === null && !isJembatan,
        then: () => Yup.string().required('Kondisi harus diisi'),
      }),
    teksKondisi: Yup.string()
      .nullable()
      .when(['svgKondisi', 'warnaKondisi', 'isJembatan'], {
        is: (svg, warna, isJembatan) =>
          svg === null && warna === null && !isJembatan,
        then: () => Yup.string().required('Kondisi harus diisi'),
      }),
  },
  [
    ['svgKondisi', 'warnaKondisi'],
    ['svgKondisi', 'teksKondisi'],
    ['warnaKondisi', 'teksKondisi'],
  ]
)

export default Odontogram
