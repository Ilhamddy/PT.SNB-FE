import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UiContent from '../../../Components/Common/UiContent'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import pria from '../../../assets/images/svg/pria.svg'
import baby from '../../../assets/images/svg/baby.svg'
import anaklaki from '../../../assets/images/svg/anaklaki.svg'
import kakek from '../../../assets/images/svg/kakek.svg'
import nenek from '../../../assets/images/svg/nenek.svg'
import anakperempuan from '../../../assets/images/svg/anakperempuan.svg'
import dewasaperempuan from '../../../assets/images/svg/dewasaperempuan.svg'
import { useFormik } from 'formik'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import DataTable from 'react-data-table-component'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import LoadingTable from '../../../Components/Table/LoadingTable'
import { dateTimeLocal } from '../../../utils/format'
import * as Yup from 'yup'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import ColLabelInput2 from '../../../Components/ColLabelInput2/ColLabelInput2'
import {
  getDaftarPasienRawatInap,
  getMasterGizi,
  upsertOrderGizi,
} from '../../../store/gizi/giziSlice'
import { toast } from 'react-toastify'
import ModalApp from '../../../Components/Common/ModalApp'

const OrderMenuGizi = () => {
  document.title = 'Order Menu Gizi'
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const {
    data,
    dataCombo,
    datawidget,
    loading,
    error,
    deleteOrder,
    successOrder,
    loadingOrder,
  } = useSelector((state) => ({
    data: state.giziSlice.getDaftarPasienRawatInap?.data || [],
    loading: state.giziSlice.getDaftarPasienRawatInap.loading,
    error: state.giziSlice.getDaftarPasienRawatInap.error,
    dataCombo: state.giziSlice.getMasterGizi?.data || [],
  }))
  useEffect(() => {
    dispatch(getMasterGizi(''))
  }, [dispatch])
  const vFilter = useFormik({
    initialValues: {
      search: '',
      tglorder: dateNow,
      sudahorder: 1,
      unit: 1,
      kelas: 3,
    },
    validationSchema: Yup.object({
      kelas: Yup.string().required('Kelas wajib diisi'),
    }),
    onSubmit: (values) => {
      dispatch(getDaftarPasienRawatInap(values))
    },
  })
  useEffect(() => {
    const submit = vFilter.handleSubmit
    submit()
  }, [dispatch, vFilter.handleSubmit])

  const [userChosen, setUserChosen] = useState({
    nama: '',
    id: '',
    profile: '',
  })
  const handleClick = (e) => {
    setUserChosen({
      profile: e.profile,
      nama: e.namapasien,
    })
  }
  const [listPelayananChecked, setListPelayananChecked] = useState([])
  useEffect(() => {
    setListPelayananChecked(data)
  }, [data, setListPelayananChecked])
  const handleChecked = (checked, norec) => {
    const newListPC = [...listPelayananChecked]
    const index = newListPC.findIndex((item) => item.norecta === norec)
    const newItem = { ...newListPC[index] }
    newItem.checked = !checked
    newListPC[index] = newItem
    setListPelayananChecked(newListPC)
  }

  // const isCheckedAll = listPelayananChecked?.every((item) => item.checked)
  const isCheckedAll =
    listPelayananChecked.length > 0
      ? listPelayananChecked.every((item) => item.checked)
      : false

  const handleCheckedAll = () => {
    if (data === null) return
    const withChecked = listPelayananChecked.map((pelayanan) => {
      return {
        ...pelayanan,
        checked: !pelayanan.no_nota && !isCheckedAll,
      }
    })
    setListPelayananChecked(withChecked)
  }
  const columns = [
    {
      name: (
        <span className="font-weight-bold fs-13">
          <Input
            className="form-check-input"
            type="checkbox"
            id={`formcheck-all`}
            checked={isCheckedAll}
            onChange={(e) => {
              handleCheckedAll(isCheckedAll)
            }}
          />
        </span>
      ),
      sortable: false,
      cell: (row) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            {!row.no_nota && (
              <Input
                className="form-check-input"
                type="checkbox"
                id={`formcheck-${row.norecta}`}
                checked={row.checked}
                onChange={(e) => {
                  handleChecked(row.checked, row.norecta)
                }}
              />
            )}
          </div>
        )
      },
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">P</span>,
      sortable: true,
      wrap: true,
      width: '50px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.sarapan ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.sarapan ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">sncP</span>,
      sortable: true,
      wrap: true,
      width: '80px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.snackpagi ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.snackpagi ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">S</span>,
      sortable: true,
      wrap: true,
      width: '50px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.makansiang ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.makansiang ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">sncS</span>,
      sortable: true,
      wrap: true,
      width: '80px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.snacksiang ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.snacksiang ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">M</span>,
      sortable: true,
      wrap: true,
      width: '50px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.makanmalam ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.makanmalam ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Registrasi</span>,
      selector: (row) => dateTimeLocal(row.tglregistrasi),
      sortable: true,
      wrap: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      width: '130px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. RM</span>,
      selector: (row) => row.nocm,
      sortable: true,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Pasien</span>,
      selector: (row) => row.namapasien,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Poliklinik</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">DPJP Tujuan</span>,
      selector: (row) => row.namadokter,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Pasein</span>,
      selector: (row) => row.jenispenjamin,
      sortable: true,
    },
  ]
  const [isModalOrderOpen, setisModalOrderOpen] = useState(false)
  const handleClickModal = (e) => {
    const isAnyChecked = listPelayananChecked.some((element) => element.checked)
    if (!isAnyChecked) {
      toast.error('Pasien Belum Dipilih', { autoClose: 3000 })
      return
    }

    setisModalOrderOpen(true)
  }
  const handleClickModalClose = (e) => {
    setisModalOrderOpen(!isModalOrderOpen)
    dispatch(
      getDaftarPasienRawatInap({
        tglorder: vFilter.values.tglorder,
        sudahorder: vFilter.values.sudahorder,
        kelas: vFilter.values.kelas,
      })
    )
  }
  return (
    <React.Fragment>
      <ModalOrder
        isModalOrderOpen={isModalOrderOpen}
        toggle={() => handleClickModalClose()}
        selectedPasien={listPelayananChecked}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Order Menu Gizi" pageTitle="Forms" />
          <Row>
            <Col lg={3}>
              <Card>
                <CardBody>
                  <div className="text-center">
                    {userChosen?.profile === 'baby' ? (
                      <img
                        src={baby}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'dewasalaki' ? (
                      <img
                        src={pria}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'anaklaki' ? (
                      <img
                        src={anaklaki}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'anakperempuan' ? (
                      <img
                        src={anakperempuan}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'dewasaperempuan' ? (
                      <img
                        src={dewasaperempuan}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'kakek' ? (
                      <img
                        src={kakek}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : userChosen?.profile === 'nenek' ? (
                      <img
                        src={nenek}
                        alt=""
                        className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image"
                      />
                    ) : (
                      // Render when none of the conditions are met
                      <p>No profile image available</p>
                    )}
                    <h5 className="fs-17 mb-1">{userChosen.nama}</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <Row className="mb-3 gy-2">
                    <Col sm={3}>
                      <CustomSelect
                        id="unit"
                        name="unit"
                        options={dataCombo?.resultunit}
                        onChange={(e) => {
                          vFilter.setFieldValue('unit', e?.value || '')
                        }}
                        value={vFilter.values.unit}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${
                          !!vFilter?.errors.unit ? 'is-invalid' : ''
                        }`}
                        isClearEmpty
                        placeholder="list Unit..."
                      />
                      {vFilter.touched.unit && !!vFilter.errors.unit && (
                        <FormFeedback type="invalid">
                          <div>{vFilter.errors.unit}</div>
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm={3}>
                      <CustomSelect
                        id="kelas"
                        name="kelas"
                        options={dataCombo?.resultkelas}
                        onChange={(e) => {
                          vFilter.setFieldValue('kelas', e?.value || '')
                        }}
                        value={vFilter.values.kelas}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${
                          !!vFilter?.errors.kelas ? 'is-invalid' : ''
                        }`}
                        isClearEmpty
                        placeholder="list Kelas..."
                      />
                      {vFilter.touched.kelas && !!vFilter.errors.kelas && (
                        <FormFeedback type="invalid">
                          <div>{vFilter.errors.kelas}</div>
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm={3}>
                      <CustomSelect
                        id="listSudahOrder"
                        name="listSudahOrder"
                        options={[
                          {
                            label: 'Sudah Order',
                            value: 1,
                          },
                          {
                            label: 'Belum Order',
                            value: 2,
                          },
                        ]}
                        onChange={(e) => {
                          vFilter.setFieldValue(
                            'listSudahOrder',
                            e?.value || ''
                          )
                        }}
                        value={vFilter.values.sudahorder}
                        onBlur={vFilter.handleBlur}
                        className={`input row-header ${
                          !!vFilter?.errors.sudahorder ? 'is-invalid' : ''
                        }`}
                        isClearEmpty
                      />
                      {vFilter.touched.sudahorder &&
                        !!vFilter.errors.sudahorder && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.sudahorder}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col sm={3}>
                      <KontainerFlatpickr
                        isError={
                          vFilter.touched?.tglorder &&
                          !!vFilter.errors?.tglorder
                        }
                        id="tglOrder"
                        options={{
                          dateFormat: 'Y-m-d',
                          defaultDate: 'today',
                        }}
                        onBlur={vFilter.handleBlur}
                        value={vFilter.values.tglorder}
                        onChange={([newDate]) => {
                          vFilter.setFieldValue(
                            'tglorder',
                            newDate.toISOString()
                          )
                        }}
                      />
                      {vFilter.touched?.tglorder &&
                        !!vFilter.errors.tglorder && (
                          <FormFeedback type="invalid">
                            <div>{vFilter.errors.tglorder}</div>
                          </FormFeedback>
                        )}
                    </Col>
                    <Col sm={3}>
                      <Input
                        id="cari"
                        name="cari"
                        type="text"
                        value={vFilter.values.cari}
                        onChange={(e) => {
                          vFilter.setFieldValue('cari', e.target.value)
                        }}
                        invalid={
                          vFilter.touched?.cari && !!vFilter.errors?.cari
                        }
                        placeholder="Cari Nama /No RM..."
                      />
                      {vFilter.touched?.cari && !!vFilter.errors.cari && (
                        <FormFeedback type="invalid">
                          <div>{vFilter.errors.cari}</div>
                        </FormFeedback>
                      )}
                    </Col>
                    <Col lg={3}>
                      <Button
                        type="button"
                        color="info"
                        placement="top"
                        id="tooltipTopPencarian"
                        onClick={() => {
                          vFilter.handleSubmit()
                        }}
                      >
                        CARI
                      </Button>
                      <UncontrolledTooltip
                        placement="top"
                        target="tooltipTopPencarian"
                      >
                        {' '}
                        Pencarian{' '}
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      fixedHeaderScrollHeight="700px"
                      columns={columns}
                      pagination
                      data={listPelayananChecked}
                      progressPending={loading}
                      customStyles={tableCustomStyles}
                      onRowClicked={(row) => handleClick(row)}
                      pointerOnHover
                      highlightOnHover
                      progressComponent={<LoadingTable />}
                    />
                  </div>
                  <hr />
                  <Col lg={12} sm={12} className="d-flex justify-content-end">
                    <div className="d-flex gap-2">
                      <Button
                        type="button"
                        color="info"
                        placement="top"
                        onClick={() => {
                          handleClickModal()
                        }}
                      >
                        Order
                      </Button>
                    </div>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const ModalOrder = ({ isModalOrderOpen, toggle, selectedPasien }) => {
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { dataCombo } = useSelector((state) => ({
    dataCombo: state.giziSlice.getMasterGizi?.data || [],
  }))
  const vSetValidationModal = useFormik({
    enableReinitialize: true,
    initialValues: {
      temppasien: selectedPasien,
      tglOrder: dateNow,
      jenisOrder: '',
      diet1: '',
      diet2: '',
      diet3: '',
      kategoriDiet: '',
      menuMakanan: '',
      Keterangan: '',
    },
    validationSchema: Yup.object({
      jenisOrder: Yup.string().required('Jenis Order wajib diisi'),
      diet1: Yup.string().required('Diet 1 wajib diisi'),
      kategoriDiet: Yup.string().required('Kategori Diet wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertOrderGizi(values, () => {
          toggle()
          resetForm({ values: '' })
        })
      )
    },
  })
  const [hideMakanan, sethideMakanan] = useState(false)
  useEffect(() => {
    sethideMakanan(
      selectedPasien.some(
        (element) => element.objectkelasfk !== 1 && element.objectkelasfk !== 2
      )
    )
  }, [sethideMakanan, selectedPasien])

  return (
    <ModalApp
      isOpen={isModalOrderOpen}
      toggle={toggle}
      centered={true}
      size="xl"
      backdrop={'static'}
      labelHeader="Order Gizi"
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          vSetValidationModal.handleSubmit()
          return false
        }}
        className="gy-4"
        action="#"
      >
        <Row className="gy-2">
          <ColLabelInput2 label="Tanggal Order" lg={6}>
            <KontainerFlatpickr
              isError={
                vSetValidationModal.touched?.tglOrder &&
                !!vSetValidationModal.errors?.tglOrder
              }
              id="tglOrder"
              options={{
                dateFormat: 'Y-m-d',
                defaultDate: 'today',
              }}
              value={vSetValidationModal.values.tglOrder}
              onChange={([newDate]) => {
                vSetValidationModal.setFieldValue(
                  'tglOrder',
                  newDate.toISOString()
                )
              }}
            />
            {vSetValidationModal.touched?.tglOrder &&
              !!vSetValidationModal.errors.tglOrder && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.tglOrder}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <ColLabelInput2 label="Jenis Order" lg={6}>
            <CustomSelect
              id="jenisOrder"
              name="jenisOrder"
              options={dataCombo.resultjenisOrder}
              onChange={(e) => {
                vSetValidationModal.setFieldValue('jenisOrder', e?.value || '')
              }}
              value={vSetValidationModal.values.jenisOrder}
              onBlur={vSetValidationModal.handleBlur}
              className={`input row-header ${
                !!vSetValidationModal?.errors.jenisOrder ? 'is-invalid' : ''
              }`}
              isClearEmpty
            />
            {vSetValidationModal.touched.jenisOrder &&
              !!vSetValidationModal.errors.jenisOrder && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.jenisOrder}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <ColLabelInput2 label="Diet 1" lg={6}>
            <CustomSelect
              id="diet1"
              name="diet1"
              options={dataCombo.resultdiet}
              onChange={(e) => {
                vSetValidationModal.setFieldValue('diet1', e?.value || '')
              }}
              value={vSetValidationModal.values.diet1}
              onBlur={vSetValidationModal.handleBlur}
              className={`input row-header ${
                !!vSetValidationModal?.errors.diet1 ? 'is-invalid' : ''
              }`}
              isClearEmpty
            />
            {vSetValidationModal.touched.diet1 &&
              !!vSetValidationModal.errors.diet1 && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.diet1}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <ColLabelInput2 label="Diet 2" lg={6}>
            <CustomSelect
              id="diet2"
              name="diet2"
              options={dataCombo.resultdiet}
              onChange={(e) => {
                vSetValidationModal.setFieldValue('diet2', e?.value || '')
              }}
              value={vSetValidationModal.values.diet2}
              onBlur={vSetValidationModal.handleBlur}
              className={`input row-header ${
                !!vSetValidationModal?.errors.diet2 ? 'is-invalid' : ''
              }`}
              isClearEmpty
            />
            {vSetValidationModal.touched.diet2 &&
              !!vSetValidationModal.errors.diet2 && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.diet2}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <ColLabelInput2 label="Diet 3" lg={6}>
            <CustomSelect
              id="diet3"
              name="diet3"
              options={dataCombo.resultdiet}
              onChange={(e) => {
                vSetValidationModal.setFieldValue('diet3', e?.value || '')
              }}
              value={vSetValidationModal.values.diet3}
              onBlur={vSetValidationModal.handleBlur}
              className={`input row-header ${
                !!vSetValidationModal?.errors.diet3 ? 'is-invalid' : ''
              }`}
              isClearEmpty
            />
            {vSetValidationModal.touched.diet3 &&
              !!vSetValidationModal.errors.diet3 && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.diet3}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <ColLabelInput2 label="Kategori Diet" lg={6}>
            <CustomSelect
              id="kategoriDiet"
              name="kategoriDiet"
              options={dataCombo.resultkategori}
              onChange={(e) => {
                vSetValidationModal.setFieldValue(
                  'kategoriDiet',
                  e?.value || ''
                )
              }}
              value={vSetValidationModal.values.kategoriDiet}
              onBlur={vSetValidationModal.handleBlur}
              className={`input row-header ${
                !!vSetValidationModal?.errors.kategoriDiet ? 'is-invalid' : ''
              }`}
              isClearEmpty
            />
            {vSetValidationModal.touched.kategoriDiet &&
              !!vSetValidationModal.errors.kategoriDiet && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.kategoriDiet}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <div hidden={hideMakanan}>
            <ColLabelInput2 label="Menu Makanan" lg={12}>
              <CustomSelect
                id="menuMakanan"
                name="menuMakanan"
                options={dataCombo.resultmakanan}
                onChange={(e) => {
                  vSetValidationModal.setFieldValue(
                    'menuMakanan',
                    e?.value || ''
                  )
                }}
                value={vSetValidationModal.values.menuMakanan}
                onBlur={vSetValidationModal.handleBlur}
                className={`input row-header ${
                  !!vSetValidationModal?.errors.menuMakanan ? 'is-invalid' : ''
                }`}
                isClearEmpty
              />
              {vSetValidationModal.touched.menuMakanan &&
                !!vSetValidationModal.errors.menuMakanan && (
                  <FormFeedback type="invalid">
                    <div>{vSetValidationModal.errors.menuMakanan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput2>
          </div>
          <ColLabelInput2 label="Keterangan" lg={12}>
            <Input
              id="keterangan"
              name="keterangan"
              type="textarea"
              value={vSetValidationModal.values.keterangan}
              onChange={(e) => {
                vSetValidationModal.setFieldValue('keterangan', e.target.value)
              }}
              invalid={
                vSetValidationModal.touched?.keterangan &&
                !!vSetValidationModal.errors?.keterangan
              }
            />
            {vSetValidationModal.touched?.keterangan &&
              !!vSetValidationModal.errors.keterangan && (
                <FormFeedback type="invalid">
                  <div>{vSetValidationModal.errors.keterangan}</div>
                </FormFeedback>
              )}
          </ColLabelInput2>
          <Col lg={12} sm={12} className="d-flex justify-content-end">
            {' '}
            {/* Use justify-content-end to align items to the right */}
            <div className="d-flex gap-2">
              {' '}
              {/* You can remove flex-wrap if not needed */}
              <Button
                type="submit"
                color="success"
                placement="top"
                onClick={() => {
                  // handleClickModal()
                }}
              >
                Simpan
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </ModalApp>
  )
}
export default OrderMenuGizi
