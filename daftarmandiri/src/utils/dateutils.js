


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