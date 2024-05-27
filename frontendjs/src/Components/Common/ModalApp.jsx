import PropTypes from 'prop-types'
import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import BtnSpinner from './BtnSpinner'

/**
 *
 * @param {import('reactstrap').ModalProps} props
 * @returns
 */
const ModalApp = ({ children, labelHeader, ...rest }) => {
  return (
    <Modal toggle={rest.toggle} {...rest}>
      <ModalHeader
        className="modal-title"
        id="staticBackdropLabel"
        toggle={rest.toggle}
      >
        {labelHeader}
      </ModalHeader>
      {children}
    </Modal>
  )
}
export default ModalApp
