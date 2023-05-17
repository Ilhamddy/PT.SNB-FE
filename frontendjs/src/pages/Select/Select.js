import React from 'react';
import Select from 'react-select';
const CustomSelect = ({ onChange, options, value, className, ...rest}) =>{
    const defaultValue = (options,value)=>{
        return options ? options.find(option=>option.value === value):""
    }
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
                        primary25: '#48dbfb',
                        primary: '#48dbfb',
                    },
                })}
            />
        </div>
    )
}

export default CustomSelect;