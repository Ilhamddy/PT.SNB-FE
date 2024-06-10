import PropTypes from 'prop-types'
import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import BtnSpinner from './BtnSpinner'
import ModalApp from './ModalApp'

/**
 * @typedef {object} Props
 * @prop {boolean} [loading]
 * @prop {string} [msgHDelete]
 * @prop {string} [msgBDelete]
 * @prop {string} [buttonHapus]
 * @prop {boolean} [showMessage]
 * @prop {(e) => void} [onDeleteClick]
 */

/**
 *
 * @param {import('reactstrap').ModalProps & Props} props
 * @returns
 */
const DeleteModalCustom = ({
  loading,
  msgHDelete,
  msgBDelete,
  buttonHapus,
  children,
  showMessage = true,
  toggle,
  onDeleteClick,
  isOpen,
  ...rest
}) => {
  return (
    <ModalApp isOpen={isOpen} toggle={toggle} centered={true} {...rest}>
      {showMessage && (
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#fa896b"
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{msgHDelete || 'Yakin ingin hapus'}</h4>
            <p className="text-muted mx-4 mb-0">{msgBDelete}</p>
          </div>
        </div>
      )}
      {<div className="w-100">{children}</div>}
      <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
        <BtnSpinner
          type="button"
          className="btn w-sm btn-danger "
          id="delete-record"
          onClick={onDeleteClick}
          loading={loading}
        >
          {buttonHapus || 'Hapus'}
        </BtnSpinner>
      </div>
    </ModalApp>
  )
}

export default DeleteModalCustom
