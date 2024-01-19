import React, { useEffect, useRef } from 'react';
import Select from 'react-select';
import {Props as StateManagerProps} from 'react-select';

/**
 * @typedef {object} Props
 * @property {string} className
 * @property {boolean} isClearEmpty
 * @property {object | null} valueInit
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
    valueInit,
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
    
    let newOpt =
        (options || [])?.length === 0 && valueInit
        ? [{ ...valueInit }]
        : options || []
    const findOptions = newOpt.findIndex((opt) => valueInit && valueInit.value && opt.value === valueInit.value)
    if(findOptions < 0 && valueInit){
        newOpt = [...newOpt, { ...valueInit }]
    }
    const onValueChange = (options, value) => {
        return options ? options.find((option) => option.value === value) : ''
    }

    const customStyles = {
        menuPortal: provided => ({ ...provided, zIndex: 30 }),
        menu: provided => ({ ...provided, zIndex: 30, borderRadius: 5 })
    }
    return(
        <Select 
            isClearable={true}
            className={className}
            value={onValueChange(newOpt,value)}
            onChange={value => onChange(value)}
            options={newOpt}
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
            {...rest}
        />
    )
})

CustomSelect.displayName = "CustomSelect"

export default CustomSelect;