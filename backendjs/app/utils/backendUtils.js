

/**
 * @template V
 * @param {V} initial 
 * @returns {V}
 */
export const processQuery = (q, initial) => {
    let data = initial ? initial : q
    const keys = Object.keys(q)
    for(let key of keys){
        data[key] = (q[key] === "null" || q[key] === "") ? null : q[key]
    }
    return data
}


/**
 * @template V
 * @param {V} initial 
 * @returns {V}
 */
export const processBody = (b, initial) => {
    let data = initial ? initial : b
    data = JSON.parse(JSON.stringify(b))
    return data
}