import { Modal, ModalBody, ModalHeader } from "reactstrap"



const PrintTemplate = ({ContentPrint, autoClose}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handlePrint = () => {
        setIsPrintOpen(true);
        setTimeout(() => {
            if(!refPrint.current) {
                setIsPrintOpen(false)
                return
            }
        }, 500)
    }
    return (
        <Modal id="showModal" isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
                Print Preview
            </ModalHeader>
            <ModalBody id="divcontents">
                <div ref={refPrint} className='fit-content-width parent-none'>
                    
                </div>
            </ModalBody>
        </Modal>
    )
}