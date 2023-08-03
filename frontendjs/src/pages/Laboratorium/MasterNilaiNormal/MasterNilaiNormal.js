import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip, ListGroup, ListGroupItem
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import CustomSelect from '../../Select/Select';
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    comboLaboratoriumGet, saveNilaiNormalLaboratorium,laboratoriumResetForm
} from '../../../store/actions';

const MasterNilaiNormal = () => {
    const { idproduk, layanan, kodeexternal, detailjenis } = useParams();
    document.title = "Master Nilai Normal";
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    const { data, loading, error,
        newDataNilai, loadingDataNilai, successDataNilai, errorDataNilai } = useSelector((state) => ({
            data: state.Laboratorium.comboLaboratoriumGet.data,
            loading: state.Laboratorium.comboLaboratoriumGet.loading,
            newDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.newData,
            loadingDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.loading,
            successDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.success,
            errorDataNilai: state.Laboratorium.saveNilaiNormalLaboratorium.error,
        }));
    const [rows, setRows] = useState([{
        id: 1, kode: `1`, nama: `${layanan}`, satuan: '', kelompokumur: '', aksi: '', statusDisable: true,
        level: 1, urutan: 1, lastUrutan: 1, lastTombol: false, lastId: 1, objectinduk: 1
    }]);

    const handleDeleteRow = (id, eObjectInduk) => {
        let filteredRows = rows.filter((row) => row.id !== id);
        let filteredData = filteredRows.filter((item) => item.objectinduk === eObjectInduk);
        const maxId = filteredData.reduce((max, item) => (item.id > max ? item.id : max), 0);
        filteredRows = filteredRows.map((row) =>
            // ({ ...row, lastTombol: (row.id === tempId) })
            row.id === eObjectInduk ? { ...row, lastId: maxId, lastUrutan: filteredData.length } : row
        );
        filteredRows = filteredRows.map((row) =>
            // ({ ...row, lastTombol: (row.id === tempId) })
            row.id === maxId ? { ...row, lastTombol: true } : row
        );
        setRows(filteredRows);
    };

    const handleAddRow = (eId, eLevel, eUrutan, eLUrutan) => {
        if (eLevel === 1) {
            let tempId = '';

            let updatedRows = rows.map((row) =>
                row.id === eId ? {
                    ...row,
                    lastUrutan: eLUrutan + 1,
                    lastId: rows.length + 1
                } : row
            );
            const newRow = {
                id: rows.length + 1,
                kode: `1.` + (parseFloat(eLUrutan) + 1),
                nama: ``, satuan: '',
                kelompokumur: '',
                aksi: '',
                statusDisable: false,
                level: eLevel + 1, urutan: parseFloat(eLUrutan) + 1, lastUrutan: 0, lastTombol: true,
                lastId: 1,
                objectinduk: eId
            };
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === eId) {
                    tempId = rows[i].lastId;
                }
            }
            updatedRows = [...updatedRows, newRow]
            // setRows([...updatedRows, newRow]);
            if (rows.length > 1) {
                updatedRows = updatedRows.map((row) =>
                    // ({ ...row, lastTombol: (row.id === tempId) })
                    row.id === tempId ? { ...row, lastTombol: false } : row
                );
            }
            setRows([...updatedRows]);
            // console.log(rows)
        } else if (eLevel === 2) {
            let tempId = '';

            let updatedRows = rows.map((row) =>
                row.id === eId ? {
                    ...row,
                    lastUrutan: eLUrutan + 1,
                    lastId: rows.length + 1,
                    lastTombol: false
                } : row
            );
            const newRow = {
                id: rows.length + 1,
                kode: `1.${eUrutan}.` + (parseFloat(eLUrutan) + 1),
                nama: ``, satuan: '',
                kelompokumur: '',
                aksi: '',
                statusDisable: false,
                level: eLevel + 1, urutan: parseFloat(eLUrutan) + 1, lastUrutan: 0, lastTombol: true,
                lastId: 1,
                objectinduk: eId
            };
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === eId) {
                    tempId = rows[i].lastId;
                }
            }
            updatedRows = [...updatedRows, newRow]
            // setRows([...updatedRows, newRow]);

            if (rows.length > 1) {
                updatedRows = updatedRows.map((row) =>
                    // ({ ...row, lastTombol: (row.id === tempId) })
                    row.id === tempId ? { ...row, lastTombol: false } : row
                );
            }
            // console.log(tempId)
            setRows([...updatedRows]);
            // console.log(updatedRows)

        }
    };
    useEffect(() => {
        dispatch(comboLaboratoriumGet(''));
    }, [dispatch])

    const handleInputChange = (id, nama, value) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, [nama]: value } : row
        );
        setRows(updatedRows);
    };
    const handleBack = () => {
        history("/laboratorium/masterlayananlab");
    };
    const handleClickSimpan = () => {
        let tempValue = {
            data: rows,
            objectproduk: idproduk
        }
        dispatch(saveNilaiNormalLaboratorium(tempValue));
    }
    const handleSelectSatuan = (eValue, eId, eNama) => {
        const updatedRows = rows.map((row) =>
            row.id === eId ? { ...row, [eNama]: eValue } : row
        );
        setRows(updatedRows);
    };

    rows.sort((a, b) => {
        // Convert the "kode" strings into arrays of numbers to compare the segments
        const kodeA = a.kode.split('.').map(Number);
        const kodeB = b.kode.split('.').map(Number);

        // Compare each segment of the "kode" arrays
        for (let i = 0; i < Math.max(kodeA.length, kodeB.length); i++) {
            const segmentA = kodeA[i] || 0; // If a segment is missing, consider it as 0
            const segmentB = kodeB[i] || 0;

            if (segmentA !== segmentB) {
                return segmentA - segmentB; // Compare segments and return the result
            }
        }

        return 0; // Return 0 if the two objects have the same "kode"
    });


    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Master Nilai Normal" pageTitle="Forms" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Master Nilai Normal <span style={{ color: '#e67e22' }}> </span></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={4}>
                                                <Table className="table-sm table-borderless mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <th className="ps-0" scope="row">
                                                                <li>Nama Layanan</li>
                                                            </th>
                                                            <td>: {layanan}</td>
                                                        </tr>
                                                        <tr>
                                                            <th className="ps-0" scope="row">
                                                                <li>Kode Pemeriksaan</li>
                                                            </th>
                                                            <td>: {kodeexternal}</td>
                                                        </tr>
                                                        <tr>
                                                            <th className="ps-0" scope="row">
                                                                <li>Detail Jenis Produk</li>
                                                            </th>
                                                            <td>: {detailjenis}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col lg={8}></Col>
                                            <Col lg={12}>
                                                <Table className="table-sm table-borderless mb-0" id="tab_logic">
                                                    <thead>
                                                        <tr>
                                                            {/* <th className="text-center">No</th> */}
                                                            <th className="text-center">Kode</th>
                                                            <th className="text-center">Nama Pemeriksaan</th>
                                                            <th className="text-center">Satuan</th>
                                                            <th className="text-center">Kelompok Umur</th>
                                                            <th className="text-center">Aksi</th>
                                                            {/* <th className="text-center">test</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row) => (
                                                            <tr key={row.id} className="text-center">
                                                                {/* <td>{row.id}</td> */}
                                                                <td>
                                                                    {row.kode}
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        name="nama"
                                                                        value={row.nama}
                                                                        placeholder="Enter nama"
                                                                        className="form-control"
                                                                        // disabled={row.statusDisable}
                                                                        onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CustomSelect
                                                                        id="satuan"
                                                                        name="satuan"
                                                                        options={data.datasatuan}
                                                                        value={row.satuan}
                                                                        onChange={value => handleSelectSatuan(value.value, row.id, 'satuan')}
                                                                    // onInputChange={handleDiagnosaix}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CustomSelect
                                                                        id="kelompokumur"
                                                                        name="kelompokumur"
                                                                        options={data.datakelumur}
                                                                        value={row.kelompokumur}
                                                                        onChange={value => handleSelectSatuan(value.value, row.id, 'kelompokumur')}
                                                                    // onInputChange={handleDiagnosaix}
                                                                    />
                                                                </td>
                                                                {/* <td>
                                                                    {row.lastUrutan}
                                                                </td> */}
                                                                <td>
                                                                    {row.statusDisable ? (
                                                                        <Button type="button" style={{ backgroundColor: 'green' }} className="rounded-pill" placement="top"
                                                                            onClick={(e) => handleAddRow(row.id, row.level, row.urutan, row.lastUrutan)}>
                                                                            Tambah Sub
                                                                        </Button>
                                                                    ) :
                                                                        <>
                                                                            {row.level < 3 ? (
                                                                                <Button type="button" style={{ backgroundColor: 'green' }} className="rounded-pill" placement="top"
                                                                                    onClick={(e) => handleAddRow(row.id, row.level, row.urutan, row.lastUrutan)}>
                                                                                    Tambah Sub
                                                                                </Button>
                                                                            ) :
                                                                                null
                                                                            }
                                                                        </>

                                                                    }
                                                                </td>
                                                                {row.id > 1 && row.lastTombol ? (
                                                                    <td>
                                                                        <Button type="button" style={{ backgroundColor: 'red' }} className="rounded-pill" placement="top"
                                                                            onClick={() => handleDeleteRow(row.id, row.objectInduk)}>
                                                                            Hapus
                                                                        </Button>
                                                                    </td>
                                                                ) : null}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col>
                                                <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian"
                                                    onClick={handleClickSimpan}
                                                >
                                                    Simpan
                                                </Button>
                                                <Button type="button" color='danger' className="rounded-pill" placement="top" onClick={handleBack}>
                                                    Back
                                                </Button>

                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(MasterNilaiNormal)