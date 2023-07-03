import { Col, Input, Label, Row } from "reactstrap"




/**
 * @typedef {Object} Data
 * @property {string} Data.label
 * @property {string} Data.value
 * @property {boolean} Data.checked
 * @property {[]} Data.subdata
 * @typedef {Object} Props
 * @property {Array<Data>} props.data
 * @param {Props} props
 */
const CustomCheckbox = ({data, setData, checkboxName}) => {
    const handleChangeCheckBox = (val)=>{
        const newData = [...data]
        const dataVal = newData.find((dataVal) => dataVal.value === val) 
        dataVal.checked = !dataVal.checked
        if(dataVal.checked){
            dataVal.subdata = dataVal.subdata.map((sub) => ({
                ...sub,
                checked: true
            }))
        }
        setData(newData)
    }
    const handleChangeSub = (val, subVal)=>{
        const newData = [...data]
        const dataVal = newData.find((dataVal) => dataVal.value === val) 
        const newSubData = [...dataVal.subdata];
        const subDataVal = newSubData.find((subDataVal) => subDataVal.value === subVal);
        subDataVal.checked = !subDataVal.checked;
        dataVal.subdata = newSubData;
        if(newSubData.every((subdata) => !subdata.checked)){
            dataVal.checked = false;
        }
        setData(newData)
    }
    return (
        <Row className="mt-3">
            <Col xxl={12} md={12}>
                {
                    data.map((dataVal, indexVal) => (
                        <div className="d-flex flex-column" key={dataVal.value}>
                            <div className="form-check ms-2">
                                <Input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id={`formcheck-${checkboxName}${indexVal}`} 
                                    checked={dataVal.checked} 
                                    onChange={e => handleChangeCheckBox(dataVal.value)}/>
                                    <Label className="form-check-label" 
                                        htmlFor={`formcheck-${checkboxName}${indexVal}`} 
                                        style={{ color: "black" }} >
                                        {dataVal.label}
                                    </Label>
                            </div>
                            {dataVal.checked && 
                                dataVal.subdata?.map((subDataVal, indexSubdataVal) => (
                                    <div className="form-check ms-4" key={subDataVal.value}>
                                        <Input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id={`formcheck-sub-${indexVal}-${checkboxName}${indexSubdataVal}`} 
                                            checked={subDataVal.checked} 
                                            onChange={e => handleChangeSub(dataVal.value, subDataVal.value)}/>
                                            <Label className="form-check-label" 
                                                htmlFor={`formcheck-sub-${indexVal}-${checkboxName}${indexSubdataVal}`} 
                                                style={{ color: "black" }} >
                                                {subDataVal.label}
                                            </Label>
                                    </div>
                                ))
                            }
                        </div>
                        
                    ))
                }
            </Col>
        </Row>
    )
}

CustomCheckbox.defaultProps = {
    data: [],
    setData: (newData) => {},
    checkboxName: "checkbox-default"
}

export default CustomCheckbox