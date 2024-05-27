import { Link, LinkProps } from 'react-router-dom'
import { Tooltip, UncontrolledTooltip } from 'reactstrap'
import { FC } from 'react'

import { UncontrolledTooltipProps } from 'reactstrap'

/**
 * @typedef {object} BtnEditNavigasiProps
 * @prop {string} [idlink]
 * @prop {string} [children]
 */

/**
 * @type {import('react').FC<LinkProps & BtnEditNavigasiProps}
 */
const LinkEditNavigasi = ({ idlink, children, teks, ...rest }) => {
  if (!!children && !idlink) throw Error('idlink harus ada')
  return (
    <>
      <Link
        className={'link-success fs-15 ' + rest.className}
        id={idlink}
        {...rest}
      >
        <i className="ri-edit-2-line"></i>
      </Link>
      <UncontrolledTooltip placement="top" target={idlink}>
        {children}
      </UncontrolledTooltip>
    </>
  )
}

export default LinkEditNavigasi
