import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal, ModalBody, Card, Collapse } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ListGroupCollapse = ({ cat, onDeleteClick, onCloseClick, msgHDelete, msgBDelete, index }) => {
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
        const newData = {...data}
        newData.checked = false;
        newData.subdata = data.subdata.map((subdata) => {
            const newSubdata = {...subdata}
            newSubdata.checked = false;
            return newSubdata;
        });
        return newData;
    }))

    return (
        <Card className="card-animate">
            <div className="card-footer" style={{ backgroundColor: '#e67e22' }}>
                <div className="text-center">
                    <Link to="#" className="link-light" onClick={handleClickCard}>{cat.label} <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                </div>
            </div>
            <Collapse isOpen={collapse}>
                <CustomCheckbox
                    data={stateDummy}
                    setData={(newData) => setStateDummy(newData)}
                    checkboxName={`checkbox-dummy-ex-${index}`}
                />
            </Collapse>
        </Card>
    );
};

ListGroupCollapse.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default ListGroupCollapse;