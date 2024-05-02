

export const checkValidDate = (d) => {
    let dObj = new Date(d)
    return dObj instanceof Date && !Number.isNaN(dObj.getTime())
}

export const getDateStart = (date) => {
    let todayStart = date ? new Date(date) : new Date() // default to today
    todayStart.setHours(0, 0, 0, 0)
    const todayStartStr = todayStart.toISOString()
    return todayStartStr
}

export const getDateEnd = (date) => {
    let todayEnd = date ? new Date(date) : new Date() // default to today
    todayEnd.setHours(23, 59, 59, 999)
    const todayEndStr = todayEnd.toISOString()
    return todayEndStr
}

export const getDateStartNull = (date) => {
    if(!date){
        return null
    }
    let todayStart = new Date(date) // default to null
    todayStart.setHours(0, 0, 0, 0)
    const todayStartStr = todayStart.toISOString()
    return todayStartStr
}

export const getDateEndNull = (date) => {
    if(!date){
        return null
    }
    let todayEnd = new Date(date) // default to null
    todayEnd.setHours(23, 59, 59, 999)
    const todayEndStr = todayEnd.toISOString()
    return todayEndStr
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
    const todayStartStr = todayStart.toISOString()
    const todayEndStr = todayEnd.toISOString()
    return {
        todayStart: todayStartStr,
        todayEnd: todayEndStr
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
    const todayStartStr = todayStart.toISOString()
    const todayEndStr = todayEnd.toISOString()
    return {
        todayStart: todayStartStr,
        todayEnd: todayEndStr
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
                date: todayStart,
                items: [],
                total: 0
            })
        } else{
            arrTimes.push(todayStart)
        }

    }
    return arrTimes
}

export const getTimeOnly = (date) => {
    return (new Date(date)).toTimeString().split(' ')[0]
}

/**
 * mengubah format date menjadi tanggal string
 * @param {string | Date} date 
 * @returns {string} format hasil "dd/mm/yyyy"
 */
export const dateLocal = (date) => {
    try{
        if(date){
            return new Date(date)
            .toLocaleDateString("id-ID", 
                { 
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric' 
            }) 
        }
        return "-"
    }catch(e){
        return "-"
    }
}

/**
 * 
 * @param {number} days jumlah hari sebelum tanggal sekarang
 * @returns 
 */
export const getDateDaysAgo = (days) => {
    let today = new Date();
    let priorDate = new Date(new Date().setDate(today.getDate() - days));
    let todayStr = today.toISOString()
    let priorDateStr = priorDate.toISOString()
    return {
        today: todayStr,
        priorDate: priorDateStr
    }
}

export const calculateAge = (birthDate, otherDate) => {
    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}

/**
 * mengubah format date menjadi waktu tanggal string
 * @param {string | Date} date 
 * @returns {string} format hasil "dd/mm/yyyy HH24:MI"
 */
export const dateTimeLocal = (date) => {
    try{
        if(!date) return "-"
        return new Date(date)
            .toLocaleDateString("id-ID", 
                { year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
            }) 
            + 
            " " 
            +
            new Date(date)
            .toLocaleTimeString("id-ID", {hour: '2-digit', minute: '2-digit'})
    }catch(e){
        return "-"
    }
}