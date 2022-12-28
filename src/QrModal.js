import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import QRCode from 'react-qr-code'
function QrModal({isOpen,url,onClose}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
      
                <ModalOverlay />
                <ModalContent> 
                    <ModalHeader>QR code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <QRCode size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%", borderRadius: "8px" }}
                                value={url}
                                viewBox={`0 0 256 256`} 
                        />
                    </ModalBody>
                </ModalContent> 
        </Modal>
    ) 
}

export default QrModal