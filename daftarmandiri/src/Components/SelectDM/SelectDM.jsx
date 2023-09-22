import React from 'react'
import Select from 'react-select'
import { Props as StateManagerProps } from 'react-select'

/**
 * @typedef {object} Props
 * @property {string} className
 */

/**
 * @type {import('react').FC<StateManagerProps & Props >}
 */
const CustomSelect = React.forwardRef(
  ({ onChange, options, value, className, ...rest }, ref) => {
    const defaultValue = (options, value) => {
      return options ? options.find((option) => option.value === value) : ''
    }
    const customStyles = {
      menuPortal: (provided) => ({ ...provided, zIndex: 30 }),
      menu: (provided) => ({ ...provided, zIndex: 30, borderRadius: 5 }),
    }
    return (
      <Select
        className={className + ' custom-select-row-header'}
        {...rest}
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        ref={ref}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            text: 'orangered',
            primary25: '#ECB349',
            primary: '#ECB349',
          },
        })}
        menuPortalTarget={document.body}
        styles={customStyles}
      />
    )
  }
)

CustomSelect.displayName = 'CustomSelect'

export default CustomSelect
