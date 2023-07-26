import React from 'react';
import Select from 'react-select';
import {Props as StateManagerProps} from 'react-select';

/**
 * @typedef {object} Props
 * @property {string} className
 */

/**
 * @type {import('react').FC<StateManagerProps & Props >}
 */
const CustomSelect = React.forwardRef(({ onChange, options, value, className, ...rest}, ref) =>{
    const defaultValue = (options,value)=>{
        return options ? options.find(option => option.value === value) : ""
    }
    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "#023950",
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "yellow" : "green",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "red" : "blue"
          },
        })
      };
    return(
        <div className={className}>
            <Select 
                {...rest}
                value={defaultValue(options,value)}
                onChange={value=>onChange(value)}
                options={options}
                ref={ref}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        text: 'orangered',
                        primary25: '#ECB349',
                        primary: '#ECB349',
                    },
                })}
            />
        </div>
    )
})

CustomSelect.displayName = "CustomSelect"

export default CustomSelect;