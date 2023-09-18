import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { jsPDF } from "jspdf";

const PrintTemplate = forwardRef(({ContentPrint,
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
        async function generateAndPrintPDF() {
            if (testing) return;
            if (isOpen) {
                setTimeout(async () => {
                    if (refPrint.current === null) return;

                    const hCanv = refPrint.current.offsetHeight;
                    const doc = new jsPDF({
                        orientation: orientation || "portrait",
                        format: followHeight ? [width, hCanv] : (format || "a4"),
                        unit: "mm"
                    });

                    const source = refPrint.current;

                    await doc.html(
                        source,
                        {
                            callback: () => {
                                // doc.autoPrint();
                                // doc.output("dataurlnewwindow");
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

                    const base64Data = doc.output("datauri");

                    try {
                        await window.electron.print({
                            devicePrintBus: base64Data,
                        });
                    } catch (error) {
                        console.error('Error printing:', error);
                    }
                }, 500);
            }
        }

        generateAndPrintPDF();
    }, [isOpen, followHeight, format, orientation, scale, testing, width]);

    const handlePrint = () => {
        setIsOpen(true);
    };

    const toggle = () => {
        setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
        handlePrint
    }));

    return (
        <Modal id="showModal" isOpen={isOpen} toggle={toggle} centered>
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
        </Modal>
    );
});

PrintTemplate.displayName = "PrintTemplate";

export default (PrintTemplate);
