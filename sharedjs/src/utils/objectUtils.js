/**
 * @template {T}
 * @param {T} obj 
 * @returns {T}
 */
export const newObject = (obj) => {
    if(typeof obj === 'object' && obj !== null){
        return JSON.parse(JSON.stringify(obj))
    }
    return obj
} 
