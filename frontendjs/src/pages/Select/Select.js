import React from 'react';
import Select from 'react-select';
const CustomSelect = ({ onChange, options, value, className, ...rest}) =>{
    const defaultValue = (options,value)=>{
        return options ? options.find(option=>option.value === value):""
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
                // styles={{
                //     control: (baseStyles, state) => ({
                //       ...baseStyles,
                //       borderColor: state.isFocused ? null : '#ffa502',
                //     }),
                //   }}
            />
        </div>
    )
}

export default CustomSelect;