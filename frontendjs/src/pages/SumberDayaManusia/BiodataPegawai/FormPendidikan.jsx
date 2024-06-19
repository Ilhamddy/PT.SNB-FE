import { useFormik } from 'formik'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  Form,
  Row,
  Col,
  Label,
  FormFeedback,
  CardBody,
  Button,
} from 'reactstrap'
import * as Yup from 'yup'
import './BiodataPegawai.scss'
import CustomInput from '../../../Components/Common/CustomInput/CustomInput'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { rgxAllNumber, rgxNbrEmpty } from '../../../utils/regexcommon'

const FormPendidikan = () => {
  const { idPegawai } = useParams()
  const vTempColumn = useFormik({
    initialValues: {
      nourut: 0,
      jenjang: '',
      institusi: '',
      jurusan: '',
      kota: '',
      tahunLulus: '',
    },
    validationSchema: Yup.object({
      // jenjang: Yup.string().required('Jenjang Pendidikan belum diisi.'),
      // institusi: Yup.string().required('institusi Pendidikan belum diisi.'),
      // jurusan: Yup.string().required('jurusan Pendidikan belum diisi.'),
      // kota: Yup.string().required('Kota belum diisi.'),
      tahunLuLus: Yup.string().required('Tahun Lulus belum diisi.')
        .min(4, 'Tahun Lulus minimal 4 digit')
        .max(4, 'Tahun Lulus maksimal 4 digit')
      // .matches(rgxAllNumber, 'No HP Pasien harus angka'),
    }),
    onSubmit: (values) => {
      let newPayments = [...tempColumtr]
      values.nourut = values.nourut + 1
      newPayments.push({ ...values })
      settempColumtr(newPayments)
      console.log(tempColumtr)
    },
  })
  const [tempColumtr, settempColumtr] = useState([])
  const [column, setColumn] = useState([])
  const initColumn = [
    {
      name: <span className="font-weight-bold fs-13"></span>,
      Cell: ({ row }) => row.koder,
      width: '5%',
    },

  ]
  return (
    <div className="page-content biodata-Pegawai">
      <Card>
        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              vTempColumn.handleSubmit()
              return false
            }}
            className="gy-4"
            action="#"
          >
            <Row>
              <table className="table table-bordered align-middle table-nowrap mb-0">
                <thead className="table-light head-table-pendidikan">
                  <tr>
                    <th className='col-satu'>No. </th>
                    <th className='col-dua'>
                      <h1 className='header-title'>
                        Jenjang
                      </h1>
                      <Button className='header-button' color={'info'}>
                        +
                      </Button>
                    </th>
                    <th className='col-tiga'>Nama Institusi</th>
                    <th className='col-empat'>Jurusan</th>
                    <th className='col-lima'>kota</th>
                    <th className='col-enam'>Tahun Lulus</th>
                    <th className='col-tujuh'>Hapus</th>
                  </tr>
                </thead>
                <tbody className='body-pendidikan'>
                  <tr
                    className='tr-body'
                  >
                    <td style={{ width: '5%' }}><CustomInput
                      id="nourut"
                      name="nourut"
                      type="text"
                      placeholder="nourut"
                      onChange={vTempColumn.handleChange}
                      onBlur={vTempColumn.handleBlur}
                      value={'-'}
                      disabled
                    />
                      {vTempColumn.touched.nourut && vTempColumn.errors.nourut ? (
                        <FormFeedback type="invalid">
                          <div>{vTempColumn.errors.nourut}</div>
                        </FormFeedback>
                      ) : null}</td>
                    <td style={{ width: '20%' }}>
                      <CustomSelect
                        id="jenjang"
                        name="jenjang"
                        options={[]}
                        onChange={(e) => {
                          vTempColumn.setFieldValue('jenjang', e?.value || '')
                        }}
                        value={vTempColumn.values.jenjang}
                        onBlur={vTempColumn.handleBlur}
                        className={`input row-header ${!!vTempColumn?.errors.jenjang ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                      />
                      {vTempColumn.touched.jenjang &&
                        !!vTempColumn.errors.jenjang && (
                          <FormFeedback type="invalid">
                            <div>{vTempColumn.errors.jenjang}</div>
                          </FormFeedback>
                        )}
                    </td>
                    <td style={{ width: '20%' }}>
                      <CustomSelect
                        id="institusi"
                        name="institusi"
                        options={[]}
                        onChange={(e) => {
                          vTempColumn.setFieldValue('institusi', e?.value || '')
                        }}
                        value={vTempColumn.values.institusi}
                        onBlur={vTempColumn.handleBlur}
                        className={`input row-header ${!!vTempColumn?.errors.institusi ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                      />
                      {vTempColumn.touched.institusi &&
                        !!vTempColumn.errors.institusi && (
                          <FormFeedback type="invalid">
                            <div>{vTempColumn.errors.institusi}</div>
                          </FormFeedback>
                        )}
                    </td>
                    <td style={{ width: '20%' }}>
                      <CustomSelect
                        id="jurusan"
                        name="jurusan"
                        options={[]}
                        onChange={(e) => {
                          vTempColumn.setFieldValue('jurusan', e?.value || '')
                        }}
                        value={vTempColumn.values.jurusan}
                        onBlur={vTempColumn.handleBlur}
                        className={`input row-header ${!!vTempColumn?.errors.jurusan ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                      />
                      {vTempColumn.touched.jurusan &&
                        !!vTempColumn.errors.jurusan && (
                          <FormFeedback type="invalid">
                            <div>{vTempColumn.errors.jurusan}</div>
                          </FormFeedback>
                        )}
                    </td>
                    <td style={{ width: '10%' }}>
                      <CustomSelect
                        id="kota"
                        name="kota"
                        options={[]}
                        onChange={(e) => {
                          vTempColumn.setFieldValue('kota', e?.value || '')
                        }}
                        value={vTempColumn.values.kota}
                        onBlur={vTempColumn.handleBlur}
                        className={`input row-header ${!!vTempColumn?.errors.kota ? 'is-invalid' : ''
                          }`}
                        isClearEmpty
                      />
                      {vTempColumn.touched.kota &&
                        !!vTempColumn.errors.kota && (
                          <FormFeedback type="invalid">
                            <div>{vTempColumn.errors.kota}</div>
                          </FormFeedback>
                        )}
                    </td>
                    <td style={{ width: '10%' }}>
                      <CustomInput
                        id="tahunLuLus"
                        name="tahunLuLus"
                        type="number"
                        placeholder="Masukkan nama pasien"
                        onChange={vTempColumn.handleChange}
                        onBlur={vTempColumn.handleBlur}
                        value={vTempColumn.values.tahunLuLus || ''}
                        invalid={
                          vTempColumn.touched.tahunLuLus &&
                          !!vTempColumn.errors.tahunLuLus
                        }
                      />
                      {vTempColumn.touched.tahunLuLus && vTempColumn.errors.tahunLuLus ? (
                        <FormFeedback type="invalid">
                          <div>{vTempColumn.errors.tahunLuLus}</div>
                        </FormFeedback>
                      ) : null}
                    </td>
                    <td style={{ width: '5%' }}>
                      <Button type="button" color="danger">
                        Hapus
                      </Button>
                    </td>
                  </tr>
                  {tempColumtr.map((value, key) => (
                    <tr
                      key={key}
                      className='tr-body'
                    >
                      <td style={{ width: '5px' }}><CustomInput
                        id="nourut"
                        name="nourut"
                        type="text"
                        placeholder="nourut"
                        value={value?.nourut}
                        disabled
                      /></td>
                      <td style={{ width: '5%' }}><CustomInput
                        id="nourut"
                        name="nourut"
                        type="text"
                        value={value?.jenjang}
                        disabled
                      /></td>
                      <td style={{ width: '20%' }}><CustomInput
                        id="institusi"
                        name="institusi"
                        type="text"
                        value={value?.institusi}
                        disabled
                      /></td>
                      <td style={{ width: '20%' }}><CustomInput
                        id="jurusan"
                        name="jurusan"
                        type="text"
                        value={value?.jurusan}
                        disabled
                      /></td>
                      <td style={{ width: '10%' }}><CustomInput
                        id="kota"
                        name="kota"
                        type="text"
                        value={value?.kota}
                        disabled
                      /></td>
                      <td style={{ width: '10%' }}><CustomInput
                        id="tahunLulus"
                        name="tahunLulus"
                        type="text"
                        value={value?.tahunLulus}
                        disabled
                      /></td>
                      <td style={{ width: '5%' }}> <Button type="button" color="danger">
                        Hapus
                      </Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Col lg={12} className="mr-3 me-3 mt-2">
                <div className="d-flex flex-wrap justify-content-end gap-2">
                  <Button type="button" color="success">
                    Simpan
                  </Button>
                  <Button type="button" color="danger">
                    Batal
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
export default FormPendidikan