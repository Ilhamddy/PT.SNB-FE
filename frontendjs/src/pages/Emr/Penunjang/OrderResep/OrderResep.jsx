import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap'
import CustomSelect from '../../../Select/Select'
import { useFormik } from 'formik'
import DataTable from 'react-data-table-component'
import NoDataTable from '../../../../Components/Table/NoDataTable'
import { onChangeStrNbr, strToNumber } from '../../../../utils/format'
import { useEffect, useRef, useState } from 'react'
import { getComboResep } from '../../../../store/master/action'
import { useDispatch, useSelector } from 'react-redux'
import {
  createOrUpdateResepOrder,
  getAntreanPemeriksaanObat,
  getObatFromUnit,
  getOrderResepFromDp,
} from '../../../../store/emr/action'
import * as Yup from 'yup'
import { useParams, useSearchParams } from 'react-router-dom'
import RiwayatOrder from './RiwayatOrder'
import DeleteModalCustom from '../../../../Components/Common/DeleteModalCustom'
import LoadingLaman from '../../../../Components/Common/LoadingLaman'
import {
  initValueResep,
  validationResep,
  useHandleChangeResep,
  useHandleChangeAllResep,
  useColumnsResep,
  useColumnsResepRacikan,
  TabelResep,
  useResepRef,
} from '../../../PenjualanObatBebas/KomponenResep'

const OrderResep = () => {
  const dispatch = useDispatch()
  const [unittujuanTemp, setunittujuanTemp] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)

  const { norecap, norecdp } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const norecresep = searchParams.get('norecresep')

  const {
    pegawai,
    unit,
    keteranganResep,
    signa,
    obatList,
    sediaanList,
    orderNorec,
    orderDp,
    antreanPemeriksaan,
    loadingSubmit,
    loadingGetAllResep,
  } = useSelector((state) => ({
    pegawai: state.Master?.getComboResep?.data?.pegawai || [],
    unit: state.Master?.getComboResep?.data?.unit || [],
    keteranganResep: state.Master?.getComboResep?.data?.keteranganresep || [],
    signa: state.Master?.getComboResep?.data?.signa || [],
    obatList: state?.Emr?.getObatFromUnit?.data?.obat || [],
    sediaanList: state?.Master?.getComboResep?.data?.sediaan || [],
    orderNorec: state?.Emr?.getOrderResepFromDP?.data?.ordernorec || null,
    orderDp: state?.Emr?.getOrderResepFromDP?.data?.order || null,
    antreanPemeriksaan:
      state?.Emr?.getAntreanPemeriksaanObat?.data?.antreanPemeriksaan || null,
    loadingSubmit: state.Emr.createOrUpdateResepOrder.loading || false,
    loadingGetAllResep: state.Emr.getOrderResepFromDP.loading || false,
  }))

  const vResep = useFormik({
    initialValues: {
      norecorder: '',
      dokter: '',
      namadokter: '',
      unitasal: '',
      unittujuan: '',
      norecap: '',
      resep: [
        {
          ...initValueResep,
        },
      ],
    },
    validationSchema: Yup.object({
      dokter: Yup.string().required('Dokter harus diisi'),
      unittujuan: Yup.string().required('Depo tujuan harus diisi'),
      resep: validationResep(),
    }),
    onSubmit: (value, { resetForm }) => {
      const newVal = { ...value }
      newVal.resep = newVal.resep.map((valResep) => {
        const newValResep = { ...valResep }
        newValResep.racikan = newValResep.racikan.map((valRacikan) => {
          const newValRacikan = { ...valRacikan }
          newValRacikan.qty = strToNumber(newValRacikan.qty)
          newValRacikan.qtyjumlahracikan = strToNumber(
            newValRacikan.qtyjumlahracikan
          )
          newValRacikan.qtyracikan = strToNumber(newValRacikan.qtyracikan)
          newValRacikan.qtypembulatan = strToNumber(newValRacikan.qtypembulatan)
          newValRacikan.harga = strToNumber(newValRacikan.harga)
          newValRacikan.total = strToNumber(newValRacikan.total)
          return newValRacikan
        })
        newValResep.qty = strToNumber(valResep.qty)
        newValResep.qtyjumlahracikan = strToNumber(valResep.qtyjumlahracikan)
        newValResep.qtyracikan = strToNumber(valResep.qtyracikan)
        newValResep.qtypembulatan = strToNumber(valResep.qtypembulatan)
        newValResep.harga = strToNumber(valResep.harga)
        newValResep.total = strToNumber(valResep.total)
        return newValResep
      })
      dispatch(
        createOrUpdateResepOrder(newVal, (data) => {
          resetForm()
          if (searchParams.has('norecresep')) {
            searchParams.delete('norecresep')
            setSearchParams(searchParams)
          } else {
            dispatch(
              getOrderResepFromDp({
                norecdp: norecdp,
                norecresep: norecresep,
              })
            )
          }
        })
      )
    },
  })

  // harusnya pake memoized tapi lagi keburu
  const resepRef = useResepRef()

  useEffect(() => {
    dispatch(getComboResep())
  }, [dispatch])

  useEffect(() => {
    vResep.values.unittujuan &&
      dispatch(getObatFromUnit({ idunit: vResep.values.unittujuan }))
  }, [dispatch, vResep.values.unittujuan])

  useEffect(() => {
    const setFF = vResep.setFieldValue
    setFF('norecap', norecap)
  }, [vResep.setFieldValue, norecap])

  useEffect(() => {
    const setFF = vResep.setFieldValue
    const setV = vResep.setValues
    const resetV = vResep.resetForm

    if (orderNorec) {
      setV({
        ...vResep.initialValues,
        ...orderNorec,
      })
      resepRef.current = orderNorec.resep
    } else {
      resetV()
      setFF('norecap', norecap)
      resepRef.current = [
        {
          ...initValueResep,
        },
      ]
    }
    if (antreanPemeriksaan) {
      setFF('unitasal', antreanPemeriksaan.unitantrean || '')
    }
  }, [
    orderNorec,
    norecresep,
    vResep.setValues,
    vResep.resetForm,
    vResep.setFieldValue,
    norecap,
    orderDp,
    antreanPemeriksaan,
    resepRef,
  ])

  useEffect(() => {
    dispatch(
      getOrderResepFromDp({
        norecdp: norecdp,
        norecresep: norecresep,
        isduplicate: false,
      })
    )
  }, [dispatch, norecdp, norecresep])

  useEffect(() => {
    dispatch(getAntreanPemeriksaanObat({ norecap: norecap }))
  }, [dispatch, norecap])

  return (
    <div className="p-5">
      <DeleteModalCustom
        show={!!unittujuanTemp}
        onDeleteClick={() => {
          vResep.setFieldValue('unittujuan', unittujuanTemp)
          vResep.setFieldValue('resep', [
            {
              ...initValueResep,
            },
          ])
          setunittujuanTemp('')
        }}
        onCloseClick={() => setunittujuanTemp('')}
        msgHDelete="Apa Anda Yakin ?"
        msgBDelete="Dengan mengganti unit, racikan akan terhapus"
        buttonHapus="Ganti"
      />
      <DeleteModalCustom
        show={deleteModal}
        onDeleteClick={() => {
          vResep.resetForm()
          setDeleteModal(false)
          if (searchParams.has('norecresep')) {
            searchParams.delete('norecresep')
            setSearchParams(searchParams)
          }
        }}
        onCloseClick={() => setDeleteModal(false)}
        msgHDelete="Apa Anda Yakin ?"
        msgBDelete={`Yakin ingin hapus ${norecresep ? 'edit' : ''} resep`}
        buttonHapus="Hapus"
      />
      <Row>
        <Col lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`dokter`}
            className="form-label mt-2"
          >
            Dokter
          </Label>
        </Col>
        <Col lg={4}>
          <CustomSelect
            id="dokter"
            name="dokter"
            options={pegawai}
            onChange={(e) => {
              vResep.setFieldValue('dokter', e?.value || '')
              vResep.setFieldValue('namadokter', e?.label || '')
            }}
            value={vResep.values.dokter}
            className={`input ${!!vResep?.errors.dokter ? 'is-invalid' : ''}`}
            isClearEmpty
          />
          {vResep.touched.dokter && !!vResep.errors.dokter ? (
            <FormFeedback type="invalid">
              <div>{vResep.errors.dokter}</div>
            </FormFeedback>
          ) : null}
        </Col>
        <Col lg={2}>
          <Label
            style={{ color: 'black' }}
            htmlFor={`unittujuan`}
            className="form-label mt-2"
          >
            Depo Tujuan
          </Label>
        </Col>
        <Col lg={4}>
          <CustomSelect
            id="unittujuan"
            name="unittujuan"
            options={unit}
            onChange={(e) => {
              if (!vResep.values.unittujuan) {
                vResep.setFieldValue('unittujuan', e?.value || '')
              } else {
                setunittujuanTemp(e?.value || '')
              }
            }}
            value={vResep.values.unittujuan}
            className={`input ${
              !!vResep?.errors.unittujuan ? 'is-invalid' : ''
            }`}
            isClearEmpty
          />
          {vResep.touched.unittujuan && !!vResep.errors.unittujuan && (
            <FormFeedback type="invalid">
              <div>{vResep.errors.unittujuan}</div>
            </FormFeedback>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <TabelResep
          vResep={vResep}
          idunit={vResep.values.unittujuan}
          resepRef={resepRef}
        />
        <Row>
          <Col md={12} className="d-flex justify-content-center gap-3">
            <Button
              color="success"
              disabled={loadingSubmit || loadingGetAllResep}
              onClick={() => {
                vResep.handleSubmit()
              }}
            >
              {(loadingSubmit || loadingGetAllResep) && (
                <Spinner size="sm" className="me-2">
                  {' '}
                  Menyimpan...{' '}
                </Spinner>
              )}
              {!!vResep.values.norecorder ? 'Edit' : 'Simpan'}
            </Button>
            <Button color="danger" onClick={() => setDeleteModal(true)}>
              Batal
            </Button>
          </Col>
        </Row>
      </Row>
      <RiwayatOrder />
    </div>
  )
}

export default OrderResep
