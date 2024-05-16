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
import { useSelectorRoot } from '../../store/reducers'

const Odontogram = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { norecap, norecdp } = useParams()
  const norecodontogram = searchParams.get('norecodontogram')

  const loadingGet = useSelectorRoot(
    (state) => state.odontogramSlice.getAllGigi.loading
  )

  const { vKondisiGigi, vEditGigi, allGigi, refKontainerGigi, refGigiAtas } =
    useVKondisiGigi(norecdp, norecap, norecodontogram)

  if (loadingGet) {
    return <LoadingLaman />
  }
  return (
    <div className="page-odontogram p-5">
      <ModalOdontogram
        vEditGigi={vEditGigi}
        vKondisiGigi={vKondisiGigi}
        refGigiAtas={refGigiAtas}
        allGigi={allGigi}
      />
      <div className="tgl">
        Terakhir Update: {dateTimeLocal(vKondisiGigi.values.tglinput)}
      </div>
      <TabelGigiAtas allGigi={allGigi} vKondisiGigi={vKondisiGigi} />
      <GambarGigi
        refKontainerGigi={refKontainerGigi}
        refGigiAtas={refGigiAtas}
        vEditGigi={vEditGigi}
        vKondisiGigi={vKondisiGigi}
      />
      <TabelGigiBawah allGigi={allGigi} vKondisiGigi={vKondisiGigi} />
      <FormKondisiGigi vKondisiGigi={vKondisiGigi} />
    </div>
  )
}

const FormKondisiGigi = ({ vKondisiGigi }) => {
  const dispatch = useDispatch()
  const comboOdontogram = useSelectorRoot(
    (state) => state.odontogramSlice.getComboOdontogram.data
  )

  const loadingSave = useSelectorRoot(
    (state) => state.odontogramSlice.upsertOdontogram.loading
  )

  useEffect(() => {
    dispatch(getComboOdontogram())
  }, [dispatch])
  return (
    <>
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
    </>
  )
}

const GambarGigi = ({
  refKontainerGigi,
  refGigiAtas,
  vEditGigi,
  vKondisiGigi,
}) => {
  let allGigi = useSelectorRoot(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi
  )

  const kuadran1 = allGigi.filter((f) => f.label[0] === '1')
  const kuadran2 = allGigi.filter((f) => f.label[0] === '2')

  const kuadran5 = allGigi.filter((f) => f.label[0] === '5')
  const kuadran6 = allGigi.filter((f) => f.label[0] === '6')
  const kuadran7 = allGigi.filter((f) => f.label[0] === '7')
  const kuadran8 = allGigi.filter((f) => f.label[0] === '8')

  const kuadran4 = allGigi.filter((f) => f.label[0] === '4')
  const kuadran3 = allGigi.filter((f) => f.label[0] === '3')

  const onClickLokasi = (e, lokasi, idgigi, idkuadran, labelgigi, gigi) => {
    const foundKondisi = findKondisiGigi(
      gigi,
      lokasi,
      vKondisiGigi.values.kondisiGigi
    )

    if (foundKondisi) {
      let newLokasi =
        foundKondisi.lokasi === varGUtuh ? varGUtuh : foundKondisi.lokasitemp
      newLokasi = newLokasi || lokasi
      vEditGigi.setValues({
        ...vEditGigi.initialValues,
        ...foundKondisi,
        lokasi: newLokasi,
        lokasitemp: lokasi,
        isOldKondisi: true,
      })
    } else {
      vEditGigi.setFieldValue('gigi', idgigi)
      vEditGigi.setFieldValue('lokasi', lokasi)
      vEditGigi.setFieldValue('lokasitemp', lokasi)
      vEditGigi.setFieldValue('idkuadran', idkuadran)
      vEditGigi.setFieldValue('labelgigi', labelgigi)
    }
  }

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
  return (
    <div className="kontainer-all-gigi">
      <div className="all-kuadran">
        <div className="isi-kuadran">
          <div className="kuadran-kiri-gigi">{kuadran1.map(mapGigi)}</div>
          <div className="kuadran-kanan-gigi">{kuadran2.map(mapGigi)}</div>
        </div>
        <div className="isi-kuadran margin-kuadran">
          <div className="kuadran-kiri-gigi-bayi">{kuadran5.map(mapGigi)}</div>
          <div className="kuadran-kanan-gigi-bayi">{kuadran6.map(mapGigi)}</div>
        </div>
        <div className="isi-kuadran">
          <div className="kuadran-kiri-gigi-bayi">{kuadran8.map(mapGigi)}</div>
          <div className="kuadran-kanan-gigi-bayi">{kuadran7.map(mapGigi)}</div>
        </div>
        <div className="isi-kuadran margin-kuadran">
          <div className="kuadran-kiri-gigi">{kuadran4.map(mapGigi)}</div>
          <div className="kuadran-kanan-gigi">{kuadran3.map(mapGigi)}</div>
        </div>
      </div>
    </div>
  )
}

const TabelGigiAtas = ({ allGigi, vKondisiGigi }) => {
  const kuadran1 = allGigi.filter((f) => f.label[0] === '1')
  const kuadran2 = allGigi.filter((f) => f.label[0] === '2')

  const kuadran5 = allGigi.filter((f) => f.label[0] === '5')
  const kuadran6 = allGigi.filter((f) => f.label[0] === '6')
  return (
    <TabelGigi
      gigi1={kuadran1}
      gigiBayi1={kuadran5}
      gigi2={kuadran2}
      gigiBayi2={kuadran6}
      kondisiGigi={vKondisiGigi.values.kondisiGigi}
    />
  )
}

const TabelGigiBawah = ({ allGigi, vKondisiGigi }) => {
  const kuadran7 = [...allGigi.filter((f) => f.label[0] === '7')].reverse()
  const kuadran8 = [...allGigi.filter((f) => f.label[0] === '8')].reverse()

  const kuadran4 = [...allGigi.filter((f) => f.label[0] === '4')].reverse()
  const kuadran3 = [...allGigi.filter((f) => f.label[0] === '3')].reverse()
  return (
    <TabelGigi
      gigi1={kuadran4}
      gigiBayi1={kuadran8}
      gigi2={kuadran3}
      gigiBayi2={kuadran7}
      kondisiGigi={vKondisiGigi.values.kondisiGigi}
    />
  )
}

const TabelGigi = ({
  gigi1,
  gigiBayi1,
  gigi2,
  gigiBayi2,
  kondisiGigi,
  isReversed,
}) => {
  const mapGigi = (gigi1I, index) => {
    const gigiBayi1I = gigiBayi1.find(
      (gb) => gb.label && gb.label[1] === gigi1I.label[1]
    )
    const gigiBayi2I = gigiBayi2.find(
      (gb) => gb.label && gb.label[1] === gigi1I.label[1]
    )
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
        <td className="col-3 text-center">
          {gigi1I.label} {gigiBayi1I?.label ? `[${gigiBayi1I?.label}]` : ''}
        </td>
        <td className="col-3">{kondisiGigi1Str + kondisiGigiBayi1Str}</td>
        <td className="col-3">{kondisiGigi2Str + kondisiGigiBayi2Str}</td>
        <td className="col-3 text-center">
          {gigiBayi2I?.label ? `[${gigiBayi2I?.label}]` : ''} {gigi2I?.label}
        </td>
      </tr>
    )
  }
  return (
    <table className="table-bordered w-100 mt-5">
      <tbody>{gigi1.map(mapGigi)}</tbody>
    </table>
  )
}

/**
 * memfilter seluruh kondisiGigi yang terkena ke gigi, contoh: gigi yang ada di antara 2 (gigi.isJembatan == true) akan termasuk gigi yang kena kondisi
 * @param {*} gigi gigi yang dites
 * @param {import('sharedjs/src/gigi/gigiData').IKondisiGigi[]} kondisiGigi list kondisiGigi
 * @returns
 */
const filterKondisiGigi = (gigi, kondisiGigi) => {
  if (!gigi) return []
  let newKondisiGigi = [...kondisiGigi]
  newKondisiGigi = newKondisiGigi.filter((k) => {
    let isBetween = false
    const bedaKuadran =
      k.labelgigi &&
      k.labelgigitujuan &&
      k.labelgigi[0] !== k.labelgigitujuan[0]
    if (bedaKuadran) {
      const max = Math.max(Number(k.labelgigi), Number(k.labelgigitujuan))
      const min = Math.min(Number(k.labelgigi), Number(k.labelgigitujuan))
      const maxKuadran = Math.max(
        Number(k.labelgigi[0]),
        Number(k.labelgigitujuan[0])
      )
      const minKuadran = Math.min(
        Number(k.labelgigi[0]),
        Number(k.labelgigitujuan[0])
      )

      const labelNumber = Number(gigi.label)
      const isBeetwenMin =
        labelNumber < min && gigi.label[0] === String(minKuadran)
      const isBetweenMax =
        labelNumber < max && gigi.label[0] === String(maxKuadran)
      isBetween = isBeetwenMin || isBetweenMax
    } else if (k.indexGigiTujuan != null && k.indexGigi != null) {
      const iGigi = gigi.indexkondisi

      const max = Math.max(k.indexGigiTujuan, k.indexGigi)
      const min = Math.min(k.indexGigiTujuan, k.indexGigi)
      isBetween = iGigi < max && iGigi > min
    }
    return k.gigi === gigi.value || k.gigiTujuan === gigi.value || isBetween
  })
  return newKondisiGigi
}

export const findKondisiGigi = (gigi, lokasi, kondisiGigi) => {
  if (!gigi) return
  const foundGigi = kondisiGigi.find((k) => {
    const isBetween = findIsBetweenJembatan(k, gigi)
    return (
      (k.gigi === gigi.value && k.lokasi === lokasi) ||
      (k.lokasi === varGUtuh && k.gigi === gigi.value) ||
      isBetween
    )
  })
  return foundGigi
}

const findIsBetweenJembatan = (kondisi, gigi) => {
  if (!kondisi.isJembatan || !gigi) {
    return false
  }
  let isBetween = false
  const bedaKuadran =
    kondisi.labelgigi &&
    kondisi.labelgigitujuan &&
    kondisi.labelgigi[0] !== kondisi.labelgigitujuan[0]
  if (bedaKuadran) {
    const max = Math.max(
      Number(kondisi.labelgigi),
      Number(kondisi.labelgigitujuan)
    )
    const min = Math.min(
      Number(kondisi.labelgigi),
      Number(kondisi.labelgigitujuan)
    )
    const maxKuadran = Math.max(
      Number(kondisi.labelgigi[0]),
      Number(kondisi.labelgigitujuan[0])
    )
    const minKuadran = Math.min(
      Number(kondisi.labelgigi[0]),
      Number(kondisi.labelgigitujuan[0])
    )

    const labelNumber = Number(gigi.label)
    const isBeetwenMin =
      labelNumber <= min && gigi.label[0] === String(minKuadran)
    const isBetweenMax =
      labelNumber <= max && gigi.label[0] === String(maxKuadran)
    isBetween = isBeetwenMin || isBetweenMax
  } else if (kondisi.indexGigiTujuan != null && kondisi.indexGigi != null) {
    const iGigi = gigi.indexkondisi

    const max = Math.max(kondisi.indexGigiTujuan, kondisi.indexGigi)
    const min = Math.min(kondisi.indexGigiTujuan, kondisi.indexGigi)
    isBetween = iGigi <= max && iGigi >= min
  }
  return isBetween
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
      onClick={(e) =>
        onClickLokasi(e, 'tengah', gigi.value, gigi.idkuadran, gigi.label, gigi)
      }
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
        onClick={(e) =>
          onClickLokasi(e, lokasi, gigi.value, gigi.idkuadran, gigi.label, gigi)
        }
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
export const filterKondisi = (kondisiGigi, newValue, allGigi) => {
  let newKondisiGigi = [...kondisiGigi]
  const isUtuh = newValue.lokasi === varGUtuh
  const isWarna = newValue.warnaKondisi !== null
  if (isUtuh) {
    // kalau utuh, hapus lainnya yang tidak bisa ditumpuk
    newKondisiGigi = newKondisiGigi.filter((kondisi) => {
      const allBisaTumpuk = kondisi.isTumpuk && newValue.isTumpuk
      return kondisi.gigi !== newValue.gigi || allBisaTumpuk
    })
  } else {
    // kalau sebagian, hapus utuh lainnya yang tidak bisa ditumpuk
    newKondisiGigi = newKondisiGigi.filter((kondisi) => {
      const isKondisiUtuh = kondisi.lokasi === varGUtuh
      const allBisaTumpuk = kondisi.isTumpuk && newValue.isTumpuk
      const bagianLain = !isKondisiUtuh && kondisi.lokasi !== newValue.lokasi
      const gigiLain = kondisi.gigi !== newValue.gigi
      return gigiLain || bagianLain || allBisaTumpuk
    })
  }

  if (isUtuh && isWarna) {
    // kalau memasukkan yang 'warna utuh', filter 'warna sebagian' lainnya
    newKondisiGigi = newKondisiGigi.filter(
      (kondisi) =>
        kondisi.gigi !== newValue.gigi || kondisi.warnaKondisi === null
    )
  } else if (isWarna) {
    // kalau memasukkan yang 'warna sebagian', filter 'seluruh warna'
    newKondisiGigi = newKondisiGigi.filter((kondisi) => {
      const gigiBeda = kondisi.gigi !== newValue.gigi
      const kondisiTidakUtuh =
        kondisi.lokasi !== varGUtuh && kondisi.lokasi !== newValue.lokasi
      const kondisiUtuh =
        kondisi.lokasi === varGUtuh && kondisi.warnaKondisi === null
      return gigiBeda || kondisiTidakUtuh || kondisiUtuh
    })
  }
  // yang di antara jembatan hapus semua
  newKondisiGigi = newKondisiGigi.filter((kondisi) => {
    const gigi = allGigi.find((f) => newValue.gigi === f.value)
    const isBetween = findIsBetweenJembatan(kondisi, gigi)
    return !isBetween || (isBetween && kondisi.isTumpuk && newValue.isTumpuk)
  })
  newKondisiGigi = newKondisiGigi.filter((kondisi) => {
    const gigiKondisiLama = allGigi.find((f) => kondisi.gigi === f.value)
    const isBetween = findIsBetweenJembatan(newValue, gigiKondisiLama)
    return !isBetween || (isBetween && kondisi.isTumpuk && newValue.isTumpuk)
  })
  return newKondisiGigi
}

const useVKondisiGigi = (norecdp, norecap, norecodontogram) => {
  let allGigi = useSelectorRoot(
    (state) => state.odontogramSlice.getAllGigi.data.allGigi
  )

  const refKontainerGigi = useRef(allGigi.map(() => createRef()))

  const [refGigiAtas, setRefGigiAtas] = useState(allGigi.map(() => createRef()))
  const dispatch = useDispatch()

  const vKondisiGigi = useFormik({
    initialValues: { ...gigiAPI.bUpsertOdontogramDetail },
    validationSchema: Yup.object({
      norecap: Yup.string().nullable().required('norecap diperlukan'),
      //occlusi dll sementara gak wajib
      kondisiGigi: Yup.array()
        .min(1, 'Minimal 1 Kondisi')
        .of(validationEditKondisiGigi),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertOdontogram(values, () => {
          dispatch(getOdontogram({ norecdp: norecdp }))
        })
      )
    },
  })
  const vEditGigi = useFormik({
    initialValues: { ...initKondisiGigi },
    validationSchema: validationEditKondisiGigi,
    onSubmit: (values, { resetForm }) => {
      let newKondisiGigi = filterKondisi(
        vKondisiGigi.values.kondisiGigi,
        values,
        allGigi
      )
      if (!values.kondisi) {
        vKondisiGigi.setFieldValue('kondisiGigi', newKondisiGigi)
        resetForm()
      } else {
        vKondisiGigi.setFieldValue('kondisiGigi', [
          ...newKondisiGigi,
          { ...values },
        ])
        resetForm()
      }
    },
  })

  useGetDataAndDrawLine(
    allGigi,
    refGigiAtas,
    norecap,
    norecdp,
    norecodontogram,
    vKondisiGigi
  )

  useEffect(() => {
    refKontainerGigi.current = allGigi.map(() => createRef(null))
    setRefGigiAtas(allGigi.map(() => createRef(null)))
  }, [allGigi])

  useEffect(() => {
    dispatch(getAllGigi())
    dispatch(getAllLegendGigi())
  }, [dispatch])

  return {
    vKondisiGigi,
    vEditGigi,
    allGigi,
    refKontainerGigi,
    refGigiAtas,
  }
}

const useGetDataAndDrawLine = (
  allGigi,
  refGigiAtas,
  norecap,
  norecdp,
  norecodontogram,
  vKondisiGigi
) => {
  const dispatch = useDispatch()
  let dataGetOdontogram = useSelectorRoot(
    (state) => state.odontogramSlice.getOdontogram.data
  )
  const latestKondisiGigi = useRef(vKondisiGigi.values.kondisiGigi)
  // get data
  useEffect(() => {
    dispatch(getOdontogram({ norecdp: norecdp }))
  }, [dispatch, norecdp])

  // simpan data baru
  useEffect(() => {
    if (refGigiAtas.length === 0) return
    const newDataGetOdontogram = { ...dataGetOdontogram }
    const setV = vKondisiGigi.setValues
    setV({
      ...vKondisiGigi.initialValues,
      ...newDataGetOdontogram,
      norecap: norecap,
      norecodontogram: norecodontogram,
    })
  }, [
    dataGetOdontogram,
    allGigi,
    refGigiAtas,
    norecap,
    norecodontogram,
    vKondisiGigi.setValues,
    vKondisiGigi.initialValues,
  ])

  // gambar line jembatan
  useEffect(() => {
    latestKondisiGigi.current.forEach((kondisi) => {
      if (kondisi.line) {
        try {
          kondisi.line.remove()
        } catch (e) {
          console.error('Kemungkinan sudah terremove')
        }
      }
    })
    latestKondisiGigi.current = vKondisiGigi.values.kondisiGigi
    latestKondisiGigi.current = latestKondisiGigi.current.map((kondisi) => {
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
    })

    // hapus line sebelumnya
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
  }, [vKondisiGigi.values.kondisiGigi, refGigiAtas])
}

const validationEditKondisiGigi = Yup.object().shape(
  {
    gigi: Yup.string().required(),
    gigiTujuan: Yup.string()
      .nullable()
      .when('isJembatan', {
        is: (isJembatan) => isJembatan,
        then: () => Yup.string().required('Gigi tujuan jembatan harus diisi'),
      }),
    labelgigi: Yup.string().nullable(),
    labelgigitujuan: Yup.string().nullable(),
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
    kondisi: Yup.string().nullable(),

    svgKondisi: Yup.string()
      .nullable()
      .when(['kondisi', 'warnaKondisi', 'teksKondisi', 'isJembatan'], {
        is: (kondisi, warna, teks, isJembatan) =>
          kondisi !== null && warna === null && teks === null && !isJembatan,
        then: () => Yup.string().required('Kondisi harus diisi'),
      }),
    warnaKondisi: Yup.string()
      .nullable()
      .when(['kondisi', 'svgKondisi', 'teksKondisi', 'isJembatan'], {
        is: (kondisi, svg, teks, isJembatan) =>
          kondisi !== null && svg === null && teks === null && !isJembatan,
        then: () => Yup.string().required('Kondisi harus diisi'),
      }),
    teksKondisi: Yup.string()
      .nullable()
      .when(['kondisi', 'svgKondisi', 'warnaKondisi', 'isJembatan'], {
        is: (kondisi, svg, warna, isJembatan) =>
          kondisi !== null && svg === null && warna === null && !isJembatan,
        then: () => Yup.string().required('Kondisi harus diisi'),
      }),
    idkuadran: Yup.number().nullable(),
  },
  [
    ['svgKondisi', 'warnaKondisi'],
    ['svgKondisi', 'teksKondisi'],
    ['warnaKondisi', 'teksKondisi'],
  ]
)

export default Odontogram
