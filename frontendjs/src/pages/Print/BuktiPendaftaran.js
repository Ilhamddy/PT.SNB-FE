import React from 'react';
import {
    Modal,
    ModalHeader, ModalBody,Button
} from 'reactstrap';

const BuktiPendaftaran = (props) => {

    // const printIframe = (id) => {
    //     const iframe = document.frames
    //       ? document.frames[id]
    //       : document.getElementById(id);
    //     const iframeWindow = iframe.contentWindow || iframe;
     
    //     iframe.focus();
    //     iframeWindow.print();
     
    //     return false;
    //   };

    function handleSelect() {
        var content = document.getElementById("divcontents");
var pri = document.getElementById("divcontents").contentWindow;
pri.document.open();
pri.document.write(content.innerHTML);
pri.document.close();
pri.focus();
pri.print();
    }

    return (
        
        <Modal id="showModal" isOpen={true} toggle={true} centered>
            <ModalHeader className="bg-light p-3">
                Bukti Pendaftaran
            </ModalHeader>
            <div className="divcontents">
            <h5 className="card-title mb-5">Profile Pasien</h5>
            </div>
            <Button
                className="invoice-print-button"
                variant="contained"
                onClick={handleSelect}
            >
                Print
            </Button>
        </Modal>
    )
}

export default (BuktiPendaftaran);