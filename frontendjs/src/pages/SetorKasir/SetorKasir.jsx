import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import {
  Container,
  Row,
  Col,
  FormFeedback,
  Card,
  Input,
  Label,
  Button,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComboSetor,
  getPembayaranSetor,
  upsertSetoran,
} from '../../store/payment/action'
import {
  dateLocal,
  dateTimeLocal,
  onChangeStrNbr,
  onChangeStrNbrNeg,
} from '../../utils/format'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import * as Yup from 'yup'
import LoadingLaman from '../../Components/Common/LoadingLaman'

const initialDetail = {
  norec: '',
  total: '',
  metodebayar: '',
  jenisnontunai: '',
  values: [],
  label: '',
}

const SetorKasir = () => {
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const {
    metodeBayar,
    jenisNonTunai,
    shiftKasir,
    buktiBayar,
    setoranBefore,
    loadingBB,
    pegawai,
    pegawaiInput,
  } = useSelector((state) => ({
    metodeBayar: state.Payment.getComboSetor.data.metodeBayar || [],
    jenisNonTunai: state.Payment.getComboSetor.data.jenisNonTunai || [],
    shiftKasir: state.Payment.getComboSetor.data.shiftKasir || [],
    pegawai: state.Payment.getComboSetor.data.pegawai || [],
    buktiBayar: state.Payment.getPembayaranSetor.data.buktiBayar || [],
    setoranBefore: state.Payment.getPembayaranSetor.data.setor || null,
    loadingBB: state.Payment.getPembayaranSetor.loading || false,
    pegawaiInput: state.Payment.getComboSetor.data.pegawaiInput || [],
  }))
  const vSetor = useFormik({
    initialValues: {
      norecsetoran: '',
      tanggalshift: dateNow,
      kasir: '',
      jadwalshift: '',
      jadwalshiftname: '',
      totalsetor: 0,
      detail: [],
    },
    validationSchema: Yup.object({
      jadwalshift: Yup.string().required('Jadwal shift harus diisi'),
      detail: Yup.array().min(1, 'Minimal 1'),
    }),
    onSubmit: (values) => {
      dispatch(upsertSetoran(values, () => {}))
    },
  })

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      sortable: true,
      selector: (row) => dateLocal(row.tglregistrasi),
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Registrasi</span>,
      sortable: true,
      selector: (row) => row.noregistrasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No RM</span>,
      sortable: true,
      selector: (row) => row.nocm,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      sortable: true,
      selector: (row) => row.namapasien,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Bayar</span>,
      sortable: true,
      selector: (row) => row.no_bukti,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Instalasi</span>,
      sortable: true,
      selector: (row) => row.namainstalasi,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Unit</span>,
      sortable: true,
      selector: (row) => row.namaunit,
      width: '120px',
    },
    {
      name: <span className="font-weight-bold fs-13">Penjamin</span>,
      sortable: true,
      selector: (row) => row.namarekanan,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Pulang</span>,
      sortable: true,
      selector: (row) => dateTimeLocal(row.tglpulang),
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Total Bayar</span>,
      sortable: true,
      selector: (row) => row.totalbayar,
      width: '100px',
    },
  ]

  useEffect(() => {
    const newDetail = []
    const setFF = vSetor.setFieldValue
    metodeBayar.forEach((data) => {
      if (data.value === 1) {
        newDetail.push({
          ...initialDetail,
          total: 0,
          metodebayar: data.value,
          jenisnontunai: null,
          values: [],
          label: data.label,
        })
      }
    })
    jenisNonTunai.forEach((data) => {
      newDetail.push({
        ...initialDetail,
        total: 0,
        metodebayar: 2,
        jenisnontunai: data.value,
        values: [],
        label: data.label,
      })
    })
    buktiBayar.forEach((bb) => {
      const iMetode = newDetail.findIndex(
        (find) => find.label === bb.metodebayar
      )
      let totalBayar = 0
      if (iMetode < 0) return
      totalBayar = bb._values.reduce((prev, valuesBB) => {
        return prev + valuesBB.totalbayar
      }, 0)
      newDetail[iMetode].values.push(bb._values)
      newDetail[iMetode].total = totalBayar
    })
    const totalSetor = newDetail.reduce((prev, detail) => {
      return prev + detail.total
    }, 0)
    setFF('detail', newDetail)
    setFF('totalsetor', totalSetor)
    if (setoranBefore) {
      setFF('norecsetoran', setoranBefore.norecsetoran)
      setFF('kasir', setoranBefore.kasir)
      setFF('jadwalshift', setoranBefore.jadwalshift)
      setFF('jadwalshiftname', setoranBefore.jadwalshiftname)
    } else {
      setFF('norecsetoran', '')
      setFF('kasir', '')
      setFF('jadwalshift', '')
      setFF('jadwalshiftname', '')
      if (pegawaiInput) {
        setFF('kasir', pegawaiInput.value)
      }
    }
  }, [
    metodeBayar,
    setoranBefore,
    buktiBayar,
    jenisNonTunai,
    pegawaiInput,
    vSetor.setFieldValue,
  ])
  useEffect(() => {
    dispatch(getComboSetor({}))
  }, [dispatch])
  useEffect(() => {
    dispatch(getPembayaranSetor({ tanggalshift: vSetor.values.tanggalshift }))
  }, [dispatch, vSetor.values.tanggalshift])
  return (
    <div className="page-content page-tarif-tindakan">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Setor Kasir" pageTitle="Payment" />
        <Card className="p-5">
          <Row>
            <ColLabelInput label={'Tanggal Setor'} lg={3}>
              <KontainerFlatpickr
                isError={
                  vSetor.touched?.tanggalshift && !!vSetor.errors?.tanggalshift
                }
                id="tanggalshift"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vSetor.values.tanggalshift}
                onChange={([newDate]) => {
                  vSetor.setFieldValue('tanggalshift', newDate.toISOString())
                }}
              />
              {vSetor.touched?.tanggalshift && !!vSetor.errors.tanggalshift && (
                <FormFeedback type="invalid">
                  <div>{vSetor.errors.tanggalshift}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput label={'Kasir'} lg={3}>
              <CustomSelect
                id="kasir"
                name="kasir"
                options={pegawai}
                onChange={(e) => {
                  vSetor.setFieldValue('kasir', e?.value || '')
                }}
                isDisabled
                value={vSetor.values.kasir}
                className={`input row-header ${
                  !!vSetor?.errors.kasir ? 'is-invalid' : ''
                }`}
              />
              {vSetor.touched.kasir && !!vSetor.errors.kasir && (
                <FormFeedback type="invalid">
                  <div>{vSetor.errors.kasir}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
            <ColLabelInput label={'Jadwal Shift'} lg={3}>
              <CustomSelect
                id="jadwalshift"
                name="jadwalshift"
                options={shiftKasir}
                isDisabled={!!vSetor.values.norecsetoran}
                onChange={(e) => {
                  vSetor.setFieldValue('jadwalshift', e?.value || '')
                  vSetor.setFieldValue('jadwalshiftname', e?.label || '')
                }}
                value={vSetor.values.jadwalshift}
                className={`input row-header ${
                  !!vSetor?.errors.jadwalshift ? 'is-invalid' : ''
                }`}
              />
              {vSetor.touched.jadwalshift && !!vSetor.errors.jadwalshift && (
                <FormFeedback type="invalid">
                  <div>{vSetor.errors.jadwalshift}</div>
                </FormFeedback>
              )}
            </ColLabelInput>
          </Row>
          <Row className="mt-4">
            {vSetor.values.detail.map((data, index) => (
              <ColLabelInput label={data.label} lg={3} key={index}>
                <Input
                  disabled
                  readOnly
                  id={`detail[${index}].total`}
                  name={`detail[${index}].total`}
                  type="text"
                  value={vSetor.values.detail[index].total}
                  invalid={
                    vSetor.touched?.detail?.[index]?.total &&
                    !!vSetor.errors?.detail?.[index]?.total
                  }
                  className="mb-2"
                />
                {vSetor.touched?.detail?.[index]?.total &&
                  !!vSetor.errors?.detail?.[index]?.total && (
                    <FormFeedback type="invalid">
                      <div>{vSetor.errors?.detail?.[index]?.total}</div>
                    </FormFeedback>
                  )}
              </ColLabelInput>
            ))}
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="me-3" lg={'auto'}>
              <Button
                color="success"
                type="button"
                disabled={!!vSetor.values.norecsetoran}
                onClick={() => {
                  if (vSetor.errors.detail) {
                    toast.error(vSetor.errors.detail)
                  }
                  vSetor.handleSubmit()
                }}
              >
                Simpan
              </Button>
            </Col>
            <Col lg={'auto'} color="success">
              <Button color="danger">Batal</Button>
            </Col>
          </Row>
          <p className="text-center fs-4 mt-3">
            Total uang yang akan disetor pada tanggal{' '}
            <b>{dateLocal(vSetor.values.tanggalshift)} </b>
            di shift <b>{vSetor.values.jadwalshiftname}</b> oleh{' '}
            {pegawaiInput.label} sebesar{' '}
            <b>Rp{vSetor.values.totalsetor?.toLocaleString('id-ID')}</b>
          </p>
          {loadingBB && <LoadingLaman />}
          <Row className="mt-3">
            {buktiBayar.map((bb, index) => (
              <React.Fragment key={index}>
                <Col lg={12}>
                  <Label style={{ color: '#000000' }}>{bb.metodebayar}</Label>
                </Col>
                <Col lg={12}>
                  <DataTable
                    className="mt-3"
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columnsDetail}
                    pagination
                    data={bb._values}
                    progressPending={loadingBB}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                  />
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Card>
      </Container>
    </div>
  )
}

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#FFCB46',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default SetorKasir
