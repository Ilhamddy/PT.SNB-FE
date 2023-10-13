

export const checkValidDate = (d) => {
    let dObj = new Date(d)
    return dObj instanceof Date && !Number.isNaN(dObj.getTime())
}

export const getDateStartEnd = (date) => {
    let todayStart = date || new Date() // default to today
    todayStart.setHours(0, 0, 0, 0)
    let todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)
    return {
        todayStart,
        todayEnd
    }
}

export const getDateStartEndNull = (date) => {
    if(!date){
        return {
            todayStart: null,
            todayEnd: null
        }
    } // not default to today, if null, then return null
    let todayStart = new Date(date)
    todayStart.setHours(0, 0, 0, 0)
    let todayEnd = new Date(date)
    todayEnd.setHours(23, 59, 59, 999)
    return {
        todayStart,
        todayEnd
    }
}

export const getDateStartEndMonth = () => {
    let monthStart = new Date()
    monthStart.setHours(0, 0, 0, 0)
    monthStart.setDate(1)
    let monthEnd = new Date()
    monthEnd.setMonth(monthEnd.getMonth() + 1);
    monthEnd.setDate(0);
    monthEnd.setHours(23, 59, 59, 999);
    return {
        monthStart,
        monthEnd
    }
}