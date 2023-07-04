import { Col, Input, Label, Row } from "reactstrap"




/**
 * @typedef {Object} Data
 * @property {string} Data.label
 * @property {string} Data.id
 * @property {boolean} Data.checked
 * @property {[]} Data.subdata
 * @typedef {Object} Props
 * @property {Array<Data>} props.data
 * @param {Props} props
 */
const CustomCheckbox = ({data, setData, checkboxName}) => {
    const handleChangeCheckBox = (id)=>{
        const newData = [...data]
        const dataVal = newData.find((dataId) => dataId.id === id) 
        dataVal.checked = !dataVal.checked
        if(dataVal.checked){
            dataVal.subdata = dataVal.subdata.map((sub) => {
                const newSub = {...sub}
                let newSub2Data = [...newSub.subsubdata]
                newSub2Data = newSub2Data.map((sub2) => ({
                    ...sub2,
                    checked: true
                }))
                newSub.subsubdata = newSub2Data;
                return ({
                    ...newSub,
                    checked: true
                })
            })
        }else{
            dataVal.subdata = dataVal.subdata.map((sub) => {
                const newSub = {...sub}
                let newSub2Data = [...newSub.subsubdata]
                newSub2Data = newSub2Data.map((sub2) => ({
                    ...sub2,
                    checked: false
                }))
                newSub.subsubdata = newSub2Data;
                return ({
                    ...newSub,
                    checked: false
                })
            })
        }
        setData(newData)
    }
    const handleChangeSub = (id, subId)=>{
        const newData = [...data]
        const dataVal = newData.find((dataVal) => dataVal.id === id) 
        const newSubData = [...dataVal.subdata];
        const subDataVal = newSubData.find((subDataVal) => subDataVal.id === subId);
        subDataVal.checked = !subDataVal.checked;
        dataVal.subdata = newSubData;
        if(newSubData.every((subdata) => !subdata.checked)){
            dataVal.checked = false;
        }else if(newSubData.every((subdata) => subdata.checked)){
            dataVal.checked = true;
        }
        if(subDataVal.checked){
            subDataVal.subdata = subDataVal.subsubdata.map((sub) => ({
                ...sub,
                checked: true
            }))
        }else{
            subDataVal.subdata = subDataVal.subsubdata.map((sub) => ({
                ...sub,
                checked: false
            }))
        }
        setData(newData)
    }
    const handleChangeSub2 = (id, subId, sub2Id)=>{
        const newData = [...data]
        const dataVal = newData.find((dataVal) => dataVal.id === id) 
        const newSubData = [...dataVal.subdata];
        const subDataVal = newSubData.find((subDataVal) => subDataVal.id === subId);
        const newSub2Data = [...subDataVal.subsubdata];
        const sub2DataId = newSub2Data.find((sub2DataVal) => sub2DataVal.id === sub2Id);
        sub2DataId.checked = !sub2DataId.checked;
        subDataVal.subsubdata = newSub2Data;
        if(newSub2Data.every((sub2data) => !sub2data.checked)){
            subDataVal.checked = false;
        }else if(newSub2Data.every((sub2data) => sub2data.checked)){
            subDataVal.checked = true;
        }
        if(newSubData.every((subdata) => !subdata.checked)){
            dataVal.checked = false;
        }else if(newSubData.every((subdata) => subdata.checked)){
            dataVal.checked = true;
        }

        setData(newData)
    }
    return (
        <Row className="mt-3">
            <Col xxl={12} md={12}>
                {
                    data.map((dataVal, indexVal) => (
                        <div className="d-flex flex-column" key={dataVal.id}>
                            <div className="form-check ms-2">
                                <Input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id={`formcheck-${checkboxName}${indexVal}`} 
                                    checked={dataVal.checked} 
                                    onChange={e => handleChangeCheckBox(dataVal.id)}/>
                                    <Label className="form-check-label" 
                                        htmlFor={`formcheck-${checkboxName}${indexVal}`} 
                                        style={{ color: "black" }} >
                                        {dataVal.label}
                                    </Label>
                            </div>
                            {dataVal.checked &&  
                                dataVal.subdata?.map((subDataVal, indexSubdataVal) => (
                                    <div className="d-flex flex-column" key={subDataVal.id}>
                                        <div className="form-check ms-3" key={subDataVal.id}>
                                            <Input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id={`formcheck-sub-${indexVal}-${checkboxName}${indexSubdataVal}`} 
                                                checked={subDataVal.checked} 
                                                onChange={e => handleChangeSub(dataVal.id, subDataVal.id)}/>
                                                <Label className="form-check-label" 
                                                    htmlFor={`formcheck-sub-${indexVal}-${checkboxName}${indexSubdataVal}`} 
                                                    style={{ color: "black" }} >
                                                    {subDataVal.label}
                                                </Label>
                                        </div>
                                        {
                                            subDataVal.checked && subDataVal.subsubdata?.map((sub2DataVal, indexSub2dataVal) => (
                                                <div className="form-check ms-5" key={sub2DataVal.id}>
                                                    <Input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id={`formcheck-sub2-${indexVal}-${checkboxName}${indexSubdataVal}-${indexSub2dataVal}`} 
                                                        checked={sub2DataVal.checked} 
                                                        onChange={e => handleChangeSub2(dataVal.id, subDataVal.id, sub2DataVal.id)}/>
                                                        <Label className="form-check-label" 
                                                            htmlFor={`formcheck-sub2-${indexVal}-${checkboxName}${indexSubdataVal}-${indexSub2dataVal}`} 
                                                            style={{ color: "black" }} >
                                                            {sub2DataVal.label}
                                                        </Label>
                                                </div>
                                            ))
                                        }
                                        
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