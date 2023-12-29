import * as Yup from 'yup'
import { Button, Input, FormFeedback } from 'reactstrap'
import { useCallback, useEffect, useRef, useState } from 'react'
import CustomSelect from '../Select/Select'
import {
  calculateRounding,
  onChangeStrNbr,
  strToNumber,
} from '../../utils/format'
import { useDispatch, useSelector } from 'react-redux'
import { getObatFromUnitFarmasi } from '../../store/actions'
import { getComboResepGlobal } from '../../store/master/action'

export const TabelResep = ({
  vResep,
  idunit,
  isbebas = false,
  resepRef,
  isQty = true,
  isRacikan = true,
  isAllObat = false,
}) => {
  if (!Array.isArray(vResep?.values?.resep))
    throw new Error('resep harus array')
  if (!resepRef) throw new Error('resepRef kosong')
  const dispatch = useDispatch()
  const { obatList, signa, keteranganResep, sediaanList, allObat } =
    useSelector((state) => ({
      obatList: state.Farmasi.getObatFromUnit.data?.obat || [],
      allObat: state.Farmasi.getObatFromUnit.data?.allObat || [],
      sediaanList: state.Master.getComboResepGlobal.data?.sediaan || [],
      keteranganResep:
        state.Master.getComboResepGlobal.data?.keteranganresep || [],
      signa: state.Master.getComboResepGlobal.data?.signa || [],
    }))

  const {
    handleChangeResep,
    handleChangeObatResep,
    handleChangeRacikan,
    handleQtyObatResep,
    handleQtyRacikan,
    handleChangeObatRacikan,
  } = useHandleChangeResep(resepRef, vResep)

  const {
    handleChangeAllResep,
    handleHapusRacikan,
    handleTambahRacikan,
    handleAddResep,
    handleAddRacikan,
  } = useHandleChangeAllResep(resepRef, vResep)

  const handleBlur = (e) => {
    vResep.setFieldValue('resep', resepRef.current)
  }

  const columnsResep = useColumnsResep(
    vResep,
    obatList,
    allObat,
    handleChangeObatResep,
    sediaanList,
    handleChangeResep,
    handleBlur,
    handleQtyObatResep,
    signa,
    keteranganResep,
    resepRef,
    handleChangeAllResep,
    !idunit && !isAllObat,
    isQty,
    isAllObat
  )

  const columnsResepRacikan = useColumnsResepRacikan(
    vResep,
    obatList,
    allObat,
    handleChangeObatRacikan,
    handleQtyRacikan,
    handleBlur,
    handleChangeRacikan,
    handleTambahRacikan,
    handleHapusRacikan,
    !idunit && !isAllObat,
    isQty,
    isAllObat
  )

  useEffect(() => {
    dispatch(
      getObatFromUnitFarmasi({
        idunit: idunit,
        isbebas: isbebas,
      })
    )
  }, [dispatch, idunit, isbebas])

  useEffect(() => {
    dispatch(getComboResepGlobal())
  }, [dispatch])

  const resepNonRacikan = vResep.values.resep.filter(
    (val) => val.racikan.length === 0
  )
  const resepRacikan = vResep.values.resep.filter(
    (val) => val.racikan.length > 0
  )
  return (
    <table className="table" width={'fit-content'}>
      <thead style={{ width: '100%' }}>
        <tr style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          {columnsResep.map((col, index) => (
            <th scope="col" key={index} style={{ width: col.width || '200px' }}>
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <td style={{ width: '5%' }}></td>
          <td colSpan={2} style={{ width: '95%', display: 'flex' }}>
            <h1
              style={{
                color: '#6699ff',
                fontWeight: 'bold',
                fontSize: '15px',
                width: '100px',
                marginBottom: '0px',
                marginTop: '7px',
              }}
            >
              Non Racikan
            </h1>
            <Button
              color={'info'}
              style={{ border: 'none', width: 'fit-content' }}
              onClick={handleAddResep}
            >
              +
            </Button>
          </td>
        </tr>
      </tbody>
      <tbody style={{ width: '100%' }}>
        {resepNonRacikan.map((value, key) => (
          <tr
            key={key}
            style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
          >
            {columnsResep.map((col, index) => {
              return (
                <td key={index} style={{ width: col.width || '200px' }}>
                  <col.Cell row={value} />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
      {isRacikan && (
        <>
          <tbody>
            <tr
              style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
            >
              <td style={{ width: '5%' }}></td>
              <td colSpan={2} style={{ width: '95%', display: 'flex' }}>
                <h1
                  style={{
                    color: '#6699ff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    width: '100px',
                    marginBottom: '0px',
                    marginTop: '7px',
                  }}
                >
                  Racikan
                </h1>
                <Button
                  color={'info'}
                  style={{ border: 'none', width: 'fit-content' }}
                  onClick={handleAddRacikan}
                >
                  +
                </Button>
              </td>
            </tr>
          </tbody>
          <tbody style={{ width: '100%' }}>
            {resepRacikan.map((value, key) => (
              <>
                <tr
                  key={key}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {columnsResep.map((col, index) => {
                    return (
                      <td key={index} style={{ width: col.width || '200px' }}>
                        <col.Cell row={value} />
                      </td>
                    )
                  })}
                </tr>
                {value.racikan.map((valueRacikan, keySub) => (
                  <tr
                    key={`${key}-${keySub}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    {columnsResepRacikan.map((col, index) => {
                      return (
                        <td key={index} style={{ width: col.width || '200px' }}>
                          <col.Cell
                            key={index}
                            row={valueRacikan}
                            rowUtama={value}
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </>
      )}
    </table>
  )
}

export const initValueResep = {
  norecdetail: '',
  obat: '',
  namaobat: '',
  satuanobat: '',
  namasatuan: '',
  koder: 1,
  qty: '',
  qtyracikan: '',
  qtypembulatan: '',
  qtyjumlahracikan: '',
  stok: '',
  sediaan: '',
  namasediaan: '',
  harga: '',
  total: '',
  signa: '',
  keterangan: '',
  namaketerangan: '',
  nobatch: '',
  racikan: [],
}

export const useResepRef = () => {
  const resepRef = useRef([
    {
      ...initValueResep,
    },
  ])
  return resepRef
}

export const validationResep = (isQty = true) =>
  Yup.array().of(
    Yup.object().shape({
      obat: Yup.string().when('racikan', {
        is: (val) => val.length === 0,
        then: () => Yup.string().required('Obat harus diisi'),
      }),
      qty: isQty ? Yup.string().required('Qty harus diisi') : Yup.string(),
      sediaan: isQty
        ? Yup.string().required('Sediaan harus diisi')
        : Yup.string(),
      signa: Yup.string().required('Signa harus diisi'),
      keterangan: Yup.string().required('Keterangan harus diisi'),
      racikan: Yup.array().of(
        Yup.object().shape({
          obat: Yup.string().required('Obat harus diisi'),
          qtyracikan: isQty
            ? Yup.string().required('Qty Racikan harus diisi')
            : Yup.string(),
        })
      ),
    })
  )

export const initValueRacikan = {
  ...initValueResep,
  racikan: undefined,
}

export const useHandleChangeResep = (resepRef, vResep) => {
  // untuk sekarang dirounding menjadi 100 rupiah
  const roundingTotal = 0
  const handleChangeResep = useCallback(
    (newVal, field, row, isSet) => {
      const newReseps = [...resepRef.current]
      const newResep = { ...newReseps[row.koder - 1] }
      newResep[field] = newVal
      newReseps[row.koder - 1] = newResep
      resepRef.current = newReseps
      if (isSet) {
        vResep.setFieldValue('resep', resepRef.current)
      }
    },
    [vResep, resepRef]
  )

  const handleChangeObatResep = useCallback(
    (e, row) => {
      handleChangeResep(e?.value || '', 'obat', row, true)
      handleChangeResep(e?.label || '', 'namaobat', row, true)
      handleChangeResep(e?.satuanid || '', 'satuanobat', row, true)
      handleChangeResep(e?.namasatuan || '', 'namasatuan', row, true)
      handleChangeResep(e?.sediaanid || '', 'sediaan', row, true)
      handleChangeResep(e?.namasediaan || '', 'namasediaan', row, true)
      handleChangeResep(e?.totalstok || '', 'stok', row, true)
      const harga = e?.batchstokunit?.[0]?.harga || 0
      const nobatch = e?.batchstokunit?.[0]?.nobatch || ''
      // hitung harga
      let totalHarga = harga * 1.25 * (row.qty || 0) || 0
      const [roundedHarga, difference] = calculateRounding(
        totalHarga,
        roundingTotal
      )
      handleChangeResep(roundedHarga, 'total', row, true)
      handleChangeResep(harga || '', 'harga', row, true)
      handleChangeResep(nobatch || '', 'nobatch', row, true)
    },
    [handleChangeResep]
  )

  const handleChangeRacikan = useCallback(
    (newVal, field, rowUtama, rowRacikan, isSet) => {
      const newReseps = [...resepRef.current]
      const newResep = { ...newReseps[rowUtama.koder - 1] }
      const newRacikan = { ...newResep.racikan[rowRacikan.koder - 1] }
      newRacikan[field] = newVal
      newResep.racikan[rowRacikan.koder - 1] = newRacikan
      newReseps[rowUtama.koder - 1] = newResep
      resepRef.current = newReseps
      if (isSet) {
        vResep.setFieldValue('resep', newReseps)
      }
    },
    [resepRef, vResep]
  )

  const handleQtyObatResep = (e, row, val, setVal) => {
    let newVal = onChangeStrNbr(e.target.value, val)
    if (
      strToNumber(newVal) > strToNumber(row.stok) &&
      row.racikan.length === 0
    ) {
      newVal = row.stok
    }
    setVal(newVal)
    handleChangeResep(newVal, 'qty', row)
    handleChangeResep(newVal, 'qtypembulatan', row)
    let totalHarga = row.harga * (strToNumber(newVal) || 0) * 1.25 || 0
    const [roundedHarga, difference] = calculateRounding(
      totalHarga,
      roundingTotal
    )
    handleChangeResep(roundedHarga, 'total', row)
    row.racikan.forEach((valRacikan) => {
      let totalQty =
        strToNumber(valRacikan.qtyracikan) * (strToNumber(newVal) || 0)
      totalQty = Number(totalQty.toFixed(6))
      const qtyBulat = Math.ceil(totalQty)
      let qtyPembulatan = qtyBulat - totalQty

      qtyPembulatan = Number(qtyPembulatan.toFixed(6))
      let totalHargaRacikan =
        valRacikan.harga * 1.25 * strToNumber(qtyBulat) || 0
      const [roundedHarga, difference] = calculateRounding(
        totalHargaRacikan,
        roundingTotal
      )
      handleChangeRacikan(qtyBulat, 'qtypembulatan', row, valRacikan)
      handleChangeRacikan(qtyPembulatan, qtyBulat, row, valRacikan)
      handleChangeRacikan(roundedHarga, 'total', row, valRacikan)
      handleChangeRacikan(totalQty, 'qty', row, valRacikan)
    })
  }

  const handleQtyRacikan = useCallback(
    (e, row, rowUtama, val, setVal) => {
      const newVal = onChangeStrNbr(e.target.value, val)
      let qtyTotal = strToNumber(rowUtama.qty || 0) * strToNumber(newVal || 0)
      qtyTotal = Number(qtyTotal.toFixed(6))
      const qtyBulat = Math.ceil(qtyTotal)
      let qtyPembulatan = qtyBulat - qtyTotal
      qtyPembulatan = Number(qtyPembulatan.toFixed(6))
      handleChangeRacikan(newVal, 'qtyracikan', rowUtama, row)
      handleChangeRacikan(qtyTotal, 'qty', rowUtama, row)
      handleChangeRacikan(qtyBulat, 'qtypembulatan', rowUtama, row)
      let totalHarga = row.harga * 1.25 * strToNumber(qtyBulat) || 0
      const [roundedHarga, difference] = calculateRounding(
        totalHarga,
        roundingTotal
      )
      handleChangeRacikan(roundedHarga, 'total', rowUtama, row)
      // set val, value yang ada di dalam input
      setVal(newVal)
    },
    [handleChangeRacikan]
  )

  const handleChangeObatRacikan = (e, row, rowUtama) => {
    handleChangeRacikan(e?.value || '', 'obat', rowUtama, row, true)
    handleChangeRacikan(e?.label || '', 'namaobat', rowUtama, row, true)
    handleChangeRacikan(e?.satuanid || '', 'satuanobat', rowUtama, row, true)
    handleChangeRacikan(e?.namasatuan || '', 'namasatuan', rowUtama, row, true)
    handleChangeRacikan(e?.totalstok || '', 'stok', rowUtama, row, true)
    const harga = e?.batchstokunit?.[0]?.harga || 0
    let qtyTotal =
      strToNumber(rowUtama.qty || 0) * strToNumber(row.qtyracikan || 0)
    qtyTotal = Math.ceil(qtyTotal)
    const totalHarga = harga * 1.25 * qtyTotal
    const [roundedHarga, difference] = calculateRounding(
      totalHarga,
      roundingTotal
    )
    handleChangeRacikan(qtyTotal, 'qty', rowUtama, row, true)
    handleChangeRacikan(roundedHarga, 'total', rowUtama, row, true)
    handleChangeRacikan(harga || '', 'harga', rowUtama, row, true)
  }

  return {
    handleChangeResep,
    handleChangeObatResep,
    handleChangeRacikan,
    handleQtyObatResep,
    handleQtyRacikan,
    handleChangeObatRacikan,
  }
}

export const useHandleChangeAllResep = (resepRef, vResep) => {
  const handleChangeAllResep = useCallback(
    (newVal) => {
      let newResep = [...newVal]
      //diurutkan agar non racikan yang duluan
      newResep = newResep.sort((a, b) => {
        if (a.racikan.length > 0 && b.racikan.length === 0) return 1
        if (a.racikan.length === 0 && b.racikan.length > 0) return -1
        return 0
      })
      newResep = newResep.map((val, key) => {
        val.koder = key + 1
        val.racikan = val.racikan.map((valRacikan, keyRacikan) => {
          valRacikan.koder = keyRacikan + 1
          return valRacikan
        })
        return val
      })

      resepRef.current = newResep
      vResep.setFieldValue('resep', newResep)
    },
    [resepRef, vResep]
  )

  const handleHapusRacikan = (row, rowUtama) => {
    if (rowUtama.racikan.length === 1) return
    const newReseps = [...resepRef.current]
    const newResep = { ...newReseps[rowUtama.koder - 1] }
    const newRacikans = [...newResep.racikan]
    newRacikans.splice(row.koder - 1, 1)
    newResep.racikan = newRacikans
    newReseps[rowUtama.koder - 1] = newResep
    handleChangeAllResep(newReseps)
  }

  const handleTambahRacikan = (row, rowUtama) => {
    const newReseps = [...resepRef.current]
    const newResep = { ...newReseps[rowUtama.koder - 1] }
    const newRacikans = [...newResep.racikan]
    const newRacikan = { ...initValueRacikan }
    newRacikans.push(newRacikan)
    newResep.racikan = newRacikans
    newReseps[rowUtama.koder - 1] = newResep
    handleChangeAllResep(newReseps)
  }

  const handleAddResep = () => {
    const newValue = { ...initValueResep }
    const newResep = [...resepRef.current, { ...newValue }]
    handleChangeAllResep(newResep)
  }

  const handleAddRacikan = () => {
    const newValue = { ...initValueResep }
    newValue.racikan = [{ ...initValueRacikan }]
    const newResep = [...resepRef.current, { ...newValue }]
    handleChangeAllResep(newResep)
  }

  return {
    handleChangeAllResep,
    handleHapusRacikan,
    handleTambahRacikan,
    handleAddResep,
    handleAddRacikan,
  }
}

export const useColumnsResep = (
  vResep,
  obatList,
  allObat,
  handleChangeObatResep,
  sediaanList,
  handleChangeResep,
  handleBlur,
  handleQtyObatResep,
  signa,
  keteranganResep,
  resepRef,
  handleChangeAllResep,
  disableObat = false,
  isQty = true,
  isAllObat = false
) => {
  const column = [
    {
      name: <span className="font-weight-bold fs-13">R/</span>,
      Cell: ({ row }) => row.koder,
      width: '5%',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Obat</span>,
      Cell: ({ row }) => {
        const errorsResep = vResep.errors?.resep?.[row.koder - 1]
        const touchedResep = vResep.touched?.resep?.[row.koder - 1]
        if (row.racikan.length === 0) {
          return (
            <div>
              <CustomSelect
                id="obat"
                name="obat"
                options={isAllObat ? allObat : obatList}
                onChange={(e) => handleChangeObatResep(e, row)}
                value={row.obat}
                isDisabled={disableObat}
                className={`input ${
                  touchedResep?.obat && !!errorsResep?.obat ? 'is-invalid' : ''
                }`}
              />
              {touchedResep?.obat && !!errorsResep?.obat && (
                <FormFeedback type="invalid">
                  <div>{errorsResep?.obat}</div>
                </FormFeedback>
              )}
              {isQty && (
                <div>
                  <span>Stok: {row.stok}</span>
                </div>
              )}
            </div>
          )
        }
        return (
          <div>
            <CustomSelect
              id="sediaan"
              name="sediaan"
              options={sediaanList}
              onChange={(e) => {
                handleChangeResep(e?.value || '', 'sediaan', row, true)
                handleChangeResep(e?.label || '', 'namasediaan', row, true)
              }}
              value={row.sediaan}
              className={`input ${
                touchedResep?.sediaan && !!errorsResep?.sediaan
                  ? 'is-invalid'
                  : ''
              }`}
            />
            {touchedResep?.sediaan && !!errorsResep?.sediaan && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.sediaan}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '23%',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      Cell: ({ row }) => {
        const errorsResep = vResep.errors?.resep?.[row.koder - 1]
        const touchedResep = vResep.touched?.resep?.[row.koder - 1]
        const [val, setVal] = useState(row.qty)
        return (
          <div>
            <Input
              id={`qty-${row.koder}`}
              name={`qty`}
              type="text"
              value={val}
              onBlur={handleBlur}
              disabled={!row.obat && !row.sediaan}
              onChange={(e) => handleQtyObatResep(e, row, val, setVal)}
              invalid={touchedResep?.qty && !!errorsResep?.qty}
            />
            {touchedResep?.qty && !!errorsResep?.qty && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.qty}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '10%',
    },
    {
      name: <span className="font-weight-bold fs-13">Sediaan</span>,
      Cell: ({ row }) => {
        return <div>{row.namasatuan}</div>
      },
      width: '10%',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      Cell: ({ row }) => {
        const errorsResep = vResep.errors?.resep?.[row.koder - 1]
        const touchedResep = vResep.touched?.resep?.[row.koder - 1]
        const totalRacikan = row.racikan.reduce((prev, val) => {
          return prev + (strToNumber(val.total) || 0)
        }, 0)
        const initValue = row.racikan.length > 0 ? totalRacikan : row.total
        const [val, setVal] = useState(initValue)
        return (
          <div>
            <Input
              id={`harga-${row.koder}`}
              name={`harga`}
              type="text"
              value={val}
              onBlur={handleBlur}
              disabled
              onChange={(e) => {
                const newVal = onChangeStrNbr(e.target.value, val)
                setVal(newVal)
                handleChangeResep(newVal, 'harga', row)
              }}
              invalid={touchedResep?.harga && !!errorsResep?.harga}
            />
            {touchedResep?.harga && !!errorsResep?.qty && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.harga}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '10%',
    },
    {
      name: <span className="font-weight-bold fs-13">Signa</span>,
      Cell: ({ row }) => {
        const errorsResep = vResep.errors?.resep?.[row.koder - 1]
        const touchedResep = vResep.touched?.resep?.[row.koder - 1]
        return (
          <div>
            <CustomSelect
              id={`signa-${row.koder}`}
              name={`signa-${row.koder}`}
              options={signa}
              onChange={(e) => {
                const newVal = e?.value || ''
                handleChangeResep(newVal, 'signa', row, true)
              }}
              value={row.signa}
              className={`input ${!!errorsResep?.signa ? 'is-invalid' : ''}`}
            />
            {touchedResep?.signa && !!errorsResep?.signa && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.signa}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '17%',
    },
    {
      name: <span className="font-weight-bold fs-13">Keterangan</span>,
      Cell: ({ row }) => {
        const errorsResep = vResep.errors?.resep?.[row.koder - 1]
        const touchedResep = vResep.touched?.resep?.[row.koder - 1]
        return (
          <div>
            <CustomSelect
              id={`keterangan-${row.koder}`}
              name={`keterangan-${row.koder}`}
              options={keteranganResep}
              onChange={(e) => {
                const newVal = e?.value || ''
                handleChangeResep(newVal, 'keterangan', row, true)
                handleChangeResep(e?.label || '', 'namaketerangan', row, true)
              }}
              value={row.keterangan}
              className={`input ${
                !!errorsResep?.keterangan ? 'is-invalid' : ''
              }`}
            />
            {touchedResep?.keterangan && !!errorsResep?.keterangan && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.keterangan}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '15%',
    },
    {
      name: <span className="font-weight-bold fs-13">Hapus</span>,
      Cell: ({ row }) => {
        return (
          <div>
            <Button
              color="danger"
              onClick={() => {
                if (resepRef.current.length === 1) return
                const newResep = [...resepRef.current]
                newResep.splice(row.koder - 1, 1)
                handleChangeAllResep(newResep)
              }}
            >
              -
            </Button>
          </div>
        )
      },
      width: '10%',
    },
  ]
  if (!isQty) {
    column.splice(2, 3) // qty, sediaan, harga
  }
  return column
}

export const useColumnsResepRacikan = (
  vResep,
  obatList,
  allObat,
  handleChangeObatRacikan,
  handleQtyRacikan,
  handleBlur,
  handleChangeRacikan,
  handleTambahRacikan,
  handleHapusRacikan,
  disableObat = false,
  isQty = true,
  isAllObat = false
) => {
  const column = [
    {
      name: <span className="font-weight-bold fs-13">R/</span>,
      Cell: ({ row, rowUtama }) => `${rowUtama.koder}.${row.koder}`,
      width: '5%',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Obat</span>,
      Cell: ({ row, rowUtama }) => {
        const errorsResep =
          vResep.errors?.resep?.[rowUtama.koder - 1]?.racikan?.[row.koder - 1]
        const touchedResep =
          vResep.touched?.resep?.[rowUtama.koder - 1]?.racikan?.[row.koder - 1]
        return (
          <div>
            <CustomSelect
              id="obat"
              name="obat"
              options={isAllObat ? allObat : obatList}
              isDisabled={disableObat}
              onChange={(e) => handleChangeObatRacikan(e, row, rowUtama)}
              value={row.obat}
              className={`input row-header ${
                !!errorsResep?.obat ? 'is-invalid' : ''
              }`}
            />
            {touchedResep?.obat && !!errorsResep?.obat && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.obat}</div>
              </FormFeedback>
            )}
            {isQty && (
              <div>
                <span>Stok: {row.stok}</span>
              </div>
            )}
          </div>
        )
      },
      width: '15%',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      Cell: ({ row, rowUtama }) => {
        const errorsResep =
          vResep.errors?.resep?.[rowUtama.koder - 1]?.racikan?.[row.koder - 1]
        const touchedResep =
          vResep.touched?.resep?.[rowUtama.koder - 1]?.racikan?.[row.koder - 1]
        const [val, setVal] = useState(row.qtyracikan)
        return (
          <div>
            <Input
              id={`qty-${row.koder}`}
              name={`qty`}
              type="text"
              value={val}
              onChange={(e) => {
                handleQtyRacikan(e, row, rowUtama, val, setVal)
              }}
              onBlur={handleBlur}
              invalid={touchedResep?.qtyracikan && !!errorsResep?.qtyracikan}
            />
            {touchedResep?.qtyracikan && !!errorsResep?.qtyracikan && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.qtyracikan}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '8%',
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      Cell: ({ row }) => (
        <>
          <p className="mb-0">/1 racikan</p>
          <p className="mb-0">
            {row.qty} {row.namasatuan}
          </p>
        </>
      ),
      width: '10%',
    },
    {
      name: <span className="font-weight-bold fs-13">Sediaan</span>,
      Cell: ({ row }) => <div></div>,
      width: '10%',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      Cell: ({ row, rowUtama }) => {
        const errorsResep =
          vResep.errors?.resep?.[rowUtama.koder - 1]?.racikan?.[row.koder - 1]
        const touchedResep =
          vResep.touched?.resep?.[rowUtama.koder - 1]?.racikan?.[row.koder - 1]
        const [val, setVal] = useState(row.total)
        return (
          <div>
            <Input
              id={`harga-${row.koder}`}
              name={`harga`}
              type="text"
              value={val}
              disabled
              onBlur={handleBlur}
              onChange={(e) => {
                const newVal = onChangeStrNbr(e.target.value, val)
                setVal(newVal)
                handleChangeRacikan(newVal, 'harga', rowUtama, row)
              }}
              invalid={touchedResep?.harga && !!errorsResep?.harga}
            />
            {touchedResep?.harga && !!errorsResep?.qty && (
              <FormFeedback type="invalid">
                <div>{errorsResep?.harga}</div>
              </FormFeedback>
            )}
          </div>
        )
      },
      width: '10%',
    },
    {
      name: <span className="font-weight-bold fs-13">Signa</span>,
      Cell: ({ row }) => <div></div>,
      width: !isQty ? '25%' : '27%',
    },
    {
      name: <span className="font-weight-bold fs-13">Tambah</span>,
      Cell: ({ row, rowUtama }) => {
        if (row.koder !== rowUtama.racikan.length) {
          return <div></div>
        }
        return (
          <div>
            <Button
              color="success"
              onClick={() => handleTambahRacikan(row, rowUtama)}
            >
              +
            </Button>
          </div>
        )
      },
      width: '5%',
    },
    {
      name: <span className="font-weight-bold fs-13">Hapus</span>,
      Cell: ({ row, rowUtama }) => {
        return (
          <div>
            <Button
              color="danger"
              onClick={() => handleHapusRacikan(row, rowUtama)}
            >
              -
            </Button>
          </div>
        )
      },
      width: '10%',
    },
  ]
  if (!isQty) {
    column.splice(2, 2)
    column.splice(3, 1)
  }
  return column
}
