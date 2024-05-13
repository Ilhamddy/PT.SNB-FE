import { useEffect, useRef, createRef, useState } from 'react'
import './Odontogram.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGigi,
  getAllLegendGigi,
  getComboOdontogram,
  getOdontogram,
  upsertOdontogram,
} from '../../store/odontogram/odontogramSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Card, Col, Container, FormFeedback, Input, Row } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import ModalOdontogram from './ModalOdontogram'
import LeaderLine from 'leader-line-new'
import gigiAPI from 'sharedjs/src/gigi/gigiAPI'
import { initKondisiGigi } from 'sharedjs/src/gigi/gigiData'
import { useParams, useSearchParams } from 'react-router-dom'
import BtnSpinner from '../../Components/Common/BtnSpinner'
import { dateTimeLocal, onChangeStrNbr } from '../../utils/format'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import ColLabelInput2 from '../../Components/ColLabelInput2/ColLabelInput2'
import CustomSelect from '../Select/Select'
import LoadingLaman from '../../Components/Common/LoadingLaman'

const Odontogram = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { norecap, norecdp } = useParams()

  let allGigi = useSelector(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi
  )
  let dataGetOdontogram = useSelector(
    (state) => state.odontogramSlice.getOdontogram.data
  )
  const comboOdontogram = useSelector(
    (state) => state.odontogramSlice.getComboOdontogram.data
  )
  const loadingGet = useSelector(
    (state) => state.odontogramSlice.getAllGigi.loading
  )
  const loadingSave = useSelector(
    (state) => state.odontogramSlice.upsertOdontogram.loading
  )
  const refKontainerGigi = useRef(allGigi.map(() => createRef()))
  const [refGigiAtas, setRefGigiAtas] = useState(allGigi.map(() => createRef()))
  const refTeksAtas = useRef(allGigi.map(() => createRef()))

  const vKondisiGigi = useFormik({
    initialValues: { ...gigiAPI.bUpsertOdontogramDetail },
    validationSchema: Yup.object({
      norecodontogram: Yup.string().nullable().required('norecap diperlukan'),
      norecap: Yup.string().nullable().required('norecap diperlukan'),
      //occlusi dll sementara gak wajib
      kondisiGigi: Yup.array().min(1).of(validationKondisiGigi),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertOdontogram(values, () => {
          dispatch(getOdontogram({ norecdp: norecdp }))
        })
      )
    },
  })
  const latestKondisiGigi = useRef(vKondisiGigi.values.kondisiGigi)

  const vEditGigi = useFormik({
    initialValues: { ...initKondisiGigi },
    validationSchema: validationKondisiGigi,
    onSubmit: (values, { resetForm }) => {
      let newKondisiGigi = filterKondisi(
        vKondisiGigi.values.kondisiGigi,
        values
      )
      const isUtuh = values.lokasi === varGUtuh

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
    const kondisiFind = vKondisiGigi.values.kondisiGigi.find(
      (kondisi) =>
        (kondisi.gigi === idgigi && kondisi.lokasi === lokasi) ||
        (kondisi.lokasi === varGUtuh && kondisi.gigi === idgigi)
    )
    if (kondisiFind) {
      vEditGigi.setValues({ ...vEditGigi.initialValues, ...kondisiFind })
    } else {
      vEditGigi.setFieldValue('gigi', idgigi)
      vEditGigi.setFieldValue('lokasi', lokasi)
      vEditGigi.setFieldValue('lokasitemp', lokasi)
    }
  }

  const kuadran1 = allGigi.filter((f) => f.label[0] === '1')
  const kuadran2 = allGigi.filter((f) => f.label[0] === '2')

  const kuadran5 = allGigi.filter((f) => f.label[0] === '5')
  const kuadran6 = allGigi.filter((f) => f.label[0] === '6')
  const kuadran7 = allGigi.filter((f) => f.label[0] === '7')
  const kuadran8 = allGigi.filter((f) => f.label[0] === '8')

  const kuadran4 = allGigi.filter((f) => f.label[0] === '4')
  const kuadran3 = allGigi.filter((f) => f.label[0] === '3')

  useEffect(() => {
    dispatch(getAllGigi())
    dispatch(getAllLegendGigi())
    dispatch(getComboOdontogram())
  }, [dispatch])

  useEffect(() => {
    dispatch(getOdontogram({ norecdp: norecdp }))
  }, [dispatch, norecdp])

  useEffect(() => {
    refKontainerGigi.current = allGigi.map(() => createRef(null))
    setRefGigiAtas(allGigi.map(() => createRef(null)))
  }, [allGigi])

  useEffect(() => {
    const norecodontogram = searchParams.get('norecodontogram')
    const setFF = vKondisiGigi.setFieldValue
    setFF('norecap', norecap)
    setFF('norecodontogram', norecodontogram)
  }, [searchParams, norecap, vKondisiGigi.setFieldValue])

  useEffect(() => {
    // hapus semua line saat detach
    return () => {
      latestKondisiGigi.current.forEach((kondisi) => {
        if (kondisi.line) {
          try {
            kondisi.line.remove()
          } catch (e) {
            console.error('Kemungkinan sudah terremove')
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    latestKondisiGigi.current = vKondisiGigi.values.kondisiGigi
  }, [vKondisiGigi.values.kondisiGigi])

  useEffect(() => {
    if (refGigiAtas.length === 0) return
    const newDataGetOdontogram = { ...dataGetOdontogram }
    // hapus semua line sebelum ditumpuk data baru
    latestKondisiGigi.current.forEach((kondisi) => {
      if (kondisi.line) {
        try {
          kondisi.line.remove()
        } catch (e) {
          console.error('Kemungkinan sudah terremove')
        }
      }
    })
    newDataGetOdontogram.kondisiGigi = newDataGetOdontogram.kondisiGigi.map(
      (kondisi) => {
        // gambar line
        const indexAsal = kondisi.indexGigi
        const indexTujuan = kondisi.indexGigiTujuan

        const newKondisi = { ...kondisi }
        if (!newKondisi.isJembatan) return newKondisi
        const start = LeaderLine.pointAnchor(refGigiAtas[indexAsal].current, {
          x: 14,
        })

        const end = LeaderLine.pointAnchor(refGigiAtas[indexTujuan].current, {
          x: 14,
        })

        const line = new LeaderLine(start, end, {
          startSocketGravity: 5,
          startSocket: 'top',
          endSocket: 'top',
          endPlug: 'behind',
          path: 'grid',
        })
        newKondisi.line = line
        return newKondisi
      }
    )
    const setV = vKondisiGigi.setValues
    setV({
      ...vKondisiGigi.initialValues,
      ...newDataGetOdontogram,
    })
  }, [
    dataGetOdontogram,
    allGigi,
    refGigiAtas,
    vKondisiGigi.setValues,
    vKondisiGigi.initialValues,
  ])

  const mapGigi = (gigi) => (
    <Gigi
      refKontainerAtas={refKontainerGigi.current[gigi.indexkondisi]}
      refGigiAtas={refGigiAtas[gigi.indexkondisi]}
      key={gigi.indexkondisi}
      chosenLokasi={vEditGigi.values.lokasi}
      chosenGigi={vEditGigi.values.gigi}
      gigi={gigi}
      kondisiGigi={vKondisiGigi.values.kondisiGigi}
      onClickLokasi={onClickLokasi}
    />
  )

  if (loadingGet) {
    return <LoadingLaman />
  }
  return (
    <div className="page-odontogram p-5">
      <ModalOdontogram
        vEditGigi={vEditGigi}
        vKondisiGigi={vKondisiGigi}
        refGigiAtas={refGigiAtas}
        refKontainerGigi={refKontainerGigi}
      />
      <div className="tgl">
        Terakhir Update: {dateTimeLocal(vKondisiGigi.values.tglinput)}
      </div>
      <TabelGigi
        gigi1={kuadran1}
        gigiBayi1={kuadran5}
        gigi2={kuadran2}
        gigiBayi2={kuadran6}
        kondisiGigi={vKondisiGigi.values.kondisiGigi}
      />
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
      <TabelGigi
        gigi1={kuadran4}
        gigiBayi1={kuadran8}
        gigi2={kuadran7}
        gigiBayi2={kuadran3}
        kondisiGigi={vKondisiGigi.values.kondisiGigi}
      />
      <Row>
        <ColLabelInput2 label="Occlusi" lg={6}>
          <CustomSelect
            id="occlusi"
            name="occlusi"
            options={comboOdontogram.occlusi}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('occlusi', e?.value ?? null)
            }}
            value={vKondisiGigi.values.occlusi}
            onBlur={vKondisiGigi.handleBlur}
            className={`input row-header ${
              !!vKondisiGigi?.errors.occlusi ? 'is-invalid' : ''
            }`}
            isClearEmpty
          />
          {vKondisiGigi.touched.occlusi && !!vKondisiGigi.errors.occlusi && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.occlusi}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2 label="Torus palatinus" lg={6}>
          <CustomSelect
            id="toruspalatinus"
            name="toruspalatinus"
            options={comboOdontogram.torusPalatinus}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('toruspalatinus', e?.value ?? null)
            }}
            value={vKondisiGigi.values.toruspalatinus}
            onBlur={vKondisiGigi.handleBlur}
            className={`input row-header ${
              !!vKondisiGigi?.errors.toruspalatinus ? 'is-invalid' : ''
            }`}
            isClearEmpty
          />
          {vKondisiGigi.touched.toruspalatinus &&
            !!vKondisiGigi.errors.toruspalatinus && (
              <FormFeedback type="invalid">
                <div>{vKondisiGigi.errors.toruspalatinus}</div>
              </FormFeedback>
            )}
        </ColLabelInput2>
        <ColLabelInput2 label="Torus Mandibularis" lg={6}>
          <CustomSelect
            id="torusmandibularis"
            name="torusmandibularis"
            options={comboOdontogram.torusMandibularis}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('torusmandibularis', e?.value ?? null)
            }}
            value={vKondisiGigi.values.torusmandibularis}
            onBlur={vKondisiGigi.handleBlur}
            className={`input row-header ${
              !!vKondisiGigi?.errors.torusmandibularis ? 'is-invalid' : ''
            }`}
            isClearEmpty
          />
          {vKondisiGigi.touched.torusmandibularis &&
            !!vKondisiGigi.errors.torusmandibularis && (
              <FormFeedback type="invalid">
                <div>{vKondisiGigi.errors.torusmandibularis}</div>
              </FormFeedback>
            )}
        </ColLabelInput2>
        <ColLabelInput2 label="Palatum" lg={6}>
          <CustomSelect
            id="palatum"
            name="palatum"
            options={comboOdontogram.palatum}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('palatum', e?.value || '')
            }}
            value={vKondisiGigi.values.palatum}
            onBlur={vKondisiGigi.handleBlur}
            className={`input row-header ${
              !!vKondisiGigi?.errors.palatum ? 'is-invalid' : ''
            }`}
            isClearEmpty
          />
          {vKondisiGigi.touched.palatum && !!vKondisiGigi.errors.palatum && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.palatum}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2 label="Diastema" lg={6}>
          <Input
            id="diastema"
            name="diastema"
            type="text"
            value={vKondisiGigi.values.diastema}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('diastema', e.target.value)
            }}
            invalid={
              vKondisiGigi.touched?.diastema && !!vKondisiGigi.errors?.diastema
            }
          />
          {vKondisiGigi.touched?.diastema && !!vKondisiGigi.errors.diastema && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.diastema}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2 label="Gigi Anomali" lg={6}>
          <Input
            id="gigianomali"
            name="gigianomali"
            type="text"
            value={vKondisiGigi.values.gigianomali}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('gigianomali', e.target.value)
            }}
            invalid={
              vKondisiGigi.touched?.gigianomali &&
              !!vKondisiGigi.errors?.gigianomali
            }
          />
          {vKondisiGigi.touched?.gigianomali &&
            !!vKondisiGigi.errors.gigianomali && (
              <FormFeedback type="invalid">
                <div>{vKondisiGigi.errors.gigianomali}</div>
              </FormFeedback>
            )}
        </ColLabelInput2>
        <ColLabelInput2 label="Lain lain" lg={12} lgLabel={2}>
          <Input
            id="lainlain"
            name="lainlain"
            type="text"
            value={vKondisiGigi.values.lainlain}
            onChange={(e) => {
              vKondisiGigi.setFieldValue('lainlain', e.target.value)
            }}
            invalid={
              vKondisiGigi.touched?.lainlain && !!vKondisiGigi.errors?.lainlain
            }
          />
          {vKondisiGigi.touched?.lainlain && !!vKondisiGigi.errors.lainlain && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.lainlain}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2 label="D" lg={4} lgLabel={2}>
          <Input
            id="decay"
            name="decay"
            type="text"
            value={vKondisiGigi.values.decay}
            onBlur={vKondisiGigi.handleBlur}
            onChange={(e) => {
              const newVal = onChangeStrNbr(
                e.target.value,
                vKondisiGigi.values.decay
              )
              vKondisiGigi.setFieldValue('decay', newVal)
            }}
            invalid={
              vKondisiGigi.touched?.decay && !!vKondisiGigi.errors?.decay
            }
          />
          {vKondisiGigi.touched?.decay && !!vKondisiGigi.errors.decay && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.decay}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2 label="M" lg={4} lgLabel={2}>
          <Input
            id="missing"
            name="missing"
            type="text"
            value={vKondisiGigi.values.missing}
            onBlur={vKondisiGigi.handleBlur}
            onChange={(e) => {
              const newVal = onChangeStrNbr(
                e.target.value,
                vKondisiGigi.values.missing
              )
              vKondisiGigi.setFieldValue('missing', newVal)
            }}
            invalid={
              vKondisiGigi.touched?.missing && !!vKondisiGigi.errors?.missing
            }
          />
          {vKondisiGigi.touched?.missing && !!vKondisiGigi.errors.missing && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.missing}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2 label="F" lg={4} lgLabel={2}>
          <Input
            id="filling"
            name="filling"
            type="text"
            value={vKondisiGigi.values.filling}
            onBlur={vKondisiGigi.handleBlur}
            onChange={(e) => {
              const newVal = onChangeStrNbr(
                e.target.value,
                vKondisiGigi.values.filling
              )
              vKondisiGigi.setFieldValue('filling', newVal)
            }}
            invalid={
              vKondisiGigi.touched?.filling && !!vKondisiGigi.errors?.filling
            }
          />
          {vKondisiGigi.touched?.filling && !!vKondisiGigi.errors.filling && (
            <FormFeedback type="invalid">
              <div>{vKondisiGigi.errors.filling}</div>
            </FormFeedback>
          )}
        </ColLabelInput2>
        <ColLabelInput2
          label="Jumlah foto diambil"
          lg={12}
          lgLabel={2}
          allChildrens={[
            {
              lg: 6,
              Component: (
                <>
                  <CustomSelect
                    id="jenisfoto"
                    name="jenisfoto"
                    options={comboOdontogram.jenisFoto}
                    onChange={(e) => {
                      vKondisiGigi.setFieldValue('jenisfoto', e?.value || '')
                    }}
                    value={vKondisiGigi.values.jenisfoto}
                    onBlur={vKondisiGigi.handleBlur}
                    className={`input row-header ${
                      !!vKondisiGigi?.errors.jenisfoto ? 'is-invalid' : ''
                    }`}
                    isClearEmpty
                  />
                  {vKondisiGigi.touched.jenisfoto &&
                    !!vKondisiGigi.errors.jenisfoto && (
                      <FormFeedback type="invalid">
                        <div>{vKondisiGigi.errors.jenisfoto}</div>
                      </FormFeedback>
                    )}
                </>
              ),
            },
            {
              lg: 4,
              Component: (
                <>
                  <Input
                    id="jenisfotorontgent"
                    name="jenisfotorontgent"
                    type="text"
                    value={vKondisiGigi.values.jenisfotorontgent}
                    onBlur={vKondisiGigi.handleBlur}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vKondisiGigi.values.jenisfotorontgent
                      )
                      vKondisiGigi.setFieldValue('jenisfotorontgent', newVal)
                    }}
                    invalid={
                      vKondisiGigi.touched?.jenisfotorontgent &&
                      !!vKondisiGigi.errors?.jenisfotorontgent
                    }
                  />
                  {vKondisiGigi.touched?.jenisfotorontgent &&
                    !!vKondisiGigi.errors.jenisfotorontgent && (
                      <FormFeedback type="invalid">
                        <div>{vKondisiGigi.errors.jenisfotorontgent}</div>
                      </FormFeedback>
                    )}
                </>
              ),
            },
          ]}
        />
        <ColLabelInput2
          classNameLabel={'mt-0'}
          label="Jumlah rontgent foto yang diambil"
          lg={12}
          lgLabel={2}
          allChildrens={[
            {
              lg: 6,
              Component: (
                <>
                  <CustomSelect
                    id="jenisfotorontgent"
                    name="jenisfotorontgent"
                    options={comboOdontogram.jenisFotoRontgent}
                    onChange={(e) => {
                      vKondisiGigi.setFieldValue(
                        'jenisfotorontgent',
                        e?.value || ''
                      )
                    }}
                    value={vKondisiGigi.values.jenisfotorontgent}
                    onBlur={vKondisiGigi.handleBlur}
                    className={`input row-header ${
                      !!vKondisiGigi?.errors.jenisfotorontgent
                        ? 'is-invalid'
                        : ''
                    }`}
                    isClearEmpty
                  />
                  {vKondisiGigi.touched.jenisfotorontgent &&
                    !!vKondisiGigi.errors.jenisfotorontgent && (
                      <FormFeedback type="invalid">
                        <div>{vKondisiGigi.errors.jenisfotorontgent}</div>
                      </FormFeedback>
                    )}
                </>
              ),
            },
            {
              lg: 4,
              Component: (
                <>
                  <Input
                    id="jumlahfotorontgent"
                    name="jumlahfotorontgent"
                    type="text"
                    value={vKondisiGigi.values.jumlahfotorontgent}
                    onBlur={vKondisiGigi.handleBlur}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vKondisiGigi.values.jumlahfotorontgent
                      )
                      vKondisiGigi.setFieldValue('jumlahfotorontgent', newVal)
                    }}
                    invalid={
                      vKondisiGigi.touched?.jumlahfotorontgent &&
                      !!vKondisiGigi.errors?.jumlahfotorontgent
                    }
                  />
                  {vKondisiGigi.touched?.jumlahfotorontgent &&
                    !!vKondisiGigi.errors.jumlahfotorontgent && (
                      <FormFeedback type="invalid">
                        <div>{vKondisiGigi.errors.jumlahfotorontgent}</div>
                      </FormFeedback>
                    )}
                </>
              ),
            },
          ]}
        />
      </Row>
      <Row className="d-flex flex-row-reverse mb-3 me-3 mt-5">
        <Col lg="auto">
          <BtnSpinner
            color="success"
            type="button"
            onClick={(e) => {
              vKondisiGigi.handleSubmit(e)
            }}
            loading={loadingSave}
          >
            Simpan
          </BtnSpinner>
        </Col>
        <Col lg="auto">
          <BtnSpinner color="danger">Batal</BtnSpinner>
        </Col>
      </Row>
    </div>
  )
}

const TabelGigi = ({ gigi1, gigiBayi1, gigi2, gigiBayi2, kondisiGigi }) => {
  const mapGigi = (gigi1I, index) => {
    const gigiBayi1I = gigiBayi1[index]
    const gigiBayi2I = gigiBayi2[index]
    const gigi2I = gigi2[index]
    let kondisiGigi1 = filterKondisiGigi(gigi1I, kondisiGigi)
    let kondisiGigiBayi1 = filterKondisiGigi(gigiBayi1I, kondisiGigi)
    let kondisiGigiBayi2 = filterKondisiGigi(gigiBayi2I, kondisiGigi)
    let kondisiGigi2 = filterKondisiGigi(gigi2I, kondisiGigi)
    let kondisiGigi1Str = kondisiGigi1.map((k) => k.reportDisplay).join('-')
    let kondisiGigiBayi1Str = kondisiGigiBayi1
      .map((k) => k.reportDisplay)
      .join('-')
    let kondisiGigi2Str = kondisiGigi2.map((k) => k.reportDisplay).join('-')
    let kondisiGigiBayi2Str = kondisiGigiBayi2
      .map((k) => k.reportDisplay)
      .join('-')

    return (
      <tr key={gigi1I.indexkondisi}>
        <td>
          {gigi1I.label} {gigiBayi1I?.label ? `[${gigiBayi1I?.label}]` : ''}
        </td>
        <td>{kondisiGigi1Str + kondisiGigiBayi1Str}</td>
        <td>{kondisiGigi2Str + kondisiGigiBayi2Str}</td>
        <td>
          {gigiBayi2I?.label ? `[${gigiBayi2I?.label}]` : ''} {gigi2I?.label}
        </td>
      </tr>
    )
  }
  return (
    <table className="table-bordered w-100">
      <tbody>{gigi1.map(mapGigi)}</tbody>
    </table>
  )
}

const filterKondisiGigi = (gigi, kondisiGigi) => {
  if (!gigi) return []
  let newKondisiGigi = [...kondisiGigi]
  newKondisiGigi = newKondisiGigi.filter((f) => {
    let isBetween = false
    if (f.indexGigiTujuan != null && f.indexGigi != null) {
      const iGigi = gigi.indexkondisi

      const max = Math.max(f.indexGigiTujuan, f.indexGigi)
      const min = Math.min(f.indexGigiTujuan, f.indexGigi)
      isBetween = iGigi < max && iGigi > min
    }
    return f.gigi === gigi.value || f.gigiTujuan === gigi.value || isBetween
  })
  return newKondisiGigi
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
  const filteredKondisi = filterKondisiGigi(gigi, kondisiGigi)
  // console.log(filteredKondisi)

  const kondisiFull = filteredKondisi.filter((f) => f.isFull)
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
          kondisiGigi={filteredKondisi}
        />
      )}
      <IsiGigi
        lokasi="bawah"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={filteredKondisi}
      />
      <IsiGigi
        lokasi="kanan"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={filteredKondisi}
      />
      <IsiGigi
        lokasi="atas"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={filteredKondisi}
        refGigiAtas={refGigiAtas}
      />
      <IsiGigi
        lokasi="kiri"
        chosenLokasi={chosenLokasi}
        chosenGigi={chosenGigi}
        gigi={gigi}
        onClickLokasi={onClickLokasi}
        kondisiGigi={filteredKondisi}
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
  const isKedip = useKedip()

  const isChosen =
    (chosenLokasi === 'tengah' || chosenLokasi === varGUtuh) &&
    gigi.value === chosenGigi
  return (
    <div
      className="gigi-tengah"
      style={{
        backgroundColor:
          isChosen && isKedip
            ? '#5ec4de'
            : kondisiDgnWarna
            ? kondisiDgnWarna.warnaKondisi
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
  const isKedip = useKedip()
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
            backgroundColor:
              isChosen && isKedip
                ? '#5ec4de'
                : kondisiDgnWarna
                ? kondisiDgnWarna.warnaKondisi
                : undefined,
          }}
        ></div>
      </div>
    </>
  )
}

const useKedip = () => {
  const [isKedip, setIsKedip] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsKedip((i) => !i)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return isKedip
}

export const varGUtuh = 'gigiutuh'

// memfilter kondisi lain di kondisiGigi yang tidak kompatibel dengan newValues
export const filterKondisi = (kondisiGigi, newValues) => {
  let newKondisiGigi = [...kondisiGigi]
  const isUtuh = newValues.lokasi === varGUtuh
  const isWarna = newValues.warnaKondisi !== null
  if (isUtuh) {
    // kalau utuh, hapus lainnya yang tidak bisa ditumpuk
    newKondisiGigi = newKondisiGigi.filter((kondisi) => {
      const allBisaTumpuk = kondisi.isTumpuk && newValues.isTumpuk
      return kondisi.gigi !== newValues.gigi || allBisaTumpuk
    })
  } else {
    // kalau sebagian, hapus utuh lainnya yang tidak bisa ditumpuk
    newKondisiGigi = newKondisiGigi.filter((kondisi) => {
      const isKondisiUtuh = kondisi.lokasi === varGUtuh
      const allBisaTumpuk =
        kondisi.isTumpuk && newValues.isTumpuk && !isKondisiUtuh
      const bagianLain = !isKondisiUtuh && kondisi.lokasi !== newValues.lokasi
      const gigiLain = kondisi.gigi !== newValues.gigi
      return gigiLain || bagianLain || allBisaTumpuk
    })
  }

  if (isUtuh && isWarna) {
    // kalau memasukkan yang 'warna utuh', filter 'warna sebagian' lainnya
    newKondisiGigi = newKondisiGigi.filter(
      (kondisi) =>
        kondisi.gigi !== newValues.gigi || kondisi.warnaKondisi === null
    )
  } else if (isWarna) {
    // kalau memasukkan yang 'warna sebagian', filter 'seluruh warna'
    newKondisiGigi = newKondisiGigi.filter((kondisi) => {
      const gigiBeda = kondisi.gigi !== newValues.gigi
      const kondisiTidakUtuh =
        kondisi.lokasi !== varGUtuh && kondisi.lokasi !== newValues.lokasi
      return (
        gigiBeda ||
        kondisiTidakUtuh ||
        (kondisi.lokasi === varGUtuh && kondisi.warnaKondisi === null)
      )
    })
  }
  return newKondisiGigi
}

const validationKondisiGigi = Yup.object().shape(
  {
    gigi: Yup.string().required(),
    gigiTujuan: Yup.string()
      .nullable()
      .when('isJembatan', {
        is: (isJembatan) => isJembatan,
        then: () => Yup.string().required('Gigi tujuan jembatan harus diisi'),
      }),
    indexGigi: Yup.number()
      .nullable()
      .when('isJembatan', {
        is: (isJembatan) => isJembatan,
        then: () => Yup.number().required(),
      }),
    indexGigiTujuan: Yup.number()
      .nullable()
      .when('isJembatan', {
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
