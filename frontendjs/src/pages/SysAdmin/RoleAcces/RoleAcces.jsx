import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Card, Col, Container, Row, Form, Input, Label, FormFeedback, CardBody, Button, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataTable from "react-data-table-component";
import LoadingTable from "../../../Components/Table/LoadingTable";
import {
  getComboSysadmin, upsertRoles, getMapRolePermissions, upsertRolePermissions,
  upsertMenuModul
} from '../../../store/sysadmin/action'

const RoleAcces = () => {
  document.title = "Role Acces";
  const dispatch = useDispatch();
  const { dataCombo,
    loadingCombo, dataMapPermissions, loadingMapPermissions,
    newData, success, loading } = useSelector((state) => ({
      dataCombo: state.Sysadmin.getComboSysadmin.data || [],
      loadingCombo: state.Sysadmin.getComboSysadmin.loading,
      dataMapPermissions: state.Sysadmin.getMapRolePermissions.data || [],
      loadingMapPermissions: state.Sysadmin.getMapRolePermissions.loading,
      newData: state.Sysadmin.upsertRolePermissions.newData,
      success: state.Sysadmin.upsertRolePermissions.success,
      loading: state.Sysadmin.upsertRolePermissions.loading,
    }));
  const vSetValidationRole = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: 1,
      cariRole: '',
      nameRole: ''
    },
    validationSchema: Yup.object({
      nameRole: Yup.string().required("Nama Modul wajib diisi"),
    }),
    onSubmit: (values) => {
      dispatch(
        upsertRoles(values, () => {
          vSetValidationRole.resetForm()
          dispatch(getComboSysadmin({
            cari: ''
          }))
        })
      )
    }
  })
  const vSetValidationMenu = useFormik({
    enableReinitialize: true,
    initialValues: {
      modul: '',
      namaMenu: '',
      namaIcon: '',
      nourut: ''
    },
    validationSchema: Yup.object({
      // nameRole: Yup.string().required("Nama Modul wajib diisi"),
    }),
    onSubmit: (values) => {
      // values.modul = selected.idRole
      console.log(values)
      // dispatch(
      // upsertMenuModul(values, () => {
      //   vSetValidationRole.resetForm()
      //   dispatch(getComboSysadmin({
      //     cari: ''
      //   }))
      // })
      // )
    }
  })
  useEffect(() => {
    dispatch(getComboSysadmin({
      cari: ''
    }))
    // dispatch(getMapRolePermissions(''))
  }, [dispatch])
  const [tempPermissions, settempPermissions] = useState([])
  useEffect(() => {
    if (dataCombo?.permissions) {
      settempPermissions(dataCombo.permissions)
    }
  }, [dataCombo])
  useEffect(() => {
    if (dataMapPermissions) {
      const setFF = vSetValidationMenu.setFieldValue
      setFF('nourut', dataMapPermissions.length + 1)
    }
  }, [dataMapPermissions, vSetValidationMenu.setFieldValue])
  const displayDelete = (value, data) => {
    if (selected.name === null) {
      toast.error("Role Belum Dipilih", { autoClose: 3000 });
      return
    }
    let temp = tempPermissions
    temp.forEach(element => {
      if (element.id === data.id) {
        if (value === true) {
          element.cheked = true
        } else {
          element.cheked = false
        }
      }
    });
    settempPermissions([...temp])
    const values = {
      role: selected.idRole,
      permissionid: data.id,
      value: value
    }
    dispatch(upsertRolePermissions(values, () => {
      // resetForm()
    }));
  };
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
      name: <span className='font-weight-bold fs-13'>Nama Modul</span>,
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
                onClick={() => handleClick(data)}
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
  const columnsMap = [
    {
      name: <span className='font-weight-bold fs-13'>No</span>,
      selector: row => row.nourut,
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
      name: <span className='font-weight-bold fs-13'>Menu</span>,
      selector: row => row.reportdisplay,
      sortable: true,
      // selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(dataTtv)}>{row.noregistrasi}</button>),
      // width: "250px",
      wrap: true,
    },
    // {
    //   name: <span className='font-weight-bold fs-13'>#</span>,//<Input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />,
    //   cell: (data) => (
    //     <Input className="form-check-input" type="checkbox" id="formCheckCito" checked={data.cheked}
    //       onChange={value => (displayDelete(value.target.checked, data))} />
    //   ),
    // },
  ];
  const handleRole = (characterEntered) => {
    if (characterEntered.length > 3) {
      dispatch(getComboSysadmin({
        cari: characterEntered
      }))
    }
  };
  const handleRoleKeyKpres = (e) => {
    if (e.keyCode === 13) {
      dispatch(getComboSysadmin({
        cari: vSetValidationRole.values.cariRole
      }))
    }
  }
  const [selected, setselected] = useState({
    name: null,
    idRole: null
  })
  const handleClick = (e) => {
    setselected({
      name: e.name,
      idRole: e.id
    })
    let temp = tempPermissions
    // temp.forEach(element => {
    //   element.cheked = false
    // });
    // const filteredData = dataMapPermissions.filter(item => item.roleid === e.id);
    // temp.forEach(element => {
    //   filteredData.forEach(element2 => {
    //     if (element.id === element2.permissionid) {
    //       element.cheked = true
    //     }
    //   });
    // });
    // settempPermissions([...temp])
    dispatch(getMapRolePermissions({ idmodul: e.id }))
  };
  const handleClickRowMenu = (e) => {

  }
  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Role Acces" pageTitle="Forms" />

          <Row>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      vSetValidationRole.handleSubmit();
                      return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="gy-2">
                      <Col lg={4}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Nama Modul</Label>
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
                      <Col lg={12} className="mr-3 me-3 mt-2">
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                          <Button

                            type="submit" color="success" style={{ width: '30%' }}>Simpan</Button>
                          <Button type="button" color="danger" style={{ width: '30%' }}
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
                              handleRole(e.target.value)
                            }}
                            invalid={vSetValidationRole.touched?.cariRole &&
                              !!vSetValidationRole.errors?.cariRole}
                            placeholder="Cari Role..."
                            onKeyDown={handleRoleKeyKpres}
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
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      vSetValidationMenu.handleSubmit();
                      return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="gy-2">
                      <Col lg={3}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Modul :</Label>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <div className="mt-2">
                          <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">{selected && selected.name ? selected.name : '-'}</Label>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="border-bottom">
                          <Row className="gy-2">
                            <Col lg={4}>
                              <div className="mt-2">
                                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Menu</Label>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <Input
                                id="namaMenu"
                                name="namaMenu"
                                type="text"
                                value={vSetValidationMenu.values.namaMenu}
                                onChange={(e) => {
                                  vSetValidationMenu.setFieldValue('namaMenu', e.target.value)
                                }}
                                invalid={vSetValidationMenu.touched?.namaMenu &&
                                  !!vSetValidationMenu.errors?.namaMenu}
                              />
                              {vSetValidationMenu.touched?.namaMenu
                                && !!vSetValidationMenu.errors.namaMenu && (
                                  <FormFeedback type="invalid">
                                    <div>{vSetValidationMenu.errors.namaMenu}</div>
                                  </FormFeedback>
                                )}
                            </Col>
                            <Col lg={4}>
                              <div className="mt-2">
                                <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Icon</Label>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <Input
                                id="namaIcon"
                                name="namaIcon"
                                type="text"
                                value={vSetValidationMenu.values.namaIcon}
                                onChange={(e) => {
                                  vSetValidationMenu.setFieldValue('namaIcon', e.target.value)
                                }}
                                invalid={vSetValidationMenu.touched?.namaIcon &&
                                  !!vSetValidationMenu.errors?.namaIcon}
                              />
                              {vSetValidationMenu.touched?.namaIcon
                                && !!vSetValidationMenu.errors.namaIcon && (
                                  <FormFeedback type="invalid">
                                    <div>{vSetValidationMenu.errors.namaIcon}</div>
                                  </FormFeedback>
                                )}
                            </Col>
                            <Col lg={12} className="mr-3 me-3 mt-2">
                              <div className="d-flex flex-wrap justify-content-end gap-2">
                                <Button

                                  type="submit" color="success" style={{ width: '30%' }}>Simpan</Button>
                                <Button type="button" color="danger" style={{ width: '30%' }}
                                // onClick={() => { handleBack() }}
                                >Batal</Button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      {/* <Col lg={12} className="mr-3 me-3 mt-2">
                      <div className="d-flex flex-wrap justify-content-end gap-2">
                        <Input
                          style={{ width: '40%' }}
                          id="cariPermision"
                          name="cariPermision"
                          type="text"
                          value={vSetValidationMenu.values.cariPermision}
                          onChange={(e) => {
                            vSetValidationMenu.setFieldValue('cariPermision', e.target.value)
                          }}
                          invalid={vSetValidationMenu.touched?.cariPermision &&
                            !!vSetValidationMenu.errors?.cariPermision}
                        />
                        {vSetValidationMenu.touched?.cariPermision
                          && !!vSetValidationMenu.errors.cariPermision && (
                            <FormFeedback type="invalid">
                              <div>{vSetValidationMenu.errors.cariPermision}</div>
                            </FormFeedback>
                          )}
                      </div>
                    </Col> */}
                      <Col lg={12}>
                        <div id="table-gridjs">
                          <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="330px"
                            columns={columnsMap}
                            pagination
                            data={dataMapPermissions}
                            progressPending={loadingMapPermissions}
                            customStyles={tableCustomStyles}
                            progressComponent={<LoadingTable />}
                            onRowClicked={(row) => handleClickRowMenu(row)}
                            pointerOnHover
                            highlightOnHover
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
                <CardBody>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(RoleAcces)