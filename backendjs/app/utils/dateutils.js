

export const checkValidDate = (d) => {
    let dObj = new Date(d)
    return dObj instanceof Date && !Number.isNaN(dObj.getTime())
}