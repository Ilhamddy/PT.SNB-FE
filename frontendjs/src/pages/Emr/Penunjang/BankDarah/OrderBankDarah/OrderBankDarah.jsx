import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { getDetailJenisProdukBankDarah, getRiwayatOrderBankDarah, postOrderPelayananBankDarah } from '../../../../../store/bankDarah/bankDarahSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../../../Select/Select';
import { comboHistoryUnitGet } from '../../../../../store/actions';
import ListGroupCollapseBankDarah from '../../../../../Components/Common/ListGroupCollapseBankDarah';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../../../../../Components/Table/tableCustomStyles';
import LoadingTable from '../../../../../Components/Table/LoadingTable';
import { ToastContainer, toast } from 'react-toastify';
import { dateTimeLocal } from '../../../../../utils/format';

const OrderBankDarah = () => {
  const { norecdp, norecap } = useParams();
  const dispatch = useDispatch();
  const { dataCombo, dataWidget, dataOrder, loadingOrder } = useSelector((state) => ({
    dataCombo: state.Emr.comboHistoryUnitGet.data,
    dataWidget: state.bankDarahSlice.getDetailJenisProdukBankDarah?.data || [],
    dataOrder: state.bankDarahSlice.getRiwayatOrderBankDarah?.data || [],
    loadingOrder: state.bankDarahSlice.getRiwayatOrderBankDarah.loading,
  }));
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecap: norecap,
      unitasal: '',
      keterangan: ''
    },
    validationSchema: Yup.object({
      // tindakan: Yup.string().required("Tindakan Belum Dipilih"),

    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      resetForm({ values: '' })
    }
  })
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    if (norecdp) {
      dispatch(getDetailJenisProdukBankDarah(''));
      dispatch(comboHistoryUnitGet(norecdp));
      dispatch(getRiwayatOrderBankDarah({ norecdp: norecdp }))
    }
  }, [norecdp, dispatch])
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
      selector: row => row.label,
      sortable: true,
    },
    {

      name: <span className='font-weight-bold fs-13'>Harga</span>,
      selector: row => row.harga?.toLocaleString('id-ID'),
      sortable: true,
      // width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Qty</span>,
      selector: row => row.totalpesan,
      sortable: true,
      // width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Total</span>,
      selector: row => row.totalharga?.toLocaleString('id-ID'),
      sortable: true,
      // width: "250px",
    },
  ];
  const onClickSimpan = () => {
    if (validation.values.unitasal === '') {
      toast.error('Unit Belum Diisi', { autoClose: 3000 });
      return
    }
    let tempValue = {
      norecap: norecap,
      objectunitasal: validation.values.unitasal,
      listtindakan: temp,
      keterangan: validation.values.keterangan
    }
    dispatch(postOrderPelayananBankDarah(tempValue, () => {
      dispatch(getRiwayatOrderBankDarah({ norecdp: norecdp }))
    }))
  }
  const columnsRiwayat = [
    {
      name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
      selector: row => row.noregistrasi,
      sortable: true,
      width: "130px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Tgl. Order</span>,
      selector: row => dateTimeLocal(row.tglinput),
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>No. Order</span>,
      selector: row => row.nomororder,
      sortable: true,
      width: "150px",
      wrap: true
    },
    {

      name: <span className='font-weight-bold fs-13'>Dokter Order</span>,
      selector: row => row.namalengkap,
      sortable: true,
      width: "150px"
    },
    {

      name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
      selector: row => row.namaunit,
      sortable: true,
      width: "150px",
    },
    {

      name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
      selector: row => row.namaproduk,
      sortable: true,
      width: "150px",
    },
    {

      name: <span className='font-weight-bold fs-13'>Keterangan</span>,
      selector: row => row.keterangan,
      sortable: true,
      // width: "250px",
    },
  ];
  return (
    <React.Fragment>
      <div className="p-5">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className="gy-4"
          action="#">
          <Row className="gy-2">
            <Col lg={12}>
              <Col lg={6}>
                <Row className="gy-2">
                  <Col lg={4} md={4}>
                    <div className="mt-2">
                      <Label style={{ color: "black" }} htmlFor="unitasal" className="form-label">Unit Asal</Label>
                    </div>
                  </Col>
                  <Col lg={8} md={8}>
                    <div>
                      <CustomSelect
                        id="unitasal"
                        name="unitasal"
                        options={dataCombo}
                        value={validation.values.unitasal || ""}
                        className={`input ${validation.errors.unitasal ? "is-invalid" : ""}`}
                        onChange={value => validation.setFieldValue('unitasal', value?.value)}
                      />
                      {validation.touched.unitasal && validation.errors.unitasal ? (
                        <FormFeedback type="invalid"><div>{validation.errors.unitasal}</div></FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Col>
            {Object.keys(dataWidget).map((key, index) =>
              <Col xxl={4} sm={6} key={key}>
                <ListGroupCollapseBankDarah
                  key={key}
                  cat={dataWidget[key]}
                  tempData={temp}
                  index={index}
                  onChange={(tempData) => {
                    setTemp(tempData)
                  }} />
              </Col>
            )}
            <Col lg={8} className="gy-2">
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Order Bank Darah</h4>
                </CardHeader>
                <CardBody>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      columns={columns}
                      pagination
                      data={temp}
                      // progressPending={loading}
                      customStyles={tableCustomStyles}
                      progressComponent={<LoadingTable />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Row className="gy-2">
                <Col lg={8} sm={10} className="mt-1">
                  <div>
                    <Input
                      style={{ height: '200px' }}
                      id="keterangan"
                      name="keterangan"
                      type="textarea"
                      placeholder="Keterangan Order"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.keterangan || ""}
                      invalid={
                        validation.touched.keterangan && validation.errors.keterangan ? true : false
                      }
                    />
                    {validation.touched.keterangan && validation.errors.keterangan ? (
                      <FormFeedback type="invalid"><div>{validation.errors.keterangan}</div></FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4} sm={2} className="mt-1">
                  <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                    <Button type="button" color="success" placement="top"
                      onClick={() => onClickSimpan()}>
                      Simpan
                    </Button>
                  </div>
                </Col>

              </Row>
            </Col>
            <Col lg={12} className="gy-2">
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>Riwayat Order Tindakan</h4>
                </CardHeader>
                <CardBody>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      columns={columnsRiwayat}
                      pagination
                      data={dataOrder}
                      progressPending={loadingOrder}
                      customStyles={tableCustomStyles}
                      progressComponent={<LoadingTable />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  )
}
export default (OrderBankDarah)