import React from 'react';
import {
    Modal,
    ModalHeader, ModalBody, Button, Card, CardHeader, CardBody
} from 'reactstrap';

const BuktiPendaftaran2 = (props) => {
    function handleSelect() {
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("print-content").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
    const pageStyle =`
    @media print and (width: 8.5in) and (height: 8.5in) {
        @page {
            margin: 1in;
        }
    }
   `;
    const printContent = <div className="page-content">
        <style>{pageStyle}</style>
       <CardHeader className="border-bottom-dashed p-4">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        
                        <div className="mt-sm-5 mt-4">
                          <h6 className="text-muted text-uppercase fw-semibold">Address</h6>
                          <p className="text-muted mb-1" id="address-details">California, United States</p>
                          <p className="text-muted mb-0" id="zip-code"><span>Zip-code:</span> 90201</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-sm-0 mt-3">
                        <h6><span className="text-muted fw-normal">Legal Registration No:</span><span id="legal-register-no">987654</span></h6>
                        <h6><span className="text-muted fw-normal">Email:</span><span id="email">velzon@themesbrand.com</span></h6>
                        <h6><span className="text-muted fw-normal">Website:</span> </h6>
                        <h6 className="mb-0"><span className="text-muted fw-normal">Contact No: </span><span id="contact-no"> +(01) 234 6789</span></h6>
                      </div>
                    </div>
                  </CardHeader>
    </div>
 
    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                    <h4 className="card-title mb-0">Bukti Pendaftaran</h4>
                </CardHeader>
                <CardBody id="divcontents">
                    {printContent}
                </CardBody>
                <Button
                    className="invoice-print-button"
                    variant="contained"
                    onClick={handleSelect}
                >
                    Print
                </Button>
            </Card>
            {/* <Modal id="showModal" isOpen={props.isOpen} toggle={props.toggle} centered>
                <ModalHeader className="bg-light p-3" toggle={props.toggle}>
                    Bukti Pendaftaran
                </ModalHeader>
                <ModalBody id="divcontents">
                    {printContent}
                </ModalBody>
                <Button
                    className="invoice-print-button"
                    variant="contained"
                    onClick={handleSelect}
                >
                    Print
                </Button>
            </Modal> */}
            <iframe id="print-content" title="Profil Pasien" hidden={true} style={{width:"100px"}}>
                {printContent}
            </iframe>
        </>
    )
}

export default (BuktiPendaftaran2);