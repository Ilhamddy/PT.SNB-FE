

export const checkValidDate = (d) => {
    let dObj = new Date(d)
    return dObj instanceof Date && !Number.isNaN(dObj.getTime())
}

export const getDateStart = (date) => {
    let todayStart = date ? new Date(date) : new Date() // default to today
    todayStart.setHours(0, 0, 0, 0)
    return todayStart
}

export const getDateEnd = (date) => {
    let todayEnd = date ? new Date(date) : new Date() // default to today
    todayEnd.setHours(23, 59, 59, 999)
    return todayEnd
}

export const getDateStartNull = (date) => {
    if(!date){
        return null
    }
    let todayStart = new Date(date) // default to null
    todayStart.setHours(0, 0, 0, 0)
    return todayStart
}

export const getDateEndNull = (date) => {
    if(!date){
        return null
    }
    let todayEnd = new Date(date) // default to null
    todayEnd.setHours(23, 59, 59, 999)
    return todayEnd
}

/**
 * 
 * @param {string | Date | null } [date] 
 * @returns 
 */
export const getDateStartEnd = (date) => {
    let todayStart = date ? new Date(date) : new Date() // default to today
    todayStart.setHours(0, 0, 0, 0)
    let todayEnd = date ? new Date(date) :  new Date()
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
    } // not default to today, if null/undefined/'', then return null
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

export const getDateStartEndYear = () => {
    let yearStart = new Date()
    yearStart.setMonth(0)
    yearStart.setDate(1)
    yearStart.setHours(0, 0, 0, 0)
    let yearEnd = new Date()
    yearEnd.setMonth(11);
    yearEnd.setDate(0);
    yearEnd.setHours(23, 59, 59, 999);
    return {
        yearStart,
        yearEnd
    }
}

/**
 * 
 * @param {string} start 
 * @param {string} end 
 * @param {boolean} [isObj]  
 * @returns 
 */
export const createDateAr = (start, end, isObj) => {
    if(!start || !end) throw new Error("Date start and end must not empty")
    let initialTime = start ? new Date(start) : new Date()
    let endTime = end ? new Date(end) : new Date()
    let arrTimes = []
    let dayMillisec = 24 * 60 * 60 * 1000;
    for (let q = initialTime; q <= endTime; q = new Date(q.getTime() + dayMillisec)) {
        const {todayStart} = getDateStartEnd(q.toISOString())
        if(isObj){
            arrTimes.push({
                date: todayStart.toISOString(),
                items: [],
                total: 0
            })
        } else{
            arrTimes.push(todayStart.toISOString())
        }

    }
    return arrTimes
}

export const getTimeOnly = (date) => {
    return (new Date(date)).toTimeString().split(' ')[0]
}