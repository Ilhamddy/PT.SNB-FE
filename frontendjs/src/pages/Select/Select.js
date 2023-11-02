import React, { useEffect, useRef } from 'react';
import Select from 'react-select';
import {Props as StateManagerProps} from 'react-select';

/**
 * @typedef {object} Props
 * @property {string} className
 * @property {boolean} [isClearEmpty] if value is === "" then clearValue
 */

/**
 * @type {import('react').FC<StateManagerProps & Props >}
 */
const CustomSelect = React.forwardRef(({ 
    className, 
    isClearEmpty, 
    onChange, 
    options, 
    value, 
    ...rest
}, ref) =>{
    const refComp = useRef(null)
    const refUsed = ref || refComp
    useEffect(() => {
        if(value === '' && isClearEmpty && onChange){
            refUsed?.current?.clearValue()
            onChange(value)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isClearEmpty, refUsed.current])
    const defaultValue = (options,value)=>{
        if(rest.isMulti){
            let newOptions = []
            value.forEach(val => {
                const opt = options.find(option => option.value === val.value)
                opt && newOptions.push(opt)
            })
            return newOptions
        }
        return options ? options.find(option => option.value === value) : null
    }

    const customStyles = {
        menuPortal: provided => ({ ...provided, zIndex: 30 }),
        menu: provided => ({ ...provided, zIndex: 30, borderRadius: 5 })
    }
    return(
        <Select 
            className={className}
            {...rest}
            value={defaultValue(options,value)}
            onChange={value => onChange(value)}
            options={options}
            ref={refUsed}
            styles={customStyles}
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
        />
    )
})

CustomSelect.displayName = "CustomSelect"

export default CustomSelect;