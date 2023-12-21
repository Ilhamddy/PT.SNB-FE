import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, DropdownToggle, Form, FormFeedback, Input, Label, Row, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import CustomSelect from '../../Select/Select';
import {
  getComboAsesmenAwalKeperawatan, upsertAsesmenAwalKeperawatan, getListPengkajianAwalKeperawatan, upsertCondition,
  upsertAlergi
} from "../../../store/actions";
import { useDispatch, useSelector } from 'react-redux';

const PengkajianAwalKeperawatanRJ = () => {
  const { norecdp, norecap } = useParams();
  const dispatch = useDispatch();
  const { dataCombo, loadingCombo, successCombo,
    dataRiwayat, loadingRiwayat, successRiwayat } = useSelector((state) => ({
      dataCombo: state.Emr.getComboAsesmenAwalKeperawatan.data || [],
      loadingCombo: state.Emr.getComboAsesmenAwalKeperawatan.loading,
      successCombo: state.Emr.getComboAsesmenAwalKeperawatan.success,
      dataRiwayat: state.Emr.getListPengkajianAwalKeperawatan.data || [],
      loadingRiwayat: state.Emr.getListPengkajianAwalKeperawatan.loading,
      successRiwayat: state.Emr.getListPengkajianAwalKeperawatan.success
    }));
  useEffect(() => {
    dispatch(getComboAsesmenAwalKeperawatan());
    dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }));
  }, [norecdp, dispatch])
  const [dateNow] = useState(() => new Date().toISOString())
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecdp: norecdp,
      norecap: norecap,
      norec: '',
      sumberdata: '',
      psikologis: '',
      alergi: '',
      tanggalPemeriksaan: '',
      keluhanUtama: '',
      keluhanUtamaText: '',
      idlabel: 5,
      label: 'PENGKAJIANAWALKEPERAWATAN',
    },
    validationSchema: Yup.object({
      // sumberdata: Yup.string().required("Tipe Diagnosa Belum Diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.psikologis = statePsikologis
      if (values.tanggalPemeriksaan === '') { values.tanggalPemeriksaan = dateNow }
      dispatch(upsertAsesmenAwalKeperawatan(values, () => {
        resetForm()
      }));
      // resetForm()
    }
  })
  const [dataSumberData, setdataSumberData] = useState([]);
  useEffect(() => {
    if (dataCombo?.sumberdata) {
      setdataSumberData(dataCombo?.sumberdata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCombo, validation.setFieldValue,])

  const changeSumberData = (newvalue) => {
    let newArrayBed = dataCombo?.sumberdata
    newArrayBed.forEach(element => {
      if (element.value === newvalue) {
        element.cheked = true
      } else {
        element.cheked = false
      }
    });
    setdataSumberData(newArrayBed);
    validation.setFieldValue('sumberdata', newvalue);
  }
  const [statePsikologis, setstatePsikologis] = useState([])
  const changePsikologis = (newvalue) => {
    let newArray = statePsikologis.slice();
    let push = true;

    newArray.forEach((element, index) => {
      if (element === newvalue) {
        push = false;
        newArray.splice(index, 1);
      }
    });

    if (push === true) {
      newArray.push(newvalue);
    }
    setstatePsikologis(newArray)
  }
  const [stateTidak, setstateTidak] = useState(true)
  const [stateYa, setstateYa] = useState(false)
  const taskAlergi = [
    {
      id: 4,
      label: "Ya",
      value: stateYa,
    },
    {
      id: 5,
      label: "Tidak",
      value: stateTidak
    },
  ]
  const [dataAlergi, setdataAlergi] = useState(taskAlergi);
  const changeAlergi = (newvalue) => {
    let newArrayBed = taskAlergi
    newArrayBed.forEach(element => {
      if (element.id === newvalue) {
        element.value = true
      } else {
        element.value = false
      }
    });
    if (newvalue === 4) {
      setstateYa(true)
      setstateTidak(false)
    } else {
      setstateYa(false)
      setstateTidak(true)
    }
    setdataAlergi(newArrayBed);
    // validation.setFieldValue('sumberdata', newvalue);
  }
  const handleClickKeluhanUtama = (e) => {
    let tempValue = {
      norec: e.norec,
      code: e.codekeluhan,
      display: e.displaykeluhan,
      norecdp: norecdp,
      status: 'keluhanutama',
      ihs_keluhan: e.ihs_keluhan
    }
    dispatch(upsertCondition(tempValue, () => {
      dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }));
    }));
  }
  const handleClickAlergi = (e) => {
    let tempValue = {
      norec: e.norec,
      code: e.codealergi,
      display: e.displayalergi,
      norecdp: norecdp,
      status: 'alergi',
      ihs_alergi: e.ihs_alergi
    }
    dispatch(upsertAlergi(tempValue, () => {
      dispatch(getListPengkajianAwalKeperawatan({ norecdp: norecdp }));
    }));
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
      name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
      selector: row => row.noregistrasi,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      width: "140px",
      // cell: (data) => {
      //     return (
      //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
      //         <button type='button' className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{data.noregistrasi}</button>
      //     );
      // },
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
    {

      name: <span className='font-weight-bold fs-13'>Snomed Keluhan</span>,
      // selector: row => row.displaykeluhan,
      sortable: true,
      selector: (data) => {
        return (
          <button type='button' className={"btn btn-sm " + data.status_keluhan}
            onClick={() => handleClickKeluhanUtama(data)}
          >{data.displaykeluhan}</button>
        );
      },
    },
    {

      name: <span className='font-weight-bold fs-13'>Snomed Alergi</span>,
      // selector: row => row.displayalergi,
      sortable: true,
      selector: (data) => {
        return (
          <button type='button' className={"btn btn-sm " + data.status_alergi}
            onClick={() => handleClickAlergi(data)}
          >{data.displayalergi}</button>
        );
      },
    },

  ];
  return (
    <React.Fragment>
      <Row className="gy-4 p-3">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="card-header-snb ">
                <h4 className="card-title mb-0" style={{ color: 'black' }}>History Pengkajian Awal Keperawatan</h4>
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
                <h4 className="card-title mb-0" style={{ color: 'black' }}>Pengkajian Awal Keperawatan</h4>
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
                  <Row className='gy-2'>
                    <Col lg={12}>
                      <Row>
                        <Col lg={3}>
                          <div className="mt-2">
                            <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Pemeriksaan</Label>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <KontainerFlatpickr
                            isError={validation.touched?.tanggalPemeriksaan &&
                              !!validation.errors?.tanggalPemeriksaan}
                            id="tanggalPemeriksaan"
                            options={{
                              dateFormat: 'Y-m-d H:i',
                              defaultDate: 'today',
                              enableTime: true,
                              time_24hr: true,
                            }}
                            value={validation.values.tanggalPemeriksaan || dateNow}
                            onChange={([newDate]) => {
                              validation.setFieldValue('tanggalPemeriksaan', newDate.toISOString())
                            }}
                          />
                          {validation.touched?.tanggalPemeriksaan
                            && !!validation.errors.tanggalPemeriksaan && (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.tanggalPemeriksaan}</div>
                              </FormFeedback>
                            )}
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Sumber Data</Label>
                      </div>
                    </Col>
                    <Col lg={9}>
                      <Row>
                        {(dataSumberData || []).map((data, key) =>
                          <Col lg={4} key={key}>
                            <div className="d-flex flex-row" key={key}>
                              <Input
                                className="form-check-input"
                                type="radio"
                                id={`radio-payment-${key}`}
                                checked={data.cheked}
                                readOnly
                                onClick={e => {
                                  changeSumberData(data.value)
                                }} />
                              <Label className="form-check-label ms-2"
                                htmlFor={`radio-payment-${key}`}
                                style={{ color: "black" }} >
                                {data.label}
                              </Label>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Keluhan Utama</Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <CustomSelect
                        id="keluhanUtama"
                        name="keluhanUtama"
                        options={dataCombo?.keluhanutama || []}
                        onChange={(e) => {
                          validation.setFieldValue('keluhanUtama', e?.value || '')
                        }}
                        value={validation.values.keluhanUtama}
                        className={`input row-header ${!!validation?.errors.keluhanUtama ? 'is-invalid' : ''
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
                          validation.setFieldValue('keluhanUtamaText', e.target.value)
                        }}
                        invalid={validation.touched?.keluhanUtamaText &&
                          !!validation.errors?.keluhanUtamaText}
                      />
                      {validation.touched?.keluhanUtamaText
                        && !!validation.errors.keluhanUtamaText && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.keluhanUtamaText}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label htmlFor="tipediagnosa" className="form-label text-dark">Status Psikologis</Label>
                      </div>
                    </Col>
                    <Col lg={9}>
                      <Row>
                        {(dataCombo.statuspsikologis || []).map((data, key) =>
                          <Col lg={3} key={key}>
                            <div className="d-flex flex-row" key={key}>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox-payment-${key}`}
                                readOnly
                                onClick={e => {
                                  changePsikologis(data.value)
                                }} />
                              <Label className="form-check-label ms-2"
                                htmlFor={`checkbox-payment-${key}`}
                                style={{ color: "black" }} >
                                {data.label}
                              </Label>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </Col>
                    <Col lg={3}>
                      <div className="mt-2">
                        <Label htmlFor="tipediagnosa" className="form-label text-dark">Alergi</Label>
                      </div>
                    </Col>
                    <Col lg={5}>
                      <Row>
                        {(dataAlergi || []).map((data, key) =>
                          <Col lg={3} md={6} key={data.id}>
                            <div className="d-flex flex-row" >
                              <Input
                                className="form-check-input"
                                type="radio"
                                id={`radio-payment-${data.id}`}
                                checked={data.value}
                                readOnly
                                onClick={e => {
                                  changeAlergi(data.id)
                                }}
                              />
                              <Label className="form-check-label ms-2"
                                htmlFor={`radio-payment-${data.id}`}
                                style={{ color: "black" }} >
                                {data.label}
                              </Label>
                            </div>
                          </Col>
                        )}
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
                        className={`input row-header ${!!validation?.errors.alergi ? 'is-invalid' : ''
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

export default (PengkajianAwalKeperawatanRJ)