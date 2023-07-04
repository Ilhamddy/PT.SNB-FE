import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal, ModalBody, Card, Collapse } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ListGroupCollapse = ({ cat, tempData, index, onChange }) => {
    const [collapse, setcollapse] = useState(false);
    const handleClickCard = (e) => {
        if (collapse)
            setcollapse(false);
        else
            setcollapse(true)
    };
    const fromApi = [{
        label: "Label",
        value: 0,
        subdata: [
            {
                label: "Sub Label",
                value: 0
            },
            {
                label: "Sub Label",
                value: 1
            },
        ]
    },
    {
        label: "Label",
        value: 1,
        subdata: [
            {
                label: "Sub Label",
                value: 5
            },
            {
                label: "Sub Label",
                value: 3
            },
        ]
    }
    ]
    const [temp, setTemp] = useState([]);
    const [stateDummy, setStateDummy] = useState(() => cat.detail.map((data, index, array) => {
        const newData = { ...data }
        newData.checked = false;
        newData.subdata = data.subdata?.map((subdata) => {
            const newSubdata = { ...subdata }
            newSubdata.checked = false;
            newSubdata.subsubdata = subdata.subsubdata?.map((sub2data) => {
                const newSub2data = { ...sub2data }
                newSub2data.checked = false;
                return newSub2data;
            }) || [];
            return newSubdata;
        }) || [];
        return newData;
    }))
    function handlesortBy(sortBy) {
        setStateDummy(sortBy)
        let newArray = []
        const tempDataD = [...tempData]
        for (let i = 0; i < sortBy.length; i++) {
            if (sortBy[i].checked === true){
                
                tempDataD.push(sortBy[i])
            }
        }
        // tempData = newArray
        console.log(tempData)
        onChange(tempDataD)
    }
    return (
        <Card className="card-animate">
            <div className="card-footer" style={{ backgroundColor: '#e65d22' }}>
                <div className="text-center">
                    <Link to="#" className="link-light" onClick={handleClickCard}>{cat.label} <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                </div>
            </div>
            <Collapse isOpen={collapse}>
                <CustomCheckbox
                    data={stateDummy}
                    setData={(newData) => {
                        handlesortBy(newData)
                    }}
                    checkboxName={`checkbox-dummy-ex-${index}`}
                />
            </Collapse>
        </Card>
    );
};

ListGroupCollapse.propTypes = {
    tempData: PropTypes.any,
    show: PropTypes.any,
};

export default ListGroupCollapse;