import React from 'react'
import Select from 'react-select'
import { Props as SelectProps } from 'react-select'
import { FormFeedback } from 'reactstrap'
import './SelectDM.scss'

/**
 * @typedef {object} Props
 * @prop {string} [errorMsg]
 * @prop {boolean} isError
 * @prop {string} [className]
 * @prop {string} [classNameInput]
 * @prop {import('react-select').ThemeConfig} [theme]
 *
 */

/**
 * @type {import('react').FC<SelectProps & Props >}
 */
const SelectDM = React.forwardRef(
  ({ className, classNameInput, isError, errorMsg, theme, ...rest }, ref) => {
    const onValueChange = (options, value) => {
      return options ? options.find((option) => option.value === value) : ''
    }
    const customStyles = {
      menuPortal: (provided) => ({ ...provided, zIndex: 30 }),
      menu: (provided) => ({ ...provided, zIndex: 30, borderRadius: 5 }),
    }
    // https://react-select.com/styles#overriding-the-theme
    const config = (th) => {
      th.spacing.controlHeight = 56
      return {
        ...th,
        borderRadius: 10,
        colors: {
          ...th.colors,
          text: 'orangered',
          primary25: '#DEC15C',
          primary: '#DEC15C',
          neutral20: '#564405',
        },
      }
    }
    return (
      <div className={`kontainer-select-dm ${className || ''}`}>
        <Select
          className={`custom-select-row-header ${isError ? 'is-invalid' : ''} ${
            classNameInput || ''
          }`}
          {...rest}
          value={onValueChange(rest.options, rest.value)}
          ref={ref}
          theme={theme || config}
          menuPortalTarget={document.body}
          styles={customStyles}
        />
        {isError && <FormFeedback>{errorMsg}</FormFeedback>}
      </div>
    )
  }
)

SelectDM.displayName = 'SelectDM'

export default SelectDM
