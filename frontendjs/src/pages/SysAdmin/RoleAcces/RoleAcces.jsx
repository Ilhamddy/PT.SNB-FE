import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Card, Col, Container, Row, Form, Input, Label, FormFeedback, CardBody, Button, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataTable from "react-data-table-component";
import LoadingTable from "../../../Components/Table/LoadingTable";
import {
  getComboSysadmin
} from '../../../store/sysadmin/action'

const RoleAcces = () => {
  document.title = "Role Acces";
  const dispatch = useDispatch();
  const { dataCombo,
    loadingCombo } = useSelector((state) => ({
      dataCombo: state.Sysadmin.getComboSysadmin.data || [],
      loadingCombo: state.Sysadmin.getComboSysadmin.loading,
    }));
  const vSetValidationRole = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 1,
    },
    validationSchema: Yup.object({
      nip: Yup.string().required("NIP wajib diisi"),
    }),
    onSubmit: (values) => {
      // dispatch(saveBiodataPegawai(values, () => {

      // }));
    }
  })
  useEffect(() => {
    dispatch(getComboSysadmin({
      cari:''
    }))
  }, [dispatch])
  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#ffffff',
        backgroundColor: '#e67e22',
      },
    },
    rows: {
      style: {
        color: "black",
        backgroundColor: "#f1f2f6"
      },
    }
  }
  const columns = [
    {
      name: <span className='font-weight-bold fs-13'>No</span>,
      selector: row => row.no,
      sortable: true,
      width: "50px"
    },
    {
      name: <span className='font-weight-bold fs-13'>ID</span>,
      selector: row => row.id,
      sortable: true,
      width: "50px"
    },
    {
      name: <span className='font-weight-bold fs-13'>Nama Role</span>,
      selector: row => row.name,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      wrap: true,
    },
    {

      name: <span className='font-weight-bold fs-13'>Akses Modul</span>,
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledDropdown className="dropdown d-inline-block">
              <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2" type="button"
              >
                <i className="ri-pencil-fill"></i>
              </DropdownToggle>
              {/* <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="#!" onClick={() => handleClickEdit(data)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Edit</DropdownItem>
              </DropdownMenu> */}
            </UncontrolledDropdown>
            {/* <UncontrolledTooltip placement="top" target="tooltipTop2" > Delete </UncontrolledTooltip> */}
          </div>
        );
      },
      sortable: false,
      // width: "150px"
    },
  ];
  const handleRole = (characterEntered) => {
    if (characterEntered.length > 3) {
      dispatch(getComboSysadmin({
        cari:characterEntered
      }))
    }
};
  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Role Acces" pageTitle="Forms" />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              vSetValidationRole.handleSubmit();
              return false;
            }}
            className="gy-4"
            action="#">
            <Row>
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <Row className="gy-2">
                      <Col lg={4}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Nama Role</Label>
                        </div>
                      </Col>
                      <Col lg={8}>
                        <Input
                          id="nameRole"
                          name="nameRole"
                          type="text"
                          value={vSetValidationRole.values.nameRole}
                          onChange={(e) => {
                            vSetValidationRole.setFieldValue('nameRole', e.target.value)
                            // handleRole(e.target.value)
                          }}
                          invalid={vSetValidationRole.touched?.nameRole &&
                            !!vSetValidationRole.errors?.nameRole}
                        />
                        {vSetValidationRole.touched?.nameRole
                          && !!vSetValidationRole.errors.nameRole && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidationRole.errors.nameRole}</div>
                            </FormFeedback>
                          )}
                      </Col>
                      <Col lg={12} className="mr-3 me-3 mt-2">
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                          <Button

                            type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                          <Button type="button" color="danger" style={{ width: '20%' }}
                          // onClick={() => { handleBack() }}
                          >Batal</Button>
                        </div>
                      </Col>
                      <Col lg={12} className="mr-3 me-3 mt-2">
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                          <Input
                            style={{ width: '40%' }}
                            id="cariRole"
                            name="cariRole"
                            type="text"
                            value={vSetValidationRole.values.cariRole}
                            onChange={(e) => {
                              vSetValidationRole.setFieldValue('cariRole', e.target.value)
                            }}
                            invalid={vSetValidationRole.touched?.cariRole &&
                              !!vSetValidationRole.errors?.cariRole}
                            placeholder="Cari Role..."
                          />
                          {vSetValidationRole.touched?.cariRole
                            && !!vSetValidationRole.errors.cariRole && (
                              <FormFeedback type="invalid">
                                <div>{vSetValidationRole.errors.cariRole}</div>
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div id="table-gridjs">
                          <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="330px"
                            columns={columns}
                            pagination
                            data={dataCombo.role}
                            progressPending={loadingCombo}
                            customStyles={tableCustomStyles}
                            progressComponent={<LoadingTable />}
                            // onRowClicked={(row) => handleClick(row)}
                            pointerOnHover
                            highlightOnHover
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <Row className="gy-2">
                      <Col lg={4}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Nama Role</Label>
                        </div>
                      </Col>
                      <Col lg={8}>
                        <Input
                          id="nameRole"
                          name="nameRole"
                          type="text"
                          value={vSetValidationRole.values.nameRole}
                          onChange={(e) => {
                            vSetValidationRole.setFieldValue('nameRole', e.target.value)
                          }}
                          invalid={vSetValidationRole.touched?.nameRole &&
                            !!vSetValidationRole.errors?.nameRole}
                        />
                        {vSetValidationRole.touched?.nameRole
                          && !!vSetValidationRole.errors.nameRole && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidationRole.errors.nameRole}</div>
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(RoleAcces)