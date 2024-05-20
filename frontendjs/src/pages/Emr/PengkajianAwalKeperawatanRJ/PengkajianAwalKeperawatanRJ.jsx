import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import {
  getComboAsesmenAwalKeperawatan,
  upsertAsesmenAwalKeperawatan,
  getListPengkajianAwalKeperawatan,
  upsertCondition,
  upsertAlergi,
  getComboKfa,
} from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const PengkajianAwalKeperawatanRJ = () => {
  const { norecdp, norecap } = useParams()
  const dispatch = useDispatch()
  const {
    dataCombo,
    loadingCombo,
    successCombo,
    dataRiwayat,
    loadingRiwayat,
    successRiwayat,
    dataComboKfa,
  } = useSelector((state) => ({
    dataCombo: state.Emr.getComboAsesmenAwalKeperawatan.data || [],
    loadingCombo: state.Emr.getComboAsesmenAwalKeperawatan.loading,
    successCombo: state.Emr.getComboAsesmenAwalKeperawatan.success,
    dataRiwayat: state.Emr.getListPengkajianAwalKeperawatan.data || [],
    loadingRiwayat: state.Emr.getListPengkajianAwalKeperawatan.loading,
    successRiwayat: state.Emr.getListPengkajianAwalKeperawatan.success,
    dataComboKfa: state.Emr.getComboKfa.data || [],
    loadingComboKfa: state.Emr.getComboKfa.loading,
    successComboKfa: state.Emr.getComboKfa.success,
  }))
  useEffect(() => {
    dispatch(getComboAsesmenAwalKeperawatan())
    dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }))
  }, [norecdp, dispatch])
  const [dateNow] = useState(() => new Date().toISOString())
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecdp: norecdp,
      norecap: norecap,
      norec: '',
      sumberdata: '',
      alergi: '',
      alergiObat: '',
      codealergiObat: '',
      displayalergiObat: '',
      tanggalPemeriksaan: '',
      keluhanUtama: '',
      keluhanUtamaText: '',
      idlabel: 5,
      label: 'PENGKAJIANAWALKEPERAWATAN',
      psikologis: '',
      psikologistegang: 0,
      psikologiscemas: 0,
      psikologistakut: 0,
      psikologismarah: 0,
      psikologissedih: 0,
      psikologisdepresi: 0,
      psikologisagresif: 0,
      psikologismelukaids: 0,
      psikologismelukaiol: 0,
      psikologistenang: 0,
    },
    validationSchema: Yup.object({
      // sumberdata: Yup.string().required("Tipe Diagnosa Belum Diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      let tempPsikologis = {
        tegang: values.psikologistegang,
        cemas: values.psikologiscemas,
        takut: values.psikologistakut,
        marah: values.psikologismarah,
        sedih: values.psikologissedih,
        depresi: values.psikologisdepresi,
        agresif: values.psikologisagresif,
        melukaids: values.psikologismelukaids,
        melukaiol: values.psikologismelukaiol,
        tenang: values.psikologistenang,
      }
      values.psikologis = tempPsikologis
      if (values.tanggalPemeriksaan === '') {
        values.tanggalPemeriksaan = dateNow
      }
      dispatch(
        upsertAsesmenAwalKeperawatan(values, () => {
          dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }))
          resetForm()
        })
      )
      // resetForm()
    },
  })
  const [dataSumberData, setdataSumberData] = useState([])
  useEffect(() => {
    if (dataCombo?.sumberdata) {
      setdataSumberData(dataCombo?.sumberdata)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCombo, validation.setFieldValue])

  const changeSumberData = (newvalue) => {
    let newArrayBed = dataCombo?.sumberdata
    newArrayBed.forEach((element) => {
      if (element.value === newvalue) {
        element.cheked = true
      } else {
        element.cheked = false
      }
    })
    setdataSumberData(newArrayBed)
    validation.setFieldValue('sumberdata', newvalue)
  }

  const [stateTidak, setstateTidak] = useState(true)
  const [stateYa, setstateYa] = useState(false)
  const [stateTidakObat, setstateTidakObat] = useState(true)
  const [stateYaObat, setstateYaObat] = useState(false)
  const taskAlergi = [
    {
      id: 4,
      label: 'Ya',
      value: stateYa,
    },
    {
      id: 5,
      label: 'Tidak',
      value: stateTidak,
    },
  ]
  const taskAlergiObat = [
    {
      id: 6,
      label: 'Ya',
      value: stateYaObat,
    },
    {
      id: 7,
      label: 'Tidak',
      value: stateTidakObat,
    },
  ]
  const [dataAlergi, setdataAlergi] = useState(taskAlergi)
  const [dataAlergiObat, setdataAlergiObat] = useState(taskAlergiObat)
  const changeAlergi = (newvalue) => {
    let newArrayBed = taskAlergi
    newArrayBed.forEach((element) => {
      if (element.id === newvalue) {
        element.value = true
      } else {
        element.value = false
      }
    })
    if (newvalue === 4) {
      setstateYa(true)
      setstateTidak(false)
    } else {
      setstateYa(false)
      setstateTidak(true)
    }
    setdataAlergi(newArrayBed)
  }
  const changeAlergiObat = (newvalue) => {
    let newArrayBed = taskAlergiObat
    newArrayBed.forEach((element) => {
      if (element.id === newvalue) {
        element.value = true
      } else {
        element.value = false
      }
    })
    if (newvalue === 6) {
      setstateYaObat(true)
      setstateTidakObat(false)
    } else {
      setstateYaObat(false)
      setstateTidakObat(true)
    }
    setdataAlergiObat(newArrayBed)
  }
  const handleClickKeluhanUtama = (e) => {
    let tempValue = {
      norec: e.norec,
      code: e.codekeluhan,
      display: e.displaykeluhan,
      norecdp: norecdp,
      status: 'keluhanutama',
      ihs_keluhan: e.ihs_keluhan,
    }
    dispatch(
      upsertCondition(tempValue, () => {
        dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }))
      })
    )
  }
  const handleClickAlergi = (e) => {
    let tempValue = {
      norec: e.norec,
      code: e.codealergi,
      display: e.displayalergi,
      norecdp: norecdp,
      status: 'alergi',
      ihs_alergi: e.ihs_alergi,
    }
    dispatch(
      upsertAlergi(tempValue, () => {
        dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }))
      })
    )
  }
  const handleClickAlergiObat = (e) => {
    let tempValue = {
      norec: e.norec,
      code: e.codekfa,
      display: e.displaykfa,
      norecdp: norecdp,
      status: 'alergiobat',
      ihs_alergi: e.ihs_alergi,
    }
    dispatch(
      upsertAlergi(tempValue, () => {
        dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }))
      })
    )
  }
  const changePsikologisTegang = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologistegang', 1)
    } else {
      validation.setFieldValue('psikologistegang', 0)
    }
  }
  const changePsikologisCemas = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologiscemas', 2)
    } else {
      validation.setFieldValue('psikologiscemas', 0)
    }
  }
  const changePsikologisTakut = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologistakut', 3)
    } else {
      validation.setFieldValue('psikologistakut', 0)
    }
  }
  const changePsikologisMarah = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologismarah', 4)
    } else {
      validation.setFieldValue('psikologismarah', 0)
    }
  }
  const changePsikologisSedih = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologissedih', 5)
    } else {
      validation.setFieldValue('psikologissedih', 0)
    }
  }
  const changePsikologisDepresi = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologisdepresi', 6)
    } else {
      validation.setFieldValue('psikologisdepresi', 0)
    }
  }
  const changePsikologisAgresif = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologisagresif', 7)
    } else {
      validation.setFieldValue('psikologisagresif', 0)
    }
  }
  const changePsikologisMelukaids = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologismelukaids', 8)
    } else {
      validation.setFieldValue('psikologismelukaids', 0)
    }
  }
  const changePsikologisMelukaiol = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologismelukaiol', 9)
    } else {
      validation.setFieldValue('psikologismelukaiol', 0)
    }
  }
  const changePsikologisTenang = (e) => {
    if (e === true) {
      validation.setFieldValue('psikologistenang', 10)
    } else {
      validation.setFieldValue('psikologistenang', 0)
    }
  }
  const handleClick = (e) => {
    validation.setFieldValue('norec', e.norec)
    validation.setFieldValue('sumberdata', e.objectsumberdatafk)
    validation.setFieldValue(
      'psikologistegang',
      e.objectstatuspsikologisfk.tegang
    )
    validation.setFieldValue(
      'psikologiscemas',
      e.objectstatuspsikologisfk.cemas
    )
    validation.setFieldValue(
      'psikologistakut',
      e.objectstatuspsikologisfk.takut
    )
    validation.setFieldValue(
      'psikologismarah',
      e.objectstatuspsikologisfk.marah
    )
    validation.setFieldValue(
      'psikologissedih',
      e.objectstatuspsikologisfk.sedih
    )
    validation.setFieldValue(
      'psikologisdepresi',
      e.objectstatuspsikologisfk.depresi
    )
    validation.setFieldValue(
      'psikologisagresif',
      e.objectstatuspsikologisfk.agresif
    )
    validation.setFieldValue(
      'psikologismelukaids',
      e.objectstatuspsikologisfk.melukaids
    )
    validation.setFieldValue(
      'psikologismelukaiol',
      e.objectstatuspsikologisfk.melukaiol
    )
    validation.setFieldValue(
      'psikologistenang',
      e.objectstatuspsikologisfk.tenang
    )
    validation.setFieldValue('alergi', e.objectterminologialergifk)
    validation.setFieldValue('alergiObat', e.objectalergiobatfk)
    validation.setFieldValue('tanggalPemeriksaan', e.tglinput_ihs)
    validation.setFieldValue('keluhanUtama', e.objectterminologikeluhanfk)
    validation.setFieldValue('keluhanUtamaText', e.keluhanutama)
    let newArrayBed = dataCombo?.sumberdata
    newArrayBed.forEach((element) => {
      if (element.value === e.objectsumberdatafk) {
        element.cheked = true
      } else {
        element.cheked = false
      }
    })
    setdataSumberData(newArrayBed)
    let newArrayAlergi = taskAlergi
    let yaAlergi = false
    if (e.objectterminologialergifk !== null) {
      setstateYa(true)
      setstateTidak(false)
      yaAlergi = true
    }
    newArrayAlergi.forEach((element) => {
      if (element.id === 4 && yaAlergi === true) {
        element.value = true
      } else {
        element.value = false
      }
    })
    setdataAlergi(newArrayAlergi)
    console.log(e)
  }
  const columns = [
    // {
    //   name: <span className='font-weight-bold fs-13'>Detail</span>,
    //   sortable: false,
    //   cell: (data) => {
    //     return (
    //       <div className="hstack gap-3 flex-wrap">
    //         <UncontrolledDropdown className="dropdown d-inline-block">
    //           <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button"
    //           //  onClick={() => onClickDelete(data)}
    //           >
    //             <i className="ri-delete-bin-2-line"></i>
    //           </DropdownToggle>
    //         </UncontrolledDropdown>
    //         <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip>
    //       </div>
    //     );
    //   },
    //   width: "50px"
    // },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: '140px',
      cell: (data) => {
        return (
          // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
          <button
            type="button"
            className="btn btn-sm btn-soft-info"
            onClick={() => handleClick(data)}
          >
            {data.noregistrasi}
          </button>
        )
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Input</span>,
      selector: (row) => row.tglinput,
      sortable: true,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Keluhan</span>,
      selector: (row) => row.keluhanutama,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Snomed Keluhan</span>,
      // selector: row => row.displaykeluhan,
      sortable: true,
      selector: (data) => {
        return (
          <button
            type="button"
            className={'btn btn-sm ' + data.status_keluhan}
            onClick={() => handleClickKeluhanUtama(data)}
          >
            {data.displaykeluhan}
          </button>
        )
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Snomed Alergi</span>,
      // selector: row => row.displayalergi,
      sortable: true,
      selector: (data) => {
        return (
          <button
            type="button"
            className={'btn btn-sm ' + data.status_alergi}
            onClick={() => handleClickAlergi(data)}
          >
            {data.displayalergi}
          </button>
        )
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Snomed Alergi Obat</span>,
      // selector: row => row.displayalergi,
      sortable: true,
      selector: (data) => {
        return (
          <button
            type="button"
            className={'btn btn-sm ' + data.status_alergi_obat}
            onClick={() => handleClickAlergiObat(data)}
          >
            {data.displaykfa}
          </button>
        )
      },
    },
  ]
  const handleComboKfa = (characterEntered) => {
    if (characterEntered.length > 3) {
      dispatch(getComboKfa({ nama: characterEntered }))
    }
  }
  return (
    <React.Fragment>
      <Row className="gy-4 p-3">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="card-header-snb ">
                <h4 className="card-title mb-0" style={{ color: 'black' }}>
                  History Pengkajian Awal Keperawatan
                </h4>
              </CardHeader>
              <CardBody>
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="330px"
                    columns={columns}
                    pagination
                    data={dataRiwayat || []}
                    progressPending={loadingRiwayat}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader className="card-header-snb ">
                <h4 className="card-title mb-0" style={{ color: 'black' }}>
                  Pengkajian Awal Keperawatan
                </h4>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                  className="gy-4"
                  action="#"
                >
                  <Row className="gy-2">
                    <Col lg={12}>
                      <Row>
                        <Col lg={3}>
                          <div className="mt-2">
                            <Label
                              style={{ color: 'black' }}
                              htmlFor="tipediagnosa"
                              className="form-label"
                            >
                              Tanggal Pemeriksaan
                            </Label>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <KontainerFlatpickr
                            isError={
                              validation.touched?.tanggalPemeriksaan &&
                              !!validation.errors?.tanggalPemeriksaan
                            }
                            id="tanggalPemeriksaan"
                            options={{
                              dateFormat: 'Y-m-d H:i',
                              defaultDate: 'today',
                              enableTime: true,
                              time_24hr: true,
                            }}
                            value={
                              validation.values.tanggalPemeriksaan || dateNow
                            }
                            onChange={([newDate]) => {
                              validation.setFieldValue(
                                'tanggalPemeriksaan',
                                newDate.toISOString()
                              )
                            }}
                          />
                          {validation.touched?.tanggalPemeriksaan &&
                            !!validation.errors.tanggalPemeriksaan && (
                              <FormFeedback type="invalid">
                                <div>
                                  {validation.errors.tanggalPemeriksaan}
                                </div>
                              </FormFeedback>
                            )}
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label
                          style={{ color: 'black' }}
                          htmlFor="tipediagnosa"
                          className="form-label"
                        >
                          Sumber Data
                        </Label>
                      </div>
                    </Col>
                    <Col lg={9}>
                      <Row>
                        {(dataSumberData || []).map((data, key) => (
                          <Col lg={4} key={key}>
                            <div className="d-flex flex-row" key={key}>
                              <Input
                                className="form-check-input"
                                type="radio"
                                id={`radio-payment-${key}`}
                                checked={data.cheked}
                                readOnly
                                onClick={(e) => {
                                  changeSumberData(data.value)
                                }}
                              />
                              <Label
                                className="form-check-label ms-2"
                                htmlFor={`radio-payment-${key}`}
                                style={{ color: 'black' }}
                              >
                                {data.label}
                              </Label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label
                          style={{ color: 'black' }}
                          htmlFor="tipediagnosa"
                          className="form-label"
                        >
                          Keluhan Utama
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <CustomSelect
                        id="keluhanUtama"
                        name="keluhanUtama"
                        options={dataCombo?.keluhanutama || []}
                        onChange={(e) => {
                          validation.setFieldValue(
                            'keluhanUtama',
                            e?.value || ''
                          )
                        }}
                        value={validation.values.keluhanUtama}
                        className={`input row-header ${
                          !!validation?.errors.keluhanUtama ? 'is-invalid' : ''
                        }`}
                        isClearEmpty
                      />
                      {validation.touched.keluhanUtama &&
                        !!validation.errors.keluhanUtama && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.keluhanUtama}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={5}>
                      <Input
                        id="keluhanUtamaText"
                        name="keluhanUtamaText"
                        type="textarea"
                        value={validation.values.keluhanUtamaText}
                        onChange={(e) => {
                          validation.setFieldValue(
                            'keluhanUtamaText',
                            e.target.value
                          )
                        }}
                        invalid={
                          validation.touched?.keluhanUtamaText &&
                          !!validation.errors?.keluhanUtamaText
                        }
                      />
                      {validation.touched?.keluhanUtamaText &&
                        !!validation.errors.keluhanUtamaText && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.keluhanUtamaText}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label
                          htmlFor="tipediagnosa"
                          className="form-label text-dark"
                        >
                          Status Psikologis
                        </Label>
                      </div>
                    </Col>
                    <Col lg={9}>
                      <Row>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologistegang}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisTegang(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Tegang
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologiscemas}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisCemas(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Cemas
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologistakut}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisTakut(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Takut
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologismarah}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisMarah(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Marah
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologissedih}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisSedih(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Sedih
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologisdepresi}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisDepresi(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Depresi
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologisagresif}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisAgresif(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Agresif
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologismelukaids}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisMelukaids(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Melukai Diri Sendiri
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologismelukaiol}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisMelukaiol(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Melukai Orang Lain
                          </Label>
                        </Col>
                        <Col lg={3}>
                          <Input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={validation.values.psikologistenang}
                            id="isnasional"
                            onChange={(e) => {
                              changePsikologisTenang(e.target.checked)
                            }}
                          />
                          <Label
                            className="form-check-label ms-2"
                            style={{ color: 'black' }}
                          >
                            Tenang
                          </Label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label
                          htmlFor="tipediagnosa"
                          className="form-label text-dark"
                        >
                          Alergi Makanan
                        </Label>
                      </div>
                    </Col>
                    <Col lg={5}>
                      <Row>
                        {(dataAlergi || []).map((data, key) => (
                          <Col lg={3} md={6} key={data.id}>
                            <div className="d-flex flex-row">
                              <Input
                                className="form-check-input"
                                type="radio"
                                id={`radio-payment-${data.id}`}
                                checked={data.value}
                                readOnly
                                onClick={(e) => {
                                  changeAlergi(data.id)
                                }}
                              />
                              <Label
                                className="form-check-label ms-2"
                                htmlFor={`radio-payment-${data.id}`}
                                style={{ color: 'black' }}
                              >
                                {data.label}
                              </Label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col lg={4}>
                      <CustomSelect
                        id="alergi"
                        name="alergi"
                        options={dataCombo?.alergi || []}
                        onChange={(e) => {
                          validation.setFieldValue('alergi', e?.value || '')
                        }}
                        value={validation.values.alergi}
                        className={`input row-header ${
                          !!validation?.errors.alergi ? 'is-invalid' : ''
                        }`}
                        isDisabled={stateTidak}
                        isClearEmpty
                      />
                      {validation.touched.alergi &&
                        !!validation.errors.alergi && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.alergi}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label
                          htmlFor="tipediagnosa"
                          className="form-label text-dark"
                        >
                          Alergi Obat
                        </Label>
                      </div>
                    </Col>
                    <Col lg={5}>
                      <Row>
                        {(dataAlergiObat || []).map((data, key) => (
                          <Col lg={3} md={6} key={data.id}>
                            <div className="d-flex flex-row">
                              <Input
                                className="form-check-input"
                                type="radio"
                                id={`radio-payment-${data.id}`}
                                checked={data.value}
                                readOnly
                                onClick={(e) => {
                                  changeAlergiObat(data.id)
                                }}
                              />
                              <Label
                                className="form-check-label ms-2"
                                htmlFor={`radio-payment-${data.id}`}
                                style={{ color: 'black' }}
                              >
                                {data.label}
                              </Label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col lg={4}>
                      <CustomSelect
                        id="alergiObat"
                        name="alergiObat"
                        options={dataComboKfa?.list || []}
                        onChange={(e) => {
                          validation.setFieldValue('alergiObat', e?.value || '')
                          validation.setFieldValue(
                            'codealergiObat',
                            e?.code || ''
                          )
                          validation.setFieldValue(
                            'displayalergiObat',
                            e?.label || ''
                          )
                        }}
                        onInputChange={handleComboKfa}
                        value={validation.values.alergiObat}
                        className={`input row-header ${
                          !!validation?.errors.alergiObat ? 'is-invalid' : ''
                        }`}
                        isDisabled={stateTidakObat}
                        isClearEmpty
                      />
                      {validation.touched.alergiObat &&
                        !!validation.errors.alergiObat && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.alergiObat}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col xxl={12} sm={12}>
                      <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" color="success" placement="top">
                          SIMPAN
                        </Button>

                        {/* <Button type="button" color="danger" placement="top" onClick={handleClickReset}>
                                                    BATAL
                                                </Button> */}
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Row>
    </React.Fragment>
  )
}

export default PengkajianAwalKeperawatanRJ
