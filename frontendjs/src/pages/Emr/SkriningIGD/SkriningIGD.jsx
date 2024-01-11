import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { onChangeStrNbr, useDate } from '../../../utils/format'
import { Row, FormFeedback, Input, Col, Label, Button, Form, Card, CardHeader, CardBody } from 'reactstrap'
import ColLabelInput from '../../../Components/ColLabelInput/ColLabelInput'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import * as Yup from 'yup'
import CustomSelect from '../../Select/Select'
import { RadioButton } from '../../../Components/RadioButtons/RadioButtons'
import './SkriningIGD.scss'
import {
  upsertSkriningIGD, getHistorySkriningIGD
} from '../../../store/emr/emrSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'

const SkriningIGD = () => {
  const dispatch = useDispatch()
  const { norecdp, norecap } = useParams()
  const { dateISOString } = useDate()
  const { dataRiwayat, loadingRiwayat, successRiwayat } = useSelector((state) => ({
    dataRiwayat: state.emrSlice.getHistorySkriningIGD?.data || [],
    loadingRiwayat: state.emrSlice.getHistorySkriningIGD.loading,
    successRiwayat: state.emrSlice.getHistorySkriningIGD.success,
  }));
  const validation = useFormik({
    initialValues: {
      norec: '',
      norecap: norecap,
      norecdp: norecdp,
      datepengkajian: dateISOString,
      statusdecubitus: '',
      skriningbatuk: skriningBatukInitial,
      skrininggizi: skriningGiziInitial,
      idlabel: 6,
      label: 'SKRININGIGD'
    },
    validationSchema: Yup.object({
      datepengkajian: Yup.string().required('Tanggal Skrining harus diisi'),
      statusdecubitus: Yup.string().required('status nyeri harus diisi'),

    }),
    onSubmit: (values) => {
      console.log(values)
      // dispatch(upsertSkriningIGD(values, () => { }))
    },
  })
  useEffect(() => {
    dispatch(getHistorySkriningIGD({ norecdp: norecdp }));
  }, [norecdp, dispatch])
  const handleChangeJawaban = (key, val) => {
    let newValue = {
      ...validation.values.skriningbatuk,
    }
    newValue[key] = val

    const setFF = validation.setFieldValue
    setFF('skriningbatuk', newValue)
    // console.log(key)
  }
  const handleChangeJawabanGizi = (key, val) => {
    let newValue = {
      ...validation.values.skrininggizi,
    }
    newValue[key] = val
    const setFF = validation.setFieldValue
    setFF('skrininggizi', newValue)
    // console.log(newValueResiko)
  }
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
      selector: row => row.noregistrasi,
      sortable: true,
      width: "140px",
    },
    {
      name: <span className='font-weight-bold fs-13'>Tgl Input</span>,
      selector: row => row.tglinput,
      sortable: true,
      wrap: true
    },
    {

      name: <span className='font-weight-bold fs-13'>Unit</span>,
      selector: row => row.namaunit,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Keluhan</span>,
      selector: row => row.keluhanutama,
      sortable: true,
      width: "150px"
    },
  ];
  const handleClickRow = (row) => {
    const setFieldValue = validation.setFieldValue;

    const updateField = (fieldName, sourceObj) => {
      const newValue = { ...validation.values[fieldName] };
      Object.keys(sourceObj).forEach((key) => {
        newValue[`pertanyaan${key}`] = sourceObj[key];
      });
      setFieldValue(fieldName, newValue);
    };

    setFieldValue('datepengkajian', row.tglinput_ihs);
    setFieldValue('statusdecubitus', row.risikodecubitus);
    setFieldValue('norec', row.norec);

    updateField('skriningbatuk', {
      1: row.batuk_demam,
      2: row.batuk_keringat,
      3: row.batuk_daerahwabah,
      4: row.batuk_obatjangkapanjang,
      5: row.batuk_bbturun,
    });

    updateField('skrininggizi', {
      1: row.gizi_bbturun,
      2: row.gizi_nafsumakan,
      3: row.gizi_gejala,
      4: row.gizi_komorbid,
      5: row.gizi_fungsional,
    });
  };

  return (
    <div className="p-3">
      <Card>
        <CardHeader className="card-header-snb ">
          <h4 className="card-title mb-0" style={{ color: 'black' }}>History Skrining IGD</h4>
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
              onRowClicked={(row) => handleClickRow(row)}
              progressComponent={<LoadingTable />}
              pointerOnHover
              highlightOnHover
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="card-header-snb ">
          <h4 className="card-title mb-0" style={{ color: 'black' }}>Skrining IGD</h4>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
            className="gy-4"
            action="#">
            <Row className="mb-4">
              <ColLabelInput lg={4} label={'Tanggal & jam Pengkajian'}>
                <KontainerFlatpickr
                  isError={
                    validation.touched?.datepengkajian &&
                    !!validation.errors?.datepengkajian
                  }
                  id="datepengkajian"
                  options={{
                    dateFormat: 'Y-m-d H:i',
                    defaultDate: 'today',
                  }}
                  value={validation.values.datepengkajian}
                  disabled
                />
                {validation.touched?.datepengkajian &&
                  !!validation.errors.datepengkajian && (
                    <FormFeedback type="invalid">
                      <div>{validation.errors.datepengkajian}</div>
                    </FormFeedback>
                  )}
              </ColLabelInput>
            </Row>
            <Label className="mb-3" style={{ color: '#000000' }}>
              1. RISIKO DECUBITUS
            </Label>
            <Row className="ms-2">
              <Col>
                <Row className="mb-2">
                  <ColLabelInput lg={4} label={'Terdapat risiko decubitus ?'}>
                    <CustomSelect
                      id="statusdecubitus"
                      name="statusdecubitus"
                      options={[
                        {
                          label: 'Ya',
                          value: true,
                        },
                        {
                          label: 'Tidak',
                          value: false,
                        },
                      ]}
                      onChange={(e) => {
                        validation.setFieldValue('statusdecubitus', e?.value ?? false)
                      }}
                      value={validation.values.statusdecubitus}
                      className={`input row-header ${!!validation?.errors.statusdecubitus ? 'is-invalid' : ''
                        }`}
                    />
                    {validation.touched.statusdecubitus &&
                      !!validation.errors.statusdecubitus && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.statusdecubitus}</div>
                        </FormFeedback>
                      )}
                  </ColLabelInput>
                </Row>
              </Col>
            </Row>
            <Label className="mb-3" style={{ color: '#000000' }}>
              2. SKRINING BATUK
            </Label>
            <Row>
              <Col>
                <table className="table-skrining-igd mb-3">
                  <tbody>
                    <tr className="row-awal">
                      <td className="col-n">No</td>
                      <td className="col-p">Parameter</td>
                      <td className="col-j">Nilai</td>
                    </tr>
                    {listSkriningBatuk.map((pertanyaan, index) => {
                      let valueBatuk = validation.values.skriningbatuk
                      const valueJawaban = valueBatuk[pertanyaan.key]
                      const checkedFirst = valueJawaban === 0
                      // console.log(valueBatuk)
                      return (
                        <React.Fragment key={index}>
                          <tr className={`row-gen`} key={index}>
                            <td>{index + 1}</td>
                            <td>{pertanyaan.pertanyaan}</td>
                            <td>
                              {pertanyaan.jawaban[0] && (
                                <RadioButton
                                  dataValue={0}
                                  checked={checkedFirst}
                                  onClick={() => {
                                    handleChangeJawaban(pertanyaan.key, 0)
                                  }}
                                  label={pertanyaan.jawaban[0]?.jawaban || ''}
                                  index={0}
                                  radioname="jawaban"
                                />
                              )}
                            </td>
                          </tr>
                          {pertanyaan.jawaban.map((jawaban, indexJawab) =>
                            indexJawab === 0 ? (
                              <></>
                            ) : (
                              <React.Fragment key={indexJawab}>
                                <tr key={indexJawab} className="row-jaw">
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <RadioButton
                                      dataValue={indexJawab}
                                      onClick={() =>
                                        handleChangeJawaban(
                                          pertanyaan.key,
                                          indexJawab
                                        )
                                      }
                                      label={jawaban.jawaban}
                                      index={indexJawab}
                                      radioname="jawaban"
                                      checked={valueJawaban === indexJawab}
                                    />
                                  </td>
                                  <td>{jawaban.skor}</td>
                                </tr>
                              </React.Fragment>
                            )
                          )}
                        </React.Fragment>
                      )
                    })}

                  </tbody>
                </table>
              </Col>
            </Row>
            <Label className="mb-3" style={{ color: '#000000' }}>
              3. SKRINING GIZI
            </Label>
            <Row>
              <Col>
                <table className="table-skrining-igd mb-3">
                  <tbody>
                    <tr className="row-awal">
                      <td className="col-n">No</td>
                      <td className="col-p">Parameter</td>
                      <td className="col-j">Nilai</td>
                    </tr>
                    {listSkriningGizi.map((pertanyaan, index) => {
                      let valueGizi = validation.values.skrininggizi
                      const valueJawaban = valueGizi[pertanyaan.key]
                      const checkedFirst = valueJawaban === 0
                      return (
                        <React.Fragment key={index}>
                          <tr className={`row-gen`} key={index}>
                            <td>{index + 1}</td>
                            <td>{pertanyaan.pertanyaan}</td>
                            <td>
                              {pertanyaan.jawaban[0] && (
                                <RadioButton
                                  dataValue={0}
                                  checked={checkedFirst}
                                  onClick={() => {
                                    handleChangeJawabanGizi(pertanyaan.key, 0)
                                  }}
                                  label={pertanyaan.jawaban[0]?.jawaban || ''}
                                  index={0}
                                  radioname="jawaban"
                                />
                              )}
                            </td>
                          </tr>
                          {pertanyaan.jawaban.map((jawaban, indexJawab) =>
                            indexJawab === 0 ? (
                              <></>
                            ) : (
                              <React.Fragment key={indexJawab}>
                                <tr key={indexJawab} className="row-jaw">
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <RadioButton
                                      dataValue={indexJawab}
                                      onClick={() =>
                                        handleChangeJawabanGizi(
                                          pertanyaan.key,
                                          indexJawab
                                        )
                                      }
                                      label={jawaban.jawaban}
                                      index={indexJawab}
                                      radioname="jawaban"
                                      checked={valueJawaban === indexJawab}
                                    />
                                  </td>
                                  <td>{jawaban.skor}</td>
                                </tr>
                              </React.Fragment>
                            )
                          )}
                        </React.Fragment>
                      )
                    })}

                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="d-flex flex-row-reverse">
              <Col lg="auto">
                <Button color="danger" type="button">Batal</Button>
              </Col>
              <Col lg="auto">
                <Button
                  color="success"
                  type="submit"
                  onClick={() => {
                    console.error(validation.errors)
                    console.error(validation.values)
                    dispatch(upsertSkriningIGD(validation.values, () => { }))
                  }}
                >
                  Simpan
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

const skriningBatukInitial = {
  pertanyaan1: '',
  pertanyaan2: '',
  pertanyaan3: '',
  pertanyaan4: '',
  pertanyaan5: ''
}
const keySkriningBatuk = Object.keys(skriningBatukInitial)
const listSkriningBatuk = [
  {
    key: keySkriningBatuk[0],
    pertanyaan:
      'Apakah memiliki riwayat demam?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningBatuk[1],
    pertanyaan:
      'Apakah berkeringat pada malam hari walaupun tanpa aktivitas?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningBatuk[2],
    pertanyaan:
      ' Apakah memiliki riwayat berpergian dari daerah wabah?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningBatuk[3],
    pertanyaan:
      ' Apakah memiliki riwayat pemakaian obat jangka panjang?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningBatuk[4],
    pertanyaan:
      ' Apakah memiliki riwayat BB turun tanpa sebab yang diketahui?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
]
// console.log(listSkriningBatuk)
const skriningGiziInitial = {
  pertanyaan1: '',
  pertanyaan2: '',
  pertanyaan3: '',
  pertanyaan4: '',
  pertanyaan5: ''
}
const keySkriningGizi = Object.keys(skriningGiziInitial)
const listSkriningGizi = [
  {
    key: keySkriningGizi[0],
    pertanyaan:
      'Apakah ada penurunan BB dalam waktu 6 bulan terakhir?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningGizi[1],
    pertanyaan:
      'Apakah ada penurunan asupan makanan karena nafsu makan berkurang?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningGizi[2],
    pertanyaan:
      'Apakah mengalami gejala gastrointestinal (seperti mual, muntah, diare, anorexia)?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningGizi[3],
    pertanyaan:
      'Apakah memiliki faktor pemberat (komorbid)?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
  {
    key: keySkriningGizi[4],
    pertanyaan:
      'Apakah ada penurunan kapasitas fungsional?',
    jawaban: [
      {
        jawaban: 'Ya',
      },
      {
        jawaban: 'Tidak',
      },
    ],
  },
]

export default SkriningIGD