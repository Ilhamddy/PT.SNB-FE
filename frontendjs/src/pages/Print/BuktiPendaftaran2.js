import React from 'react';
import {
    Modal,
    ModalHeader, ModalBody, Button, Card, CardHeader, CardBody
} from 'reactstrap';
import "./bukti-pendaftaran.scss"

const BuktiPendaftaran2 = ({refPrint, isOpen, toggle}) => {

    function handleSelect() {
        // var content = document.getElementById("divcontents");
        // var pri = document.getElementById("print-content").contentWindow;
        // pri.document.open();
        // pri.document.write(content.innerHTML);
        // pri.document.close();
        // pri.focus();
        // pri.print();
    }

    return (
        <Modal id="showModal" isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
                Bukti Pendaftaran
            </ModalHeader>
            <ModalBody id="divcontents">
                <div ref={refPrint} className='fit-content-width parent-none'>
                    <div className="d-flex flex-column fit-content-width">
                        <div className="fit-content-width">
                            <div className='fit-content-width'>
                                <h6 className="fit-content-width text-muted text-uppercase fw-semibold">Address</h6>
                                <p className="fit-content-width text-muted mb-1" id="address-details">California, United States</p>
                                <p className="fit-content-width text-muted mb-0" id="zip-code"><span>Zip-code:</span> 90201</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 mt-sm-0 mt-3 fit-content-width">
                            <h6 className='fit-content-width'><span className="text-muted fw-normal">Legal Registration No:</span><span id="legal-register-no">987654</span></h6>
                            <h6 className='fit-content-width'><span className="text-muted fw-normal">Email:</span><span id="email">velzon@themesbrand.com</span></h6>
                            <h6 className='fit-content-width'><span className="text-muted fw-normal">Website:</span> </h6>
                            <h6 className='fit-content-width mb-0'><span className="text-muted fw-normal">Contact No: </span><span id="contact-no"> +(01) 234 6789</span></h6>
                        </div>
                    </div>  
                </div>
            </ModalBody>
            {/* <Button
                className="invoice-print-button"
                variant="contained"
                onClick={handleSelect}
            >
                Print
            </Button> */}
        </Modal>
    )
}

export default (BuktiPendaftaran2);