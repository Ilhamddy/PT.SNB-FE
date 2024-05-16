

/**
 * @template T
 * @param {T} q 
 * @returns {T}
 */
export const processQuery = (q) => {
    const keys = Object.keys(q)
    for(let key of keys){
        q[key] = (q[key] === "null" || q[key] === "") ? null : q[key]
    }
    return q
}