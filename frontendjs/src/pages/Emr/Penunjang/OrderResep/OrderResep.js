import { Button, Col, FormFeedback, Input, Label, Row } from "reactstrap"
import CustomSelect from "../../../Select/Select"
import { useFormik } from "formik"
import DataTable from 'react-data-table-component';
import LoadingTable from "../../../../Components/Table/LoadingTable";
import NoDataTable from "../../../../Components/Table/NoDataTable";
import { onChangeStrNbr, strToNumber } from "../../../../utils/format";
import { useEffect, useRef, useState } from "react";
import { getComboResep } from "../../../../store/master/action";
import { useDispatch, useSelector } from "react-redux";

const initValueResep = {
    obat: "",
    namaobat: "",
    satuanobat: "",
    koder: 1,
    qty: "",
    qtyracikan: "",
    qtypembulatan: "",
    sediaan: "",
    harga: "",
    total: "",
    signa: "",
    keterangan: "",
    kodertambahan: "",
    racikan: []
}

const initValueRacikan = {
    ...initValueResep,
    racikan: undefined
}


const OrderResep = () => {
    const dispatch = useDispatch()

    const {
        pegawai,
        unit,
        keteranganResep,
        signa
    } = useSelector((state) => ({
        pegawai: state.Master?.getComboResep?.data?.pegawai,
        unit: state.Master?.getComboResep?.data?.unit,
        keteranganResep: state.Master?.getComboResep?.data?.keteranganresep,
        signa: state.Master?.getComboResep?.data?.signa,
    }))
    const vResep = useFormik({
        initialValues: {
            dokter: "",
            namadokter: "",
            unittujuan: "",
            resep: [
                {
                    ...initValueResep
                }
            ],
        }
    })

    // harusnuya pake memoized tapi lagi keburu
    const resepRef = useRef([
        {
            ...initValueResep
        }
    ])

    const handleChangeResep = (newVal, field, row, isSet) => {
        const newReseps = [...resepRef.current]
        const newResep = {...newReseps[row.koder - 1]}
        newResep[field] = newVal
        newReseps[row.koder - 1] = newResep
        resepRef.current = newReseps
        if(isSet){
            vResep.setFieldValue("resep", resepRef.current)
        }
    }

    const handleChangeRacikan = (newVal, field, rowUtama, rowRacikan) => {
        const newReseps = [...resepRef.current]
        const newResep = {...newReseps[rowUtama.koder - 1]}
        const newRacikan = {...newResep.racikan[rowRacikan.koder - 1]}
        newRacikan[field] = newVal
        newResep.racikan[rowRacikan.koder - 1] = newRacikan
        newReseps[rowUtama.koder - 1] = newResep
        resepRef.current = newReseps
    }

    const handleChangeAllResep = (newVal) => {
        let newResep = [...newVal]
        //diurutkan agar non racikan yang duluan
        newResep = newResep.sort((a, b) => {
            if(a.racikan.length > 0 && b.racikan.length === 0) return 1
            if(a.racikan.length === 0 && b.racikan.length > 0) return -1
            return 0
        } )
        newResep = newResep.map((val, key) => {
            val.koder = key + 1
            val.racikan = val.racikan.map((valRacikan, keyRacikan) => {
                valRacikan.koder = keyRacikan + 1
                return valRacikan
            })
            return val
        })
        
        resepRef.current = newVal
        vResep.setFieldValue("resep", resepRef.current)
    }

    const handleBlur = () => {
        vResep.setFieldValue("resep", resepRef.current)
    }

    useEffect(() => {
        dispatch(getComboResep())
    }, [dispatch])

    const columnsResep = [
        {
            name: <span className='font-weight-bold fs-13'>R/</span>,
            Cell: ({row}) => row.koder,
            width: "5%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Obat</span>,
            Cell: ({row}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                const [val, setVal] = useState("")
                return (
                    <div>
                        <CustomSelect
                            id="obat"
                            name="obat"
                            options={[]}
                            onChange={(e) => {
                                handleChangeResep(e?.value || "", "obat", row);
                                setVal(e?.value || "")
                            }}
                            value={val}
                            className={`input ${!!errorsResep?.obat
                                ? "is-invalid" : ""}`}
                            />
                        {errorsResep?.obat
                            && !!errorsResep?.obat && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorsResep?.obat}
                                    </div>
                                </FormFeedback>
                            ) 
                        }
                    </div>
                )
            },
            width: "23%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Qty</span>,
            Cell: ({row}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                const [val, setVal] = useState(row.qty)
                return (
                    <div>
                        <Input 
                            id={`qty-${row.koder}`}
                            name={`qty`}
                            type="text"
                            value={val} 
                            onBlur={handleBlur}
                            onChange={(e) => {
                                const newVal = onChangeStrNbr(e.target.value, val)
                                setVal(newVal)
                                handleChangeResep(newVal, "qty", row)
                            }}
                            invalid={touchedResep?.qty && !!errorsResep?.qty}
                            />
                        {
                        touchedResep?.qty
                            && !!errorsResep?.qty &&  (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.qty}
                                </div>
                            </FormFeedback>
                        )}
                    </div>
                )
            },
            width: "17%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Sediaan</span>,
            Cell: ({row}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                const [val, setVal] = useState(row.sediaan)
                return (
                    <div>
                        <CustomSelect
                            id={`sediaan-${row.koder}`}
                            name={`sediaan-${row.koder}`}
                            options={[]}
                            onChange={(e) => {
                                const newVal = e?.value || ""
                                handleChangeResep(newVal, "sediaan", row)
                            }}
                            value={val}
                            className={`input ${!!errorsResep?.sediaan
                                ? "is-invalid" : ""}`}
                            />
                        {errorsResep?.sediaan
                            && !!errorsResep?.sediaan && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorsResep?.sediaan}
                                    </div>
                                </FormFeedback>
                            ) 
                        }
                    </div>
                )
            },
            width: "10%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Harga</span>,
            Cell: ({row}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                const [val, setVal] = useState(row.harga)
                return (
                    <div>
                        <Input 
                            id={`harga-${row.koder}`}
                            name={`harga`}
                            type="text"
                            value={val} 
                            onBlur={handleBlur}
                            onChange={(e) => {
                                const newVal = onChangeStrNbr(e.target.value, val)
                                setVal(newVal)
                                handleChangeResep(newVal, "harga", row)
                            }}
                            invalid={touchedResep?.harga && !!errorsResep?.harga}
                            />
                        {
                        touchedResep?.harga
                            && !!errorsResep?.qty &&  (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.harga}
                                </div>
                            </FormFeedback>
                        )}
                    </div>
                )
            },
            width: "10%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Signa</span>,
            Cell: ({row}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                return (
                    <div>
                        <CustomSelect
                            id={`signa-${row.koder}`}
                            name={`signa-${row.koder}`}
                            options={signa}
                            onChange={(e) => {
                                const newVal = e?.value || ""
                                handleChangeResep(newVal, "signa", row, true)
                            }}
                            value={row.signa}
                            className={`input ${!!errorsResep?.signa
                                ? "is-invalid" : ""}`}
                            />
                        {touchedResep?.signa
                            && !!errorsResep?.signa && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorsResep?.signa}
                                    </div>
                                </FormFeedback>
                            ) 
                        }
                    </div>
                )
            },
            width: "10%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Keterangan</span>,
            Cell: ({row}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                return (
                    <div>
                        <CustomSelect
                            id={`keterangan-${row.koder}`}
                            name={`keterangan-${row.koder}`}
                            options={keteranganResep}
                            onChange={(e) => {
                                const newVal = e?.value || ""
                                handleChangeResep(newVal, "keterangan", row, true)
                            }}
                            value={row.keterangan}
                            className={`input ${!!errorsResep?.keterangan
                                ? "is-invalid" : ""}`}
                            />
                        {touchedResep?.keterangan
                            && !!errorsResep?.keterangan && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorsResep?.keterangan}
                                    </div>
                                </FormFeedback>
                            ) 
                        }
                    </div>
                )
            },
            width: "15%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Hapus</span>,
            Cell: ({row}) => {
                return (
                    <div>
                        <Button color="danger" onClick={() => {
                            if(resepRef.current.length === 1) return;
                            const newResep = [...resepRef.current]
                            newResep.splice(row.koder - 1, 1)
                            handleChangeAllResep(newResep)
                        }}>
                            -
                        </Button>
                    </div>
                )
            },
            width: "10%"
        },
    ];

    const columnsResepRacikan = [
        {
            name: <span className='font-weight-bold fs-13'>R/</span>,
            Cell: ({row, rowUtama}) => `${rowUtama.koder}.${row.koder}`,
            width: "5%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Obat</span>,
            Cell: ({row, rowUtama}) => {
                const errorsResep = vResep.errors?.resep?.[rowUtama.koder - 1]
                ?.racikan?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[rowUtama.koder - 1]
                ?.racikan?.[row.koder - 1]
                const [val, setVal] = useState("")
                return (
                    <div>
                        <CustomSelect
                            id="obat"
                            name="obat"
                            options={[]}
                            onChange={(e) => {
                                handleChangeRacikan(e?.value || "", "obat", rowUtama, row);
                                setVal(e?.value || "")
                            }}
                            value={val}
                            className={`input ${!!errorsResep?.obat
                                ? "is-invalid" : ""}`}
                            />
                        {touchedResep?.obat
                            && !!errorsResep?.obat && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {errorsResep?.obat}
                                    </div>
                                </FormFeedback>
                            ) 
                        }
                    </div>
                )
            },
            width: "15%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Qty</span>,
            Cell: ({row, rowUtama}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                ?.racikan?.[rowUtama.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                ?.racikan?.[rowUtama.koder - 1]
                const [val, setVal] = useState(row.qty)
                return (
                    <div>
                        <Input 
                            id={`qty-${row.koder}`}
                            name={`qty`}
                            type="text"
                            value={val} 
                            onChange={(e) => {
                                const newVal = onChangeStrNbr(e.target.value, val)
                                setVal(newVal)
                                handleChangeRacikan(newVal, "qty", rowUtama, row)
                            }}
                            onBlur={handleBlur}
                            invalid={touchedResep?.qty && !!errorsResep?.qty}
                            />
                        {
                        touchedResep?.qty
                            && !!errorsResep?.qty &&  (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.qty}
                                </div>
                            </FormFeedback>
                        )}
                    </div>
                )
            },
            width: "8%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Qty</span>,
            Cell: ({rowUtama}) => <p>/{rowUtama.qty} racikan</p>,
            width: "10%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Qty</span>,
            Cell: ({row, rowUtama}) => <p>{(strToNumber(row.qty || 0)) * strToNumber(rowUtama.qty || 0)} {row.satuanobat}</p>,
            width: "7%"    
        },
        {
            name: <span className='font-weight-bold fs-13'>Sediaan</span>,
            Cell: ({row}) => <div></div>,
            width: "10%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Harga</span>,
            Cell: ({row, rowUtama}) => {
                const errorsResep = vResep.errors?.resep?.[row.koder - 1]
                const touchedResep = vResep.touched?.resep?.[row.koder - 1]
                const [val, setVal] = useState(row.harga)
                return (
                    <div>
                        <Input 
                            id={`harga-${row.koder}`}
                            name={`harga`}
                            type="text"
                            value={val} 
                            onBlur={handleBlur}
                            onChange={(e) => {
                                const newVal = onChangeStrNbr(e.target.value, val)
                                setVal(newVal)
                                handleChangeRacikan(newVal, "harga", rowUtama, row)
                            }}
                            invalid={touchedResep?.harga && !!errorsResep?.harga}
                            />
                        {
                        touchedResep?.harga
                            && !!errorsResep?.qty &&  (
                            <FormFeedback type="invalid" >
                                <div>
                                    {errorsResep?.harga}
                                </div>
                            </FormFeedback>
                        )}
                    </div>
                )
            },
            width: "10%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Signa</span>,
            Cell: ({row}) => <div></div>,
            width: "20%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tambah</span>,
            Cell: ({row, rowUtama}) => {
                if(row.koder !== rowUtama.racikan.length){
                    return <div></div>
                }
                return (
                    <div>
                        <Button color="success" onClick={() => {
                            const newReseps = [...resepRef.current]
                            const newResep = {...newReseps[rowUtama.koder - 1]}
                            const newRacikans = [...newResep.racikan]
                            const newRacikan = {...initValueRacikan}
                            newRacikan.koder = newRacikans.length + 1
                            newRacikans.push(newRacikan)
                            newResep.racikan = newRacikans
                            newReseps[rowUtama.koder - 1] = newResep
                            handleChangeAllResep(newReseps)
                        }}>
                            +
                        </Button>
                    </div>
                )
            },
            width: "5%"
        },
        {
            name: <span className='font-weight-bold fs-13'>Hapus</span>,
            Cell: ({row, rowUtama}) => {
                return (
                    <div>
                        <Button color="danger" onClick={() => {
                            if(rowUtama.racikan.length === 1) return;
                            const newReseps = [...resepRef.current]
                            const newResep = {...newReseps[rowUtama.koder - 1]}
                            const newRacikans = [...newResep.racikan]
                            newRacikans.splice(row.koder - 1, 1)
                            newResep.racikan = newRacikans 
                            newReseps[rowUtama.koder - 1] = newResep
                            handleChangeAllResep(newReseps)
                        }}>
                            -
                        </Button>
                    </div>
                )
            },
            width: "10%"
        },
    ];
    const resepNonRacikan = vResep.values.resep.filter((val) => val.racikan.length === 0)
    const resepRacikan = vResep.values.resep.filter((val) => val.racikan.length > 0)
    return (
        <div  className="p-5">
            <Row>
                <Col lg={2}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`dokter`}
                        className="form-label mt-2">
                        Dokter
                    </Label>
                </Col>
                <Col lg={4}>
                    <CustomSelect
                        id="dokter"
                        name="dokter"
                        options={pegawai}
                        onChange={(e) => {
                            vResep.setFieldValue("dokter", e?.value || "")
                            vResep.setFieldValue("namadokter", e?.label || "")
                        }}
                        value={vResep.values.dokter}
                        className={`input ${!!vResep?.errors.dokter ? "is-invalid" : ""}`}
                        />
                    {vResep.touched.dokter 
                        && !!vResep.errors.dokter ? (
                            <FormFeedback type="invalid" >
                                <div>
                                    {vResep.errors.dokter}
                                </div>
                            </FormFeedback>
                        ) : null
                    }
                </Col>
                <Col lg={2}>
                    <Label 
                        style={{ color: "black" }} 
                        htmlFor={`unittujuan`}
                        className="form-label mt-2">
                        Depo Tujuan
                    </Label>
                </Col>
                <Col lg={4}>
                    <CustomSelect
                        id="unittujuan"
                        name="unittujuan"
                        options={unit}
                        onChange={(e) => {
                            vResep.setFieldValue("unittujuan", e?.value || "")
                        }}
                        value={vResep.values.unittujuan}
                        className={`input ${!!vResep?.errors.unittujuan ? "is-invalid" : ""}`}
                        />
                    {vResep.touched.unittujuan 
                        && !!vResep.errors.unittujuan && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {vResep.errors.unittujuan}
                                </div>
                            </FormFeedback>
                        )
                    }
                </Col>

            </Row>
            <Row className="mt-5">
                <table className="table" width={"fit-content"}>
                    <thead style={{width: "100%",}}>
                        <tr style={{width: "100%", display: "flex", flexDirection: "row"}}>
                            {columnsResep.map((col, index) => 
                                <th scope="col" key={index} 
                                style={{width: col.width || "200px"}}>
                                    {col.name}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{width: "100%", display: "flex", flexDirection: "row"}}>
                            <td style={{width: "5%"}}></td>
                            <td colSpan={2} style={{width: "95%", display: "flex"}}>
                                <h1 style={{
                                    color: "#6699ff",
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    width: "100px",
                                    marginBottom: "0px",
                                    marginTop: "7px"
                                }}>
                                    Non Racikan
                                </h1>
                                <Button color={"info"} style={{border: "none", width: "fit-content"}}
                                    onClick={() => {
                                        const newValue = {...initValueResep}
                                        const newResep = [...resepRef.current, {...newValue}]
                                        handleChangeAllResep(newResep)
                                    }}>
                                    +
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody style={{width: "100%"}}>
                        {resepNonRacikan.map((value, key) => 
                            <tr key={key} style={{width: "100%", display: "flex", flexDirection: "row"}}>
                                {columnsResep.map((col, index) => {
                                    return (
                                        <td key={index} style={{width: col.width || "200px"}}>
                                            <col.Cell row={value} />
                                        </td>
                                    )
                                })}
                            </tr>
                        )}
                    </tbody>
                    <tbody>
                        <tr style={{width: "100%", display: "flex", flexDirection: "row"}}>
                            <td style={{width: "5%"}}></td>
                            <td colSpan={2} style={{width: "95%", display: "flex"}}>
                                <h1 style={{
                                    color: "#6699ff",
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    width: "100px",
                                    marginBottom: "0px",
                                    marginTop: "7px"
                                }}>
                                    Racikan
                                </h1>
                                <Button color={"info"} style={{border: "none", width: "fit-content"}}
                                    onClick={() => {
                                        const newValue = {...initValueResep}
                                        newValue.koder = vResep.values.resep.length + 1
                                        newValue.racikan = [{...initValueRacikan}]
                                        const newResep = [...resepRef.current, {...newValue}]
                                        handleChangeAllResep(newResep)
                                    }}>
                                    +
                                </Button>
                            </td>
                            
                        </tr>
                    </tbody>
                    <tbody style={{width: "100%"}}>
                        {resepRacikan.map((value, key) => 
                            <>
                                <tr 
                                    key={key} 
                                    style={{width: "100%", display: "flex", flexDirection: "row"}}
                                    >
                                    {columnsResep.map((col, index) => {
                                        return (
                                            <td key={index} style={{width: col.width || "200px"}}>
                                                <col.Cell row={value} />
                                            </td>
                                        )
                                    })}
                                </tr>
                                {value.racikan.map((valueRacikan, keySub) => 
                                        <tr 
                                            key={`${key}-${keySub}`} 
                                            style={{width: "100%", display: "flex", flexDirection: "row"}}
                                            >
                                            {columnsResepRacikan.map((col, index) => {
                                                return (
                                                    <td 
                                                        key={index} 
                                                        style={{width: col.width || "200px"}}>
                                                        <col.Cell 
                                                            key={index} 
                                                            row={valueRacikan} 
                                                            rowUtama={value} />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                }
                            </>
                        )}
                    </tbody>

                </table>
                <Row style={{justifyContent: "space-evenly"}}>
                    <Col md={2}>
                        <Button color="info">
                            Simpan
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button color="danger">
                            Batal
                        </Button>
                    </Col>
                </Row>
            </Row>
        </div>
    )
}


export default OrderResep