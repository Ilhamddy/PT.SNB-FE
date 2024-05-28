import PropTypes from 'prop-types'
import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import BtnSpinner from './BtnSpinner'

/**
 * @typedef {object} PropsModalApp
 * @prop {string} [labelHeader]
 */

/**
 *
 * @param {import('reactstrap').ModalProps & PropsModalApp} props
 * @returns
 */
const ModalApp = ({ children, labelHeader, centered, ...rest }) => {
  return (
    <Modal
      toggle={rest.toggle}
      centered={centered != null ? centered : true}
      {...rest}
    >
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
