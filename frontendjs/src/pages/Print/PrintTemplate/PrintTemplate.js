import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { jsPDF } from "jspdf";
import ModalApp from "../../../Components/Common/ModalApp";

const PrintTemplate = forwardRef(({ContentPrint, 
    autoClose, 
    testing, 
    format, 
    orientation, 
    scale,
    followHeight = false,
    width,
}, 
    ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const refPrint = useRef(null);
    useEffect(() => {
        if(testing) return;
        if(isOpen){
            setTimeout(() => {
                if(refPrint.current === null) return;
                let w = refPrint.current.offsetWidth;
                let hCanv = refPrint.current.offsetHeight;
                let doc = new jsPDF({
                    orientation: orientation || "portrait",
                    format: followHeight ? [width, hCanv] : (format || "a4"),
                    unit: "mm"
                });
                let source = refPrint.current;
                doc.html(
                    source,
                    {
                        callback: () => {
                            doc.autoPrint();
                            doc.output("dataurlnewwindow");
                            setIsOpen(false);
                        },
                        margin: 15,
                        html2canvas: {
                            width: 700,
                            letterRendering: true,
                            scale: scale || 0.4
                        }
                        
                    }
                );
            }, 500);
        }
    }, [isOpen, followHeight, format, orientation, scale, testing, width])
    const handlePrint = () => {setIsOpen(true)}
    const toggle = () => setIsOpen(false);
    useImperativeHandle(ref, () => ({
        handlePrint
    }))
    return (
        <ModalApp id="showModal" isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
                Print Preview
            </ModalHeader>
            <ModalBody id="divcontents">
                <div 
                    ref={refPrint} 
                    className='fit-content-width parent-none'>
                        {ContentPrint}
                </div>
            </ModalBody>
        </ModalApp>
    )
})


PrintTemplate.displayName = "PrintTemplate"

export default (PrintTemplate);