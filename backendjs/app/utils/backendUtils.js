

/**
 * @template V
 * @param {V} initial 
 * @returns {V}
 */
export const processQuery = (q, initial) => {
    let data = initial
    const keys = Object.keys(q)
    for(let key of keys){
        data[key] = (q[key] === "null" || q[key] === "") ? null : q[key]
    }
    return data
}