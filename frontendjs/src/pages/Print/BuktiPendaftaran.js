import React from 'react';
import {
    Modal,
    ModalHeader, ModalBody,Button
} from 'reactstrap';

const BuktiPendaftaran = (props) => {
    function handleSelect() {
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("print-content").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    const printContent = <div><h5 className="card-title mb-5">Profile Pasien xx</h5></div>

    return (
        <>  
            <Modal id="showModal" isOpen={props.isOpen} toggle={props.toggle} centered>
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
            </Modal>
            <iframe id="print-content" title="Profil Pasien" hidden={true}>
                {printContent}
            </iframe>
        </>
    )
}

export default (BuktiPendaftaran);